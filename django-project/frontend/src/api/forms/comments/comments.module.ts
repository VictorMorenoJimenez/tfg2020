/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import { CommentsListModule } from './list/list.module';
import { CommentsCreateModule } from './create/create.module';
import { CommentsRepliesListModule } from './repliesList/repliesList.module';
import { CommentsRepliesCreateModule } from './repliesCreate/repliesCreate.module';
import { CommentsRepliesReadModule } from './repliesRead/repliesRead.module';
import { CommentsRepliesUpdateModule } from './repliesUpdate/repliesUpdate.module';
import { CommentsRepliesPartialUpdateModule } from './repliesPartialUpdate/repliesPartialUpdate.module';
import { CommentsRepliesDeleteModule } from './repliesDelete/repliesDelete.module';
import { CommentsReadModule } from './read/read.module';
import { CommentsUpdateModule } from './update/update.module';
import { CommentsPartialUpdateModule } from './partialUpdate/partialUpdate.module';
import { CommentsDeleteModule } from './delete/delete.module';

@NgModule({
  imports: [
    CommentsListModule,
    CommentsCreateModule,
    CommentsRepliesListModule,
    CommentsRepliesCreateModule,
    CommentsRepliesReadModule,
    CommentsRepliesUpdateModule,
    CommentsRepliesPartialUpdateModule,
    CommentsRepliesDeleteModule,
    CommentsReadModule,
    CommentsUpdateModule,
    CommentsPartialUpdateModule,
    CommentsDeleteModule,
  ],
  exports: [
    CommentsListModule,
    CommentsCreateModule,
    CommentsRepliesListModule,
    CommentsRepliesCreateModule,
    CommentsRepliesReadModule,
    CommentsRepliesUpdateModule,
    CommentsRepliesPartialUpdateModule,
    CommentsRepliesDeleteModule,
    CommentsReadModule,
    CommentsUpdateModule,
    CommentsPartialUpdateModule,
    CommentsDeleteModule,
  ],
})
export class CommentsFormModule {}
