import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  BookOpen, 
  HelpCircle, 
  Code, 
  Sparkles, 
  ChevronRight, 
  Award, 
  ArrowRight,
  GitMerge,
  Cpu,
  Network,
  Bot,
  Server,
  Crown,
  Search,
  Check,
  RotateCcw,
  Zap,
  Play,
  Clock,
  ExternalLink,
  Copy,
  Terminal
} from 'lucide-react';
import { ROADMAP_STAGES } from '../data/roadmapData';
import { CURATED_VIDEO_TUTORIALS } from '../data/tutorialsData';
import { RoadmapStage, RoadmapTopic, UserProgress, VideoTutorial } from '../types';

interface RoadmapViewProps {
  progress: UserProgress;
  onCompleteTopic: (topicId: string, xpReward: number) => void;
  onSelectProject?: (projectId: string) => void;
  onNavigateToTutorialsHub?: () => void;
  onCompleteTutorial?: (tutorialId: string, xpReward: number) => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  progress,
  onCompleteTopic,
  onNavigateToTutorialsHub,
  onCompleteTutorial,
}) => {
  const [selectedStageId, setSelectedStageId] = useState<string>('stage_0');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('da_bridge_1');
  const [activeTab, setActiveTab] = useState<'overview' | 'lesson' | 'tutorial' | 'quiz' | 'exercise'>('lesson');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  
  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Exercise code state
  const [userExerciseCode, setUserExerciseCode] = useState<string>('');
  const [showExerciseSolution, setShowExerciseSolution] = useState<boolean>(false);

  const currentStage = ROADMAP_STAGES.find((s) => s.id === selectedStageId) || ROADMAP_STAGES[0];
  const currentTopic = currentStage.topics.find((t) => t.id === selectedTopicId) || currentStage.topics[0];

  // Matched tutorial for this stage / topic
  const matchingTutorial = CURATED_VIDEO_TUTORIALS.find((tut) => tut.stageId === currentStage.id || tut.topicId === currentTopic?.id) || CURATED_VIDEO_TUTORIALS[0];
  const isTutorialDone = progress.completedTutorialIds?.includes(matchingTutorial.id);

  const isCurrentTopicCompleted = progress.completedTopicIds.includes(currentTopic?.id);

  // Helper for stage icon
  const getStageIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case 'GitMerge': return <GitMerge className={className} />;
      case 'Code2': return <Code className={className} />;
      case 'Cpu': return <Cpu className={className} />;
      case 'Network': return <Network className={className} />;
      case 'Bot': return <Bot className={className} />;
      case 'Server': return <Server className={className} />;
      case 'Crown': return <Crown className={className} />;
      default: return <BookOpen className={className} />;
    }
  };

  const handleSelectTopic = (stage: RoadmapStage, topic: RoadmapTopic) => {
    setSelectedStageId(stage.id);
    setSelectedTopicId(topic.id);
    setActiveTab('lesson');
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setShowExerciseSolution(false);
    setUserExerciseCode(topic.practicalExercises[0]?.starterCode || '');
  };

  const handleSelectQuizOption = (questionIndex: number, optionIndex: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: optionIndex }));
  };

  const handleCompleteAndEarn = () => {
    if (currentTopic) {
      onCompleteTopic(currentTopic.id, currentTopic.xpReward);
    }
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Systematic 6-Stage Transformation Blueprint</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Data Analyst to Global AI Engineer Curriculum
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl">
              Turn your tabular SQL intuition, metric analysis, and data hygiene skills into high-performance PyTorch tensors, vector similarity hyperplanes, and multi-agent production systems.
            </p>
          </div>

          <div className="flex items-center space-x-4 bg-slate-100 dark:bg-slate-800/80 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="text-right">
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Curriculum Progress</span>
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                {progress.completedTopicIds.length} / {ROADMAP_STAGES.reduce((acc, s) => acc + s.topics.length, 0)} Topics
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-base shadow-md">
              {Math.round((progress.completedTopicIds.length / ROADMAP_STAGES.reduce((acc, s) => acc + s.topics.length, 0)) * 100)}%
            </div>
          </div>
        </div>
      </div>

      {/* Stage Selector Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 mb-8">
        {ROADMAP_STAGES.map((stage) => {
          const isSelected = stage.id === selectedStageId;
          const stageCompletedCount = stage.topics.filter((t) => progress.completedTopicIds.includes(t.id)).length;
          const isStageDone = stageCompletedCount === stage.topics.length && stage.topics.length > 0;

          return (
            <button
              key={stage.id}
              onClick={() => {
                setSelectedStageId(stage.id);
                if (stage.topics.length > 0) {
                  setSelectedTopicId(stage.topics[0].id);
                  setUserExerciseCode(stage.topics[0].practicalExercises[0]?.starterCode || '');
                }
              }}
              className={`p-3 rounded-xl text-left border transition-all duration-200 relative ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20'
                  : 'bg-white dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-400'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`}>
                  Stage {stage.stageNumber}
                </span>
                {isStageDone ? (
                  <CheckCircle2 className={`w-4 h-4 ${isSelected ? 'text-emerald-300' : 'text-emerald-500'}`} />
                ) : (
                  <span className={`text-[10px] font-mono ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`}>
                    {stageCompletedCount}/{stage.topics.length}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {getStageIcon(stage.iconName, `w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-indigo-500'}`)}
                <span className="text-xs font-bold truncate">{stage.title}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Content Layout: Sidebar of Topics + Topic Deep Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Topics in Selected Stage */}
        <div className="lg:col-span-4 space-y-4">
          {/* Stage Context Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-900/40 to-slate-900/60 border border-indigo-500/20 text-slate-100">
            <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
              <span>Stage {currentStage.stageNumber} Objective</span>
            </div>
            <h3 className="text-base font-bold text-white mb-2">{currentStage.subtitle}</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">{currentStage.description}</p>
            
            <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs">
              <span className="font-semibold text-emerald-400 block mb-0.5">Analyst Advantage:</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">{currentStage.dataAnalystContext}</p>
            </div>
          </div>

          {/* Topics List */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
              Modules in Stage {currentStage.stageNumber} ({currentStage.topics.length})
            </h4>
            {currentStage.topics.map((topic, index) => {
              const isSelected = topic.id === selectedTopicId;
              const isCompleted = progress.completedTopicIds.includes(topic.id);

              return (
                <button
                  key={topic.id}
                  onClick={() => handleSelectTopic(currentStage, topic)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 flex items-start justify-between ${
                    isSelected
                      ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 text-slate-900 dark:text-white shadow-sm'
                      : 'bg-white dark:bg-slate-800/70 border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="mt-0.5">
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : (
                        <Circle className={`w-4 h-4 shrink-0 ${isSelected ? 'text-indigo-500' : 'text-slate-400'}`} />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold line-clamp-1">{topic.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                        {topic.shortDescription}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 font-medium text-slate-600 dark:text-slate-300">
                          {topic.estimatedHours} hrs
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 font-medium">
                          +{topic.xpReward} XP
                        </span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-indigo-500 translate-x-0.5' : 'text-slate-400'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Topic Detail Viewer */}
        <div className="lg:col-span-8">
          {currentTopic ? (
            <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
              {/* Topic Header Banner */}
              <div className="p-6 border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                      {currentTopic.difficulty}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                      ~{currentTopic.estimatedHours} Hours
                    </span>
                  </div>

                  {isCurrentTopicCompleted ? (
                    <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Module Mastered (+{currentTopic.xpReward} XP)</span>
                    </div>
                  ) : (
                    <button
                      onClick={handleCompleteAndEarn}
                      className="flex items-center space-x-2 px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-sm transition-all duration-200"
                    >
                      <Zap className="w-4 h-4" />
                      <span>Mark Complete (+{currentTopic.xpReward} XP)</span>
                    </button>
                  )}
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {currentTopic.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                  {currentTopic.shortDescription}
                </p>

                {/* Data Analyst Bridge Callout */}
                <div className="mt-4 p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-slate-800 dark:text-slate-200">
                  <div className="flex items-center space-x-2 text-amber-700 dark:text-amber-400 text-xs font-bold mb-1">
                    <GitMerge className="w-4 h-4" />
                    <span>Data Analyst Translation Bridge:</span>
                  </div>
                  <p className="text-xs leading-relaxed">{currentTopic.dataAnalystBridge}</p>
                </div>
              </div>

              {/* Navigation Tabs within Topic */}
              <div className="flex border-b border-slate-200 dark:border-slate-700 px-6 bg-slate-50/30 dark:bg-slate-900/20 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('lesson')}
                  className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors flex items-center space-x-2 whitespace-nowrap ${
                    activeTab === 'lesson'
                      ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Technical Lesson</span>
                </button>
                <button
                  onClick={() => setActiveTab('tutorial')}
                  className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors flex items-center space-x-2 whitespace-nowrap ${
                    activeTab === 'tutorial'
                      ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <Play className="w-4 h-4 text-emerald-500" />
                  <span>Video Tutorial & Masterclass</span>
                  {isTutorialDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                </button>
                <button
                  onClick={() => setActiveTab('exercise')}
                  className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors flex items-center space-x-2 whitespace-nowrap ${
                    activeTab === 'exercise'
                      ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <Code className="w-4 h-4" />
                  <span>Hands-on Code Practice</span>
                </button>
                <button
                  onClick={() => setActiveTab('quiz')}
                  className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors flex items-center space-x-2 whitespace-nowrap ${
                    activeTab === 'quiz'
                      ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Checkpoint Quiz ({currentTopic.checkpointQuiz.length})</span>
                </button>
              </div>

              {/* Tab: Video Tutorial & Masterclass */}
              {activeTab === 'tutorial' && (
                <div className="p-6 space-y-6 animate-fadeIn">
                  {/* Embedded Video Player */}
                  <div className="bg-slate-950 rounded-2xl overflow-hidden shadow-lg border border-slate-800">
                    <div className="aspect-video w-full bg-black relative">
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${matchingTutorial.youtubeId}?rel=0&modestbranding=1`}
                        title={matchingTutorial.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full border-0"
                      />
                    </div>
                    <div className="p-4 bg-slate-900 flex flex-wrap items-center justify-between gap-3 text-white">
                      <div>
                        <h4 className="text-sm font-bold text-white">{matchingTutorial.title}</h4>
                        <p className="text-xs text-slate-400">
                          Instructor: <span className="text-indigo-300 font-semibold">{matchingTutorial.instructor}</span> ({matchingTutorial.instructorRole})
                        </p>
                      </div>

                      <div className="flex items-center space-x-3">
                        {onCompleteTutorial && (
                          <button
                            onClick={() => onCompleteTutorial(matchingTutorial.id, matchingTutorial.xpReward)}
                            disabled={isTutorialDone}
                            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                              isTutorialDone
                                ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm'
                            }`}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{isTutorialDone ? 'Tutorial Completed' : `Claim Tutorial XP (+${matchingTutorial.xpReward} XP)`}</span>
                          </button>
                        )}
                        {onNavigateToTutorialsHub && (
                          <button
                            onClick={onNavigateToTutorialsHub}
                            className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium"
                          >
                            <span>Open Studio Hub</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Chapter Timestamps */}
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center space-x-1.5">
                      <Clock className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Lecture Timestamps & Key Topics</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {matchingTutorial.keyTimestamps.map((ts, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-xs">
                          <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold mr-1.5">[{ts.timestamp}]</span>
                          <span className="font-semibold text-slate-900 dark:text-slate-200">{ts.title}</span>
                          <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">{ts.summary}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Code Walkthrough */}
                  {matchingTutorial.codeWalkthrough && (
                    <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 text-slate-100 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Terminal className="w-4 h-4 text-emerald-400" />
                          <span className="text-xs font-bold text-white uppercase tracking-wider">
                            {matchingTutorial.codeWalkthrough.title}
                          </span>
                        </div>
                        <button
                          onClick={() => handleCopy(matchingTutorial.codeWalkthrough!.code)}
                          className="flex items-center space-x-1 text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700"
                        >
                          <Copy className="w-3 h-3" />
                          <span>{copiedCode ? 'Copied!' : 'Copy'}</span>
                        </button>
                      </div>

                      <div className="bg-slate-950 p-3.5 rounded-xl font-mono text-xs text-emerald-300 overflow-x-auto border border-slate-800">
                        <pre>{matchingTutorial.codeWalkthrough.code}</pre>
                      </div>

                      <p className="text-xs text-slate-400 italic">
                        💡 {matchingTutorial.codeWalkthrough.explanation}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 1: Lesson Content */}
              {activeTab === 'lesson' && (
                <div className="p-6 space-y-6">
                  {/* Overview */}
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                      Architectural Overview
                    </h3>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {currentTopic.lessonContent.overview}
                    </p>
                  </div>

                  {/* Key Concepts */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Core Technical Principles
                    </h3>
                    {currentTopic.lessonContent.keyConcepts.map((concept, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                          {concept.name}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                          {concept.description}
                        </p>
                        {concept.codeSnippet && (
                          <div className="rounded-lg overflow-hidden bg-slate-950 border border-slate-800">
                            <div className="px-3 py-1.5 bg-slate-900 text-slate-400 text-[10px] font-mono flex items-center justify-between border-b border-slate-800">
                              <span>Python Production Pattern</span>
                            </div>
                            <pre className="p-3 text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed">
                              <code>{concept.codeSnippet}</code>
                            </pre>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Deep Dive Article */}
                  <div className="p-5 rounded-2xl bg-indigo-50/50 dark:bg-slate-900/80 border border-indigo-100 dark:border-slate-700 space-y-3">
                    <h4 className="text-sm font-bold text-indigo-900 dark:text-indigo-300">
                      Principal Engineer Deep Dive
                    </h4>
                    <div className="prose prose-sm dark:prose-invert max-w-none text-xs leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-line">
                      {currentTopic.lessonContent.deepDiveArticle}
                    </div>

                    {currentTopic.lessonContent.mathOrTheoryNote && (
                      <div className="mt-3 p-3 rounded-lg bg-slate-900 text-indigo-300 font-mono text-xs border border-indigo-500/20">
                        <span className="font-semibold text-slate-400 block text-[10px] uppercase mb-1">Mathematical Formula</span>
                        <code>{currentTopic.lessonContent.mathOrTheoryNote}</code>
                      </div>
                    )}
                  </div>

                  {/* Best Practices & Common Pitfalls */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-2 flex items-center space-x-1.5">
                        <Check className="w-3.5 h-3.5" />
                        <span>Production Best Practices</span>
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                        {currentTopic.lessonContent.bestPractices.map((bp, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <span className="text-emerald-500 font-bold">&bull;</span>
                            <span>{bp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/40">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-400 mb-2 flex items-center space-x-1.5">
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Common Traps to Avoid</span>
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                        {currentTopic.lessonContent.commonTraps.map((ct, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <span className="text-rose-500 font-bold">&bull;</span>
                            <span>{ct}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Practical Coding Exercises */}
              {activeTab === 'exercise' && (
                <div className="p-6 space-y-6">
                  {currentTopic.practicalExercises.map((exercise, exIdx) => (
                    <div key={exIdx} className="space-y-4">
                      <div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">
                          {exercise.title}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                          {exercise.instructions}
                        </p>
                      </div>

                      {/* Code Editor Box */}
                      <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
                        <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                          <span>Python Workspace (Sandbox)</span>
                          <button
                            onClick={() => setUserExerciseCode(exercise.starterCode)}
                            className="text-[11px] text-slate-400 hover:text-white flex items-center space-x-1"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Reset Starter</span>
                          </button>
                        </div>
                        <textarea
                          value={userExerciseCode || exercise.starterCode}
                          onChange={(e) => setUserExerciseCode(e.target.value)}
                          rows={12}
                          className="w-full p-4 bg-slate-950 font-mono text-xs text-emerald-400 outline-none resize-y"
                          placeholder="Write your Python implementation..."
                        />
                      </div>

                      {/* Hints & Reference Solution Toggle */}
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
                          <span className="font-semibold">Hints:</span>
                          <span>{exercise.hints.join(' | ')}</span>
                        </div>

                        <button
                          onClick={() => setShowExerciseSolution(!showExerciseSolution)}
                          className="px-3.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                        >
                          {showExerciseSolution ? 'Hide Solution' : 'View Verified Reference Solution'}
                        </button>
                      </div>

                      {showExerciseSolution && (
                        <div className="rounded-xl overflow-hidden border border-emerald-500/30 bg-slate-950 p-4">
                          <div className="text-xs font-bold text-emerald-400 mb-2 flex items-center space-x-1.5">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Production Reference Implementation:</span>
                          </div>
                          <pre className="text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                            <code>{exercise.solutionCode}</code>
                          </pre>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 3: Checkpoint Quiz */}
              {activeTab === 'quiz' && (
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        Concept Mastery Assessment
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Verify your understanding of these core mathematical and architectural concepts.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {currentTopic.checkpointQuiz.map((q, qIndex) => {
                      const selected = selectedAnswers[qIndex];
                      const isCorrect = selected === q.correctIndex;

                      return (
                        <div key={qIndex} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-3">
                          <div className="flex items-start space-x-2">
                            <span className="w-5 h-5 rounded-full bg-indigo-600/20 text-indigo-500 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {qIndex + 1}
                            </span>
                            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                              {q.question}
                            </h4>
                          </div>

                          <div className="space-y-2 pl-7">
                            {q.options.map((opt, optIndex) => {
                              const isThisSelected = selected === optIndex;
                              let btnStyle = 'border-slate-200 dark:border-slate-700 hover:border-indigo-400 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300';
                              
                              if (quizSubmitted) {
                                if (optIndex === q.correctIndex) {
                                  btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-semibold';
                                } else if (isThisSelected && !isCorrect) {
                                  btnStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300';
                                }
                              } else if (isThisSelected) {
                                btnStyle = 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-semibold';
                              }

                              return (
                                <button
                                  key={optIndex}
                                  onClick={() => handleSelectQuizOption(qIndex, optIndex)}
                                  className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${btnStyle}`}
                                >
                                  <span>{opt}</span>
                                  {quizSubmitted && optIndex === q.correctIndex && (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 ml-2" />
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          {quizSubmitted && (
                            <div className="mt-3 p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 pl-7">
                              <span className="font-semibold text-indigo-600 dark:text-indigo-400 block mb-0.5">Explanation:</span>
                              <p>{q.explanation}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Quiz Submit Bar */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                    <button
                      onClick={() => {
                        setQuizSubmitted(true);
                      }}
                      className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-sm transition-all"
                    >
                      Verify Answers
                    </button>

                    {quizSubmitted && !isCurrentTopicCompleted && (
                      <button
                        onClick={handleCompleteAndEarn}
                        className="flex items-center space-x-2 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition-all"
                      >
                        <Award className="w-4 h-4" />
                        <span>Claim Module XP (+{currentTopic.xpReward} XP)</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-12 text-center text-slate-500 dark:text-slate-400">
              Select a module from the left to start learning.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
