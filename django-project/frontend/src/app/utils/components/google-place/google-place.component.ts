import {
    AfterViewInit,
    Component,
    EventEmitter,
    forwardRef,
    Input,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {GooglePlacePredictionService} from './google-place-prediction.service';
import PlaceResult = google.maps.places.PlaceResult;
import Autocomplete = google.maps.places.Autocomplete;

@Component({
    selector: 'app-google-place',
    templateUrl: './google-place.component.html',
    styleUrls: ['./google-place.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => GooglePlaceComponent),
            multi: true
        }
    ],
    encapsulation: ViewEncapsulation.None
})
export class GooglePlaceComponent implements OnInit, AfterViewInit {

    @Input() placeform: FormGroup; // used for validation
    @Input() label: string;
    @Input() public fControlName = 'formatted_address';
    @Input() public required = false;

    @Input() adressType: string; // used for component configuration
    @Output() valueChange: EventEmitter<PlaceResult> = new EventEmitter();
    @ViewChild('googleInput') googleInput: any;

    place: PlaceResult = null;

    @Input() public placeholder: string = null;
    @Input() public value: string = null;

    @Output() public controls = new EventEmitter();

    constructor(
        private _formBuilder: FormBuilder,
        private placePredictionService: GooglePlacePredictionService // for automatic selection
    ) {
    }

    ngOnInit(): void {
        if (!this.placeform) {
            this.placeform = this._formBuilder.group({
                [this.fControlName]: ['', this.required ? [Validators.required] : null],
                country: [''],
                locality: [''],
                place_id: [''],
                province: [''],
                street: [''],
                latitude: [''],
                longitude: [''],
                street_number: ['']
            });
        } else {
            if (this.placeform.get('formatted_address').value) {
                this.value = this.placeform.get('formatted_address').value;
            }
        }
    }

    ngAfterViewInit(): void {

        const autocomplete: Autocomplete = GooglePlacePredictionService.setAutocomplete(this.googleInput);

        google.maps.event.addListener(autocomplete, 'place_changed', () => {

            this.place = autocomplete.getPlace();

            // We need to check if place is PlaceResult or stub Place Object
            // https://developers.google.com/maps/documentation/javascript/reference/places-widget#Autocomplete.getPlace
            if (this.place.place_id) {
                // this.placeform.controls[this.fControlName].setErrors({'noPlaceSelected': false});
                // this.checkPlace();

                if (this.placeform.controls[this.fControlName].value !== '') { // if value is not empty
                    this.placeform.controls[this.fControlName].setValue(this.place.formatted_address);
                }

                this.fillForm(this.place);

                this.placeform.controls[this.fControlName].markAsTouched({onlySelf: true});
                this.controls.emit(this.placeform);
                this.emitPlace(this.place);

            } else {
                const selected_place: Observable<PlaceResult> = this.placePredictionService.getFirsPlacePrediction(this.place.name);

                selected_place.pipe(
                    map(result => {
                        if (result) {
                            this.place = result;
                            this.fillForm(this.place);
                            this.emitPlace(result);
                        } else {
                            this.placeform.reset(); // .controls[this.fControlName].reset();
                            this.place = null;
                        }
                        this.controls.emit(this.placeform);
                        this.emitPlace(this.place);
                    })
                ).subscribe(() => this.placeform.controls[this.fControlName].markAsTouched());
            }

        });
    }

    fillForm(place: PlaceResult): void {
        if (place) {
            this.placeform.reset({
                    [this.fControlName]: place.formatted_address,
                    latitude: place.geometry.location.lat(),
                    longitude: place.geometry.location.lng(),
                    place_id: place.place_id,
                    street_number: 0
                }
            );

            const google_geoposition_mapping = {
                administrative_area_level_2: ['province', 'short_name'],
                route: ['street', 'long_name'],
                country: ['country', 'long_name'],
                locality: ['locality', 'long_name'],
            };

            place.address_components.forEach(item => {
                const key = item['types'][0];
                if (key in google_geoposition_mapping) {
                    const value = google_geoposition_mapping[key][0];
                    const format = google_geoposition_mapping[key][1];
                    this.placeform.patchValue({[value]: item[format]});
                }
            });

            if (!this.placeform.get('locality').value) {
                // Locality: Si no tiene, o province o formatted_address
                if (!this.placeform.get('province').value || this.placeform.get('province').value.length <= 2) {
                    this.placeform.patchValue(
                        {locality: this.placeform.get('formatted_address').value}
                    );
                } else {
                    this.placeform.patchValue(
                        {locality: this.placeform.get('province').value}
                    );
                }
            }

            // TODO: habilitar null en el campo street del modelo geoposition y comprobar que no haya problemas
            if (!this.placeform.get('street').value) {
                this.placeform.patchValue(
                    {street: ''}
                );
            }

            if (!this.placeform.get('province').value) {
                this.placeform.patchValue(
                    {province: ''}
                );
            }
        }

    }

    /***
     *  Used by focusout event and google autocomplete listener
     *  We will mark input as invalid if there is no place previously selected.
     *  Otherwise, we will put again the stored formatted_address
     */
    checkPlace(): void {
        setTimeout(() => {
            if (this.place === null && this.placeform.controls[this.fControlName].value !== '') {
                this.placeform.controls[this.fControlName].setErrors({'noPlaceSelected': true});
            } else if (this.placeform.controls[this.fControlName].value !== '') { // if value is not empty
                this.fillForm(this.place);
            } else {
                this.emitPlace(null);
            }
            this.placeform.controls[this.fControlName].markAsTouched({onlySelf: true});
        }, 500);
    }

    /**
     * Used to read the Place selected
     */
    emitPlace(place: PlaceResult): void {
        this.valueChange.emit(place);
    }

}
