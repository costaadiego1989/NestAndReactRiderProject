import { BadRequestException, Injectable } from "@nestjs/common";
import { EstimateRideDto } from "../dto/estimate.ride.dto";
import { GoogleMapsParamsDto } from "../interfaces/google.maps.interface";
import { Client, Language, TravelMode } from "@googlemaps/google-maps-services-js";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class GoogleMapsService {
    private mapsClient: Client;

    constructor(
        private readonly configService: ConfigService
    ) {
        this.mapsClient = new Client({});
    }

    async googleMapsSearch(data: EstimateRideDto): Promise<{
        leg: any,
        distance: number,
        duration: string,
        response: GoogleMapsParamsDto
    }> {
        const googleApiKey = this.configService.get<string>('GOOGLE_API_KEY');

        if (!googleApiKey) {
            throw new BadRequestException({
                error_code: 'CONFIG_ERROR',
                error_description: 'Google Maps API key not configured'
            });
        }

        const response = await this.mapsClient.directions({
            params: {
                origin: data.origin,
                destination: data.destination,
                mode: TravelMode.driving,
                language: Language.pt_BR,
                region: 'br',
                key: googleApiKey
            }
        });

        if (response.data.status !== 'OK') {
            throw new BadRequestException({
                error_code: 'API_ERROR',
                error_description: 'Google Maps API wrong settings. Status: ' + response.data.status
            });
        }

        if (!response.data?.routes?.[0]) {
            throw new BadRequestException({
                error_code: 'ROUTE_NOT_FOUND',
                error_description: 'Route not found.'
            });
        }

        const leg = response.data.routes[0].legs[0];
        const distance = Number((leg.distance.value / 1000).toFixed(2));
        const duration = leg.duration.text;

        return {
            leg,
            distance,
            duration,
            response: {
                origin: data.origin,
                destination: data.destination,
                mode: TravelMode.driving,
                language: Language.pt_BR,
                region: 'br',
                key: googleApiKey
            }
        }
    }

}
