/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {DestinationsService} from '../../../controllers/Destinations';
import {FormsSharedModule} from '../../forms-shared.module';
import {DestinationsDeleteFormService} from './delete.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    DestinationsService,
    DestinationsDeleteFormService,
  ],
})
export class DestinationsDeleteModule {}
