import { useState } from "react";
import { shopperApi } from "../api/api";
import { RideResponse } from "../interfaces/ride.estimate.interface";
import { useSearchParams } from "react-router-dom";
import { drivers } from "../mock/drivers";
import { IRideHistory } from "../interfaces/ride.history.interface";

const RideHistory: React.FC<IRideHistory> = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [rideHistory, setRideHistory] = useState<RideResponse | null>(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchRideHistory = async (selectedDriverId?: string) => {
        setIsLoading(true);
        try {
            const response = await shopperApi.getRideHistory({
                customer_id: searchParams.get('customer_id') || '',
                driver_id: selectedDriverId || searchParams.get('driver_id') || 'all'
            });
            setRideHistory(response);
            setError('');
        } catch (error: any) {
            setError('Não foi encontrado resultados para os filtros informados');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDriverChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newDriverId = e.target.value;
        setSearchParams(prev => {
            prev.set('driver_id', newDriverId);
            return prev;
        });
    };

    const handleFilter = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const driverId = searchParams.get('driver_id') || undefined;
        fetchRideHistory(driverId);
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="bg-white shadow-xl rounded-lg p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Histórico de Viagens</h1>

                {error && (
                    <div className="mb-6 p-4 text-red-700 bg-red-100 rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleFilter} className="mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                ID do Cliente
                            </label>
                            <input
                                type="text"
                                value={searchParams.get('customer_id') || ''}
                                onChange={(e) => setSearchParams(prev => {
                                    prev.set('customer_id', e.target.value);
                                    return prev;
                                })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-shopper focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Motorista
                            </label>
                            <select
                                required
                                value={searchParams.get('driver_id') || ''}
                                onChange={handleDriverChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-shopper focus:outline-none"
                            >
                                <option value="" disabled>Selecione um motorista</option>
                                {drivers.map(driver => (
                                    <option key={driver.id} value={driver.id}>
                                        {driver.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-end">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full px-4 py-2 bg-shopper text-white rounded-lg hover:bg-shopper/90 disabled:opacity-50"
                            >
                                {isLoading ? 'Buscando...' : 'Aplicar Filtros'}
                            </button>
                        </div>
                    </div>
                </form>

                {rideHistory && rideHistory.rides && rideHistory.rides.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data/Hora</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Motorista</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Origem</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Destino</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Distância</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tempo</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valor</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {rideHistory.rides.map((ride) => (
                                    <tr key={ride.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {new Date(ride.date).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {ride.driver.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {ride.origin}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {ride.destination}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {Number(ride.distance).toFixed(1)} km
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {ride.duration}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            R$ {Number(ride.value).toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center text-gray-500 py-8">
                        Nenhuma viagem encontrada
                    </div>
                )}
            </div>
        </div>
    );
}

export default RideHistory; 