import React, { useRef, useEffect, useState } from 'react';
import { scroller } from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './TalkingCV.css';

const TalkingCV = ({ sections, onClose }) => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    // Smoothly scroll to the current section when it changes
    if (sections[currentSectionIndex]) {
      const { section } = sections[currentSectionIndex];
      scroller.scrollTo(section, {
        duration: 1500,
        delay: 100,
        smooth: 'easeInOutQuint',
      });
    }
  }, [currentSectionIndex, sections]);

  useEffect(() => {
    // Transition to the next video section smoothly
    const handleVideoEnd = () => {
      const nextIndex = currentSectionIndex + 1;
      if (nextIndex < sections.length) {
        setCurrentSectionIndex(nextIndex);
      } else {
        onClose(); // Close the TalkingCV if it's the last section
      }
    };

    const videoElement = videoRef.current;
    videoElement.addEventListener('ended', handleVideoEnd);

    return () => {
      videoElement.removeEventListener('ended', handleVideoEnd);
    };
  }, [currentSectionIndex, sections, onClose]);

  const useSmallScreenPosition = window.innerWidth < 1200;
  const currentPosition = useSmallScreenPosition ? 'positionSmall' : 'position';

  // Adjust the video player's position based on the current section's data
  const videoStyle = sections[currentSectionIndex] ? {
    width: '280px',
    maxHeight: '100%',
    position: 'fixed',
    left: `${sections[currentSectionIndex][currentPosition].x}%`,
    top: `${sections[currentSectionIndex][currentPosition].y}%`,
    transform: 'translate(-50%, -50%)',
    transition: 'top 0.5s ease, left 0.5s ease',

  } : {};

  return (
    <div className="video-container" style={videoStyle}>
      {sections.length > 0 && (
        <video
          ref={videoRef}
          src={sections[currentSectionIndex].videoPath}
          controls
          autoPlay
          style={{ maxWidth: '100%', maxHeight: '100%' }}
        />
      )}
      <button className="close-btn" onClick={onClose}>
      <FontAwesomeIcon icon="fa-thin fa-circle-xmark" />
      </button>
    </div>
  );
};

export default TalkingCV;
