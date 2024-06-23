import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';

const TransactionsPieChart = ({ month }) => {
  const [pieData, setPieData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: []
      }
    ]
  });

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const [currentMonthName, setCurrentMonthName] = useState('');

  useEffect(() => {
    const fetchPieData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/pie-chart-data`, { params: { month } });
        const data = response.data;
        setPieData({
          labels: data.map(item => item.category),
          datasets: [
            {
              data: data.map(item => item.count),
              backgroundColor: data.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`)
            }
          ]
        });

        setCurrentMonthName(monthNames[Number(month.split('-')[1]) - 1]); // Extract month index from the month string
      } catch (error) {
        console.error('Error fetching pie chart data:', error);
      }
    };

    fetchPieData();
  }, [month]);

  return (
    <div className="chart-container">
      <h2>Pie Chart - {currentMonthName}</h2>
      <div className="chart-wrapper">
        <Pie data={pieData} />
      </div>
    </div>
  );
};

export default TransactionsPieChart;
