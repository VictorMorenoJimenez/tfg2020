/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import { AuthLoginModule } from './login/login.module';
import { AuthLogoutListModule } from './logoutList/logoutList.module';
import { AuthLogoutCreateModule } from './logoutCreate/logoutCreate.module';
import { AuthChangeModule } from './change/change.module';
import { AuthResetModule } from './reset/reset.module';
import { AuthConfirmModule } from './confirm/confirm.module';
import { AuthSignupModule } from './signup/signup.module';
import { AuthSignupAccountConfirmEmailReadModule } from './signupAccountConfirmEmailRead/signupAccountConfirmEmailRead.module';
import { AuthSignupAccountConfirmEmailCreateModule } from './signupAccountConfirmEmailCreate/signupAccountConfirmEmailCreate.module';
import { AuthUserReadModule } from './userRead/userRead.module';
import { AuthUserUpdateModule } from './userUpdate/userUpdate.module';
import { AuthUserPartialUpdateModule } from './userPartialUpdate/userPartialUpdate.module';

@NgModule({
  imports: [
    AuthLoginModule,
    AuthLogoutListModule,
    AuthLogoutCreateModule,
    AuthChangeModule,
    AuthResetModule,
    AuthConfirmModule,
    AuthSignupModule,
    AuthSignupAccountConfirmEmailReadModule,
    AuthSignupAccountConfirmEmailCreateModule,
    AuthUserReadModule,
    AuthUserUpdateModule,
    AuthUserPartialUpdateModule,
  ],
  exports: [
    AuthLoginModule,
    AuthLogoutListModule,
    AuthLogoutCreateModule,
    AuthChangeModule,
    AuthResetModule,
    AuthConfirmModule,
    AuthSignupModule,
    AuthSignupAccountConfirmEmailReadModule,
    AuthSignupAccountConfirmEmailCreateModule,
    AuthUserReadModule,
    AuthUserUpdateModule,
    AuthUserPartialUpdateModule,
  ],
})
export class AuthFormModule {}
