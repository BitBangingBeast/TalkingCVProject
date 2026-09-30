import { Section, SectionHeading } from '../../components/ui'
import { motivationLetterBody, site } from '../../data'

const linkBase =
  'inline-flex items-center justify-center rounded-lg px-6 py-3 font-display text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan'
const primaryLink = `${linkBase} bg-gradient-brand text-surface shadow-lg shadow-neon-cyan/30 hover:brightness-110 hover:shadow-neon-magenta/40`
const secondaryLink = `${linkBase} border border-neon-cyan/50 bg-transparent text-neon-cyan hover:border-neon-cyan hover:bg-neon-cyan/10`

export default function MotivationLetter() {
  return (
    <Section id="motivation">
      <SectionHeading
        eyebrow="Why me"
        title="Motivation Letter"
        subtitle="A few words about who I am and what drives me."
      />

      <details
        open
        className="rounded-2xl border border-ink/10 bg-surface-raised p-6"
      >
        <summary className="cursor-pointer font-display text-sm font-semibold text-neon-cyan">
          Read my motivation letter
        </summary>
        <div className="mt-4 flex flex-col gap-4">
          {motivationLetterBody.map((paragraph, index) => (
            <p key={index} className="text-base leading-relaxed text-ink-muted">
              {paragraph}
            </p>
          ))}
        </div>
      </details>

      <div className="mt-8 flex flex-wrap gap-4">
        <a
          href={site.motivationLetter.previewUrl}
          target="_blank"
          rel="noreferrer noopener"
          className={primaryLink}
        >
          Preview in new window
        </a>
        <a href={site.motivationLetter.downloadUrl} className={secondaryLink}>
          Download PDF
        </a>
      </div>
    </Section>
  )
}
