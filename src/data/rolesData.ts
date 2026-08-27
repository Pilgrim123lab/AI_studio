import { CareerRoleInfo, SQLChallenge } from '../types';

export const CAREER_ROLES_DATA: CareerRoleInfo[] = [
  {
    id: 'data_analyst',
    title: 'Data Analyst (DA)',
    shortCode: 'DA',
    tagline: 'Descriptive & Diagnostic Insight Engine',
    averageSalaryUSD: '$75,000 – $120,000',
    experienceHorizon: '0 – 3 Years Foundation',
    iconName: 'BarChart3',
    badgeColor: 'blue',
    overview: 'Transforms raw operational and event databases into executive dashboards, business intelligence metrics, cohort retention curves, and hypothesis-driven insights.',
    coreResponsibilities: [
      'Write complex multi-table SQL queries, CTEs, and window functions (LAG, LEAD, RANK, PARTITION BY)',
      'Design dimensional schemas (Star & Snowflake) and build real-time executive BI dashboards in Tableau/PowerBI',
      'Conduct rigorous A/B test power calculations, hypothesis testing, and statistical cohort analyses',
      'Wrangle messy tabular telemetry data into clean Pandas/Polars DataFrames for root-cause diagnostic reports'
    ],
    techStack: ['PostgreSQL', 'DuckDB', 'Snowflake', 'BigQuery', 'dbt', 'Pandas', 'Polars', 'Tableau', 'PowerBI', 'Excel/VBA'],
    mathematicalFoundations: [
      'Descriptive Statistics (Mean, Median, Standard Deviation, IQR)',
      'Inferential Statistics & Hypothesis Testing (p-values, t-tests, Chi-square, ANOVA)',
      'Bayesian vs Frequentist A/B Testing Probability',
      'Time-Series Decomposition (Trend, Seasonality, Residuals)'
    ],
    topInterviewTopics: [
      'SQL Window Functions & Self-Joins on billion-row datasets',
      'A/B Testing sample size determination and Minimum Detectable Effect (MDE)',
      'Cohort Retention Analysis & Churn Curve Modeling',
      'dbt incremental data modeling & data lineage'
    ],
    transitionBridge: 'Your mastery of business metrics, relational schemas, and data intuition provides the exact structural grounding needed to formulate ML problem spaces and build semantic AI datasets.',
    keyDeliverableArtifacts: [
      'B2B SaaS 360° Churn Cohort Retention Dashboard',
      'E-Commerce Funnel & Multi-Touch Attribution Model',
      'Automated dbt Data Quality & Transformation Pipeline'
    ]
  },
  {
    id: 'data_scientist',
    title: 'Data Scientist (DS)',
    shortCode: 'DS',
    tagline: 'Predictive Modeling & Statistical ML Architect',
    averageSalaryUSD: '$125,000 – $175,000',
    experienceHorizon: '2 – 5 Years Progression',
    iconName: 'LineChart',
    badgeColor: 'emerald',
    overview: 'Develops predictive statistical models, machine learning classification/regression pipelines, and experimental frameworks that forecast customer behavior, risk, and pricing.',
    coreResponsibilities: [
      'Engineer robust feature pipelines (One-Hot, Target Encoding, Imputation, PCA, Scaling)',
      'Train, validate, and tune classical ML algorithms (Logistic Regression, Random Forest, XGBoost, LightGBM, CatBoost)',
      'Perform rigorous K-Fold cross-validation, hyperparameter grid/random searches, and threshold calibration',
      'Deconstruct model interpretability using SHAP values, Partial Dependence Plots (PDP), and LIME'
    ],
    techStack: ['Python', 'Scikit-Learn', 'XGBoost', 'LightGBM', 'Optuna', 'SHAP', 'SciPy', 'Statsmodels', 'Jupyter', 'MLflow'],
    mathematicalFoundations: [
      'Linear Algebra (Matrix Multiplications, Eigenvalues, SVD, Vector Projections)',
      'Multivariable Calculus (Gradients, Hessians, Partial Derivatives, Chain Rule)',
      'Probability Distributions (Gaussian, Poisson, Bernoulli, Exponential)',
      'Loss Functions (Mean Squared Error, Binary Cross-Entropy, Log-Loss, Huber Loss)'
    ],
    topInterviewTopics: [
      'Bias-Variance Tradeoff & Regularization (Lasso L1 vs Ridge L2 penalties)',
      'Handling severe class imbalance (SMOTE, Focal Loss, PR-AUC vs ROC-AUC)',
      'Gradient Boosting Tree Splitting Criteria & Shrinkage mechanics',
      'SHAP / Shapley values mathematical foundation from cooperative game theory'
    ],
    transitionBridge: 'Transitioning from DA to DS requires mastering vectorized matrix computations, probabilistic loss minimization, and systematic train-test validation loops.',
    keyDeliverableArtifacts: [
      'Enterprise Churn & Propensity XGBoost Classifier with SHAP explanations',
      'Dynamic Real-Estate Valuation Multi-variable Regression with L1/L2 Regularization',
      'Unsupervised Customer Segmentation Pipeline with K-Means & PCA'
    ]
  },
  {
    id: 'ml_engineer',
    title: 'Machine Learning Engineer (MLE)',
    shortCode: 'MLE',
    tagline: 'Deep Learning & Scalable MLOps Productionizer',
    averageSalaryUSD: '$160,000 – $225,000',
    experienceHorizon: '3 – 7 Years Engineering',
    iconName: 'Cpu',
    badgeColor: 'indigo',
    overview: 'Engineers end-to-end deep learning pipelines, trains neural networks with PyTorch, optimizes GPU memory utilization, and deploys high-throughput, low-latency inference microservices.',
    coreResponsibilities: [
      'Design, train, and backpropagate deep neural networks (CNNs, ResNets, RNNs, Autoencoders) in PyTorch',
      'Implement custom loss functions, optimizers (SGD with Momentum, AdamW, RMSProp), and LR schedulers',
      'Build scalable CI/CD MLOps pipelines with Docker, Kubernetes, Triton Inference Server, and ONNX Runtime',
      'Profile GPU memory bottlenecks, activation caching, and implement Distributed Data Parallel (DDP)'
    ],
    techStack: ['PyTorch', 'TensorFlow', 'CUDA', 'Triton', 'ONNX', 'Docker', 'Kubernetes', 'FastAPI', 'MLflow', 'WandB', 'Ray'],
    mathematicalFoundations: [
      'Vectorized Automatic Differentiation & Computational Graphs',
      'Stochastic Optimization (AdamW, Weight Decay, Gradient Clipping, Momentum)',
      'Tensor Dimensionality Algebra (Einstein Summation `torch.einsum`, Broadcast Mechanics)',
      'Quantization Mathematics (FP32 -> FP16 -> INT8/INT4 Affine Mapping: $q = \\text{round}(x/s) + z$)'
    ],
    topInterviewTopics: [
      'Backpropagation chain rule derivation for custom PyTorch autograd functions',
      'GPU VRAM sizing for activations, model parameters, and optimizer states',
      'ONNX runtime optimization, graph freezing, and TensorRT FP16 quantization',
      'High-throughput model serving architecture (Dynamic Batching & Worker Pools)'
    ],
    transitionBridge: 'Transitioning from DS to MLE shifts focus from model experimentation in Jupyter notebooks to writing production-grade object-oriented PyTorch modules, CUDA-aware memory profiling, and robust Dockerized inference microservices.',
    keyDeliverableArtifacts: [
      'PyTorch Deep Autoencoder for Real-Time Financial Anomaly Detection',
      'High-Throughput Dockerized Triton Inference Service with Dynamic Batching',
      'Distributed PyTorch Training Pipeline with Ray & Weights & Biases Logging'
    ]
  },
  {
    id: 'ai_engineer',
    title: 'AI Systems Engineer (AIE)',
    shortCode: 'AIE',
    tagline: 'Foundation Models, Transformer Architectures & Multi-Agent Swarms',
    averageSalaryUSD: '$200,000 – $320,000+',
    experienceHorizon: 'Advanced / Staff Tier',
    iconName: 'Sparkles',
    badgeColor: 'purple',
    overview: 'Builds state-of-the-art Generative AI systems, fine-tunes open-weights LLMs (LoRA/QLoRA), architects Enterprise Hybrid RAG pipelines with Vector DBs, and orchestrates autonomous multi-agent systems.',
    coreResponsibilities: [
      'Implement Transformer multi-head attention ($\text{Softmax}(QK^T/\sqrt{d_k})V$) and Rotary Position Embeddings (RoPE)',
      'Architect hybrid retrieval systems combining BM25 keyword search with dense HNSW vector search and Cross-Encoder re-ranking',
      'Fine-tune open-weights models (Llama 3, Mistral, Qwen) using LoRA, QLoRA, and Direct Preference Optimization (DPO)',
      'Build resilient autonomous ReAct / Plan-and-Solve agent swarms with deterministic guardrails, structured JSON outputs, and LLM-as-a-judge evals',
      'Deploy continuous batching inference servers using vLLM, SGLang, PagedAttention, and Speculative Decoding'
    ],
    techStack: ['Transformers', 'PyTorch', 'vLLM', 'Qdrant', 'Milvus', 'LangChain', 'LlamaIndex', 'DeepEval', 'Ragas', 'Ollama', 'FastAPI'],
    mathematicalFoundations: [
      'Scaled Dot-Product Self-Attention & Multi-Query/Grouped-Query Attention (MQA/GQA)',
      'Vector Distance Metrics (Cosine Similarity, Euclidean L2, Inner Product, HNSW Graph Mechanics)',
      'Low-Rank Matrix Decomposition for Parameter-Efficient Fine-Tuning ($W + B \\cdot A$ where $r \\ll d$)',
      'KV Cache Memory Scaling: $\\text{Memory} = 2 \\times 2 \\times n_{\\text{layers}} \\times n_{\\text{heads}} \\times d_{\\text{head}} \\times \\text{seq\\_len} \\times \\text{batch\\_size}$'
    ],
    topInterviewTopics: [
      'KV-Cache memory bottlenecks and PagedAttention virtual memory block allocation',
      'Enterprise Hybrid RAG failure modes (lost in the middle, vector hallucination, chunk boundary truncation)',
      'LoRA vs Full Fine-Tuning gradient checkpointing & GPU VRAM requirements',
      'Speculative Decoding verification algorithms & acceptance rate modeling'
    ],
    transitionBridge: 'As an AI Engineer, you combine the SQL data rigor of an Analyst, the statistical modeling of a Scientist, and the production systems discipline of an MLE to command foundational GenAI architectures.',
    keyDeliverableArtifacts: [
      'Enterprise Hybrid RAG System with Qdrant, BM25 & Cross-Encoder Re-Ranker',
      'Autonomous Multi-Agent ReAct Financial Research Swarm with Tool Guardrails',
      'Custom Domain-Adapted LLM via QLoRA 4-bit Quantization on PyTorch'
    ]
  }
];

export const PRACTICUM_SQL_CHALLENGES: SQLChallenge[] = [
  {
    id: 'sql_1_retention',
    title: 'Monthly User Cohort Retention Matrix',
    difficulty: 'Intermediate',
    category: 'Cohorts & Retention',
    description: 'Calculate month-over-month user cohort retention rates. Find the cohort signup month for each user and determine the percentage of users who returned to make a purchase in Month 1, Month 2, and Month 3.',
    initialQuery: `-- Calculate monthly cohort retention percentage
WITH user_first_purchase AS (
  SELECT 
    user_id,
    DATE_TRUNC('month', MIN(order_date)) AS cohort_month
  FROM orders
  GROUP BY user_id
),
user_activities AS (
  SELECT 
    o.user_id,
    ufp.cohort_month,
    (EXTRACT(YEAR FROM o.order_date) - EXTRACT(YEAR FROM ufp.cohort_month)) * 12 +
    (EXTRACT(MONTH FROM o.order_date) - EXTRACT(MONTH FROM ufp.cohort_month)) AS month_offset
  FROM orders o
  JOIN user_first_purchase ufp ON o.user_id = ufp.user_id
)
SELECT 
  cohort_month,
  COUNT(DISTINCT CASE WHEN month_offset = 0 THEN user_id END) AS cohort_size,
  ROUND(COUNT(DISTINCT CASE WHEN month_offset = 1 THEN user_id END) * 100.0 / NULLIF(COUNT(DISTINCT CASE WHEN month_offset = 0 THEN user_id END), 0), 2) AS m1_retention_pct,
  ROUND(COUNT(DISTINCT CASE WHEN month_offset = 2 THEN user_id END) * 100.0 / NULLIF(COUNT(DISTINCT CASE WHEN month_offset = 0 THEN user_id END), 0), 2) AS m2_retention_pct,
  ROUND(COUNT(DISTINCT CASE WHEN month_offset = 3 THEN user_id END) * 100.0 / NULLIF(COUNT(DISTINCT CASE WHEN month_offset = 0 THEN user_id END), 0), 2) AS m3_retention_pct
FROM user_activities
GROUP BY cohort_month
ORDER BY cohort_month ASC;`,
    solutionQuery: `-- Verified Solution for Cohort Retention
WITH first_seen AS (
  SELECT user_id, DATE_TRUNC('month', MIN(order_date)) as cohort_month FROM orders GROUP BY user_id
)
SELECT 
  fs.cohort_month,
  COUNT(DISTINCT fs.user_id) AS cohort_size,
  ROUND(100.0 * COUNT(DISTINCT CASE WHEN o.order_date >= fs.cohort_month + INTERVAL '1 month' AND o.order_date < fs.cohort_month + INTERVAL '2 months' THEN o.user_id END) / COUNT(DISTINCT fs.user_id), 1) as m1_retention_pct
FROM first_seen fs
LEFT JOIN orders o ON fs.user_id = o.user_id
GROUP BY fs.cohort_month
ORDER BY fs.cohort_month;`,
    expectedOutputColumns: ['cohort_month', 'cohort_size', 'm1_retention_pct', 'm2_retention_pct', 'm3_retention_pct'],
    hint: 'Use a Common Table Expression (CTE) to locate the earliest signup/purchase timestamp per user, then join back to the orders table and compute month diffs.',
    businessContext: 'Critical for measuring Product-Market Fit (PMF) and identifying where churn spikes occur in the user lifecycle.',
    xpReward: 150
  },
  {
    id: 'sql_2_running_avg',
    title: '7-Day Rolling Revenue & Anomaly Detector',
    difficulty: 'Intermediate',
    category: 'Window Functions',
    description: 'Compute the daily revenue along with a 7-day rolling moving average and standard deviation to flag days where revenue deviated by more than 2 sigma.',
    initialQuery: `-- 7-Day Rolling Revenue & Statistical Bounds
WITH daily_revenue AS (
  SELECT 
    DATE(order_date) AS txn_date,
    SUM(amount) AS daily_rev
  FROM orders
  GROUP BY DATE(order_date)
)
SELECT 
  txn_date,
  daily_rev,
  ROUND(AVG(daily_rev) OVER (
    ORDER BY txn_date 
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
  ), 2) AS rolling_7d_avg,
  ROUND(STDDEV(daily_rev) OVER (
    ORDER BY txn_date 
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
  ), 2) AS rolling_7d_stddev
FROM daily_revenue
ORDER BY txn_date DESC;`,
    solutionQuery: `WITH daily AS (
  SELECT DATE(order_date) as day, SUM(amount) as revenue FROM orders GROUP BY 1
)
SELECT 
  day,
  revenue,
  AVG(revenue) OVER (ORDER BY day ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) as moving_avg
FROM daily ORDER BY day;`,
    expectedOutputColumns: ['txn_date', 'daily_rev', 'rolling_7d_avg', 'rolling_7d_stddev'],
    hint: 'Use window frame specification: ROWS BETWEEN 6 PRECEDING AND CURRENT ROW.',
    businessContext: 'Essential time-series foundation used by both Data Analysts (BI alerts) and Data Scientists (feature generation for forecasting).',
    xpReward: 140
  },
  {
    id: 'sql_3_top_k',
    title: 'Dense Top-K Category Performance with DENSE_RANK()',
    difficulty: 'Advanced',
    category: 'Window Functions',
    description: 'Find the top 3 highest-earning product SKUs within each category, accounting for ties using DENSE_RANK() and calculating each item’s contribution percentage to its category total.',
    initialQuery: `-- Top 3 Items per Category with Category Contribution Pct
WITH product_sales AS (
  SELECT 
    p.category,
    p.product_name,
    SUM(o.amount) AS total_revenue
  FROM order_items o
  JOIN products p ON o.product_id = p.product_id
  GROUP BY p.category, p.product_name
),
ranked_products AS (
  SELECT 
    category,
    product_name,
    total_revenue,
    SUM(total_revenue) OVER (PARTITION BY category) AS category_total_revenue,
    DENSE_RANK() OVER (PARTITION BY category ORDER BY total_revenue DESC) AS rank_in_category
  FROM product_sales
)
SELECT 
  category,
  product_name,
  total_revenue,
  rank_in_category,
  ROUND(total_revenue * 100.0 / category_total_revenue, 2) AS revenue_contribution_pct
FROM ranked_products
WHERE rank_in_category <= 3
ORDER BY category, rank_in_category ASC;`,
    solutionQuery: `WITH ranked AS (
  SELECT p.category, p.product_name, SUM(o.amount) as rev,
  DENSE_RANK() OVER(PARTITION BY p.category ORDER BY SUM(o.amount) DESC) as rnk
  FROM order_items o JOIN products p ON o.product_id = p.product_id
  GROUP BY 1, 2
)
SELECT * FROM ranked WHERE rnk <= 3;`,
    expectedOutputColumns: ['category', 'product_name', 'total_revenue', 'rank_in_category', 'revenue_contribution_pct'],
    hint: 'PARTITION BY category in your window clause, and apply the filter rank_in_category <= 3 in an outer query.',
    businessContext: 'Directly mirrors the Top-K retrieval logic used in dense vector semantic search candidate generation in AI Engineering.',
    xpReward: 160
  }
];
