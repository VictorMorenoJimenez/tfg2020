/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {AuthService} from '../../../controllers/Auth';
import {FormsSharedModule} from '../../forms-shared.module';
import {AuthSignupFormService} from './signup.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    AuthService,
    AuthSignupFormService,
  ],
})
export class AuthSignupModule {}
