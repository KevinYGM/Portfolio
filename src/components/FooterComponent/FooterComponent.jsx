/*Generals Imports*/
import React from 'react'
import './FooterComponent.css';

/*React Icons*/
import { FaLinkedinIn } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";


export const FooterComponent = ({ languageEnglish }) => {
  
   /*---------------- component JSX structure ---------------------- */  
  return (
    <footer className="footer">
      <div id="social-media" className='social-media-container'>
        <div className='social-media'><a href="https://www.linkedin.com/in/kevinygm" target="_blank" rel="noreferrer"><FaLinkedinIn /></a></div>
        <div className='social-media'><a href="https://github.com/KevinYGM" target="_blank" rel="noreferrer"><FaGithub /></a></div>
        <div className='social-media'><a href="https://twitter.com/Kevin_YGM" target="_blank" rel="noreferrer"><FaXTwitter /></a></div>
      </div>

      <span className='rights'>{languageEnglish ? '2024 © All Rights Reserved.' : '2024 © Todos Los Derechos Reservados'} </span>
      
      <span className='logo'>KYGM APP</span>
     </footer>
  )
}
