import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Pages/Home/Navbar";
import Home from "./Pages/Home/Homescreen";
import TalkingCV from './Pages/TalkingCv component/TalkingCV';
import data from './data/index.json';

function App() {
  const [isTourActive, setIsTourActive] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const startTour = () => {
    setIsTourActive(true);
    setCurrentSectionIndex(0); // Start from the first section
  };

  const handleVideoEnd = () => {
    const nextIndex = currentSectionIndex + 1;
    if (nextIndex < sections.length) {
      setCurrentSectionIndex(nextIndex);
      const nextSectionId = sections[nextIndex].section;
      const nextSectionElement = document.getElementById(nextSectionId);
      if (nextSectionElement) {
        nextSectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      onClose(); // Close the TalkingCV if it's the last section
    }
  };

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home onStartTour={startTour} />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
        {isTourActive && (
          <TalkingCV
            sections={data.talkingCVSections}
            currentSectionIndex={currentSectionIndex}
            onVideoEnd={handleVideoEnd}
            onClose={() => setIsTourActive(false)}
          />
        )}
      </Router>
    </div>
  );
}

export default App;
