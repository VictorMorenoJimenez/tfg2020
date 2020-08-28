/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {AuthService} from '../../../controllers/Auth';
import {FormsSharedModule} from '../../forms-shared.module';
import {AuthUserPartialUpdateFormService} from './userPartialUpdate.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    AuthService,
    AuthUserPartialUpdateFormService,
  ],
})
export class AuthUserPartialUpdateModule {}
