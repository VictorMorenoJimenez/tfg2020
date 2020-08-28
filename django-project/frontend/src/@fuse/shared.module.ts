import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { FuseDirectivesModule } from '@fuse/directives/directives';
import { FusePipesModule } from '@fuse/pipes/pipes.module';
import { PaginatedTableComponent } from './components/paginated-table/paginated-table.component';
import {ProjectMaterialModule} from '../app/project-material.module';
import {NoResultsComponent} from './components/no-results/no-results.component';
import {FakeLoadingComponent} from './components/fake-loading/fake-loading.component';
import {NgxContentLoadingModule} from 'ngx-content-loading';
import {ProjectErrorModule} from './components/project-error/project-error.module';
import {ProjectErrorTabModule} from './components/project-error-tab/project-error-tab.module';
import {FuseDialogsModule} from './components/dialogs/dialogs.module';
import {QuillModule} from 'ngx-quill';


@NgModule({
    declarations: [
        FakeLoadingComponent,
        PaginatedTableComponent,
        NoResultsComponent
    ],
    imports  : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        FuseDirectivesModule,
        FusePipesModule,
        NgxContentLoadingModule,
        ProjectMaterialModule,
        ProjectErrorModule,
        ProjectErrorTabModule,
        FuseDialogsModule,
        QuillModule
    ],
    exports  : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        FuseDirectivesModule,
        FusePipesModule,
        NgxContentLoadingModule,
        ProjectMaterialModule,
        PaginatedTableComponent,
        ProjectErrorModule,
        ProjectErrorTabModule,
        FakeLoadingComponent,
        FuseDialogsModule,
        QuillModule
    ]
})
export class FuseSharedModule
{
}
