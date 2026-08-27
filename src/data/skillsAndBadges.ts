import { Badge } from '../types';

export interface SkillNode {
  id: string;
  name: string;
  category: 'Foundation' | 'Machine Learning' | 'Deep Learning' | 'LLM & RAG' | 'Agents & Tools' | 'Serving & MLOps';
  level: number;
  analystSource: string;
  engineerTarget: string;
  requiredTopicIds: string[];
}

export const SKILL_NODES: SkillNode[] = [
  {
    id: 'sk_1',
    name: 'Vector Database & Embedding Spaces',
    category: 'Foundation',
    level: 1,
    analystSource: 'Relational SQL queries & B-Tree Indexes',
    engineerTarget: 'HNSW, Cosine Similarity & Dense High-Dim Embeddings',
    requiredTopicIds: ['da_bridge_1']
  },
  {
    id: 'sk_2',
    name: 'PyTorch Multi-Dim Tensors & CUDA',
    category: 'Foundation',
    level: 1,
    analystSource: 'Pandas 2D DataFrames & Vectorized .apply()',
    engineerTarget: '3D/4D Batch Tensors, Broadcasting, GPU CUDA Memory',
    requiredTopicIds: ['da_bridge_2']
  },
  {
    id: 'sk_3',
    name: 'Clean Async Python & Model Schemas',
    category: 'Foundation',
    level: 2,
    analystSource: 'Linear Jupyter Notebook Scripts',
    engineerTarget: 'FastAPI, Pydantic V2, AsyncIO Concurrency Pools',
    requiredTopicIds: ['soft_eng_1']
  },
  {
    id: 'sk_4',
    name: 'Autograd & Matrix Calculus',
    category: 'Deep Learning',
    level: 2,
    analystSource: 'Business Metric Derivative Calculations',
    engineerTarget: 'Dynamic Computational DAGs, Backpropagation Engines',
    requiredTopicIds: ['soft_eng_2']
  },
  {
    id: 'sk_5',
    name: 'Leak-Free Tabular ML & GBDT',
    category: 'Machine Learning',
    level: 3,
    analystSource: 'BI Dashboards & Correlation Reports',
    engineerTarget: 'LightGBM/XGBoost, Out-of-Fold Target Encoding, SHAP',
    requiredTopicIds: ['ml_core_1']
  },
  {
    id: 'sk_6',
    name: 'Scaled Dot-Product & Multi-Head Attention',
    category: 'Deep Learning',
    level: 4,
    analystSource: 'Multi-table SQL relational JOINs',
    engineerTarget: 'Soft Dynamic Attention (Q, K, V), Causal Masks, RoPE',
    requiredTopicIds: ['deep_learn_1']
  },
  {
    id: 'sk_7',
    name: 'Production Hybrid RAG & Re-ranking',
    category: 'LLM & RAG',
    level: 5,
    analystSource: 'Full-text SQL search & Regex matching',
    engineerTarget: 'BM25 + Dense RRF Fusion, Cross-Encoder Re-rankers',
    requiredTopicIds: ['genai_1']
  },
  {
    id: 'sk_8',
    name: 'Autonomous ReAct Agents & Tool Calling',
    category: 'Agents & Tools',
    level: 5,
    analystSource: 'Manual data workflow execution & report generation',
    engineerTarget: 'Autonomous Thought-Action-Observation loops with self-repair',
    requiredTopicIds: ['genai_2']
  },
  {
    id: 'sk_9',
    name: 'GPU Memory Math & High-Throughput Serving',
    category: 'Serving & MLOps',
    level: 6,
    analystSource: 'Database RAM buffer pool sizing',
    engineerTarget: 'vLLM PagedAttention, KV-Cache sizing, AWQ Quantization',
    requiredTopicIds: ['mlops_1']
  },
  {
    id: 'sk_10',
    name: 'Enterprise Multi-Tenant AI Governance',
    category: 'Serving & MLOps',
    level: 6,
    analystSource: 'Business requirements & BI security permissions',
    engineerTarget: 'Distributed AI serving, Semantic Caching, RBAC Vector ACL',
    requiredTopicIds: ['expert_capstone_1']
  }
];

export const BADGES: Badge[] = [
  {
    id: 'badge_bridge',
    title: 'Data Analyst Transformer',
    description: 'Completed the Data Analyst Bridge curriculum and mastered vector spaces.',
    icon: 'Sparkles',
    conditionDescription: 'Complete all topics in Stage 0'
  },
  {
    id: 'badge_autograd',
    title: 'Autograd & Systems Engineer',
    description: 'Understood computational graphs, backprop, and production async architectures.',
    icon: 'Cpu',
    conditionDescription: 'Complete all topics in Stage 1'
  },
  {
    id: 'badge_ml_rigor',
    title: 'Statistical ML Craftsman',
    description: 'Mastered leak-free validation and Gradient Boosted Tree architectures.',
    icon: 'BarChart2',
    conditionDescription: 'Complete all topics in Stage 2'
  },
  {
    id: 'badge_attention',
    title: 'Attention Architect',
    description: 'Deconstructed and built Multi-Head Self-Attention from first principles.',
    icon: 'Network',
    conditionDescription: 'Complete all topics in Stage 3'
  },
  {
    id: 'badge_rag_agent',
    title: 'RAG & Multi-Agent Maestro',
    description: 'Mastered production hybrid search, cross-encoders, and autonomous tool calling.',
    icon: 'Bot',
    conditionDescription: 'Complete all topics in Stage 4'
  },
  {
    id: 'badge_mlops_vllm',
    title: 'High-Throughput Serving Specialist',
    description: 'Mastered vLLM, continuous batching, quantization, and GPU memory engineering.',
    icon: 'Server',
    conditionDescription: 'Complete all topics in Stage 5'
  },
  {
    id: 'badge_global_expert',
    title: 'World-Class AI Systems Architect',
    description: 'Completed the full curriculum, enterprise system designs, and flagship projects.',
    icon: 'Crown',
    conditionDescription: 'Reach Level 10 and complete Stage 6'
  },
  {
    id: 'badge_first_project',
    title: 'Enterprise Builder',
    description: 'Completed your first real-world enterprise project milestone.',
    icon: 'CheckCircle2',
    conditionDescription: 'Complete any Project Milestone'
  },
  {
    id: 'badge_code_challenger',
    title: 'Algorithmic Champion',
    description: 'Solved an interactive AI engineering coding lab challenge.',
    icon: 'Code2',
    conditionDescription: 'Solve any Coding Lab Challenge'
  }
];
