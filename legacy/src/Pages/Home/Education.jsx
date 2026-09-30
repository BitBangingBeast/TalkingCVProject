export default function Education() {
    return (
      <section id="Education" className="hero--section">
        <div className="hero--section--content--box">
          <div className="hero--section--img">
            <img src="./img/uni-logo.PNG" alt="University Logo" />
          </div>
        </div>

        <div className="hero--section--content">
          <h2 className="skills--section--heading ">
            <span className="hero--section-title--color">My Education</span>
          </h2>
          <div className="education--current">
            <h2 className="education--title">Current Degree</h2>
            <p className="education--details">
              B.Sc. in Software Engineering TMK/UAS - Second Year
              <br />
              <span className="education--year">2023 - Present, Expected graduation 2025</span>
              <br />
              <p className="education--details">
                - Current GPA:  4,23
              </p>
            </p>
          </div>
          <div className="education--previous">
            <h2 className="education--title">Previous Studies</h2>
            <ul className="education--list">
              <li className="education--item">
              B.Sc. Industrial Information Technology LAB/UAS - First Year
                <br />
                <span className="education--year">2022</span>
              </li>
              <li className="education--item">
                High School Diploma
                <br />
                <span className="education--year">2018</span>
              </li>
              {/* Add more items as needed */}
            </ul>
          </div>
        </div>
      </section>
    );
  }
