/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {AuthService} from '../../../controllers/Auth';
import {FormsSharedModule} from '../../forms-shared.module';
import {AuthLogoutCreateFormService} from './logoutCreate.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    AuthService,
    AuthLogoutCreateFormService,
  ],
})
export class AuthLogoutCreateModule {}
