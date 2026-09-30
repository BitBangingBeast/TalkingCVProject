export default function HeroSection({ onStartTour }) {
  return (
    <section id="heroSection" className="hero--section">
      <div className="hero--section--content--box">
        <div className="hero--section--content">
          <p className="section--title">Hey, I'm Abdenour</p>
          <h1 className="hero--section--title">
            <span className="hero--section-title--color">Software</span>{" "}
            <br />
            Engineer
          </h1>
          <p className="hero--section-description">
          Dynamic and motivated second-year Software Engineering student with a strong emphasis on embedded systems development. Possessing a keen interest in utilizing cutting-edge technologies to solve complex problems and drive innovation.
            <br />  Welcome to my CV. Would you like to take an automated tour?
          </p>
        </div>
        <button className="btn btn-primary" onClick={onStartTour}>Start the Tour
</button>
      </div>
      <div className="hero--section--img">
        <img src="./img/hero_img.PNG" alt="Hero Section" />
      </div>
    </section>
  );
}
