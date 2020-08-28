/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import { PlansListModule } from './list/list.module';
import { PlansCreateModule } from './create/create.module';
import { PlansReadModule } from './read/read.module';
import { PlansUpdateModule } from './update/update.module';
import { PlansPartialUpdateModule } from './partialUpdate/partialUpdate.module';
import { PlansDeleteModule } from './delete/delete.module';

@NgModule({
  imports: [
    PlansListModule,
    PlansCreateModule,
    PlansReadModule,
    PlansUpdateModule,
    PlansPartialUpdateModule,
    PlansDeleteModule,
  ],
  exports: [
    PlansListModule,
    PlansCreateModule,
    PlansReadModule,
    PlansUpdateModule,
    PlansPartialUpdateModule,
    PlansDeleteModule,
  ],
})
export class PlansFormModule {}
