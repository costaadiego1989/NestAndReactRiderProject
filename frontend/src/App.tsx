import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RequestRide from './pages/request.ride';
import RideHistory from './pages/ride.history';
import Navbar from './components/navbar';

function App() {
  return (
      <BrowserRouter>
        <Navbar />
          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<RequestRide />} />
              <Route path="/history" element={<RideHistory />} />
            </Routes>
          </main>
      </BrowserRouter>
  );
}

export default App;