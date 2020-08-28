/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {DestinationsService} from '../../../controllers/Destinations';
import {FormsSharedModule} from '../../forms-shared.module';
import {DestinationsListFormService} from './list.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    DestinationsService,
    DestinationsListFormService,
  ],
})
export class DestinationsListModule {}
