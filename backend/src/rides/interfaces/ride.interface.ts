import { ConfirmRideDto } from "../dto/confirm.ride.dto";
import { EstimateRideDto } from "../dto/estimate.ride.dto";
import { EstimateRideResponseDto } from "../dto/estimate.ride.response.dto";
import { Driver } from "./driver.interface";
import { GetRidesResponse } from "./get.rider.reponse.interface";

export interface RideData {
    customer_id: string;
    origin: string;
    destination: string;
    distance: number;
    duration: number;
    driver: Driver; 
    value: number;
    date: Date;
}

export interface RideEstimator {
    estimateRide(data: EstimateRideDto): Promise<EstimateRideResponseDto>;
}

export interface RideConfirmation {
    confirmRide(data: ConfirmRideDto): Promise<{ success: boolean }>;
}

export interface RideRetrieval {
    getRides(customerId: string, driverId?: string): Promise<GetRidesResponse>;
}