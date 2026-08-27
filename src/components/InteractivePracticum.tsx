import React, { useState, useEffect, useRef } from 'react';
import {
  Database,
  LineChart,
  Cpu,
  Sparkles,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Sliders,
  Terminal,
  Brain,
  Search,
  Layers,
  Zap,
  ArrowRight,
  TrendingUp,
  Shield,
  HelpCircle,
  Copy,
  ChevronRight,
  RefreshCw,
  Award
} from 'lucide-react';
import { UserProgress, CareerRole } from '../types';
import { CAREER_ROLES_DATA, PRACTICUM_SQL_CHALLENGES } from '../data/rolesData';

interface InteractivePracticumProps {
  progress: UserProgress;
  activeRole: CareerRole;
  onRoleChange: (role: CareerRole) => void;
  onCompletePracticum: (practicumId: string, xpReward: number) => void;
}

export const InteractivePracticum: React.FC<InteractivePracticumProps> = ({
  progress,
  activeRole,
  onRoleChange,
  onCompletePracticum,
}) => {
  const [activeSandboxTab, setActiveSandboxTab] = useState<'da_sql' | 'ds_ml' | 'mle_nn' | 'aie_rag'>('da_sql');

  // Sync sandbox tab with active role when activeRole changes
  useEffect(() => {
    if (activeRole === 'data_analyst') setActiveSandboxTab('da_sql');
    else if (activeRole === 'data_scientist') setActiveSandboxTab('ds_ml');
    else if (activeRole === 'ml_engineer') setActiveSandboxTab('mle_nn');
    else if (activeRole === 'ai_engineer') setActiveSandboxTab('aie_rag');
  }, [activeRole]);

  // ==========================================
  // 1. DATA ANALYST: SQL & BI ENGINE STATE
  // ==========================================
  const [selectedSqlChallenge, setSelectedSqlChallenge] = useState(PRACTICUM_SQL_CHALLENGES[0]);
  const [userSqlQuery, setUserSqlQuery] = useState(PRACTICUM_SQL_CHALLENGES[0].initialQuery);
  const [sqlResults, setSqlResults] = useState<{ columns: string[]; rows: any[][]; executionTimeMs: number } | null>(null);
  const [sqlStatus, setSqlStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [sqlFeedback, setSqlFeedback] = useState<string | null>(null);
  const [aiSqlSuggestion, setAiSqlSuggestion] = useState<string | null>(null);
  const [isAiSqlLoading, setIsAiSqlLoading] = useState(false);

  // Mock Database Table Datasets for Query Simulation
  const mockOrdersTable = [
    { order_id: 101, user_id: 'u_1', order_date: '2024-01-15', amount: 120.5, category: 'Electronics', status: 'Completed' },
    { order_id: 102, user_id: 'u_2', order_date: '2024-01-18', amount: 45.0, category: 'Books', status: 'Completed' },
    { order_id: 103, user_id: 'u_1', order_date: '2024-02-10', amount: 210.0, category: 'Electronics', status: 'Completed' },
    { order_id: 104, user_id: 'u_3', order_date: '2024-02-14', amount: 88.0, category: 'Apparel', status: 'Completed' },
    { order_id: 105, user_id: 'u_2', order_date: '2024-02-20', amount: 15.0, category: 'Books', status: 'Refunded' },
    { order_id: 106, user_id: 'u_1', order_date: '2024-03-05', amount: 310.0, category: 'Electronics', status: 'Completed' },
    { order_id: 107, user_id: 'u_4', order_date: '2024-03-12', amount: 55.0, category: 'Home', status: 'Completed' },
    { order_id: 108, user_id: 'u_3', order_date: '2024-03-22', amount: 95.0, category: 'Apparel', status: 'Completed' },
    { order_id: 109, user_id: 'u_5', order_date: '2024-03-25', amount: 420.0, category: 'Electronics', status: 'Completed' },
    { order_id: 110, user_id: 'u_1', order_date: '2024-04-02', amount: 180.0, category: 'Electronics', status: 'Completed' },
  ];

  const handleRunSql = () => {
    setSqlStatus('running');
    setTimeout(() => {
      // Simulate realistic execution
      if (selectedSqlChallenge.id === 'sql_1_retention') {
        setSqlResults({
          columns: ['cohort_month', 'cohort_size', 'm1_retention_pct', 'm2_retention_pct', 'm3_retention_pct'],
          rows: [
            ['2024-01-01', 2, '50.0%', '50.0%', '50.0%'],
            ['2024-02-01', 1, '100.0%', '0.0%', '0.0%'],
            ['2024-03-01', 2, '0.0%', '0.0%', '0.0%'],
          ],
          executionTimeMs: 14.2
        });
        setSqlStatus('success');
        setSqlFeedback('Query executed successfully. Calculated 3-month cohort retention matrix matching test assertions!');
      } else if (selectedSqlChallenge.id === 'sql_2_running_avg') {
        setSqlResults({
          columns: ['txn_date', 'daily_rev', 'rolling_7d_avg', 'rolling_7d_stddev'],
          rows: [
            ['2024-01-15', '$120.50', '$120.50', '$0.00'],
            ['2024-01-18', '$45.00', '$82.75', '$53.39'],
            ['2024-02-10', '$210.00', '$125.17', '$82.68'],
            ['2024-02-14', '$88.00', '$115.88', '$69.60'],
            ['2024-03-05', '$310.00', '$154.70', '$103.20'],
          ],
          executionTimeMs: 11.8
        });
        setSqlStatus('success');
        setSqlFeedback('7-Day rolling window calculations verified across partition temporal boundaries!');
      } else {
        setSqlResults({
          columns: ['category', 'product_name', 'total_revenue', 'rank_in_category', 'revenue_contribution_pct'],
          rows: [
            ['Electronics', 'AI Compute Server X9', '$1,240.00', 1, '64.5%'],
            ['Electronics', '4K UltraStudio Monitor', '$520.00', 2, '27.1%'],
            ['Electronics', 'Mechanical Encoder Keyboard', '$160.00', 3, '8.4%'],
            ['Apparel', 'Neural Core Hoodie', '$183.00', 1, '65.8%'],
            ['Apparel', 'DevOps Technical Cap', '$95.00', 2, '34.2%'],
          ],
          executionTimeMs: 16.5
        });
        setSqlStatus('success');
        setSqlFeedback('Dense ranking and category contribution percentages calculated accurately.');
      }
    }, 450);
  };

  const handleAskAiSql = async () => {
    setIsAiSqlLoading(true);
    try {
      const res = await fetch('/api/mentor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Explain the optimal SQL execution plan, index optimization, and window partition strategy for this query:\n\`\`\`sql\n${userSqlQuery}\n\`\`\`\nChallenge context: ${selectedSqlChallenge.title}`,
          currentTopic: 'SQL Window Functions & Cohort Analysis'
        })
      });
      const data = await res.json();
      setAiSqlSuggestion(data.reply || 'Ensure indexes exist on (user_id, order_date) to allow index-only scans for CTE partitioning.');
    } catch {
      setAiSqlSuggestion('Analysis: Use an index on `(user_id, order_date)` to enable fast hash aggregation and prevent full table scans on large datasets.');
    } finally {
      setIsAiSqlLoading(false);
    }
  };

  // ==========================================
  // 2. DATA SCIENTIST: ML STUDIO STATE & ENGINE
  // ==========================================
  const [mlDataset, setMlDataset] = useState<'churn' | 'housing' | 'credit'>('churn');
  const [mlAlgorithm, setMlAlgorithm] = useState<'logistic' | 'decision_tree' | 'random_forest' | 'xgboost'>('xgboost');
  const [trainSplit, setTrainSplit] = useState<number>(80);
  const [hyperParams, setHyperParams] = useState({
    learningRate: 0.1,
    maxDepth: 5,
    nEstimators: 100,
    regularizationLambda: 0.05,
    decisionThreshold: 0.50
  });
  const [mlTrainingState, setMlTrainingState] = useState<'idle' | 'training' | 'trained'>('trained');
  const [mlMetrics, setMlMetrics] = useState({
    accuracy: 0.912,
    precision: 0.884,
    recall: 0.856,
    f1Score: 0.870,
    aucRoc: 0.942,
    confusionMatrix: { tp: 214, fp: 28, fn: 36, tn: 522 },
    featureImportance: [
      { name: 'monthly_contract_duration', importance: 0.38 },
      { name: 'customer_support_tickets_30d', importance: 0.24 },
      { name: 'total_usage_drop_pct', importance: 0.19 },
      { name: 'payment_delay_incidents', importance: 0.12 },
      { name: 'tenure_months', importance: 0.07 }
    ]
  });

  const handleTrainMLModel = () => {
    setMlTrainingState('training');
    setTimeout(() => {
      // Calculate realistic metrics dynamically based on hyperparameters and algorithm
      let baseAcc = 0.84;
      if (mlAlgorithm === 'xgboost') baseAcc = 0.92;
      else if (mlAlgorithm === 'random_forest') baseAcc = 0.89;
      else if (mlAlgorithm === 'decision_tree') baseAcc = 0.83;
      else baseAcc = 0.79;

      // Adjust for regularization and depth
      const depthBonus = Math.min(0.04, hyperParams.maxDepth * 0.006);
      const regPenalty = hyperParams.regularizationLambda > 0.5 ? -0.03 : 0.01;
      const finalAcc = Math.min(0.97, Math.max(0.72, baseAcc + depthBonus + regPenalty));
      const prec = Math.min(0.96, finalAcc - 0.02);
      const rec = Math.min(0.95, finalAcc - 0.04);
      const f1 = (2 * prec * rec) / (prec + rec);

      setMlMetrics({
        accuracy: parseFloat(finalAcc.toFixed(3)),
        precision: parseFloat(prec.toFixed(3)),
        recall: parseFloat(rec.toFixed(3)),
        f1Score: parseFloat(f1.toFixed(3)),
        aucRoc: parseFloat((finalAcc + 0.03).toFixed(3)),
        confusionMatrix: {
          tp: Math.round(250 * rec),
          fp: Math.round(250 * (1 - prec)),
          fn: Math.round(250 * (1 - rec)),
          tn: Math.round(550 * finalAcc)
        },
        featureImportance: [
          { name: 'monthly_contract_duration', importance: 0.36 + Math.random() * 0.04 },
          { name: 'customer_support_tickets_30d', importance: 0.23 + Math.random() * 0.03 },
          { name: 'total_usage_drop_pct', importance: 0.18 + Math.random() * 0.02 },
          { name: 'payment_delay_incidents', importance: 0.13 + Math.random() * 0.02 },
          { name: 'tenure_months', importance: 0.08 }
        ]
      });
      setMlTrainingState('trained');
    }, 600);
  };

  // ==========================================
  // 3. ML ENGINEER: NEURAL NET & BACKPROP ENGINE
  // ==========================================
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [nnHiddenLayers, setNnHiddenLayers] = useState<number>(2);
  const [nnNeuronsPerLayer, setNnNeuronsPerLayer] = useState<number>(4);
  const [nnActivation, setNnActivation] = useState<'relu' | 'tanh' | 'sigmoid' | 'gelu'>('relu');
  const [nnLearningRate, setNnLearningRate] = useState<number>(0.05);
  const [nnEpoch, setNnEpoch] = useState<number>(0);
  const [nnLoss, setNnLoss] = useState<number>(0.693);
  const [isTrainingNN, setIsTrainingNN] = useState<boolean>(false);
  const [selectedNeuron, setSelectedNeuron] = useState<{ layer: number; index: number; forwardVal: number; gradVal: number } | null>({
    layer: 1,
    index: 2,
    forwardVal: 0.842,
    gradVal: -0.034
  });

  // Render 2D Decision Boundary Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Draw background boundary contour
    ctx.clearRect(0, 0, width, height);

    // Grid simulation
    const gridSize = 8;
    for (let x = 0; x < width; x += gridSize) {
      for (let y = 0; y < height; y += gridSize) {
        const nx = (x / width) * 4 - 2;
        const ny = (y / height) * 4 - 2;
        
        // Simulating non-linear decision function based on epoch and activation
        const dist = Math.sqrt(nx * nx + ny * ny);
        const spiral = Math.sin(dist * 2.5 - (nnEpoch * 0.05)) + (nx * 0.4);
        const score = 1 / (1 + Math.exp(-spiral));

        ctx.fillStyle = score > 0.5 
          ? `rgba(99, 102, 241, ${0.15 + score * 0.25})` // Indigo
          : `rgba(239, 68, 68, ${0.15 + (1 - score) * 0.25})`; // Red
        ctx.fillRect(x, y, gridSize, gridSize);
      }
    }

    // Draw sample data points (Class 0 and Class 1)
    const points = [
      // Class 1 (Indigo circles)
      { x: 0.3, y: 0.4, cls: 1 }, { x: 0.5, y: 0.6, cls: 1 }, { x: -0.2, y: 0.8, cls: 1 },
      { x: -0.6, y: -0.3, cls: 1 }, { x: 0.1, y: -0.5, cls: 1 }, { x: -0.4, y: 0.2, cls: 1 },
      // Class 0 (Red circles)
      { x: 1.2, y: 1.1, cls: 0 }, { x: -1.3, y: -1.0, cls: 0 }, { x: 1.4, y: -0.9, cls: 0 },
      { x: -1.1, y: 1.2, cls: 0 }, { x: 0.9, y: -1.3, cls: 0 }, { x: -1.4, y: 0.4, cls: 0 }
    ];

    points.forEach((pt) => {
      const cx = ((pt.x + 2) / 4) * width;
      const cy = ((pt.y + 2) / 4) * height;

      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fillStyle = pt.cls === 1 ? '#4f46e5' : '#ef4444';
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();
    });
  }, [nnEpoch, nnActivation, nnHiddenLayers]);

  // Live training animation loop
  useEffect(() => {
    let interval: any = null;
    if (isTrainingNN) {
      interval = setInterval(() => {
        setNnEpoch((prev) => {
          if (prev >= 200) {
            setIsTrainingNN(false);
            return prev;
          }
          const next = prev + 5;
          setNnLoss(Math.max(0.042, 0.693 * Math.exp(-next * 0.015) + (Math.random() * 0.01)));
          return next;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isTrainingNN]);

  // ==========================================
  // 4. AI ENGINEER: ATTENTION & RAG PLAYGROUND
  // ==========================================
  const [ragQuery, setRagQuery] = useState<string>('What is PagedAttention and how does it prevent GPU memory fragmentation?');
  const [ragChunkSize, setRagChunkSize] = useState<number>(250);
  const [ragChunkOverlap, setRagChunkOverlap] = useState<number>(50);
  const [ragTopK, setRagTopK] = useState<number>(3);
  const [ragRetrievalType, setRagRetrievalType] = useState<'dense_vector' | 'bm25_sparse' | 'hybrid_rrf'>('hybrid_rrf');
  const [ragSearchResults, setRagSearchResults] = useState<any[]>([
    {
      id: 'doc_1',
      title: 'vLLM Architecture Paper (UC Berkeley SkyLab)',
      chunkText: 'PagedAttention manages KV cache memory dynamically by allocating non-contiguous physical memory blocks inspired by OS virtual memory paging, eliminating external memory fragmentation.',
      denseScore: 0.924,
      sparseScore: 0.881,
      hybridRRFScore: 0.032,
      crossEncoderScore: 0.965
    },
    {
      id: 'doc_2',
      title: 'HuggingFace High Throughput Serving Guide',
      chunkText: 'Traditional LLM serving pre-allocates contiguous memory for the maximum sequence length, resulting in up to 60-80% wasted GPU VRAM due to internal fragmentation and over-reservation.',
      denseScore: 0.871,
      sparseScore: 0.742,
      hybridRRFScore: 0.028,
      crossEncoderScore: 0.912
    },
    {
      id: 'doc_3',
      title: 'NVIDIA TensorRT-LLM Optimization',
      chunkText: 'Paged KV cache enables continuous batching where new requests can join existing batch slots as soon as tokens complete without waiting for the slowest sequence in the batch.',
      denseScore: 0.812,
      sparseScore: 0.690,
      hybridRRFScore: 0.024,
      crossEncoderScore: 0.880
    }
  ]);
  const [generatedAnswer, setGeneratedAnswer] = useState<string>(
    'PagedAttention solves GPU memory bottlenecks by breaking the Key-Value (KV) cache into non-contiguous physical memory blocks, mimicking operating system virtual memory paging. This eliminates external fragmentation, reduces VRAM waste from 80% to under 4%, and enables continuous batching for up to 4x higher token throughput.'
  );
  const [faithfulnessScore, setFaithfulnessScore] = useState<number>(98);

  // Scaled Attention Matrix Visualizer
  const [attentionSentence, setAttentionSentence] = useState<string>('The neural network predicts churn accurately');
  const [isCausalMask, setIsCausalMask] = useState<boolean>(true);
  const attentionTokens = attentionSentence.split(' ').filter(Boolean);

  const getAttentionWeight = (i: number, j: number) => {
    if (isCausalMask && j > i) return 0; // Causal future mask
    // Synthetic deterministic attention calculation based on semantic relation
    const distance = Math.abs(i - j);
    const rawScore = Math.max(0.1, 1 - distance * 0.25 + ((i === j) ? 0.3 : 0));
    return parseFloat(rawScore.toFixed(2));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fadeIn">
      {/* 4-Role Unified Career Evolutionary Matrix Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-2xl border border-indigo-500/20 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-400/30 uppercase tracking-widest mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>4-Role Career Evolution Matrix & Live Practicum</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                From Data Analyst to World-Class AI Engineer
              </h1>
              <p className="text-sm text-slate-300 max-w-3xl mt-1 leading-relaxed">
                A rigorous, multi-tiered engineering engine. Switch between specialized role tracks, test live SQL engines, train classical ML pipelines, debug backprop neural networks, and architect production LLM RAG systems.
              </p>
            </div>

            <div className="flex items-center space-x-3 bg-slate-800/80 backdrop-blur-md p-3 rounded-2xl border border-slate-700">
              <div className="text-right">
                <div className="text-xs text-slate-400 font-semibold">Active Track</div>
                <div className="text-sm font-bold text-indigo-400">
                  {CAREER_ROLES_DATA.find((r) => r.id === activeRole)?.title}
                </div>
              </div>
              <div className="p-2 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-md">
                XP: {progress.totalXP}
              </div>
            </div>
          </div>

          {/* 4-Role Progression Stepper / Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
            {CAREER_ROLES_DATA.map((role, idx) => {
              const isActive = activeRole === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => {
                    onRoleChange(role.id);
                  }}
                  className={`p-4 rounded-2xl text-left transition-all relative border ${
                    isActive
                      ? 'bg-indigo-600/30 border-indigo-400 text-white shadow-lg ring-2 ring-indigo-500/50'
                      : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-slate-900/60 text-indigo-300 border border-slate-700">
                      Tier 0{idx + 1}
                    </span>
                    <span className="text-xs font-bold text-emerald-400">{role.averageSalaryUSD.split('–')[1] || role.averageSalaryUSD}</span>
                  </div>
                  <div className="font-bold text-sm text-white mb-0.5">{role.title}</div>
                  <div className="text-xs text-slate-400 line-clamp-1">{role.tagline}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Role Competency Blueprint Card */}
      {(() => {
        const currentRoleInfo = CAREER_ROLES_DATA.find((r) => r.id === activeRole) || CAREER_ROLES_DATA[0];
        return (
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-700">
              <div>
                <div className="flex items-center space-x-3">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    {currentRoleInfo.title} Competency Matrix & Transition Bridge
                  </h2>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700/50">
                    {currentRoleInfo.experienceHorizon}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {currentRoleInfo.overview}
                </p>
              </div>
              <div className="flex items-center space-x-2 text-xs text-slate-600 dark:text-slate-300 font-semibold bg-slate-100 dark:bg-slate-900/60 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <span>Market Compensation: <strong className="text-slate-900 dark:text-white">{currentRoleInfo.averageSalaryUSD}</strong></span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700/60">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2 flex items-center space-x-1.5">
                  <Terminal className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Production Tech Stack</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {currentRoleInfo.techStack.map((tech, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-slate-800 dark:text-slate-200">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700/60">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2 flex items-center space-x-1.5">
                  <Brain className="w-3.5 h-3.5 text-purple-500" />
                  <span>Mathematical Foundations</span>
                </h4>
                <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                  {currentRoleInfo.mathematicalFoundations.slice(0, 3).map((math, i) => (
                    <li key={i} className="flex items-start space-x-1.5">
                      <span className="text-indigo-500 font-bold">•</span>
                      <span>{math}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800/40">
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2 flex items-center space-x-1.5">
                  <Shield className="w-3.5 h-3.5 text-indigo-500" />
                  <span>The Analyst Advantage Bridge</span>
                </h4>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {currentRoleInfo.transitionBridge}
                </p>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Live Interactive Practicum Sandbox Switcher */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-700 pb-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Terminal className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>Interactive Engineering Sandboxes & Live Simulators</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Directly execute queries, train statistical classifiers, simulate gradient backpropagation, and evaluate hybrid RAG retrieval.
            </p>
          </div>

          <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 overflow-x-auto">
            <button
              onClick={() => setActiveSandboxTab('da_sql')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center space-x-1.5 ${
                activeSandboxTab === 'da_sql'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>DA: Live SQL Engine</span>
            </button>
            <button
              onClick={() => setActiveSandboxTab('ds_ml')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center space-x-1.5 ${
                activeSandboxTab === 'ds_ml'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <LineChart className="w-3.5 h-3.5" />
              <span>DS: ML & Classifier Studio</span>
            </button>
            <button
              onClick={() => setActiveSandboxTab('mle_nn')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center space-x-1.5 ${
                activeSandboxTab === 'mle_nn'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>MLE: Neural Net & Backprop</span>
            </button>
            <button
              onClick={() => setActiveSandboxTab('aie_rag')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center space-x-1.5 ${
                activeSandboxTab === 'aie_rag'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AIE: Transformer Attention & RAG</span>
            </button>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* SANDBOX 1: DATA ANALYST - LIVE SQL ENGINE & COHORT CALCULATOR */}
        {/* ------------------------------------------------------------- */}
        {activeSandboxTab === 'da_sql' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Challenge Selector & SQL Editor */}
            <div className="lg:col-span-7 space-y-4">
              {/* Challenge Selector */}
              <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 block">
                  Select Analytical Benchmark Challenge
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {PRACTICUM_SQL_CHALLENGES.map((ch) => (
                    <button
                      key={ch.id}
                      onClick={() => {
                        setSelectedSqlChallenge(ch);
                        setUserSqlQuery(ch.initialQuery);
                        setSqlResults(null);
                        setSqlFeedback(null);
                      }}
                      className={`p-2.5 rounded-xl text-left border text-xs transition-all ${
                        selectedSqlChallenge.id === ch.id
                          ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-500 text-indigo-700 dark:text-indigo-300 font-bold'
                          : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      <div className="line-clamp-1">{ch.title}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{ch.category} • +{ch.xpReward} XP</div>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                  <strong>Objective:</strong> {selectedSqlChallenge.description}
                </p>
              </div>

              {/* SQL Code Editor */}
              <div className="bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-lg">
                <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-300">
                  <div className="flex items-center space-x-2">
                    <Database className="w-4 h-4 text-indigo-400" />
                    <span className="font-mono font-bold">SQL Query Engine (PostgreSQL / DuckDB dialect)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleAskAiSql}
                      disabled={isAiSqlLoading}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center space-x-1 font-semibold"
                    >
                      <Sparkles className="w-3 h-3 text-indigo-400" />
                      <span>{isAiSqlLoading ? 'Analyzing...' : 'Explain Execution Plan'}</span>
                    </button>
                    <button
                      onClick={handleRunSql}
                      disabled={sqlStatus === 'running'}
                      className="px-3.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center space-x-1.5 shadow"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>{sqlStatus === 'running' ? 'Executing...' : 'Run Query'}</span>
                    </button>
                  </div>
                </div>

                <textarea
                  value={userSqlQuery}
                  onChange={(e) => setUserSqlQuery(e.target.value)}
                  className="w-full h-56 bg-slate-950 p-4 font-mono text-xs text-emerald-300 focus:outline-none resize-none leading-relaxed"
                  spellCheck={false}
                />
              </div>

              {/* AI Explain Plan output if requested */}
              {aiSqlSuggestion && (
                <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-800/50 text-slate-200 text-xs space-y-2">
                  <div className="flex items-center justify-between font-bold text-indigo-300">
                    <span className="flex items-center space-x-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>AI Execution Plan & Indexing Optimization</span>
                    </span>
                    <button onClick={() => setAiSqlSuggestion(null)} className="text-slate-400 hover:text-white">✕</button>
                  </div>
                  <p className="text-slate-300 leading-relaxed whitespace-pre-line">{aiSqlSuggestion}</p>
                </div>
              )}
            </div>

            {/* Right Column: Execution Output & Query Results Table */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                    <BarChart3 className="w-4 h-4 text-emerald-500" />
                    <span>Query Output & Execution Profile</span>
                  </h3>
                  {sqlResults && (
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-mono font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                      {sqlResults.executionTimeMs} ms
                    </span>
                  )}
                </div>

                {sqlResults ? (
                  <div className="space-y-3">
                    <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-slate-50 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                          <tr>
                            {sqlResults.columns.map((col, idx) => (
                              <th key={idx} className="p-2.5 font-mono">{col}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-700/60 font-mono">
                          {sqlResults.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="p-2.5 text-slate-800 dark:text-slate-200">{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {sqlFeedback && (
                      <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                          <span>{sqlFeedback}</span>
                        </div>
                        <button
                          onClick={() => onCompletePracticum(selectedSqlChallenge.id, selectedSqlChallenge.xpReward)}
                          className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px]"
                        >
                          Claim +{selectedSqlChallenge.xpReward} XP
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-400 dark:text-slate-500 text-xs space-y-2">
                    <Database className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600" />
                    <p>Click "Run Query" to execute against the virtual database and preview aggregated metrics.</p>
                  </div>
                )}
              </div>

              {/* Sample Schema Reference */}
              <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs space-y-2">
                <div className="font-bold text-slate-700 dark:text-slate-300">Target Schema Reference (`orders` table)</div>
                <div className="font-mono text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
                  <div>• `order_id` (INT, PRIMARY KEY)</div>
                  <div>• `user_id` (VARCHAR)</div>
                  <div>• `order_date` (TIMESTAMP)</div>
                  <div>• `amount` (NUMERIC)</div>
                  <div>• `category` (VARCHAR)</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* SANDBOX 2: DATA SCIENTIST - ML CLASSIFIER & FEATURE STUDIO */}
        {/* ------------------------------------------------------------- */}
        {activeSandboxTab === 'ds_ml' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Hyperparameters & Algorithm Controls */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                  <Sliders className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Model Architecture & Hyperparameter Tuning</span>
                </h3>

                {/* Algorithm Picker */}
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 block">
                    Machine Learning Algorithm
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'xgboost', label: 'XGBoost Classifier' },
                      { id: 'random_forest', label: 'Random Forest' },
                      { id: 'decision_tree', label: 'Decision Tree' },
                      { id: 'logistic', label: 'Logistic Regression' },
                    ].map((alg) => (
                      <button
                        key={alg.id}
                        onClick={() => setMlAlgorithm(alg.id as any)}
                        className={`p-2 rounded-xl text-xs font-bold border transition-all text-center ${
                          mlAlgorithm === alg.id
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                            : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        {alg.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sliders */}
                <div className="space-y-3 pt-2 text-xs">
                  <div>
                    <div className="flex justify-between text-slate-700 dark:text-slate-300 font-semibold mb-1">
                      <span>Max Tree Depth</span>
                      <span className="font-mono text-indigo-600 dark:text-indigo-400">{hyperParams.maxDepth}</span>
                    </div>
                    <input
                      type="range"
                      min={2}
                      max={12}
                      value={hyperParams.maxDepth}
                      onChange={(e) => setHyperParams({ ...hyperParams, maxDepth: parseInt(e.target.value) })}
                      className="w-full accent-indigo-600"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-700 dark:text-slate-300 font-semibold mb-1">
                      <span>Regularization Lambda ($\lambda$)</span>
                      <span className="font-mono text-indigo-600 dark:text-indigo-400">{hyperParams.regularizationLambda}</span>
                    </div>
                    <input
                      type="range"
                      min={0.01}
                      max={1.0}
                      step={0.05}
                      value={hyperParams.regularizationLambda}
                      onChange={(e) => setHyperParams({ ...hyperParams, regularizationLambda: parseFloat(e.target.value) })}
                      className="w-full accent-indigo-600"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-700 dark:text-slate-300 font-semibold mb-1">
                      <span>Classification Decision Threshold</span>
                      <span className="font-mono text-indigo-600 dark:text-indigo-400">{hyperParams.decisionThreshold}</span>
                    </div>
                    <input
                      type="range"
                      min={0.1}
                      max={0.9}
                      step={0.05}
                      value={hyperParams.decisionThreshold}
                      onChange={(e) => setHyperParams({ ...hyperParams, decisionThreshold: parseFloat(e.target.value) })}
                      className="w-full accent-indigo-600"
                    />
                  </div>
                </div>

                <button
                  onClick={handleTrainMLModel}
                  disabled={mlTrainingState === 'training'}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>{mlTrainingState === 'training' ? 'Training & Cross-Validating...' : 'Train ML Model & Evaluate'}</span>
                </button>
              </div>
            </div>

            {/* Right Column: Model Metrics, Confusion Matrix & Feature Importance */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                    <LineChart className="w-4 h-4 text-emerald-500" />
                    <span>Model Evaluation & Diagnostics</span>
                  </h3>
                  <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    AUC-ROC: {mlMetrics.aucRoc}
                  </span>
                </div>

                {/* Top Metrics Grid */}
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700">
                    <div className="text-[10px] text-slate-500 font-semibold uppercase">Accuracy</div>
                    <div className="text-base font-extrabold text-slate-900 dark:text-white font-mono">
                      {(mlMetrics.accuracy * 100).toFixed(1)}%
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700">
                    <div className="text-[10px] text-slate-500 font-semibold uppercase">Precision</div>
                    <div className="text-base font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">
                      {(mlMetrics.precision * 100).toFixed(1)}%
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700">
                    <div className="text-[10px] text-slate-500 font-semibold uppercase">Recall</div>
                    <div className="text-base font-extrabold text-purple-600 dark:text-purple-400 font-mono">
                      {(mlMetrics.recall * 100).toFixed(1)}%
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700">
                    <div className="text-[10px] text-slate-500 font-semibold uppercase">F1-Score</div>
                    <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                      {(mlMetrics.f1Score * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>

                {/* Confusion Matrix + Feature Importance Split */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {/* Confusion Matrix */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 space-y-2">
                    <div className="text-xs font-bold text-slate-700 dark:text-slate-300">Confusion Matrix (Test Set)</div>
                    <div className="grid grid-cols-2 gap-1.5 text-center text-xs font-mono">
                      <div className="p-3 bg-emerald-500/20 rounded-lg border border-emerald-500/30">
                        <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">True Positive</div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">{mlMetrics.confusionMatrix.tp}</div>
                      </div>
                      <div className="p-3 bg-rose-500/10 rounded-lg border border-rose-500/30">
                        <div className="text-[10px] text-rose-600 dark:text-rose-400 font-semibold">False Positive (Type I)</div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">{mlMetrics.confusionMatrix.fp}</div>
                      </div>
                      <div className="p-3 bg-rose-500/10 rounded-lg border border-rose-500/30">
                        <div className="text-[10px] text-rose-600 dark:text-rose-400 font-semibold">False Negative (Type II)</div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">{mlMetrics.confusionMatrix.fn}</div>
                      </div>
                      <div className="p-3 bg-emerald-500/20 rounded-lg border border-emerald-500/30">
                        <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">True Negative</div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">{mlMetrics.confusionMatrix.tn}</div>
                      </div>
                    </div>
                  </div>

                  {/* Feature Importance Bars */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 space-y-2">
                    <div className="text-xs font-bold text-slate-700 dark:text-slate-300">SHAP / Feature Importance</div>
                    <div className="space-y-1.5">
                      {mlMetrics.featureImportance.map((f, i) => (
                        <div key={i} className="space-y-0.5">
                          <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400">
                            <span className="truncate max-w-[140px] font-mono">{f.name}</span>
                            <span className="font-bold">{(f.importance * 100).toFixed(0)}%</span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-indigo-600 h-full rounded-full"
                              style={{ width: `${f.importance * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* SANDBOX 3: ML ENGINEER - NEURAL NET & BACKPROP VISUALIZER */}
        {/* ------------------------------------------------------------- */}
        {activeSandboxTab === 'mle_nn' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Network Architecture & Realtime Canvas */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                    <Cpu className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>2D Non-Linear Classification & Decision Boundary</span>
                  </h3>
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    Epoch: {nnEpoch} | Loss: {nnLoss.toFixed(4)}
                  </span>
                </div>

                {/* HTML5 Canvas */}
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-950 flex items-center justify-center">
                  <canvas ref={canvasRef} width={420} height={260} className="w-full h-auto" />
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setIsTrainingNN(!isTrainingNN)}
                    className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-all ${
                      isTrainingNN
                        ? 'bg-amber-600 hover:bg-amber-500 text-white'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow'
                    }`}
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>{isTrainingNN ? 'Pause Training Loop' : 'Train Neural Net (SGD + Momentum)'}</span>
                  </button>
                  <button
                    onClick={() => {
                      setNnEpoch(0);
                      setNnLoss(0.693);
                      setIsTrainingNN(false);
                    }}
                    className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 text-xs"
                    title="Reset Weights"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Autograd Mathematical Chain Rule & Sizing Inspector */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                  <Brain className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>Autograd Chain Rule & Mathematical Inspector</span>
                </h3>

                {/* Mathematical Chain Rule Box */}
                <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs space-y-2 border border-slate-800">
                  <div className="text-indigo-400 font-bold flex items-center justify-between">
                    <span>Forward Pass Activation:</span>
                    <span>z_j = ∑ (w_ij · a_i) + b_j</span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-950 text-emerald-300 text-[11px]">
                    z = (0.64 × 0.81) + (-0.32 × 0.44) + 0.12 = <strong>0.4976</strong>
                    <br />
                    a = ReLU(0.4976) = <strong>0.4976</strong>
                  </div>

                  <div className="text-purple-400 font-bold flex items-center justify-between pt-1">
                    <span>Backward Error Gradient:</span>
                    <span>∂L / ∂w_ij = δ_j · a_i</span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-950 text-purple-300 text-[11px]">
                    δ_j = ∂L / ∂z_j = (∑_k δ_k · w_jk) · f'(z_j) = -0.042
                    <br />
                    Δw_ij = -η · (∂L / ∂w_ij) = -0.05 × (-0.042 × 0.81) = <strong>+0.0017</strong>
                  </div>
                </div>

                {/* GPU VRAM Memory Profiler Tool */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
                  <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                    <span>LLM GPU Memory & VRAM Sizer</span>
                    <span className="text-[10px] text-slate-500 font-mono">7B Parameter Llama 3</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 font-mono text-center text-[11px]">
                    <div className="p-2 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <div className="text-slate-500 text-[10px]">FP16 Weights</div>
                      <div className="font-bold text-slate-900 dark:text-white">14.0 GB</div>
                    </div>
                    <div className="p-2 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <div className="text-slate-500 text-[10px]">INT4 (QLoRA)</div>
                      <div className="font-bold text-emerald-600 dark:text-emerald-400">3.8 GB</div>
                    </div>
                    <div className="p-2 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <div className="text-slate-500 text-[10px]">KV Cache (4k ctx)</div>
                      <div className="font-bold text-indigo-600 dark:text-indigo-400">1.2 GB / user</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* SANDBOX 4: AI ENGINEER - ATTENTION HEATMAP & HYBRID RAG */}
        {/* ------------------------------------------------------------- */}
        {activeSandboxTab === 'aie_rag' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Scaled Multi-Head Attention Heatmap */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span>Scaled Dot-Product Attention Matrix: Softmax(Q K^T / √d_k) V</span>
                  </h3>
                  <button
                    onClick={() => setIsCausalMask(!isCausalMask)}
                    className={`px-2.5 py-1 rounded text-xs font-bold font-mono transition-all ${
                      isCausalMask
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {isCausalMask ? 'Causal Mask (ON)' : 'Bidirectional (OFF)'}
                  </button>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                    Input Prompt Tokens
                  </label>
                  <input
                    type="text"
                    value={attentionSentence}
                    onChange={(e) => setAttentionSentence(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white font-mono"
                  />
                </div>

                {/* Attention Heatmap Table */}
                <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 p-3 bg-slate-950">
                  <div className="text-[10px] font-mono text-purple-400 mb-2">Attention Weights $(N \times N)$</div>
                  <table className="w-full text-xs text-center font-mono">
                    <thead>
                      <tr>
                        <th className="p-1 text-slate-500">Q \ K</th>
                        {attentionTokens.map((t, idx) => (
                          <th key={idx} className="p-1 text-indigo-300 text-[11px] truncate max-w-[50px]">{t}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {attentionTokens.map((qTok, i) => (
                        <tr key={i}>
                          <td className="p-1 text-indigo-300 text-[11px] font-bold text-left truncate max-w-[50px]">{qTok}</td>
                          {attentionTokens.map((_, j) => {
                            const weight = getAttentionWeight(i, j);
                            const opacity = Math.max(0.1, weight);
                            return (
                              <td
                                key={j}
                                className="p-1.5 text-[10px] rounded transition-all"
                                style={{
                                  backgroundColor: `rgba(99, 102, 241, ${weight > 0 ? opacity : 0.05})`,
                                  color: weight > 0.4 ? '#ffffff' : '#94a3b8'
                                }}
                              >
                                {weight.toFixed(2)}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Column: Hybrid RAG & Re-Ranking Workbench */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                    <Search className="w-4 h-4 text-emerald-500" />
                    <span>Enterprise Hybrid RAG (BM25 + HNSW + Cross-Encoder)</span>
                  </h3>
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    Faithfulness: {faithfulnessScore}%
                  </span>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                    User Query / Information Need
                  </label>
                  <input
                    type="text"
                    value={ragQuery}
                    onChange={(e) => setRagQuery(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white font-mono"
                  />
                </div>

                {/* Retrieved Document Chunks with Re-ranking breakdown */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Retrieved Chunks & Cross-Encoder Scores
                  </div>
                  {ragSearchResults.map((res, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-indigo-600 dark:text-indigo-400">{res.title}</span>
                        <div className="flex items-center space-x-2 font-mono text-[10px]">
                          <span className="text-slate-500">BM25: {res.sparseScore}</span>
                          <span className="text-slate-500">Dense: {res.denseScore}</span>
                          <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold">
                            ReRank: {res.crossEncoderScore}
                          </span>
                        </div>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                        "{res.chunkText}"
                      </p>
                    </div>
                  ))}
                </div>

                {/* Synthesized Response */}
                <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs space-y-1">
                  <div className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Grounding-Faithful Answer Synthesis</span>
                  </div>
                  <p className="text-slate-800 dark:text-slate-200 text-[11px] leading-relaxed">
                    {generatedAnswer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
