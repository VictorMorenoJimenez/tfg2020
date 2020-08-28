/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import { DestinationsListModule } from './list/list.module';
import { DestinationsCreateModule } from './create/create.module';
import { DestinationsReadModule } from './read/read.module';
import { DestinationsUpdateModule } from './update/update.module';
import { DestinationsPartialUpdateModule } from './partialUpdate/partialUpdate.module';
import { DestinationsDeleteModule } from './delete/delete.module';

@NgModule({
  imports: [
    DestinationsListModule,
    DestinationsCreateModule,
    DestinationsReadModule,
    DestinationsUpdateModule,
    DestinationsPartialUpdateModule,
    DestinationsDeleteModule,
  ],
  exports: [
    DestinationsListModule,
    DestinationsCreateModule,
    DestinationsReadModule,
    DestinationsUpdateModule,
    DestinationsPartialUpdateModule,
    DestinationsDeleteModule,
  ],
})
export class DestinationsFormModule {}
