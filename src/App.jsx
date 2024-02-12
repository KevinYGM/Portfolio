import React, { useState } from 'react';
import { PortFolioComponent } from './components/PortfolioComponent/PortFolioComponent';
import { HomeComponent } from './components/HomeComponent/HomeComponent';
import { AboutComponent } from './components/AboutComponent/AboutComponent';
import { FooterComponent } from './components/FooterComponent/FooterComponent';
import { ContactComponent } from './components/ContactComponent/ContactComponent';
import { NavComponent } from './components/NavComponent/NavComponent';
import { TrainingComponent } from './components/TrainingComponent/TrainingComponent';



function App() {

  const [openModalIndex, setOpenModalIndex] = useState(false);
  const [languageEnglish, setLanguageEnglish] = useState(true);
 

  return (
    <>
      <NavComponent
            openModalIndex = { openModalIndex }
            setOpenModalIndex = { setOpenModalIndex }
            setLanguageEnglish = { setLanguageEnglish } />
      <HomeComponent
            openModalIndex = { openModalIndex }
            setOpenModalIndex = { setOpenModalIndex } />
      <AboutComponent />
      <PortFolioComponent
            languageEnglish = { languageEnglish }/>
      <TrainingComponent 
            languageEnglish = { languageEnglish }  />
      <ContactComponent />
      <FooterComponent />
    </>
  )
}

export default App
