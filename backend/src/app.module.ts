import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RideModule } from './rides/modules/ride.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverEntity } from './rides/entities/driver.entity';
import { ConfirmRideEntity } from './rides/entities/confirm.ride.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'db',
      port: 3306,
      username: 'shopper',
      password: 'shopper123',
      database: 'shopper_ride',
      entities: [__dirname + '/**/*.entity{.ts,.js}', DriverEntity, ConfirmRideEntity],
      synchronize: true,
    }),
    RideModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
