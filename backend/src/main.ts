import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfirmRideEntity } from './rides/entities/confirm.ride.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost', 'http://localhost:80', 'http://localhost:8080'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    maxAge: 3600,
  });

  // Apenas para desenvolvimento
  TypeOrmModule.forRoot({
    type: 'mariadb',
    host: 'db',
    port: 3306,
    username: 'shopper',
    password: 'shopper123',
    database: 'shopper_ride',
    entities: [ConfirmRideEntity],
    synchronize: true,
  })

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
