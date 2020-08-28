/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {AuthService} from '../../../controllers/Auth';
import {FormsSharedModule} from '../../forms-shared.module';
import {AuthLogoutListFormService} from './logoutList.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    AuthService,
    AuthLogoutListFormService,
  ],
})
export class AuthLogoutListModule {}
