export type RoadmapStageId = 'stage_0' | 'stage_1' | 'stage_2' | 'stage_3' | 'stage_4' | 'stage_5' | 'stage_6';

export interface RoadmapTopic {
  id: string;
  stageId: RoadmapStageId;
  title: string;
  shortDescription: string;
  estimatedHours: number;
  dataAnalystBridge: string; // How this connects to prior analyst knowledge
  difficulty: 'Foundational' | 'Intermediate' | 'Advanced' | 'Expert';
  coreSkills: string[];
  lessonContent: {
    overview: string;
    keyConcepts: {
      name: string;
      description: string;
      codeSnippet?: string;
    }[];
    deepDiveArticle: string;
    mathOrTheoryNote?: string;
    bestPractices: string[];
    commonTraps: string[];
  };
  checkpointQuiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
  practicalExercises: {
    title: string;
    instructions: string;
    starterCode: string;
    solutionCode: string;
    hints: string[];
  }[];
  xpReward: number;
}

export interface RoadmapStage {
  id: RoadmapStageId;
  stageNumber: number;
  title: string;
  subtitle: string;
  tagline: string;
  iconName: string;
  description: string;
  dataAnalystContext: string;
  outcomes: string[];
  topics: RoadmapTopic[];
}

export interface ProjectMilestone {
  id: string;
  title: string;
  description: string;
  tasks: string[];
  starterCode: string;
  solutionCode: string;
  codeExplanation: string;
  validationCriteria: string[];
}

export interface RealWorldProject {
  id: string;
  title: string;
  slug: string;
  category: 'Enterprise RAG' | 'Autonomous Agents' | 'Fine-Tuning & LLMOps' | 'Multimodal AI' | 'Text-to-SQL & Analytics' | 'Production Inference Engine';
  level: 'Intermediate' | 'Advanced' | 'Staff/Principal';
  estimatedHours: number;
  summary: string;
  businessScenario: string;
  realWorldImpact: string;
  analystAdvantage: string; // Why an analyst excels at this
  techStack: string[];
  architectureDiagram: string; // ASCII or structured graph
  architectureComponents: {
    name: string;
    role: string;
    tech: string;
  }[];
  milestones: ProjectMilestone[];
  keyDeliverables: string[];
  portfolioHighlights: string[];
  datasetOrApiInfo: {
    name: string;
    description: string;
    samplePayloadOrSchema: string;
  };
  xpReward: number;
}

export interface CodingChallenge {
  id: string;
  title: string;
  category: 'PyTorch Mechanics' | 'Transformers & Attention' | 'Vector Search & HNSW' | 'RAG Optimization' | 'Agentic Loops' | 'Quantization & Sizing';
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Extreme';
  xp: number;
  prompt: string;
  analystContext: string;
  starterCode: string;
  solutionCode: string;
  testCases: {
    inputDesc: string;
    expectedOutput: string;
    simulatedPass: boolean;
  }[];
  detailedExplanation: string;
}

export interface SystemDesignGuide {
  id: string;
  title: string;
  subtitle: string;
  category: 'LLM Serving & Scaling' | 'Vector DB Architecture' | 'Multi-Agent Frameworks' | 'GPU Memory Engineering';
  summary: string;
  keyFormulas: {
    name: string;
    formula: string;
    explanation: string;
  }[];
  tradeoffAnalysis: {
    dimension: string;
    optionA: string;
    optionB: string;
    recommendation: string;
  }[];
  caseStudy: string;
}

export interface VideoTutorial {
  id: string;
  title: string;
  stageId: RoadmapStageId;
  topicId?: string;
  instructor: string;
  instructorRole: string;
  durationMinutes: number;
  youtubeId: string;
  level: 'Foundational' | 'Intermediate' | 'Advanced' | 'Staff';
  category: string;
  summary: string;
  analystBridgeSummary: string;
  keyTimestamps: {
    timestamp: string;
    title: string;
    summary: string;
  }[];
  codeWalkthrough?: {
    title: string;
    language: string;
    code: string;
    explanation: string;
  };
  takeaways: string[];
  xpReward: number;
}

export interface GeneratedMasterclass {
  id: string;
  topicQuery: string;
  title: string;
  targetLevel: string;
  analystMentalAnchor: string;
  theoreticalMathIntuition: string;
  stepByStepCodeGuide: {
    stepNumber: number;
    stepTitle: string;
    explanation: string;
    codeSnippet: string;
  }[];
  architectureDiagram: string;
  productionPitfalls: string[];
  interviewQuestions: {
    question: string;
    idealAnswer: string;
  }[];
  practiceChallenge: {
    prompt: string;
    starterCode: string;
    solutionCode: string;
    testValidationTip: string;
  };
  createdAt: string;
}

export type CareerRole = 'data_analyst' | 'data_scientist' | 'ml_engineer' | 'ai_engineer';

export interface CareerRoleInfo {
  id: CareerRole;
  title: string;
  shortCode: string;
  tagline: string;
  averageSalaryUSD: string;
  experienceHorizon: string;
  iconName: string;
  badgeColor: string;
  overview: string;
  coreResponsibilities: string[];
  techStack: string[];
  mathematicalFoundations: string[];
  topInterviewTopics: string[];
  transitionBridge: string; // How to transition from previous role
  keyDeliverableArtifacts: string[];
}

export interface SQLChallenge {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Staff';
  category: 'Aggregations' | 'Window Functions' | 'Cohorts & Retention' | 'Time-Series & Funnels';
  description: string;
  initialQuery: string;
  solutionQuery: string;
  expectedOutputColumns: string[];
  hint: string;
  businessContext: string;
  xpReward: number;
}

export interface MLTrainingResult {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  aucRoc: number;
  confusionMatrix: {
    truePositive: number;
    falsePositive: number;
    trueNegative: number;
    falseNegative: number;
  };
  featureImportance: { feature: string; importance: number }[];
  rocCurve: { fpr: number; tpr: number }[];
  biasVarianceAssessment: 'Optimal Balance' | 'High Variance (Overfitting)' | 'High Bias (Underfitting)';
  trainingLossHistory: number[];
  validationLossHistory: number[];
}

export interface UserProgress {
  userName: string;
  currentLevel: number;
  totalXP: number;
  activeRole: CareerRole;
  completedTopicIds: string[];
  completedTutorialIds: string[];
  completedPracticumIds: string[];
  completedProjectMilestones: Record<string, string[]>; // projectId -> milestoneIds[]
  completedProjectIds: string[];
  completedChallengeIds: string[];
  unlockedBadges: string[];
  streakDays: number;
  lastActiveDate: string;
  notes: Record<string, string>; // topicId -> note
  savedCodeSnippets: Record<string, string>; // challengeId / milestoneId -> code
  savedTutorials: GeneratedMasterclass[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  requiredXP?: number;
  conditionDescription: string;
}

export interface AICodeReviewResponse {
  scoreOutOf100: number;
  verdict: 'Approved (Production Ready)' | 'Needs Refinement' | 'Critical Architectural Issues';
  summary: string;
  strengths: string[];
  architecturalImprovements: string[];
  performanceAndLatencyTips: string[];
  seniorStaffAdvice: string;
  revisedCodeSnippet?: string;
}

export interface AIMentorMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  content: string;
  codeSnippet?: string;
  category?: 'Career Roadmap' | 'Code Debugging' | 'System Architecture' | 'Math / Theory' | 'Interview Prep';
}
