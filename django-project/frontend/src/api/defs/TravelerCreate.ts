/* tslint:disable:max-line-length */

import * as __model from '../model';

export interface TravelerCreate {
  readonly id?: number;
  first_name?: string;
  last_name?: string;
  password: string;
  language?: LanguageTravelerCreateEnum;
  /** format: date-time */
  readonly date_joined?: string;
  confirm_password: string;
  mobile_phone?: string;
  /** format: email */
  email: string;
  username: string;
  accepted_lopd?: boolean;
  identification?: string;
  address: __model.Address;
  code: string;
}

export type LanguageTravelerCreateEnum =
  'en' |
  'es' |
  'fr';
