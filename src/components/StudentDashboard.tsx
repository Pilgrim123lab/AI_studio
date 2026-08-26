import React, { useState } from 'react';
import { 
  Trophy, 
  BarChart3, 
  Flame, 
  Target, 
  TrendingUp, 
  Clock, 
  BookOpen, 
  PlayCircle, 
  BookmarkCheck, 
  Sparkles, 
  ChevronRight, 
  Calculator, 
  CheckCircle2, 
  AlertCircle,
  GraduationCap,
  Calendar,
  Layers
} from 'lucide-react';
import { StudentProfile, TestResult, SubjectId } from '../types';
import { SUBJECT_METADATA } from '../data/oauQuestions';
import { calculateOauAggregate, getAdmissionRating, FACULTY_PRESETS } from '../data/facultyPresets';

interface StudentDashboardProps {
  profile: StudentProfile;
  testHistory: TestResult[];
  onStartNewMock: () => void;
  onViewRevisionBank: () => void;
  onOpenAggregateCalc: () => void;
  onOpenAiTutor: () => void;
  onSelectPastResult: (result: TestResult) => void;
  onOpenProfile: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  profile,
  testHistory,
  onStartNewMock,
  onViewRevisionBank,
  onOpenAggregateCalc,
  onOpenAiTutor,
  onSelectPastResult,
  onOpenProfile,
}) => {
  // Aggregate stats across all tests
  const totalTests = testHistory.length;
  
  const averageScore = totalTests > 0
    ? Math.round(testHistory.reduce((acc, t) => acc + t.totalScore, 0) / totalTests)
    : 0;

  const highestScore = totalTests > 0
    ? Math.max(...testHistory.map((t) => t.totalScore))
    : 0;

  const averageAccuracy = totalTests > 0
    ? Number((testHistory.reduce((acc, t) => acc + t.percentage, 0) / totalTests).toFixed(1))
    : 0;

  // Aggregate by subject across all past tests
  const subjectAggregates = React.useMemo(() => {
    const map: Record<SubjectId, { totalQ: number; correctQ: number; tests: number }> = {} as any;
    
    testHistory.forEach((t) => {
      t.subjectBreakdowns.forEach((sb) => {
        if (!map[sb.subjectId]) {
          map[sb.subjectId] = { totalQ: 0, correctQ: 0, tests: 0 };
        }
        map[sb.subjectId].totalQ += sb.totalQuestions;
        map[sb.subjectId].correctQ += sb.correct;
        map[sb.subjectId].tests += 1;
      });
    });

    return Object.entries(map).map(([subId, data]) => {
      const percentage = data.totalQ > 0 ? Math.round((data.correctQ / data.totalQ) * 100) : 0;
      return {
        subjectId: subId as SubjectId,
        name: SUBJECT_METADATA[subId as SubjectId]?.name || subId,
        shortName: SUBJECT_METADATA[subId as SubjectId]?.shortName || subId,
        percentage,
        totalQuestionsAttempted: data.totalQ,
        testsCount: data.tests,
      };
    }).sort((a, b) => b.percentage - a.percentage);
  }, [testHistory]);

  // Overall OAU Aggregate using profile's JAMB score + average mock score
  const predictedPostUtme = averageScore > 0 ? averageScore : profile.targetPostUtmeScore;
  const { jambPoints, postUtmePoints, totalAggregate } = calculateOauAggregate(
    profile.jambScore,
    predictedPostUtme
  );
  const admissionRating = getAdmissionRating(totalAggregate, profile.targetCourse);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      
      {/* 1. WELCOME & QUICK PROFILE BANNER */}
      <div className="relative rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white p-6 sm:p-8 shadow-xl overflow-hidden border border-blue-800/40">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 -mb-8 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/30 text-purple-200 text-xs font-semibold border border-purple-400/30">
                DLCF OAU Aspirant Dashboard
              </span>
              <span className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-orange-500/30 text-orange-200 text-xs font-bold border border-orange-400/30">
                <Flame className="w-3 h-3 fill-orange-400 text-orange-400" />
                <span>{profile.streakDays} Day Streak</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Shalom, {profile.fullName}! 🎓
            </h1>

            <p className="text-xs sm:text-sm text-blue-200 max-w-xl leading-relaxed">
              Target Course: <strong className="text-white">{profile.targetCourse}</strong> • JAMB Score: <strong className="text-white">{profile.jambScore}</strong> • Target Post-UTME: <strong className="text-white">{profile.targetPostUtmeScore}/400</strong>
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onStartNewMock}
              className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white text-xs sm:text-sm font-extrabold shadow-lg shadow-blue-500/30 active:scale-95 transition-all"
            >
              <PlayCircle className="w-4 h-4" />
              <span>Launch New CBT Mock</span>
            </button>

            <button
              onClick={onOpenProfile}
              className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold border border-white/20 transition-colors"
            >
              Edit Target
            </button>
          </div>

        </div>
      </div>

      {/* 2. CORE STATS METRIC TILES */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Metric 1: Average Mock Score */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Average Mock Score</span>
            <Trophy className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100">
            {averageScore > 0 ? averageScore : '---'}
            <span className="text-xs font-normal text-slate-400 ml-1">/ 400</span>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            Across {totalTests} completed mock sessions
          </div>
        </div>

        {/* Metric 2: Highest Score */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Peak Score</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
            {highestScore > 0 ? highestScore : '---'}
            <span className="text-xs font-normal text-slate-400 ml-1">/ 400</span>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            Target cutoff: {profile.targetPostUtmeScore}/400
          </div>
        </div>

        {/* Metric 3: Overall Accuracy */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Average Accuracy</span>
            <Target className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400">
            {averageAccuracy > 0 ? `${averageAccuracy}%` : '---'}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            Speed + Precision ratio
          </div>
        </div>

        {/* Metric 4: Projected Aggregate */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-purple-100 dark:border-slate-800 shadow-xs space-y-2 bg-gradient-to-br from-purple-50/50 to-white dark:from-purple-950/20 dark:to-slate-900">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Projected OAU Aggregate</span>
            <Calculator className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-purple-700 dark:text-purple-300 font-mono">
            {totalAggregate}%
          </div>
          <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 truncate">
            {admissionRating.verdict}
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Subject Mastery & Past Exam History */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Subject Mastery Progress Bars */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Subject Performance & Strength Index</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Identifies your strongest subjects and areas needing targeted practice.
                </p>
              </div>
            </div>

            {subjectAggregates.length > 0 ? (
              <div className="space-y-4">
                {subjectAggregates.map((sub) => {
                  const isStrong = sub.percentage >= 70;
                  const isAverage = sub.percentage >= 50 && sub.percentage < 70;

                  return (
                    <div key={sub.subjectId} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                          {sub.name} ({sub.shortName})
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="text-slate-400 text-[11px]">
                            {sub.totalQuestionsAttempted} Questions
                          </span>
                          <span className={`font-mono font-bold px-2 py-0.5 rounded text-[11px] ${
                            isStrong
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                              : isAverage
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                              : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                          }`}>
                            {sub.percentage}%
                          </span>
                        </div>
                      </div>

                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isStrong ? 'bg-emerald-500' : isAverage ? 'bg-amber-500' : 'bg-rose-500'
                          }`}
                          style={{ width: `${sub.percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 px-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-slate-700">
                <BookOpen className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  No mock test data recorded yet
                </div>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
                  Take your first OAU Post-UTME mock exam to generate accurate subject strength charts.
                </p>
                <button
                  onClick={onStartNewMock}
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-xs hover:bg-blue-700"
                >
                  Start First CBT Mock
                </button>
              </div>
            )}
          </div>

          {/* Test History Table */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-2">
                <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>Recent Mock Test Sessions</span>
              </h2>
              <span className="text-xs text-slate-500">
                Total: {testHistory.length}
              </span>
            </div>

            {testHistory.length > 0 ? (
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {testHistory.slice(0, 5).map((test) => (
                  <div
                    key={test.id}
                    className="py-3.5 flex items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/40 p-2 rounded-xl transition-colors cursor-pointer"
                    onClick={() => onSelectPastResult(test)}
                  >
                    <div className="space-y-1">
                      <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                        {test.examTitle}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                        <span>{test.date}</span>
                        <span>•</span>
                        <span>{test.totalQuestions} Questions</span>
                        <span>•</span>
                        <div className="flex gap-1">
                          {test.selectedSubjects.map((s) => (
                            <span key={s} className="font-mono text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 rounded">
                              {SUBJECT_METADATA[s]?.shortName || s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 text-right">
                      <div>
                        <div className="font-extrabold text-sm sm:text-base text-indigo-600 dark:text-indigo-400 font-mono">
                          {test.totalScore} <span className="text-xs text-slate-400 font-normal">/ 400</span>
                        </div>
                        <div className="text-[11px] font-bold text-emerald-600">
                          {test.percentage}%
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 text-center py-4">
                No past sessions yet.
              </p>
            )}
          </div>

        </div>

        {/* Right 1 Col: OAU Aggregate Predictor Card & Saintly Devotional */}
        <div className="space-y-6">
          
          {/* OAU Aggregate Calculator Widget */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-indigo-100 dark:border-slate-800 shadow-md space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-2">
                <Calculator className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  OAU Admission Predictor
                </h3>
              </div>
              <span className="text-[10px] bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold px-2 py-0.5 rounded">
                Official 50:50
              </span>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white text-center space-y-1">
              <span className="text-xs text-blue-200 font-medium">Composite Aggregate Score</span>
              <div className="text-3xl font-black font-mono text-white">
                {totalAggregate}%
              </div>
              <div className="text-[11px] text-emerald-300 font-semibold">
                {admissionRating.verdict}
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex justify-between">
                <span>JAMB ({profile.jambScore} / 400 ÷ 8):</span>
                <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{jambPoints}%</span>
              </div>
              <div className="flex justify-between">
                <span>Post-UTME ({predictedPostUtme} / 400 ÷ 4):</span>
                <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{postUtmePoints}%</span>
              </div>
            </div>

            <button
              onClick={onOpenAggregateCalc}
              className="w-full py-2.5 rounded-xl border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-950 text-xs font-bold transition-colors"
            >
              Adjust Scores & Explore Cut-Offs
            </button>

          </div>

          {/* Quick AI Tutor Help Card */}
          <div className="rounded-2xl p-6 bg-gradient-to-br from-purple-900 to-indigo-950 text-white shadow-md border border-purple-800/40 space-y-3">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-purple-300 animate-pulse" />
              <h3 className="font-bold text-sm text-purple-200">
                DLCF Saintly AI Tutor
              </h3>
            </div>
            <p className="text-xs text-purple-100/90 leading-relaxed">
              Stuck on tricky OAU past questions, complex organic chemistry reactions, or physics mechanics? Ask our Gemini-powered academic coach anytime.
            </p>
            <button
              onClick={onOpenAiTutor}
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-extrabold shadow-sm transition-all"
            >
              Open AI Academic Coach
            </button>
          </div>

          {/* Fellowship Saintly Intellectual Charge */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
            <div className="flex items-center space-x-2 text-indigo-700 dark:text-indigo-400">
              <GraduationCap className="w-4 h-4" />
              <span className="font-bold text-xs uppercase tracking-wide">DLCF Charge to Aspirants</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 italic leading-relaxed font-serif">
              "Daniel had an excellent spirit in him and was preferred above presidents and princes. As a Saintly Intellectual, combine holy living with academic diligence, and Great Ife awaits you!"
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
