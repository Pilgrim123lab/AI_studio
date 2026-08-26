import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Bookmark, 
  BookmarkCheck, 
  Printer, 
  RotateCcw, 
  BarChart3, 
  HelpCircle,
  GraduationCap,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  BrainCircuit,
  Award
} from 'lucide-react';
import { TestResult, StudentProfile, Question } from '../types';
import { SUBJECT_METADATA } from '../data/oauQuestions';
import { calculateOauAggregate, getAdmissionRating } from '../data/facultyPresets';
import { toggleSaveQuestion, isQuestionSaved } from '../utils/storage';

interface ResultReviewProps {
  result: TestResult;
  profile: StudentProfile;
  onRetakeExam: () => void;
  onGoToDashboard: () => void;
}

interface AiExplanationState {
  loading: boolean;
  data: {
    stepByStepSolution?: string;
    whyDistractorsFail?: string;
    keyConcept?: string;
    oauSpeedTip?: string;
    inspirationalWord?: string;
    error?: string;
  } | null;
}

export const ResultReview: React.FC<ResultReviewProps> = ({
  result,
  profile,
  onRetakeExam,
  onGoToDashboard,
}) => {
  const [filterTab, setFilterTab] = useState<'all' | 'incorrect' | 'flagged' | 'correct'>('all');
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);
  const [aiExplanations, setAiExplanations] = useState<Record<string, AiExplanationState>>({});
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  // Trigger celebration confetti if score is high (>= 260 / 400 or >= 65%)
  useEffect(() => {
    if (result.totalScore >= 260 || result.percentage >= 65) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B'],
        });
      } catch (err) {
        console.error('Confetti error', err);
      }
    }
  }, [result.totalScore, result.percentage]);

  // Aggregate Calculation
  const jambScore = profile.jambScore || 280;
  const { jambPoints, postUtmePoints, totalAggregate } = calculateOauAggregate(
    jambScore,
    result.totalScore
  );
  const admissionRating = getAdmissionRating(totalAggregate, profile.targetCourse);

  // Filtered Questions
  const filteredQuestions = result.questions.filter((q) => {
    const ans = result.answers[q.id];
    const isCorrect = ans?.selectedOptionIndex === q.correctOptionIndex;
    const isFlagged = ans?.isFlagged;

    if (filterTab === 'incorrect') return !isCorrect;
    if (filterTab === 'correct') return isCorrect;
    if (filterTab === 'flagged') return isFlagged;
    return true;
  });

  // Call AI Explainer API
  const handleFetchAiExplanation = async (question: Question) => {
    const qId = question.id;
    const ans = result.answers[qId];

    setAiExplanations((prev) => ({
      ...prev,
      [qId]: { loading: true, data: null },
    }));

    try {
      const res = await fetch('/api/ai/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionText: question.questionText,
          subject: question.subjectName,
          options: question.options,
          selectedOption: ans?.selectedOptionIndex,
          correctOption: question.correctOptionIndex,
          userExplanation: question.explanation,
        }),
      });

      const data = await res.json();
      setAiExplanations((prev) => ({
        ...prev,
        [qId]: { loading: false, data },
      }));
    } catch (err) {
      console.error('Failed to fetch AI explanation', err);
      setAiExplanations((prev) => ({
        ...prev,
        [qId]: {
          loading: false,
          data: {
            stepByStepSolution: question.explanation,
            keyConcept: question.keyConcept || 'Core OAU Post-UTME topic',
            oauSpeedTip: question.oauExamTip || 'Manage your time carefully.',
            inspirationalWord: 'Diligence brings honor to God. Keep practicing!',
          },
        },
      }));
    }
  };

  // Format time
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}m ${remainder}s`;
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      
      {/* 1. SCORE HERO CARD */}
      <div className="relative rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white p-6 sm:p-10 shadow-2xl overflow-hidden border border-blue-800/40">
        
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 -mb-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          
          {/* Main Score Output */}
          <div className="lg:col-span-2 space-y-3">
            
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-purple-200">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>OAU Post-UTME Official CBT Marking Result</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              {result.totalScore}
              <span className="text-xl sm:text-2xl font-bold text-blue-200 ml-1">/ 400</span>
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-sm text-blue-100 font-medium">
              <span className="bg-emerald-500/30 text-emerald-300 px-3 py-1 rounded-lg border border-emerald-500/40 font-bold">
                {result.percentage}% Overall Accuracy
              </span>
              <span className="bg-white/10 px-3 py-1 rounded-lg border border-white/15">
                {result.totalCorrect} Correct of {result.totalQuestions} Questions
              </span>
              <span className="bg-white/10 px-3 py-1 rounded-lg border border-white/15 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-blue-300" />
                Time: {formatTime(result.timeTakenSeconds)}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-blue-200/90 pt-1">
              Candidate: <strong className="text-white">{result.studentName}</strong> • Target: <strong className="text-white">{result.targetCourse}</strong>
            </p>
          </div>

          {/* OAU Composite Aggregate Card */}
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-blue-200 uppercase tracking-wider">
              <span>OAU Composite Aggregate</span>
              <span className="text-[10px] bg-purple-500/40 px-2 py-0.5 rounded text-purple-200">
                50:50 Formula
              </span>
            </div>

            <div className="text-3xl font-black text-white font-mono">
              {totalAggregate}%
            </div>

            <div className="space-y-1.5 text-xs text-blue-100">
              <div className="flex justify-between">
                <span>JAMB ({jambScore}/400):</span>
                <span className="font-mono font-bold">{jambPoints}%</span>
              </div>
              <div className="flex justify-between">
                <span>Post-UTME ({result.totalScore}/400):</span>
                <span className="font-mono font-bold">{postUtmePoints}%</span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/15">
              <div className="text-[11px] font-bold text-emerald-300">
                {admissionRating.verdict}
              </div>
              <div className="text-[10px] text-blue-200/80 mt-0.5">
                {admissionRating.recommendation}
              </div>
            </div>
          </div>

        </div>

        {/* Action buttons on card */}
        <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <button
              id="retake-exam-btn"
              onClick={onRetakeExam}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Mock Exam</span>
            </button>
            
            <button
              onClick={() => setIsPrintModalOpen(true)}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Official Slip</span>
            </button>
          </div>

          <button
            onClick={onGoToDashboard}
            className="flex items-center space-x-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 text-white text-xs font-extrabold shadow-lg shadow-emerald-500/25 transition-all"
          >
            <span>View Dashboard Analytics</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* 2. SUBJECT-BY-SUBJECT BREAKDOWN CARDS */}
      <div>
        <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 mb-4 flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <span>Subject-by-Subject Performance Scorecard</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {result.subjectBreakdowns.map((sb) => {
            const isTop = sb.scorePercentage >= 70;
            const isWeak = sb.scorePercentage < 50;

            return (
              <div
                key={sb.subjectId}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded">
                    {SUBJECT_METADATA[sb.subjectId]?.shortName || sb.subjectId}
                  </span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    isTop
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : isWeak
                      ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  }`}>
                    {sb.scorePercentage}%
                  </span>
                </div>

                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                    {sb.subjectName}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {sb.correct} of {sb.totalQuestions} Questions Correct
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      isTop ? 'bg-emerald-500' : isWeak ? 'bg-rose-500' : 'bg-amber-500'
                    }`}
                    style={{ width: `${sb.scorePercentage}%` }}
                  />
                </div>

                <div className="flex justify-between items-center text-[11px] text-slate-400 dark:text-slate-500 pt-1">
                  <span>Scaled: {sb.scaledScore}/100</span>
                  <span>Time: {formatTime(sb.timeSpentSeconds)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. QUESTION-BY-QUESTION VERIFIED REVIEW */}
      <div className="space-y-4">
        
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Question-by-Question Solution & Verified Explanations</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Review correct answers, DLCF academic notes, and ask our AI Tutor for tricky questions.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold">
            <button
              onClick={() => setFilterTab('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filterTab === 'all'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              All ({result.questions.length})
            </button>
            <button
              onClick={() => setFilterTab('incorrect')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filterTab === 'incorrect'
                  ? 'bg-rose-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Incorrect ({result.questions.filter((q) => result.answers[q.id]?.selectedOptionIndex !== q.correctOptionIndex).length})
            </button>
            <button
              onClick={() => setFilterTab('flagged')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filterTab === 'flagged'
                  ? 'bg-amber-500 text-slate-950 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Flagged ({result.questions.filter((q) => result.answers[q.id]?.isFlagged).length})
            </button>
            <button
              onClick={() => setFilterTab('correct')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filterTab === 'correct'
                  ? 'bg-emerald-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Correct ({result.totalCorrect})
            </button>
          </div>
        </div>

        {/* Questions list */}
        <div className="space-y-4">
          {filteredQuestions.map((q, idx) => {
            const ans = result.answers[q.id];
            const isCorrect = ans?.selectedOptionIndex === q.correctOptionIndex;
            const isExpanded = expandedQuestionId === q.id || filterTab === 'incorrect';
            const isSaved = isQuestionSaved(q.id);
            const aiState = aiExplanations[q.id];

            return (
              <div
                key={q.id}
                className={`rounded-2xl border transition-all ${
                  isCorrect
                    ? 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                    : 'border-rose-200 dark:border-rose-900/60 bg-rose-50/20 dark:bg-rose-950/10'
                }`}
              >
                
                {/* Question Header Card Bar */}
                <div className="p-4 sm:p-5 flex items-start justify-between gap-3">
                  
                  <div className="flex items-start space-x-3">
                    <div className={`flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold mt-0.5 shrink-0 ${
                      isCorrect
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                    }`}>
                      {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-bold text-xs text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded">
                          {q.subjectName}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">
                          {q.topic}
                        </span>
                        {q.year && (
                          <span className="text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded">
                            {q.year}
                          </span>
                        )}
                      </div>

                      <div className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 leading-relaxed mt-1">
                        {q.questionText}
                      </div>
                    </div>
                  </div>

                  {/* Actions: Bookmark & Expand */}
                  <div className="flex items-center space-x-1.5 shrink-0">
                    <button
                      onClick={() => {
                        toggleSaveQuestion({
                          question: q,
                          savedAt: new Date().toISOString(),
                          userLastChoice: ans?.selectedOptionIndex ?? null,
                        });
                        // trigger force update
                        setExpandedQuestionId((prev) => (prev === q.id ? null : q.id));
                      }}
                      className={`p-2 rounded-xl text-xs transition-colors ${
                        isSaved
                          ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-700'
                      }`}
                      title={isSaved ? 'Saved in Revision Bank' : 'Save to Revision Bank'}
                    >
                      {isSaved ? <BookmarkCheck className="w-4 h-4 fill-indigo-600" /> : <Bookmark className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                </div>

                {/* Options List */}
                <div className="px-4 sm:px-5 pb-4 space-y-2">
                  {q.options.map((opt, optIdx) => {
                    const isCandidateChoice = ans?.selectedOptionIndex === optIdx;
                    const isTheCorrectChoice = q.correctOptionIndex === optIdx;

                    let cardStyle = 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300';
                    let badge = null;

                    if (isTheCorrectChoice) {
                      cardStyle = 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 font-bold ring-1 ring-emerald-500';
                      badge = (
                        <span className="text-[10px] font-extrabold uppercase bg-emerald-600 text-white px-2 py-0.5 rounded">
                          Correct Answer
                        </span>
                      );
                    } else if (isCandidateChoice && !isTheCorrectChoice) {
                      cardStyle = 'border-rose-500 bg-rose-50/80 dark:bg-rose-950/40 text-rose-950 dark:text-rose-200 line-through';
                      badge = (
                        <span className="text-[10px] font-extrabold uppercase bg-rose-600 text-white px-2 py-0.5 rounded no-underline inline-block">
                          Your Choice (Incorrect)
                        </span>
                      );
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`flex items-center justify-between p-3 rounded-xl border text-xs sm:text-sm ${cardStyle}`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="w-5 h-5 rounded-md flex items-center justify-center font-bold text-xs bg-black/5 dark:bg-white/10">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>
                        {badge}
                      </div>
                    );
                  })}
                </div>

                {/* Detailed Verified Explanation Box */}
                {isExpanded && (
                  <div className="px-4 sm:px-5 pb-5 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3 bg-slate-50/70 dark:bg-slate-950/40 rounded-b-2xl">
                    
                    {/* DLCF Verified Solution */}
                    <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                      <div className="flex items-center space-x-1.5 font-bold text-indigo-700 dark:text-indigo-400">
                        <GraduationCap className="w-4 h-4" />
                        <span>DLCF Verified Solution & Rationale:</span>
                      </div>
                      <p className="leading-relaxed whitespace-pre-line">
                        {q.explanation}
                      </p>
                      {q.oauExamTip && (
                        <div className="mt-2 p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 font-medium">
                          <strong>💡 OAU Speed Tip:</strong> {q.oauExamTip}
                        </div>
                      )}
                    </div>

                    {/* Ask DLCF AI Tutor (Gemini) Button & Result */}
                    {!aiState?.data ? (
                      <button
                        onClick={() => handleFetchAiExplanation(q)}
                        disabled={aiState?.loading}
                        className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 text-white text-xs font-bold shadow-xs transition-all"
                      >
                        <BrainCircuit className={`w-4 h-4 ${aiState?.loading ? 'animate-spin' : ''}`} />
                        <span>{aiState?.loading ? 'Generating AI Tutor Breakdown...' : 'Ask Saintly Intellectual AI Tutor (Gemini)'}</span>
                      </button>
                    ) : (
                      <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/50 dark:to-indigo-950/50 border border-purple-200 dark:border-purple-800/60 text-xs text-purple-950 dark:text-purple-200 space-y-2 animate-in fade-in">
                        <div className="flex items-center space-x-1.5 font-extrabold text-purple-800 dark:text-purple-300">
                          <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400 animate-pulse" />
                          <span>DLCF Saintly Intellectual AI Tutor Insight:</span>
                        </div>

                        {aiState.data.stepByStepSolution && (
                          <div>
                            <strong className="block text-purple-900 dark:text-purple-200">Step-by-Step Derivation:</strong>
                            <p className="leading-relaxed whitespace-pre-line">{aiState.data.stepByStepSolution}</p>
                          </div>
                        )}

                        {aiState.data.whyDistractorsFail && (
                          <div className="pt-1">
                            <strong className="block text-purple-900 dark:text-purple-200">Why Distractors Fail (Exam Traps):</strong>
                            <p className="leading-relaxed">{aiState.data.whyDistractorsFail}</p>
                          </div>
                        )}

                        {aiState.data.oauSpeedTip && (
                          <div className="p-2 rounded-lg bg-white/70 dark:bg-slate-900/70 border border-purple-200 dark:border-purple-800">
                            <strong>⚡ OAU Post-UTME Exam Shortcut:</strong> {aiState.data.oauSpeedTip}
                          </div>
                        )}

                        {aiState.data.inspirationalWord && (
                          <div className="italic text-[11px] text-purple-700 dark:text-purple-400 font-serif pt-1">
                            "{aiState.data.inspirationalWord}"
                          </div>
                        )}
                      </div>
                    )}

                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>

      {/* 4. PRINTABLE OFFICIAL RESULT SLIP MODAL */}
      {isPrintModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-2xl rounded-2xl bg-white text-slate-900 p-8 shadow-2xl space-y-6 my-8 animate-in zoom-in-95">
            
            {/* Header with OAU / DLCF header */}
            <div className="text-center pb-4 border-b-2 border-slate-900">
              <div className="font-serif font-black text-xl tracking-wide uppercase text-blue-900">
                Deeper Life Campus Fellowship
              </div>
              <div className="text-xs font-bold text-slate-600 uppercase tracking-widest">
                Obafemi Awolowo University (OAU), Ile-Ife Chapter
              </div>
              <div className="italic font-serif text-[11px] text-purple-700 mt-0.5">
                "Assembly of Saintly Intellectuals" • Post-UTME Tutorial Directorate
              </div>
              <div className="mt-3 inline-block px-4 py-1 rounded-full bg-slate-100 text-xs font-extrabold tracking-wider uppercase border border-slate-300">
                Official Post-UTME CBT Assessment Statement
              </div>
            </div>

            {/* Candidate Meta Details */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block">Candidate Name:</span>
                <span className="font-extrabold text-sm text-slate-900">{result.studentName}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Target Course / Faculty:</span>
                <span className="font-bold text-slate-900">{result.targetCourse}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Exam Date & Session:</span>
                <span className="font-medium text-slate-800">{result.date} • {result.examTitle}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Time Spent:</span>
                <span className="font-medium text-slate-800">{formatTime(result.timeTakenSeconds)}</span>
              </div>
            </div>

            {/* Subject Scores Table */}
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-300 text-slate-700">
                  <th className="py-2 px-3">Subject</th>
                  <th className="py-2 px-3 text-center">Attempted</th>
                  <th className="py-2 px-3 text-center">Score</th>
                  <th className="py-2 px-3 text-center">Percentage</th>
                  <th className="py-2 px-3 text-right">Scaled (/100)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {result.subjectBreakdowns.map((sb) => (
                  <tr key={sb.subjectId}>
                    <td className="py-2 px-3 font-semibold">{sb.subjectName}</td>
                    <td className="py-2 px-3 text-center">{sb.attempted}/{sb.totalQuestions}</td>
                    <td className="py-2 px-3 text-center">{sb.correct}/{sb.totalQuestions}</td>
                    <td className="py-2 px-3 text-center font-bold">{sb.scorePercentage}%</td>
                    <td className="py-2 px-3 text-right font-mono font-bold">{sb.scaledScore}</td>
                  </tr>
                ))}
                <tr className="bg-slate-50 font-black text-slate-900 border-t-2 border-slate-900">
                  <td className="py-2.5 px-3">TOTAL POST-UTME SCORE</td>
                  <td className="py-2.5 px-3 text-center">{result.totalAttempted}/{result.totalQuestions}</td>
                  <td className="py-2.5 px-3 text-center">{result.totalCorrect}/{result.totalQuestions}</td>
                  <td className="py-2.5 px-3 text-center text-emerald-700">{result.percentage}%</td>
                  <td className="py-2.5 px-3 text-right text-base text-blue-900">{result.totalScore} / 400</td>
                </tr>
              </tbody>
            </table>

            {/* Composite Aggregate Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
              <div className="flex justify-between font-bold text-slate-900">
                <span>OAU Composite Admission Aggregate (JAMB 50% + Post-UTME 50%):</span>
                <span className="text-base text-purple-700">{totalAggregate}%</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                Admission Standing: <strong>{admissionRating.verdict}</strong> ({admissionRating.recommendation})
              </p>
            </div>

            {/* Verification signature seal */}
            <div className="flex justify-between items-end pt-4 border-t border-slate-200 text-[10px] text-slate-500">
              <div>
                <div className="font-mono font-bold text-slate-800">REF: DLCF-OAU-{result.timestamp}</div>
                <div>Authenticated by DLCF Academic Guidance Directorate</div>
              </div>
              <div className="text-right">
                <div className="font-serif italic font-bold text-slate-800 text-xs">DLCF Academic Committee</div>
                <div>Obafemi Awolowo University</div>
              </div>
            </div>

            {/* Print & Close Buttons */}
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setIsPrintModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold"
              >
                <Printer className="w-4 h-4" />
                <span>Print Statement</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
