import React, { useState } from 'react';
import { 
  Cpu, 
  BookOpen, 
  Sparkles, 
  Calculator, 
  ExternalLink, 
  Layers, 
  Server, 
  ShieldAlert, 
  Zap, 
  Bot,
  ArrowRight
} from 'lucide-react';
import { SYSTEM_DESIGN_GUIDES, AI_PAPER_DIGESTS, AIPaperDigest } from '../data/systemDesignData';
import { SystemDesignGuide } from '../types';

export const SystemDesignLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'calculator' | 'papers' | 'system_guides' | 'copilot'>('calculator');

  // VRAM Calculator state
  const [modelParamsB, setModelParamsB] = useState<number>(70); // 70B
  const [quantBits, setQuantBits] = useState<number>(16); // 16-bit, 8-bit, 4-bit
  const [batchSize, setBatchSize] = useState<number>(32);
  const [contextTokens, setContextTokens] = useState<number>(8192);
  const [numLayers, setNumLayers] = useState<number>(80);
  const [hiddenDim, setHiddenDim] = useState<number>(8192);

  // System Design Copilot state
  const [problemPrompt, setProblemPrompt] = useState<string>('Design a high-concurrency real-time Multimodal Product Search engine for 50M products with <50ms p99 latency.');
  const [isGeneratingDesign, setIsGeneratingDesign] = useState<boolean>(false);
  const [generatedDesign, setGeneratedDesign] = useState<any | null>(null);

  // Selected Paper
  const [selectedPaper, setSelectedPaper] = useState<AIPaperDigest>(AI_PAPER_DIGESTS[0]);

  // VRAM Calculations
  // Model weights (GB) = (Params in Billions * (Bits / 8)) * 1.05
  const weightVRAM_GB = (modelParamsB * (quantBits / 8)) * 1.05;
  // KV Cache (GB) = 2 * num_layers * hidden_dim * contextTokens * batchSize * 2 / 10^9
  const kvCacheVRAM_GB = (2 * numLayers * hiddenDim * contextTokens * batchSize * 2) / 1_000_000_000;
  const totalVRAM_GB = Math.round((weightVRAM_GB + kvCacheVRAM_GB) * 10) / 10;

  // Hardware Recommendation
  let recommendedGPU = '1x NVIDIA A10G (24GB)';
  if (totalVRAM_GB > 320) {
    recommendedGPU = `${Math.ceil(totalVRAM_GB / 80)}x NVIDIA H100 SXM (80GB) Cluster with Tensor Parallelism = 8`;
  } else if (totalVRAM_GB > 80) {
    recommendedGPU = `${Math.ceil(totalVRAM_GB / 80)}x NVIDIA A100 / H100 (80GB) with Pipeline & Tensor Parallelism`;
  } else if (totalVRAM_GB > 48) {
    recommendedGPU = '1x NVIDIA H100 (80GB PCIe)';
  } else if (totalVRAM_GB > 24) {
    recommendedGPU = '2x NVIDIA A10G (24GB) or 1x NVIDIA A6000 (48GB)';
  }

  const handleGenerateSystemDesign = async () => {
    if (!problemPrompt.trim()) return;
    setIsGeneratingDesign(true);
    try {
      const res = await fetch('/api/mentor/system-design', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problemStatement: problemPrompt }),
      });
      const data = await res.json();
      setGeneratedDesign(data);
    } catch (err) {
      console.error('System design generation error:', err);
    } finally {
      setIsGeneratingDesign(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold mb-2">
          <Cpu className="w-3.5 h-3.5" />
          <span>Infrastructure & Research Paper Mastery</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          AI Systems Architecture & SOTA Research Lab
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl">
          Master the math of LLM inference latency, compute budget planning, KV-Cache memory formulas, and foundational research papers from Google DeepMind and Stanford.
        </p>
      </div>

      {/* Lab Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-700 mb-8 space-x-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('calculator')}
          className={`py-3 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center space-x-2 ${
            activeTab === 'calculator'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>GPU VRAM & KV-Cache Sizing Calculator</span>
        </button>

        <button
          onClick={() => setActiveTab('papers')}
          className={`py-3 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center space-x-2 ${
            activeTab === 'papers'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>SOTA AI Research Paper Digests</span>
        </button>

        <button
          onClick={() => setActiveTab('system_guides')}
          className={`py-3 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center space-x-2 ${
            activeTab === 'system_guides'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Enterprise System Guides</span>
        </button>

        <button
          onClick={() => setActiveTab('copilot')}
          className={`py-3 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center space-x-2 ${
            activeTab === 'copilot'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>AI Architecture Copilot</span>
        </button>
      </div>

      {/* Tab 1: Interactive GPU VRAM & KV Cache Calculator */}
      {activeTab === 'calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-5 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Model & Serving Parameters
            </h3>

            {/* Model Size */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Model Parameters (Billion)</label>
                <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{modelParamsB} Billion (B)</span>
              </div>
              <input
                type="range"
                min={1}
                max={120}
                step={1}
                value={modelParamsB}
                onChange={(e) => setModelParamsB(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>1B (Edge/Mobile)</span>
                <span>8B (Llama-3-8B)</span>
                <span>70B (Enterprise)</span>
                <span>120B+ (MoE)</span>
              </div>
            </div>

            {/* Quantization */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                Quantization Precision
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'FP16 (16-bit)', val: 16, note: 'Full fidelity' },
                  { label: 'INT8 (8-bit)', val: 8, note: '50% VRAM drop' },
                  { label: 'INT4 / AWQ (4-bit)', val: 4, note: '75% VRAM drop' },
                ].map((q) => (
                  <button
                    key={q.val}
                    onClick={() => setQuantBits(q.val)}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      quantBits === q.val
                        ? 'bg-indigo-600 text-white border-indigo-600 font-bold shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="block">{q.label}</span>
                    <span className={`text-[10px] ${quantBits === q.val ? 'text-indigo-200' : 'text-slate-400'}`}>{q.note}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Batch Size */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Concurrent Batch Size (Requests)</label>
                <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{batchSize} Req</span>
              </div>
              <input
                type="range"
                min={1}
                max={128}
                step={1}
                value={batchSize}
                onChange={(e) => setBatchSize(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            {/* Context Window */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Context Window Length (Tokens)</label>
                <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{contextTokens.toLocaleString()} tokens</span>
              </div>
              <input
                type="range"
                min={1024}
                max={32768}
                step={1024}
                value={contextTokens}
                onChange={(e) => setContextTokens(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Sizing Output Display */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-slate-900 text-white rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 block mb-1">
                  Required GPU VRAM Memory
                </span>
                <div className="text-4xl font-extrabold tracking-tight text-white flex items-baseline space-x-2">
                  <span>{totalVRAM_GB} GB</span>
                  <span className="text-xs text-slate-400 font-normal">Total GPU RAM</span>
                </div>
              </div>

              {/* Memory Breakdown */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Model Weights</span>
                  <span className="text-lg font-bold text-emerald-400">{Math.round(weightVRAM_GB * 10) / 10} GB</span>
                  <p className="text-[10px] text-slate-500 mt-0.5">Parameters &times; precision</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">KV-Cache & Activations</span>
                  <span className="text-lg font-bold text-sky-400">{Math.round(kvCacheVRAM_GB * 10) / 10} GB</span>
                  <p className="text-[10px] text-slate-500 mt-0.5">Batch &times; SeqLen dynamic buffer</p>
                </div>
              </div>

              {/* Hardware Recommendation */}
              <div className="p-4 rounded-xl bg-indigo-950/50 border border-indigo-500/30">
                <div className="flex items-center space-x-2 text-indigo-300 text-xs font-bold mb-1">
                  <Server className="w-4 h-4" />
                  <span>Recommended Production Hardware:</span>
                </div>
                <p className="text-sm font-bold text-white">{recommendedGPU}</p>
              </div>

              {/* Data Analyst Translation Formula */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                <span className="font-bold text-amber-400 block text-[11px] uppercase">
                  The Mathematical Memory Formula:
                </span>
                <p className="text-slate-300 font-mono text-[11px] leading-relaxed">
                  Total VRAM = (P &times; b/8 &times; 1.05) + (2 &times; n_layers &times; d_model &times; L_seq &times; B &times; 2)
                </p>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  In SQL terms: think of model weights as a static indexed table in RAM, and the KV-Cache as a temporary scratchpad CTE that grows with concurrent queries and join lengths!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: SOTA AI Research Paper Digests */}
      {activeTab === 'papers' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
              Foundational AI Papers ({AI_PAPER_DIGESTS.length})
            </h3>
            {AI_PAPER_DIGESTS.map((paper) => {
              const isSelected = paper.id === selectedPaper.id;
              return (
                <button
                  key={paper.id}
                  onClick={() => setSelectedPaper(paper)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 text-slate-900 dark:text-white shadow-sm'
                      : 'bg-white dark:bg-slate-800/70 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-slate-400">{paper.year} &bull; {paper.authors}</span>
                  </div>
                  <h4 className="text-xs font-bold leading-snug line-clamp-1">{paper.title}</h4>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-8 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-6 shadow-sm">
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 mb-1">
                <span>{selectedPaper.authors}</span>
                <span>&bull;</span>
                <span>{selectedPaper.year}</span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                {selectedPaper.title}
              </h2>
              <a
                href={selectedPaper.paperUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1 text-xs text-indigo-600 dark:text-indigo-400 hover:underline mt-1"
              >
                <span>Read Original arXiv Paper</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Core Architectural Insight
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {selectedPaper.coreInsight}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                Data Analyst Takeaway
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {selectedPaper.dataAnalystTakeaway}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                Significance & Legacy
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {selectedPaper.significance}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: System Guides */}
      {activeTab === 'system_guides' && (
        <div className="space-y-6">
          {SYSTEM_DESIGN_GUIDES.map((guide) => (
            <div key={guide.id} className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-4 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
                <div>
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                    {guide.category}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{guide.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{guide.subtitle}</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {guide.summary}
              </p>

              {/* Formulas */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Key Latency & Sizing Formulas
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {guide.keyFormulas.map((f, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-900 text-slate-100 border border-slate-800 text-xs">
                      <span className="font-bold text-indigo-300 block mb-1">{f.name}</span>
                      <code className="font-mono text-emerald-400 block mb-1">{f.formula}</code>
                      <p className="text-[11px] text-slate-400">{f.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tradeoffs */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Tradeoff Analysis
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {guide.tradeoffAnalysis.map((t, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-xs">
                      <span className="font-bold text-slate-900 dark:text-white block mb-1">{t.dimension}</span>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{t.recommendation}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: AI System Design Copilot */}
      {activeTab === 'copilot' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-4 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              AI System Design Copilot (Principal Architect)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Input any AI problem statement, latency SLA, or scale requirements to generate a complete enterprise system design breakdown.
            </p>

            <div className="space-y-3">
              <textarea
                value={problemPrompt}
                onChange={(e) => setProblemPrompt(e.target.value)}
                rows={3}
                className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-indigo-500"
                placeholder="e.g. Design a real-time Text-to-SQL copilot for 100,000 queries per second with schema privacy..."
              />

              <div className="flex justify-end">
                <button
                  onClick={handleGenerateSystemDesign}
                  disabled={isGeneratingDesign}
                  className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md disabled:opacity-50 transition-all"
                >
                  {isGeneratingDesign ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Generating Blueprint...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Generate Enterprise Architecture</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {generatedDesign && (
            <div className="bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 p-6 space-y-6 animate-fadeIn">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 block mb-1">
                  Architecture Blueprint
                </span>
                <h3 className="text-xl font-extrabold text-white">{generatedDesign.architectureName}</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{generatedDesign.executiveSummary}</p>
              </div>

              {/* Components */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  System Components
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {generatedDesign.components?.map((c: any, i: number) => (
                    <div key={i} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-xs text-white">{c.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-900/40 text-indigo-300 font-mono">{c.tech}</span>
                      </div>
                      <p className="text-[11px] text-slate-400">{c.role}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sizing & Math */}
              {generatedDesign.vramAndComputeSizing && (
                <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs">
                  <span className="font-bold text-indigo-300 block mb-1">Compute & VRAM Sizing Calculation:</span>
                  <p className="text-slate-200">{generatedDesign.vramAndComputeSizing}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
