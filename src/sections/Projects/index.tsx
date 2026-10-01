import { Button, Card, Section, SectionHeading } from '../../components/ui'
import { projects } from '../../data/projects'
import { skills } from '../../data/skills'

const skillNames = new Map(skills.map((skill) => [skill.id, skill.name]))

function resolveTech(id: string): string {
  return skillNames.get(id) ?? id
}

export default function Projects() {
  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Portfolio"
        title="Projects"
        subtitle="A selection of things I have designed and built."
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="flex flex-col gap-4">
            <img
              src={project.image}
              alt={project.title}
              className="h-40 w-full rounded-xl object-cover"
              loading="lazy"
            />
            <h3 className="font-display text-lg font-semibold text-ink">
              {project.title}
            </h3>
            <p className="text-sm text-ink-muted">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((techId) => (
                <span
                  key={techId}
                  className="rounded-full border border-neon-cyan/30 px-3 py-1 text-xs text-neon-cyan"
                >
                  {resolveTech(techId)}
                </span>
              ))}
            </div>
            <div className="mt-auto flex flex-wrap gap-3">
              <Button
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
              >
                View in GitHub
              </Button>
              <Button
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
              >
                Live
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  )
}
