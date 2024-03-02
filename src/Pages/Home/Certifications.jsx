import React from 'react';
import data from '../../data/index.json';

export default function Certifications() {
  // Handler to open image in a new window
  const openImageInNewWindow = (imageUrl) => {
    window.open(imageUrl, '_blank');
  };

  return (
    <section className="testimonial--section" id="Certifications">
      <div className="portfolio--container-box">
        <div className="portfolio--container">
          <h2 className="skills--section--heading">Certificates & Recommendation Letters</h2>
        </div>
      </div>
      <div className="testimonial--section--container">
        {data?.testimonial?.map((item, index) => (
          <div key={index} className="testimonial--section--card">
            <img
              src={item.imageSrc}
              alt="Certificate"
              className="testimonial--image"
              onClick={() => openImageInNewWindow(item.imageSrc)}
              style={{cursor: 'pointer'}}
            />
            <div className="testimonial--section--card--author--detail">
              <img src={item.src} alt="Author Avatar" className="testimonial--author--avatar" />
              <div>
                <p className="text-md testimonial--author--name">
                  {item.author_name}
                </p>
                <p className="text-md testimonial--author--designation">
                  {item.author_designation}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
