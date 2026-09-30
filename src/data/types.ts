export interface Skill {
  id: string
  name: string
  category: 'languages' | 'frameworks-tools' | 'concepts-practices'
  icon: string
  note: string
}

export interface Project {
  id: string
  title: string
  description: string
  image: string
  tech: string[]
  github: string
  live: string
}

export interface Experience {
  id: string
  role: string
  company: string
  period: string
  description: string
  location: string
}

export interface Education {
  id: string
  degree: string
  school: string
  period: string
  notes: string
}

export interface Certification {
  id: string
  title: string
  issuer: string
  image: string
}

export interface ContactItem {
  type: string
  label: string
  value: string
  link: string
}

export interface TourSection {
  id: string
  sectionId: string
  heading: string
  audioPath: string
  caption: string
}
