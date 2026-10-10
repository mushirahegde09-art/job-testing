export interface Job {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  locationType: 'Remote' | 'Hybrid' | 'On-site';
  department: 'Frontend' | 'Backend' | 'Fullstack' | 'AI & ML' | 'DevOps & Cloud' | 'Product & Design';
  experienceLevel: 'Entry-Level' | 'Mid-Level' | 'Senior' | 'Staff / Lead';
  salaryMin: number;
  salaryMax: number;
  salaryCurrency: string;
  equity?: string;
  featured?: boolean;
  postedDate: string;
  applicantsCount: number;
  description: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  benefits: string[];
  techStack: string[];
  companySize: string;
  companyWebsite: string;
  hiringManager: {
    name: string;
    role: string;
    avatar: string;
  };
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  appliedDate: string;
  status: 'Submitted' | 'Under Review' | 'Interview Scheduled' | 'Offer Received' | 'Archived';
  candidateName: string;
  candidateEmail: string;
  matchScore: number;
}

export type TrackType = 'frontend' | 'backend' | 'system-design' | 'ai-ml' | 'behavioral';

export interface PrepQuestion {
  id: string;
  track: TrackType;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  companies: string[];
  estimatedMinutes: number;
  description: string;
  hint: string;
  codeSnippet?: string;
  solution: string;
  keyTakeaways: string[];
  starGuide?: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
}

export interface MockSessionQuestion {
  id: string;
  question: string;
  category: string;
  difficulty: 'Medium' | 'Hard';
  expectedPoints: string[];
  sampleBestAnswer: string;
}

export interface CompanyBlueprint {
  id: string;
  name: string;
  logo: string;
  tagline: string;
  hiringBar: string;
  averageSalarySenior: string;
  stages: {
    stage: string;
    duration: string;
    description: string;
    tips: string;
  }[];
  culturePrinciples: {
    title: string;
    description: string;
  }[];
  frequentQuestions: {
    question: string;
    type: 'Coding' | 'System Design' | 'Behavioral';
    insight: string;
  }[];
  benefitsHighlight: string[];
}

export interface ATSScanResult {
  score: number;
  matchPercentage: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  formattingIssues: string[];
  strongVerbsFound: string[];
  suggestedAdditions: string[];
  summary: string;
}
