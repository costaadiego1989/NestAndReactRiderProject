import { IsNumber, IsString, IsObject, IsArray, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CoordinatesDto {
  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
}

export class ReviewDto {
  @IsNumber()
  @Min(0)
  rating: number;

  @IsString()
  comment: string;
}

export class DriverOptionDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  vehicle: string;

  @ValidateNested()
  @Type(() => ReviewDto)
  review: ReviewDto;

  @IsNumber()
  @Min(0)
  value: number;
}

export class EstimateRideResponseDto {
  @ValidateNested()
  @Type(() => CoordinatesDto)
  origin: CoordinatesDto;

  @ValidateNested()
  @Type(() => CoordinatesDto)
  destination: CoordinatesDto;

  @IsNumber()
  @Min(0)
  distance: number;

  @IsString()
  duration: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DriverOptionDto)
  options: DriverOptionDto[];

  @IsObject()
  routeResponse: object;
}