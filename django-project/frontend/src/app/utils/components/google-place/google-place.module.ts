import {NgModule} from '@angular/core';
import {GooglePlaceComponent} from './google-place.component';
import {AgmCoreModule} from '@agm/core';
import {RouterModule} from '@angular/router';
import {FuseSharedModule} from '@fuse/shared.module';
import {FuseSearchBarModule, FuseShortcutsModule} from '@fuse/components';
import {TranslateModule} from '@ngx-translate/core';
import { ProjectMaterialModule } from 'app/project-material.module';

@NgModule({
    declarations: [
        GooglePlaceComponent
    ],
    imports: [
        RouterModule,

        ProjectMaterialModule,
        FuseSharedModule,
        FuseSearchBarModule,
        FuseShortcutsModule,

        TranslateModule,

        // google places
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDYuONVjEBHFLoRUS5aGnBDV3Dmhzvx__4',
            libraries: ['places']
        }),
    ],
    exports: [
        GooglePlaceComponent
    ]
})
export class GooglePlacesModule {
}
