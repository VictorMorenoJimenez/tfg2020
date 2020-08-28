/* tslint:disable:max-line-length */

import * as __model from '../model';

export interface User {
  readonly id?: number;
  first_name?: string;
  last_name?: string;
  password: string;
  /** format: date-time */
  readonly date_joined?: string;
  readonly user_type?: User_typeUserEnum;
  /** format: email */
  email: string;
  mobile_phone?: string;
  readonly is_locked?: boolean;
  username: string;
  identification?: string;
  address: __model.Address;
  language?: LanguageUserEnum;
  readonly email_is_verified?: string;
  readonly mobile_is_verified?: string;
  readonly is_verified?: string;
}

export type User_typeUserEnum =
  'admin' |
  'traveler' |
  'undefined';

export type LanguageUserEnum =
  'en' |
  'es' |
  'fr';
