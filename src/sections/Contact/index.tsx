import { Button, Card, Section, SectionHeading } from '../../components/ui'
import { contact } from '../../data'

const iconByType: Record<string, string> = {
  email: '✉️',
  linkedin: '💼',
  github: '🐙',
  phone: '📞',
  location: '📍',
}

export default function Contact() {
  const email = contact.find((item) => item.type === 'email')

  return (
    <Section id="contact">
      <SectionHeading
        title="Contact"
        subtitle="Reach out about internships, freelance work, or just to say hi."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {contact.map((item) => {
          const isExternal = item.link.startsWith('http')
          return (
            <Card key={item.type} className="flex flex-col gap-3">
              <span aria-hidden="true" className="text-2xl">
                {iconByType[item.type] ?? '🔗'}
              </span>
              <h3 className="font-display text-sm font-semibold text-ink">
                {item.label}
              </h3>
              <a
                href={item.link}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noreferrer noopener' : undefined}
                className="break-all text-sm text-ink-muted transition-colors hover:text-neon-cyan"
              >
                {item.value}
              </a>
            </Card>
          )
        })}
      </div>

      {email ? (
        <div className="mt-10 flex justify-center">
          <Button href={email.link}>Email me</Button>
        </div>
      ) : null}
    </Section>
  )
}
