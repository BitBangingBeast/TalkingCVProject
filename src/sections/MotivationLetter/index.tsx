import { Section, SectionHeading } from '../../components/ui'
import { DocumentMenu } from '../../components/DocumentMenu'
import { motivationLetterBody, site } from '../../data'

export default function MotivationLetter() {
  return (
    <Section id="motivation">
      <SectionHeading
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
        <DocumentMenu
          label="Motivation Letter"
          openLabel="Preview"
          previewUrl={site.motivationLetter.previewUrl}
          downloadUrl={site.motivationLetter.downloadUrl}
          downloadLabel="Download PDF"
        />
      </div>
    </Section>
  )
}
