import { ChangeDetectorRef, Component, DestroyRef, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { form, FormField, maxLength, required } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TextDisplayComponent } from "./components/text-display/text-display.component";
import { characterIdentifierParamName, figuralFontHeight, textIdentifierParamName } from './constants/app.constants';
import { IFiguralFont } from './models/figural-fonts.models';
import { FontService } from './services/font.service';


@Component({
  selector: 'app-root',
  imports: [TextDisplayComponent, MatToolbarModule, MatInputModule, FormField, MatButtonModule, MatSlideToggleModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  @ViewChild("dataDisplayElement", {static: false}) public dataDisplayElement!: ElementRef;
  
  public formModel = signal<IFiguralFont>({
    text: '',
    customCharacter: '*',
    shouldClearPreviousGenerations: false
  });
  
  public form = form(this.formModel, (schemaPath) => {
    required(schemaPath.text, { message: "This field cannot be empty" });
    maxLength(schemaPath.text, 20);
  });

  protected readonly title = signal('FiguralFonts');
  protected showDisplayLabel = signal(false);
  private fontService = inject(FontService);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private changeDetectorRef = inject(ChangeDetectorRef);

  public ngOnInit() {
    this.route.queryParamMap
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((queryParamMap: ParamMap) => {
      const text = queryParamMap.get(textIdentifierParamName) as string;
      const customCharacter = queryParamMap.get(characterIdentifierParamName) as string;
      this.createFiguralFontText(text, customCharacter); 
    });
  }

  public onFormSubmit(submitEvent: SubmitEvent) {
    submitEvent.preventDefault();
    if(this.form().invalid()) {
      return;
    }
    const formData = this.form().value() as IFiguralFont;
    this.createFiguralFontText(formData.text, formData.customCharacter, formData.shouldClearPreviousGenerations);
  }

  private createFiguralFontText(text: string, customCharacter: string, shouldClearPreviousGenerations: boolean = false) {
    if(!text) {
      return;
    }
    if(shouldClearPreviousGenerations) {
      this.dataDisplayElement.nativeElement.innerHTML = '';
      this.changeDetectorRef.detectChanges();
    }
    for(let index = 0; index < figuralFontHeight; index++) {
      const line = this.fontService.getFontLineFromLetter(text, index, customCharacter);
      this.dataDisplayElement.nativeElement.innerHTML += line;
      this.dataDisplayElement.nativeElement.innerHTML += '<br>';
    }
    this.showDisplayLabel.set(true);
  }
}
