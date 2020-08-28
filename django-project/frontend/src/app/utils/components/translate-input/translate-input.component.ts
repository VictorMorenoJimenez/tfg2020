import {Component, ContentChild, Input, OnInit, TemplateRef} from '@angular/core';
import {CommonOptionsService} from '../../commonOptions.service';
import {AppStorageService} from '../../app-storage.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-translate-input',
    templateUrl: './translate-input.component.html',
    styleUrls: ['./translate-input.component.scss']
})
export class TranslateInputComponent implements OnInit {

    @Input() field: any;
    @Input() serverErrors: any;
    @Input() form: any;

    @ContentChild(TemplateRef) templateInput: TemplateRef<any>;

    items: any[];

    selectedIndex = 0;

    // options select
    languages: any[];

    constructor(private commonOptionsService: CommonOptionsService,
                private appStorageService: AppStorageService,
                private _translateService: TranslateService) {
      // get options select
      this.languages = commonOptionsService.getLanguageOptions();
    }

    ngOnInit(): void {
        let ln = this.appStorageService.get('language') || window.navigator.language || 'en';
        ln = ln.split('-')[0];
        const language = this._translateService.currentLang || ln ;

        this.items = [];
        for (const i in this.languages){
            const obj = this.languages[i];
            obj.field = this.field + '_' + this.languages[i].id;
            obj.error = [this.field + '_' + this.languages[i].id];
            this.items.push(obj);

            if (this.languages[i].id === language){
                this.selectedIndex = parseInt(i);
            }
        }
    }

}
