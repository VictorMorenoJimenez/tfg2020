/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {CoreService} from '../../../controllers/Core';
import {FormsSharedModule} from '../../forms-shared.module';
import {CoreContentTypeReadFormService} from './contentTypeRead.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    CoreService,
    CoreContentTypeReadFormService,
  ],
})
export class CoreContentTypeReadModule {}
