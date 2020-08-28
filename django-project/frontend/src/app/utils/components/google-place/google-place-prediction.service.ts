import {ElementRef, Injectable} from '@angular/core';
import {MapsAPILoader} from '@agm/core';

import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/bindCallback';
import {map} from 'rxjs/operators';
import PlaceResult = google.maps.places.PlaceResult;
import AutocompletePrediction = google.maps.places.AutocompletePrediction;
import ComponentRestrictions = google.maps.places.ComponentRestrictions;
import Autocomplete = google.maps.places.Autocomplete;

@Injectable({
    providedIn: 'root',
})
export class GooglePlacePredictionService {

    private autocompleteService;
    private placeService;

    constructor(private mapsAPILoader: MapsAPILoader) {
        this.mapsAPILoader.load().then(() => {
            this.autocompleteService = new google.maps.places.AutocompleteService();
            this.placeService = new google.maps.places.PlacesService(document.createElement('div'));
        });
    }

    public static setAutocomplete(element: ElementRef, types?: string[], componentRestrictions?: ComponentRestrictions): Autocomplete {
        return new google.maps.places.Autocomplete(element.nativeElement,
            {
                componentRestrictions: componentRestrictions, // {country: 'ES'},
                bounds: new google.maps.LatLngBounds(new google.maps.LatLng(35.805438, -9.580671), new google.maps.LatLng(71.834456, 48.156258)),
                strictBounds: true,
                types: types ? types : []// 'establishment' / 'address' / 'geocode'
            });
    }

    getFirsPlacePrediction(term: string): Observable<PlaceResult> {

        return Observable.create(observer => {
            // 1 get predictions
            const results$: Observable<AutocompletePrediction[]> = this.getPlacePredictions(term);

            results$.pipe(
                map(result => {
                    if (result) {
                        // 2 get place by place_id
                        this.placeService.getDetails({placeId: result[0].place_id}, place => {
                            observer.next(place);
                            observer.complete();
                        });
                    } else {
                        // We can get null result for example for special characters
                        observer.next(null);
                        observer.complete();
                    }
                })
            ).subscribe();
        });
    }

    // Wrapper for Google Places Autocomplete Prediction API, returns observable
    getPlacePredictions(term: string): Observable<AutocompletePrediction[]> {
        return Observable.create(observer => {
            // API Call
            this.autocompleteService.getQueryPredictions({input: term}, data => {
                let previousData: Array<AutocompletePrediction[]>;
                // Data validation
                if (data) {
                    previousData = data;
                    observer.next(data);
                    observer.complete();
                }
                // If no data, emit previous data
                if (!data) {
                    observer.next(previousData);
                    observer.complete();
                    // Error Handling
                } else {
                    observer.error(status);
                }
            });
        });
    }
}
