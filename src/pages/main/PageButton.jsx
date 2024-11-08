import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PageButton = ({ setCurrentPage }) => {
  // Receive setCurrentPage as a prop
  const [currentPage, setLocalCurrentPage] = useState(1);
  const totalPages = 50;

  const handlePrev = () => {
    setLocalCurrentPage((prev) => Math.max(prev - 1, 1));
    setCurrentPage((prev) => Math.max(prev - 1, 0)); // Adjust to match backend page indexing
  };

  const handleNext = () => {
    setLocalCurrentPage((prev) => Math.min(prev + 1, totalPages - 4));
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 4)); // Adjust to match backend page indexing
  };

  const handlePageClick = (page) => {
    setLocalCurrentPage(page);
    setCurrentPage(page - 1); // Adjust to match backend page indexing
  };

  const customStyle = {
    button: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      border: 'none',
      backgroundColor: '#FFD60A',
      margin: '0 5px',
      fontSize: '18px',
      fontWeight: 'bold',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#614416',
    },
    arrow: {
      backgroundColor: 'transparent',
      boxShadow: 'none',
      fontSize: '24px',
      color: '#614416',
      border: 'none',
    },
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center align-items-center">
        <li className="page-item">
          <button
            className="page-link"
            style={customStyle.arrow}
            onClick={handlePrev}
          >
            &lt;
          </button>
        </li>
        {[0, 1, 2, 3, 4].map((offset) => (
          <li key={offset} className="page-item">
            <button
              className="page-link"
              style={customStyle.button}
              onClick={() => handlePageClick(currentPage + offset)}
            >
              {currentPage + offset}
            </button>
          </li>
        ))}
        <li className="page-item">
          <button
            className="page-link"
            style={customStyle.arrow}
            onClick={handleNext}
          >
            &gt;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default PageButton;
