import React, { useState, useEffect } from 'react';
import './App.css';
import HistorySidebar from './Components/HistorySidebar/index.js';
import FormContainer from './Components/FormContainer/index.js';
function App() {
  const [formData, setFormData] = useState({
    countries: [],
    states: [],
    districts: [],
    cities: []
  });
  const [formHistory, setFormHistory] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [formResult, setFormResult] = useState(null);
  const [expandedResults, setExpandedResults] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false); 

  useEffect(() => {
    fetchFormData()
      .then(data => {
        setFormData(data);
      })
      .catch(error => console.error('Error fetching form data:', error));
  }, []);

  useEffect(() => {
    let timeoutId;
    if (formResult) {
      timeoutId = setTimeout(() => {
        setFormResult(null);
      }, 30000);
    }
    return () => clearTimeout(timeoutId);
  }, [formResult]);

  const fetchFormData = async () => {
    return {
      countries: ['Country 1', 'Country 2', 'Country 3'],
      states: ['State 1', 'State 2', 'State 3'],
      districts: ['District 1', 'District 2', 'District 3'],
      cities: ['City 1', 'City 2', 'City 3']
    };
  };

  const addToHistory = (result) => {
    setFormHistory(prevHistory => [...prevHistory, result]);
    setFormResult(result);
    setSuccessMessage('Form submitted successfully!');
    setTimeout(() => {
      setSuccessMessage('');
      setFormResult(null);
    }, 30000);
  };

  const handleSidebarClick = (result) => {
    setExpandedResults(prevResults => {
      if (prevResults.includes(result)) {
        return prevResults.filter(item => item !== result);
      } else {
        return [...prevResults, result];
      }
    });
  };

  const handleFieldClick = () => {
    setSuccessMessage('');
    setFormResult(null);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="App">
      <header className='headerTitle'>
        <div className="menu-icon" onClick={toggleSidebar}>
          <div className={`menu-line ${sidebarOpen ? 'open' : ''}`}></div>
          <div className={`menu-line ${sidebarOpen ? 'open' : ''}`}></div>
          <div className={`menu-line ${sidebarOpen ? 'open' : ''}`}></div>
        </div>
        Form Validation Assessment
      </header>
      <HistorySidebar
        formHistory={formHistory}
        expandedResults={expandedResults}
        handleSidebarClick={handleSidebarClick}
        isOpen={sidebarOpen} // Pass the sidebar open state
      />
      <div className={`overlay ${sidebarOpen ? 'active' : ''}`}></div>
        <FormContainer
          formData={formData}
          successMessage={successMessage}
          formResult={formResult}
          handleFieldClick={handleFieldClick}
          addToHistory={addToHistory}
        />
      {formResult && (
        <div className="current-result">
          <h2>Form Output</h2>
          <ul>
            {Object.entries(formResult).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
