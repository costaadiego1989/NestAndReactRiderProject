import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { RideController } from '../controllers/ride.controller';
import { RideService } from '../services/ride.service';
import { GoogleMapsService } from '../utils/google.maps';
import { ConfirmRideEntity } from '../entities/confirm.ride.entity';
import { DriverEntity } from '../entities/driver.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConfirmRideEntity, DriverEntity]),
    HttpModule
  ],
  controllers: [RideController],
  providers: [RideService, GoogleMapsService]
})
export class RideModule {}