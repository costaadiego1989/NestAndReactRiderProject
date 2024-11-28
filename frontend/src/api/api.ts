import { api } from './index';
import { ConfirmRide, EstimateRide, RideEstimate, RideResponse } from '../interfaces/ride.estimate.interface';

export const shopperApi = {
    requestEstimateRide: async (data: EstimateRide): Promise<RideEstimate> => {
        try {
            const response = await api.post('/ride/estimate', data);
            console.log('response', response);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    confirmRide: async (data: ConfirmRide): Promise<boolean> => {
        try {
            const response = await api.post('/ride/confirm', data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getRideHistory: async ({ customer_id, driver_id }: { customer_id?: string; driver_id?: string }): Promise<RideResponse> => {
        try {
            const response = await api.get(`/ride/${customer_id}?driver_id=${driver_id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}