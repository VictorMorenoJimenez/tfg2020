/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {CommentsService} from '../../../controllers/Comments';
import {FormsSharedModule} from '../../forms-shared.module';
import {CommentsPartialUpdateFormService} from './partialUpdate.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    CommentsService,
    CommentsPartialUpdateFormService,
  ],
})
export class CommentsPartialUpdateModule {}
