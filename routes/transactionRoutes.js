const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Initialize database
 router.get('/initialize', transactionController.initializeDatabase);

// List all transactions with search and pagination
router.get('/transactions', transactionController.getTransactions);

// Statistics API
router.get('/statistics', transactionController.getStatistics); 


// Bar Chart API
router.get('/bar-chart-data', transactionController.getBarChartData);

// Pie Chart API
router.get('/pie-chart-data', transactionController.getPieChartData);

// Example endpoint definition in your Express router
router.get('/transactions/total', transactionController.getTotalTransactions);


// Combined Data API
// router.get('/combined-data', transactionController.getCombinedData);


//retrive all transactions 

// router.get('/all-transactions', transactionController.getAllTransactions);

module.exports = router;
