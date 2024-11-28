import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, CarIcon } from "lucide-react";
import { shopperApi } from "../../api/api";
import { ConfirmRide, RideEstimate } from "../../interfaces/ride.estimate.interface";

export default function Drivers(data: { estimate: RideEstimate }) {
    const navigate = useNavigate();
    const { estimate } = data;
    const [error, setError] = useState<string>('');

    const handleChooseDriver = async (driverId: number): Promise<void> => {
        try {
            if (!estimate.customer_id) {
                throw new Error('ID do cliente não encontrado');
            }

            const selectedDriver = estimate.options.find(driver => driver.id === driverId);
            
            if (!selectedDriver) {
                throw new Error('Motorista não encontrado');
            }

            const payload: ConfirmRide = {
                customer_id: estimate.customer_id,
                origin: `${estimate.origin.latitude},${estimate.origin.longitude}`,
                destination: `${estimate.destination.latitude},${estimate.destination.longitude}`,
                distance: estimate.distance,
                duration: estimate.duration,
                driver: selectedDriver,
                value: selectedDriver.value
            };

            await shopperApi.confirmRide(payload);
            
            navigate(`/history?customer_id=${estimate.customer_id}&driver_id=${driverId}`);
        } catch (error: any) {
            console.error('Erro detalhado:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                payload: error.config?.data
            });
            setError(error.response?.data?.message || 'Erro ao confirmar a viagem');
        }
    };

    return (<>
        <div className="mt-6 bg-white shadow-xl rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Motoristas disponíveis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {estimate.options.map((driver) => (
                    <div key={driver.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-semibold">{driver.name}</h3>
                            <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                <span>{driver.review.rating}</span>
                            </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{driver.description}</p>
                        <p className="text-gray-700 mb-2 flex items-center"><CarIcon className="h-4 w-4 mr-1" />{driver.vehicle}</p>
                        <div className="flex justify-between items-center mt-4">
                            <span className="text-lg font-bold text-shopper">
                                R$ {driver.value.toFixed(2)}
                            </span>
                            <button
                                onClick={() => handleChooseDriver(driver.id)}
                                className="px-4 py-2 bg-shopper text-white rounded-lg hover:bg-shopper/90"
                            >
                                Escolher
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>);
}