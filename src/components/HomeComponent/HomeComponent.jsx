//Style File and Hooks
import './HomeComponent.css';
import { useEffect, useRef, useState } from 'react';

//Icons
// import { FaPlay } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import { FaBookOpen } from "react-icons/fa";
import { TiHome } from "react-icons/ti";
import { IoPersonCircleSharp } from "react-icons/io5";
import { FaSuitcase } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa6";
import { MdAddCall } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";

//Images
import myPhoto from '../../assets/myMainPhoto.png';

//PDF'S
import curriculum from '../../assets/curriculum-pdf/CV-FRONTEND-KEVIN-GONZALEZ.pdf';

//Data
import { professions, quotes } from '../../data/home';





/*------------------------------Main Component---------------------------------------------------------*/
export const HomeComponent = ({openModalIndex, setOpenModalIndex, languageEnglish, scrollToSection}) => {

//Local States and Refs
  const [indexProfessions, setIndexProfessions] = useState(0);
  const [indexQuotes, setIndexQuotes] = useState(0);
  const timerRef = useRef(null);


// UseEffects

useEffect(()=>{
  const changeProfessions = setInterval(()=> {
    setIndexProfessions((prevIndex) => (prevIndex + 1) % professions.length);
  }, 30000);

  return () => {
    clearInterval(changeProfessions);
  };
},[indexProfessions]);



useEffect(()=>{
  const changeQuotes = setInterval(()=> {
    setIndexQuotes((prevIndex) => (prevIndex + 1) % quotes.length);
  }, 15000);

  return () => {
    clearInterval(changeQuotes);
  };
},[indexQuotes]);



 useEffect(() => {
  //If you click outside the mobile modal this closes.
    const handleOutsideClick = (event) => {
      const modalMobile = document.getElementById('modal-mobile');
  
      if (modalMobile && openModalIndex && !modalMobile.contains(event.target)) {
        setOpenModalIndex(false);
      }
    };
  
    timerRef.current = setTimeout(() => {
      document.addEventListener('click', handleOutsideClick);
    }, 100);
  
    return () => {
      clearTimeout(timerRef.current);
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [openModalIndex, setOpenModalIndex]);


/*---------------------------------COMPONENT JSX----------------------------------------*/
  return (
    <div id='home' className="home">

      {/* Modal Mobile */}
      <div id="modal-mobile" className={`modal-categories ${openModalIndex ? 'show' : ''}`}>
        <div  className="exit"
              onClick={() => setOpenModalIndex(false)}><AiOutlineClose /></div>
        <div className="image-modal">
          <img src={myPhoto} alt="" />
        </div>
        <h2>Kevin Y. González M.</h2>
        <hr />
        <ul>
          <li onClick={() => scrollToSection('home', 7.8)}><span><TiHome /></span>{languageEnglish ? 'Home' : 'Presentación'}</li>
          <li onClick={() => scrollToSection('about-me', 7.8)}><span><IoPersonCircleSharp /></span>{languageEnglish ? 'About Me' : 'Acerca de Mí'}</li>
          <li onClick={() => scrollToSection('portfolio', 7.8)}><span><FaSuitcase /></span>{languageEnglish ? 'Projects' : 'Proyectos'}</li>
          <li onClick={() => scrollToSection('education', 7.8)}><span><FaGraduationCap /></span>{languageEnglish ? 'Education' : 'Formación'}</li>
          <li onClick={() => scrollToSection('contact', 7.8)}><span><MdAddCall /></span>{languageEnglish ? 'Contact Me' : 'Contáctame'}</li>
        </ul>
        <hr />
        <div>
          <button>
            <a  href={curriculum} 
                target="_blank" 
                rel="noopener noreferrer" 
                download="Curriculum-Kevin-Gonzalez.pdf"
                ><FaBookOpen /> {languageEnglish ? 'Download CV' : 'Descargar CV'}
            </a>
          </button>
          {/* <button><FaPlay /> {languageEnglish ? 'Watch Video' : 'Ver Video'}</button> */}
        </div>
      </div>



      {/* Main Background */}
      <div className="my-photo-personal">
        <img src={myPhoto} alt="" />
      </div>
      <div className="my-personal-info">
        <div className='text'>
          <h3>I'm Kevin González M.</h3>
          <h1>{languageEnglish ? professions[indexProfessions].name : professions[indexProfessions].nameSpanish}</h1>
          <p>{languageEnglish ? quotes[indexQuotes].quote : quotes[indexQuotes].quoteSpanish} - {quotes[indexQuotes].author} </p>
          <div className="container-media">
            <span><a href="https://www.linkedin.com/in/kevinygm" target="_blank" rel="noreferrer"><FaLinkedinIn /></a></span>
            <span><a href="https://github.com/KevinYGM" target="_blank" rel="noreferrer"><FaGithub /></a></span>
            <span><a href="https://twitter.com/Kevin_YGM" target="_blank" rel="noreferrer"><FaXTwitter /></a></span>
          </div>
        </div>

        {/* <div className="watch-video">
          <button className='play-video'><FaPlay /></button>
          <span>{languageEnglish ? 'Watch Video' : 'Ver Video'}</span>
        </div> */}
        
      </div>
    </div>
  )
}
