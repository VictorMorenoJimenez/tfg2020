/* tslint:disable:max-line-length */

import * as __model from '../model';

export interface Plan {
  readonly id?: number;
  name: string;
  description: string;
  /** format: date-time */
  start_time: string;
  price?: number;
  duration?: string;
  capacity?: number;
  traveler: string;
  traveler_data?: __model.Traveler;
  destination: number;
  destination_data?: __model.Destination;
}
