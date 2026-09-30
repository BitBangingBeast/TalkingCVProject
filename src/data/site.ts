export interface SocialLink {
  label: string
  href: string
}

export interface QuickFacts {
  location: string
  focus: string
  status: string
  availability: string
}

export interface DocumentLink {
  previewUrl: string
  downloadUrl: string
}

export interface Site {
  name: string
  headline: string
  tagline: string
  bio: string
  quickFacts: QuickFacts
  socials: SocialLink[]
  cv: DocumentLink
  motivationLetter: DocumentLink
}

export const site: Site = {
  name: 'Abdenour Abdelaziz',
  headline: 'Software Engineering Student & Web Developer',
  tagline: 'Turning ideas into reliable, human-friendly software.',
  bio: 'A curious software engineering student who enjoys building clean, accessible web experiences and learning across the stack.',
  quickFacts: {
    location: 'Tampere, Finland',
    focus: 'Full-stack web development',
    status: 'B.Sc. student at TAMK',
    availability: 'Open to internships & freelance work',
  },
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/yourprofile' },
    { label: 'GitHub', href: 'https://github.com/yourusername' },
  ],
  cv: {
    previewUrl: '/docs/cv.pdf',
    downloadUrl: '/docs/cv.pdf',
  },
  motivationLetter: {
    previewUrl: '/docs/motivation-letter.pdf',
    downloadUrl: '/docs/motivation-letter.pdf',
  },
}
