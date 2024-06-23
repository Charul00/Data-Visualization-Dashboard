import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionsStatistics = ({ month }) => {
  const [statistics, setStatistics] = useState({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0
  });

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const [currentMonthName, setCurrentMonthName] = useState('');

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/statistics`, {
          params: { month }
        });
        setStatistics(response.data);
        setCurrentMonthName(monthNames[Number(month.split('-')[1]) - 1]); // Extract month index from the month string
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStatistics();
  }, [month]);

  return (
    <div className="statistics-container">
      <h2>Statistics - {currentMonthName}</h2>
      <p>Total Sale Amount: {statistics.totalSaleAmount}</p>
      <p>Total Sold Items: {statistics.totalSoldItems}</p>
      <p>Total Not Sold Items: {statistics.totalNotSoldItems}</p>
    </div>
  );
};

export default TransactionsStatistics;
