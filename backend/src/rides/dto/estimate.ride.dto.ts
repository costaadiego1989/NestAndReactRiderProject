import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class EstimateRideDto {
  @IsNotEmpty({ message: 'Customer ID cannot be blank' })
  @IsString({ message: 'Customer ID must be a string' })
  @MinLength(1, { message: 'Customer ID cannot be empty' })
  customer_id: string;

  @IsNotEmpty({ message: 'Origin address cannot be blank' })
  @IsString({ message: 'Origin address must be a string' })
  @MinLength(1, { message: 'Origin address cannot be empty' })
  origin: string;

  @IsNotEmpty({ message: 'Destination address cannot be blank' })
  @IsString({ message: 'Destination address must be a string' })
  @MinLength(1, { message: 'Destination address cannot be empty' })
  destination: string;
}