# Transactions Dashboard

This is a React-based Transactions Dashboard that displays transaction statistics, bar charts, and pie charts for different months. The data is fetched from a backend API.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Components](#components)
- [Contributing](#contributing)
- [License](#license)

## Features

- View transaction statistics for selected months.
- Display bar charts and pie charts for transaction data.
- Search transactions.
- Pagination support for transactions list.

## Demo

Insert a link to your live demo here.

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
Install dependencies:
sh
Copy code
npm install
Set up environment variables:
Create a .env file in the backend directory with the following content:

env
Copy code
MONGO_URI=mongodb://localhost:27017/your-database-name
PORT=5000
Initialize the database with seed data:
Note: You should only initialize the database once to avoid duplicating data. This request should only be made one time.

Run the following command to initialize the database:

sh
Copy code
node seed.js
Start the backend server:
sh
Copy code
npm start
The backend server will start on http://localhost:5000.

Frontend Setup
Navigate to the frontend directory:
sh
Copy code
cd ../frontend
Install dependencies:
sh
Copy code
npm install
Usage
Running the development server
Start the frontend development server:
sh
Copy code
npm start
The application will start on http://localhost:3000.

Ensure the backend server is also running on http://localhost:5000.
API Endpoints
GET /api/statistics: Fetch statistics for a specific month.
GET /api/bar-chart-data: Fetch bar chart data for a specific month.
GET /api/pie-chart-data: Fetch pie chart data for a specific month.
GET /api/transactions/total: Fetch total number of transactions for pagination.
Components
App.js
The main component that sets up the dashboard. It handles month selection, search functionality, and pagination.

TransactionsTable.js
Displays the list of transactions for the selected month and search query with pagination.

TransactionsStatistics.js
Fetches and displays statistics (total sale amount, sold items, and not sold items) for the selected month.

TransactionsBarChart.js
Fetches and displays bar chart data for the selected month.

TransactionsPieChart.js
Fetches and displays pie chart data for the selected month.

Pagination.js
Handles pagination logic and renders pagination controls.
