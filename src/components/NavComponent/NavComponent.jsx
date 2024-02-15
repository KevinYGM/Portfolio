//Style File and Hooks
import './NavComponent.css';
import { useEffect, useRef, useState } from 'react';

//Icons
import { TiThMenu } from "react-icons/ti";

//Images
import flagSpain from '../../assets/flag-spain.jpg'
import flagUSA from '../../assets/flag-usa.jpg'



/*------------------------------Main Component---------------------------------------------------------*/
export const NavComponent = 
        ({openModalIndex, setOpenModalIndex, setLanguageEnglish, languageEnglish, scrollToSection}) => {

//Local States and Refs
  const [isOpenModalOptions, setIsOpenModalOptions] = useState(false);
  const timerRef = useRef(null);

// Functions
  const toogleModal = () => {
    setIsOpenModalOptions(!isOpenModalOptions);
  }


  // UseEffects
  useEffect(() => {
    const handleOutsideClick = (event) => {
      const modalOptions = document.getElementById('modal-options');
  
      if (modalOptions && isOpenModalOptions && !modalOptions.contains(event.target)) {
        setIsOpenModalOptions(false);
      }
    };
  
    timerRef.current = setTimeout(() => {
      document.addEventListener('click', handleOutsideClick);
    }, 100);
  
    return () => {
      clearTimeout(timerRef.current);
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpenModalOptions, setIsOpenModalOptions]);


  /*---------------------------------COMPONENT JSX----------------------------------------*/
  return (
    <div className="main-nav">

      <div  className="burguer-menu"
            style={{color: openModalIndex ? 'var(--blue-soft)' : 'rgb(247, 231, 12)' }}
            onClick={() => setOpenModalIndex(true)}><TiThMenu /></div>
      <div className="logo">
        KYGM APP
      </div>



      <ul className="sections-nav">
        <li onClick={() => scrollToSection('home', 7.8)}>{languageEnglish ? 'Home' : 'Presentación'}</li>
        <li onClick={() => scrollToSection('about-me', 13)}>{languageEnglish ? 'About Me' : 'Acerca de Mí'}</li>
        <li onClick={() => scrollToSection('portfolio', 13)}>{languageEnglish ? 'Projects' : 'Proyectos'}</li>
        <li onClick={() => scrollToSection('education', 13)}>{languageEnglish ? 'Education' : 'Formación'}</li>
        <li onClick={() => scrollToSection('contact', 13)}>{languageEnglish ? 'Contact' : 'Contacto'}</li>
      </ul>



      <div className="options" onClick={toogleModal}>
        <span>{languageEnglish ? 'Options' : 'Opciones'}</span>
        <div id="modal-options" className={`modal-options ${isOpenModalOptions ? 'show' : ''}`}>
          <span>{languageEnglish ? 'Dark Mode' : 'Modo Oscuro'}</span>
          <div className="dark-mode">
            <div className="selector"></div>
          </div>
          <span>{languageEnglish ? 'Language' : 'Idioma'}</span>
          <div className="language">
            <button onClick={() => {setLanguageEnglish(false)}}>
              <img src={flagSpain} alt="" />
              <span>{languageEnglish ? 'Spanish' : 'Español'}</span>
            </button>
            <button onClick={() => {setLanguageEnglish(true)}}>
              <img src={flagUSA} alt="" />
              <span>{languageEnglish ? 'English' : 'Inglés'}</span>
            </button>
          </div>
        </div>
      </div>
      
    </div>
  )
}
