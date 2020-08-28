/* tslint:disable:max-line-length */

import { Injectable } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ReplaySubject, Observable, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { DestinationsService } from '../../../controllers/Destinations';
import * as __model from '../../../model';
import { environment } from 'environments/environment';
import { APIConfigService } from '../../../apiconfig.service';


@Injectable()
export class DestinationsCreateFormService {
  form: FormGroup;
  defaultValue: any;
  serverErrors$: Observable<any>;
  private serverErrorsSubject: ReplaySubject<any>;
  loading$: Observable<boolean>;
  private loadingSubject: ReplaySubject<boolean>;
  private cacheSub: any;
  private cache: string;
  constructor(
    private destinationsService: DestinationsService,
    private apiConfigService: APIConfigService,
  ) {
    this.form = new FormGroup({
      data: new FormGroup({
        id: new FormControl({value: undefined, disabled: false}, []),
        name: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(256), Validators.minLength(1), Validators.required]),
        description: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(256), Validators.minLength(1), Validators.required]),
        address: new FormGroup({
          country: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(255)]),
          formatted_address: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(1024)]),
          latitude: new FormControl({value: undefined, disabled: false}, []),
          locality: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(255)]),
          longitude: new FormControl({value: undefined, disabled: false}, []),
          place_id: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(512)]),
          postal_code: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(255)]),
          province: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(255)]),
          street: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(1024)]),
          street_number: new FormControl({value: undefined, disabled: false}, [Validators.max(4294967295)]),
        }, [Validators.required]),
      }, [Validators.required]),
      fields: new FormControl({value: undefined, disabled: false}, []),
      expand: new FormControl({value: undefined, disabled: false}, []),
    });
    this.defaultValue = this.form.value;
    this.serverErrorsSubject = new ReplaySubject<any>(1);
    this.serverErrors$ = this.serverErrorsSubject.asObservable();
    this.loadingSubject = new ReplaySubject<boolean>(1);
    this.loading$ = this.loadingSubject.asObservable();
    this.cacheSub = {};
    this.cache = 'DestinationsCreate';
  }

  submit(value: any = false): Observable<__model.Destination> {
    const cache = false;
    const only_cache = false;
    if (value === false) {
      value = this.form.value;
    }
    this.cacheSub[JSON.stringify(value) + cache] = new ReplaySubject<__model.Destination>(1);
    const subject = this.cacheSub[JSON.stringify(value) + cache];
    let cache_hit = false;
    if (cache && this.apiConfigService.cache[this.cache + JSON.stringify(value) + cache]) {
      subject.next({...this.apiConfigService.cache[this.cache + JSON.stringify(value) + cache]});
      cache_hit = true;
      if (only_cache) {
        subject.complete();
        this.loadingSubject.next(false);
        delete this.cacheSub[JSON.stringify(value) + cache];
        return subject.asObservable();
      }
    }
    this.loadingSubject.next(true);
    this.serverErrorsSubject.next(null);
    this.try(subject, value, cache_hit, cache);
    return subject.asObservable();
  }
  try(subject: ReplaySubject<__model.Destination>, value: any, cache_hit: boolean, cache: boolean, waitOnRetry = 1000, maxRetries = environment.apiRetries): void {
    const result = this.destinationsService.create(value);
    result.pipe(
      map(val => {
        if (!cache_hit || JSON.stringify(this.apiConfigService.cache[this.cache + JSON.stringify(value) + cache]) !== JSON.stringify(val)) {
          if (cache) {
            this.apiConfigService.cache[this.cache + JSON.stringify(value) + cache] = val;
          }
          subject.next({...val});
        }
        subject.complete();
        delete this.cacheSub[JSON.stringify(value) + cache];
        this.loadingSubject.next(false);
        return val;
      }),
      catchError(error => {
        if (error.status >= 500 && maxRetries > 0) {
            // A client-side or network error occurred. Handle it accordingly.
            setTimeout(() => this.try(subject, value, cache_hit, cache, waitOnRetry + 1000, maxRetries - 1), waitOnRetry);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            this.serverErrorsSubject.next(error.error);
            subject.error(error);
            subject.complete();
            delete this.cacheSub[JSON.stringify(value) + cache];
            this.loadingSubject.next(false);
        }
        return throwError(error);
      })
    ).subscribe();
  }
  cancelPreviousRequest(): void {
    Object.keys(this.cacheSub).forEach(key => this.cacheSub[key].unsubscribe());
    this.cacheSub = {};
  }


  reset(value?: any): void {
    this.form.reset();
    this.serverErrorsSubject.next(null);
    this.loadingSubject.next(false);
    this.form.patchValue(this.defaultValue);
    if (value) {
      this.form.patchValue(value);
    }
  }
  patch(value: any): void {
    this.form.patchValue(value);
  }
}
