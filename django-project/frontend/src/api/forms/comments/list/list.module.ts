/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {CommentsService} from '../../../controllers/Comments';
import {FormsSharedModule} from '../../forms-shared.module';
import {CommentsListFormService} from './list.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    CommentsService,
    CommentsListFormService,
  ],
})
export class CommentsListModule {}
