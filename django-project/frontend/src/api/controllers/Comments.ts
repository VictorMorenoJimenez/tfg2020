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
  plan?: string;
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
  data: __model.Comment;
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
}

export interface RepliesListParams {
  /** A search term. */
  search?: string;
  comment?: string;
  /** Number of results to return per page. */
  limit?: number;
  /** The initial index from which to return the results. */
  offset?: number;
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
}

export interface RepliesCreateParams {
  data: __model.Reply;
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
}

export interface RepliesReadParams {
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
  /** A unique integer value identifying this comment. */
  id: number;
}

export interface RepliesUpdateParams {
  data: __model.Reply;
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
  /** A unique integer value identifying this comment. */
  id: number;
}

export interface RepliesPartialUpdateParams {
  data: __model.Reply;
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
  /** A unique integer value identifying this comment. */
  id: number;
}

export interface RepliesDeleteParams {
  /** A unique integer value identifying this comment. */
  id: number;
}

export interface ReadParams {
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
  /** A unique integer value identifying this comment. */
  id: number;
}

export interface UpdateParams {
  data: __model.Comment;
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
  /** A unique integer value identifying this comment. */
  id: number;
}

export interface PartialUpdateParams {
  data: __model.Comment;
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
  /** A unique integer value identifying this comment. */
  id: number;
}

export interface DeleteParams {
  /** A unique integer value identifying this comment. */
  id: number;
}

@Injectable()
export class CommentsService {
  constructor(
    private http: HttpClient,
    private apiConfigService: APIConfigService) {}


  /** http://localhost:8080/swagger/swagger-ui.html#!/comments/comments_list */
  list(params: ListParams): Observable<__model.CommentsList> {
    const queryParamBase = {
      search: params.search,
      traveler: params.traveler,
      plan: params.plan,
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

    return this.http.get<__model.CommentsList>(this.apiConfigService.options.apiUrl + `/comments/`, {params: queryParams});
  }

  /** http://localhost:8080/swagger/swagger-ui.html#!/comments/comments_create */
  create(params: CreateParams): Observable<__model.Comment> {
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

    return this.http.post<__model.Comment>(this.apiConfigService.options.apiUrl + `/comments/`, bodyParamsWithoutUndefined, {params: queryParams});
  }

  /** http://localhost:8080/swagger/swagger-ui.html#!/comments/comments_replies_list */
  repliesList(params: RepliesListParams): Observable<__model.CommentsRepliesList> {
    const queryParamBase = {
      search: params.search,
      comment: params.comment,
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

    return this.http.get<__model.CommentsRepliesList>(this.apiConfigService.options.apiUrl + `/comments/replies/`, {params: queryParams});
  }

  /** http://localhost:8080/swagger/swagger-ui.html#!/comments/comments_replies_create */
  repliesCreate(params: RepliesCreateParams): Observable<__model.Reply> {
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

    return this.http.post<__model.Reply>(this.apiConfigService.options.apiUrl + `/comments/replies/`, bodyParamsWithoutUndefined, {params: queryParams});
  }

  /** http://localhost:8080/swagger/swagger-ui.html#!/comments/comments_replies_read */
  repliesRead(params: RepliesReadParams): Observable<__model.Reply> {
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
    return this.http.get<__model.Reply>(this.apiConfigService.options.apiUrl + `/comments/replies/${pathParams.id}/`, {params: queryParams});
  }

  /** http://localhost:8080/swagger/swagger-ui.html#!/comments/comments_replies_update */
  repliesUpdate(params: RepliesUpdateParams): Observable<__model.Reply> {
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
    return this.http.put<__model.Reply>(this.apiConfigService.options.apiUrl + `/comments/replies/${pathParams.id}/`, bodyParamsWithoutUndefined, {params: queryParams});
  }

  /** http://localhost:8080/swagger/swagger-ui.html#!/comments/comments_replies_partial_update */
  repliesPartialUpdate(params: RepliesPartialUpdateParams): Observable<__model.Reply> {
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
    return this.http.patch<__model.Reply>(this.apiConfigService.options.apiUrl + `/comments/replies/${pathParams.id}/`, bodyParamsWithoutUndefined, {params: queryParams});
  }

  /** http://localhost:8080/swagger/swagger-ui.html#!/comments/comments_replies_delete */
  repliesDelete(params: RepliesDeleteParams): Observable<string> {
    const pathParams = {
      id: params.id,
    };
    return this.http.delete(this.apiConfigService.options.apiUrl + `/comments/replies/${pathParams.id}/`, {responseType: 'text'});
  }

  /** http://localhost:8080/swagger/swagger-ui.html#!/comments/comments_read */
  read(params: ReadParams): Observable<__model.Comment> {
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
    return this.http.get<__model.Comment>(this.apiConfigService.options.apiUrl + `/comments/${pathParams.id}/`, {params: queryParams});
  }

  /** http://localhost:8080/swagger/swagger-ui.html#!/comments/comments_update */
  update(params: UpdateParams): Observable<__model.Comment> {
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
    return this.http.put<__model.Comment>(this.apiConfigService.options.apiUrl + `/comments/${pathParams.id}/`, bodyParamsWithoutUndefined, {params: queryParams});
  }

  /** http://localhost:8080/swagger/swagger-ui.html#!/comments/comments_partial_update */
  partialUpdate(params: PartialUpdateParams): Observable<__model.Comment> {
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
    return this.http.patch<__model.Comment>(this.apiConfigService.options.apiUrl + `/comments/${pathParams.id}/`, bodyParamsWithoutUndefined, {params: queryParams});
  }

  /** http://localhost:8080/swagger/swagger-ui.html#!/comments/comments_delete */
  delete(params: DeleteParams): Observable<string> {
    const pathParams = {
      id: params.id,
    };
    return this.http.delete(this.apiConfigService.options.apiUrl + `/comments/${pathParams.id}/`, {responseType: 'text'});
  }
}
