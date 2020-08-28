/* tslint:disable:max-line-length */

import * as __model from '../model';

export interface Traveler {
  readonly id?: number;
  code: string;
  accepted_lopd?: boolean;
  first_name?: string;
  last_name?: string;
  password: string;
  confirm_password: string;
  language?: LanguageTravelerEnum;
  user_type?: User_typeTravelerEnum;
  /** format: email */
  email: string;
  mobile_phone?: string;
  is_locked?: boolean;
  username: string;
  identification?: string;
  address: __model.Address;
}

export type LanguageTravelerEnum =
  'en' |
  'es' |
  'fr';

export type User_typeTravelerEnum =
  'admin' |
  'traveler' |
  'undefined';
