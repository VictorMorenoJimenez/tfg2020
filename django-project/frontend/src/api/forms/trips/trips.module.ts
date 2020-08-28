/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import { TripsListModule } from './list/list.module';
import { TripsCreateModule } from './create/create.module';
import { TripsReadModule } from './read/read.module';
import { TripsUpdateModule } from './update/update.module';
import { TripsPartialUpdateModule } from './partialUpdate/partialUpdate.module';
import { TripsDeleteModule } from './delete/delete.module';

@NgModule({
  imports: [
    TripsListModule,
    TripsCreateModule,
    TripsReadModule,
    TripsUpdateModule,
    TripsPartialUpdateModule,
    TripsDeleteModule,
  ],
  exports: [
    TripsListModule,
    TripsCreateModule,
    TripsReadModule,
    TripsUpdateModule,
    TripsPartialUpdateModule,
    TripsDeleteModule,
  ],
})
export class TripsFormModule {}
