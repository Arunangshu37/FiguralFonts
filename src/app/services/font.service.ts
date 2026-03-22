import { Injectable } from '@angular/core';
import { doubleSpace, singleSpace } from '../constants/app.constants';
import { alphabetMap } from '../data/figural-font.helper';

@Injectable({
  providedIn: 'root',
})
export class FontService {
  
  public getFontLineFromLetter(text: string, row: number, customCharacter?: string) {
    let line = "";
    for(let index = 0; index < text.length; index++) {
      if(text[index] == singleSpace) {
        line = line.concat(doubleSpace);
        continue;
      }
      line = line.concat(alphabetMap[text[index]][row]);
      if(customCharacter) {
        line = line.replaceAll("*", customCharacter);
      }
    }
    return line;
  }
}
