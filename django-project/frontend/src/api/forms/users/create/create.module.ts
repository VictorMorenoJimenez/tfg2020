/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {UsersService} from '../../../controllers/Users';
import {FormsSharedModule} from '../../forms-shared.module';
import {UsersCreateFormService} from './create.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    UsersService,
    UsersCreateFormService,
  ],
})
export class UsersCreateModule {}
