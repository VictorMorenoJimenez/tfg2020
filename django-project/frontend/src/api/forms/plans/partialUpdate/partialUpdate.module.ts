/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {PlansService} from '../../../controllers/Plans';
import {FormsSharedModule} from '../../forms-shared.module';
import {PlansPartialUpdateFormService} from './partialUpdate.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    PlansService,
    PlansPartialUpdateFormService,
  ],
})
export class PlansPartialUpdateModule {}
