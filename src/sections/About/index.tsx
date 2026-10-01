import { Section, SectionHeading } from '../../components/ui'
import { site } from '../../data'

const quickFacts = [
  { label: 'Location', value: site.quickFacts.location },
  { label: 'Focus', value: site.quickFacts.focus },
  { label: 'Status', value: site.quickFacts.status },
  { label: 'Availability', value: site.quickFacts.availability },
]

export default function About() {
  return (
    <Section id="about">
      <SectionHeading
        title="About Me"
        subtitle="A quick look at who I am and what I am looking for."
      />
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-10 text-center">
        <p className="text-lg leading-relaxed text-ink-muted">{site.bio}</p>

        <dl className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickFacts.map((fact) => (
            <div
              key={fact.label}
              className="rounded-xl border border-ink/10 bg-surface-raised p-4"
            >
              <dt className="text-xs font-semibold uppercase tracking-widest text-ink-muted">
                {fact.label}
              </dt>
              <dd className="mt-1 font-display text-sm text-ink">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}
