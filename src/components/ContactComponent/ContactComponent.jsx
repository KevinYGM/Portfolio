import './ContactComponent.css';
import { FaCaretDown } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { useEffect, useState } from 'react';
import axios from 'axios';



export const ContactComponent = () => {

  const [messageVisible, setMessageVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isMessageSuccessful, setIsMessageSuccessful] = useState(true);
  const [explanation, setExplanation] = useState("");
  const [formValidate, setFormValidate] = useState({
    firstName: null,
    lastName: null,
    email: null,
    message: null
  });

  const [dataForm, setDataForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: ""
  });

  
  const handleInputChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://127.0.0.1:3001/submit-form', formValidate)
      .then((response) => {
        console.log(response.data);
        setDataForm({
          firstName: '',
          lastName: '',
          email: '',
          message: ''
        })
        setMessageVisible(true);
        setExplanation("Guardado Exitosamente");
        setTimeout(() => {
          setMessageVisible(false);
          setDataForm({
            firstName: '',
            lastName: '',
            email: '',
            message: ''
          })
        }, 2500)
        setIsMessageSuccessful(true)
      })
      
      .catch ((error) =>  {
        console.error(error);
        setIsMessageSuccessful(false);
        setMessageVisible(true);

        if (error.response && error.response.status === 409) {
          setExplanation('Conflict: Duplicate entry');
        } else if (error.response && error.response.status === 400) {
          setExplanation('Bad Request: All fields must be provided');
        } else if (error.response && error.response.status === 500) {
          setExplanation('Internal Server');
        } else if (error.request) {
          setExplanation('Network Error');
        }else{
          setExplanation('Unknown Error');
        }

        setTimeout(() => {
          setMessageVisible(false);
        }, 2500)
      });
    }


  useEffect(()=> {
      //Validations
    if( dataForm.firstName.length > 2 && 
        dataForm.lastName.length > 2 && 
        dataForm.email.length > 8 && 
        dataForm.message.length > 5 && 
        isValidEmail()){

      setFormValidate({...dataForm})}
    else{
      setFormValidate({
        firstName: null,
        lastName: null,
        email: null,
        message: null})
      }
    
      console.log(formValidate)

  },[dataForm])


  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const isValidEmail = () => {
    return /^.{1,}@.{1,}$/.test(dataForm.email);
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
          <input  name='firstName' 
                  placeholder='First Name *' 
                  type="text" 
                  value={dataForm.firstName}
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={{
                    backgroundColor: isFocused
                    ? (dataForm.firstName.length > 2 ? 'rgba(0, 255, 55, 0.300)' : 'rgba(255, 0, 0, 0.300)') 
                    : 'transparent'}}/>
          <p>First Name *</p>
        </label>

        <label className='Last-name'>
          <input  name='lastName' 
                  placeholder='Last Name *' 
                  type="text"
                  value={dataForm.lastName} 
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={{
                    backgroundColor: isFocused
                    ? (dataForm.lastName.length > 2 ? 'rgba(0, 255, 55, 0.300)' : 'rgba(255, 0, 0, 0.300)') 
                    : 'transparent'}} />
          <p>Last Name *</p>
        </label>

        <label className='email'>
          <input  name='email' 
                  placeholder='Your Email *' 
                  type="email" 
                  value={dataForm.email}
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={{
                    backgroundColor: isFocused 
                    ? (dataForm.email.length > 8 &&  isValidEmail() ? 'rgba(0, 255, 55, 0.300)' : 'rgba(255, 0, 0, 0.300)') 
                    : 'transparent'}} />
          <p>Your Email *</p>
        </label>

        <label className='Message'>
          <textarea name='message' 
                    placeholder='Message *' 
                    value={dataForm.message}
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={{
                      backgroundColor: isFocused 
                      ? (dataForm.message.length > 5 ? 'rgba(0, 255, 55, 0.300)' : 'rgba(255, 0, 0, 0.300)') 
                      : 'transparent'}} />
          <p>Message *</p>
        </label>
        
        <button type="submit"><FaTelegramPlane /> Send Message</button>

        {messageVisible && (
          <div className="modal-info">
            <div  className="frame"
                  style={{background: isMessageSuccessful ? 'rgba(0, 128, 0, 0.651)' : 'rgba(214, 63, 63, 0.651)',
                          border: isMessageSuccessful ? '0.2vmax solid rgb(0, 255, 42)' : '0.2vmax solid red'}}>
              <h1>{isMessageSuccessful ? '📤 Mensaje Enviado!!' : '❌ Mensaje No Enviado'}</h1>
              <p>{explanation}</p>
            </div>
        </div>
        )}
      </form>
    </div>
    )
  }
