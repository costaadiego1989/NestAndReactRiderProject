export interface Driver {
    id: number;
    name: string;
    description: string;
    vehicle: string;
    review: {
        rating: number;
        comment: string;
    };
    value: number;
    location: {
        latitude: number;
        longitude: number;
    };
}
  
export interface EstimateRide {
  customer_id: string;
  origin: string;
  destination: string;
}

export interface RideEstimate {
    customer_id: string;
    origin: {
      latitude: number;
      longitude: number;
    };
    destination: {
      latitude: number;
      longitude: number;
    };
    distance: number;
    duration: string;
    options: Driver[];
    routeResponse: google.maps.DirectionsResult;
  }

  export interface ConfirmRide {
    customer_id: string;
    origin: string;
    destination: string;
    distance: number;
    duration: string;
    driver: Driver;
    value: number;
}

export interface RideResponse {
  customer_id: string;
  rides: Array<{
      id: string;
      date: Date;
      origin: string;
      destination: string;
      distance: number;
      duration: number;
      driver: {
          id: number;
          name: string;
      };
      value: number;
  }>;
}