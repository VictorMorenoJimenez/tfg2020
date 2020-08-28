/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {PlansService} from '../../../controllers/Plans';
import {FormsSharedModule} from '../../forms-shared.module';
import {PlansCreateFormService} from './create.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    PlansService,
    PlansCreateFormService,
  ],
})
export class PlansCreateModule {}
