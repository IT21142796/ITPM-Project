import React, { Component } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './pharmacy.css';

class Pharmacy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      medicine: '',
      amount: '',
      hospital: '',
      pharmacyData: [],
      isUpdate: false,
      updateId: null,
    };
  }

   componentDidMount() {
    this.fetchPharmacyData();
  }

  fetchPharmacyData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/pharmacy/getPharmacy');
      const pharmacyData = response.data;
      this.setState({ pharmacyData });
    } catch (error) {
      console.error('Error fetching pharmacy data:', error);
    }
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { medicine, amount, hospital , isUpdate, updateId} = this.state;

    const formData = {
      medicine,
      amount,
      hospital,
    };

    try {
      if (isUpdate) {
        await axios.put(
          `http://localhost:8080/pharmacy/updatePharmacy/${updateId}`,
          formData
        );
        console.log('Form updated:', formData);

        this.setState({
          medicine: '',
          amount: '',
          hospital: '',
          isUpdate: false,
          updateId: null,
         
        });

        toast.success('Data updated successfully.', {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        await axios.post('http://localhost:8080/pharmacy/addPharmacy', formData);
        console.log('Form submitted:', formData);

        this.setState({
          medicine: '',
          amount: '',
          hospital: '',
        });

        toast.success('Data sent to the database.', {
          position: toast.POSITION.TOP_CENTER,
        });
      }

      this.fetchPharmacyData();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error submitting form.', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  handleUpdate = (id) => {
    const pharmacy = this.state.pharmacyData.find((data) => data._id === id);

    this.setState({
      medicine: pharmacy.medicine,
      amount: pharmacy.amount,
      hospital: pharmacy.hospital,
      isUpdate: true,
      updateId: id,
    });
  };

  handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/pharmacy/deletePharmacy/${id}`);
      console.log('Data deleted:', id);

      toast.success('Data deleted successfully.', {
        position: toast.POSITION.TOP_CENTER,
      });

      this.fetchPharmacyData();
    } catch (error) {
      console.error('Error deleting data:', error);
      toast.error('Error deleting data.', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  render() {
    const { medicine, amount, hospital, pharmacyData, isUpdate } = this.state;
    const buttonText = isUpdate ? 'Update Now' : 'Make a Request';

    return (
      <div className="container">
        <div className="form-container">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="medicine">Medicine name:</label>
              <input
                type="text"
                id="medicine"
                name="medicine"
                value={medicine}
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
                <th>Medicine name</th>
                <th>Amount</th>
                <th>Hospital</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pharmacyData.map((data) => (
                <tr key={data._id}>
                  <td>{data.medicine}</td>
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
 
export default  Pharmacy;