/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {CommentsService} from '../../../controllers/Comments';
import {FormsSharedModule} from '../../forms-shared.module';
import {CommentsRepliesUpdateFormService} from './repliesUpdate.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    CommentsService,
    CommentsRepliesUpdateFormService,
  ],
})
export class CommentsRepliesUpdateModule {}
