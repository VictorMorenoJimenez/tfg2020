import {Pipe, PipeTransform} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Pipe({
    name: 'transWithoutExtract',
    pure: false
})
export class TranslateWithoutExtractPipe implements PipeTransform {

    constructor(
        private translateService: TranslateService
    ) {

    }

    transform(element, params): any{
        let text = this.translateService.instant(element, params);
        for (const i in params){
            const expReg = new RegExp('{{' + i + '}}', 'g');
            text = text.replace(expReg, params[i]);
        }
        return text;
    }
}
