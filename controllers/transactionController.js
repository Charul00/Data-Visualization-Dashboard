const axios = require('axios');
const Transaction = require('../models/Transaction');

// Function to calculate price range based on price
function getPriceRange(price) {
  if (price >= 0 && price <= 100) return '0 - 100';
  else if (price >= 101 && price <= 200) return '101 - 200';
  else if (price >= 201 && price <= 300) return '201 - 300';
  else if (price >= 301 && price <= 400) return '301 - 400';
  else if (price >= 401 && price <= 500) return '401 - 500';
  else if (price >= 501 && price <= 600) return '501 - 600';
  else if (price >= 601 && price <= 700) return '601 - 700';
  else if (price >= 701 && price <= 800) return '701 - 800';
  else if (price >= 801 && price <= 900) return '801 - 900';
  else return '901 - above';
}

// Initialize the database with seed data
exports.initializeDatabase = async (req, res) => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    await Transaction.insertMany(response.data);
    res.status(200).send('Database initialized with seed data');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getTransactions = async (req, res) => {
  const { month, search, page = 1, perPage = 10 } = req.query;
  let searchQuery = {};

  if (search) {
    searchQuery = {
      $or: [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { price: !isNaN(search) ? Number(search) : undefined }
      ].filter(Boolean) // Remove undefined values
    };
  }

  try {
    // Query transactions for the specified month
    const transactions = await Transaction.find({
      ...searchQuery,
      dateOfSale: {
        $gte: new Date(`${month}-01T00:00:00Z`),
        $lt: new Date(`${month}-31T23:59:59Z`)
      }
    }).skip((page - 1) * perPage).limit(perPage);

    if (transactions.length === 0) {
      res.status(404).json({ message: 'No transactions found for the specified month' });
    } else {
      res.status(200).json(transactions);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};







// Statistics API
exports.getStatistics = async (req, res) => {
  const { month } = req.query;

  try {
    // Parse the month to create date range
    const startOfMonth = new Date(`${month}-01T00:00:00Z`);
    const endOfMonth = new Date(`${month}-31T23:59:59Z`);

    // Calculate total sale amount
    const totalSaleAmountAggregate = await Transaction.aggregate([
      {
        $match: {
          dateOfSale: {
            $gte: startOfMonth,
            $lte: endOfMonth
          },
          sold: true
        }
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$price" }
        }
      }
    ]);

    const totalSaleAmount = totalSaleAmountAggregate.length > 0 ? totalSaleAmountAggregate[0].totalAmount : 0;

    // Count total sold items
    const totalSoldItems = await Transaction.countDocuments({
      dateOfSale: {
        $gte: startOfMonth,
        $lte: endOfMonth
      },
      sold: true
    });

    // Count total not sold items
    const totalNotSoldItems = await Transaction.countDocuments({
      dateOfSale: {
        $gte: startOfMonth,
        $lte: endOfMonth
      },
      sold: false
    });

    // Respond with the calculated statistics
    res.status(200).json({
      month: `Statistics - ${month}`,
      totalSaleAmount,
      totalSoldItems,
      totalNotSoldItems
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Bar Chart API
exports.getBarChartData = async (req, res) => {
  const { month } = req.query;

  try {
    const startOfMonth = new Date(`${month}-01T00:00:00Z`);
    const endOfMonth = new Date(`${month}-31T23:59:59Z`);

    const transactions = await Transaction.find({
      dateOfSale: {
        $gte: startOfMonth,
        $lte: endOfMonth
      }
    });

    // Initialize price range counters
    const priceRanges = {
      '0 - 100': 0,
      '101 - 200': 0,
      '201 - 300': 0,
      '301 - 400': 0,
      '401 - 500': 0,
      '501 - 600': 0,
      '601 - 700': 0,
      '701 - 800': 0,
      '801 - 900': 0,
      '901 - above': 0
    };

    // Calculate number of items in each price range
    transactions.forEach(transaction => {
      const price = parseFloat(transaction.price);
      const range = getPriceRange(price);
      priceRanges[range]++;
    });

    res.status(200).json(priceRanges);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//pie chart api 
exports.getPieChartData = async (req, res) => {
    const { month } = req.query;

    try {
        const startOfMonth = new Date(`${month}-01T00:00:00Z`);
        const endOfMonth = new Date(`${month}-31T23:59:59Z`);

        const categories = await Transaction.aggregate([
            {
                $match: {
                    dateOfSale: {
                        $gte: startOfMonth,
                        $lte: endOfMonth
                    }
                }
            },
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            }
        ]);

        const formattedCategories = categories.map(category => ({
            category: category._id,
            count: category.count
        }));

        res.status(200).json(formattedCategories);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

//combined data


// exports.getCombinedData = async (req, res) => {
//   try {
//       const { month } = req.query;

//       // Check if month is provided in the query
//       if (!month) {
//           return res.status(400).json({ message: 'Month parameter is required' });
//       }

//       // Fetch statistics data only
//       const statistics = await exports.getStatistics(req, res);
//       const Barchart = await exports.getBarChartData(req, res); // Corrected: Removed req and res
//       const Pie_chart = await exports.getPieChartData(req, res); // Corrected: Removed req and res

//       // Construct the response
//       const combinedData = {
//           statistics,
//           Barchart,
//           Pie_chart
//       };

//       res.status(200).json(combinedData);
//   } catch (error) {
//       console.error('Error in getCombinedData:', error);
//       res.status(500).send(error.message);
//   }
// };

// Example controller method
exports.getTotalTransactions = async (req, res) => {
  const { month, search } = req.query;
  let query = {};

  try {
      // Construct the query based on month and search criteria
      if (month) {
          const startOfMonth = new Date(`${month}-01T00:00:00Z`);
          const endOfMonth = new Date(`${month}-31T23:59:59Z`);
          query.dateOfSale = {
              $gte: startOfMonth,
              $lte: endOfMonth
          };
      }

      if (search) {
          query.$or = [
              { title: new RegExp(search, 'i') },
              { description: new RegExp(search, 'i') },
              { price: !isNaN(search) ? Number(search) : undefined }
          ].filter(Boolean); // Remove undefined values
      }

      const totalTransactions = await Transaction.countDocuments(query);
      res.status(200).json({ totalTransactions });
  } catch (error) {
      res.status(500).send(error.message);
  }
};