/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {DestinationsService} from '../../../controllers/Destinations';
import {FormsSharedModule} from '../../forms-shared.module';
import {DestinationsCreateFormService} from './create.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    DestinationsService,
    DestinationsCreateFormService,
  ],
})
export class DestinationsCreateModule {}
