import React from 'react';
import data from '../../data/index.json';

export default function ContactMe() {


const iconMapper = {
  linkedin: '🔗', // Replace with actual icon component or image
  email: '📧',
  phone: '📱',
  address: '🏠'
};


  return (
    <section className="contact-section" id="Contact">
      <h2 className="skills--section--heading">Contact Information</h2>
      <div className="contact-grid">
        {data?.contactInfo?.map((item, index) => (
          <a key={index} href={item.link} className="contact-item" target="_blank" rel="noopener noreferrer">
            <span className="contact-icon">{iconMapper[item.type]}</span>
            <span className="contact-text">{item.text}</span>
          </a>
        ))}
      </div>
    </section>
  );

}
