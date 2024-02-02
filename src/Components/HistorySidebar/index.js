import React from 'react';
import './styles.css';

const HistorySidebar = ({ formHistory, expandedResults, handleSidebarClick, isOpen }) => (
  <div className={`sidebar ${isOpen ? 'open' : ''}`}>
    <h2 className='sidebarTitle'>Results History</h2>
    <div className="stack-bar">
      {formHistory.map((item, index) => (
        <div key={index} className="stack-item">
          <div onClick={() => handleSidebarClick(item)}>
            Result {index + 1}
          </div>
          {expandedResults.includes(item) && (
            <div className="result">
              <ul>
                {Object.entries(item).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {value}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default HistorySidebar;
