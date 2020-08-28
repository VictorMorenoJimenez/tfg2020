import { NgModule } from '@angular/core';

import { FuseSharedModule } from '@fuse/shared.module';
import {LoginModule} from './login/login.module';
import {ResetPasswordModule} from './reset-password/reset-password.module';
import {ForgotPasswordModule} from './forgot-password/forgot-password.module';
import {AuthModalsModule} from './modals/auth-modals.module';



@NgModule({
    imports     : [
        FuseSharedModule,
        LoginModule,
        ResetPasswordModule,
        ForgotPasswordModule,
        AuthModalsModule
    ]
})
export class AuthModule
{
}
