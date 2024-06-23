import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file
import TransactionsTable from './components/TransactionsTable';
import TransactionsStatistics from './components/TransactionsStatistics';
import TransactionsBarChart from './components/TransactionsBarChart';
import TransactionsPieChart from './components/TransactionsPieChart';
import Pagination from './components/Pagination'; // Import the Pagination component

const App = () => {
  const [month, setMonth] = useState('2022-03'); // Default to March
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [showDropdown, setShowDropdown] = useState(false);
  const [totalTransactions, setTotalTransactions] = useState(0); // Total number of transactions

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
    const fetchTotalTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/transactions/total', {
          params: { month, search }
        });
        setTotalTransactions(response.data.total);
      } catch (error) {
        console.error('Error fetching total transactions:', error);
      }
    };

    fetchTotalTransactions();
  }, [month, search]);

  useEffect(() => {
    // Fetch data or handle any other side effects here if needed
  }, [month, search, page, perPage]);

  const handleMonthChange = (selectedMonth) => {
    setMonth(selectedMonth);
    setShowDropdown(false); // Close the dropdown after selecting a month
    setPage(1); // Reset page to 1 when month changes
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const getMonthName = (value) => {
    const monthObj = months.find((m) => m.value === value);
    return monthObj ? monthObj.name : 'Select Month';
  };

  return (
    <div className="App">
      <h1>Transactions Dashboard</h1>

      <div className="filters">
        <div className="search-container">
          <input
            className="search-input"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Transactions"
          />
        </div>
        <div className="dropdown-container">
          <button className="dropdown-header" onClick={toggleDropdown}>
            {getMonthName(month)}
          </button>
          {showDropdown && (
            <ul className="dropdown-content">
              {months.map((m) => (
                <li key={m.value} onClick={() => handleMonthChange(m.value)}>
                  {m.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <TransactionsTable month={month} search={search} page={page} perPage={perPage} setPage={setPage} />
      <Pagination currentPage={page} totalItems={totalTransactions} itemsPerPage={perPage} onPageChange={setPage} />
      <div className="centered-content">
        <TransactionsStatistics month={month} />
        <TransactionsBarChart month={month} />
        <TransactionsPieChart month={month} />
      </div>
    </div>
  );
};

export default App;
