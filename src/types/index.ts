export type ProjectMode = 'idea' | 'inspiration';

export type GenerationStep = 
  | 'idle'
  | 'blueprint'
  | 'architecture'
  | 'database'
  | 'api'
  | 'personas'
  | 'feedback'
  | 'ceoReview'
  | 'marketAnalysis'
  | 'improvement'
  | 'launchPreview'
  | 'snapshot'
  | 'complete';

export interface Blueprint {
  problemStatement: string;
  targetAudience: string;
  coreFeatures: string[];
  mvpFeatures: string[];
  techStack: string[];
  uniqueValue: string;
}

export interface ArchitectureNode {
  id: string;
  label: string;
  type: 'frontend' | 'backend' | 'database' | 'service' | 'user' | 'external';
  description: string;
  technologies: string[];
}

export interface ArchitectureEdge {
  from: string;
  to: string;
  label: string;
}

export interface Architecture {
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
  description: string;
}

export interface DatabaseField {
  name: string;
  type: string;
  constraints?: string;
}

export interface DatabaseTable {
  name: string;
  description: string;
  fields: DatabaseField[];
  relationships: string[];
}

export interface Database {
  tables: DatabaseTable[];
  dbType: string;
  description: string;
}

export interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description: string;
  requestBody?: string;
  responseExample?: string;
  auth: boolean;
}

export interface ApiGroup {
  group: string;
  endpoints: ApiEndpoint[];
}

export interface Persona {
  name: string;
  role: string;
  age: number;
  bio: string;
  avatar: string;
  positiveFeedback: string[];
  negativeFeedback: string[];
  missingFeatures: string[];
  suggestions: string[];
  rating: number;
}

export interface ImprovementSuggestion {
  toRemove: { feature: string; reason: string }[];
  toImprove: { feature: string; improvement: string }[];
  toAdd: { feature: string; reason: string }[];
  optimizedMvp: string[];
  originalBlueprint: Blueprint;
  improvedBlueprint: Blueprint;
}

export interface ScreenConcept {
  name: string;
  description: string;
  components: string[];
  layout: string;
}

export interface FutureSnapshot {
  appName: string;
  tagline: string;
  colorScheme: string;
  screens: ScreenConcept[];
  navigationStructure: string[];
  keyWidgets: string[];
  designPrinciples: string[];
}

export interface InspirationAnalysis {
  productPurpose: string;
  coreFeatures: string[];
  userFlow: string[];
  databaseStructure: string[];
  backendArchitecture: string[];
  monetizationModel: string[];
  appCategory: string;
}

export interface CeoReview {
  whatILike: string[];
  biggestRisks: string[];
  mvpRecommendation: string[];
  growthPotential: string;
  founderScore: number;
}

export interface MarketAnalysis {
  existingCompetitors: string[];
  marketGap: string;
  differentiation: string;
  opportunityScore: number;
}

export interface LaunchPreview {
  appName: string;
  tagline: string;
  colorScheme: string;
  homeScreenLayout: string;
  navigationStructure: string[];
  keyComponents: string[];
  dashboardSections: string[];
  userJourney: string[];
}

export interface Project {
  id: string;
  name: string;
  mode: ProjectMode;
  idea?: string;
  inspirationImage?: string;
  inspirationAnalysis?: InspirationAnalysis;
  customPrompt?: string;
  blueprint?: Blueprint;
  architecture?: Architecture;
  database?: Database;
  api?: ApiGroup[];
  personas?: Persona[];
  improvement?: ImprovementSuggestion;
  ceoReview?: CeoReview;
  marketAnalysis?: MarketAnalysis;
  launchPreview?: LaunchPreview;
  snapshot?: FutureSnapshot;
  currentStep: GenerationStep;
  createdAt: string;
}
