/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {TravelersService} from '../../../controllers/Travelers';
import {FormsSharedModule} from '../../forms-shared.module';
import {TravelersDeleteFormService} from './delete.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    TravelersService,
    TravelersDeleteFormService,
  ],
})
export class TravelersDeleteModule {}
