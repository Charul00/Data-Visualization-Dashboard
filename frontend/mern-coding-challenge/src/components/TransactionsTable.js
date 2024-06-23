import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TransactionsTablee.css'; // Import the CSS file

const TransactionsTable = ({ month, search, page, perPage, setPage }) => {
  const [transactions, setTransactions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const months = [
    { name: 'January', value: '2022-01' },
    { name: 'February', value: '2022-02' },
    { name: 'March', value: '2022-03' },
    { name: 'April', value: '2022-04' },
    { name: 'May', value: '2022-05' },
    { name: 'June', value: '2022-06' },
    { name: 'July', value: '2022-07' },
    { name: 'August', value: '2022-08' },
    { name: 'September', value: '2021-09' },
    { name: 'October', value: '2021-10' },
    { name: 'November', value: '2021-11' },
    { name: 'December', value: '2021-12' },
  ];

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/transactions', {
          params: { month, search, page, perPage }
        });
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [month, search, page, perPage]);

  const handleMonthChange = (selectedMonth) => {
    setMonth(selectedMonth);
    setShowDropdown(false); // Close the dropdown after selecting a month
    setPage(1); // Reset page to 1
  };

  const setMonth = (selectedMonth) => {
    // Logic to set the month
    console.log('Selected month:', selectedMonth);
  };

  return (
    <div className="container">
      <div className="dropdown-container">
     
       
         
       
        {showDropdown && (
          <ul className="dropdown-list">
            {months.map((m) => (
              <li key={m.value} onClick={() => handleMonthChange(m.value)}>
                {m.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="transaction-table">
        {/* Table structure */}
        <table>
          <caption>Transactions Table</caption>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Date of Sale</th>
            </tr>
          </thead>
          <tbody>
            {/* Table rows */}
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td>{transaction._id}</td>
                  <td>{transaction.title}</td>
                  <td>{transaction.description}</td>
                  <td>${transaction.price.toFixed(2)}</td>
                  <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">No transactions found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsTable;
