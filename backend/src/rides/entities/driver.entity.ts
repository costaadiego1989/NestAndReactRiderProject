import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('drivers')
export class DriverEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('text')
    description: string;

    @Column()
    vehicle: string;

    @Column('json')
    review: {
        rating: number;
        comment: string;
    };

    @Column('decimal', { precision: 10, scale: 2 })
    pricePerKm: number;

    @Column('decimal', { precision: 10, scale: 2 })
    minDistance: number;
} 