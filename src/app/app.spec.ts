import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from './app';
import { FontService } from './services/font.service';

describe('App', () => {
  let fixture: any;
  let app: App;
  let queryParamMapSubject: BehaviorSubject<ParamMap>;
  let mockFontService: any;

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
      const expectedResult = '******</br>******</br>******</br>******</br>******</br>';
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
});
