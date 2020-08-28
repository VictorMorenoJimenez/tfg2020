/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {UsersService} from '../../../controllers/Users';
import {FormsSharedModule} from '../../forms-shared.module';
import {UsersPartialUpdateFormService} from './partialUpdate.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    UsersService,
    UsersPartialUpdateFormService,
  ],
})
export class UsersPartialUpdateModule {}
