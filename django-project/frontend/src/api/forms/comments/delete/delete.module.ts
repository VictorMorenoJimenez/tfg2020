/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {CommentsService} from '../../../controllers/Comments';
import {FormsSharedModule} from '../../forms-shared.module';
import {CommentsDeleteFormService} from './delete.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    CommentsService,
    CommentsDeleteFormService,
  ],
})
export class CommentsDeleteModule {}
