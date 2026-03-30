export const ICON_OPTIONS = [
  { label: 'Lightning / Innovation', value: 'lightning' },
  { label: 'Globe / International', value: 'globe' },
  { label: 'Team / People', value: 'people' },
  { label: 'Star / Excellence', value: 'star' },
  { label: 'Idea / Sustainability', value: 'bulb' },
  { label: 'Chart / Growth', value: 'chart' },
  { label: 'Security / Trust', value: 'shield' },
  { label: 'Heart / Culture', value: 'heart' },
  { label: 'Science / Research', value: 'beaker' },
  { label: 'Cloud / Climate', value: 'cloud' },
  { label: 'Logistics / Delivery', value: 'truck' },
  { label: 'Education / Knowledge', value: 'academic' },
  { label: 'Rocket / Progress', value: 'rocket' },
  { label: 'Trophy / Achievement', value: 'trophy' },
  { label: 'Settings / Operations', value: 'settings' },
  { label: 'Location / Branch', value: 'location' },
] as const

export type IconKey = (typeof ICON_OPTIONS)[number]['value']
