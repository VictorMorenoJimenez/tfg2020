/* tslint:disable:max-line-length */

import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { APIConfigService } from '../apiconfig.service';

import * as __model from '../model';

export interface PydrfpermissionsParams {
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
}

@Injectable()
export class PydrfpermissionsService {
  constructor(
    private http: HttpClient,
    private apiConfigService: APIConfigService) {}


  /**
   * Returns a permissions list
   * http://localhost:8080/swagger/swagger-ui.html#!/pydrfpermissions/pydrfpermissions_list
   */
  pydrfpermissions(params: PydrfpermissionsParams): Observable<__model.PermissionDRF> {
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

    return this.http.get<__model.PermissionDRF>(this.apiConfigService.options.apiUrl + `/pydrfpermissions/`, {params: queryParams});
  }
}
