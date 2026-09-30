import type { TourSection } from './types'

export const tour: TourSection[] = [
  {
    id: 'tour-hero',
    sectionId: 'heroSection',
    heading: 'Welcome',
    audioPath: '/audio/section-1.mp3',
    caption: "Hi, I'm Abdenour. Let me walk you through my CV.",
  },
  {
    id: 'tour-about',
    sectionId: 'about',
    heading: 'About Me',
    audioPath: '/audio/section-2.mp3',
    caption: "Here's a short introduction to who I am and what I care about.",
  },
  {
    id: 'tour-skills',
    sectionId: 'skills',
    heading: 'Skills',
    audioPath: '/audio/section-3.mp3',
    caption: 'These are the languages, tools and practices I work with.',
  },
  {
    id: 'tour-projects',
    sectionId: 'projects',
    heading: 'Projects',
    audioPath: '/audio/section-4.mp3',
    caption: 'A few projects that show what I can build.',
  },
  {
    id: 'tour-work-experience',
    sectionId: 'work-experience',
    heading: 'Work Experience',
    audioPath: '/audio/section-5.mp3',
    caption: 'Where I have worked and what I contributed.',
  },
  {
    id: 'tour-education',
    sectionId: 'education',
    heading: 'Education',
    audioPath: '/audio/section-6.mp3',
    caption: 'My academic background and current studies.',
  },
  {
    id: 'tour-certifications',
    sectionId: 'certifications',
    heading: 'Certifications',
    audioPath: '/audio/section-7.mp3',
    caption: 'Recommendation letters, transcripts and certificates.',
  },
  {
    id: 'tour-motivation',
    sectionId: 'motivation',
    heading: 'Motivation Letter',
    audioPath: '/audio/section-8.mp3',
    caption: 'Why I am motivated and what drives me.',
  },
  {
    id: 'tour-contact',
    sectionId: 'contact',
    heading: 'Contact',
    audioPath: '/audio/section-9.mp3',
    caption: "Let's get in touch.",
  },
]
