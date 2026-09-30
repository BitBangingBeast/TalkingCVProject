import data from "../../data/index.json";

export default function WorkExperience() {


  return (
    <section id="WorkExperience" className="work-experience-section">
      <h2 className="skills--section--heading">Work Experience</h2>
      <ul className="experience-list">
        {data?.workExperiences?.map((exp, index) => (
          <li key={index} className="experience-item">
            <h2>{exp.title} at {exp.company}</h2>
            <p className="experience-year">{exp.year}</p>
            <p className="experience-desc">{exp.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
