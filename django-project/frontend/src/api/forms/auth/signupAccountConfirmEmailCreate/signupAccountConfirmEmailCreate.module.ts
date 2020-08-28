/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {AuthService} from '../../../controllers/Auth';
import {FormsSharedModule} from '../../forms-shared.module';
import {AuthSignupAccountConfirmEmailCreateFormService} from './signupAccountConfirmEmailCreate.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    AuthService,
    AuthSignupAccountConfirmEmailCreateFormService,
  ],
})
export class AuthSignupAccountConfirmEmailCreateModule {}
