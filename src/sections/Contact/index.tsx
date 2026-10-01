import { Card, Section, SectionHeading } from '../../components/ui'
import { contact } from '../../data'

const iconByType: Record<string, string> = {
  email: '✉️',
  linkedin: '💼',
  github: '🐙',
  phone: '📞',
  location: '📍',
}

export default function Contact() {
  return (
    <Section id="contact">
      <SectionHeading
        title="Contact"
        subtitle="Reach out about internships, freelance work, or just to say hi."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {contact.map((item) => {
          const isExternal = item.link.startsWith('http')
          const isClickable = item.link !== '' && item.link !== '#'

          const content = (
            <Card className="flex h-full flex-col gap-3">
              <span aria-hidden="true" className="text-2xl">
                {iconByType[item.type] ?? '🔗'}
              </span>
              <h3 className="font-display text-sm font-semibold text-ink">
                {item.label}
              </h3>
              <span className="break-all text-sm text-ink-muted transition-colors group-hover:text-neon-cyan">
                {item.value}
              </span>
            </Card>
          )

          if (!isClickable) {
            return <div key={item.type}>{content}</div>
          }

          return (
            <a
              key={item.type}
              href={item.link}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noreferrer noopener' : undefined}
              className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan"
            >
              {content}
            </a>
          )
        })}
      </div>
    </Section>
  )
}
