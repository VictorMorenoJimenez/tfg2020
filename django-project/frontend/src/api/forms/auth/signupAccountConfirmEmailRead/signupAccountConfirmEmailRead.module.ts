/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {AuthService} from '../../../controllers/Auth';
import {FormsSharedModule} from '../../forms-shared.module';
import {AuthSignupAccountConfirmEmailReadFormService} from './signupAccountConfirmEmailRead.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    AuthService,
    AuthSignupAccountConfirmEmailReadFormService,
  ],
})
export class AuthSignupAccountConfirmEmailReadModule {}
