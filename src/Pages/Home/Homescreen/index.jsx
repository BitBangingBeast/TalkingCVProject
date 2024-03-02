import React from 'react';
import WorkExperience from "../WorkExperience";
import ContactMe from "../ContactMe";
import HeroSection from "../HeroSection";
import MyPortfolio from "../MyPortfolio";
import MySkills from "../MySkills";
import Certifications from "../Certifications";
import Education from "../Education";
import MotivationLetter from '../MotivationLetter';

// Accept onStartTour prop
export default function Home({ onStartTour }) {
  return (
    <>
      <HeroSection onStartTour={onStartTour} />
      <Education />
      <MySkills />
      <MyPortfolio />
      <WorkExperience />
      <Certifications />
      <MotivationLetter/>
      <ContactMe />
    </>
  );
}
