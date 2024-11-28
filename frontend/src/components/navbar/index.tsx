import { Car, Clock, MapPin } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0">
                        <NavLink to="/" className="flex items-center">
                            <Car className="h-8 w-8 text-shopper" />
                            <span className="ml-2 text-xl font-bold text-gray-900">Shopper Ride</span>
                        </NavLink>
                    </div>
                    <div className="flex-1 flex justify-center">
                        <div className="hidden sm:flex sm:space-x-8">
                            <NavLink
                                to="/"
                                className={({ isActive }) => `
                                    inline-flex items-center px-1 p-2 text-sm font-medium
                                    ${isActive 
                                        ? 'text-gray-900 border-b-2 border-shopper' 
                                        : 'text-gray-500 hover:text-gray-900'
                                    }
                                `}
                            >
                                <MapPin className="h-4 w-4 mr-1" />
                                Corrida
                            </NavLink>
                            <NavLink
                                to="/history"
                                className={({ isActive }) => `
                                    inline-flex items-center px-1 p-2 text-sm font-medium
                                    ${isActive 
                                        ? 'text-gray-900 border-b-2 border-shopper' 
                                        : 'text-gray-500 hover:text-gray-900'
                                    }
                                `}
                            >
                                <Clock className="h-4 w-4 mr-1" />
                                Histórico
                            </NavLink>
                        </div>
                    </div>
                    <div className="flex-shrink-0 w-[200px]"></div>
                </div>
            </div>
        </nav>
    );
}

