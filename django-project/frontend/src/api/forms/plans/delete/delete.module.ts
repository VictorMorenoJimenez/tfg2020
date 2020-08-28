/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {PlansService} from '../../../controllers/Plans';
import {FormsSharedModule} from '../../forms-shared.module';
import {PlansDeleteFormService} from './delete.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    PlansService,
    PlansDeleteFormService,
  ],
})
export class PlansDeleteModule {}
