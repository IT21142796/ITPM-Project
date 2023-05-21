// CardPage.js

import React, { useState } from 'react';

const CardPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: '',
    image: null
  });

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the form data, such as sending it to an API
    console.log(formData);
  };

  const handleClose = () => {
    // Perform any necessary actions when the Close button is clicked
    console.log('Close button clicked');
  };

  return (
    <div>
      <h1>Card Page</h1>
      <div className="card">
        <img src="card-image.jpg" alt="Card" />
        <div className="card-body">
          <h5 className="card-title">Card Title</h5>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input type="text" className="form-control" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input type="text" className="form-control" id="address" name="address" value={formData.address} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea className="form-control" id="message" name="message" value={formData.message} onChange={handleChange}></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="image">Image</label>
              <input type="file" className="form-control-file" id="image" name="image" onChange={handleChange} />
            </div>
            <div>
              <button type="submit" className="btn btn-primary">Submit</button>
              <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CardPage;
