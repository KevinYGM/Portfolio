import './NavComponent.css';
import { TiThMenu } from "react-icons/ti";
import flagSpain from '../../assets/flag-spain.jpg'
import flagUSA from '../../assets/flag-usa.jpg'
import { useEffect, useRef, useState } from 'react';


export const NavComponent = ({openModalIndex, setOpenModalIndex, setLanguageEnglish}) => {

  const [isOpenModalOptions, setIsOpenModalOptions] = useState(false);

  const toogleModal = () => {
    setIsOpenModalOptions(!isOpenModalOptions);
    console.log(isOpenModalOptions);
  }

  const timerRef = useRef(null);

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


  return (
    <div className="main-nav">
      <div  className="burguer-menu"
            style={{color: openModalIndex ? 'var(--blue-soft)' : 'rgb(247, 231, 12)' }}
            onClick={() => setOpenModalIndex(true)}><TiThMenu /></div>
      <div className="logo">
        KYGM APP
      </div>
      <ul className="sections-nav">
        <li>Home</li>
        <li>About</li>
        <li>Projects</li>
        <li>Education</li>
        <li>Contacts</li>
      </ul>



      <div className="options" onClick={toogleModal}>
        <span>Options</span>
        <div id="modal-options" className={`modal-options ${isOpenModalOptions ? 'show' : ''}`}>
          <span>Dark Mode</span>
          <div className="dark-mode">
            <div className="selector"></div>
          </div>
          <span>Language</span>
          <div className="language">
            <button onClick={() => {setLanguageEnglish(false)}}>
              <img src={flagSpain} alt="" />
              <span>Spanish</span>
            </button>
            <button onClick={() => {setLanguageEnglish(true)}}>
              <img src={flagUSA} alt="" />
              <span>English</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
