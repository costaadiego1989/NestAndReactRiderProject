import { Controller, Post, Body, BadRequestException, Get, Query, Param } from '@nestjs/common';
import { EstimateRideDto } from '../dto/estimate.ride.dto';
import { RideService } from '../services/ride.service';
import { ConfirmRideDto } from '../dto/confirm.ride.dto';
import { GetRidesResponse } from '../interfaces/get.rider.reponse.interface';
import { EstimateRideResponseDto } from '../dto/estimate.ride.response.dto';

@Controller('ride')
export class RideController {
  constructor(private readonly rideService: RideService) { }

  @Post('estimate')
  async estimateRide(@Body() estimateRideDto: EstimateRideDto): Promise<EstimateRideResponseDto> {
    try {
      return await this.rideService.estimateRide(estimateRideDto);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
    }
  }

  @Post('confirm')
  async confirmRide(@Body() confirmRideDto: ConfirmRideDto): Promise<{ success: boolean }> {
    try {
      return await this.rideService.confirmRide(confirmRideDto);
      
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
    }
  }

  @Get(':customerId')
  async getRidesByCustomer(
    @Param('customerId') customerId: string,
    @Query('driver_id') driverId?: string
  ): Promise<GetRidesResponse> {
    try {
      const response = await this.rideService.getRides(customerId, driverId);
      return response;
    } catch (error) {
      throw error;
    }
  }
}