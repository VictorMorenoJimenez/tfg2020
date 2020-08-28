import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {merge, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import {
    PydrfpermissionsPydrfpermissionsFormService
} from 'api/form-service';
import {Permissions} from '../../../app/utils/permissions.class';
import {AppStorageService} from '../../../app/utils/app-storage.service';

@Component({
    selector       : 'fuse-navigation',
    templateUrl    : './navigation.component.html',
    styleUrls      : ['./navigation.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FuseNavigationComponent extends Permissions implements OnInit
{
    @Input()
    layout = 'vertical';

    @Input()
    navigation: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     *
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {FuseNavigationService} _fuseNavigationService
     * @param {PydrfpermissionsPydrfpermissionsFormService} permissionsFormService
     * @param {AppStorageService} appStorageService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        public _fuseNavigationService: FuseNavigationService,
        public permissionsFormService: PydrfpermissionsPydrfpermissionsFormService,
        public appStorageService: AppStorageService
    )
    {
        super(permissionsFormService, _fuseNavigationService);
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Load the navigation either from the input or from the service
        this.navigation = this.navigation || this._fuseNavigationService.getCurrentNavigation();

        // Subscribe to the current navigation changes
        this._fuseNavigationService.onNavigationChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {

                // Load the navigation
                this.navigation = this.navigation || this._fuseNavigationService.getCurrentNavigation();
                this._fuseNavigationService.reloadPermissions(this.isAllowed, this);
                if (this.hasPermission('dashboard', 'LIST')){
                    this._fuseNavigationService.reloadBadges();
                }
                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Subscribe to navigation item
        merge(
            this._fuseNavigationService.onNavigationItemAdded,
            this._fuseNavigationService.onNavigationItemUpdated,
            this._fuseNavigationService.onNavigationItemRemoved
        ).pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }


}
