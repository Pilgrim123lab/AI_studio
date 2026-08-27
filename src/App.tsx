import React, { useState, useEffect } from 'react';
import { 
  Header, 
  NavigationTab 
} from './components/Header';
import { RoadmapView } from './components/RoadmapView';
import { InteractivePracticum } from './components/InteractivePracticum';
import { TutorialsHub } from './components/TutorialsHub';
import { ProjectsStudio } from './components/ProjectsStudio';
import { CodingLab } from './components/CodingLab';
import { SystemDesignLab } from './components/SystemDesignLab';
import { SkillMatrixView } from './components/SkillMatrixView';
import { AIMentorChat } from './components/AIMentorChat';
import { PortfolioModal } from './components/PortfolioModal';
import { UserProgress, CareerRole } from './types';
import { 
  getStoredUserProgress, 
  saveUserProgress, 
  markTopicComplete, 
  markTutorialComplete,
  markPracticumComplete,
  setActiveRole,
  markMilestoneComplete, 
  markChallengeComplete,
  getStoredTheme, 
  setStoredTheme,
  getRankTitle
} from './utils/storage';
import { Sparkles, Award, Flame, CheckCircle2, X } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('roadmap');
  const [progress, setProgress] = useState<UserProgress>(getStoredUserProgress);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState<boolean>(false);
  const [levelUpToast, setLevelUpToast] = useState<{ show: boolean; level: number; title: string } | null>(null);

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = getStoredTheme();
    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
      return 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      return 'light';
    }
  });

  useEffect(() => {
    setStoredTheme(theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleRefreshProgress = () => {
    setProgress(getStoredUserProgress());
  };

  const handleTopicCompleted = (topicId: string, xpReward: number) => {
    const { newProgress, leveledUp } = markTopicComplete(topicId, xpReward);
    setProgress(newProgress);

    if (leveledUp) {
      setLevelUpToast({
        show: true,
        level: newProgress.currentLevel,
        title: getRankTitle(newProgress.currentLevel),
      });
    }
  };

  const handleTutorialCompleted = (tutorialId: string, xpReward: number) => {
    const { newProgress, leveledUp } = markTutorialComplete(tutorialId, xpReward);
    setProgress(newProgress);

    if (leveledUp) {
      setLevelUpToast({
        show: true,
        level: newProgress.currentLevel,
        title: getRankTitle(newProgress.currentLevel),
      });
    }
  };

  const handleRoleChange = (role: CareerRole) => {
    const updated = setActiveRole(role);
    setProgress(updated);
  };

  const handlePracticumCompleted = (practicumId: string, xpReward: number) => {
    const { newProgress, leveledUp } = markPracticumComplete(practicumId, xpReward);
    setProgress(newProgress);

    if (leveledUp) {
      setLevelUpToast({
        show: true,
        level: newProgress.currentLevel,
        title: getRankTitle(newProgress.currentLevel),
      });
    }
  };

  const handleMilestoneCompleted = (projectId: string, milestoneId: string, xpReward: number) => {
    const { newProgress, leveledUp } = markMilestoneComplete(projectId, milestoneId, xpReward);
    setProgress(newProgress);

    if (leveledUp) {
      setLevelUpToast({
        show: true,
        level: newProgress.currentLevel,
        title: getRankTitle(newProgress.currentLevel),
      });
    }
  };

  const handleChallengeCompleted = (challengeId: string, xpReward: number) => {
    const { newProgress, leveledUp } = markChallengeComplete(challengeId, xpReward);
    setProgress(newProgress);

    if (leveledUp) {
      setLevelUpToast({
        show: true,
        level: newProgress.currentLevel,
        title: getRankTitle(newProgress.currentLevel),
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 font-sans flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* 1. Global Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        progress={progress}
        theme={theme}
        toggleTheme={handleToggleTheme}
        onOpenPortfolio={() => setIsPortfolioOpen(true)}
        onRoleChange={handleRoleChange}
      />

      {/* 2. Main Content Views */}
      <main className="flex-1">
        {activeTab === 'roadmap' && (
          <RoadmapView
            progress={progress}
            onCompleteTopic={handleTopicCompleted}
            onSelectProject={() => setActiveTab('projects')}
            onNavigateToTutorialsHub={() => setActiveTab('tutorials')}
            onCompleteTutorial={handleTutorialCompleted}
          />
        )}

        {activeTab === 'practicum' && (
          <InteractivePracticum
            progress={progress}
            activeRole={progress.activeRole || 'ai_engineer'}
            onRoleChange={handleRoleChange}
            onCompletePracticum={handlePracticumCompleted}
          />
        )}

        {activeTab === 'tutorials' && (
          <TutorialsHub
            progress={progress}
            onCompleteTutorial={handleTutorialCompleted}
            onSelectProject={() => setActiveTab('projects')}
            onRefreshProgress={handleRefreshProgress}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectsStudio
            progress={progress}
            onCompleteMilestone={handleMilestoneCompleted}
          />
        )}

        {activeTab === 'coding_lab' && (
          <CodingLab
            progress={progress}
            onCompleteChallenge={handleChallengeCompleted}
          />
        )}

        {activeTab === 'system_design' && (
          <SystemDesignLab />
        )}

        {activeTab === 'skill_matrix' && (
          <SkillMatrixView
            progress={progress}
          />
        )}

        {activeTab === 'ai_mentor' && (
          <AIMentorChat
            progress={progress}
          />
        )}
      </main>

      {/* 3. Global Footer */}
      <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md py-6 mt-12 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-900 dark:text-white">NexusAI Engineering Platform</span>
            <span>&bull;</span>
            <span>Transitioning Data Analysts to Global AI Engineering Experts</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsPortfolioOpen(true)}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
            >
              Export Capability Dossier (.md)
            </button>
            <span>&bull;</span>
            <span>Gemini 2.5 Architecture Evaluation</span>
          </div>
        </div>
      </footer>

      {/* 4. Level Up Celebration Toast */}
      {levelUpToast?.show && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-gradient-to-r from-indigo-900 to-slate-900 text-white border border-indigo-500/50 shadow-2xl flex items-center space-x-4 animate-bounce">
          <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-md">
            L{levelUpToast.level}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Level Up Unlocked!</span>
            </div>
            <h4 className="text-sm font-extrabold text-white">{levelUpToast.title}</h4>
            <p className="text-[11px] text-slate-300">You unlocked new advanced architecture modules.</p>
          </div>
          <button
            onClick={() => setLevelUpToast(null)}
            className="text-slate-400 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 5. Portfolio Export Modal */}
      <PortfolioModal
        isOpen={isPortfolioOpen}
        onClose={() => setIsPortfolioOpen(false)}
        progress={progress}
      />
    </div>
  );
}

export default App;
