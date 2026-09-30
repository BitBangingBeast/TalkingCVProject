import { describe, expect, it } from 'vitest'
import { site } from './site'
import { skills } from './skills'
import { projects } from './projects'
import { experiences } from './experience'
import { education } from './education'
import { certifications } from './certifications'
import { contact } from './contact'
import { tour } from './tour'

describe('data layer', () => {
  it('exports non-empty data', () => {
    expect(site.name).toBeTruthy()
    expect(skills.length).toBeGreaterThan(0)
    expect(projects.length).toBeGreaterThan(0)
    expect(experiences.length).toBeGreaterThan(0)
    expect(education.length).toBeGreaterThan(0)
    expect(certifications.length).toBeGreaterThan(0)
    expect(contact.length).toBeGreaterThan(0)
    expect(tour.length).toBeGreaterThan(0)
  })

  it('project tech references existing skills', () => {
    const skillIds = new Set(skills.map((skill) => skill.id))
    for (const project of projects) {
      for (const techId of project.tech) {
        expect(skillIds.has(techId)).toBe(true)
      }
    }
  })

  it('tour sectionIds are unique and non-empty', () => {
    const sectionIds = tour.map((section) => section.sectionId)
    expect(new Set(sectionIds).size).toBe(sectionIds.length)
    for (const sectionId of sectionIds) {
      expect(sectionId.trim()).not.toBe('')
    }
  })

  it('site documents are present', () => {
    expect(site.cv.previewUrl).toBeTruthy()
    expect(site.cv.downloadUrl).toBeTruthy()
    expect(site.motivationLetter.previewUrl).toBeTruthy()
    expect(site.motivationLetter.downloadUrl).toBeTruthy()
  })
})
