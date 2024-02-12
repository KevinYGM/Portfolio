import './PortFolioComponent.css';
import { useEffect, useState } from 'react';
import { otherProjectsDate, projectsHightlights } from '../../data/projects';

import { FaCaretDown } from "react-icons/fa";
import { PiArrowFatLinesUpBold } from "react-icons/pi";
import { AiOutlineClose } from "react-icons/ai";
import { BsCaretLeftSquareFill } from "react-icons/bs";
import { BsCaretRightSquareFill } from "react-icons/bs";

import { FiGithub } from "react-icons/fi";
import { SiCreatereactapp } from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io";
import { FaReact } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { FaGitAlt } from "react-icons/fa";
import { TiHtml5 } from "react-icons/ti";
import { SiCanva } from "react-icons/si";


export const PortFolioComponent = ({ languageEnglish }) => {
  const [hightlights, setHighlights] = useState(true);
  const [otherProjects, setOtherProjects] = useState(false);
  const [viewHightlights, setViewHightlights] = useState(false);
  const [projectSelected, setProjectSelected] = useState({});
  const [indexPhoto, setIndexPhoto] = useState(0);
  const [isFixed, setIsFixed] = useState(false);

  const changePhotoVisible = (address) => {
    address === "advance" ? setIndexPhoto((prevIndex) => (prevIndex + 1)  % projectSelected.photos.length) : setIndexPhoto((prevIndex) => (prevIndex - 1 + projectSelected.photos.length ) % projectSelected.photos.length);
  }

  const viewProject = (project) => {
    setProjectSelected(project);
    setIndexPhoto(0);
    setViewHightlights(true);
  }

  const iconSkill = (skill) => {
    switch (skill) {
      case "react":
        return <FaReact />
        break;

      case "create-react-app":
        return <SiCreatereactapp />
        break;

      case "javascript":
        return <IoLogoJavascript />
        break;

      case "css":
        return <FaCss3Alt />
        break;

      case "html":
        return <TiHtml5 />
        break;

      case "git":
        return <FaGitAlt />
        break;

      case "canva":
        return <SiCanva />
        break;
    
      default:
        break;
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const categoriesNormal = document.querySelector('.portfolio');
      const scrollPosition = window.scrollY;
      const sectionHeight = categoriesNormal.offsetHeight;
  
      // Ajustar este valor para cambiar cuándo se activa la posición fija
      const offset = 200;
  
      // Calcular la posición final de la sección con un pequeño offset
      const sectionBottom = categoriesNormal.offsetTop + sectionHeight - offset;
  
      // Verificar si la posición de desplazamiento está dentro de la sección
      const isScrolledIntoSection = scrollPosition >= categoriesNormal.offsetTop && scrollPosition <= sectionBottom;
  
      setIsFixed(isScrolledIntoSection);
    }
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  
  }, [])



  return (
    <div className="portfolio">
      <div className="tab"><FaCaretDown />{languageEnglish ? "Projects" : "Proyectos"}</div>
      <div className="categories-projects">
        <button   style={{background: hightlights ? 'red' : 'yellow', color: hightlights ? 'white' : 'black'}}
                  onClick={()=>{setHighlights(true), setOtherProjects(false)}}
                  >{languageEnglish ? "More Highlights" : "Más Destacados"}</button>

        <button   style={{background: otherProjects ? 'red' : 'yellow', color: otherProjects ? 'white' : 'black' }}
                  onClick={()=>{setOtherProjects(true), setHighlights(false)}}
                  >{languageEnglish ? "Other Projects" : "Otros Proyectos"}</button>
      </div>

      {isFixed && (
         <div className={`categories-projects ${isFixed ? 'fixed' : ''}`}>
         <button   style={{background: hightlights ? 'red' : 'yellow', color: hightlights ? 'white' : 'black'}}
                   onClick={()=>{setHighlights(true), setOtherProjects(false)}}
                   >{languageEnglish ? "More Highlights" : "Más Destacados"}</button>
 
         <button   style={{background: otherProjects ? 'red' : 'yellow', color: otherProjects ? 'white' : 'black' }}
                   onClick={()=>{setOtherProjects(true), setHighlights(false)}}
                   >{languageEnglish ? "Other Projects" : "Otros Proyectos"}</button>
       </div>
      )}
     


      <div className={`container-hightlights ${!hightlights ? 'hide' : ''}`}>

        {projectsHightlights.map((project, index) => (
          <div key={index} className="project-hightlight">
            <div className="title-project">
              <strong>{languageEnglish ? project.name : project.nameSpanish}</strong>
              <strong>{project.year}</strong>
            </div>
            <div className="photo-project">
              <img src={project.photos[0]} alt="Main photo of project" />
            </div>
            <strong>{languageEnglish ? "Skills" : "Habilidades"}</strong>
            <div className="container-skills">
              {project.skills.map((skill, index) => (
                <div key={index} className="skill">{iconSkill(skill)}</div>
              ))}
            </div>
            <button className="project-visualization"
                    onClick={() => viewProject(project)}>
              {languageEnglish ? "Watch More" : "Ver Más"}
            </button>
         </div>
        ))}
      </div>
      

      
      <div className={`container-other-projects ${!otherProjects ? 'hide' : ''}`}>
        {otherProjectsDate.map((project, index) => (
          <div key={index} className="other-projects">
            <div className="title-project">
              <strong>{languageEnglish ? project.name : project.nameSpanish}</strong>
              <strong>{project.year}</strong>
            </div>
            <div className="photo-project">
              <img src={project.photos} alt="Main photo of this project" />
            </div>
            
            <div className="container-skills">
              <strong>{languageEnglish ? "Skills" : "Habilidades"}</strong>
              {project.skills.map((skill, index) => (
                <div key={index} className="skill">{iconSkill(skill)}</div>
              ))}
            </div>
            <div className="description">{languageEnglish ? project.descriptionEnglish : project.descriptionSpanish}</div>
            <div className="project-visualization">
              <button>
                <a href={project.linkGithub} target="_blank" rel="noreferrer">GitHub <FiGithub /></a>
              </button>
              <button>
                <a href={project.linkWebsite} target="_blank" rel="noreferrer">{languageEnglish ? "Website" : "Sitio Web"} <PiArrowFatLinesUpBold /></a>
              </button>
            </div>
          </div>
        ))}
        </div>




        {viewHightlights && (
          <div className="modal-hightlights">
          <div className="modal">
            <div className="exit" 
                  onClick={() => setViewHightlights(false)}><AiOutlineClose /></div>
            <div className="title-project"><strong>{languageEnglish ? projectSelected.name: projectSelected.nameSpanish}</strong><strong>{projectSelected.year}</strong></div>
            <div className="photo-project">
              <button onClick={() => changePhotoVisible("advance")}><BsCaretRightSquareFill /></button>
              <img src={projectSelected.photos[indexPhoto]} alt="Photo Visible of the Project" />
              <button onClick={() => changePhotoVisible("back")}><BsCaretLeftSquareFill /></button>
            </div>

            <div className="container-skills">
              <strong>{languageEnglish ? "Skills" : "Habilidades"}</strong>
              {projectSelected.skills.map((skill, index)=> (
                 <div key={index} className="skill">{iconSkill(skill)}</div>
              ))}
            </div>

            <div className="description">{languageEnglish ? projectSelected.descriptionEnglish : projectSelected.descriptionSpanish}</div>

            <div className="project-visualization">
              <button>
                <a href={projectSelected.linkGithub} target="_blank" rel="noreferrer">GitHub <FiGithub /></a>
              </button>
              <button>
                <a href={projectSelected.linkWebsite} target="_blank" rel="noreferrer">{languageEnglish ? "Website" : "Sitio Web"} <PiArrowFatLinesUpBold /></a>
              </button>
            </div>
          </div>
        </div>
      )}
      </div>)
  }
