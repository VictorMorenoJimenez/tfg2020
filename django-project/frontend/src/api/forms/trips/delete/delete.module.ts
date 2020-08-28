/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {TripsService} from '../../../controllers/Trips';
import {FormsSharedModule} from '../../forms-shared.module';
import {TripsDeleteFormService} from './delete.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    TripsService,
    TripsDeleteFormService,
  ],
})
export class TripsDeleteModule {}
