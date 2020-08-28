/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {TravelersService} from '../../../controllers/Travelers';
import {FormsSharedModule} from '../../forms-shared.module';
import {TravelersCreateFormService} from './create.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    TravelersService,
    TravelersCreateFormService,
  ],
})
export class TravelersCreateModule {}
