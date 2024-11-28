import { TravelMode, Language } from '@googlemaps/google-maps-services-js';

export class GoogleMapsParamsDto {
    origin: string;
    destination: string;
    mode: TravelMode;
    language: Language;
    region: string;
    key: string;
}