import React, { Component } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './stationary.css';

class Stationary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      amount: '',
      hospital: '',
      stationaryData: [],
      isUpdate: false,
      updateId: null,
    };
  }

  componentDidMount() {
    this.fetchStationaryData();
  }

  fetchStationaryData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/stationary/getStationary');
      const stationaryData = response.data;
      this.setState({ stationaryData });
    } catch (error) {
      console.error('Error fetching stationary data:', error);
    }
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { category, amount, hospital, isUpdate, updateId } = this.state;



//Check if any input field is empty
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
          `http://localhost:8080/stationary/updateStationary/${updateId}`,
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

        toast.success('Data updated successfully.', {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        await axios.post('http://localhost:8080/stationary/addStationary', formData);
        console.log('Form submitted:', formData);

        this.setState({
          category: '',
          amount: '',
          hospital: '',
        });

        toast.success('Data sent to the database.', {
          position: toast.POSITION.TOP_CENTER,
        });
      }

      this.fetchStationaryData();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error submitting form.', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  handleUpdate = (id) => {
    const stationary = this.state.stationaryData.find((data) => data._id === id);

    this.setState({
      category: stationary.category,
      amount: stationary.amount,
      hospital: stationary.hospital,
      isUpdate: true,
      updateId: id,
    });
  };

  handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/stationary/deleteStationary/${id}`);
      console.log('Data deleted:', id);

      toast.success('Data deleted successfully.', {
        position: toast.POSITION.TOP_CENTER,
      });

      this.fetchStationaryData();
    } catch (error) {
      console.error('Error deleting data:', error);
      toast.error('Error deleting data.', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  render() {
    const { category, amount, hospital, stationaryData, isUpdate } = this.state;
    const buttonText = isUpdate ? 'Update Now' : 'Make a Request';

    return (
      <div className="container">
        <div className="form-container">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="category">Item Name</label>
              <input
                type="text"
                id="category"
                name="category"
                value={category}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="amount">Amount:</label>
              <input
                type="text"
                id="amount"
                name="amount"
                value={amount}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="hospital">Hospital:</label>
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
    
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Amount</th>
                <th>Hospital</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {stationaryData.map((data) => (
                <tr key={data._id}>
                  <td>{data.category}</td>
                  <td>{data.amount}</td>
                  <td>{data.hospital}</td>
                  <td>
                    <button
                      className="update-button"
                      onClick={() => this.handleUpdate(data._id)}
                    >
                      Update
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


 
export default  Stationary;


