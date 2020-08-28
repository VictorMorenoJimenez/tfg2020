/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import { TravelersListModule } from './list/list.module';
import { TravelersCreateModule } from './create/create.module';
import { TravelersSignupModule } from './signup/signup.module';
import { TravelersReadModule } from './read/read.module';
import { TravelersUpdateModule } from './update/update.module';
import { TravelersPartialUpdateModule } from './partialUpdate/partialUpdate.module';
import { TravelersDeleteModule } from './delete/delete.module';

@NgModule({
  imports: [
    TravelersListModule,
    TravelersCreateModule,
    TravelersSignupModule,
    TravelersReadModule,
    TravelersUpdateModule,
    TravelersPartialUpdateModule,
    TravelersDeleteModule,
  ],
  exports: [
    TravelersListModule,
    TravelersCreateModule,
    TravelersSignupModule,
    TravelersReadModule,
    TravelersUpdateModule,
    TravelersPartialUpdateModule,
    TravelersDeleteModule,
  ],
})
export class TravelersFormModule {}
