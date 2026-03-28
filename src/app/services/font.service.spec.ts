import { TestBed } from '@angular/core/testing';

import { beforeEach, describe, expect, it } from 'vitest';
import { doubleSpace } from '../constants/app.constants';
import { FontService } from './font.service';

describe('Font', () => {
  let service: FontService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FontService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getFontLineFromLetter', () => {
    it('should return line patterns based on text and row number provided', () => {
      // Arrange
      const expectedOutput =`* * * * *  ${doubleSpace}    * *     `;
      
      // Act
      const line = service.getFontLineFromLetter('a Y', 2);

      // Assert
      expect(line).toEqual(expectedOutput);
    });

    it('should return correct line pattern with default character replaced by custom character', () => {
      // Arrange 
      const expectedOutput = `$ $ $ $ $  ${doubleSpace}    $ $     `;

      // Act
      const line = service.getFontLineFromLetter('A y', 2, "$");

      // Assert
      expect(line).toEqual(expectedOutput);
    });
  })
});
