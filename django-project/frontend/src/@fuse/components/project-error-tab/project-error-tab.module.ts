import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

import {ProjectErrorTabComponent} from './project-error-tab.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {createTranslateLoader} from 'app/app.module';
import {HttpClient} from '@angular/common/http';


@NgModule({
    imports     : [
        CommonModule,
        RouterModule,

        MatIconModule,
        MatRippleModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
    ],
    exports     : [
        ProjectErrorTabComponent
    ],
    declarations: [
        ProjectErrorTabComponent
    ]
})
export class ProjectErrorTabModule
{
}
