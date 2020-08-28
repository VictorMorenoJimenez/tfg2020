import { Injectable } from '@angular/core';
import {Resolve, Router} from '@angular/router';
import {catchError, map, takeUntil} from 'rxjs/operators';
import {of, Subject} from 'rxjs';
import {AuthUserReadFormService} from 'api/form-service';

@Injectable()
export class RoutesResolver implements Resolve<any> {

    protected unsubscribe$: Subject<void> = new Subject();

    defaultRoute = '/home';
    login = '/login';
    routeByType = {
        confederation_admin: '/home',
        federation_admin: '/home',
        association_admin: '/home',
        breeder: '/home',
        judge: '/home',
    };

    constructor(private currentUserFS: AuthUserReadFormService,
                private router: Router) {
    }

    resolve() {
        // Get current user
        this.currentUserFS.submit(false, true, true).pipe(
            takeUntil(this.unsubscribe$),
            map((res: any) => {
                if (res.user_type && this.routeByType[res.user_type]){
                    this.router.navigateByUrl(
                        this.routeByType[res.user_type]
                    );
                }else{
                    this.router.navigateByUrl(
                        this.defaultRoute
                    );
                }
            }),
            catchError(errors => {
                this.router.navigateByUrl(
                    this.login
                );
                return of({});
            })
        ).subscribe();
    }
}
