import { CommonModule } from '@angular/common';
import { Component, input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-text-display',
  imports: [CommonModule],
  templateUrl: './text-display.component.html',
  styleUrl: './text-display.component.scss',
})
export class TextDisplayComponent {
  public templateRef = input<TemplateRef<any>>();
}
