/* tslint:disable:max-line-length */

import * as __model from '../model';

export interface CoreSendError {
  count: number;
  /** format: uri */
  next?: string;
  /** format: uri */
  previous?: string;
  results: __model.Permission[];
}
