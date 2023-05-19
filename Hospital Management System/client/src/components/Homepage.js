import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CardPage from './viewpage';
import OtherPage from './myambulance';
import '../Styles/Homepage.module.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">Home</Link>
      <Link to="/other">Other Page</Link>
    </div>
  );
};

const App = () => {
  const cardsData = [
    {
      title: 'Card 1',
      content: 'This is the content of Card 1.',
    },
    {
      title: 'Card 2',
      content: 'This is the content of Card 2.',
    },
    {
      title: 'Card 3',
      content: 'This is the content of Card 3.',
    },
  ];

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCards = cardsData.filter((card) =>
    card.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app">
      <Router>
        <Sidebar />
        <div className="content">
          <h1>Hospital</h1>
          <div className="search">
            <input
              type="text"
              placeholder="Search by card title"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <Routes>
            <Route path="/" element={<CardPage cardsData={filteredCards} />} />
            <Route path="/other" element={<OtherPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
