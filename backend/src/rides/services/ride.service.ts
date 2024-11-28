import { Injectable, BadRequestException, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import {
    EstimateRideResponseDto,
    DriverOptionDto
} from '../dto/estimate.ride.response.dto';
import { EstimateRideDto } from '../dto/estimate.ride.dto';
import { DRIVERS } from '../mocks/drivers.mock';
import { GoogleMapsService } from '../utils/google.maps';
import { ConfirmRideDto } from '../dto/confirm.ride.dto';
import { GetRidesResponse } from '../interfaces/get.rider.reponse.interface';
import { RideConfirmation, RideEstimator, RideRetrieval } from '../interfaces/ride.interface';
import { ConfirmRideEntity } from '../entities/confirm.ride.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RideService implements RideEstimator, RideConfirmation, RideRetrieval {
    constructor(
        private readonly googleMapsService: GoogleMapsService,
        @InjectRepository(ConfirmRideEntity)
        private readonly rideEntity: Repository<ConfirmRideEntity>
    ) {}

    private validateEstimateData(data: EstimateRideDto): void {
        if (!data.customer_id?.trim()) {
            throw new BadRequestException({
                error_code: 'INVALID_DATA',
                error_description: 'Customer ID cannot be blank'
            });
        }

        if (!data.origin?.trim()) {
            throw new BadRequestException({
                error_code: 'INVALID_DATA',
                error_description: 'Origin address cannot be blank'
            });
        }

        if (!data.destination?.trim()) {
            throw new BadRequestException({
                error_code: 'INVALID_DATA',
                error_description: 'Destination address cannot be blank'
            });
        }

        if (data.origin.trim() === data.destination.trim()) {
            throw new BadRequestException({
                error_code: 'INVALID_DATA',
                error_description: 'Origin and destination addresses cannot be the same'
            });
        }
    }

    private calculateDriverOptions(distance: number): DriverOptionDto[] {
        return DRIVERS.map(driver => ({
            id: driver.id,
            name: driver.name,
            description: driver.description,
            vehicle: driver.vehicle,
            review: driver.review,
            value: Number((driver.pricePerKm * distance).toFixed(2))
        }));
    }

    async estimateRide(data: EstimateRideDto): Promise<EstimateRideResponseDto> {
        try {
            this.validateEstimateData(data);

            const {
                leg,
                distance,
                duration,
                response
            } = await this.googleMapsService.googleMapsSearch(data);

            return {
                origin: {
                    latitude: leg.start_location.lat,
                    longitude: leg.start_location.lng
                },
                destination: {
                    latitude: leg.end_location.lat,
                    longitude: leg.end_location.lng
                },
                distance,
                duration,
                options: this.calculateDriverOptions(distance),
                routeResponse: response
            };

        } catch (error) {
            console.error('Error details:', {
                message: error.message,
                googleStatus: error.response?.data?.status,
                errorMessage: error.response?.data?.error_message
            });

            if (error instanceof BadRequestException) {
                throw error;
            }

            throw new BadRequestException({
                error_code: 'ROUTE_ERROR',
                error_description: 'Could not calculate route. Please verify the addresses and try again.'
            });
        }
    }

    async saveRide(rideData: ConfirmRideDto): Promise<void> {
        try {            
            const ride = await this.rideEntity.create({
                customerId: rideData.customer_id,
                origin: rideData.origin,
                destination: rideData.destination,
                distance: rideData.distance,
                duration: rideData.duration,
                value: rideData.value,
                driver: rideData.driver,
                createdAt: new Date()
            });

            await this.rideEntity.save(ride);
        } catch (error) {
            console.error('Erro ao salvar corrida:', {
                message: error.message,
                stack: error.stack,
                data: rideData
            });
            throw error;
        }
    }

    async confirmRide(data: ConfirmRideDto): Promise<{ success: boolean }> {
        try {            
            this.validateEstimateData(data);

            const driver = DRIVERS.find(d => d.id === data.driver.id);

            if (!driver) {
                throw new BadRequestException({
                    error_code: 'DRIVER_NOT_FOUND',
                    error_description: 'Driver not found'
                });
            }

            if (data.distance < driver.minDistance) {
                throw new HttpException({
                    error_code: 'INVALID_DISTANCE',
                    error_description: `Driver requires minimum distance of ${driver.minDistance}km`
                }, HttpStatus.NOT_ACCEPTABLE);
            }

            const expectedValue = Number((driver.pricePerKm * data.distance).toFixed(2));

            if (data.value !== expectedValue) {
                throw new BadRequestException({
                    error_code: 'INVALID_VALUE',
                    error_description: `Expected value (${expectedValue}). provided value (${data.value})`
                });
            }

            await this.saveRide(data);

            return { success: true };
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }

            throw new BadRequestException({
                error_code: 'CONFIRMATION_ERROR',
                error_description: 'Error confirming ride. Please try again.'
            });
        }
    }

    async getRides(customerId: string, driverId?: string): Promise<GetRidesResponse> {
        try {
            if (!customerId?.trim()) {
                throw new BadRequestException({
                    error_code: 'INVALID_DATA',
                    error_description: 'Customer ID cannot be blank'
                });
            }
    
            if (driverId) {
                const driverExists = DRIVERS.some(d => d.id === parseInt(driverId));
                if (!driverExists) {
                    throw new BadRequestException({
                        error_code: 'INVALID_DRIVER',
                        error_description: 'Driver not found'
                    });
                }
            }
    
            const queryBuilder = this.rideEntity.createQueryBuilder('ride')
                .select([
                    'ride.id',
                    'ride.customerId',
                    'ride.origin',
                    'ride.destination',
                    'ride.distance',
                    'ride.duration',
                    'ride.value',
                    'ride.createdAt',
                    'driver.id',
                    'driver.name'
                ])
                .leftJoin('ride.driver', 'driver')
                .where('ride.customerId = :customerId', { customerId })
                .orderBy('ride.createdAt', 'DESC');
    
            if (driverId) {
                queryBuilder.andWhere('driver.id = :driverId', { driverId: parseInt(driverId) });
            }
    
            const rides = await queryBuilder.getRawMany();
    
            if (!rides.length) {
                throw new NotFoundException({
                    error_code: 'NO_RIDES_FOUND',
                    error_description: 'No rides found for this customer'
                });
            }
    
            return {
                customer_id: customerId,
                rides: rides.map(ride => ({
                    id: ride.ride_id,
                    date: new Date(ride.ride_createdAt),
                    origin: ride.ride_origin,
                    destination: ride.ride_destination,
                    distance: Number(ride.ride_distance),
                    duration: Number(ride.ride_duration),
                    driver: {
                        id: ride.driver_id,
                        name: ride.driver_name
                    },
                    value: Number(ride.ride_value)
                }))
            };
        } catch (error) {
            console.error('Error to fetch rides:', {
                message: error.message,
                stack: error.stack,
                customerId,
                driverId
            });
            throw error;
        }
    }

}