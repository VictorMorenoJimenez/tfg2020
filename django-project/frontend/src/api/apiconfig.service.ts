/* tslint:disable:max-line-length */

import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class APIConfigServiceOptions {
  public apiUrl = environment.apiUrl;
  public cacheSize = (environment["apiCacheSize"]) ? environment["apiCacheSize"] : 1000;
}
@Injectable({
  providedIn: 'root'
})
export class APIConfigService {
  public options: APIConfigServiceOptions;
  private _window: string[];
  private _cache: any;

  get cache(): any {
    if ( Object.keys(this._cache).length >= this.options.cacheSize && this._window.length === 0 ){
      this._window = Object.keys(this._cache);
    }
    if ( Object.keys(this._cache).length >= this.options.cacheSize * 2 ){
      this._window.forEach(k => delete this._cache[k]);
      this._window = Object.keys(this._cache);
    }
    return this._cache;
  }

  constructor( options: APIConfigServiceOptions ) {
    this.options = options;
    this.resetCache();
  }

  resetCache(): void {
    this._cache = {};
    this._window = [];
  }
}
