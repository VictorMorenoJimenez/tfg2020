/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {TripsService} from '../../../controllers/Trips';
import {FormsSharedModule} from '../../forms-shared.module';
import {TripsListFormService} from './list.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    TripsService,
    TripsListFormService,
  ],
})
export class TripsListModule {}
