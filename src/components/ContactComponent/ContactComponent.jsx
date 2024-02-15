//Style File and Hooks
import './ContactComponent.css';
import { useEffect, useState } from 'react';

//Icons
import { FaCaretDown } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";

//Library
import axios from 'axios';



/*------------------------------Main Component---------------------------------------------------------*/
export const ContactComponent = ({ languageEnglish, scrollToSection }) => {
  
  //Local States and Refs
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

  
  //Functions
  const handleInputChange = (e) => {
    //It Process the changes in the input value.
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = (e) => {
    //This processes the information in the form on the frontend side.
    e.preventDefault();


    axios.post('http://127.0.0.1:3001/submit-form', formValidate)
    //Server positive response process
      .then((response) => {
        console.log(response.data);
        setDataForm({
          firstName: '',
          lastName: '',
          email: '',
          message: ''
        })
        setMessageVisible(true);
        setExplanation(languageEnglish ? "Saved Succesful" : "Guardado Exitosamente");
        setTimeout(() => {
          setMessageVisible(false);
          setDataForm({
            firstName: '',
            lastName: '',
            email: '',
            message: ''
          })
        }, 2500)
        setIsMessageSuccessful(true);
      })

      //Server negative response process
      .catch ((error) =>  {
        console.error(error);
        setIsMessageSuccessful(false);
        setMessageVisible(true);

        if (error.response && error.response.status === 409) {
          setExplanation(languageEnglish ? "Conflict: Duplicate entry" : "Conflicto data duplicada en la BDD");
        } else if (error.response && error.response.status === 400) {
          setExplanation(languageEnglish ? "Bad Request: All fields must be provided" : "Debes llenar todos los campos");
        } else if (error.response && error.response.status === 500) {
          setExplanation(languageEnglish ? "Internal Server" : "Error interno del servidor");
        } else if (error.request) {
          setExplanation(languageEnglish ? "Network Error" : "Error de Red");
        }else{
          setExplanation(languageEnglish ? "Unknown Error" : "Error Desconocido");
        }

        setTimeout(() => {
          setMessageVisible(false);
        }, 2500)
      });
    }



    const handleFocus = () => {
      setIsFocused(true);
    };
  
    const handleBlur = () => {
      setIsFocused(false);
    };
  
    const isValidEmail = () => {
      return /^.{1,}@.{1,}$/.test(dataForm.email);
    };



  //UseEffects
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

  },[dataForm])



/*---------------------------------COMPONENT JSX----------------------------------------*/ 
  return (
    <div id='contact' className='contacts'>
      {/* Tab Category */}
      <div onClick={() => scrollToSection('contact', 13)} className="tab"><FaCaretDown />{languageEnglish ? "Contact" : "Contacto"}</div>


      {/* User Message Form*/}
      <form onSubmit={handleSubmit} className="form-contact">
        <div className="title-form">
          <h1>{languageEnglish ? "Say hello!" : "¡Dí Hola!"}</h1>
          <div className="decoration"></div>
        </div>

        {/* Field FirstName*/}
       <label className='first-name'>
          <input  name='firstName' 
                  placeholder={languageEnglish ? "First Name *" : "Nombre *"} 
                  type="text" 
                  value={dataForm.firstName}
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={{
                    backgroundColor: isFocused
                    ? (dataForm.firstName.length > 2 ? 'rgba(0, 255, 55, 0.300)' : 'rgba(255, 0, 0, 0.300)') 
                    : 'transparent'}}/>
          <p>{languageEnglish ? "First Name *" : "Nombre *"}</p>
        </label>


        {/* Field LastName*/}
        <label className='Last-name'>
          <input  name='lastName' 
                  placeholder={languageEnglish ? "Last Name *" : "Apellido *"} 
                  type="text"
                  value={dataForm.lastName} 
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={{
                    backgroundColor: isFocused
                    ? (dataForm.lastName.length > 2 ? 'rgba(0, 255, 55, 0.300)' : 'rgba(255, 0, 0, 0.300)') 
                    : 'transparent'}} />
          <p>{languageEnglish ? "Last Name *" : "Apellido *"}</p>
        </label>


        {/* Field Email*/}
        <label className='email'>
          <input  name='email' 
                  placeholder={languageEnglish ? "Your Email *" : "Tu Email *"} 
                  type="email" 
                  value={dataForm.email}
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={{
                    backgroundColor: isFocused 
                    ? (dataForm.email.length > 8 &&  isValidEmail() ? 'rgba(0, 255, 55, 0.300)' : 'rgba(255, 0, 0, 0.300)') 
                    : 'transparent'}} />
          <p>{languageEnglish ? "Your Email *" : "Tu Email *"} </p>
        </label>


        {/* Field Message*/}
        <label className='Message'>
          <textarea name='message' 
                    placeholder={languageEnglish ? "Message *" : "Mensaje *"} 
                    value={dataForm.message}
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={{
                      backgroundColor: isFocused 
                      ? (dataForm.message.length > 5 ? 'rgba(0, 255, 55, 0.300)' : 'rgba(255, 0, 0, 0.300)') 
                      : 'transparent'}} />
          <p>{languageEnglish ? "Message *" : "Mensaje *"}</p>
        </label>
        
        {/* Button Submit*/}
        <button type="submit">
          <FaTelegramPlane />{languageEnglish ? "Send Message" : "Enviar Mensaje"}
        </button>

        {/* Pop-up window */}
        {messageVisible && (
        <div className="modal-info">
          <div  className="frame"
              style={{background: isMessageSuccessful ? 'rgba(0, 128, 0, 0.651)' : 'rgba(214, 63, 63, 0.651)',
                      border: isMessageSuccessful ? '0.2vmax solid rgb(0, 255, 42)' : '0.2vmax solid red'}}>
            <h1>
              {languageEnglish 
                ? (isMessageSuccessful ? '📤 Message Sent!!' : '❌ Unsent Message')
                : (isMessageSuccessful ? '📤 Mensaje Enviado!!' : '❌ Mensaje No Enviado')
              }
            </h1>
            <p>{explanation}</p>
          </div>
        </div>
        )}
      </form>
    </div>
    )
  }
