import React, { Component } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './blood.css';

import bloodImage from '../../images/blood.png';

class Blood extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      amount: '',
      hospital: '',
      bloodData: [],
      isUpdate: false,
      updateId: null,
      searchQuery: '', // New state for search query
    };
  }

  componentDidMount() {
    this.fetchBloodData();
  }

  fetchBloodData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/blood/getBlood');
      const bloodData = response.data;
      this.setState({ bloodData });
    } catch (error) {
      console.error('Error fetching blood data:', error);
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'amount') {
      if (isNaN(value)) {
        // If the input is not a number, show an error
        toast.error('Please enter a valid number.', {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        // If the input is a number, update the state
        this.setState({ [name]: value });
      }
    } else {
      this.setState({ [name]: value });
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { category, amount, hospital, isUpdate, updateId } = this.state;

    // Check if any input field is empty
    if (!category || !amount || !hospital) {
      toast.error('Please fill in all the fields.', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    const formData = {
      category,
      amount,
      hospital,
    };

    try {
      if (isUpdate) {
        await axios.put(
          `http://localhost:8080/blood/updateBlood/${updateId}`,
          formData
        );
        console.log('Form updated:', formData);

        this.setState({
          category: '',
          amount: '',
          hospital: '',
          isUpdate: false,
          updateId: null,
        });

        toast.success('Update Request Successfully.', {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        await axios.post('http://localhost:8080/blood/addBlood', formData);
        console.log('Form submitted:', formData);

        this.setState({
          category: '',
          amount: '',
          hospital: '',
        });

        toast.success('Request successful.', {
          position: toast.POSITION.TOP_CENTER,
        });
      }

      this.fetchBloodData();
    } catch (error) {
      console.error('Error submitting request:', error);
      toast.error('Error submitting request.', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  handleUpdate = (id) => {
    const blood = this.state.bloodData.find((data) => data._id === id);

    this.setState({
      category: blood.category,
      amount: blood.amount,
      hospital: blood.hospital,
      isUpdate: true,
      updateId: id,
    });
  };

  handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/blood/deleteBlood/${id}`);
      console.log('Request deleted:', id);

      toast.success('Request deleted successfully.', {
        position: toast.POSITION.TOP_CENTER,
        }); this.fetchBloodData();
      } catch (error) {
        console.error('Error deleting data:', error);
        toast.error('Error deleting data.', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      };
      
      handleSearch = (event) => {
      const { value } = event.target;
      this.setState({ searchQuery: value });
      };
      
      render() {
      const { category, amount, hospital, bloodData, isUpdate, searchQuery } =
      this.state;
      const buttonText = isUpdate ? 'Update Now' : 'Make a Request';
      const imageStyle = {
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '20px',
      width: '200px',
      };
      // Filter blood data based on search query
      const filteredData = bloodData.filter((data) =>
      data.hospital.toLowerCase().includes(searchQuery.toLowerCase())
      );return (
        <div>
          <div className="container">
            <div className="form-container">
              <img
                className="bbImage"
                src={bloodImage}
                alt="Blood"
                style={imageStyle}
              />
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="category">Blood Group</label>
                  <select
                    id="category"
                    name="category"
                    value={category}
                    onChange={this.handleChange}
                  >
                    <option value="">-- Select --</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="amount">Capacity:(Liters)</label>
                  <input
                    type="text"
                    id="amount"
                    name="amount"
                    value={amount}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="hospital">Hospital name:</label>
                  <input
                    type="text"
                    id="hospital"
                    name="hospital"
                    value={hospital}
                    onChange={this.handleChange}
                  />
                </div>
                <button type="submit">{buttonText}</button>
              </form>
            </div>
          </div>
      
          <div className="search-container">
            <label htmlFor="search">Search by Hospital:</label>
            <input
              type="text"
              id="search"
              value={searchQuery}
              onChange={this.handleSearch}
              placeholder="Search by Hospital"
            />
          </div>
      
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Blood Category</th>
                  <th>Capacity</th>
                  <th>Hospital</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((data) => (
                  <tr key={data._id}>
                    <td>{data.category}</td>
                    <td>{data.amount}</td>
                    <td>{data.hospital}</td>
                    <td>
                      <button
                        className="update-button"
                        onClick={() => this.handleUpdate(data._id)}
                      >Update
                      </button>
                      <button
                      className="delete-button"
                      onClick={() => this.handleDelete(data._id)}
                      >
                      Delete
                      </button>
                      </td>
                      </tr>
                      ))}
                      </tbody>
                      </table>
                      </div>
                      <ToastContainer />
                      </div>
                      );
                      }
                    }
                      
                      export default Blood;