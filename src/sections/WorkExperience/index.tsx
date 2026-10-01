import { Section, SectionHeading } from '../../components/ui'
import { experiences } from '../../data/experience'

export default function WorkExperience() {
  return (
    <Section id="work-experience">
      <SectionHeading
        title="Work Experience"
        subtitle="Where I have worked and what I have done."
      />
      <ol className="relative border-l border-ink/10">
        {experiences.map((experience) => (
          <li key={experience.id} className="relative mb-8 pl-8 last:mb-0">
            <span className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-gradient-brand" />
            <h3 className="font-display text-lg font-semibold text-ink">
              {experience.role}
            </h3>
            <p className="text-sm text-neon-cyan">{experience.company}</p>
            <p className="text-xs uppercase tracking-widest text-ink-muted">
              {experience.period}
            </p>
            <p className="mt-2 text-sm text-ink-muted">
              {experience.description}
            </p>
            <p className="mt-1 text-xs text-ink-muted">{experience.location}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
