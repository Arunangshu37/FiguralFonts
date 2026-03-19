import { Injectable } from '@angular/core';
import { alphabetMap } from '../data/figural-font.helper';

@Injectable({
  providedIn: 'root',
})
export class FontService {
  
  public getFontLineFromLetter(text: string, row: number) {
    let line = "";
    for(let index = 0; index < text.length; index++) {
      if(text[index] == " ") {
        line = line.concat("   ");
        continue;
      }
      line = line.concat(alphabetMap[text[index]][row])
    }
    return line;
  }
}
