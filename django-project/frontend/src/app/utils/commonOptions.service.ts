import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class CommonOptionsService {

    constructor(private translateService: TranslateService

    ) { }

    getLanguageOptions(): any {
        return [
            { id: 'es', value: this.translateService.instant(`Spanish`), flag: 'es' },
            { id: 'fr', value: this.translateService.instant(`French`), flag: 'fr' },
            { id: 'en', value: this.translateService.instant(`English`), flag: 'us' },
            { id: 'it', value: this.translateService.instant(`Italian`), flag: 'it' },
            { id: 'pt', value: this.translateService.instant(`Portuguese`), flag: 'pt' }
        ];
    }

    getUserOptions(): any {
        return [
            { id : 'admin', value: this.translateService.instant(`Admin`)},
            { id : 'competition_admin', value: this.translateService.instant(`Competition admin`)},
            { id : 'association_admin', value: this.translateService.instant(`Association admin`)},
            { id : 'federation_admin', value: this.translateService.instant(`Federation admin`)},
            { id : 'confederation_admin', value: this.translateService.instant(`Confederation admin`)},
            { id : 'breeder', value: this.translateService.instant(`Breeder`)},
            { id : 'Judge', value: this.translateService.instant(`Judge`)},
            { id : 'undefined', value: this.translateService.instant(`Undefined`)},
            { id : 'superuser', value: this.translateService.instant(`Superuser`)}
        ];
    }

}
