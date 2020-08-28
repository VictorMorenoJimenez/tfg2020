/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {CommentsService} from '../../../controllers/Comments';
import {FormsSharedModule} from '../../forms-shared.module';
import {CommentsReadFormService} from './read.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    CommentsService,
    CommentsReadFormService,
  ],
})
export class CommentsReadModule {}
