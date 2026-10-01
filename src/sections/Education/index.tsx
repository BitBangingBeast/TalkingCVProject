import { Section, SectionHeading } from '../../components/ui'
import { education } from '../../data/education'

export default function Education() {
  return (
    <Section id="education">
      <SectionHeading
        title="Education"
        subtitle="My academic background and studies."
      />
      <ol className="relative border-l border-ink/10">
        {education.map((item) => (
          <li key={item.id} className="relative mb-8 pl-8 last:mb-0">
            <span className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-gradient-brand" />
            <h3 className="font-display text-lg font-semibold text-ink">
              {item.degree}
            </h3>
            <p className="text-sm text-neon-cyan">{item.school}</p>
            <p className="text-xs uppercase tracking-widest text-ink-muted">
              {item.period}
            </p>
            <p className="mt-2 text-sm text-ink-muted">{item.notes}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
