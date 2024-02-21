//Style File and Hooks
import './TrainingComponent.css';
import { useEffect, useState } from 'react';

//Icons
import { RiArrowLeftDoubleLine } from "react-icons/ri";
import { RiArrowRightDoubleLine } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa6";

//Images
import imgIUT from '../../assets/iut.png';

//Data
import { certificationsData } from '../../data/certifications';



/*------------------------------Main Component---------------------------------------------------------*/

export const TrainingComponent = ({ languageEnglish }) => {

   //Local States and Refs
  const [viewCertifications, setViewCertifications] = useState(false);
  const [certificationSelected, setCertificatioSelected] = useState({});
  const [indexCertifications, SetIndexCertifications] = useState(0);
  const [searchValue, setSearchValue] = useState("");


  //Functions
  const reversedCertificationsData = [...certificationsData].reverse();

  const selectCertification = (certification) => {
    //Function to Process Certification selected
    setCertificatioSelected(certification);
    setViewCertifications(true);
  }

  
  const getValue = (e) => {
    //Function to Process search value
    setSearchValue(e.target.value);
  }
  

  const filterCertifications = (certification, searchValue) => {
    //function to be able to perform searches without importing capital letters and accents.
    const normalizeString = (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const nameCertification = (certification.name + ' ' + certification.nameSpanish);
    const normalizedName = normalizeString(nameCertification).toLowerCase();
    const normalizedSearchValue = normalizeString(searchValue).toLowerCase();

    return normalizedName.includes(normalizedSearchValue);
  };


  //function to show the certifications filtered
  const filteredCertifications = reversedCertificationsData.filter(
    (certification) => filterCertifications(certification, searchValue));
  

  const changeCertification = (address) => {
    //function to show the certification next
    address === "advance" 
    ? SetIndexCertifications((prevIndex) => (prevIndex + 1)  % filteredCertifications.length) 
    : SetIndexCertifications((prevIndex) => (prevIndex - 1 + filteredCertifications.length ) % filteredCertifications.length);
  }


    //UseEffects
    useEffect(()=>{
      setCertificatioSelected(filteredCertifications[indexCertifications]);
    },[indexCertifications])




 /*---------------------------------COMPONENT JSX----------------------------------------*/ 
  return (
    <div id='education' className="education">

      <h2 className="title">{languageEnglish ? 'Education.' : 'Formación.'}</h2>

      <div className="container">
        
        {/* Section University */}
        <div className="university-degrees">
          <h2 className="subtitle">{languageEnglish ? "University Degrees" : "Títulos Universitarios"}</h2>
          
          <div className="degree">
            <aside className="photo">
              <img src={imgIUT} alt="" />
            </aside>
            <article className="info">
              <h2>{languageEnglish ? "Informatic Engineering" : "Ingeniería en Informática"}</h2>
              <h4>I.U.T. de los Llanos - Venezuela</h4>
              <p>{languageEnglish ? "April 2014" : "Abril 2014"}</p>
            </article>
          </div>

          <div className="degree">
            <aside className="photo">
              <img src={imgIUT} alt="" />
            </aside>
            <article className="info">
              <h2>{languageEnglish ? "Informatic Superior Technical" : "Técnico Superior en Informática"}</h2>
              <h4>I.U.T. de los Llanos - Venezuela</h4>
              <p>{languageEnglish ? "July 2012" : "Julio 2012"}</p>
            </article>
          </div>

          <div className="icon-decoration">
            <span><FaGraduationCap /></span>
          </div>
        </div>

        

        {/* Section Certifications */}
        <div className="certifications">
          <h2 className="subtitle">{languageEnglish ? "Certifications" : "Certificaciones"}</h2>

          <div className="container-all-certifications">
            <div className="search">
                <span><FaSearch /></span>
                <input onChange={(e) => getValue(e)} placeholder={languageEnglish ? "Search Certifications" : "Buscar Certificaciones" } type="text" />
              </div>

            <div className="all-certifications">
              {filteredCertifications.length === 0 ? (
                <p>{languageEnglish ? "No results found..." : "No se han encontrado resultados..."}</p>) 
                : 
                (filteredCertifications.map((certification, index) => (
                  <div key={index} className="item">
                    <div className="img">
                      <img src={certification.imageCompany} alt="image Company" />
                    </div>
                    <div className="info">
                      <h2>{languageEnglish ? certification.name : certification.nameSpanish}</h2>
                      <h4>{certification.company}</h4>
                      <p>{languageEnglish ? certification.date : certification.dateSpanish}</p>
                    </div>
                    <div onClick={() => selectCertification(certification)} className="watch-certification">
                      <img src={certification.imageCertification} alt="Certification" />
                      <strong><FaExternalLinkAlt />{languageEnglish ? "Watch" : "Ver"}</strong>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>


          {/* Section Certifications Viewer */}
          {viewCertifications && (
            <div className="modal-certifications">
              <div className="modal">
                <div className="exit" 
                    onClick={() => setViewCertifications(false)}><AiOutlineClose /></div>
                <div className="title-certification"><strong>{languageEnglish ? certificationSelected.name : certificationSelected.nameSpanish}</strong></div>
                <div className="image-certification">
                  <button onClick={() => changeCertification("advance")}><RiArrowRightDoubleLine /></button>
                  <img src={certificationSelected.imageCertification} alt="Photo of the Certification" />
                  <button onClick={() => changeCertification("back")}><RiArrowLeftDoubleLine /></button>
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </div>
  )
}
