/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {CommentsService} from '../../../controllers/Comments';
import {FormsSharedModule} from '../../forms-shared.module';
import {CommentsRepliesCreateFormService} from './repliesCreate.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    CommentsService,
    CommentsRepliesCreateFormService,
  ],
})
export class CommentsRepliesCreateModule {}
