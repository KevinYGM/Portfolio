import './AboutComponent.css';

import myPhotoAbout from '../../assets/myPhotoAboutMe.png';
import { FaCaretDown } from "react-icons/fa";
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

export const AboutComponent = () => {
  return (
    <div className='about-me'>

      <div className="tab"><FaCaretDown /> About Me</div>
      <div className="frame-texture"></div>

      <div className="photo">
        <img src={myPhotoAbout} alt="Photo in Lima" />
        <button><FaBookOpen /> Download CV</button>
      </div>

      <div className="container-info">
        <div className="info">
          <div className="presentation">
            <button><FaBookOpen /> Download CV</button>
            <h2>Who am I? </h2>
            
          </div>
          <h3>I'm Kevin González</h3>
          <p>Personally, I am very proactive, friendly, very
          organized and responsible. I have a lot of experience in work
          related to soft skills, such as sales, however,
          I am currently deeply interested in entering the
          world of the Technological Industry, for which I have prepared
          as a Frontend Developer, with a variety of courses and projects
          especially with React, knowledge with which I seek to consolidate myself within programming.
          </p>
          <hr />
          <div className="resume">
            <span><BiRename /> Kevin Y. González M.</span>
            <span><FaRegCalendarAlt /> 30 Years, 6 Months, 27 Days </span>
            <span><FaLocationDot /> Lima, Perú</span>
            <span><MdAlternateEmail /> kvngonzalez35@gmail.com</span>
          </div>
          <div className="skill">
            <h2>Professional Skill:</h2>
            <div className="container-skill">
              <div className='react'><strong><FaReact /></strong><span>React JS</span></div>
              <div className='vite'><strong><SiVite /></strong><span>Vite JS</span></div>
              <div className='js'><strong><IoLogoJavascript /></strong><span>JavaScript</span></div>
              <div className='sass'><strong><FaSass /></strong><span>Sass</span></div>
              <div className='css'><strong><FaCss3Alt /></strong><span>CSS</span></div>
              <div className='git'><strong><FaGitAlt /></strong><span>GIT</span></div>
            </div>
         </div>
        </div>
        
        
      </div>
    </div>
  )
}
