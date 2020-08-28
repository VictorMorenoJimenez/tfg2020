/* tslint:disable:max-line-length */

import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { APIConfigService } from '../apiconfig.service';

import * as __model from '../model';

export interface ListParams {
  /** A search term. */
  search?: string;
  traveler?: string;
  destination?: string;
  departure_date?: string;
  return_date?: string;
  /** Number of results to return per page. */
  limit?: number;
  /** The initial index from which to return the results. */
  offset?: number;
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
}

export interface CreateParams {
  data: __model.Trip;
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
}

export interface ReadParams {
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
  /** A unique integer value identifying this trip. */
  id: number;
}

export interface UpdateParams {
  data: __model.Trip;
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
  /** A unique integer value identifying this trip. */
  id: number;
}

export interface PartialUpdateParams {
  data: __model.Trip;
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
  /** A unique integer value identifying this trip. */
  id: number;
}

export interface DeleteParams {
  /** A unique integer value identifying this trip. */
  id: number;
}

@Injectable()
export class TripsService {
  constructor(
    private http: HttpClient,
    private apiConfigService: APIConfigService) {}


  /** http://localhost:8080/swagger/swagger-ui.html#!/trips/trips_list */
  list(params: ListParams): Observable<__model.TripsList> {
    const queryParamBase = {
      search: params.search,
      traveler: params.traveler,
      destination: params.destination,
      departure_date: params.departure_date,
      return_date: params.return_date,
      limit: params.limit,
      offset: params.offset,
      fields: params.fields,
      expand: params.expand,
    };

    let queryParams = new HttpParams();
    Object.entries(queryParamBase).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          let val = '';
          value.forEach(v => val += v + ',');
          if (val.length > 0 ) {
            val = val.slice(0, val.length - 1);
          }
          queryParams = queryParams.set(key, val);
        } else if (typeof value === 'string') {
          queryParams = queryParams.set(key, value);
        } else {
          queryParams = queryParams.set(key, JSON.stringify(value));
        }
      }
    });

    return this.http.get<__model.TripsList>(this.apiConfigService.options.apiUrl + `/trips/`, {params: queryParams});
  }

  /** http://localhost:8080/swagger/swagger-ui.html#!/trips/trips_create */
  create(params: CreateParams): Observable<__model.Trip> {
    const bodyParams = params.data;
    const bodyParamsWithoutUndefined: any = Array.isArray(bodyParams) ? [] : {};
    Object.entries(bodyParams || {}).forEach(([key, value]) => {
      if (value !== undefined) {
        bodyParamsWithoutUndefined[key] = value;
      }
    });
    const queryParamBase = {
      fields: params.fields,
      expand: params.expand,
    };

    let queryParams = new HttpParams();
    Object.entries(queryParamBase).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          let val = '';
          value.forEach(v => val += v + ',');
          if (val.length > 0 ) {
            val = val.slice(0, val.length - 1);
          }
          queryParams = queryParams.set(key, val);
        } else if (typeof value === 'string') {
          queryParams = queryParams.set(key, value);
        } else {
          queryParams = queryParams.set(key, JSON.stringify(value));
        }
      }
    });

    return this.http.post<__model.Trip>(this.apiConfigService.options.apiUrl + `/trips/`, bodyParamsWithoutUndefined, {params: queryParams});
  }

  /** http://localhost:8080/swagger/swagger-ui.html#!/trips/trips_read */
  read(params: ReadParams): Observable<__model.Trip> {
    const queryParamBase = {
      fields: params.fields,
      expand: params.expand,
    };

    let queryParams = new HttpParams();
    Object.entries(queryParamBase).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          let val = '';
          value.forEach(v => val += v + ',');
          if (val.length > 0 ) {
            val = val.slice(0, val.length - 1);
          }
          queryParams = queryParams.set(key, val);
        } else if (typeof value === 'string') {
          queryParams = queryParams.set(key, value);
        } else {
          queryParams = queryParams.set(key, JSON.stringify(value));
        }
      }
    });

    const pathParams = {
      id: params.id,
    };
    return this.http.get<__model.Trip>(this.apiConfigService.options.apiUrl + `/trips/${pathParams.id}/`, {params: queryParams});
  }

  /** http://localhost:8080/swagger/swagger-ui.html#!/trips/trips_update */
  update(params: UpdateParams): Observable<__model.Trip> {
    const bodyParams = params.data;
    const bodyParamsWithoutUndefined: any = Array.isArray(bodyParams) ? [] : {};
    Object.entries(bodyParams || {}).forEach(([key, value]) => {
      if (value !== undefined) {
        bodyParamsWithoutUndefined[key] = value;
      }
    });
    const queryParamBase = {
      fields: params.fields,
      expand: params.expand,
    };

    let queryParams = new HttpParams();
    Object.entries(queryParamBase).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          let val = '';
          value.forEach(v => val += v + ',');
          if (val.length > 0 ) {
            val = val.slice(0, val.length - 1);
          }
          queryParams = queryParams.set(key, val);
        } else if (typeof value === 'string') {
          queryParams = queryParams.set(key, value);
        } else {
          queryParams = queryParams.set(key, JSON.stringify(value));
        }
      }
    });

    const pathParams = {
      id: params.id,
    };
    return this.http.put<__model.Trip>(this.apiConfigService.options.apiUrl + `/trips/${pathParams.id}/`, bodyParamsWithoutUndefined, {params: queryParams});
  }

  /** http://localhost:8080/swagger/swagger-ui.html#!/trips/trips_partial_update */
  partialUpdate(params: PartialUpdateParams): Observable<__model.Trip> {
    const bodyParams = params.data;
    const bodyParamsWithoutUndefined: any = Array.isArray(bodyParams) ? [] : {};
    Object.entries(bodyParams || {}).forEach(([key, value]) => {
      if (value !== undefined) {
        bodyParamsWithoutUndefined[key] = value;
      }
    });
    const queryParamBase = {
      fields: params.fields,
      expand: params.expand,
    };

    let queryParams = new HttpParams();
    Object.entries(queryParamBase).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          let val = '';
          value.forEach(v => val += v + ',');
          if (val.length > 0 ) {
            val = val.slice(0, val.length - 1);
          }
          queryParams = queryParams.set(key, val);
        } else if (typeof value === 'string') {
          queryParams = queryParams.set(key, value);
        } else {
          queryParams = queryParams.set(key, JSON.stringify(value));
        }
      }
    });

    const pathParams = {
      id: params.id,
    };
    return this.http.patch<__model.Trip>(this.apiConfigService.options.apiUrl + `/trips/${pathParams.id}/`, bodyParamsWithoutUndefined, {params: queryParams});
  }

  /** http://localhost:8080/swagger/swagger-ui.html#!/trips/trips_delete */
  delete(params: DeleteParams): Observable<string> {
    const pathParams = {
      id: params.id,
    };
    return this.http.delete(this.apiConfigService.options.apiUrl + `/trips/${pathParams.id}/`, {responseType: 'text'});
  }
}
