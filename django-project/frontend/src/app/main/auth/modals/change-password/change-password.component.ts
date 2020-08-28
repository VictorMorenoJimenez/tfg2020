import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialogRef } from '@angular/material/dialog';
import { UtilsForm } from 'app/utils/utilsForm.class';
import { takeUntil, map, catchError } from 'rxjs/operators';
import { Utils } from 'app/utils/utils';
import { of } from 'rxjs';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { PydrfpermissionsPydrfpermissionsFormService, AuthChangeFormService } from 'api/form-service';

@Component({
    selector: 'change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ChangePasswordComponent
    extends UtilsForm<AuthChangeFormService>
    implements OnInit {

    constructor(
        public permissionsFormService: PydrfpermissionsPydrfpermissionsFormService,
        public _fuseNavigationService: FuseNavigationService,
        public dialogRef: MatDialogRef<ChangePasswordComponent>,
        private snackBar: MatSnackBar,
        private translateService: TranslateService,
        private partialUpdateService: AuthChangeFormService
    ) {
        super(permissionsFormService, _fuseNavigationService);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.formService = this.partialUpdateService;
        this.formService.reset();

        super.ngOnInit();
    }

    /** Send the form to the server */
    submit(): void {

        this.formService
            .submit()
            .pipe(
                takeUntil(this.unsubscribe$),
                map(() => {
                    this.dialogRef.close();
                    this.snackBar.open(
                        this.translateService.instant(`Password successfully saved.`),
                        this.translateService.instant(`Close`)
                    );
                }),
                catchError(errors => {
                    if (errors && errors.error && !errors.error.non_field_errors) {
                        this.snackBar.open(
                            this.translateService.instant(`An error occurred while saving the password. Check the fields marked in red`),
                            this.translateService.instant(`Close`),
                            { panelClass: 'error' }
                        );
                    }

                    Utils.processServerErrors(
                        this.form.controls.data['controls'],
                        errors.error
                    );
                    return of({});
                })
            )
            .subscribe();

    }

}
