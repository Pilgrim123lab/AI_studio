import React, { useState } from 'react';
import { 
  Play, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  Circle, 
  Code2, 
  Cpu, 
  Clock, 
  Award, 
  Search, 
  Filter, 
  ChevronRight, 
  ExternalLink, 
  Lightbulb, 
  Layers, 
  Terminal, 
  HelpCircle, 
  Bookmark, 
  Trash2, 
  Copy, 
  Check, 
  RefreshCw,
  Zap,
  Flame,
  Bot
} from 'lucide-react';
import { VideoTutorial, GeneratedMasterclass, UserProgress } from '../types';
import { CURATED_VIDEO_TUTORIALS } from '../data/tutorialsData';
import { ROADMAP_STAGES } from '../data/roadmapData';
import { saveGeneratedMasterclass, deleteGeneratedMasterclass } from '../utils/storage';

interface TutorialsHubProps {
  progress: UserProgress;
  onCompleteTutorial: (tutorialId: string, xpReward: number) => void;
  onSelectProject?: (projectId: string) => void;
  onSelectRoadmapTopic?: (stageId: string, topicId: string) => void;
  onRefreshProgress?: () => void;
}

export const TutorialsHub: React.FC<TutorialsHubProps> = ({
  progress,
  onCompleteTutorial,
  onSelectRoadmapTopic,
  onRefreshProgress,
}) => {
  const [activeTab, setActiveTab] = useState<'video_curriculum' | 'ai_generator' | 'saved_masterclasses'>('video_curriculum');
  const [selectedTutorial, setSelectedTutorial] = useState<VideoTutorial>(CURATED_VIDEO_TUTORIALS[0]);
  const [selectedStageFilter, setSelectedStageFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // AI Generator state
  const [genTopicQuery, setGenTopicQuery] = useState<string>('');
  const [genTargetLevel, setGenTargetLevel] = useState<string>('Intermediate');
  const [genDataAnalystFocus, setGenDataAnalystFocus] = useState<boolean>(true);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [activeGeneratedClass, setActiveGeneratedClass] = useState<GeneratedMasterclass | null>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [showChallengeSolution, setShowChallengeSolution] = useState<boolean>(false);

  // Quick generation prompts
  const popularTopics = [
    { label: 'Attention Math & Scaled Softmax', query: 'Derive Scaled Dot-Product Attention from first principles and implement in PyTorch' },
    { label: 'Hybrid RAG & Cross-Encoders', query: 'Enterprise Hybrid Search combining Dense Embeddings, BM25 and Cohere Re-ranker' },
    { label: 'vLLM PagedAttention & KV-Cache', query: 'GPU VRAM management, PagedAttention block tables and continuous batching in vLLM' },
    { label: 'Autonomous ReAct Agents', query: 'Building a multi-agent system with dynamic tool execution, memory and self-reflection' },
    { label: 'LoRA & QLoRA Fine-Tuning', query: 'Low-Rank Adaptation math (W0 + B*A) and 4-bit NormalFloat QLoRA on custom dataset' },
    { label: 'Text-to-SQL for Data Analysts', query: 'Building a self-correcting Text-to-SQL AI Agent with schema pruning and dialect validation' }
  ];

  // Filtered tutorials
  const filteredTutorials = CURATED_VIDEO_TUTORIALS.filter((tut) => {
    const matchesStage = selectedStageFilter === 'all' || tut.stageId === selectedStageFilter;
    const matchesSearch = searchQuery === '' || 
      tut.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tut.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tut.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStage && matchesSearch;
  });

  const isCurrentTutorialCompleted = progress.completedTutorialIds?.includes(selectedTutorial.id);

  const handleGenerateMasterclass = async (topicToUse?: string) => {
    const topic = topicToUse || genTopicQuery;
    if (!topic.trim()) return;

    setIsGenerating(true);
    setGenerationError(null);
    setShowChallengeSolution(false);

    try {
      const response = await fetch('/api/mentor/generate-tutorial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicQuery: topic,
          targetLevel: genTargetLevel,
          dataAnalystFocus: genDataAnalystFocus,
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate masterclass.');
      }

      const data: GeneratedMasterclass = await response.json();
      setActiveGeneratedClass(data);
      saveGeneratedMasterclass(data);
      if (onRefreshProgress) onRefreshProgress();
    } catch (err: any) {
      console.error('Error generating masterclass:', err);
      setGenerationError(err.message || 'Failed to generate tutorial. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDeleteSaved = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteGeneratedMasterclass(id);
    if (activeGeneratedClass?.id === id) {
      setActiveGeneratedClass(null);
    }
    if (onRefreshProgress) onRefreshProgress();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Banner */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Interactive Video Masterclasses & AI Tutorial Lab</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Masterclasses & Tutorial Studio
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl">
              Learn through structured video masterclasses, deconstructed code architectures, and an on-demand AI Generator that transforms any complex AI concept into a customized step-by-step masterclass.
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-slate-100 dark:bg-slate-800/80 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="text-right">
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Masterclasses Completed</span>
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                {progress.completedTutorialIds?.length || 0} / {CURATED_VIDEO_TUTORIALS.length}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-base shadow-md">
              <Award className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800 mb-8 pb-3">
        <button
          onClick={() => setActiveTab('video_curriculum')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'video_curriculum'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
          }`}
        >
          <Play className="w-4 h-4" />
          <span>Curated Video Masterclasses</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-100 font-mono">
            {CURATED_VIDEO_TUTORIALS.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('ai_generator')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'ai_generator'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>AI Masterclass Generator</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-300 font-bold">
            Gemini
          </span>
        </button>

        <button
          onClick={() => setActiveTab('saved_masterclasses')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'saved_masterclasses'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Saved Custom Masterclasses</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono">
            {progress.savedTutorials?.length || 0}
          </span>
        </button>
      </div>

      {/* TAB 1: CURATED VIDEO MASTERCLASSES */}
      {activeTab === 'video_curriculum' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Video List & Filters (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Search & Filter Bar */}
            <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search masterclasses or instructors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Stage Filter */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
                  Filter By Curriculum Stage
                </span>
                <select
                  value={selectedStageFilter}
                  onChange={(e) => setSelectedStageFilter(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="all">All Curriculum Stages</option>
                  {ROADMAP_STAGES.map((s) => (
                    <option key={s.id} value={s.id}>
                      Stage {s.stageNumber}: {s.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Video Cards List */}
            <div className="space-y-3 max-h-[700px] overflow-y-auto pr-1">
              {filteredTutorials.map((tut) => {
                const isSelected = selectedTutorial.id === tut.id;
                const isDone = progress.completedTutorialIds?.includes(tut.id);

                return (
                  <div
                    key={tut.id}
                    onClick={() => setSelectedTutorial(tut)}
                    className={`p-4 rounded-2xl border text-left cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 shadow-md ring-1 ring-indigo-500'
                        : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                        {tut.category}
                      </span>
                      {isDone ? (
                        <span className="flex items-center space-x-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5 fill-emerald-500/20" />
                          <span>Completed</span>
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium text-amber-500 flex items-center space-x-1">
                          <Award className="w-3.5 h-3.5" />
                          <span>+{tut.xpReward} XP</span>
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 mb-1.5">
                      {tut.title}
                    </h4>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
                      {tut.summary}
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-700/60 pt-2">
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        {tut.instructor}
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{tut.durationMinutes} mins</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Interactive Video Player & Deep Dive Notes (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Embedded YouTube / Lecture Player */}
            <div className="bg-slate-950 rounded-2xl overflow-hidden shadow-xl border border-slate-800">
              <div className="aspect-video w-full bg-black relative">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${selectedTutorial.youtubeId}?rel=0&modestbranding=1`}
                  title={selectedTutorial.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>

              {/* Player Bottom Control Bar */}
              <div className="p-4 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-white">
                <div>
                  <h3 className="text-base font-bold text-white">{selectedTutorial.title}</h3>
                  <p className="text-xs text-slate-400">
                    Presented by <span className="text-indigo-400 font-semibold">{selectedTutorial.instructor}</span> • {selectedTutorial.instructorRole}
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => onCompleteTutorial(selectedTutorial.id, selectedTutorial.xpReward)}
                    disabled={isCurrentTutorialCompleted}
                    className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      isCurrentTutorialCompleted
                        ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 cursor-default'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isCurrentTutorialCompleted ? 'Completed (+XP Earned)' : `Mark Completed (+${selectedTutorial.xpReward} XP)`}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Data Analyst Bridge Callout */}
            <div className="bg-gradient-to-r from-indigo-500/10 via-sky-500/10 to-transparent border-l-4 border-indigo-500 p-4 rounded-r-2xl text-slate-800 dark:text-slate-200">
              <div className="flex items-center space-x-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
                <Lightbulb className="w-4 h-4" />
                <span>The Data Analyst Mental Bridge</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {selectedTutorial.analystBridgeSummary}
              </p>
            </div>

            {/* Key Timestamps & Chapters */}
            <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center space-x-2">
                <Clock className="w-4 h-4 text-indigo-500" />
                <span>Masterclass Chapters & Key Timestamps</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedTutorial.keyTimestamps.map((item, idx) => (
                  <div 
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/60 text-xs"
                  >
                    <div className="flex items-center space-x-2 font-mono text-indigo-600 dark:text-indigo-400 font-bold mb-1">
                      <span>[{item.timestamp}]</span>
                      <span className="text-slate-900 dark:text-slate-200 font-sans font-semibold line-clamp-1">{item.title}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-normal">
                      {item.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Synchronized Code Walkthrough */}
            {selectedTutorial.codeWalkthrough && (
              <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 text-slate-100 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-bold text-white">
                      {selectedTutorial.codeWalkthrough.title}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopyCode(selectedTutorial.codeWalkthrough!.code)}
                    className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 hover:text-white transition-colors"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
                  </button>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl font-mono text-xs text-emerald-300 overflow-x-auto border border-slate-800">
                  <pre>{selectedTutorial.codeWalkthrough.code}</pre>
                </div>

                <p className="text-xs text-slate-400 italic">
                  💡 {selectedTutorial.codeWalkthrough.explanation}
                </p>
              </div>
            )}

            {/* Key Takeaways */}
            <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Architectural Takeaways & Staff Best Practices</span>
              </h4>
              <ul className="space-y-2">
                {selectedTutorial.takeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-xs text-slate-700 dark:text-slate-300">
                    <span className="text-emerald-500 font-bold mt-0.5">•</span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: AI MASTERCLASS GENERATOR */}
      {activeTab === 'ai_generator' && (
        <div className="space-y-8">
          {/* Generator Input Section */}
          <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="max-w-3xl mb-6">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>On-Demand AI Systems & Engineering Masterclass Generator</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Generate a Custom Step-by-Step AI Tutorial on Any Topic
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                Enter any AI engineering concept, paper, or architecture. Gemini will generate a rigorous tutorial complete with mathematical intuition, tabular-to-vector analogies, runnable PyTorch code steps, ASCII architecture, and interview prep questions.
              </p>
            </div>

            {/* Popular 1-Click Prompts */}
            <div className="mb-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                Popular Masterclass Blueprints:
              </span>
              <div className="flex flex-wrap gap-2">
                {popularTopics.map((pt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setGenTopicQuery(pt.query);
                      handleGenerateMasterclass(pt.query);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700/70 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200 dark:border-slate-600 transition-all flex items-center space-x-1.5"
                  >
                    <Zap className="w-3 h-3 text-amber-400" />
                    <span>{pt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Input Form */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                  Masterclass Topic or Problem Statement
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    placeholder="e.g. FlashAttention-3 CUDA kernel mechanics, QLoRA 4-bit fine-tuning, Speculative Decoding in vLLM..."
                    value={genTopicQuery}
                    onChange={(e) => setGenTopicQuery(e.target.value)}
                    className="flex-1 px-4 py-3 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    onClick={() => handleGenerateMasterclass()}
                    disabled={isGenerating || !genTopicQuery.trim()}
                    className={`px-6 py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center space-x-2 transition-all ${
                      isGenerating || !genTopicQuery.trim()
                        ? 'bg-slate-400 dark:bg-slate-700 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/25'
                    }`}
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Generating Masterclass...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-amber-300" />
                        <span>Generate Masterclass</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Target Level & Analyst Toggle */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100 dark:border-slate-700/60 text-xs">
                <div className="flex items-center space-x-4">
                  <span className="text-slate-500 dark:text-slate-400 font-semibold">Target Depth:</span>
                  {(['Foundational', 'Intermediate', 'Advanced', 'Staff Architect'] as const).map((lvl) => (
                    <label key={lvl} className="flex items-center space-x-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="genTargetLevel"
                        value={lvl}
                        checked={genTargetLevel === lvl}
                        onChange={() => setGenTargetLevel(lvl)}
                        className="text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-slate-700 dark:text-slate-300 font-medium">{lvl}</span>
                    </label>
                  ))}
                </div>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={genDataAnalystFocus}
                    onChange={(e) => setGenDataAnalystFocus(e.target.checked)}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-slate-700 dark:text-slate-300 font-medium">
                    Bridge to Data Analyst Knowledge (SQL / Pandas / BI)
                  </span>
                </label>
              </div>
            </div>

            {generationError && (
              <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs">
                {generationError}
              </div>
            )}
          </div>

          {/* Generated Masterclass Output Display */}
          {activeGeneratedClass && (
            <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-indigo-500/30 shadow-xl space-y-8 animate-fadeIn">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-700 pb-6">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 uppercase tracking-wider">
                      {activeGeneratedClass.targetLevel} Masterclass
                    </span>
                    <span className="text-xs text-slate-400">
                      Generated {new Date(activeGeneratedClass.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                    {activeGeneratedClass.title}
                  </h2>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      saveGeneratedMasterclass(activeGeneratedClass);
                      if (onRefreshProgress) onRefreshProgress();
                    }}
                    className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                  >
                    <Bookmark className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Saved in Masterclass Hub</span>
                  </button>
                </div>
              </div>

              {/* 1. Data Analyst Mental Anchor */}
              <div className="bg-gradient-to-r from-indigo-500/10 via-sky-500/10 to-transparent border-l-4 border-indigo-500 p-5 rounded-r-2xl text-slate-800 dark:text-slate-200">
                <div className="flex items-center space-x-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1.5">
                  <Lightbulb className="w-4 h-4" />
                  <span>The Data Analyst Mental Anchor</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  {activeGeneratedClass.analystMentalAnchor}
                </p>
              </div>

              {/* 2. Mathematical Intuition & Theory */}
              <div className="bg-slate-50 dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center space-x-2">
                  <Cpu className="w-4 h-4 text-indigo-500" />
                  <span>Mathematical Intuition & First Principles</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-mono whitespace-pre-wrap">
                  {activeGeneratedClass.theoreticalMathIntuition}
                </p>
              </div>

              {/* 3. Architecture Flow Diagram */}
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-slate-100">
                <h3 className="text-sm font-bold text-white mb-3 flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-sky-400" />
                  <span>System Architecture & Tensor Flow</span>
                </h3>
                <div className="font-mono text-xs text-sky-300 bg-slate-900/80 p-4 rounded-xl overflow-x-auto border border-slate-800/80">
                  <pre>{activeGeneratedClass.architectureDiagram}</pre>
                </div>
              </div>

              {/* 4. Step-by-Step Code Walkthrough */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                  <Code2 className="w-5 h-5 text-emerald-500" />
                  <span>Step-by-Step Production Implementation</span>
                </h3>

                <div className="space-y-4">
                  {activeGeneratedClass.stepByStepCodeGuide.map((step, idx) => (
                    <div key={idx} className="bg-slate-900 p-5 rounded-2xl border border-slate-800 text-slate-100 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                            {step.stepNumber}
                          </span>
                          <span className="text-sm font-bold text-white">{step.stepTitle}</span>
                        </div>
                        <button
                          onClick={() => handleCopyCode(step.codeSnippet)}
                          className="flex items-center space-x-1 text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700"
                        >
                          <Copy className="w-3 h-3" />
                          <span>Copy Step</span>
                        </button>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        {step.explanation}
                      </p>

                      <div className="bg-slate-950 p-4 rounded-xl font-mono text-xs text-emerald-300 overflow-x-auto border border-slate-800">
                        <pre>{step.codeSnippet}</pre>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. Production Pitfalls & Traps */}
              <div className="bg-amber-500/5 dark:bg-amber-950/20 border border-amber-500/30 p-5 rounded-2xl">
                <h3 className="text-sm font-bold text-amber-800 dark:text-amber-300 mb-3 flex items-center space-x-2">
                  <HelpCircle className="w-4 h-4 text-amber-500" />
                  <span>Production Pitfalls & Latency Traps to Avoid</span>
                </h3>
                <ul className="space-y-2">
                  {activeGeneratedClass.productionPitfalls.map((pitfall, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-xs text-slate-700 dark:text-slate-300">
                      <span className="text-amber-500 font-bold mt-0.5">•</span>
                      <span>{pitfall}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 6. Technical Interview Questions */}
              <div className="bg-white dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                  <Award className="w-4 h-4 text-indigo-500" />
                  <span>Staff AI Engineer Interview Questions & Answers</span>
                </h3>
                <div className="space-y-3">
                  {activeGeneratedClass.interviewQuestions.map((iq, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs space-y-2">
                      <div className="font-bold text-slate-900 dark:text-white flex items-start space-x-2">
                        <span className="text-indigo-500 font-mono">Q{idx + 1}:</span>
                        <span>{iq.question}</span>
                      </div>
                      <div className="pl-6 text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed border-l-2 border-indigo-500/40">
                        <span className="font-semibold text-slate-800 dark:text-slate-200 block mb-0.5">Principal Answer:</span>
                        {iq.idealAnswer}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 7. Hands-on Practice Challenge */}
              {activeGeneratedClass.practiceChallenge && (
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-white space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Terminal className="w-5 h-5 text-emerald-400" />
                      <span className="text-sm font-bold">Interactive Sandbox Coding Challenge</span>
                    </div>
                    <button
                      onClick={() => setShowChallengeSolution(!showChallengeSolution)}
                      className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-indigo-300 font-semibold"
                    >
                      {showChallengeSolution ? 'Hide Reference Solution' : 'Reveal Solution'}
                    </button>
                  </div>

                  <p className="text-xs text-slate-300">
                    {activeGeneratedClass.practiceChallenge.prompt}
                  </p>

                  <div className="bg-slate-950 p-4 rounded-xl font-mono text-xs text-emerald-300 overflow-x-auto border border-slate-800">
                    <pre>{activeGeneratedClass.practiceChallenge.starterCode}</pre>
                  </div>

                  {showChallengeSolution && (
                    <div className="bg-emerald-950/40 p-4 rounded-xl font-mono text-xs text-emerald-200 overflow-x-auto border border-emerald-500/30 animate-fadeIn">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                        Verified Working Solution:
                      </span>
                      <pre>{activeGeneratedClass.practiceChallenge.solutionCode}</pre>
                    </div>
                  )}

                  <p className="text-[11px] text-slate-400">
                    💡 <span className="font-semibold">Validation tip:</span> {activeGeneratedClass.practiceChallenge.testValidationTip}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: SAVED MASTERCLASSES */}
      {activeTab === 'saved_masterclasses' && (
        <div className="space-y-6">
          {(!progress.savedTutorials || progress.savedTutorials.length === 0) ? (
            <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-700">
              <Bookmark className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                No Custom Masterclasses Saved Yet
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-4">
                Use the AI Masterclass Generator tab to generate deep-dive tutorials on any topic and save them here for offline review.
              </p>
              <button
                onClick={() => setActiveTab('ai_generator')}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold shadow-md"
              >
                Generate First Masterclass
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {progress.savedTutorials.map((saved) => (
                <div
                  key={saved.id}
                  onClick={() => {
                    setActiveGeneratedClass(saved);
                    setActiveTab('ai_generator');
                  }}
                  className="bg-white dark:bg-slate-800/90 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-indigo-500 shadow-sm cursor-pointer transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 uppercase">
                        {saved.targetLevel}
                      </span>
                      <button
                        onClick={(e) => handleDeleteSaved(saved.id, e)}
                        className="p-1 text-slate-400 hover:text-red-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 mb-2">
                      {saved.title}
                    </h4>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 mb-4">
                      {saved.analystMentalAnchor}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold border-t border-slate-100 dark:border-slate-700/60 pt-3">
                    <span>Open Masterclass</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
