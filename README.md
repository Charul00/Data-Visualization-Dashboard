# Transactions Dashboard

This is a React-based Transactions Dashboard that displays transaction statistics, bar charts, and pie charts for different months. The data is fetched from a backend API.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Endpoints](#API Collection)


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
![Screenshot (28)](https://github.com/Charul00/coding-challenge-Intern/assets/170423008/71b37cec-2e72-489b-9112-1068e3add6dc)
![Screenshot (29)](https://github.com/Charul00/coding-challenge-Intern/assets/170423008/95c94342-6ca6-4583-815e-d4dd5244d34e)
![Screenshot (30)](https://github.com/Charul00/coding-challenge-Intern/assets/170423008/20ace2c2-3c8c-4811-bb77-882b79d2f6a8)
![Screenshot (31)](https://github.com/Charul00/coding-challenge-Intern/assets/170423008/e69cc5ba-8dd9-4ef0-8602-3f304974c006)






### Additional Notes
1. Run initialize with Seed data API only one time.
