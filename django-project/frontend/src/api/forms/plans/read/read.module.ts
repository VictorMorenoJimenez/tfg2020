/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {PlansService} from '../../../controllers/Plans';
import {FormsSharedModule} from '../../forms-shared.module';
import {PlansReadFormService} from './read.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    PlansService,
    PlansReadFormService,
  ],
})
export class PlansReadModule {}
