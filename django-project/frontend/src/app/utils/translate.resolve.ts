import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class TranslateResolver implements Resolve<any> {
  constructor(private translateService: TranslateService) {}

  resolve() {
    // A single translation loads all the translations
    return this.translateService.get(`translation load`);
  }
}
