
# OC_P13_ArgentBank

## Project Overview

This project is part of my OpenClassrooms training as a front-end developer. The objective is to develop the front-end of Argent Bank, a new bank that needs help setting up its application, focusing on user authentication and profile management. This project is split into two phases:

1. **Phase 1: User Authentication and Profile Management**  
   Users can log in, view their profile, and update their personal information.
   
2. **Phase 2: API Design for Transactions**  
   Propose an API model for managing transactions, based on provided mockups.
(See the swagger.yaml file in the API_model_proposed_for_phase_2 folder)



## Features

- **User Authentication**: Users can log in and log out securely using their credentials.
- **Profile Management**: Logged-in users can view and edit their personal information (name, email).
- **State Management with Redux**: The entire application state is managed using Redux for consistency and scalability.
- **Responsive Design**: The web application is fully responsive.
## Tech Stack


- **React**
- **TypeScript**
- **Redux**
- **HTML/CSS**
- **Node.js and Express** (for backend, available from the original forked repo): The server-side API that interacts with the database.
- **MongoDB**: Database management for user data (through the backend).
## Installation

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (v12 or higher)
- **MongoDB** (Community Server)

### Steps to Install

1. **Clone the repository**:

```bash
git clone https://github.com/flafonso/OC_P13_ArgentBank.git
cd OC_P13_ArgentBank
```

2. **Install dependencies**:
```bash
cd backend
npm install
cd ../frontend
npm install
```

3. **Start local dev server**:

```bash
cd backend
npm run dev:server

# Populate database with two users
npm run populate-db
```
Two users will be created:

- **Tony Stark** (email: `tony@stark.com`, password: `password123`)
- **Steve Rogers** (email: `steve@rogers.com`, password: `password456`)

4. **Run application**:
```bash
cd frontend
npm run dev
```
The application will be available at `http://localhost:5173/`.