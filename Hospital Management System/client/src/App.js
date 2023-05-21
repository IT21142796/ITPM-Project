import React, { useState } from 'react';
import './App.css';
import MainPage from '../src/component/mainPage';
import Pharmacy from '../src/component/pharmacy/pharmacy.js';
import Blood from '../src/component/blood/blood.js';
import Stationary from '../src/component/stationary/stationary.js';

import pharmacyImage from '../src/images/p.png';
import bloodImage from '../src/images/b.png';
import stationaryImage from '../src/images/s.png';

function App() {
  const [currentPage, setCurrentPage] = useState(null);

  const handleButtonClick = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    if (currentPage === 'pharmacy') {
      return <Pharmacy />;
    } else if (currentPage === 'blood') {
      return <Blood />;
    } else if (currentPage === 'stationary') {
      return <Stationary />;
    } else {
      return (
        <div className="main-page">
          <h1></h1>
          <div className="buttons">
            <button className="p large-button" onClick={() => handleButtonClick('pharmacy')}>
              <img src={pharmacyImage} alt="Pharmacy" />
              Pharmacy
            </button>
            <button className="b large-button" onClick={() => handleButtonClick('blood')}>
              <img src={bloodImage} alt="Blood" />
              Blood
            </button>
            <button className="s large-button" onClick={() => handleButtonClick('stationary')}>
              <img src={stationaryImage} alt="Stationary" />
              Stationary
            </button>
          </div>
          <MainPage />
        </div>
      );
    }
  };

  return <div className="App">{renderPage()}</div>;
}

export default App;
