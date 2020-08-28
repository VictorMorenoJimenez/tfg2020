/* tslint:disable:max-line-length */

import * as __model from '../model';

export interface Comment {
  readonly id?: number;
  text: string;
  traveler_data?: __model.Traveler;
  plan_data?: __model.Plan;
}
