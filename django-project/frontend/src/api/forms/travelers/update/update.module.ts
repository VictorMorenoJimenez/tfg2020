/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {TravelersService} from '../../../controllers/Travelers';
import {FormsSharedModule} from '../../forms-shared.module';
import {TravelersUpdateFormService} from './update.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    TravelersService,
    TravelersUpdateFormService,
  ],
})
export class TravelersUpdateModule {}
