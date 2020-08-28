import {ProjectMaterialModule} from '../../../project-material.module';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FuseSharedModule} from '@fuse/shared.module';
import {CommonModule} from '@angular/common';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {createTranslateLoader} from '../../../app.module';
import {AppUtilsModule} from '../../../utils/utils.module';
import {TranslateResolver} from '../../../utils/translate.resolve';
import {HomeViewComponent} from './view/home-view/home-view.component';

const routes = [
    {
        path: 'home',
        component: HomeViewComponent,
        resolve: {
            translates: TranslateResolver
        }
    }
];

@NgModule({
    declarations: [
        HomeViewComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        FuseSharedModule,
        ProjectMaterialModule,
        AppUtilsModule,

        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
    ],
    exports: [
    ],
    providers: [
        TranslateResolver,
    ]
})
export class HomeModule {
}
