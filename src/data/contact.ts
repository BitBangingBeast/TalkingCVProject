import type { ContactItem } from './types'

export const contact: ContactItem[] = [
  {
    type: 'email',
    label: 'Email',
    value: 'your.email@gmail.com',
    link: 'mailto:your.email@gmail.com',
  },
  {
    type: 'linkedin',
    label: 'LinkedIn',
    value: 'Your LinkedIn Profile',
    link: 'https://www.linkedin.com/in/yourprofile',
  },
  {
    type: 'github',
    label: 'GitHub',
    value: 'yourusername',
    link: 'https://github.com/yourusername',
  },
  {
    type: 'phone',
    label: 'Phone',
    value: '+1234567890',
    link: 'tel:+1234567890',
  },
  {
    type: 'location',
    label: 'Location',
    value: 'Tampere, Finland',
    link: '#',
  },
]
