import { IsNotEmpty, IsNumber, IsString, IsObject } from 'class-validator';

export class ReviewDto {
    @IsNumber()
    @IsNotEmpty()
    rating: number;

    @IsString()
    @IsNotEmpty()
    comment: string;
}

export class DriverDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    vehicle: string;

    @IsObject()
    @IsNotEmpty()
    review: ReviewDto;

    @IsNumber()
    @IsNotEmpty()
    pricePerKm: number;

    @IsNumber()
    @IsNotEmpty()
    minDistance: number;
} 