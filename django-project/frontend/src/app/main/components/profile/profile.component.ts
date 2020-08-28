import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';
import { takeUntil, map, catchError } from 'rxjs/operators';
import { Subject, of } from 'rxjs';
import { User } from 'api/model';
import { AuthUserReadFormService } from 'api/form-service';
import { CommonOptionsService } from 'app/utils/commonOptions.service';

@Component({
    selector     : 'profile',
    templateUrl  : './profile.component.html',
    styleUrls    : ['./profile.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ProfileComponent implements OnInit
{

    private unsubscribe$: Subject<void> = new Subject();

    user: User;
    types: any = [];

    /**
     * Constructor
     */
    constructor(
        private userReadFormService: AuthUserReadFormService,
        private commonOptionsService: CommonOptionsService
    )
    {

    }

    ngOnInit(): void {
        this.types = this.commonOptionsService.getUserOptions();
        this.getProfileData();
    }

    getProfileData(): void {
        this.userReadFormService
            .submit({ expand: '~all' }, false)
            .pipe(
                takeUntil(this.unsubscribe$),
                map(val => {
                    console.log(val);
                    this.user = val;
                }),
                catchError(error => {
                    return of({});
                })
            )
            .subscribe();
    }

    getUserType(): string {
        const type = this.types.find(t => t.id === this.user.user_type);
        return type.value;
    }

}
