/* tslint:disable:max-line-length */

import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { APIConfigService } from '../apiconfig.service';

import * as __model from '../model';

export interface LoginParams {
  data: __model.Login;
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
}

export interface LogoutListParams {
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
}

export interface LogoutCreateParams {
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
}

export interface ChangeParams {
  data: __model.PasswordChange;
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
}

export interface ResetParams {
  data: __model.CustomPasswordReset;
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
}

export interface ConfirmParams {
  data: __model.PasswordResetConfirm;
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
}

export interface SignupParams {
  data: __model.Register;
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
}

export interface SignupAccountConfirmEmailReadParams {
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
  key: string;
}

export interface SignupAccountConfirmEmailCreateParams {
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
  key: string;
}

export interface UserReadParams {
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
}

export interface UserUpdateParams {
  data: __model.User;
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
}

export interface UserPartialUpdateParams {
  data: __model.User;
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
}

@Injectable()
export class AuthService {
  constructor(
    private http: HttpClient,
    private apiConfigService: APIConfigService) {}


  /**
   * Check the credentials and return the REST Token
   * if the credentials are valid and authenticated.
   * Calls Django Auth login method to register User ID
   * in Django session framework
   *
   * Accept the following POST parameters: username, password
   * Return the REST Framework Token Object's key.
   * http://localhost:8080/swagger/swagger-ui.html#!/auth/auth_login_create
   */
  login(params: LoginParams): Observable<__model.Login> {
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

    return this.http.post<__model.Login>(this.apiConfigService.options.apiUrl + `/auth/login/`, bodyParamsWithoutUndefined, {params: queryParams});
  }

  /**
   * Calls Django logout method and delete the Token object
   * assigned to the current User object.
   * Accepts/Returns nothing.
   * http://localhost:8080/swagger/swagger-ui.html#!/auth/auth_logout_list
   */
  logoutList(params: LogoutListParams): Observable<string> {
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

    return this.http.get(this.apiConfigService.options.apiUrl + `/auth/logout/`, {params: queryParams, responseType: 'text'});
  }

  /**
   * Calls Django logout method and delete the Token object
   * assigned to the current User object.
   * Accepts/Returns nothing.
   * http://localhost:8080/swagger/swagger-ui.html#!/auth/auth_logout_create
   */
  logoutCreate(params: LogoutCreateParams): Observable<string> {
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

    return this.http.post(this.apiConfigService.options.apiUrl + `/auth/logout/`, {}, {params: queryParams, responseType: 'text'});
  }

  /**
   * Calls Django Auth SetPasswordForm save method.
   * Accepts the following POST parameters: new_password1, new_password2
   * Returns the success/fail message.
   * http://localhost:8080/swagger/swagger-ui.html#!/auth/auth_password_change_create
   */
  change(params: ChangeParams): Observable<__model.PasswordChange> {
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

    return this.http.post<__model.PasswordChange>(this.apiConfigService.options.apiUrl + `/auth/password/change/`, bodyParamsWithoutUndefined, {params: queryParams});
  }

  /**
   * Calls Django Auth PasswordResetForm save method.
   * Accepts the following POST parameters: email
   * Returns the success/fail message.
   * http://localhost:8080/swagger/swagger-ui.html#!/auth/auth_password_reset_create
   */
  reset(params: ResetParams): Observable<__model.CustomPasswordReset> {
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

    return this.http.post<__model.CustomPasswordReset>(this.apiConfigService.options.apiUrl + `/auth/password/reset/`, bodyParamsWithoutUndefined, {params: queryParams});
  }

  /**
   * Password reset e-mail link is confirmed, therefore
   * this resets the user's password.
   * Accepts the following POST parameters: token, uid,
   *  new_password1, new_password2
   * Returns the success/fail message.
   * http://localhost:8080/swagger/swagger-ui.html#!/auth/auth_password_reset_confirm_create
   */
  confirm(params: ConfirmParams): Observable<__model.PasswordResetConfirm> {
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

    return this.http.post<__model.PasswordResetConfirm>(this.apiConfigService.options.apiUrl + `/auth/password/reset/confirm/`, bodyParamsWithoutUndefined, {params: queryParams});
  }

  /** http://localhost:8080/swagger/swagger-ui.html#!/auth/auth_signup_create */
  signup(params: SignupParams): Observable<__model.Register> {
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

    return this.http.post<__model.Register>(this.apiConfigService.options.apiUrl + `/auth/signup/`, bodyParamsWithoutUndefined, {params: queryParams});
  }

  /** http://localhost:8080/swagger/swagger-ui.html#!/auth/auth_signup_account-confirm-email_read */
  signupAccountConfirmEmailRead(params: SignupAccountConfirmEmailReadParams): Observable<string> {
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
      key: params.key,
    };
    return this.http.get(this.apiConfigService.options.apiUrl + `/auth/signup/account-confirm-email/${pathParams.key}/`, {params: queryParams, responseType: 'text'});
  }

  /** http://localhost:8080/swagger/swagger-ui.html#!/auth/auth_signup_account-confirm-email_create */
  signupAccountConfirmEmailCreate(params: SignupAccountConfirmEmailCreateParams): Observable<string> {
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
      key: params.key,
    };
    return this.http.post(this.apiConfigService.options.apiUrl + `/auth/signup/account-confirm-email/${pathParams.key}/`, {}, {params: queryParams, responseType: 'text'});
  }

  /**
   * Reads and updates UserModel fields
   * Accepts GET, PUT, PATCH methods.
   * Default accepted fields: username, first_name, last_name
   * Default display fields: pk, username, email, first_name, last_name
   * Read-only fields: pk, email
   *
   * Returns UserModel fields.
   * http://localhost:8080/swagger/swagger-ui.html#!/auth/auth_user_read
   */
  userRead(params: UserReadParams): Observable<__model.User> {
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

    return this.http.get<__model.User>(this.apiConfigService.options.apiUrl + `/auth/user/`, {params: queryParams});
  }

  /**
   * Reads and updates UserModel fields
   * Accepts GET, PUT, PATCH methods.
   * Default accepted fields: username, first_name, last_name
   * Default display fields: pk, username, email, first_name, last_name
   * Read-only fields: pk, email
   *
   * Returns UserModel fields.
   * http://localhost:8080/swagger/swagger-ui.html#!/auth/auth_user_update
   */
  userUpdate(params: UserUpdateParams): Observable<__model.User> {
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

    return this.http.put<__model.User>(this.apiConfigService.options.apiUrl + `/auth/user/`, bodyParamsWithoutUndefined, {params: queryParams});
  }

  /**
   * Reads and updates UserModel fields
   * Accepts GET, PUT, PATCH methods.
   * Default accepted fields: username, first_name, last_name
   * Default display fields: pk, username, email, first_name, last_name
   * Read-only fields: pk, email
   *
   * Returns UserModel fields.
   * http://localhost:8080/swagger/swagger-ui.html#!/auth/auth_user_partial_update
   */
  userPartialUpdate(params: UserPartialUpdateParams): Observable<__model.User> {
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

    return this.http.patch<__model.User>(this.apiConfigService.options.apiUrl + `/auth/user/`, bodyParamsWithoutUndefined, {params: queryParams});
  }
}
