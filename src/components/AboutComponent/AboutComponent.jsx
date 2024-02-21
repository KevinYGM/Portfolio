//Style File and Hooks
import './AboutComponent.css';
import { useEffect, useState } from 'react';

//Icons
import { BiRename } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { FaBookOpen } from "react-icons/fa";
import { FaSass } from "react-icons/fa";
import { FaGitAlt } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import { SiVite } from "react-icons/si";
import { FaReact } from "react-icons/fa";
import { SiMysql } from "react-icons/si";
import { FaNode } from "react-icons/fa";

//Images
import myPhotoAbout from '../../assets/myPhotoAboutMe.png';

//PDF'S
import curriculum from '../../assets/curriculum-pdf/CV-FRONTEND-KEVIN-GONZALEZ.pdf';

//Data
import { aboutMe } from '../../data/description';





/*------------------------------Main Component---------------------------------------------------------*/
export const AboutComponent = ({ languageEnglish }) => {


//Local States and Refs
  const [isFirstTime, setIsFirstTime] = useState(true);
  
  const [age, setAge] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0
  });


  //Functions

  const calculateAge = (birthdate) => {
    const birthDate = new Date(birthdate);
    const currentDate = new Date();

    const totalMilliseconds = currentDate - birthDate;

    const years = Math.floor(totalMilliseconds / (365.25 * 24 * 60 * 60 * 1000));
    const remainingMilliseconds = totalMilliseconds % (365.25 * 24 * 60 * 60 * 1000);

    const months = Math.floor(remainingMilliseconds / (30.44 * 24 * 60 * 60 * 1000));
    const remainingMonthsMilliseconds = remainingMilliseconds % (30.44 * 24 * 60 * 60 * 1000);

    const days = Math.floor(remainingMonthsMilliseconds / (24 * 60 * 60 * 1000));
    const remainingDaysMilliseconds = remainingMonthsMilliseconds % (24 * 60 * 60 * 1000);

    const hours = Math.floor(remainingDaysMilliseconds / (60 * 60 * 1000));
    const remainingHoursMilliseconds = remainingDaysMilliseconds % (60 * 60 * 1000);

    const minutes = Math.floor(remainingHoursMilliseconds / (60 * 1000));

    setAge({
      years,
      months,
      days,
      hours,
      minutes,
    });
  }

   const formatTimeUnit = (value) => {
    //Function to add a leading zero if necessary
    return value < 10 ? `0${value}` : value;
  };


 //UseEffects 

  useEffect(() => {
    if (isFirstTime){
      calculateAge('1993-06-19T12:30:00')
      setIsFirstTime(false);
    }
      
    const updateAge = setInterval(() => {
      calculateAge('1993-06-19T12:30:00');
    }, 60000)

    return () => {
      clearInterval(updateAge);
    };
    
  }, [age]);



 /*---------------------------------COMPONENT JSX----------------------------------------*/ 
  return (
    <div id='about-me' className='about-me'>

    
      
      {/* Section of Photo (Only Desktops and Laptops) */}
      <div className="photo">
        <img src={myPhotoAbout} alt="Photo in Lima" />
        <button>
          <a  href={curriculum} 
              target="_blank" 
              rel="noopener noreferrer" 
              download="Curriculum-Kevin-Gonzalez.pdf">
                <FaBookOpen /> {languageEnglish ? 'Download CV' : 'Descargar CV'}
          </a>
        </button>
      </div>



      {/* Main Section */}
      <div className="container-info">
        <div className="info">
          <div className="presentation">
            <button>
              <a  href={curriculum} 
                target="_blank" 
                rel="noopener noreferrer" 
                download="Curriculum-Kevin-Gonzalez.pdf">
                  <FaBookOpen /> {languageEnglish ? 'Download CV' : 'Descargar CV'}
               </a>
            </button>
            <h2>{languageEnglish ? 'About Me.' : 'Acerca de Mí.'}</h2>
            
          </div>
          <h2>{languageEnglish ? 'As am I?' : '¿Como Soy Yo?'}</h2>
          <p>{languageEnglish ? aboutMe.description : aboutMe.descriptionSpanish}</p>
          <hr />
          <div className="resume">
            <span><BiRename /> Kevin Y. González M.</span>
            <span className='birth'>
              <FaRegCalendarAlt /> 
              <span>{age.years}{languageEnglish ? ' Years' : ' Años'}</span>
              <span>{age.months}{languageEnglish ? ' Months' : ' Meses'}</span>
              <span>{age.days}{languageEnglish ? ' Days' : ' Días'}</span>
              <div className="hours">
                {formatTimeUnit(age.hours)}:
                {formatTimeUnit(age.minutes)}
              </div>
            </span>
            
            <span><FaLocationDot /> Lima, Perú</span>
            <span><MdAlternateEmail /> kvngonzalez35@gmail.com</span>
          </div>
          <div className="skill">
            <h2>{languageEnglish ? 'Professional Skills' : 'Habilidades Profesionales'}</h2>
            <div className="container-skill">
              <div className='react'><strong><FaReact /></strong><span>React JS</span></div>
              <div className='vite'><strong><SiVite /></strong><span>Vite JS</span></div>
              <div className='js'><strong><IoLogoJavascript /></strong><span>JavaScript</span></div>
              <div className='sass'><strong><FaSass /></strong><span>Sass</span></div>
              <div className='css'><strong><FaCss3Alt /></strong><span>CSS</span></div>
              <div className='git'><strong><FaGitAlt /></strong><span>GIT</span></div>
              <div className='node'><strong><FaNode /></strong><span>Node JS</span></div>
              <div className='mysql'><strong><SiMysql /></strong><span>MySQL</span></div>
            </div>
         </div>
        </div>
      </div>
    </div>
  )
}
