//Hooks
import React, { useState } from 'react';

//Components
import { PortFolioComponent } from './components/PortfolioComponent/PortFolioComponent';
import { HomeComponent } from './components/HomeComponent/HomeComponent';
import { AboutComponent } from './components/AboutComponent/AboutComponent';
import { FooterComponent } from './components/FooterComponent/FooterComponent';
import { ContactComponent } from './components/ContactComponent/ContactComponent';
import { NavComponent } from './components/NavComponent/NavComponent';
import { TrainingComponent } from './components/TrainingComponent/TrainingComponent';



function App() {

//States 
  const [openModalIndex, setOpenModalIndex] = useState(false);
  const [languageEnglish, setLanguageEnglish] = useState(true);


//Function to manage links to sections of the page, also controls the height of the scroll.
const scrollToSection = (idSection, offsetVmin = 0) => {
      const element = document.getElementById(idSection);
      
      if (element) {
        const windowHeight = window.innerHeight;
        const offsetPixels = (offsetVmin * Math.min(window.innerWidth, windowHeight)) / 100;
        const offsetTop = element.offsetTop - offsetPixels;
    
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
        });
      }
    };
 


/*---------------------------------COMPONENT JSX----------------------------------------*/ 
  return (
    <>
      <NavComponent
            openModalIndex = { openModalIndex }
            setOpenModalIndex = { setOpenModalIndex }
            languageEnglish = { languageEnglish }
            setLanguageEnglish = { setLanguageEnglish }
            scrollToSection = { scrollToSection } />
      <HomeComponent
            openModalIndex = { openModalIndex }
            setOpenModalIndex = { setOpenModalIndex }
            languageEnglish = { languageEnglish }
            scrollToSection = { scrollToSection } />
      <AboutComponent 
            languageEnglish = { languageEnglish }
            scrollToSection = { scrollToSection } />
      <PortFolioComponent
            languageEnglish = { languageEnglish }
            scrollToSection = { scrollToSection } />
      <TrainingComponent 
            languageEnglish = { languageEnglish }
            scrollToSection = { scrollToSection } />
      <ContactComponent
             languageEnglish = { languageEnglish } 
             scrollToSection = { scrollToSection } />
      <FooterComponent
             languageEnglish = { languageEnglish }/>
    </>
  )
}

export default App
