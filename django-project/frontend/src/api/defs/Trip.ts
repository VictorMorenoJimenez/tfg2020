/* tslint:disable:max-line-length */

import * as __model from '../model';

export interface Trip {
  readonly id?: number;
  name: string;
  description: string;
  /** format: date */
  departure_date: string;
  /** format: date */
  return_date: string;
  traveler: string;
  traveler_data?: __model.Traveler;
  destinations?: number[];
  readonly destinations_data?: __model.Destination[];
}
