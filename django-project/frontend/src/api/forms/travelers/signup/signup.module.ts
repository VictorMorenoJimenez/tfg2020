/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {TravelersService} from '../../../controllers/Travelers';
import {FormsSharedModule} from '../../forms-shared.module';
import {TravelersSignupFormService} from './signup.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    TravelersService,
    TravelersSignupFormService,
  ],
})
export class TravelersSignupModule {}
