/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {TripsService} from '../../../controllers/Trips';
import {FormsSharedModule} from '../../forms-shared.module';
import {TripsCreateFormService} from './create.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    TripsService,
    TripsCreateFormService,
  ],
})
export class TripsCreateModule {}
