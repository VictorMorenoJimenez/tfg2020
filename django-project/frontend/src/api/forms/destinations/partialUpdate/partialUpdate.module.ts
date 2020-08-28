/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {DestinationsService} from '../../../controllers/Destinations';
import {FormsSharedModule} from '../../forms-shared.module';
import {DestinationsPartialUpdateFormService} from './partialUpdate.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    DestinationsService,
    DestinationsPartialUpdateFormService,
  ],
})
export class DestinationsPartialUpdateModule {}
