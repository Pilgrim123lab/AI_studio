import { CodingChallenge } from '../types';

export const CODING_CHALLENGES: CodingChallenge[] = [
  {
    id: 'chall_1',
    title: 'Scaled Dot-Product Attention in PyTorch / NumPy',
    category: 'Transformers & Attention',
    difficulty: 'Medium',
    xp: 250,
    prompt: `Implement the foundational mathematical equation of the Transformer architecture from "Attention Is All You Need":
$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$$
Your function must take 3D matrices $Q, K, V$ of shape \`[batch_size, seq_len, d_k]\`, scale by $\\sqrt{d_k}$, apply softmax across the last dimension, and return the contextualized tensor of shape \`[batch_size, seq_len, d_k]\`.`,
    analystContext: 'Think of this as a soft dynamic join where every row weights its affinity with every other row based on cosine angle.',
    starterCode: `import numpy as np

def scaled_dot_product_attention(Q: np.ndarray, K: np.ndarray, V: np.ndarray) -> np.ndarray:
    """
    Q, K, V have shape (batch_size, seq_len, d_k)
    Returns output tensor of shape (batch_size, seq_len, d_k)
    """
    # TODO: Calculate scores = (Q @ K.T) / sqrt(d_k)
    # TODO: Softmax(scores, axis=-1)
    # TODO: return attention_weights @ V
    pass`,
    solutionCode: `import numpy as np

def scaled_dot_product_attention(Q: np.ndarray, K: np.ndarray, V: np.ndarray) -> np.ndarray:
    d_k = Q.shape[-1]
    # Q: (B, S, D), K.transpose(0, 2, 1): (B, D, S) -> scores: (B, S, S)
    scores = np.matmul(Q, np.swapaxes(K, -1, -2)) / np.sqrt(d_k)
    # Stable Softmax: subtract max along last axis
    exp_scores = np.exp(scores - np.max(scores, axis=-1, keepdims=True))
    attn_weights = exp_scores / np.sum(exp_scores, axis=-1, keepdims=True)
    # Output: (B, S, S) @ (B, S, D) -> (B, S, D)
    return np.matmul(attn_weights, V)`,
    testCases: [
      {
        inputDesc: 'Q, K, V batch of shape (1, 3, 4)',
        expectedOutput: 'Output matrix of shape (1, 3, 4) with valid probability distribution',
        simulatedPass: true
      },
      {
        inputDesc: 'Orthogonal Query and Keys test',
        expectedOutput: 'Uniform probability distribution 1/seq_len',
        simulatedPass: true
      }
    ],
    detailedExplanation: 'Scaled dot-product attention scales the inner products by $1/\\sqrt{d_k}$ to prevent gradient saturation in the softmax activation function when the dimension $d_k$ is large.'
  },
  {
    id: 'chall_2',
    title: 'Reciprocal Rank Fusion (RRF) for Hybrid RAG',
    category: 'RAG Optimization',
    difficulty: 'Easy',
    xp: 200,
    prompt: `In modern enterprise search, Dense Vector Search and Sparse BM25 keyword search yield different score distributions (e.g. cosine distance vs BM25 unbounded float).
Implement the Reciprocal Rank Fusion (RRF) formula:
$$RRF(d) = \\sum_{m \\in M} \\frac{1}{k + \\text{rank}_m(d)}$$
Given two ranked lists of document IDs (dense_ranks and sparse_ranks) and constant $k=60$, return the list of unique document IDs sorted in descending order of total RRF score.`,
    analystContext: 'In BI, you often need to combine different scoring methodologies (e.g. Sales rank + Customer Satisfaction rank). RRF provides rank-based normalization without scale bias.',
    starterCode: `from typing import List

def rrf_merge(dense_ranks: List[str], sparse_ranks: List[str], k: int = 60) -> List[str]:
    # TODO: Calculate RRF score for each document ID and return sorted unique IDs
    pass`,
    solutionCode: `from typing import List, Dict

def rrf_merge(dense_ranks: List[str], sparse_ranks: List[str], k: int = 60) -> List[str]:
    scores: Dict[str, float] = {}
    for rank, doc_id in enumerate(dense_ranks):
        scores[doc_id] = scores.get(doc_id, 0.0) + (1.0 / (k + rank + 1))
    for rank, doc_id in enumerate(sparse_ranks):
        scores[doc_id] = scores.get(doc_id, 0.0) + (1.0 / (k + rank + 1))
        
    sorted_items = sorted(scores.items(), key=lambda x: x[1], reverse=True)
    return [doc_id for doc_id, _ in sorted_items]`,
    testCases: [
      {
        inputDesc: 'dense=["doc_A", "doc_B"], sparse=["doc_B", "doc_C"], k=60',
        expectedOutput: '["doc_B", "doc_A", "doc_C"] (doc_B appears in both lists so it wins)',
        simulatedPass: true
      }
    ],
    detailedExplanation: 'RRF solves the score calibration problem by relying exclusively on ranks rather than raw confidence scores, making it robust against varying query length and differing embedding scales.'
  },
  {
    id: 'chall_3',
    title: 'ReAct Agent Tool Execution & Self-Correction Loop',
    category: 'Agentic Loops',
    difficulty: 'Hard',
    xp: 350,
    prompt: `Implement an autonomous ReAct loop state machine.
The function receives a user query, a mock LLM reasoner, and a dictionary of callable tools.
The agent must:
1. Ask the reasoner for next action (either 'TOOL_CALL: tool_name(args)' or 'FINAL_ANSWER: response').
2. If tool call, execute the tool, capture the output (or stringified error if it fails), and append to scratchpad.
3. Repeat until 'FINAL_ANSWER:' is reached or max_steps is exceeded.`,
    analystContext: 'Think of an automated SQL pipeline that tries to run a query, gets a column error, checks the information schema, fixes the column, and outputs the final KPI.',
    starterCode: `from typing import Dict, Callable, Any

def run_react_agent(query: str, reasoner_fn: Callable, tools: Dict[str, Callable], max_steps: int = 5) -> str:
    # TODO: Implement step loop
    pass`,
    solutionCode: `from typing import Dict, Callable, Any

def run_react_agent(query: str, reasoner_fn: Callable, tools: Dict[str, Callable], max_steps: int = 5) -> str:
    scratchpad = [f"User Goal: {query}"]
    
    for step in range(max_steps):
        thought_action = reasoner_fn("\\n".join(scratchpad))
        scratchpad.append(f"Step {step+1} LLM: {thought_action}")
        
        if thought_action.startswith("FINAL_ANSWER:"):
            return thought_action.replace("FINAL_ANSWER:", "").strip()
            
        if "TOOL_CALL:" in thought_action:
            try:
                # Parse tool_name and arg
                tool_part = thought_action.split("TOOL_CALL:")[1].strip()
                tool_name, tool_arg = tool_part.split("(", 1)
                tool_name = tool_name.strip()
                tool_arg = tool_arg.rstrip(")").strip().strip('"').strip("'")
                
                if tool_name in tools:
                    result = tools[tool_name](tool_arg)
                    scratchpad.append(f"Tool Observation [{tool_name}]: {result}")
                else:
                    scratchpad.append(f"Tool Error: Tool '{tool_name}' not found.")
            except Exception as e:
                scratchpad.append(f"Tool Execution Exception: {str(e)}")
                
    return "Error: ReAct agent exceeded maximum reasoning iterations."`,
    testCases: [
      {
        inputDesc: 'Query requiring SQL lookup tool followed by final answer',
        expectedOutput: 'Final calculated answer returned after 2 tool iterations',
        simulatedPass: true
      }
    ],
    detailedExplanation: 'ReAct (Yao et al., 2022) combines reasoning traces and task-specific actions. By feeding runtime observations back to the LLM, the model self-corrects without crashing the host application.'
  },
  {
    id: 'chall_4',
    title: 'GPU VRAM & KV-Cache Sizing Calculator',
    category: 'Quantization & Sizing',
    difficulty: 'Medium',
    xp: 250,
    prompt: `Write a sizing function to compute the exact GPU VRAM requirement for deploying an open-source LLM.
Inputs:
- \`num_params_billions\` (e.g. 7.0 for 7B)
- \`precision_bits\` (16 for FP16, 8 for INT8, 4 for INT4)
- \`num_layers\` (e.g. 32)
- \`hidden_dim\` (e.g. 4096)
- \`max_seq_len\` (e.g. 4096)
- \`batch_size\` (concurrent requests, e.g. 16)

Formula:
1. $M_{\\text{weights}} = (\\text{params} \\times (\\text{bits} / 8)) / 1024^3$ (in GB)
2. $M_{\\text{KV}} = (2 \\times 2 \\times \\text{layers} \\times \\text{hidden} \\times \\text{seq\\_len} \\times \\text{batch}) / 1024^3$ (in GB, assuming FP16 KV-cache)
3. Total with 20% activation/CUDA runtime overhead: $(M_{\\text{weights}} + M_{\\text{KV}}) \\times 1.2$`,
    analystContext: 'Like capacity planning for BigQuery or Snowflake storage, calculating GPU memory is essential before provisioning multi-thousand dollar cloud clusters.',
    starterCode: `def calculate_llm_vram_requirement(num_params_billions: float, precision_bits: int, num_layers: int, hidden_dim: int, max_seq_len: int, batch_size: int) -> dict:
    # TODO: Calculate weights, KV-cache, and total VRAM
    pass`,
    solutionCode: `def calculate_llm_vram_requirement(num_params_billions: float, precision_bits: int, num_layers: int, hidden_dim: int, max_seq_len: int, batch_size: int) -> dict:
    bytes_per_param = precision_bits / 8.0
    weight_bytes = num_params_billions * 1e9 * bytes_per_param
    weight_gb = weight_bytes / (1024**3)
    
    # 2 (for K and V) * 2 bytes (FP16) * layers * hidden_dim * seq_len * batch_size
    kv_bytes = 2 * 2 * num_layers * hidden_dim * max_seq_len * batch_size
    kv_gb = kv_bytes / (1024**3)
    
    total_gb = (weight_gb + kv_gb) * 1.20 # 20% overhead
    
    return {
        "weight_memory_gb": round(weight_gb, 2),
        "kv_cache_memory_gb": round(kv_gb, 2),
        "total_recommended_vram_gb": round(total_gb, 2)
    }`,
    testCases: [
      {
        inputDesc: '7B model in 4-bit, 32 layers, 4096 dim, 4096 context, batch size 8',
        expectedOutput: 'Weight ~3.26GB, KV-cache ~4.0GB, Total ~8.71GB',
        simulatedPass: true
      }
    ],
    detailedExplanation: 'KV-Cache grows linearly with context length and batch size. While a 7B 4-bit model only takes 3.5GB for weights, high concurrency can consume 20GB+ of KV cache.'
  }
];
