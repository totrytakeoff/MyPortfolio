export type ProjectCategory = 'cpp' | 'embedded' | 'robotics'
export type EvidenceLevel = 'A' | 'B' | 'C' | 'D'
export type ProjectStatus = 'verified' | 'mvp-verified' | 'release' | 'in-progress' | 'iterating'
export type RoadmapStatus = 'done' | 'current' | 'planned'
export type LinkType = 'repo' | 'pr' | 'benchmark' | 'release' | 'demo' | 'doc' | 'other'

export interface ProjectLink {
  label: string
  url: string
  type: LinkType
}

export interface ProjectMetric {
  value: string
  unit: string
  description: string
}

export interface ProjectEvidence {
  level: EvidenceLevel
  items: string[]
}

export interface RoadmapItem {
  label: string
  status: RoadmapStatus
}

export interface StackGroup {
  domain: string
  items: string[]
}

export interface ProjectMedia {
  src: string
  alt: string
  caption?: string
  fit?: 'cover' | 'contain'
  position?: string
}

export interface Project {
  slug: string
  title: string
  subtitle: string
  category: ProjectCategory[]
  featured: boolean
  role: string
  period: string
  status: ProjectStatus
  evidence: ProjectEvidence
  cover: ProjectMedia
  gallery?: ProjectMedia[]
  summary: string
  highlights: string[]
  metrics: ProjectMetric[]
  stack: StackGroup[]
  links: ProjectLink[]
  background?: string
  solution?: string
  results?: string
  boundaries?: string[]
  roadmap?: RoadmapItem[]
  upstream?: string
}

export interface Profile {
  name: string
  nameEn: string
  tagline: string
  summary: string
  github: string
  githubUrl: string
  email: string
  phone: string
  graduationYear: number
  degree: string
  school: string
}

export interface SkillItem {
  name: string
  note?: string
}

export interface Skill {
  domain: string
  domainLabel: string
  items: SkillItem[]
}

export interface OpenSourceContribution {
  index: number
  project: string
  repo: string
  summary: string
  value: string[]
  url: string
  prNumber: string
}

export interface Resume {
  direction: string
  slug: string
  description: string
  filename: string
  highlights: string[]
}
