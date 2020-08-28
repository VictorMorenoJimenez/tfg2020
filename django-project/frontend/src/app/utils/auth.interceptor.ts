import {Injectable} from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse,
    HttpXsrfTokenExtractor, HttpHeaders
} from '@angular/common/http';
import {Observable, throwError, of} from 'rxjs';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/internal/operators';
import {AuthService} from './auth.service';
import {TranslateService} from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {AppStorageService} from './app-storage.service';
import {FuseConfigService} from '../../@fuse/services/config.service';
import 'rxjs-compat/add/operator/first';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    delayTimer: any;

    constructor(
        private router: Router,
        private auth: AuthService,
        private _translateService: TranslateService,
        private tokenExtractor: HttpXsrfTokenExtractor,
        public snackBar: MatSnackBar,
        private _fuseConfigService: FuseConfigService,
        private appStorageService: AppStorageService,
        private translateService: TranslateService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let ln = this.appStorageService.get('language') || window.navigator.language || 'en';
        ln = ln.split('-')[0];
        const language = this._translateService.currentLang || ln ;

        let headers = {};
        if (this.auth.getToken()){
            headers = {
                'Authorization': 'Token ' + this.auth.getToken()
            };
        }
        if (this.auth.getTokenImpersonate()){
            headers['ImpersonateAuthorization'] = 'Token ' + this.auth.getTokenImpersonate();
        }

        headers['Accept-Language'] = language;

        const authReq = req.clone({
            headers: new HttpHeaders(headers)
        });

        return next.handle(authReq).pipe(catchError((error, caught) => {
            this.handleAuthError(error);
            return throwError(error);
        }) as any);
    }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        let translate1: string;
        let translate2: string;
        let translateError: string;
        this.translateService
            .get(`You must register to have access or make use of the requested information. Register Now for free`)
            .subscribe((text: string) => {translate1 = text; });
        this.translateService.get(`Close`).subscribe((text: string) => {translate2 = text; });
        this.translateService
            .get(`Error, we are working to solve the problem.`)
            .subscribe((text: string) => {translateError = text; });

        if (err.status === 401) {

            clearTimeout(this.delayTimer);
            this.delayTimer = setTimeout(() => {
                this._fuseConfigService.getConfig().first().subscribe((config) => {
                    if (!config.public){
                        // if (this.auth.getToken()){
                        this.snackBar.open(
                            translate1,
                            translate2 || 'X',
                            {panelClass: 'error'}
                        );
                        // }
                        this.router.navigate(['/login']);
                    }
                });
            }, 1000); // Will do the ajax stuff after 4000 ms, or 4 s


            if (this.auth.getToken()){
                this.auth.setToken('');
            }
            if (this.auth.getTokenImpersonate()){
                this.auth.setTokenImpersonate('');
            }
        } else if (err.status === 400) {
            try{
                if (err && err.error) {
                    if (err.error.non_field_errors) {
                        this.showError(err.error.non_field_errors);
                    } else if (JSON.parse(err.error).non_field_errors) {
                        this.showError(JSON.parse(err.error).non_field_errors);
                    }
                }
            }catch (err){}
        } else if (err.status === 500) {
            this.snackBar.open(
                translateError,
                translate2 || 'X',
                {panelClass: 'error'}
            );
        }
        throw err;
    }

    private showError(error: any, parent?: string): void {
        let translate1: string;
        this.translateService.get(`Close`).subscribe((text: string) => {translate1 = text; });
        if (Array.isArray(error)) {
            error.forEach((err) => {
                this.showError(err, parent);
            });
        } else if (typeof error === 'object') {
            Object.keys(error).map((key) => {
                this.showError(error[key], parent + ' ' + key);
            });
        } else {
            if (parent){
                this.snackBar.open(
                    parent + ': ' + error,
                    translate1 || 'X',
                    {panelClass: 'error'}
                );
            }else{
                this.snackBar.open(
                    error,
                    translate1 || 'X',
                    {panelClass: 'error'}
                );
            }
        }
    }
}
