/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {PlansService} from '../../../controllers/Plans';
import {FormsSharedModule} from '../../forms-shared.module';
import {PlansListFormService} from './list.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    PlansService,
    PlansListFormService,
  ],
})
export class PlansListModule {}
