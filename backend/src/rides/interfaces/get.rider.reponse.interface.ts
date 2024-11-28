export class GetRidesResponse {
    customer_id: string;
    rides: Array<{
        id: string;
        date: Date;
        origin: string;
        destination: string;
        distance: number;
        duration: number;
        driver: {
            id: number;
            name: string;
        };
        value: number;
    }>;
}