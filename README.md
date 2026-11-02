# Uni Ride – Campus Ride-Sharing Application

Uni Ride is a full-stack campus ride-sharing application that allows students to offer rides, find available rides, book seats, and manage their bookings within a university community. It provides a simple platform for students to coordinate campus transportation.

## Features

### User Management

- Register and log in to an account.
- Log out and change account password.
- Access protected features after authentication.
- View user profiles and ride-provider information.

### Ride Management

- Browse available rides.
- Post new ride offers with pickup location, destination, departure time, available seats, vehicle type, and contact information.
- View detailed information about individual rides.
- Search and filter rides using URL query parameters.

### Booking Management

- Request and book seats on available rides.
- View personal ride bookings.
- Manage ride-related information and seat availability.

## Tech Stack

**Frontend**

- React.js
- Redux Toolkit
- React Router
- JavaScript
- CSS

**Backend**

- Node.js
- Express.js
- REST APIs

**Database**

- MongoDB

## Application Structure

The project is divided into two main parts:

- `campus-ride-sharing-frontend/` – React frontend, including pages, components, routing, and Redux state management.
- `campus-ride-sharing-backend/` – Express backend, including API routes, controllers, models, and database configuration.

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB database

### 1. Clone the repository

```bash
git clone https://github.com/amna-1111/campus-ride-sharing
cd uni-ride
```

### 2. Set up the backend

```bash
cd campus-ride-sharing-backend
npm install
```

Configure the required environment variables for the MongoDB connection and authentication.

Start the backend using the development command defined in the server's `package.json`.

### 3. Set up the frontend

Open another terminal:

```bash
cd campus-ride-sharing-frontend
npm install
```

Start the React application using:

```bash
npm run dev
```

The application should now be accessible through the local development URL provided by Vite.

## State Management

Redux Toolkit is used to manage application-wide state. The application uses separate state slices for user-related information and ride-related data, including authentication, ride listings, and bookings.

## Learning Outcomes

- Building a React application with multiple routes and reusable components.
- Managing shared application state using Redux Toolkit.
- Developing RESTful APIs using Node.js and Express.js.
- Designing MongoDB schemas and managing data using Mongoose.
- Implementing authentication and protected routes.
- Connecting a React frontend to a backend application.
- Implementing search and filtering through URL query parameters.
