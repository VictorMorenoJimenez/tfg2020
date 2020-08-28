/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {AuthService} from '../../../controllers/Auth';
import {FormsSharedModule} from '../../forms-shared.module';
import {AuthUserReadFormService} from './userRead.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    AuthService,
    AuthUserReadFormService,
  ],
})
export class AuthUserReadModule {}
