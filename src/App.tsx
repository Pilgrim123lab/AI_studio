import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ExamSetupModal } from './components/ExamSetupModal';
import { CBTExamEngine } from './components/CBTExamEngine';
import { ResultReview } from './components/ResultReview';
import { StudentDashboard } from './components/StudentDashboard';
import { RevisionBank } from './components/RevisionBank';
import { AggregateCalculatorModal } from './components/AggregateCalculatorModal';
import { AITutorModal } from './components/AITutorModal';
import { StudentProfileModal } from './components/StudentProfileModal';
import { 
  StudentProfile, 
  TestResult, 
  SubjectId, 
  Question 
} from './types';
import { 
  getStoredProfile, 
  saveProfile, 
  getStoredTestHistory, 
  saveTestResult, 
  getStoredTheme, 
  setStoredTheme 
} from './utils/storage';
import { generateMockExam, getQuestionsForSubject, OAU_QUESTION_BANK } from './data/oauQuestions';

export function App() {
  // Navigation view state
  const [currentView, setCurrentView] = useState<'exam_setup' | 'active_exam' | 'result_review' | 'dashboard' | 'revision_bank'>('dashboard');
  
  // Theme state ('light' | 'dark')
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => getStoredTheme() === 'dark');

  // Student Profile state
  const [profile, setProfile] = useState<StudentProfile>(getStoredProfile);

  // Test History state
  const [testHistory, setTestHistory] = useState<TestResult[]>(getStoredTestHistory);

  // Active Exam state
  const [activeExamConfig, setActiveExamConfig] = useState<{
    questions: Question[];
    selectedSubjects: SubjectId[];
    durationMinutes: number;
    examTitle: string;
    examMode: 'standard_oau_mock' | 'subject_drill' | 'speed_sprint' | 'untimed_practice';
  } | null>(null);

  // Current / Active Result being reviewed
  const [activeResult, setActiveResult] = useState<TestResult | null>(() => {
    const history = getStoredTestHistory();
    return history.length > 0 ? history[0] : null;
  });

  // Modal open states
  const [isAggregateModalOpen, setIsAggregateModalOpen] = useState(false);
  const [isAiTutorModalOpen, setIsAiTutorModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Synchronize theme with DOM on mount and changes
  useEffect(() => {
    setStoredTheme(isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleToggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleSaveProfile = (updated: StudentProfile) => {
    setProfile(updated);
    saveProfile(updated);
  };

  // Launch a new exam session
  const handleStartExam = (config: {
    selectedSubjects: SubjectId[];
    examMode: 'standard_oau_mock' | 'subject_drill' | 'speed_sprint' | 'untimed_practice';
    questionsPerSubject: number;
    durationMinutes: number;
    examTitle: string;
  }) => {
    let generatedQuestions: Question[] = [];

    if (config.examMode === 'subject_drill' && config.selectedSubjects.length === 1) {
      generatedQuestions = getQuestionsForSubject(config.selectedSubjects[0], config.questionsPerSubject);
    } else {
      generatedQuestions = generateMockExam(config.selectedSubjects, config.questionsPerSubject);
    }

    // Fallback if empty
    if (generatedQuestions.length === 0) {
      generatedQuestions = OAU_QUESTION_BANK.slice(0, 20);
    }

    setActiveExamConfig({
      questions: generatedQuestions,
      selectedSubjects: config.selectedSubjects,
      durationMinutes: config.durationMinutes,
      examTitle: config.examTitle,
      examMode: config.examMode,
    });

    setCurrentView('active_exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Launch custom drill directly from Revision Bank
  const handleStartCustomDrill = (questions: Question[]) => {
    const subjects = Array.from(new Set(questions.map((q) => q.subjectId)));
    setActiveExamConfig({
      questions,
      selectedSubjects: subjects,
      durationMinutes: Math.max(10, Math.round(questions.length * 1.2)),
      examTitle: `Targeted Revision Vault Drill (${questions.length} Questions)`,
      examMode: 'standard_oau_mock',
    });
    setCurrentView('active_exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Exam Finished & Graded
  const handleSubmitExam = (result: TestResult) => {
    const updatedHistory = saveTestResult(result);
    setTestHistory(updatedHistory);
    setActiveResult(result);
    setActiveExamConfig(null);
    setCurrentView('result_review');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cancel/Exit active exam
  const handleExitExam = () => {
    setActiveExamConfig(null);
    setCurrentView('dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 font-sans flex flex-col justify-between selection:bg-purple-500 selection:text-white">
      
      {/* 1. Global Navigation Header */}
      <Header
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        onOpenAggregateCalc={() => setIsAggregateModalOpen(true)}
        onOpenAiTutor={() => setIsAiTutorModalOpen(true)}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        profile={profile}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
        isExamInProgress={currentView === 'active_exam'}
      />

      {/* 2. Main Screen Routing */}
      <main className="flex-1">
        
        {/* VIEW 1: Exam Configuration & Subject Selection */}
        {currentView === 'exam_setup' && (
          <ExamSetupModal
            profile={profile}
            onStartExam={handleStartExam}
          />
        )}

        {/* VIEW 2: Active CBT Exam Engine */}
        {currentView === 'active_exam' && activeExamConfig && (
          <CBTExamEngine
            questions={activeExamConfig.questions}
            selectedSubjects={activeExamConfig.selectedSubjects}
            durationMinutes={activeExamConfig.durationMinutes}
            examTitle={activeExamConfig.examTitle}
            examMode={activeExamConfig.examMode}
            profile={profile}
            onSubmitExam={handleSubmitExam}
            onExitExam={handleExitExam}
          />
        )}

        {/* VIEW 3: Instant Marking Result & Question Review */}
        {currentView === 'result_review' && activeResult && (
          <ResultReview
            result={activeResult}
            profile={profile}
            onRetakeExam={() => setCurrentView('exam_setup')}
            onGoToDashboard={() => setCurrentView('dashboard')}
          />
        )}

        {/* VIEW 4: Student Analytics Dashboard */}
        {currentView === 'dashboard' && (
          <StudentDashboard
            profile={profile}
            testHistory={testHistory}
            onStartNewMock={() => setCurrentView('exam_setup')}
            onViewRevisionBank={() => setCurrentView('revision_bank')}
            onOpenAggregateCalc={() => setIsAggregateModalOpen(true)}
            onOpenAiTutor={() => setIsAiTutorModalOpen(true)}
            onSelectPastResult={(res) => {
              setActiveResult(res);
              setCurrentView('result_review');
            }}
            onOpenProfile={() => setIsProfileModalOpen(true)}
          />
        )}

        {/* VIEW 5: Saved Questions & Revision Vault */}
        {currentView === 'revision_bank' && (
          <RevisionBank
            onStartCustomDrill={handleStartCustomDrill}
            onOpenAiTutor={() => setIsAiTutorModalOpen(true)}
          />
        )}

      </main>

      {/* 3. Global Footer with DLCF & OAU Info */}
      <footer className="w-full border-t border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md py-6 mt-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-blue-900 dark:text-blue-400">
              Deeper Life Campus Fellowship (DLCF)
            </span>
            <span>•</span>
            <span className="italic font-serif text-purple-700 dark:text-purple-300">
              "Assembly of Saintly Intellectuals"
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <span>Obafemi Awolowo University (OAU), Ile-Ife</span>
            <span>•</span>
            <span>Post-UTME Tutorial Directorate</span>
          </div>
        </div>
      </footer>

      {/* 4. Global Modals */}
      
      {/* OAU Aggregate Calculator Modal */}
      <AggregateCalculatorModal
        isOpen={isAggregateModalOpen}
        onClose={() => setIsAggregateModalOpen(false)}
        initialJambScore={profile.jambScore}
        initialPostUtmeScore={profile.targetPostUtmeScore}
        targetCourse={profile.targetCourse}
      />

      {/* Saintly AI Academic Coach Modal */}
      <AITutorModal
        isOpen={isAiTutorModalOpen}
        onClose={() => setIsAiTutorModalOpen(false)}
        profile={profile}
        lastTestResult={activeResult}
      />

      {/* Student Profile Settings Modal */}
      <StudentProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={profile}
        onSaveProfile={handleSaveProfile}
      />

    </div>
  );
}

export default App;
