import {ProjectMaterialModule} from 'app/project-material.module';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FuseSharedModule} from '@fuse/shared.module';
import {CommonModule} from '@angular/common';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {createTranslateLoader} from 'app/app.module';
import { AppUtilsModule } from 'app/utils/utils.module';
import {PhoneVerifyModalComponent} from './phone-verify/phone-verify-modal.component';
import { ChangePasswordComponent } from './change-password/change-password.component';


@NgModule({
    declarations: [
        PhoneVerifyModalComponent,
        ChangePasswordComponent
    ],
    imports: [
        CommonModule,
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
    ]
})
export class AuthModalsModule {
}
