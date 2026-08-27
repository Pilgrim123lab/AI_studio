import { RoadmapStage } from '../types';

export const ROADMAP_STAGES: RoadmapStage[] = [
  {
    id: 'stage_0',
    stageNumber: 0,
    title: 'The Data Analyst Bridge',
    subtitle: 'Translating SQL, Pandas & BI into High-Performance AI Primitives',
    tagline: 'Leverage your existing data intuition to rapidly master AI core fundamentals.',
    iconName: 'GitMerge',
    description: 'As a Data Analyst, you already have world-class data intuition, SQL mastery, and understanding of business metrics. This stage converts those strengths into vectors, tensors, loss functions, and high-performance computational pipelines.',
    dataAnalystContext: 'You know `GROUP BY` and `JOIN`. In AI Engineering, you will turn relational rows into multi-dimensional embeddings, replace Pandas loops with vectorized tensor operations, and turn dashboard KPIs into optimization loss functions.',
    outcomes: [
      'Understand how Relational Databases map to Vector Databases & Inverted Indexes',
      'Migrate from imperative Pandas iterations to vectorized NumPy & PyTorch batch processing',
      'Translate Business Metrics (Churn, CTR) to ML Loss Functions (Cross-Entropy, MSE, Contrastive Loss)',
      'Set up a production-ready Python AI workspace with Virtual Environments, Poetry, and Type Hints'
    ],
    topics: [
      {
        id: 'da_bridge_1',
        stageId: 'stage_0',
        title: 'From SQL Tables to High-Dimensional Vector Spaces',
        shortDescription: 'How relational rows become semantic dense vector embeddings and similarity search spaces.',
        estimatedHours: 4,
        dataAnalystBridge: 'In SQL, you query with `WHERE user_id = 42` or `LIKE "%query%"`. In AI, you compute vector dot-products (`cosine_similarity(q, doc)`) across 1536-dimensional hyperplanes.',
        difficulty: 'Foundational',
        coreSkills: ['Dense Vector Embeddings', 'Cosine Similarity', 'Vector Dimension Math', 'Vector Indexing vs B-Trees'],
        lessonContent: {
          overview: 'Traditional analytics stores categorical & numerical features in tabular rows. AI Engineering converts structured and unstructured data (text, images, user behaviour) into vectors $v \\in \\mathbb{R}^d$ where semantic similarity equals geometric proximity.',
          keyConcepts: [
            {
              name: 'Embeddings as Dimensionality Projection',
              description: 'An embedding maps discrete tokens or entities to continuous vectors where similar items are close together.',
              codeSnippet: `import numpy as np\n\ndef cosine_similarity(a: np.ndarray, b: np.ndarray) -> float:\n    # Vector dot product normalized by Euclidean norms\n    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))\n\n# Simulating two text embeddings\nvec_query = np.array([0.23, 0.81, -0.45, 0.12])\nvec_doc = np.array([0.25, 0.79, -0.41, 0.15])\nsimilarity = cosine_similarity(vec_query, vec_doc)\nprint(f"Similarity Score: {similarity:.4f}") # Close to 1.0`
            },
            {
              name: 'SQL B-Tree vs Vector HNSW Indexing',
              description: 'SQL uses B-Trees for exact matching $O(\\log N)$. Vector search uses Approximate Nearest Neighbor (ANN) graphs like HNSW (Hierarchical Navigable Small World) for sub-millisecond semantic search over millions of vectors.',
            }
          ],
          deepDiveArticle: `### Why Data Analysts Transition Faster Than Pure Software Engineers\n\nData Analysts possess deep domain intuition for data distributions, missing values, outliers, and statistical distributions. When shifting to AI Engineering, you simply change your execution tool from SQL/BI engines to Tensors and Vector Indices.\n\nWhen an AI model generates an embedding, every concept (e.g. "Customer Churn Risk") is mapped to coordinates in a continuous vector space. Searching for similar customers is no longer a multi-column SQL query with 10 conditional JOINs—it becomes a single top-$k$ nearest-neighbor search.`,
          mathOrTheoryNote: 'Cosine Similarity: $\\text{Sim}(u, v) = \\frac{u \\cdot v}{\\|u\\| \\|v\\|} = \\frac{\\sum_{i=1}^n u_i v_i}{\\sqrt{\\sum_{i=1}^n u_i^2} \\sqrt{\\sum_{i=1}^n v_i^2}}$',
          bestPractices: [
            'Always normalize embeddings to unit length (L2 norm = 1) so dot product equals cosine similarity.',
            'Never compute pairwise distances in Python loops—use vectorized matrix multiplication ($Q \\cdot D^T$).'
          ],
          commonTraps: [
            'Using Euclidean distance on unnormalized embeddings with varying token counts.',
            'Assuming higher embedding dimensions always mean higher quality without testing retrieval latency.'
          ]
        },
        checkpointQuiz: [
          {
            question: 'If two unit-normalized embedding vectors are identical in direction, what is their dot product?',
            options: ['0.0', '1.0', '-1.0', 'Infinity'],
            correctIndex: 1,
            explanation: 'For unit vectors where ||u|| = ||v|| = 1, cosine similarity is exactly equal to the dot product, yielding 1.0 for identical vectors.'
          },
          {
            question: 'Why do Vector Databases use Approximate Nearest Neighbors (ANN) instead of exact brute-force search in production?',
            options: [
              'Exact search gives incorrect mathematical results',
              'Exact brute-force search is O(N) and does not scale to millions of high-dimensional vectors with sub-second latency',
              'ANN vectors require less RAM than raw vectors',
              'SQL databases cannot store numbers'
            ],
            correctIndex: 1,
            explanation: 'Brute-force pairwise distance search is O(N * D), which takes seconds or minutes on large datasets. ANN algorithms like HNSW provide O(log N) search speed.'
          }
        ],
        practicalExercises: [
          {
            title: 'Build a Vector Distance & Top-K Retrieval Function',
            instructions: 'Write a vectorized function in Python that takes a query embedding and a matrix of document embeddings, and returns the indices of the top-k most similar documents.',
            starterCode: `import numpy as np\n\ndef top_k_search(query_vec: np.ndarray, doc_matrix: np.ndarray, k: int = 3):\n    # TODO: Normalize vectors, compute cosine similarity, and return top-k indices\n    pass`,
            solutionCode: `import numpy as np\n\ndef top_k_search(query_vec: np.ndarray, doc_matrix: np.ndarray, k: int = 3):\n    # Normalize query\n    q_norm = query_vec / np.linalg.norm(query_vec)\n    # Normalize documents\n    d_norms = doc_matrix / np.linalg.norm(doc_matrix, axis=1, keepdims=True)\n    # Compute cosine similarities via matrix-vector product\n    sims = np.dot(d_norms, q_norm)\n    # Get top k indices in descending order\n    top_indices = np.argsort(sims)[::-1][:k]\n    return top_indices, sims[top_indices]`,
            hints: ['Use np.linalg.norm with keepdims=True', 'Use np.dot or @ operator for matrix multiplication', 'Use np.argsort()[::-1] for descending sort']
          }
        ],
        xpReward: 150
      },
      {
        id: 'da_bridge_2',
        stageId: 'stage_0',
        title: 'From Pandas Iterations to Vectorized Tensor Pipelines',
        shortDescription: 'Mastering multi-dimensional tensors, broadcasting rules, and GPU memory paradigms.',
        estimatedHours: 5,
        dataAnalystBridge: 'Pandas `df.apply()` is slow and single-threaded. AI Engineers work with N-dimensional Tensors ($B \\times S \\times D$) processed concurrently across thousands of GPU CUDA cores.',
        difficulty: 'Foundational',
        coreSkills: ['NumPy/PyTorch Tensor Shapes', 'Broadcasting Rules', 'Batch Dimension Mechanics', 'Memory Layout & Strides'],
        lessonContent: {
          overview: 'In Data Analysis, 2D tabular DataFrames are the standard. In AI Engineering, models consume multi-dimensional tensors: [Batch Size, Sequence Length, Hidden Dimension]. Understanding tensor shapes and broadcasting is mandatory.',
          keyConcepts: [
            {
              name: 'The 3D Batch Tensor Layout',
              description: 'NLP and LLMs process batches of text with shape [B, S, D]: Batch (number of sentences), Sequence Length (number of tokens), Hidden Dim (embedding size).',
              codeSnippet: `import torch\n\n# 4 sentences, 16 tokens each, 768-dim embeddings (BERT style)\nbatch_size = 4\nseq_len = 16\nhidden_dim = 768\n\ntensor = torch.randn(batch_size, seq_len, hidden_dim)\nprint("Tensor Shape:", tensor.shape) # torch.Size([4, 16, 768])\nprint("Total Parameters in Batch:", tensor.numel()) # 49,152 floats`
            },
            {
              name: 'Tensor Broadcasting Rules',
              description: 'Broadcasting allows arithmetic operations between tensors of different shapes without copying memory.',
            }
          ],
          deepDiveArticle: `### Why Python Loops Destroy AI Pipeline Performance\n\nWhen working in Pandas, analysts often use \`.apply(lambda row: ...)\`. In deep learning, doing this on 100,000 embeddings would take minutes. Vectorized tensor operations compiled with PyTorch C++ / CUDA kernels process the exact same operation in 2.3 milliseconds by saturating SIMD (Single Instruction Multiple Data) GPU execution registers.`,
          bestPractices: [
            'Always inspect tensor shapes using `tensor.shape` and `tensor.dtype` before performing matrix ops.',
            'Prefer `torch.matmul` or `@` over manual element-wise looping.'
          ],
          commonTraps: [
            'Using `view()` on non-contiguous tensors without calling `contiguous()` first.',
            'Accidentally creating implicit copies with Python lists instead of pre-allocating tensors.'
          ]
        },
        checkpointQuiz: [
          {
            question: 'What is the resulting shape when broadcasting a tensor of shape [4, 1, 768] with a tensor of shape [1, 16, 768]?',
            options: ['[4, 16, 768]', '[4, 17, 768]', '[4, 16, 1536]', 'Broadcasting fails with RuntimeError'],
            correctIndex: 0,
            explanation: 'Broadcasting expands dimensions of size 1 to match the other tensor: [4, 1, 768] and [1, 16, 768] broadcast to [4, 16, 768].'
          }
        ],
        practicalExercises: [
          {
            title: 'Implement Multi-Batch Normalization from Scratch',
            instructions: 'Write a function that calculates mean and standard deviation along the last dimension of a 3D tensor and normalizes it (LayerNorm primitive).',
            starterCode: `import torch\n\ndef simple_layer_norm(x: torch.Tensor, eps: float = 1e-5) -> torch.Tensor:\n    # x has shape [batch, seq_len, dim]\n    # TODO: compute mean and variance along dim=-1 and normalize\n    pass`,
            solutionCode: `import torch\n\ndef simple_layer_norm(x: torch.Tensor, eps: float = 1e-5) -> torch.Tensor:\n    mean = x.mean(dim=-1, keepdim=True)\n    var = x.var(dim=-1, keepdim=True, unbiased=False)\n    normalized = (x - mean) / torch.sqrt(var + eps)\n    return normalized`,
            hints: ['Use keepdim=True to maintain the 3D tensor rank', 'Add epsilon (1e-5) to avoid division by zero']
          }
        ],
        xpReward: 175
      }
    ]
  },
  {
    id: 'stage_1',
    stageNumber: 1,
    title: 'Production Software & Math for AI',
    subtitle: 'From Notebook Scripts to Resilient AI Architecture',
    tagline: 'Master object-oriented design, async systems, autograd, and calculus for deep learning.',
    iconName: 'Code2',
    description: 'Transition from exploratory Jupyter Notebooks to clean, modular, production-grade Python architectures. Learn async concurrency, Pydantic schemas, and the fundamental linear algebra behind deep neural networks.',
    dataAnalystContext: 'Analysts write linear scripts that run once. AI Engineers write asynchronous microservices with type validation, error recovery, automatic differentiation, and unit-tested model wrappers.',
    outcomes: [
      'Write modular, asynchronous Python with FastAPI, Pydantic, and AsyncIO',
      'Understand Matrix Calculus, Jacobians, and Automatic Differentiation engines',
      'Build a mini-Autograd engine from scratch (computational graph & backprop)',
      'Containerize AI workloads with Docker and manage dependencies cleanly'
    ],
    topics: [
      {
        id: 'soft_eng_1',
        stageId: 'stage_1',
        title: 'Object-Oriented Design & Clean Architecture for AI',
        shortDescription: 'Building reusable model wrappers, dataset loaders, and inference pipelines with Pydantic and ABCs.',
        estimatedHours: 6,
        dataAnalystBridge: 'Instead of loose functions like `def clean_data(df):`, AI Engineers design abstract interfaces like `BaseRetriever`, `BaseEmbedder`, and `InferencePipeline`.',
        difficulty: 'Intermediate',
        coreSkills: ['Abstract Base Classes (ABCs)', 'Pydantic V2 Models', 'Dependency Injection', 'Custom Exception Handling'],
        lessonContent: {
          overview: 'Production AI code must be maintainable, typed, and decoupled. We structure AI applications using interface contracts, strict data validation schemas, and robust configuration management.',
          keyConcepts: [
            {
              name: 'Abstract Base Interfaces for AI Components',
              description: 'Decoupling model implementations from business logic allows swapping OpenAI with Anthropic, Local vLLM, or Ollama with zero breaking changes.',
              codeSnippet: `from abc import ABC, abstractmethod\nfrom pydantic import BaseModel, Field\nfrom typing import List\n\nclass GenerationRequest(BaseModel):\n    prompt: str = Field(..., min_length=1)\n    temperature: float = Field(default=0.7, ge=0.0, le=2.0)\n    max_tokens: int = Field(default=512, gt=0)\n\nclass LLMProvider(ABC):\n    @abstractmethod\n    async def generate(self, request: GenerationRequest) -> str:\n        pass`
            }
          ],
          deepDiveArticle: `### The Problem with Notebook Spaghetti in Production\n\nJupyter Notebooks are great for EDA, but in production, hidden state, global variables, and unhandled network timeouts crash services. Clean AI engineering enforces typed contracts using Pydantic, async execution pools for concurrent API calls, and structured telemetry logging.`,
          bestPractices: [
            'Use Pydantic for all incoming payload parsing and environment variable validation.',
            'Never hardcode API keys or model endpoints—use configuration classes.'
          ],
          commonTraps: [
            'Blocking the main event loop with synchronous `requests.post` instead of `httpx.AsyncClient`.',
            'Failing to implement exponential backoff and retry decorators for external model API calls.'
          ]
        },
        checkpointQuiz: [
          {
            question: 'Why is AsyncIO critical when interacting with Large Language Model APIs?',
            options: [
              'AsyncIO makes the GPU compute weights faster',
              'LLM requests have high network latency (1-10s); async allows handling thousands of concurrent requests without blocking execution threads',
              'Python cannot make HTTP requests without AsyncIO',
              'AsyncIO converts float32 to float16 automatically'
            ],
            correctIndex: 1,
            explanation: 'Because LLM token generation has I/O wait times, asynchronous event loops allow a single server process to multiplex thousands of concurrent client streams.'
          }
        ],
        practicalExercises: [
          {
            title: 'Build a Resilient Asynchronous LLM Client with Retry Logic',
            instructions: 'Create an async class with exponential backoff retry logic that handles rate-limiting (HTTP 429) errors gracefully.',
            starterCode: `import asyncio\nfrom typing import Optional\n\nclass ResilientAIClient:\n    def __init__(self, max_retries: int = 3, base_delay: float = 1.0):\n        self.max_retries = max_retries\n        self.base_delay = base_delay\n\n    async def execute_with_retry(self, call_fn):\n        # TODO: Implement exponential backoff\n        pass`,
            solutionCode: `import asyncio\nimport random\nfrom typing import Any, Callable\n\nclass ResilientAIClient:\n    def __init__(self, max_retries: int = 3, base_delay: float = 1.0):\n        self.max_retries = max_retries\n        self.base_delay = base_delay\n\n    async def execute_with_retry(self, call_fn: Callable[[], Any]):\n        delay = self.base_delay\n        for attempt in range(1, self.max_retries + 1):\n            try:\n                return await call_fn()\n            except Exception as e:\n                if attempt == self.max_retries:\n                    raise e\n                jitter = random.uniform(0, 0.5)\n                await asyncio.sleep(delay + jitter)\n                delay *= 2`,
            hints: ['Multiply delay by 2 each iteration', 'Add jitter to prevent the thundering herd problem']
          }
        ],
        xpReward: 200
      },
      {
        id: 'soft_eng_2',
        stageId: 'stage_1',
        title: 'Autograd & Matrix Calculus from First Principles',
        shortDescription: 'Build a micro-differentiation graph engine and understand gradient propagation.',
        estimatedHours: 8,
        dataAnalystBridge: 'In analytics, you calculate derivatives of business metrics manually ($d(\\text{Revenue})/d(\\text{Price})$). In AI, the chain rule is automated through computational DAGs (Directed Acyclic Graphs).',
        difficulty: 'Advanced',
        coreSkills: ['Chain Rule of Calculus', 'Computational DAGs', 'Scalar & Tensor Autograd', 'Gradient Descent Mechanics'],
        lessonContent: {
          overview: 'Deep learning is optimization via gradient descent. To truly be an expert, you must understand how backward passes compute gradients through dynamic graphs like PyTorch `torch.autograd` or Micrograd.',
          keyConcepts: [
            {
              name: 'The Computational Graph Node',
              description: 'Each mathematical operation produces a node with references to its parent nodes and a local derivative function (backward hook).',
              codeSnippet: `class Value:\n    def __init__(self, data: float, _children=(), _op=''):\n        self.data = data\n        self.grad = 0.0\n        self._backward = lambda: None\n        self._prev = set(_children)\n        self._op = _op\n\n    def __add__(self, other):\n        other = other if isinstance(other, Value) else Value(other)\n        out = Value(self.data + other.data, (self, other), '+')\n        def _backward():\n            self.grad += 1.0 * out.grad\n            other.grad += 1.0 * out.grad\n        out._backward = _backward\n        return out`
            }
          ],
          deepDiveArticle: `### Why Every Staff AI Engineer Understands Autograd\n\nWhen a model fails to converge, or when you implement custom loss functions (like DPO preference loss or contrastive loss), debugging requires knowing whether gradients are vanishing (dying ReLUs), exploding, or detached by non-differentiable operations (like argmax).`,
          bestPractices: [
            'Always verify gradient shapes match parameter shapes: $\\nabla_W L \\in \\mathbb{R}^{\\text{shape}(W)}$.',
            'Zero out gradients (`optimizer.zero_grad()`) before every backprop pass to prevent accumulation.'
          ],
          commonTraps: [
            'Applying non-differentiable operations (e.g. integer casting, thresholding) in the forward graph and wondering why gradients are zero.',
            'Forgetting that in-place mutations in PyTorch can break graph autograd version counters.'
          ]
        },
        checkpointQuiz: [
          {
            question: 'If out = a * b, what is the gradient of "a" with respect to the loss L, given out.grad = dL/dout?',
            options: ['dL/da = b.data * out.grad', 'dL/da = a.data * out.grad', 'dL/da = 1.0 * out.grad', 'dL/da = out.grad / b.data'],
            correctIndex: 0,
            explanation: 'By the chain rule: dL/da = (dL/dout) * (dout/da). Since dout/da = b, dL/da = b.data * out.grad.'
          }
        ],
        practicalExercises: [
          {
            title: 'Implement Multiplication Backward Pass in Value Node',
            instructions: 'Complete the __mul__ method for a computational scalar node including the backward gradient calculation.',
            starterCode: `class Value:\n    def __init__(self, data: float, _children=()):\n        self.data = data\n        self.grad = 0.0\n        self._backward = lambda: None\n        self._prev = set(_children)\n\n    def __mul__(self, other):\n        other = other if isinstance(other, Value) else Value(other)\n        # TODO: Return out Value with proper _backward closure\n        pass`,
            solutionCode: `class Value:\n    def __init__(self, data: float, _children=()):\n        self.data = data\n        self.grad = 0.0\n        self._backward = lambda: None\n        self._prev = set(_children)\n\n    def __mul__(self, other):\n        other = other if isinstance(other, Value) else Value(other)\n        out = Value(self.data * other.data, (self, other))\n        def _backward():\n            self.grad += other.data * out.grad\n            other.grad += self.data * out.grad\n        out._backward = _backward\n        return out`,
            hints: ['Remember that d(a*b)/da = b and d(a*b)/db = a', 'Accumulate with += to support nodes used multiple times']
          }
        ],
        xpReward: 250
      }
    ]
  },
  {
    id: 'stage_2',
    stageNumber: 2,
    title: 'Core Machine Learning & Statistical Rigor',
    subtitle: 'From Predictive BI to Production ML Pipelines',
    tagline: 'Gradient Boosted Trees, feature stores, leakage prevention, and model explainability.',
    iconName: 'Cpu',
    description: 'Transform your data exploration skills into production tabular ML models. Master XGBoost, LightGBM, rigorous out-of-fold validation, feature stores, and SHAP interpretability.',
    dataAnalystContext: 'You already know how to identify predictive correlations in SQL. Here, you learn how to turn those features into non-linear ensembles, automate feature selection, and prevent data leakage in production.',
    outcomes: [
      'Build end-to-end Tabular ML pipelines with LightGBM, XGBoost, and CatBoost',
      'Prevent time-travel and target leakage in enterprise training pipelines',
      'Deploy feature stores (e.g. Feast) for consistent training-serving skew mitigation',
      'Implement SHAP & TreeSHAP explainability for enterprise stakeholder buy-in'
    ],
    topics: [
      {
        id: 'ml_core_1',
        stageId: 'stage_2',
        title: 'Gradient Boosted Trees & Tabular Architecture Mastery',
        shortDescription: 'Deep dive into LightGBM, CatBoost, custom objective functions, and hyperparameter tuning.',
        estimatedHours: 6,
        dataAnalystBridge: 'In BI, you build decision rule trees or regressions. Gradient Boosted Trees build hundreds of shallow residual trees that sequentially correct the errors of previous trees.',
        difficulty: 'Intermediate',
        coreSkills: ['XGBoost / LightGBM Internals', 'Custom Loss Functions', 'Optuna Bayesian Optimization', 'Out-Of-Fold Validation'],
        lessonContent: {
          overview: 'For structured business data (churn, fraud, pricing, conversion), Gradient Boosted Trees consistently outperform deep neural nets. Understanding second-order Taylor expansion (gradients & hessians) makes you a master.',
          keyConcepts: [
            {
              name: 'Residual Learning via GBDT',
              description: 'Each subsequent tree is fitted on the pseudo-residuals (negative gradient of the loss function) of the ensemble.',
              codeSnippet: `import lightgbm as lgb\nfrom sklearn.model_selection import StratifiedKFold\n\nparams = {\n    'objective': 'binary',\n    'metric': 'auc',\n    'learning_rate': 0.05,\n    'num_leaves': 31,\n    'feature_fraction': 0.8\n}\n\n# Train with early stopping to prevent overfitting\nmodel = lgb.train(\n    params,\n    train_set=train_data,\n    valid_sets=[val_data],\n    callbacks=[lgb.early_stopping(stopping_rounds=50)]\n)`
            }
          ],
          deepDiveArticle: `### Eliminating Data Leakage: The #1 Killer of Enterprise ML\n\nData leakage happens when information from the target variable or future test periods contaminates training features. Analysts often make the mistake of standardizing data before splitting train/test. In production, every transformation (scaling, target encoding, imputation) MUST be computed strictly within cross-validation folds.`,
          bestPractices: [
            'Use TimeSeriesSplit for temporal datasets to prevent future leakage into past predictions.',
            'Log experiments and model artifacts systematically with MLflow or W&B.'
          ],
          commonTraps: [
            'Imputing missing values on the full dataset before splitting into train/test sets.',
            'Evaluating models on accuracy rather than PR-AUC / ROC-AUC on imbalanced business data.'
          ]
        },
        checkpointQuiz: [
          {
            question: 'Why is it dangerous to fit a StandardScaler on the entire dataset before doing train_test_split?',
            options: [
              'StandardScaler only works on 2D arrays',
              'The mean and standard deviation of the test set leak into the training set, causing overly optimistic validation metrics',
              'It makes the model run out of GPU memory',
              'Scikit-learn throws an uncatchable exception'
            ],
            correctIndex: 1,
            explanation: 'Fitting on the full dataset introduces data leakage by exposing test distribution statistics to the training phase.'
          }
        ],
        practicalExercises: [
          {
            title: 'Build a Leak-Free Cross-Validation Pipeline with Target Encoding',
            instructions: 'Construct a cross-validated out-of-fold target encoder to safely encode high-cardinality categorical variables without target leakage.',
            starterCode: `import numpy as np\nimport pandas as pd\nfrom sklearn.model_selection import KFold\n\ndef out_of_fold_target_encode(df: pd.DataFrame, cat_col: str, target_col: str, n_splits: int = 5) -> np.ndarray:\n    # TODO: Implement out-of-fold target encoding\n    pass`,
            solutionCode: `import numpy as np\nimport pandas as pd\nfrom sklearn.model_selection import KFold\n\ndef out_of_fold_target_encode(df: pd.DataFrame, cat_col: str, target_col: str, n_splits: int = 5) -> np.ndarray:\n    oof_encoded = np.zeros(len(df))\n    global_mean = df[target_col].mean()\n    kf = KFold(n_splits=n_splits, shuffle=True, random_state=42)\n    \n    for train_idx, val_idx in kf.split(df):\n        train_fold = df.iloc[train_idx]\n        means = train_fold.groupby(cat_col)[target_col].mean()\n        # Map onto validation fold, fill unseen categories with global mean\n        oof_encoded[val_idx] = df.iloc[val_idx][cat_col].map(means).fillna(global_mean)\n        \n    return oof_encoded`,
            hints: ['Iterate through KFold train and validation splits', 'Use groupby().mean() strictly on the train fold']
          }
        ],
        xpReward: 220
      }
    ]
  },
  {
    id: 'stage_3',
    stageNumber: 3,
    title: 'Deep Learning & Transformer Mechanics',
    subtitle: 'From Multilayer Perceptrons to Attention Is All You Need',
    tagline: 'Deconstruct PyTorch, Backprop, Self-Attention, and Transformer Blocks from scratch.',
    iconName: 'Network',
    description: 'Master deep neural networks from first principles. Code multi-layer perceptrons, convolutional layers, recurrent units, and the exact Scaled Dot-Product and Multi-Head Attention mechanisms powering modern LLMs.',
    dataAnalystContext: 'Instead of treating neural networks as black boxes, you will code the mathematical equations of self-attention directly in PyTorch.',
    outcomes: [
      'Implement PyTorch custom datasets, dataloaders, and training loops with mixed precision (AMP)',
      'Derive and code Scaled Dot-Product Attention: $Attention(Q,K,V) = \\text{softmax}(\\frac{QK^T}{\\sqrt{d_k}})V$',
      'Build a complete Multi-Head Self-Attention Transformer Block from scratch',
      'Understand Positional Encodings (Sinusoidal, RoPE - Rotary Position Embedding)'
    ],
    topics: [
      {
        id: 'deep_learn_1',
        stageId: 'stage_3',
        title: 'Building Multi-Head Self-Attention from Scratch',
        shortDescription: 'The mathematical heartbeat of LLMs: Queries, Keys, Values, Softmax Scaling, and Multi-Head Projection.',
        estimatedHours: 8,
        dataAnalystBridge: 'In SQL, you join tables on exact keys ($A.id = B.id$). Self-Attention is a "Soft Differentiable Join" where every word computes how much relevance/weight it shares with every other word.',
        difficulty: 'Advanced',
        coreSkills: ['Q, K, V Matrix Projections', 'Scaled Dot-Product Math', 'Causal Masking (Autoregressive)', 'Multi-Head Splitting & Concatenation'],
        lessonContent: {
          overview: 'The Transformer replaced recurrent networks by processing all tokens in parallel through attention mechanisms. The Query asks "What am I looking for?", the Key says "What do I represent?", and the Value provides "What information do I contain?"',
          keyConcepts: [
            {
              name: 'Scaled Dot-Product Attention Formula',
              description: 'Scaling by 1/sqrt(d_k) prevents large dot products from pushing softmax into regions with vanishingly small gradients.',
              codeSnippet: `import torch\nimport torch.nn as nn\nimport math\n\ndef scaled_dot_product_attention(Q, K, V, mask=None):\n    d_k = Q.size(-1)\n    scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(d_k)\n    if mask is not None:\n        scores = scores.masked_fill(mask == 0, -1e9)\n    attention_weights = torch.softmax(scores, dim=-1)\n    output = torch.matmul(attention_weights, V)\n    return output, attention_weights`
            }
          ],
          deepDiveArticle: `### Why Softmax Scaling $\\frac{1}{\\sqrt{d_k}}$ is Mathematically Required\n\nAssume $q$ and $k$ are independent random variables with mean 0 and variance 1. Their dot product $q \\cdot k = \\sum_{i=1}^{d_k} q_i k_i$ has mean 0 and variance $d_k$. As hidden dimension $d_k$ grows large (e.g. 4096 in Llama 3), the dot products grow very large in magnitude, causing softmax to yield near-one-hot probability distributions where gradients vanish to 0. Dividing by $\\sqrt{d_k}$ normalizes the variance back to 1.`,
          mathOrTheoryNote: '$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$',
          bestPractices: [
            'Use FlashAttention (`torch.nn.functional.scaled_dot_product_attention`) in production for fused CUDA kernel execution.',
            'Apply causal lower-triangular masking for decoder-only autoregressive models (GPT/Llama style).'
          ],
          commonTraps: [
            'Forgetting to mask future tokens in decoder models, allowing the model to look ahead during training.',
            'Incorrect tensor dimensions when splitting heads (must be [B, num_heads, seq_len, head_dim]).'
          ]
        },
        checkpointQuiz: [
          {
            question: 'What is the purpose of the causal mask in decoder autoregressive language models?',
            options: [
              'To hide special tokens like [CLS] and [SEP]',
              'To prevent token position "t" from attending to future tokens "t+1, t+2, ...", ensuring realistic next-token prediction',
              'To speed up GPU matrix multiplication',
              'To reduce memory from float32 to float16'
            ],
            correctIndex: 1,
            explanation: 'Autoregressive language models predict the next token given past tokens. The causal mask sets future attention logits to negative infinity.'
          }
        ],
        practicalExercises: [
          {
            title: 'Build a Multi-Head Attention PyTorch Module',
            instructions: 'Write a complete PyTorch nn.Module for MultiHeadAttention that projects inputs into Q, K, V, splits across heads, applies attention, and projects back.',
            starterCode: `import torch\nimport torch.nn as nn\nimport math\n\nclass MultiHeadAttention(nn.Module):\n    def __init__(self, d_model: int, num_heads: int):\n        super().__init__()\n        self.d_model = d_model\n        self.num_heads = num_heads\n        self.head_dim = d_model // num_heads\n        # TODO: Define Linear projection layers for Q, K, V, and Out\n        pass\n\n    def forward(self, x, mask=None):\n        # TODO: Implement multi-head forward pass\n        pass`,
            solutionCode: `import torch\nimport torch.nn as nn\nimport math\n\nclass MultiHeadAttention(nn.Module):\n    def __init__(self, d_model: int, num_heads: int):\n        super().__init__()\n        self.d_model = d_model\n        self.num_heads = num_heads\n        self.head_dim = d_model // num_heads\n        assert d_model % num_heads == 0, "d_model must be divisible by num_heads"\n        \n        self.w_q = nn.Linear(d_model, d_model)\n        self.w_k = nn.Linear(d_model, d_model)\n        self.w_v = nn.Linear(d_model, d_model)\n        self.w_o = nn.Linear(d_model, d_model)\n\n    def forward(self, x, mask=None):\n        batch_size, seq_len, _ = x.shape\n        # Project and reshape to [B, num_heads, seq_len, head_dim]\n        Q = self.w_q(x).view(batch_size, seq_len, self.num_heads, self.head_dim).transpose(1, 2)\n        K = self.w_k(x).view(batch_size, seq_len, self.num_heads, self.head_dim).transpose(1, 2)\n        V = self.w_v(x).view(batch_size, seq_len, self.num_heads, self.head_dim).transpose(1, 2)\n        \n        scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(self.head_dim)\n        if mask is not None:\n            scores = scores.masked_fill(mask == 0, -1e9)\n            \n        attn = torch.softmax(scores, dim=-1)\n        out = torch.matmul(attn, V)\n        # Concatenate heads back to [B, seq_len, d_model]\n        out = out.transpose(1, 2).contiguous().view(batch_size, seq_len, self.d_model)\n        return self.w_o(out)`,
            hints: ['Make sure d_model is divisible by num_heads', 'Transpose dimensions 1 and 2 to separate the heads for parallel batched matmul']
          }
        ],
        xpReward: 300
      }
    ]
  },
  {
    id: 'stage_4',
    stageNumber: 4,
    title: 'Generative AI, Advanced RAG & Agentic AI',
    subtitle: 'From Prompt Engineering to Enterprise Multi-Agent Systems',
    tagline: 'Build production RAG with Hybrid Search, Re-ranking, Context Compression, and Agent Swarms.',
    iconName: 'Bot',
    description: 'The golden tier for modern AI Engineers. Master Vector Search (Qdrant/Pinecone), Hybrid Dense+Sparse BM25 retrieval, Cross-Encoder Re-ranking, LoRA/QLoRA Parameter-Efficient Fine-Tuning, and ReAct agent workflows with tool calling.',
    dataAnalystContext: 'You know what business stakeholders need when they ask questions about complex documents and relational databases. Here you build autonomous agents that query vector databases, write SQL, and execute multi-step analysis.',
    outcomes: [
      'Architect Production RAG with Semantic Chunking, Hybrid Search (Dense+BM25), and Cross-Encoder Re-ranking',
      'Fine-Tune Open-Source LLMs (Llama 3, Mistral) using LoRA, QLoRA, and DPO with Unsloth',
      'Build Multi-Agent Workflows using ReAct loops, tool execution, and state machines',
      'Implement Structured JSON extraction with Pydantic and Constrained Decoding'
    ],
    topics: [
      {
        id: 'genai_1',
        stageId: 'stage_4',
        title: 'Production-Grade RAG Architecture (Beyond Naive RAG)',
        shortDescription: 'Hybrid Search, BM25 + Dense Reciprocal Rank Fusion (RRF), Cross-Encoder Re-ranking & Context Slicing.',
        estimatedHours: 8,
        dataAnalystBridge: 'Naive RAG is like doing a fuzzy string match. Production RAG combines lexical search (BM25) with semantic embeddings and a cross-encoder machine learning re-ranking model.',
        difficulty: 'Advanced',
        coreSkills: ['Hybrid Retrieval (BM25 + Dense)', 'Reciprocal Rank Fusion (RRF)', 'Cross-Encoder Re-ranking (BGE-Reranker)', 'Context Compression & Lost-in-the-Middle mitigation'],
        lessonContent: {
          overview: 'Naive RAG (embed chunk -> top-k cosine similarity -> dump into prompt) fails in enterprise settings on tabular data, acronyms, and specific numbers. Production RAG uses multi-stage retrieval pipelines.',
          keyConcepts: [
            {
              name: 'Reciprocal Rank Fusion (RRF)',
              description: 'Combines rankings from multiple disparate search algorithms (e.g. BM25 keyword + Vector dense) without requiring calibrated score normalization.',
              codeSnippet: `def reciprocal_rank_fusion(dense_ranks: list, sparse_ranks: list, k: int = 60):\n    scores = {}\n    for rank, doc_id in enumerate(dense_ranks):\n        scores[doc_id] = scores.get(doc_id, 0.0) + (1.0 / (k + rank + 1))\n    for rank, doc_id in enumerate(sparse_ranks):\n        scores[doc_id] = scores.get(doc_id, 0.0) + (1.0 / (k + rank + 1))\n    # Sort documents by accumulated RRF score\n    return sorted(scores.items(), key=lambda x: x[1], reverse=True)`
            },
            {
              name: 'Cross-Encoder Re-Ranking',
              description: 'Bi-encoders embed query and document separately for fast indexing. Cross-encoders pass (Query, Document) together through all transformer attention layers for maximum ranking accuracy on the top 20 candidates.',
            }
          ],
          deepDiveArticle: `### Solving the "Lost in the Middle" Phenomenon\n\nResearch proves that LLMs pay high attention to tokens at the very beginning and very end of the prompt context window, while ignoring tokens in the middle. In production RAG, re-ranking and strategically placing the most relevant retrieved chunks at the start and end of the prompt increases accuracy by up to 34%.`,
          bestPractices: [
            'Always use Hybrid Search (BM25 + Dense) for enterprise document retrieval containing SKU numbers, dates, or names.',
            'Filter retrieved chunks by cosine similarity threshold before sending them to the LLM to save tokens and avoid hallucination.'
          ],
          commonTraps: [
            'Using fixed arbitrary chunk sizes (e.g. 500 characters) that split sentences and tables right through the middle.',
            'Relying purely on vector similarity when users query exact error codes or financial numbers.'
          ]
        },
        checkpointQuiz: [
          {
            question: 'Why is a Cross-Encoder used ONLY on the top-k retrieved candidates rather than the entire corpus of 1,000,000 documents?',
            options: [
              'Cross-encoders cannot output numerical scores',
              'Cross-encoders process Query and Document together through all transformer layers, which is computationally too slow (O(N)) to run over millions of docs at search time',
              'Cross-encoders only work on PDF files',
              'Vector databases do not support cross-encoders'
            ],
            correctIndex: 1,
            explanation: 'Cross-encoders are highly accurate but computationally heavy. We use fast vector bi-encoders to fetch 50 candidates, then cross-encoders to re-rank the top 5.'
          }
        ],
        practicalExercises: [
          {
            title: 'Implement an End-to-End Hybrid RAG Pipeline with RRF',
            instructions: 'Write a Python function that merges results from a Dense Vector Retriever and a BM25 Lexical Retriever using Reciprocal Rank Fusion.',
            starterCode: `from typing import List, Dict, Tuple\n\ndef hybrid_retrieve_and_fuse(dense_results: List[str], sparse_results: List[str], k_rrf: int = 60, top_n: int = 5) -> List[Tuple[str, float]]:\n    # TODO: Calculate RRF scores and return top_n fused documents with scores\n    pass`,
            solutionCode: `from typing import List, Dict, Tuple\n\ndef hybrid_retrieve_and_fuse(dense_results: List[str], sparse_results: List[str], k_rrf: int = 60, top_n: int = 5) -> List[Tuple[str, float]]:\n    scores: Dict[str, float] = {}\n    for rank, doc in enumerate(dense_results):\n        scores[doc] = scores.get(doc, 0.0) + (1.0 / (k_rrf + rank + 1))\n    for rank, doc in enumerate(sparse_results):\n        scores[doc] = scores.get(doc, 0.0) + (1.0 / (k_rrf + rank + 1))\n        \n    sorted_docs = sorted(scores.items(), key=lambda item: item[1], reverse=True)\n    return sorted_docs[:top_n]`,
            hints: ['Enumerate dense_results and sparse_results to get the 0-indexed rank', 'Add 1.0 / (k_rrf + rank + 1) to each doc key in the scores dictionary']
          }
        ],
        xpReward: 320
      },
      {
        id: 'genai_2',
        stageId: 'stage_4',
        title: 'Autonomous Agentic AI & Tool-Calling ReAct Loops',
        shortDescription: 'Build reasoning and acting loops where LLMs query SQL databases, call APIs, and execute self-correction.',
        estimatedHours: 9,
        dataAnalystBridge: 'You know the exact SQL steps to solve a business problem. Here you teach an LLM agent how to inspect table schemas, write SQL queries, inspect errors, and retry automatically until it gets the answer.',
        difficulty: 'Advanced',
        coreSkills: ['ReAct (Reasoning + Acting) Framework', 'Function / Tool Calling Schemas', 'Self-Correction & Error Recovery', 'Agent State Machines & Memory'],
        lessonContent: {
          overview: 'Agentic AI gives LLMs agency to interact with the external world: databases, web search, Python execution environments, and internal APIs. By structuring a Thought -> Action -> Observation cycle, agents solve complex multi-step reasoning problems.',
          keyConcepts: [
            {
              name: 'The ReAct Execution Loop',
              description: 'The agent analyzes current state, decides which tool to call with what arguments, waits for the environment observation, and repeats until the final answer is reached.',
              codeSnippet: `async def agent_loop(user_query: str, tools: dict, max_steps: int = 5):\n    messages = [{"role": "user", "content": user_query}]\n    for step in range(max_steps):\n        # LLM decides if it wants to call a tool or respond\n        response = await llm.chat_with_tools(messages, tools=tools.values())\n        if not response.tool_calls:\n            return response.content # Final Answer\n        for tool_call in response.tool_calls:\n            tool_output = await execute_tool(tool_call, tools)\n            messages.append({"role": "tool", "content": str(tool_output)})\n    return "Max reasoning steps exceeded."`
            }
          ],
          deepDiveArticle: `### Why Autonomous Text-to-SQL Requires Self-Correction Loops\n\nSingle-shot text-to-SQL prompts fail on complex joins, syntax mismatches, or non-existent column names. An AI Engineer equips the agent with a SQL execution sandbox tool. When the database throws an error (e.g. \`Column 'user_revenue' does not exist\`), the agent observes the exact error stack trace, inspects the schema, corrects its query, and succeeds on the second attempt.`,
          bestPractices: [
            'Always provide clear Pydantic schemas with detailed docstrings for every tool parameter.',
            'Enforce hard limits on maximum agent execution steps (`max_iterations=8`) to avoid infinite loops and runaway billing.'
          ],
          commonTraps: [
            'Allowing agents to execute destructive database operations without human-in-the-loop confirmation gates.',
            'Passing the entire database schema into the prompt instead of using schema retrieval on-demand.'
          ]
        },
        checkpointQuiz: [
          {
            question: 'What should an agent do when a tool execution returns an error message like "TypeError: missing argument"?',
            options: [
              'Immediately crash the server and disconnect the user',
              'Feed the error message back into the model context as a tool observation so the model can reason and self-correct on the next iteration',
              'Repeat the exact same tool call 10 times in a row',
              'Delete the database table'
            ],
            correctIndex: 1,
            explanation: 'The core strength of the ReAct paradigm is self-healing: the agent consumes runtime error feedback to formulate a corrected tool invocation.'
          }
        ],
        practicalExercises: [
          {
            title: 'Build a Self-Healing SQL Agent Loop',
            instructions: 'Write an agent loop simulation that attempts to run a query, catches simulated database errors, and feeds the error back to the LLM until success or max retries.',
            starterCode: `from typing import Callable, Dict, Any\n\nasync def self_healing_sql_agent(question: str, generate_sql_fn: Callable, execute_sql_fn: Callable, max_attempts: int = 3) -> Dict[str, Any]:\n    # TODO: Implement loop with error feedback\n    pass`,
            solutionCode: `from typing import Callable, Dict, Any\n\nasync def self_healing_sql_agent(question: str, generate_sql_fn: Callable, execute_sql_fn: Callable, max_attempts: int = 3) -> Dict[str, Any]:\n    history = [{"role": "user", "content": question}]\n    for attempt in range(1, max_attempts + 1):\n        sql_query = await generate_sql_fn(history)\n        try:\n            result = await execute_sql_fn(sql_query)\n            return {"success": True, "attempts": attempt, "sql": sql_query, "data": result}\n        except Exception as e:\n            history.append({"role": "assistant", "content": f"Tried SQL: {sql_query}"})\n            history.append({"role": "system", "content": f"SQL Execution Error: {str(e)}. Please correct the SQL."})\n    return {"success": False, "attempts": max_attempts, "error": "Exceeded maximum retry attempts"}`,
            hints: ['Append the error message to the history so the next call sees the error', 'Return on successful execution']
          }
        ],
        xpReward: 350
      }
    ]
  },
  {
    id: 'stage_5',
    stageNumber: 5,
    title: 'Production AI Engineering & MLOps',
    subtitle: 'High-Throughput LLM Serving, Quantization & Latency Optimization',
    tagline: 'Scale AI systems to millions of users with vLLM, GGUF/AWQ Quantization, and Guardrails.',
    iconName: 'Server',
    description: 'Master the engineering side of AI infrastructure. Learn how to serve LLMs with vLLM and TensorRT-LLM, calculate GPU VRAM sizing, quantize weights (FP16 -> INT8/INT4), and enforce strict safety guardrails.',
    dataAnalystContext: 'Analysts evaluate queries on dashboard response time. AI Engineers evaluate systems on Time to First Token (TTFT), tokens per second throughput, and GPU memory utilization.',
    outcomes: [
      'Serve Open Source models with vLLM PagedAttention and continuous batching',
      'Calculate GPU VRAM requirements for model weights, KV-cache, and activations',
      'Quantize models using GGUF, AWQ, and GPTQ for 4x memory reduction with minimal perplexity loss',
      'Implement AI Safety & Security Guardrails (NeMo Guardrails, Prompt Injection Shields)'
    ],
    topics: [
      {
        id: 'mlops_1',
        stageId: 'stage_5',
        title: 'GPU Memory Math & KV-Cache Sizing for LLMs',
        shortDescription: 'Calculate exact VRAM footprints for parameters, KV-cache, activations, and master PagedAttention.',
        estimatedHours: 6,
        dataAnalystBridge: 'In databases, you calculate RAM for buffer pools. In AI Engineering, you calculate VRAM for model weights ($B \\times \\text{bytes}$) and the dynamic Key-Value Cache ($2 \\times 2 \\times n_{\\text{layers}} \\times d_{\\text{model}} \\times \\text{seq\\_len}$).',
        difficulty: 'Advanced',
        coreSkills: ['Model Parameter Memory Math', 'KV-Cache Calculation Formulas', 'Continuous Batching & PagedAttention', 'VRAM Allocation Budgets'],
        lessonContent: {
          overview: 'Serving an LLM requires knowing whether it will fit on an NVIDIA A10G (24GB), A100 (80GB), or H100 GPU. You must calculate weight memory, KV-cache memory per concurrent user, and activation memory.',
          keyConcepts: [
            {
              name: 'The 3 Pillars of LLM VRAM',
              description: '1. Model Weights ($M_{\\text{weights}} = P \\times \\text{bytes\\_per\\_param}$). 2. KV-Cache ($M_{\\text{kv}} = 2 \\times 2 \\times L \\times H \\times S \\times B$). 3. CUDA overhead & Activation buffers (~20%).',
              codeSnippet: `def calculate_llm_vram_gb(param_billions: float, precision_bytes: float = 2.0, num_layers: int = 32, hidden_dim: int = 4096, batch_size: int = 16, max_seq_len: int = 4096) -> dict:\n    # 1. Model Weights Memory\n    weight_gb = (param_billions * 1e9 * precision_bytes) / (1024**3)\n    # 2. KV Cache Memory (2 for K and V, 2 for FP16 precision bytes)\n    kv_bytes = 2 * 2 * num_layers * hidden_dim * max_seq_len * batch_size\n    kv_gb = kv_bytes / (1024**3)\n    # Total with 20% activation overhead\n    total_gb = (weight_gb + kv_gb) * 1.2\n    return {"weights_gb": round(weight_gb, 2), "kv_cache_gb": round(kv_gb, 2), "recommended_gpu_gb": round(total_gb, 2)}`
            }
          ],
          deepDiveArticle: `### Why vLLM PagedAttention Changed LLM Serving Forever\n\nTraditional HuggingFace serving allocated static, contiguous memory blocks for the maximum possible sequence length for every request. This caused up to 80% memory fragmentation! vLLM borrows virtual memory paging from operating systems (PagedAttention), allowing non-contiguous KV-cache memory blocks that increase serving throughput by up to 400% on the exact same GPU hardware.`,
          bestPractices: [
            'Use AWQ (Activation-aware Weight Quantization) for 4-bit serving on GPUs to achieve 3-4x higher concurrency.',
            'Monitor Time-To-First-Token (TTFT) and Inter-Token Latency (ITL) separately in production telemetry.'
          ],
          commonTraps: [
            'Calculating VRAM for weights only and forgetting that 32 concurrent requests with 4k context will consume 16GB+ of KV-cache alone!',
            'Deploying unquantized FP32 models to production inference servers.'
          ]
        },
        checkpointQuiz: [
          {
            question: 'How much GPU VRAM does a 7-Billion parameter model require purely for its weights when loaded in 16-bit precision (FP16/BF16)?',
            options: ['~7 GB', '~14 GB', '~28 GB', '~56 GB'],
            correctIndex: 1,
            explanation: 'In 16-bit precision, each parameter takes 2 bytes. 7 Billion params * 2 bytes = 14 Billion bytes = ~14 GB of VRAM for weights alone.'
          }
        ],
        practicalExercises: [
          {
            title: 'Build an Automated GPU Sizing Calculator',
            instructions: 'Write a Python utility that recommends the optimal GPU instance (e.g. T4 16GB, A10G 24GB, A100 80GB) given model parameters, precision, batch size, and sequence length.',
            starterCode: `def recommend_gpu_hardware(param_billions: float, precision_bits: int, batch_size: int, context_window: int) -> dict:\n    # TODO: Calculate VRAM and pick best GPU tier\n    pass`,
            solutionCode: `def recommend_gpu_hardware(param_billions: float, precision_bits: int, batch_size: int, context_window: int) -> dict:\n    bytes_per_param = precision_bits / 8\n    weight_gb = (param_billions * 1e9 * bytes_per_param) / (1024**3)\n    # Approximate KV-cache: assuming 32 layers, 4096 dim\n    kv_gb = (2 * 2 * 32 * 4096 * context_window * batch_size) / (1024**3)\n    total_required = (weight_gb + kv_gb) * 1.25 # 25% safety overhead\n    \n    gpu_tiers = [(\"NVIDIA T4 (16GB)\", 16), (\"NVIDIA A10G (24GB)\", 24), (\"NVIDIA A100 (40GB)\", 40), (\"NVIDIA A100 (80GB)\", 80), (\"8x NVIDIA H100 Cluster\", 640)]\n    chosen = next((name for name, vram in gpu_tiers if vram >= total_required), \"Multi-Node Cluster Needed\")\n    \n    return {\"total_vram_needed_gb\": round(total_required, 2), \"recommended_hardware\": chosen}`,
            hints: ['Divide precision_bits by 8 to get bytes per parameter', 'Add a safety margin (1.25x) for activations and CUDA context']
          }
        ],
        xpReward: 350
      }
    ]
  },
  {
    id: 'stage_6',
    stageNumber: 6,
    title: 'Global Expert Capstones & Enterprise Mastery',
    subtitle: 'Architecting Scaled Multi-Tenant AI Platforms',
    tagline: 'Design enterprise-grade multi-agent architectures with security, governance, and petabyte scale.',
    iconName: 'Crown',
    description: 'The pinnacle of AI Engineering. You build autonomous production systems: Petabyte-scale multimodal RAG with RBAC, self-optimizing fine-tuning pipelines, and high-concurrency real-time voice and vision pipelines.',
    dataAnalystContext: 'You are no longer an analyst consuming reports. You are the Principal AI Architect designing the systems that automate enterprise workflows globally.',
    outcomes: [
      'Architect resilient enterprise multi-agent platforms with rollback, circuit breakers, and telemetry',
      'Implement Role-Based Access Control (RBAC) & document-level security in Vector DBs',
      'Pass rigorous Staff AI Systems Design interviews with structured architectural trade-offs',
      'Export a verified, world-class AI Engineering portfolio featuring production-grade code'
    ],
    topics: [
      {
        id: 'expert_capstone_1',
        stageId: 'stage_6',
        title: 'Enterprise AI Systems Design & Architecture Framework',
        shortDescription: 'Mastering the 7-step architectural blueprint for designing any AI system under scale and compliance.',
        estimatedHours: 10,
        dataAnalystBridge: 'You synthesize business requirements, data architecture, security compliance, model latency, and cost into a coherent multi-million dollar system design.',
        difficulty: 'Expert',
        coreSkills: ['Distributed Model Serving', 'Vector DB Partitioning & Sharding', 'Multi-Tenant Security & RBAC', 'Cost Optimization & Token Caching'],
        lessonContent: {
          overview: 'Global AI experts design systems that operate reliably at 99.99% uptime, comply with data governance (GDPR/HIPAA), and optimize GPU costs. We master the complete end-to-end design rubric.',
          keyConcepts: [
            {
              name: 'Semantic Cache Layer for LLMs',
              description: 'Checking vector similarity of incoming queries against a Redis semantic cache reduces LLM API costs by up to 45% and drops latency from 2000ms to 8ms for repetitive queries.',
              codeSnippet: `async def query_with_semantic_cache(query_text: str, cache_similarity_threshold: float = 0.95):\n    query_embedding = await get_embedding(query_text)\n    cached_match = await redis_vector_search(query_embedding)\n    if cached_match and cached_match.similarity >= cache_similarity_threshold:\n        return {"response": cached_match.response, "source": "semantic_cache", "latency_ms": 8}\n    # Fallback to full LLM generation\n    response = await llm_generate(query_text)\n    await store_semantic_cache(query_embedding, response)\n    return {"response": response, "source": "llm_generated"}`
            }
          ],
          deepDiveArticle: `### The Global AI Engineer Mindset\n\nBeing a global expert isn't just about calling \`model.generate()\`. It's about knowing when NOT to use an LLM, when to use an indexed SQLite search, how to cache embeddings hierarchically, how to design fallbacks when an API provider has an outage, and how to measure real return on investment (ROI) for enterprise automation.`,
          bestPractices: [
            'Implement semantic caching (GPTCache/Redis) for frequent enterprise queries.',
            'Enforce tenant isolation in vector databases by filtering metadata namespaces.'
          ],
          commonTraps: [
            'Sending raw user queries directly to expensive frontier models without prompt compression or cache lookup.',
            'Ignoring token budget limits and rate limits during peak burst traffic.'
          ]
        },
        checkpointQuiz: [
          {
            question: 'What is the primary benefit of a Semantic Cache (e.g. Redis Vector Search) in front of an LLM generation endpoint?',
            options: [
              'It makes the model weights smaller',
              'It intercepts semantically similar user questions and returns cached answers in milliseconds, dramatically reducing API costs and latency',
              'It trains the model in real time',
              'It converts Python to C++ automatically'
            ],
            correctIndex: 1,
            explanation: 'Semantic caching matches similar user intents to previously generated responses, cutting cloud compute costs and delivering sub-10ms response times.'
          }
        ],
        practicalExercises: [
          {
            title: 'Build a Multi-Tenant Namespace Vector Filtering Interface',
            instructions: 'Write a query builder that injects organization ID and department RBAC filters directly into the vector database query filter.',
            starterCode: `from typing import Dict, Any, List\n\ndef build_secure_vector_query(user_org_id: str, allowed_departments: List[str], query_embedding: List[float], top_k: int = 5) -> Dict[str, Any]:\n    # TODO: Build Qdrant/Pinecone secure metadata filter\n    pass`,
            solutionCode: `from typing import Dict, Any, List\n\ndef build_secure_vector_query(user_org_id: str, allowed_departments: List[str], query_embedding: List[float], top_k: int = 5) -> Dict[str, Any]:\n    return {\n        \"vector\": query_embedding,\n        \"top_k\": top_k,\n        \"filter\": {\n            \"must\": [\n                {\"key\": \"organization_id\", \"match\": {\"value\": user_org_id}},\n                {\"key\": \"department\", \"match\": {\"any\": allowed_departments}}\n            ]\n        },\n        \"include_metadata\": True\n    }`,
            hints: ['Ensure user_org_id is matched as an exact constraint in the filter block', 'Use "any" or "in" for allowed_departments']
          }
        ],
        xpReward: 500
      }
    ]
  }
];
