import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from './app';
import { figuralFontHeight } from './constants/app.constants';
import { FontService } from './services/font.service';

describe('App', () => {
  let fixture: any;
  let app: App;
  let queryParamMapSubject: BehaviorSubject<ParamMap>;
  let mockFontService: FontService;

  beforeEach(async () => {
    queryParamMapSubject = new BehaviorSubject<ParamMap>(
      new Map([]) as any
    );
    const mockActivatedRoute = {
      queryParamMap: queryParamMapSubject.asObservable(),
    };
    mockFontService = {
      getFontLineFromLetter: vi.fn().mockReturnValue(''),
    };
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: FontService, useValue: mockFontService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    app = fixture.componentInstance;
    app.dataDisplayElement = { nativeElement: { innerHTML: '' } };
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call getFontLineFromLetter when route has url parameter text', () => {
      app.ngOnInit();
      
      queryParamMapSubject.next(
        new Map([
          ['text', 'TEXT'],
          ['character', undefined]
        ]) as any
      );

      expect(mockFontService.getFontLineFromLetter).toHaveBeenLastCalledWith('TEXT', 4, undefined);
    });

    it('should update dataDisplayElement with value returned joined with </br> tag', () => {
      app.ngOnInit();
      const expectedResult = '******<br>******<br>******<br>******<br>******<br>';
      vi.spyOn(mockFontService, 'getFontLineFromLetter').mockReturnValue('******');
      queryParamMapSubject.next(
        new Map([
          ['text', 'TEXT'],
          ['character', undefined]
        ]) as any
      );
      
      expect(app.dataDisplayElement.nativeElement.innerHTML).toEqual(expectedResult)
    });
  });

  describe('onFormSubmit', () => {
    it('should not call getFontLineFromLetter when form is invalid ', () => {
      // Arrange
      app.formModel.set({
        customCharacter: "$",
        text: "",
        shouldClearPreviousGenerations: false
      });

      // Act
      app.onFormSubmit(new SubmitEvent(''));

      // Assert
      expect(mockFontService.getFontLineFromLetter).toHaveBeenCalledTimes(0);
    });

    it('should call getFontLineFromLetter when form is valid', () => {
      // Arrange
      app.formModel.set({
        customCharacter: "$",
        text: "a",
        shouldClearPreviousGenerations: false
      });

      // Act
      app.onFormSubmit(new SubmitEvent(''));

      // Assert
      expect(mockFontService.getFontLineFromLetter).toHaveBeenCalledTimes(figuralFontHeight);
    });

    it('should clear displayElement when shouldClearPreviousGenerations is set to true', () => {
      // Arrange
      const previousContent = '********<br />';
      app.dataDisplayElement.nativeElement.innerHTML = previousContent;
      app.formModel.set({
        customCharacter: "$",
        text: "a",
        shouldClearPreviousGenerations: true
      });

      vi.mocked(mockFontService.getFontLineFromLetter).mockReturnValue('$');

      console.log(app.dataDisplayElement.nativeElement.innerHTML)
      // Act
      app.onFormSubmit(new SubmitEvent(''));

      // Assert
      expect(app.dataDisplayElement.nativeElement.innerHTML).toEqual('$<br>$<br>$<br>$<br>$<br>');
    })
   
    it('should not clear displayElement when shouldClearPreviousGenerations is set to true', () => {
      // Arrange
      const previousContent = '********<br>';
      app.dataDisplayElement.nativeElement.innerHTML = previousContent;
      app.formModel.set({
        customCharacter: "$",
        text: "a",
        shouldClearPreviousGenerations: false
      });

      vi.mocked(mockFontService.getFontLineFromLetter).mockReturnValue('$');

      console.log(app.dataDisplayElement.nativeElement.innerHTML)
      // Act
      app.onFormSubmit(new SubmitEvent(''));

      // Assert
      expect(app.dataDisplayElement.nativeElement.innerHTML).toEqual('********<br>$<br>$<br>$<br>$<br>$<br>');
    })
  });
});
