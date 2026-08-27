import React from 'react';
import { 
  Compass, 
  Layers, 
  Code2, 
  Cpu, 
  Network, 
  MessageSquareCode, 
  FileText, 
  Flame, 
  Sun, 
  Moon,
  Sparkles,
  ChevronRight,
  Play,
  BookOpen,
  Terminal
} from 'lucide-react';
import { UserProgress } from '../types';
import { getRankTitle, getXPProgressInCurrentLevel } from '../utils/storage';

export type NavigationTab = 'roadmap' | 'practicum' | 'tutorials' | 'projects' | 'coding_lab' | 'system_design' | 'skill_matrix' | 'ai_mentor';

interface HeaderProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  progress: UserProgress;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onOpenPortfolio: () => void;
  onRoleChange?: (role: import('../types').CareerRole) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  progress,
  theme,
  toggleTheme,
  onOpenPortfolio,
  onRoleChange,
}) => {
  const { currentLevelXP, requiredLevelXP, progressPercent } = getXPProgressInCurrentLevel(progress.totalXP);
  const rankTitle = getRankTitle(progress.currentLevel);

  const roleLabels: Record<string, string> = {
    data_analyst: 'Data Analyst (DA)',
    data_scientist: 'Data Scientist (DS)',
    ml_engineer: 'ML Engineer (MLE)',
    ai_engineer: 'AI Engineer (AIE)',
  };

  const navItems: { id: NavigationTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'roadmap', label: 'Mastery Roadmap', icon: <Compass className="w-4 h-4" /> },
    { id: 'practicum', label: '4-Role Practicum & Sandboxes', icon: <Terminal className="w-4 h-4 text-sky-400" />, badge: 'Live SQL/ML/RAG' },
    { id: 'tutorials', label: 'Tutorials & Masterclasses', icon: <Play className="w-4 h-4 text-emerald-400" />, badge: 'Video + AI' },
    { id: 'projects', label: 'Real-World Projects', icon: <Layers className="w-4 h-4" />, badge: '6 Flagship' },
    { id: 'coding_lab', label: 'Algorithm Lab', icon: <Code2 className="w-4 h-4" /> },
    { id: 'system_design', label: 'System Design & Papers', icon: <Cpu className="w-4 h-4" /> },
    { id: 'skill_matrix', label: 'Skill Matrix', icon: <Network className="w-4 h-4" /> },
    { id: 'ai_mentor', label: 'AI Architect Mentor', icon: <MessageSquareCode className="w-4 h-4" />, badge: 'Gemini' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Tier: Brand, Level & Global Actions */}
        <div className="flex items-center justify-between py-3 border-b border-slate-800/60">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-black text-xl">
              N
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg tracking-tight text-white">NexusAI</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-medium border border-indigo-500/30">
                  Data Analyst &rarr; AI Engineer
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">World-Class AI Systems & LLM Architecture Mastery</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Role Track Selector */}
            <button
              onClick={() => setActiveTab('practicum')}
              className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/20 text-xs font-semibold transition-all"
              title="Click to open 4-Role Practicum & Matrix"
            >
              <Terminal className="w-3.5 h-3.5 text-sky-400" />
              <span>Track: <strong className="text-white">{roleLabels[progress.activeRole || 'ai_engineer'] || 'AI Engineer'}</strong></span>
            </button>

            {/* Streak Counter */}
            <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>{progress.streakDays} Day Streak</span>
            </div>

            {/* Level & XP Widget */}
            <div className="flex items-center space-x-3 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
              <div className="w-8 h-8 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-300 font-bold text-sm">
                L{progress.currentLevel}
              </div>
              <div className="text-left">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-slate-200">{rankTitle}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{progress.totalXP} XP</span>
                </div>
                {/* Micro Progress Bar */}
                <div className="w-28 sm:w-36 bg-slate-700 rounded-full h-1.5 mt-1 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-1.5 rounded-full transition-all duration-500" 
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Portfolio Dossier Button */}
            <button
              onClick={onOpenPortfolio}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition-all duration-200"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden md:inline">Export Portfolio</span>
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Bottom Tier: Primary Navigation Tabs */}
        <nav className="flex items-center space-x-1 overflow-x-auto py-2 scrollbar-none">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                    isActive ? 'bg-indigo-800/80 text-white' : 'bg-slate-800 text-indigo-400 border border-indigo-500/20'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
