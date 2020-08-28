/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {TravelersService} from '../../../controllers/Travelers';
import {FormsSharedModule} from '../../forms-shared.module';
import {TravelersPartialUpdateFormService} from './partialUpdate.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    TravelersService,
    TravelersPartialUpdateFormService,
  ],
})
export class TravelersPartialUpdateModule {}
