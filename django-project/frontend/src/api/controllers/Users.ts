/* tslint:disable:max-line-length */

import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { APIConfigService } from '../apiconfig.service';

import * as __model from '../model';

export interface ListParams {
  /** A search term. */
  search?: string;
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
  data: __model.User;
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
  /** A unique integer value identifying this user. */
  id: number;
}

export interface UpdateParams {
  data: __model.User;
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
  /** A unique integer value identifying this user. */
  id: number;
}

export interface PartialUpdateParams {
  data: __model.User;
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
  /** A unique integer value identifying this user. */
  id: number;
}

export interface DeleteParams {
  /** A unique integer value identifying this user. */
  id: number;
}

@Injectable()
export class UsersService {
  constructor(
    private http: HttpClient,
    private apiConfigService: APIConfigService) {}


  /** http://localhost:8080/swagger/swagger-ui.html#!/users/users_list */
  list(params: ListParams): Observable<__model.UsersList> {
    const queryParamBase = {
      search: params.search,
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

    return this.http.get<__model.UsersList>(this.apiConfigService.options.apiUrl + `/users/`, {params: queryParams});
  }

  /** http://localhost:8080/swagger/swagger-ui.html#!/users/users_create */
  create(params: CreateParams): Observable<__model.User> {
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

    return this.http.post<__model.User>(this.apiConfigService.options.apiUrl + `/users/`, bodyParamsWithoutUndefined, {params: queryParams});
  }

  /** http://localhost:8080/swagger/swagger-ui.html#!/users/users_read */
  read(params: ReadParams): Observable<__model.User> {
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
    return this.http.get<__model.User>(this.apiConfigService.options.apiUrl + `/users/${pathParams.id}/`, {params: queryParams});
  }

  /** http://localhost:8080/swagger/swagger-ui.html#!/users/users_update */
  update(params: UpdateParams): Observable<__model.User> {
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
    return this.http.put<__model.User>(this.apiConfigService.options.apiUrl + `/users/${pathParams.id}/`, bodyParamsWithoutUndefined, {params: queryParams});
  }

  /** http://localhost:8080/swagger/swagger-ui.html#!/users/users_partial_update */
  partialUpdate(params: PartialUpdateParams): Observable<__model.User> {
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
    return this.http.patch<__model.User>(this.apiConfigService.options.apiUrl + `/users/${pathParams.id}/`, bodyParamsWithoutUndefined, {params: queryParams});
  }

  /** http://localhost:8080/swagger/swagger-ui.html#!/users/users_delete */
  delete(params: DeleteParams): Observable<string> {
    const pathParams = {
      id: params.id,
    };
    return this.http.delete(this.apiConfigService.options.apiUrl + `/users/${pathParams.id}/`, {responseType: 'text'});
  }
}
