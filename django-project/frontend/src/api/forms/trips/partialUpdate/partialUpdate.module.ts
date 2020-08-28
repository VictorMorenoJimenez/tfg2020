/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {TripsService} from '../../../controllers/Trips';
import {FormsSharedModule} from '../../forms-shared.module';
import {TripsPartialUpdateFormService} from './partialUpdate.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    TripsService,
    TripsPartialUpdateFormService,
  ],
})
export class TripsPartialUpdateModule {}
