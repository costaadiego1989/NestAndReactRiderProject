import { useState, useEffect, useRef } from "react";
import { MapPin } from "lucide-react";
import { shopperApi } from "../api/api";
import { RideEstimate } from "../interfaces/ride.estimate.interface";
import Map from "../components/map";
import Drivers from "../components/drivers";
import { IRequestRide } from "../interfaces/request.ride.interface";

const RequestRide: React.FC<IRequestRide> = () => {
    const [customerId, setCustomerId] = useState<string>('');
    const [origin, setOrigin] = useState<string>('');
    const [destination, setDestination] = useState<string>('');
    const [estimate, setEstimate] = useState<RideEstimate | null>(null);
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const customerIdRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        customerIdRef.current?.focus();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setEstimate(null);

        try {
            const response = await shopperApi.requestEstimateRide({ 
                customer_id: customerId, 
                origin, 
                destination 
            });

            setEstimate({
                ...response,
                customer_id: customerId
            });
        } catch (error) {
            setError('Ocorreu um erro ao buscar a estimativa da corrida');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>            
            <div className="max-w-6xl mx-auto p-6">
                {estimate && <Drivers estimate={estimate} />}
                <div className="grid pt-6 grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white shadow-xl rounded-lg p-6">
                        <div className="flex items-center justify-center mb-8">
                            <MapPin className="h-12 w-12 text-shopper" />
                            <h1 className="text-2xl font-bold text-gray-900 ml-2">Solicitar uma corrida</h1>
                        </div>

                        {error && (
                            <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-lg">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="customerId" className="block text-sm font-medium text-gray-700">
                                    ID do Cliente
                                </label>
                                <input
                                    ref={customerIdRef}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-shopper focus:outline-none"
                                    type="text"
                                    id="customerId"
                                    required
                                    value={customerId}
                                    onChange={(e) => setCustomerId(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="origin" className="block text-sm font-medium text-gray-700">
                                    Origem
                                </label>
                                <input
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-shopper focus:outline-none"
                                    type="text"
                                    id="origin"
                                    required
                                    value={origin}
                                    onChange={(e) => setOrigin(e.target.value)}
                                    placeholder="Digite o endereço de origem"
                                />
                            </div>

                            <div>
                                <label htmlFor="destination" className="block text-sm font-medium text-gray-700">
                                    Destino
                                </label>
                                <input
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-shopper focus:outline-none"
                                    type="text"
                                    id="destination"
                                    required
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                    placeholder="Digite o endereço de destino"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-shopper hover:bg-shopper/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-shopper disabled:opacity-50"
                            >
                                {isLoading ? 'Calculando...' : 'Estimar valor da viagem'}
                            </button>
                        </form>
                    </div>

                    <div className="bg-white shadow-xl rounded-lg p-6">
                        <Map
                            origin={estimate?.origin ? {
                                lat: estimate.origin.latitude,
                                lng: estimate.origin.longitude
                            } : undefined}
                            destination={estimate?.destination ? {
                                lat: estimate.destination.latitude,
                                lng: estimate.destination.longitude
                            } : undefined}
                            drivers={estimate?.options || []}
                            directions={estimate?.routeResponse}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RequestRide;