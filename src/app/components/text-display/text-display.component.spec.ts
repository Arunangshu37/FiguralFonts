import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, } from 'vitest';
import { TextDisplayComponent } from './text-display.component';

describe('TextDisplayComponent', () => {
  let component: TextDisplayComponent;
  let fixture: ComponentFixture<TextDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextDisplayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TextDisplayComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show display label when showDisplayLabel is true', () => {
    // Arrange
    fixture.componentRef.setInput('showDisplayLabel', true);
    
    // Act
    fixture.detectChanges();

    // Assert
    const compiled = fixture.nativeElement as HTMLElement;
    const element = compiled.querySelector('#show-display-label');
    expect(element).not.toBeNull();
  });

  it('should not show display label when showDisplayLabel is false', () => {
    // Arrange
    fixture.componentRef.setInput('showDisplayLabel', false);
    
    // Act
    fixture.detectChanges();

    // Assert
    const compiled = fixture.nativeElement as HTMLElement;
    const element = compiled.querySelector('#show-display-label');
    expect(element).toBeNull();
  });
});
