import { Injectable } from '@angular/core';
import { PrefilledTextDto } from '@shared/dtos/prefilled-text.dto';
import prefilledTexts from '@referentiels/prefilled-texts.json';
import { orderBy } from 'lodash-es';

@Injectable({
  providedIn: 'root',
})
export class PrefilledTextsService {
  constructor() {}

  public getItems(): PrefilledTextDto[] {
    return orderBy(prefilledTexts, (x) => x.title);
  }
}
