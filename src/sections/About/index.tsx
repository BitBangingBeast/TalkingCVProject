import { Button, Section, SectionHeading } from '../../components/ui'
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
        eyebrow="About"
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

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={site.cv.previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg border border-neon-cyan/50 bg-transparent px-6 py-3 font-display text-sm font-semibold text-neon-cyan transition-all duration-200 hover:border-neon-cyan hover:bg-neon-cyan/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan"
          >
            Preview CV
          </a>
          <Button href={site.cv.downloadUrl} variant="primary">
            Download CV
          </Button>
        </div>
      </div>
    </Section>
  )
}
