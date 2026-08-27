import React, { useState } from 'react';
import { 
  Layers, 
  CheckCircle2, 
  Circle, 
  Play, 
  Sparkles, 
  FileCode, 
  Database, 
  ShieldCheck, 
  Award, 
  Terminal, 
  RotateCcw,
  ArrowRight,
  ExternalLink,
  Bot,
  Flame,
  Check
} from 'lucide-react';
import { REAL_WORLD_PROJECTS } from '../data/projectsData';
import { RealWorldProject, ProjectMilestone, UserProgress, AICodeReviewResponse } from '../types';

interface ProjectsStudioProps {
  progress: UserProgress;
  onCompleteMilestone: (projectId: string, milestoneId: string, xpReward: number) => void;
}

export const ProjectsStudio: React.FC<ProjectsStudioProps> = ({
  progress,
  onCompleteMilestone,
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(REAL_WORLD_PROJECTS[0].id);
  const [selectedMilestoneIndex, setSelectedMilestoneIndex] = useState<number>(0);
  const [userCode, setUserCode] = useState<string>('');
  
  // Review state
  const [isReviewing, setIsReviewing] = useState<boolean>(false);
  const [reviewResult, setReviewResult] = useState<AICodeReviewResponse | null>(null);
  const [activeTab, setActiveTab] = useState<'blueprint' | 'workspace' | 'dataset'>('blueprint');

  const currentProject = REAL_WORLD_PROJECTS.find((p) => p.id === selectedProjectId) || REAL_WORLD_PROJECTS[0];
  const currentMilestone = currentProject.milestones[selectedMilestoneIndex] || currentProject.milestones[0];

  const completedMilestonesForProj = progress.completedProjectMilestones[currentProject.id] || [];
  const isCurrentMilestoneDone = completedMilestonesForProj.includes(currentMilestone?.id);

  const handleSelectProject = (project: RealWorldProject) => {
    setSelectedProjectId(project.id);
    setSelectedMilestoneIndex(0);
    setUserCode(project.milestones[0]?.starterCode || '');
    setReviewResult(null);
  };

  const handleSelectMilestone = (idx: number) => {
    setSelectedMilestoneIndex(idx);
    setUserCode(currentProject.milestones[idx]?.starterCode || '');
    setReviewResult(null);
    setActiveTab('workspace');
  };

  // Run AI Code Review via Gemini backend
  const handleRunAICodeReview = async () => {
    if (!userCode.trim()) return;
    setIsReviewing(true);
    try {
      const response = await fetch('/api/mentor/review-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userCode,
          taskTitle: `${currentProject.title} - ${currentMilestone.title}`,
          instructions: currentMilestone.description,
          expectedCriteria: currentMilestone.validationCriteria,
        }),
      });
      const data: AICodeReviewResponse = await response.json();
      setReviewResult(data);

      if (data.scoreOutOf100 >= 70 && !isCurrentMilestoneDone) {
        onCompleteMilestone(currentProject.id, currentMilestone.id, Math.round(currentProject.xpReward / currentProject.milestones.length));
      }
    } catch (err) {
      console.error('Code review error:', err);
    } finally {
      setIsReviewing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Studio Header */}
      <div className="mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold mb-2">
          <Layers className="w-3.5 h-3.5" />
          <span>Flagship Enterprise AI Systems Studio</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Real-World AI Engineering Portfolio Projects
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl">
          Build end-to-end production AI systems designed for Wall Street finance, global e-commerce, automated SQL analytics, multimodal vector search, and high-throughput vLLM serving clusters.
        </p>
      </div>

      {/* Project Selector Cards (Horizontal Carousel) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {REAL_WORLD_PROJECTS.map((proj) => {
          const isSelected = proj.id === selectedProjectId;
          const completedCount = (progress.completedProjectMilestones[proj.id] || []).length;
          const isDone = completedCount === proj.milestones.length && proj.milestones.length > 0;

          return (
            <button
              key={proj.id}
              onClick={() => handleSelectProject(proj)}
              className={`p-4 rounded-2xl text-left border transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-900 text-white border-indigo-500 shadow-lg shadow-indigo-500/10 ring-2 ring-indigo-500/30'
                  : 'bg-white dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-indigo-500/30 text-indigo-300 border border-indigo-500/40' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                    {proj.category}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-500 font-mono">
                    +{proj.xpReward} XP
                  </span>
                </div>
                <h3 className="text-sm font-bold leading-snug mb-1.5 line-clamp-2">
                  {proj.title}
                </h3>
                <p className={`text-xs line-clamp-2 leading-relaxed mb-3 ${isSelected ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'}`}>
                  {proj.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-700/40 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1.5">
                  <span className="text-[11px] font-mono text-slate-400">
                    {completedCount}/{proj.milestones.length} Milestones
                  </span>
                </div>
                {isDone ? (
                  <span className="flex items-center space-x-1 text-emerald-400 font-bold text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Completed</span>
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-indigo-400 flex items-center space-x-1">
                    <span>Build</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Project Workspace */}
      <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        {/* Project Header Bar */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900/50">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
                <span>{currentProject.category}</span>
                <span>&bull;</span>
                <span>Level: {currentProject.level}</span>
                <span>&bull;</span>
                <span>Est. {currentProject.estimatedHours} Hours</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {currentProject.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-4xl">
                {currentProject.businessScenario}
              </p>
            </div>

            {/* Tech Stack Chips */}
            <div className="flex flex-wrap gap-1.5 max-w-md">
              {currentProject.techStack.map((tech, i) => (
                <span key={i} className="text-[10px] px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Analyst Advantage Box */}
          <div className="mt-4 p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 text-xs">
            <span className="font-bold text-amber-800 dark:text-amber-400 block mb-0.5">
              Why You Excel At This (Data Analyst Advantage):
            </span>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{currentProject.analystAdvantage}</p>
          </div>
        </div>

        {/* Navigation Tabs (Blueprint, Code Workspace, Dataset Schema) */}
        <div className="flex border-b border-slate-200 dark:border-slate-700 px-6 bg-slate-50/30 dark:bg-slate-900/30">
          <button
            onClick={() => setActiveTab('blueprint')}
            className={`py-3.5 px-4 text-xs font-semibold border-b-2 transition-colors flex items-center space-x-2 ${
              activeTab === 'blueprint'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Architecture Blueprint</span>
          </button>
          <button
            onClick={() => setActiveTab('workspace')}
            className={`py-3.5 px-4 text-xs font-semibold border-b-2 transition-colors flex items-center space-x-2 ${
              activeTab === 'workspace'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>Milestone Code Workspace</span>
          </button>
          <button
            onClick={() => setActiveTab('dataset')}
            className={`py-3.5 px-4 text-xs font-semibold border-b-2 transition-colors flex items-center space-x-2 ${
              activeTab === 'dataset'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Real-World Dataset Specs</span>
          </button>
        </div>

        {/* Tab 1: Architecture Blueprint */}
        {activeTab === 'blueprint' && (
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                System Topology & Data Flow
              </h3>
              <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto leading-relaxed shadow-inner">
                <pre>{currentProject.architectureDiagram}</pre>
              </div>
            </div>

            {/* Architecture Components Breakdown */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                Component Breakdown
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentProject.architectureComponents.map((comp, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">{comp.name}</h4>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 font-mono">
                        {comp.tech}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400">{comp.role}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Portfolio Bullet Points for Resume */}
            <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800/40">
              <h4 className="text-xs font-bold text-indigo-900 dark:text-indigo-300 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Verified Global Expert Resume Bullets (Ready for GitHub/LinkedIn)</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {currentProject.portfolioHighlights.map((hl, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-indigo-500 font-bold">&bull;</span>
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveTab('workspace')}
                className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md transition-all"
              >
                <span>Proceed to Milestone 1 Implementation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Milestone Code Workspace */}
        {activeTab === 'workspace' && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Milestone Selector List */}
              <div className="lg:col-span-4 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Project Milestones ({currentProject.milestones.length})
                </h4>
                {currentProject.milestones.map((ms, idx) => {
                  const isSelected = idx === selectedMilestoneIndex;
                  const isDone = completedMilestonesForProj.includes(ms.id);

                  return (
                    <button
                      key={ms.id}
                      onClick={() => handleSelectMilestone(idx)}
                      className={`w-full text-left p-3 rounded-xl border transition-all flex items-start justify-between ${
                        isSelected
                          ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 text-slate-900 dark:text-white'
                          : 'bg-white dark:bg-slate-800/70 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start space-x-2.5">
                        <div className="mt-0.5">
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          ) : (
                            <Circle className={`w-4 h-4 shrink-0 ${isSelected ? 'text-indigo-500' : 'text-slate-400'}`} />
                          )}
                        </div>
                        <div>
                          <span className="text-xs font-bold block">{ms.title}</span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">{ms.description}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}

                {/* Milestone Task Checklist */}
                {currentMilestone && (
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-2 mt-4">
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                      Tasks to Complete:
                    </h5>
                    <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                      {currentMilestone.tasks.map((t, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <Check className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Code Editor & AI Review Studio */}
              <div className="lg:col-span-8 space-y-4">
                <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
                  <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span>Python Workspace: {currentMilestone.title}</span>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setUserCode(currentMilestone.starterCode)}
                        className="text-[11px] text-slate-400 hover:text-white flex items-center space-x-1"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Reset Code</span>
                      </button>
                      <button
                        onClick={() => setUserCode(currentMilestone.solutionCode)}
                        className="text-[11px] text-indigo-400 hover:text-indigo-300 font-semibold"
                      >
                        Load Reference Code
                      </button>
                    </div>
                  </div>
                  <textarea
                    value={userCode || currentMilestone.starterCode}
                    onChange={(e) => setUserCode(e.target.value)}
                    rows={15}
                    className="w-full p-4 bg-slate-950 font-mono text-xs text-emerald-400 outline-none resize-y"
                    placeholder="Write your production-grade Python implementation here..."
                  />
                </div>

                {/* Action Button: AI Code Review */}
                <div className="flex items-center justify-between">
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Submits to AI Senior Staff Reviewer for instant evaluation.
                  </div>
                  <button
                    onClick={handleRunAICodeReview}
                    disabled={isReviewing}
                    className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 text-white text-xs font-bold shadow-md disabled:opacity-50 transition-all"
                  >
                    {isReviewing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Senior Architect Reviewing...</span>
                      </>
                    ) : (
                      <>
                        <Bot className="w-4 h-4" />
                        <span>Request Senior Staff Code Review</span>
                      </>
                    )}
                  </button>
                </div>

                {/* AI Review Result Drawer */}
                {reviewResult && (
                  <div className="p-5 rounded-2xl bg-slate-900 border border-slate-700 space-y-4 text-slate-100 animate-fadeIn">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg ${
                          reviewResult.scoreOutOf100 >= 80 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        }`}>
                          {reviewResult.scoreOutOf100}
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Verdict</span>
                          <span className="text-sm font-extrabold text-white">{reviewResult.verdict}</span>
                        </div>
                      </div>
                      {reviewResult.scoreOutOf100 >= 70 && (
                        <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/30">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Milestone Verified</span>
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed font-medium">
                      {reviewResult.summary}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-1.5">
                        <span className="font-bold text-emerald-400 block uppercase text-[10px]">Architectural Strengths</span>
                        <ul className="space-y-1 text-slate-300">
                          {reviewResult.strengths?.map((s, i) => (
                            <li key={i} className="flex items-start space-x-1.5">
                              <span className="text-emerald-400">&bull;</span>
                              <span>{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-950 border border-indigo-500/30 space-y-1.5">
                        <span className="font-bold text-indigo-400 block uppercase text-[10px]">Production & Latency Tips</span>
                        <ul className="space-y-1 text-slate-300">
                          {reviewResult.performanceAndLatencyTips?.map((p, i) => (
                            <li key={i} className="flex items-start space-x-1.5">
                              <span className="text-indigo-400">&bull;</span>
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {reviewResult.seniorStaffAdvice && (
                      <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-slate-200">
                        <span className="font-bold text-indigo-300 block mb-0.5">Senior Staff Wisdom:</span>
                        <p>{reviewResult.seniorStaffAdvice}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Dataset Schema */}
        {activeTab === 'dataset' && (
          <div className="p-6 space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {currentProject.datasetOrApiInfo.name}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                {currentProject.datasetOrApiInfo.description}
              </p>
            </div>

            <div className="rounded-xl bg-slate-950 border border-slate-800 p-4">
              <div className="text-xs font-mono text-slate-400 mb-2 font-bold uppercase">
                Sample Record / JSON Payload
              </div>
              <pre className="text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed">
                <code>{currentProject.datasetOrApiInfo.samplePayloadOrSchema}</code>
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
