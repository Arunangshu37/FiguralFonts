import { Component, DestroyRef, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TextDisplayComponent } from "./components/text-display/text-display.component";
import { characterIdentifierParamName, figuralFontHeight, textIdentifierParamName } from './constants/app.constants';
import { FontService } from './services/font.service';


@Component({
  selector: 'app-root',
  imports: [TextDisplayComponent, MatToolbarModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  @ViewChild("dataDisplayElement", {static: false}) public dataDisplayElement!: ElementRef;

  protected readonly title = signal('FiguralFonts');
  
  private fontService = inject(FontService);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  public ngOnInit() {
    this.route.queryParamMap
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((queryParamMap: ParamMap) => {
      const text = queryParamMap.get(textIdentifierParamName) as string;
      const customCharacter = queryParamMap.get(characterIdentifierParamName) as string;
      this.createFiguralFontText(text, customCharacter); 
    });
  }

  private createFiguralFontText(text: string, customCharacter: string) {
    if(!text) {
      return;
    }
    for(let index = 0; index < figuralFontHeight; index++) {
      const line = this.fontService.getFontLineFromLetter(text, index, customCharacter);
      this.dataDisplayElement.nativeElement.innerHTML += line;
      this.dataDisplayElement.nativeElement.innerHTML += "</br>"
    }
  }
}
