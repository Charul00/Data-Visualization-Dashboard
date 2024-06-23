# Transactions Dashboard

This is a React-based Transactions Dashboard that displays transaction statistics, bar charts, and pie charts for different months. The data is fetched from a backend API.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)


## Features

- View transaction statistics for selected months.
- Display bar charts and pie charts for transaction data.
- Search transactions.
- Pagination support for transactions list.


## Installation

### Prerequisites

- Node.js (>=12.x)
- npm or yarn
- MongoDB

### Backend Setup

1. Clone the repository:

```sh
git clone https://github.com/your-username/transactions-dashboard.git
cd transactions-dashboard/backend
```
2. Install dependencies:
```
npm install
```

3. Start the backend server:

```
npm start
```
The backend server will start on http://localhost:5000.

Run the following API to populate the database:
``` 
http://localhost:5000/api/initialize
```


### Frontend Setup
1. Navigate to the frontend directory:
```
cd frontend
```

2. Install dependencies:
```
npm install
```

3. Start the frontend development server:

```
npm start
```
The application will start on http://localhost:3000.

Ensure the backend server is also running on http://localhost:5000.


### API Collection
```
https://api.postman.com/collections/35229354-d489b50c-772f-4e46-bd91-c4f88f0a2bf3?access_key=PMAT-01J122S2JPARRCXK458M3QDV51
```

### Screenshots


### Additional Notes
1. Run initialize with Seed data API only one time.