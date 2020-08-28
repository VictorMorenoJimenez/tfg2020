/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {UsersService} from '../../../controllers/Users';
import {FormsSharedModule} from '../../forms-shared.module';
import {UsersUpdateFormService} from './update.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    UsersService,
    UsersUpdateFormService,
  ],
})
export class UsersUpdateModule {}
