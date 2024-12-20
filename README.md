Ride Sharing Application: A Chalenge for Shopper

Project Overview

This is a full-stack ride-sharing application developed as part of a technical challenge for Shopper.com.br. The application allows users to estimate and book private rides with various drivers, each with unique characteristics and pricing.

Key Features

- **Ride Estimation**: Calculate ride costs based on route and selected driver
- **Driver Selection**: Choose from multiple drivers with different vehicle types and ratings
- **Ride Booking**: Confirm and save ride details
- **Ride History**: View past rides with filtering options

Technologies Used

Backend
- NestJS
- TypeScript
- Node.js
- Google Maps API
- Docker

Frontend
- React
- Vite
- TypeScript
- Google Maps static API

Prerequisites

- Node.js (v20+)
- Docker
- Docker Compose
- Google Maps API Key

Local Setup

### 1. Clone the Repository
```
git clone https://github.com/costaadiego1989/NestAndReactRiderProject
```

### 2. Environment Configuration
Create a `.env` file in the root directory with:
```
GOOGLE_API_KEY=your_google_maps_api_key
```

### 3. Docker Deployment
```bash
docker-compose up
```

The application will be available at:
- Backend: `http://localhost:8080`
- Frontend: `http://localhost:80`

API Endpoints

### 1. Estimate Ride
`POST /ride/estimate`
- Estimate ride cost and available drivers

### 2. Confirm Ride
`PATCH /ride/confirm`
- Confirm and save ride details

### 3. Ride History
`GET /ride/{customer_id}`
- Retrieve ride history with optional driver filtering

Frontend Screens

1. **Ride Request**
   - Enter customer ID, origin, and destination
   - Estimate ride options

2. **Ride Options**
   - Display route on static map
   - List available drivers
   - Select and confirm ride

3. **Ride History**
   - Filter rides by customer and driver
   - View detailed ride information

## Contact

Diego Costa de Oliveira - costaadiego1989@gmail.com
(21) 99300 - 1883
#   N e s t A n d R e a c t R i d e r P r o j e c t 
 
 #   N e s t A n d R e a c t R i d e r P r o j e c t 
 
 
