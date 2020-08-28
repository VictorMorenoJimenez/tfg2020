/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {DestinationsService} from '../../../controllers/Destinations';
import {FormsSharedModule} from '../../forms-shared.module';
import {DestinationsUpdateFormService} from './update.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    DestinationsService,
    DestinationsUpdateFormService,
  ],
})
export class DestinationsUpdateModule {}
