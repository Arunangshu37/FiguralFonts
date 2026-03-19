import { Component, DestroyRef, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FontService } from './services/font.service';


@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  
  @ViewChild("dataDisplayElement", {static: true}) public dataDisplayElement!: ElementRef;

  protected readonly title = signal('FiguralFonts');
  
  private fontService = inject(FontService);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);


  public ngOnInit() {
    this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((queryParamMap: ParamMap) => {
      const text = queryParamMap.get("text") as string;
      if(!text) {
        return;
      }
      console.log(text)
      for(let index = 0; index < 5; index++) {
        const line = this.fontService.getFontLineFromLetter(text, index);
        this.dataDisplayElement.nativeElement.innerHTML += line;
        this.dataDisplayElement.nativeElement.innerHTML += "</br>"
      }
    })
  }
}
