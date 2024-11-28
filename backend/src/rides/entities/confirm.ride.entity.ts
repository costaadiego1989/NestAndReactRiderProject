import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { DriverEntity } from './driver.entity';

@Entity('confirm_ride')
export class ConfirmRideEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    customerId: string;

    @Column()
    origin: string;

    @Column()
    destination: string;

    @Column('decimal', { precision: 10, scale: 2 })
    distance: number;

    @Column()
    duration: string;

    @Column('decimal', { precision: 10, scale: 2 })
    value: number;

    @ManyToOne(() => DriverEntity)
    @JoinColumn({ name: 'driverId' })
    driver: DriverEntity;

    @CreateDateColumn()
    createdAt: Date;

}
