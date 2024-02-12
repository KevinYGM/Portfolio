import myPhoto from '../../assets/myMainPhoto.png';
import { useEffect, useRef } from 'react';
import './HomeComponent.css';

import { FaPlay } from "react-icons/fa";
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


export const HomeComponent = ({openModalIndex, setOpenModalIndex}) => {

  const timerRef = useRef(null);

  useEffect(() => {
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

  return (
    <div className="home">


      <div id="modal-mobile" className={`modal-categories ${openModalIndex ? 'show' : ''}`}>
        <div  className="exit"
              onClick={() => setOpenModalIndex(false)}><AiOutlineClose /></div>
        <div className="image-modal">
          <img src={myPhoto} alt="" />
        </div>
        <hr />
        <ul>
          <li><span><TiHome /></span> Home</li>
          <li><span><IoPersonCircleSharp /></span> About Me</li>
          <li><span><FaSuitcase /></span> Projects</li>
          <li><span><FaGraduationCap /></span> Certifications</li>
          <li><span><MdAddCall /></span> Contact</li>
        </ul>
        <hr />
        <div>
          <button><FaBookOpen /> Download CV</button>
          <button><FaPlay /> Watch Video</button>
        </div>
      </div>

      <div className="my-photo-personal">
        <img src={myPhoto} alt="" />
      </div>
      <div className="my-personal-info">
        <div className='text'>
          <h3>Kevin González M.</h3>
          <h1>Frontend Developer</h1>
          <p>"If you think that you can, you are already halfway" -Theodore Roosevelt</p>
        </div>
        
        <div className="container-media">
          <hr />
          <span><FaLinkedinIn /></span>
          <span><FaXTwitter /></span>
          <span><FaGithub /></span>
          <hr />
        </div>
      </div>
      
      <div className='frame-decoration'>
        <div className="container-frame">
          <button className='play-video'><FaPlay /></button>
        </div>
      </div>
    

      <div className="logo-background">
        <span><strong>KYGM APP</strong><strong>KYGM APP</strong><strong>KYGM APP</strong></span>
        <span><strong>KYGM APP</strong><strong>KYGM APP</strong><strong>KYGM APP</strong></span>
        <span><strong>KYGM APP</strong><strong>KYGM APP</strong><strong>KYGM APP</strong></span>
      </div>
    </div>
  )
}
