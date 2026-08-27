import { VideoTutorial } from '../types';

export const CURATED_VIDEO_TUTORIALS: VideoTutorial[] = [
  {
    id: 'tut_da_bridge_py',
    title: 'Python & NumPy Vectorization for SQL / Data Analysts',
    stageId: 'stage_0',
    topicId: 'da_bridge_1',
    instructor: 'NexusAI Principal Architect',
    instructorRole: 'Staff AI Infrastructure Architect (ex-DeepMind)',
    durationMinutes: 45,
    youtubeId: '8J5nyoxX8i4', // Clean PyTorch / NumPy vectorization fundamentals
    level: 'Foundational',
    category: 'The Analyst Bridge',
    summary: 'A step-by-step masterclass translating familiar SQL queries (GROUP BY, JOIN, WHERE) and Pandas DataFrames into N-dimensional NumPy/PyTorch tensors, SIMD broadcasting, and GPU CUDA memory layouts.',
    analystBridgeSummary: 'In SQL, relational tables are 2D rows with B-Tree indexes. In AI Engineering, data is represented as continuous n-dimensional embedding vectors where similarity is measured via dot-products and hyperplane projections.',
    keyTimestamps: [
      { timestamp: '00:00', title: 'Why Data Analysts Have an Unfair Advantage', summary: 'Understanding tabular distributions, loss functions, and dataset curation intuition.' },
      { timestamp: '08:15', title: 'Replacing SQL JOINs with Vector Dot-Products', summary: 'How matrix multiplication $Q \\cdot D^T$ computes all-pairs semantic similarity in parallel.' },
      { timestamp: '18:30', title: 'The Cost of Python Loops vs SIMD Broadcasting', summary: 'Benchmarking Pandas iterrows against vectorized PyTorch operations on 10M rows.' },
      { timestamp: '31:45', title: 'Cosine Similarity vs Euclidean Distance', summary: 'Unit L2 normalization ($||v||=1$) and why angle matters more than magnitude in high-dimensional text.' },
      { timestamp: '40:10', title: 'Writing Your First Vector Top-K Index in 20 Lines', summary: 'Implementing exact cosine search with NumPy argsort.' }
    ],
    codeWalkthrough: {
      title: 'Vectorized Top-K Cosine Similarity Search Engine',
      language: 'python',
      code: `import numpy as np

def build_vector_search_index(doc_embeddings: np.ndarray):
    """
    Normalizes document vectors to unit length so dot product equals cosine similarity.
    doc_embeddings shape: [N_docs, Embedding_Dim]
    """
    norms = np.linalg.norm(doc_embeddings, axis=1, keepdims=True)
    # Avoid division by zero with epsilon
    normalized_docs = doc_embeddings / (norms + 1e-9)
    return normalized_docs

def search_top_k(query_vec: np.ndarray, index: np.ndarray, k: int = 5):
    """
    Computes top-k semantic search in O(1) vectorized matrix multiplication.
    """
    q_norm = query_vec / (np.linalg.norm(query_vec) + 1e-9)
    # Batch dot product across all documents simultaneously
    similarity_scores = np.dot(index, q_norm)
    # Get top k indices sorted in descending order
    top_indices = np.argsort(similarity_scores)[::-1][:k]
    return top_indices, similarity_scores[top_indices]

# Simulation: 10,000 documents with 768-dimensional embeddings
N_docs, Dim = 10000, 768
doc_matrix = np.random.randn(N_docs, Dim).astype(np.float32)
query = np.random.randn(Dim).astype(np.float32)

index = build_vector_search_index(doc_matrix)
top_ids, scores = search_top_k(query, index, k=3)
print(f"Top matches: {top_ids} with scores: {scores.round(4)}")`,
      explanation: 'Notice how we avoided looping through the 10,000 documents. Matrix multiplication on modern CPUs/GPUs utilizes AVX-512 and CUDA tensor cores to compute all 10,000 dot products in under 0.2 milliseconds!'
    },
    takeaways: [
      'Always normalize embedding vectors to unit length ($||v||=1$) during index ingestion.',
      'Vectorized batch dot products ($Q \\cdot D^T$) are 100x to 1000x faster than pure Python loops.',
      'Tabular features become dense vector embeddings that preserve semantic distance in high dimensions.'
    ],
    xpReward: 200
  },
  {
    id: 'tut_autograd_micrograd',
    title: 'Building Autograd & Neural Networks from Scratch (The Backprop Math)',
    stageId: 'stage_1',
    topicId: 'math_tensors_1',
    instructor: 'Andrej Karpathy & NexusAI Masterclass',
    instructorRole: 'Founding Member OpenAI / ex-Director of AI Tesla',
    durationMinutes: 120,
    youtubeId: 'VMj-3S1tku0', // Karpathy's iconic micrograd & backprop tutorial
    level: 'Intermediate',
    category: 'Mathematics & Neural Mechanics',
    summary: 'Deconstruct neural network training from first principles. Build an Autograd engine (scalar-level reverse-mode automatic differentiation) and understand the Chain Rule, Gradient Descent, and Loss Surfaces.',
    analystBridgeSummary: 'In analytics, you calculate summary statistics (e.g. variance, regression slope $\\beta = (X^TX)^{-1}X^TY$). In deep learning, you use the Chain Rule $\\frac{\\partial L}{\\partial w} = \\frac{\\partial L}{\\partial y} \\cdot \\frac{\\partial y}{\\partial w}$ to compute gradients for millions of parameters simultaneously.',
    keyTimestamps: [
      { timestamp: '00:00', title: 'The Derivative: What Happens When We Bump an Input?', summary: 'Intuitive definition of limits and rate of change.' },
      { timestamp: '15:20', title: 'Building the Value Class & Computational Graph', summary: 'Tracking forward operations (addition, multiplication) and storing parent nodes.' },
      { timestamp: '38:40', title: 'Reverse-Mode Automatic Differentiation (Backprop)', summary: 'Recursively applying the multivariable chain rule from the scalar Loss backwards.' },
      { timestamp: '1:05:10', title: 'Implementing a 2-Layer Multi-Layer Perceptron (MLP)', summary: 'Defining neurons, activation functions (tanh, ReLU), and forward passes.' },
      { timestamp: '1:35:20', title: 'Training Loop: Zero Grad, Backward, Step', summary: 'Optimization via Stochastic Gradient Descent ($w = w - \\eta \\nabla w$).' }
    ],
    codeWalkthrough: {
      title: 'Minimal 30-Line Autograd Engine (Scalar Gradient Engine)',
      language: 'python',
      code: `class Value:
    """Stores a single scalar value and its gradient."""
    def __init__(self, data, _children=()):
        self.data = float(data)
        self.grad = 0.0
        self._backward = lambda: None
        self._prev = set(_children)

    def __add__(self, other):
        other = other if isinstance(other, Value) else Value(other)
        out = Value(self.data + other.data, (self, other))
        def _backward():
            self.grad += 1.0 * out.grad
            other.grad += 1.0 * out.grad
        out._backward = _backward
        return out

    def __mul__(self, other):
        other = other if isinstance(other, Value) else Value(other)
        out = Value(self.data * other.data, (self, other))
        def _backward():
            self.grad += other.data * out.grad
            other.grad += self.data * out.grad
        out._backward = _backward
        return out

    def backward(self):
        # Topological sort to compute gradients in reverse order
        topo = []
        visited = set()
        def build_topo(v):
            if v not in visited:
                visited.add(v)
                for child in v._prev:
                    build_topo(child)
                topo.append(v)
        build_topo(self)
        self.grad = 1.0
        for node in reversed(topo):
            node._backward()

# Example training step
x = Value(2.0)
w = Value(-3.0)
b = Value(10.0)
y = w * x + b # y = (-3 * 2) + 10 = 4.0
y.backward()
print(f"dy/dw = {w.grad}") # Expect 2.0 (the value of x)
print(f"dy/dx = {x.grad}") # Expect -3.0 (the value of w)`,
      explanation: 'This 30-line class encapsulates the exact core of PyTorch torch.Tensor and TensorFlow autodiff! Every deep learning model, from ResNets to GPT-4, relies on this computational graph traversal.'
    },
    takeaways: [
      'Gradients tell us the direction of steepest ascent on the Loss surface; we step in the negative gradient direction.',
      'The backward pass traverses the computational DAG in reverse topological order.',
      'Always zero out gradients before each optimization step to prevent gradient accumulation across batches.'
    ],
    xpReward: 300
  },
  {
    id: 'tut_transformers_attention',
    title: 'Scaled Dot-Product & Multi-Head Attention Explained Mathematically',
    stageId: 'stage_2',
    topicId: 'transformers_1',
    instructor: 'Umar Jamil & Stanford CS224N',
    instructorRole: 'AI Research Engineer & Educator',
    durationMinutes: 65,
    youtubeId: 'kCc8FmEb1nY', // Umar Jamil's definitive Attention & Transformer coding masterclass
    level: 'Advanced',
    category: 'Transformers & LLM Architectures',
    summary: 'An exhaustive, mathematical, and visual deconstruction of the Attention mechanism from "Attention Is All You Need". Learn Queries, Keys, Values, Scaled Softmax, Causal Masking, and KV-Cache mechanics.',
    analystBridgeSummary: 'Think of Attention as a "Fuzzy Probabilistic Hash Map JOIN". The Query $Q$ is your lookup key, the Key $K$ is the database index, and the Value $V$ is the row payload. The Softmax produces a weighted distribution over all rows.',
    keyTimestamps: [
      { timestamp: '00:00', title: 'Why Recurrent Neural Networks (RNNs) Failed to Scale', summary: 'Sequential bottleneck $O(T)$ vs Transformers parallel execution $O(1)$.' },
      { timestamp: '12:30', title: 'The Query, Key, and Value ($Q, K, V$) Mental Model', summary: 'Linear projections from token embeddings into semantic subspace.' },
      { timestamp: '24:15', title: 'The $\\sqrt{d_k}$ Scaling Factor Explained', summary: 'Why dot products blow up in high dimensions and push Softmax into vanishing gradients.' },
      { timestamp: '38:00', title: 'Causal Masking for Autoregressive Decoder Models (GPT)', summary: 'Using $-\\infty$ upper-triangular masks to prevent seeing future tokens.' },
      { timestamp: '52:10', title: 'Multi-Head Attention: Subspace Feature Diversification', summary: 'Splitting $d_{model}$ into $h$ parallel heads for syntactic and semantic relationships.' }
    ],
    codeWalkthrough: {
      title: 'Scaled Dot-Product Attention in Pure PyTorch',
      language: 'python',
      code: `import torch
import torch.nn.functional as F

def scaled_dot_product_attention(Q: torch.Tensor, K: torch.Tensor, V: torch.Tensor, mask: torch.Tensor = None):
    """
    Q: [Batch, Heads, Seq_Len, Head_Dim]
    K: [Batch, Heads, Seq_Len, Head_Dim]
    V: [Batch, Heads, Seq_Len, Head_Dim]
    Formula: Softmax( (Q @ K^T) / sqrt(d_k) + Mask ) @ V
    """
    d_k = Q.size(-1)
    
    # 1. Compute raw attention logits via batched matrix multiplication
    # Transpose last two dimensions of K: [Batch, Heads, Head_Dim, Seq_Len]
    scores = torch.matmul(Q, K.transpose(-2, -1)) / (d_k ** 0.5)
    
    # 2. Apply causal mask if provided (replace upper triangle with -inf)
    if mask is not None:
        scores = scores.masked_fill(mask == 0, -1e9)
        
    # 3. Softmax across the last sequence dimension to get attention weights (sum = 1.0)
    attn_weights = F.softmax(scores, dim=-1)
    
    # 4. Multiply attention weights by Value vectors
    output = torch.matmul(attn_weights, V)
    return output, attn_weights

# Demonstration:
B, H, S, D = 2, 4, 8, 64 # 2 batches, 4 heads, 8 tokens, 64 dim per head
q = torch.randn(B, H, S, D)
k = torch.randn(B, H, S, D)
v = torch.randn(B, H, S, D)

# Causal triangular mask (lower triangle of 1s)
causal_mask = torch.tril(torch.ones(S, S)).unsqueeze(0).unsqueeze(0)

out, weights = scaled_dot_product_attention(q, k, v, mask=causal_mask)
print("Output Shape:", out.shape) # torch.Size([2, 4, 8, 64])
print("Attention Weights Shape:", weights.shape) # torch.Size([2, 4, 8, 8])`,
      explanation: 'The attention weights matrix shows how much attention token $i$ pays to token $j$. The causal lower-triangular mask ensures token 4 can only attend to tokens 1, 2, 3, and 4, preventing data leakage during generation!'
    },
    takeaways: [
      'The $\\sqrt{d_k}$ divisor prevents the dot product from having large variances that saturate softmax gradients.',
      'Multi-Head Attention allows the model to attend to information from different representation subspaces simultaneously.',
      'The KV-Cache saves previous Key and Value tensors during generation, dropping inference from $O(N^2)$ to $O(N)$!'
    ],
    xpReward: 350
  },
  {
    id: 'tut_hybrid_rag_qdrant',
    title: 'Enterprise Production RAG: Hybrid Search (HNSW + BM25) & Re-ranking',
    stageId: 'stage_3',
    topicId: 'vector_db_1',
    instructor: 'DeepLearning.AI & Qdrant Engineering',
    instructorRole: 'Principal Search Systems Architect',
    durationMinutes: 50,
    youtubeId: 'TRjq7t2Ms5I', // Hybrid Search & RAG Architecture
    level: 'Advanced',
    category: 'Enterprise RAG & Search Systems',
    summary: 'Master enterprise-grade Retrieval-Augmented Generation. Learn why naive vector search fails in 30% of production edge cases, and implement Hybrid Search (Dense HNSW + Sparse BM25) with Reciprocal Rank Fusion and Cross-Encoder re-rankers.',
    analystBridgeSummary: 'Naive vector search is like searching a database with ONLY fuzzy embeddings—it fails on exact part numbers (e.g. "SKU-99421A"). Hybrid search combines SQL exact lexical matching (BM25) with semantic vector clustering (HNSW) into a single unified rank score.',
    keyTimestamps: [
      { timestamp: '00:00', title: 'The Fallacy of Naive Vector RAG in Enterprise Systems', summary: 'Loss of keyword precision, out-of-vocabulary terms, and chunking truncation errors.' },
      { timestamp: '10:45', title: 'Dense Embeddings (Semantic) vs Sparse Vectors (BM25 Lexical)', summary: 'Understanding when dense semantic search wins vs when sparse keyword matching wins.' },
      { timestamp: '22:15', title: 'Reciprocal Rank Fusion (RRF) Algorithm Implementation', summary: 'Merging rank scores $RRF(d) = \\sum \\frac{1}{60 + r_i(d)}$ without score calibration issues.' },
      { timestamp: '34:50', title: 'Cross-Encoder Re-Ranking: The Quality Multiplier', summary: 'Passing top 20 candidate passages to a Cross-Encoder for precise pair-wise scoring.' },
      { timestamp: '44:00', title: 'Evaluating RAG: Context Precision, Recall, and Faithfulness (RAGAS)', summary: 'Automating continuous quality metrics in CI/CD pipelines.' }
    ],
    codeWalkthrough: {
      title: 'Reciprocal Rank Fusion (RRF) Hybrid Search Combiner',
      language: 'python',
      code: `from typing import List, Dict

def reciprocal_rank_fusion(
    dense_results: List[str], 
    sparse_results: List[str], 
    k: int = 60
) -> List[Dict[str, float]]:
    """
    Combines dense vector search results and sparse BM25 search results using RRF.
    Formula: Score(doc) = 1 / (k + rank_dense) + 1 / (k + rank_sparse)
    """
    scores: Dict[str, float] = {}
    
    # Process dense ranked list
    for rank, doc_id in enumerate(dense_results, start=1):
        if doc_id not in scores:
            scores[doc_id] = 0.0
        scores[doc_id] += 1.0 / (k + rank)
        
    # Process sparse ranked list
    for rank, doc_id in enumerate(sparse_results, start=1):
        if doc_id not in scores:
            scores[doc_id] = 0.0
        scores[doc_id] += 1.0 / (k + rank)
        
    # Sort merged documents by fused score in descending order
    sorted_docs = sorted(scores.items(), key=lambda x: x[1], reverse=True)
    return [{"doc_id": doc_id, "rrf_score": score} for doc_id, score in sorted_docs]

# Example execution:
dense_hits = ["doc_42", "doc_10", "doc_88", "doc_105"] # Semantically close
sparse_hits = ["doc_88", "doc_42", "doc_999", "doc_10"] # Exact keyword match

hybrid_ranked = reciprocal_rank_fusion(dense_hits, sparse_hits)
for item in hybrid_ranked[:3]:
    print(f"Document {item['doc_id']} -> Fused RRF Score: {item['rrf_score']:.5f}")`,
      explanation: 'RRF solves the biggest challenge in search engineering: combining two completely different score distributions (cosine similarity from -1 to 1 and BM25 scores from 0 to 50) without needing arbitrary manual tuning weights!'
    },
    takeaways: [
      'Hybrid search (Dense + Sparse) is standard in enterprise production because dense embeddings struggle with exact alphanumeric codes.',
      'Reciprocal Rank Fusion (RRF) provides robust, uncalibrated rank merging with minimal hyperparameter tuning.',
      'Always place a lightweight Cross-Encoder re-ranker over the top 20 candidate chunks before feeding them to the LLM prompt.'
    ],
    xpReward: 350
  },
  {
    id: 'tut_vllm_inference_scaling',
    title: 'High-Throughput LLM Serving with vLLM, PagedAttention & AWQ Quantization',
    stageId: 'stage_5',
    topicId: 'serving_1',
    instructor: 'UC Berkeley SkyLab & NexusAI',
    instructorRole: 'Principal Inference Systems Engineer',
    durationMinutes: 55,
    youtubeId: '5ZlavRFKB8o', // vLLM & PagedAttention System Design
    level: 'Staff',
    category: 'Inference Engines & LLMOps',
    summary: 'Learn how to serve LLMs in production at 20x higher throughput. Master PagedAttention virtual memory mapping, dynamic continuous batching, Time-To-First-Token (TTFT) optimization, and AWQ/FP8 quantization.',
    analystBridgeSummary: 'Standard serving is like running single-threaded batch SQL queries where GPU memory is fragmented and wasted by up to 80%. PagedAttention applies virtual memory OS paging to the KV-Cache, enabling 100+ concurrent requests on a single GPU.',
    keyTimestamps: [
      { timestamp: '00:00', title: 'The LLM Inference Bottleneck: Memory Bandwidth vs Compute', summary: 'Prefill phase (Compute-bound) vs Decode phase (Memory bandwidth-bound).' },
      { timestamp: '12:20', title: 'Why Traditional Static Batching Fails in Production', summary: 'Padding waste and request duration variance.' },
      { timestamp: '22:40', title: 'PagedAttention: Virtual Memory OS Architecture for GPU VRAM', summary: 'Allocating KV-cache in non-contiguous physical blocks with page tables.' },
      { timestamp: '37:15', title: 'Quantization: FP16 to INT8 and AWQ 4-bit Weight-Only', summary: 'Halving memory footprint while maintaining 99.2% perplexity accuracy.' },
      { timestamp: '48:30', title: 'Benchmarking Throughput (Tokens/sec) & P99 Latency', summary: 'Configuring max_num_seqs, gpu_memory_utilization, and Tensor Parallelism.' }
    ],
    codeWalkthrough: {
      title: 'Production vLLM Async Inference Engine Server',
      language: 'python',
      code: `from vllm import AsyncLLMEngine, AsyncEngineArgs, SamplingParams
import asyncio

async def initialize_high_throughput_engine():
    """
    Configures vLLM with PagedAttention, continuous batching, and AWQ quantization.
    """
    engine_args = AsyncEngineArgs(
        model="meta-llama/Meta-Llama-3-8B-Instruct",
        quantization="awq", # 4-bit weights, reduces VRAM from 16GB to ~5.5GB
        gpu_memory_utilization=0.90, # Reserve 90% of GPU VRAM for KV-cache pages
        max_num_seqs=256, # Support up to 256 concurrent streaming sessions
        max_model_len=8192,
        tensor_parallel_size=1, # Scale to 2/4/8 across multiple GPUs
        trust_remote_code=True
    )
    engine = AsyncLLMEngine.from_engine_args(engine_args)
    return engine

async def stream_completion(engine: AsyncLLMEngine, prompt: str, request_id: str):
    sampling_params = SamplingParams(
        temperature=0.7,
        top_p=0.95,
        max_tokens=512,
        stop=["<|eot_id|>"]
    )
    
    results_generator = engine.generate(prompt, sampling_params, request_id)
    async for request_output in results_generator:
        # Stream delta tokens to client via Server-Sent Events (SSE)
        yield request_output.outputs[0].text

print("vLLM Production Engine Architecture Configured.")`,
      explanation: 'With PagedAttention and continuous batching, the GPU never waits for the slowest request in a batch. As soon as one sequence finishes, its memory pages are instantly released and reallocated to incoming requests!'
    },
    takeaways: [
      'PagedAttention reduces KV-cache memory waste from over 70% to under 4%, drastically increasing batch throughput.',
      'AWQ 4-bit quantization allows running a 70B parameter model on a single 48GB GPU (or 2x 24GB GPUs) with negligible quality loss.',
      'Monitor TTFT (Time to First Token) and TPOT (Time per Output Token) as distinct SLAs in production.'
    ],
    xpReward: 400
  },
  {
    id: 'tut_autonomous_agents_react',
    title: 'Autonomous Multi-Agent Systems: ReAct Loops, Tool Use & Reflection',
    stageId: 'stage_4',
    topicId: 'agents_1',
    instructor: 'Harrison Chase & NexusAI Systems',
    instructorRole: 'Co-founder LangChain & Agent Systems Architect',
    durationMinutes: 60,
    youtubeId: 'bZQun8Y4L2A', // Autonomous AI Agents & LangGraph
    level: 'Advanced',
    category: 'Agentic Architectures & Reasoning',
    summary: 'Build production-ready autonomous agent loops from scratch. Implement the ReAct (Reason + Act) paradigm, dynamic tool schema execution, structured JSON output validation, and stateful memory with self-correction reflection.',
    analystBridgeSummary: 'In traditional analytics, you write ETL scripts with rigid IF/THEN branches. In Autonomous Agent systems, the LLM acts as the central cognitive controller, dynamically deciding which tools to call, analyzing the intermediate data output, and self-correcting on SQL/Python errors.',
    keyTimestamps: [
      { timestamp: '00:00', title: 'Why Single-Prompt LLMs Fail at Multi-Step Reasoning', summary: 'The need for dynamic observation feedback loops.' },
      { timestamp: '12:15', title: 'The ReAct Framework (Thought, Action, Action Input, Observation)', summary: 'Interleaving reasoning traces and domain-specific tool execution.' },
      { timestamp: '25:30', title: 'Building a Dynamic Tool Registry with Pydantic Schema Validation', summary: 'Safe sandboxed execution of SQL query engines and Python calculators.' },
      { timestamp: '39:00', title: 'Self-Correction & Reflection on Execution Errors', summary: 'How agents recover when a SQL query returns a syntax error or missing table.' },
      { timestamp: '51:20', title: 'Multi-Agent Swarm Collaboration: Supervisor & Specialized Workers', summary: 'Delegating tasks between a Planner, a Coder, and a Verifier agent.' }
    ],
    codeWalkthrough: {
      title: 'Lightweight Autonomous ReAct Agent Loop from Scratch',
      language: 'python',
      code: `import json
from typing import Callable, Dict, Any

class AgentTool:
    def __init__(self, name: str, func: Callable, description: str):
        self.name = name
        self.func = func
        self.description = description

class ReActAgent:
    def __init__(self, tools: Dict[str, AgentTool]):
        self.tools = tools
        self.memory = []

    def execute_tool(self, tool_name: str, tool_args: Dict[str, Any]) -> str:
        if tool_name not in self.tools:
            return f"Error: Tool '{tool_name}' does not exist. Available tools: {list(self.tools.keys())}"
        try:
            result = self.tools[tool_name].func(**tool_args)
            return json.dumps(result)
        except Exception as e:
            return f"Tool Execution Error: {str(e)}. Please correct your arguments and retry."

    def step(self, user_goal: str, simulated_llm_response: Dict[str, Any]):
        """
        Simulates an agent ReAct cycle:
        1. Thought: Reason about current state
        2. Action: Call tool if needed
        3. Observation: Feed tool result back to agent
        4. Final Answer: Emit output when task is solved
        """
        thought = simulated_llm_response.get("thought", "")
        action = simulated_llm_response.get("action", "")
        action_input = simulated_llm_response.get("action_input", {})
        
        print(f"🤔 Thought: {thought}")
        if action == "finish":
            print(f"✅ Final Answer: {action_input.get('answer')}")
            return action_input.get('answer')
        
        print(f"🛠️ Calling Action: {action} with {action_input}")
        observation = self.execute_tool(action, action_input)
        print(f"👀 Observation: {observation}")
        return observation

# Tools setup: SQL analytics tool
def execute_sql_query(query: str):
    # Simulated database engine
    if "users" in query.lower():
        return {"row_count": 1420, "average_churn_rate": 0.042}
    return {"error": "Table not found"}

sql_tool = AgentTool("sql_query", execute_sql_query, "Executes SQL query on analytics warehouse")
agent = ReActAgent(tools={"sql_query": sql_tool})

# Run one step
agent.step(
    user_goal="Find the average churn rate of our users",
    simulated_llm_response={
        "thought": "I need to query the users table to retrieve the average churn rate metric.",
        "action": "sql_query",
        "action_input": {"query": "SELECT AVG(churn_score) FROM users;"}
    }
)`,
      explanation: 'The agent pattern decouples reasoning from action. By providing feedback loops (Observations), the agent can iteratively explore schemas, debug broken queries, and formulate accurate answers without human intervention.'
    },
    takeaways: [
      'The ReAct pattern drastically reduces hallucinations by grounding agent thoughts in real-time tool observations.',
      'Always implement strict JSON schema validation for tool parameters to prevent syntax runtime exceptions.',
      'Multi-agent architectures separate responsibilities (e.g. Planning vs. Execution vs. Verification) for high reliability.'
    ],
    xpReward: 350
  }
];
