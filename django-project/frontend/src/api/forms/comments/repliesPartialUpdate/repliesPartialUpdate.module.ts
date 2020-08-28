/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {CommentsService} from '../../../controllers/Comments';
import {FormsSharedModule} from '../../forms-shared.module';
import {CommentsRepliesPartialUpdateFormService} from './repliesPartialUpdate.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    CommentsService,
    CommentsRepliesPartialUpdateFormService,
  ],
})
export class CommentsRepliesPartialUpdateModule {}
