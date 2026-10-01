import { Card, Section, SectionHeading } from '../../components/ui'
import { skills } from '../../data'
import type { Skill } from '../../data'

type CategoryKey = Skill['category']

const categories: { key: CategoryKey; label: string }[] = [
  { key: 'languages', label: 'Languages' },
  { key: 'frameworks-tools', label: 'Frameworks & Tools' },
  { key: 'concepts-practices', label: 'Concepts & Practices' },
]

export default function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        title="Technologies I Use"
        subtitle="Tools and practices I reach for when building for the web."
      />

      <div className="flex flex-col gap-12">
        {categories.map((category) => (
          <div key={category.key}>
            <h3 className="mb-6 font-display text-lg font-semibold text-ink">
              {category.label}
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {skills
                .filter((skill) => skill.category === category.key)
                .map((skill) => (
                  <Card key={skill.id}>
                    <div className="flex items-start gap-4">
                      <span
                        aria-hidden="true"
                        className="text-2xl leading-none"
                      >
                        {skill.icon}
                      </span>
                      <div>
                        <h4 className="font-display text-base font-semibold text-ink">
                          {skill.name}
                        </h4>
                        <p className="mt-1 text-sm text-ink-muted">
                          {skill.note}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
