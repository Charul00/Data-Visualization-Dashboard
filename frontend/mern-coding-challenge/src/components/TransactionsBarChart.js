import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const TransactionsBarChart = ({ month }) => {
  const [barData, setBarData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Number of Items',
        data: [],
        backgroundColor: 'rgba(75,192,192,0.4)'
      }
    ]
  });

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const [currentMonthName, setCurrentMonthName] = useState('');

  useEffect(() => {
    const fetchBarData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/bar-chart-data`, { params: { month } });
        const data = response.data;
        setBarData({
          labels: Object.keys(data),
          datasets: [
            {
              label: 'Number of Items',
              data: Object.values(data),
              backgroundColor: 'rgba(75,192,192,0.4)'
            }
          ]
        });

        setCurrentMonthName(monthNames[Number(month.split('-')[1]) - 1]); // Extract month index from the month string
      } catch (error) {
        console.error('Error fetching bar chart data:', error);
      }
    };

    fetchBarData();
  }, [month]);

  return (
    <div className="chart-container">
      <h2>Bar Chart - {currentMonthName}</h2>
      <div className="chart-wrapper">
        <div className="chart" style={{ height: '500px', width: '800px' }}>
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
};

export default TransactionsBarChart;
