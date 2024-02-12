import './ContactComponent.css';
import { FaCaretDown } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";


export const ContactComponent = () => {

  const handleSubmit = async (event) => {
    event.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada
  
    // Obtener los valores del formulario
    const formData = {
      firstName: event.target.elements.firstName.value,
      lastName: event.target.elements.lastName.value,
      email: event.target.elements.email.value,
      message: event.target.elements.message.value,
    };
  
    // Enviar los datos al servidor Node.js
    try {
      const response = await fetch('http://localhost:5000/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log('Data submitted successfully');
        // Aquí podrías realizar otras acciones después de enviar los datos
      } else {
        console.error('Error submitting data:', response.statusText);
        // Manejar errores, mostrar mensajes al usuario, etc.
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };



  return (
    <div className='contacts'>
      <div className="tab"><FaCaretDown /> Contacts</div>

      {/* <form onSubmit={handleSubmit} className="form-contact"> */}
      <form method='post' onSubmit={handleSubmit} className="form-contact">
        <div className="title-form">
          <h1>Say hello!</h1>
          <div className="decoration"></div>
        </div>

       <label className='first-name'>
          <input name='firstName' placeholder='First Name' type="text" />
          <p>First Name</p>
        </label>

        <label className='Last-name'>
          <input name='lastName' placeholder='Last Name' type="text" />
          <p>Last Name</p>
        </label>

        <label className='email'>
          <input name='email' placeholder='Your Email' type="text" />
          <p>Your Email</p>
        </label>

        <label className='Message'>
          <textarea name='message' placeholder='Message' />
          <p>Message</p>
        </label>




        <button type="submit"><FaTelegramPlane /> Send Message</button>

      </form>
    </div>
    )
  }
