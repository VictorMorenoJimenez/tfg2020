/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {TripsService} from '../../../controllers/Trips';
import {FormsSharedModule} from '../../forms-shared.module';
import {TripsReadFormService} from './read.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    TripsService,
    TripsReadFormService,
  ],
})
export class TripsReadModule {}
