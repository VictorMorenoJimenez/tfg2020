import {ProjectMaterialModule} from 'app/project-material.module';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FuseSharedModule} from '@fuse/shared.module';
import {CommonModule} from '@angular/common';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {createTranslateLoader} from 'app/app.module';
import {TranslateResolver} from 'app/utils/translate.resolve';
import { AppUtilsModule } from 'app/utils/utils.module';
import { ProfileDetailFormComponent } from './detail/profile-detail-form/profile-detail-form.component';
import { ProfileComponent } from './profile.component';

const routes = [
    {
        path: 'profile',
        component: ProfileComponent,
        resolve: { translates: TranslateResolver }
    },
    {
        path: 'profile/edit',
        component: ProfileDetailFormComponent,
        resolve: { translates: TranslateResolver }
    }
];

@NgModule({
    declarations: [
        ProfileDetailFormComponent,
        ProfileComponent
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
    exports: [],
    providers: [
        TranslateResolver
    ]
})
export class ProfileModule {
}
