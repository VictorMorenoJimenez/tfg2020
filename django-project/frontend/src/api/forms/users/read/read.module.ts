/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {UsersService} from '../../../controllers/Users';
import {FormsSharedModule} from '../../forms-shared.module';
import {UsersReadFormService} from './read.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    UsersService,
    UsersReadFormService,
  ],
})
export class UsersReadModule {}
