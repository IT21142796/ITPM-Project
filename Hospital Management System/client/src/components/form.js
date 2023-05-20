import React, { useState } from 'react';
import '../Styles/form.module.css';

const AmbulanceRequestForm = () => {
  const [location, setLocation] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle form submission
    console.log('Location:', location);
    console.log('Contact Number:', contactNumber);

    // Reset form fields
    setLocation('');
    setContactNumber('');
  };

  return (
    <div className="form-container">
      <h2>Request Ambulance</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="location">Request Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactNumber">Request Contact Number:</label>
          <input
            type="text"
            id="contactNumber"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const App = () => {
  return (
    <div className="app">
      <AmbulanceRequestForm />
    </div>
  );
};

export default App;
