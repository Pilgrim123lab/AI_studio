import { SystemDesignGuide } from '../types';

export const SYSTEM_DESIGN_GUIDES: SystemDesignGuide[] = [
  {
    id: 'sd_1',
    title: 'High-Throughput Distributed LLM Serving Cluster',
    subtitle: 'Architecting for 10,000+ Concurrent Requests with PagedAttention and Tensor Parallelism',
    category: 'LLM Serving & Scaling',
    summary: 'How to serve 70B+ parameter models across multiple GPU nodes (e.g. 8x H100) using Tensor Parallelism, Continuous Batching, and PagedAttention memory management with sub-second response times.',
    keyFormulas: [
      {
        name: 'Time To First Token (TTFT)',
        formula: 'TTFT = T_{prefill} = \\frac{\\text{Prompt Tokens}}{\\text{GPU FLOPS}} + \\text{Network Latency}',
        explanation: 'Prefill phase is compute-bound. All prompt tokens are ingested in parallel to populate the initial KV-cache.'
      },
      {
        name: 'Inter-Token Latency (ITL)',
        formula: 'ITL = T_{decode} = \\frac{2 \\times \\text{Model Parameters}}{\\text{Memory Bandwidth (GB/s)}}',
        explanation: 'Decode phase is memory-bandwidth bound. Generating 1 token requires streaming all model weights through the GPU memory bus once.'
      }
    ],
    tradeoffAnalysis: [
      {
        dimension: 'Batching Strategy',
        optionA: 'Static Request Batching (HuggingFace default)',
        optionB: 'Continuous / Dynamic Iteration Batching (vLLM)',
        recommendation: 'Continuous batching inserts new incoming requests into running decode iterations immediately without waiting for previous requests to finish, boosting GPU utilization from 20% to 90%.'
      },
      {
        dimension: 'Quantization Technique',
        optionA: 'FP16 / BF16 (No quantization)',
        optionB: 'AWQ / GPTQ 4-Bit NormalFloat',
        recommendation: 'Use AWQ 4-bit for serving on single GPUs: 3.5x VRAM reduction with negligible (<0.5%) perplexity degradation on general NLP tasks.'
      }
    ],
    caseStudy: 'Uber / Netflix scale: Routing customer service queries with a semantic cache layer (Redis Vector) that serves 35% of common questions at 5ms latency, saving $1.2M annually in frontier LLM API bills.'
  },
  {
    id: 'sd_2',
    title: 'Petabyte-Scale Multi-Tenant Vector Database Architecture',
    subtitle: 'Hierarchical Navigable Small World (HNSW) vs Inverted File Flat (IVFFlat) Indexing',
    category: 'Vector DB Architecture',
    summary: 'Architecting a vector retrieval infrastructure handling 500 million embeddings with multi-tenant isolation, metadata payload filtering, and sub-30ms P99 search latency.',
    keyFormulas: [
      {
        name: 'HNSW Memory Footprint',
        formula: 'M_{HNSW} = N \\times (d \\times 4 + M \\times 8) \\text{ bytes}',
        explanation: 'Where N is vector count, d is dimension (e.g. 1536), and M is graph connections per node (typically 16-64).'
      }
    ],
    tradeoffAnalysis: [
      {
        dimension: 'Vector Index Type',
        optionA: 'HNSW (Graph-based ANN)',
        optionB: 'IVF-PQ (Inverted File + Product Quantization)',
        recommendation: 'Use HNSW for low latency and high recall (>95%). Use IVF-PQ when storing >100M vectors where RAM is constrained and 90% recall is acceptable.'
      },
      {
        dimension: 'Metadata Filtering Order',
        optionA: 'Post-Filtering (Search vector first, then filter)',
        optionB: 'Single-Stage Integrated Payload Filtering (Qdrant style)',
        recommendation: 'Post-filtering frequently returns 0 results if the top nearest neighbors fail the metadata filter. Integrated payload filtering enforces metadata predicates during graph traversal.'
      }
    ],
    caseStudy: 'Enterprise Notion/Slack AI: Partitioning vector collections by Workspace ID and Department ACL, ensuring no employee can retrieve document embeddings beyond their security clearance.'
  }
];

export interface AIPaperDigest {
  id: string;
  title: string;
  authors: string;
  year: number;
  significance: string;
  coreInsight: string;
  dataAnalystTakeaway: string;
  paperUrl: string;
}

export const AI_PAPER_DIGESTS: AIPaperDigest[] = [
  {
    id: 'paper_1',
    title: 'Attention Is All You Need',
    authors: 'Vaswani et al. (Google Brain & Google Research)',
    year: 2017,
    significance: 'Invented the Transformer architecture that completely replaced Recurrent Neural Networks (RNNs/LSTMs) and gave birth to BERT, GPT, Claude, and Gemini.',
    coreInsight: 'Recurrence and convolutions are unnecessary. Self-attention mechanisms alone can model global dependencies across sequences in parallel with $O(1)$ sequential operations.',
    dataAnalystTakeaway: 'Self-attention calculates pairwise affinity between all tokens in a matrix multiplication. Think of it as an all-to-all correlation matrix where weights are learned dynamically.',
    paperUrl: 'https://arxiv.org/abs/1706.03762'
  },
  {
    id: 'paper_2',
    title: 'LoRA: Low-Rank Adaptation of Large Language Models',
    authors: 'Hu et al. (Microsoft)',
    year: 2021,
    significance: 'Made LLM fine-tuning accessible by freezing pre-trained model weights and injecting small trainable low-rank decomposition matrices $W + \\Delta W = W + BA$.',
    coreInsight: 'Weight updates during adaptation have a low "intrinsic rank". By decomposing $\\Delta W_{d \\times k}$ into $B_{d \\times r} \\times A_{r \\times k}$ where $r \\ll \\min(d, k)$ (e.g. $r=8$ or $16$), trainable parameters decrease by 10,000x without loss of quality.',
    dataAnalystTakeaway: 'Similar to Principal Component Analysis (PCA) or Singular Value Decomposition (SVD), low-rank approximation captures the essential variance while discarding redundant degrees of freedom.',
    paperUrl: 'https://arxiv.org/abs/2106.09685'
  },
  {
    id: 'paper_3',
    title: 'FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness',
    authors: 'Dao et al. (Stanford / Hazy Research)',
    year: 2022,
    significance: 'Sped up transformer training and inference by 2-4x while reducing memory from $O(N^2)$ to $O(N)$ by optimizing GPU SRAM memory bandwidth.',
    coreInsight: 'Standard attention repeatedly writes intermediate $N \\times N$ attention matrices to slow GPU High-Bandwidth Memory (HBM). FlashAttention tiles the computation directly in ultra-fast on-chip SRAM cache using online softmax calculation.',
    dataAnalystTakeaway: 'Just like optimizing SQL queries to run in memory buffers rather than swapping to disk, FlashAttention minimizes GPU memory I/O bottlenecks.',
    paperUrl: 'https://arxiv.org/abs/2205.14135'
  },
  {
    id: 'paper_4',
    title: 'Direct Preference Optimization (DPO): Your Language Model is Secretly a Reward Model',
    authors: 'Rafailov et al. (Stanford)',
    year: 2023,
    significance: 'Replaced complex, unstable RLHF (PPO) reinforcement learning pipelines with a direct closed-form binary cross-entropy loss function on preference pairs.',
    coreInsight: 'The reward model in RLHF can be derived analytically from the optimal policy. This allows direct optimization on human preference dataset $(x, y_w, y_l)$ with simple supervised loss.',
    dataAnalystTakeaway: 'DPO translates reinforcement learning into standard logistic regression / cross-entropy on pairwise comparisons (e.g. A/B testing wins).',
    paperUrl: 'https://arxiv.org/abs/2305.18290'
  }
];
