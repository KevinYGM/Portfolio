import './ContactComponent.css';
import { FaCaretDown } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { useState } from 'react';

import axios from 'axios';



export const ContactComponent = () => {

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://127.0.0.1:3001/submit-form', data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };


  return (
    <div className='contacts'>
      <div className="tab"><FaCaretDown /> Contacts</div>

      <form onSubmit={handleSubmit} className="form-contact">
        <div className="title-form">
          <h1>Say hello!</h1>
          <div className="decoration"></div>
        </div>

       <label className='first-name'>
          <input name='firstName' placeholder='First Name' type="text" onChange={handleInputChange} />
          <p>First Name</p>
        </label>

        <label className='Last-name'>
          <input name='lastName' placeholder='Last Name' type="text" onChange={handleInputChange} />
          <p>Last Name</p>
        </label>

        <label className='email'>
          <input name='email' placeholder='Your Email' type="text" onChange={handleInputChange} />
          <p>Your Email</p>
        </label>

        <label className='Message'>
          <textarea name='message' placeholder='Message' onChange={handleInputChange} />
          <p>Message</p>
        </label>
        
        <button type="submit"><FaTelegramPlane /> Send Message</button>

      </form>
    </div>
    )
  }
