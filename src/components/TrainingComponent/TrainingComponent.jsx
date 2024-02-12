import './TrainingComponent.css';
import { FaCaretDown } from "react-icons/fa";
import imgIUT from '../../assets/iut.png';
import { certificationsData } from '../../data/certifications';

import { BsCaretLeftSquareFill } from "react-icons/bs";
import { BsCaretRightSquareFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa6";
import { useEffect, useState } from 'react';




export const TrainingComponent = ({ languageEnglish }) => {

  const [viewCertifications, setViewCertifications] = useState(false);
  const [certificationSelected, setCertificatioSelected] = useState({});
  const [indexCertifications, SetIndexCertifications] = useState(0);

  const [searchValue, setSearchValue] = useState("");

  const reversedCertificationsData = [...certificationsData].reverse();

  const selectCertification = (certification) => {
    setCertificatioSelected(certification);
    setViewCertifications(true);
  }

  const getValue = (e) => {
    setSearchValue(e.target.value);
  }
  
  const filterCertifications = (certification, searchValue) => {
    const normalizeString = (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const nameCertification = (certification.name + ' ' + certification.nameSpanish);
    const normalizedName = normalizeString(nameCertification).toLowerCase();
    const normalizedSearchValue = normalizeString(searchValue).toLowerCase();

    return normalizedName.includes(normalizedSearchValue);
};

    const filteredCertifications = reversedCertificationsData.filter(
      (certification) => filterCertifications(certification, searchValue));
    
    const changeCertification = (address) => {
      address === "advance" ? SetIndexCertifications((prevIndex) => (prevIndex + 1)  % filteredCertifications.length) : SetIndexCertifications((prevIndex) => (prevIndex - 1 + filteredCertifications.length ) % filteredCertifications.length);
      
    }

    useEffect(()=>{
      setCertificatioSelected(filteredCertifications[indexCertifications]);
    },[indexCertifications])

 
  return (
    <div className="education">
      <div className="tab"><FaCaretDown />{languageEnglish ? "Education" : "Formación"}</div>
      
      <div className="university-degrees">
        <h1>{languageEnglish ? "University Degrees" : "Títulos Universitarios"}</h1>
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

      
      <div className="certifications">
        <h1>{languageEnglish ? "Certifications" : "Certificaciones"}</h1>

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
        {viewCertifications && (
          <div className="modal-certifications">
            <div className="modal">
              <div className="exit" 
                  onClick={() => setViewCertifications(false)}><AiOutlineClose /></div>
              <div className="title-certification"><strong>{languageEnglish ? certificationSelected.name : certificationSelected.nameSpanish}</strong></div>
              <div className="image-certification">
                <button onClick={() => changeCertification("advance")}><BsCaretRightSquareFill /></button>
                <img src={certificationSelected.imageCertification} alt="Photo of the Certification" />
                <button onClick={() => changeCertification("back")}><BsCaretLeftSquareFill /></button>
              </div>
            </div>
           </div>
          )}
      </div>
    </div>
  )
}
