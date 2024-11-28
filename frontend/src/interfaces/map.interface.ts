import { Driver } from "./ride.estimate.interface";

export interface MapProps {
  origin?: {
    lat: number;
    lng: number;
  };
  destination?: {
    lat: number;
    lng: number;
  };
  drivers?: Driver[];
  directions?: google.maps.DirectionsResult;
}