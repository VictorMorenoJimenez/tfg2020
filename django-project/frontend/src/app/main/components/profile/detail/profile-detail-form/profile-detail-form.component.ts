import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { takeUntil, map, catchError } from 'rxjs/operators';

import {
    User
} from 'api/model';

import { dataUrl, Utils } from 'app/utils/utils';
import { UtilsForm } from 'app/utils/utilsForm.class';

import { PydrfpermissionsPydrfpermissionsFormService, AuthUserReadFormService, AuthUserPartialUpdateFormService } from 'api/form-service';

import { TranslateService } from '@ngx-translate/core';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import {CommonOptionsService} from 'app/utils/commonOptions.service';

@Component({
    selector: 'app-profile-detail-form',
    templateUrl: './profile-detail-form.component.html',
    styleUrls: ['./profile-detail-form.component.scss']
})
export class ProfileDetailFormComponent
    extends UtilsForm<AuthUserPartialUpdateFormService>
    implements OnInit {

    backUrl: string;
    isEdit: boolean;
    user: User;
    error = false;

    // options select
    types: any[];

    constructor(
        public permissionsFormService: PydrfpermissionsPydrfpermissionsFormService,
        public _fuseNavigationService: FuseNavigationService,
        private userReadFormService: AuthUserReadFormService,
        private partialUpdateService: AuthUserPartialUpdateFormService,
        private router: Router,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private translateService: TranslateService,
        private commonOptionsService: CommonOptionsService
    ) {
        super(permissionsFormService, _fuseNavigationService);
    }

    ngOnInit(): void {
        this.types = this.commonOptionsService.getUserOptions();

        this.formService = this.partialUpdateService;
        this.getProfileData();

        this.backUrl = `/profile`;
        super.ngOnInit();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    cancelEdit($event: MouseEvent): void {
        this.router.navigate([this.backUrl], {relativeTo: this.route});
    }

    /** Send the form to the server */
    submit(): void {
        console.log(this.formService.form.value);
        this.formService.submit(this.formService.form.value).
        pipe(
            takeUntil(this.unsubscribe$),
            map(profile => {
                this.router.navigateByUrl(
                    this.backUrl
                );

                this.snackBar.open(
                    this.translateService.instant(`Profile successfully saved.`),
                    this.translateService.instant(`Close`)
                );
            }),
            catchError(errors => {
                if (!(errors && errors.error && errors.error.non_field_errors)) {
                    this.snackBar.open(
                        this.translateService.instant(`An error occurred while saving the profile. Check the fields marked in red`),
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
        ).subscribe();
    }

    getProfileData(): void {
        this.userReadFormService
            .submit({ expand: '~all' }, false)
            .pipe(
                takeUntil(this.unsubscribe$),
                map(val => {
                    this.user = val;
                    this.formService.reset({
                        data: this.user
                    });
                }),
                catchError(error => {
                    this.error = true;
                    return of({});
                })
            )
            .subscribe();
    }
}
