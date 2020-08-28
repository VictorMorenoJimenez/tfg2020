import { DescriptionDialogComponent } from './description/description.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ConfirmDialogComponent } from './confirm/confirm.component';
import { InfoDialogComponent } from './info/info.component';
import { FileDialogComponent } from './file/file.component';
import { InputFileConfig, InputFileModule } from 'ngx-input-file';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {createTranslateLoader} from "../../../app/app.module";
import {HttpClient} from "@angular/common/http";

const config: InputFileConfig = {fileAccept: '*', fileLimit: 1};


@NgModule({
    imports     : [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatInputModule,
        FlexLayoutModule,
        MatFormFieldModule,
        InputFileModule.forRoot(config),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),

    ],
    exports     : [
        ConfirmDialogComponent,
        InfoDialogComponent,
        DescriptionDialogComponent,
        FileDialogComponent
    ],
    declarations: [
      ConfirmDialogComponent,
      InfoDialogComponent,
      DescriptionDialogComponent,
      FileDialogComponent
    ]
})
export class FuseDialogsModule
{
}
