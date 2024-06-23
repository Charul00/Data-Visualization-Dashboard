import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPageOptions = [10, 20, 30]; // Options for items per page
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]); // Default per page

  useEffect(() => {
    fetchTotalTransactions();
  }, []);

  const fetchTotalTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/transactions/total');
      const { totalTransactions } = response.data;
      setTotalItems(totalTransactions);
      setTotalPages(Math.ceil(totalTransactions / itemsPerPage));
    } catch (error) {
      console.error('Error fetching total transactions:', error);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      fetchDataForPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      fetchDataForPage(currentPage - 1);
    }
  };

  const handlePerPageChange = (event) => {
    const newPerPage = parseInt(event.target.value, 10);
    setItemsPerPage(newPerPage);
    setTotalPages(Math.ceil(totalItems / newPerPage));
    setCurrentPage(1); // Reset to first page when changing items per page
    fetchDataForPage(1); // Fetch data for the first page
  };

  const fetchDataForPage = async (pageNumber) => {
    // Implement fetching data for the selected page based on currentPage and itemsPerPage
    // Example: axios.get('/api/transactions?page=' + pageNumber + '&perPage=' + itemsPerPage)
  };

  return (
    <div className="pagination-container">
      <div className="pagination-controls">
        <span>Page: {currentPage}</span>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
        <span>Per Page:</span>
        <select value={itemsPerPage} onChange={handlePerPageChange}>
          {itemsPerPageOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
      {/* Display your data here */}
    </div>
  );
};

export default Pagination;
