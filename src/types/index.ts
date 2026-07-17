export type ProjectCategory = 'systems' | 'ai' | 'embedded' | 'robotics'
export type EvidenceLevel = 'A' | 'B' | 'C' | 'D'
export type ProjectStatus = 'verified' | 'mvp-verified' | 'release' | 'in-progress' | 'iterating' | 'paused'
export type RoadmapStatus = 'done' | 'current' | 'planned'
export type LinkType = 'repo' | 'pr' | 'benchmark' | 'release' | 'demo' | 'doc' | 'other'

export interface ProjectArchiveState {
  category: ProjectCategory | 'all'
  scrollY: number
}

export interface ProjectNavigationState {
  archive?: ProjectArchiveState
  restoreArchive?: ProjectArchiveState
}

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

export interface ProjectFlowStep {
  label: string
  title: string
  description: string
}

export interface ProjectDecision {
  title: string
  context: string
  decision: string
  outcome: string
  tradeoff?: string
  evidence?: string
}

export interface ProjectArchitecture {
  title: string
  summary: string
  flow: ProjectFlowStep[]
  decisions: ProjectDecision[]
  media?: ProjectMedia
}

export type ProjectAuditStatus = 'passed' | 'qualified'

export interface ProjectAuditCheck {
  title: string
  result: string
  detail?: string
  status: ProjectAuditStatus
}

export interface ProjectAudit {
  title: string
  date: string
  environment: string
  summary: string
  checks: ProjectAuditCheck[]
  media?: ProjectMedia[]
}

export interface ProjectResearch {
  title: string
  status: string
  role: string
  summary: string
  questions: string[]
  deliverables?: string[]
  boundary: string
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
  showcaseMedia?: ProjectMedia[]
  evidenceMedia?: ProjectMedia[]
  summary: string
  highlights: string[]
  metrics: ProjectMetric[]
  stack: StackGroup[]
  links: ProjectLink[]
  background?: string
  solution?: string
  results?: string
  collaboration?: string
  research?: ProjectResearch
  boundaries?: string[]
  roadmap?: RoadmapItem[]
  upstream?: string
  architecture?: ProjectArchitecture
  audit?: ProjectAudit
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
