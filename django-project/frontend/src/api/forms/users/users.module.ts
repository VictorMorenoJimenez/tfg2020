/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import { UsersListModule } from './list/list.module';
import { UsersCreateModule } from './create/create.module';
import { UsersReadModule } from './read/read.module';
import { UsersUpdateModule } from './update/update.module';
import { UsersPartialUpdateModule } from './partialUpdate/partialUpdate.module';
import { UsersDeleteModule } from './delete/delete.module';

@NgModule({
  imports: [
    UsersListModule,
    UsersCreateModule,
    UsersReadModule,
    UsersUpdateModule,
    UsersPartialUpdateModule,
    UsersDeleteModule,
  ],
  exports: [
    UsersListModule,
    UsersCreateModule,
    UsersReadModule,
    UsersUpdateModule,
    UsersPartialUpdateModule,
    UsersDeleteModule,
  ],
})
export class UsersFormModule {}
