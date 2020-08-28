/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {UsersService} from '../../../controllers/Users';
import {FormsSharedModule} from '../../forms-shared.module';
import {UsersDeleteFormService} from './delete.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    UsersService,
    UsersDeleteFormService,
  ],
})
export class UsersDeleteModule {}
