import { Button, Section } from '../../components/ui'
import { site } from '../../data'

interface HeroProps {
  onStartTour?: () => void
}

export default function Hero({ onStartTour = () => {} }: HeroProps) {
  return (
    <Section id="heroSection" className="flex min-h-screen items-center">
      <div className="flex flex-col items-center gap-12 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex flex-col items-center gap-6 md:items-start">
          <h1 className="text-gradient font-display text-4xl font-bold md:text-6xl">
            {site.name}
          </h1>
          <p className="font-display text-xl text-ink md:text-2xl">
            {site.headline}
          </p>
          <p className="max-w-xl text-base text-ink-muted">{site.tagline}</p>

          <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <Button onClick={onStartTour}>Start the Tour</Button>
            <Button href="#projects" variant="secondary">
              View Projects
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <a
              href={site.cv.previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neon-cyan transition-colors hover:text-neon-magenta"
            >
              Preview CV
            </a>
            <span className="text-ink-muted">·</span>
            <a
              href={site.cv.downloadUrl}
              download
              className="text-sm text-neon-cyan transition-colors hover:text-neon-magenta"
            >
              Download CV
            </a>
          </div>

          <ul className="flex items-center gap-4">
            {site.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-ink-muted transition-colors hover:text-neon-cyan"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gradient-brand h-64 w-64 rounded-full md:h-80 md:w-80" />
      </div>
    </Section>
  )
}
