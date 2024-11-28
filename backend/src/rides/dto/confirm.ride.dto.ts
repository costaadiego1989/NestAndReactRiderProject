import { IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { DriverDto } from './driver.dto';

export class ConfirmRideDto {
    @IsString()
    @IsNotEmpty({ message: 'Customer ID is required' })
    customer_id: string;

    @IsString()
    @IsNotEmpty({ message: 'Origin address is required' })
    origin: string;

    @IsString()
    @IsNotEmpty({ message: 'Destination address is required' })
    destination: string;

    @IsNumber()
    @IsNotEmpty({ message: 'Distance is required' })
    distance: number;

    @IsString()
    @IsNotEmpty({ message: 'Duration is required' })
    duration: string;

    @ValidateNested()
    @Type(() => DriverDto)
    @IsNotEmpty({ message: 'Driver is required' })
    driver: DriverDto;

    @IsNumber()
    @IsNotEmpty({ message: 'Value is required' })
    value: number;
}