/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {CoreService} from '../../../controllers/Core';
import {FormsSharedModule} from '../../forms-shared.module';
import {CoreContentTypeListFormService} from './contentTypeList.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    CoreService,
    CoreContentTypeListFormService,
  ],
})
export class CoreContentTypeListModule {}
