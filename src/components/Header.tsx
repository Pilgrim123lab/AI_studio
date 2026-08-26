import React from 'react';
import { 
  GraduationCap, 
  Moon, 
  Sun, 
  Flame, 
  BarChart3, 
  PlayCircle, 
  BookmarkCheck, 
  Calculator, 
  Sparkles,
  UserCheck,
  BookOpenCheck
} from 'lucide-react';
import { StudentProfile } from '../types';

interface HeaderProps {
  currentView: 'exam_setup' | 'active_exam' | 'result_review' | 'dashboard' | 'revision_bank';
  onNavigate: (view: 'exam_setup' | 'dashboard' | 'revision_bank') => void;
  onOpenAggregateCalc: () => void;
  onOpenAiTutor: () => void;
  onOpenProfile: () => void;
  profile: StudentProfile;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  isExamInProgress: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onOpenAggregateCalc,
  onOpenAiTutor,
  onOpenProfile,
  profile,
  isDarkMode,
  onToggleTheme,
  isExamInProgress,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-indigo-100 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md transition-colors duration-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand & DLCF Identity */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => !isExamInProgress && onNavigate('dashboard')}>
            <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20 ring-2 ring-white dark:ring-slate-800">
              <GraduationCap className="w-7 h-7" />
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-bold text-white border-2 border-white dark:border-slate-900">
                ✓
              </span>
            </div>
            
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-700 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-300 bg-clip-text text-transparent">
                  DLCF OAU CBT
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase rounded-full bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                  Post-UTME Portal
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium tracking-normal flex items-center gap-1.5">
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Deeper Life Campus Fellowship</span>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span className="italic text-slate-600 dark:text-slate-400 font-serif">"Assembly of Saintly Intellectuals"</span>
              </p>
            </div>
          </div>

          {/* Desktop Nav Items (Disabled during active exam to maintain exam focus) */}
          {!isExamInProgress ? (
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              <button
                id="nav-btn-mock"
                onClick={() => onNavigate('exam_setup')}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                  currentView === 'exam_setup'
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <PlayCircle className="w-4 h-4" />
                <span>Start Mock CBT</span>
              </button>

              <button
                id="nav-btn-dashboard"
                onClick={() => onNavigate('dashboard')}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                  currentView === 'dashboard'
                    ? 'bg-purple-600 text-white shadow-sm shadow-purple-500/25'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Student Dashboard</span>
              </button>

              <button
                id="nav-btn-revision"
                onClick={() => onNavigate('revision_bank')}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                  currentView === 'revision_bank'
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/25'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <BookmarkCheck className="w-4 h-4" />
                <span>Revision Bank</span>
              </button>

              <button
                id="nav-btn-aggregate"
                onClick={onOpenAggregateCalc}
                className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Calculate official OAU Composite Admission Aggregate (JAMB 50% + Post-UTME 50%)"
              >
                <Calculator className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>OAU Aggregate</span>
              </button>

              <button
                id="nav-btn-ai-tutor"
                onClick={onOpenAiTutor}
                className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/40 dark:to-blue-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/60 hover:border-purple-400 transition-all shadow-xs"
              >
                <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400 animate-pulse" />
                <span>DLCF AI Tutor</span>
              </button>
            </nav>
          ) : (
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-800 dark:text-amber-300 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              <span>OAU CBT Exam Session Active</span>
            </div>
          )}

          {/* Right actions: Dark Mode Toggle, Streak & Profile */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Study Streak Badge */}
            <div 
              className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/60 text-orange-700 dark:text-orange-300 text-xs font-bold"
              title={`${profile.streakDays} Day Study Streak`}
            >
              <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
              <span>{profile.streakDays}d Streak</span>
            </div>

            {/* Dark / Light Mode Switcher */}
            <button
              id="theme-toggle-btn"
              onClick={onToggleTheme}
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode for late-night study'}
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-700" />
              )}
            </button>

            {/* Student Profile Pill */}
            <button
              id="profile-btn"
              onClick={onOpenProfile}
              className="flex items-center space-x-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-purple-400 transition-all text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-xs">
                {profile.fullName.charAt(0)}
              </div>
              <div className="hidden lg:block text-xs">
                <div className="font-bold text-slate-800 dark:text-slate-100 truncate max-w-[120px]">
                  {profile.fullName}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[120px]">
                  {profile.targetCourse}
                </div>
              </div>
            </button>

          </div>
        </div>

        {/* Mobile Submenu navigation (if not in active exam) */}
        {!isExamInProgress && (
          <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 overflow-x-auto">
            <button 
              onClick={() => onNavigate('exam_setup')}
              className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-md ${currentView === 'exam_setup' ? 'text-blue-600 dark:text-blue-400 font-bold' : ''}`}
            >
              <PlayCircle className="w-3.5 h-3.5" />
              <span>Mock CBT</span>
            </button>
            <button 
              onClick={() => onNavigate('dashboard')}
              className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-md ${currentView === 'dashboard' ? 'text-purple-600 dark:text-purple-400 font-bold' : ''}`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>
            <button 
              onClick={() => onNavigate('revision_bank')}
              className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-md ${currentView === 'revision_bank' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : ''}`}
            >
              <BookmarkCheck className="w-3.5 h-3.5" />
              <span>Revision</span>
            </button>
            <button 
              onClick={onOpenAggregateCalc}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-md text-slate-600 dark:text-slate-300"
            >
              <Calculator className="w-3.5 h-3.5 text-blue-600" />
              <span>Aggregate</span>
            </button>
            <button 
              onClick={onOpenAiTutor}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-md text-purple-600 dark:text-purple-400"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Tutor</span>
            </button>
          </div>
        )}

      </div>
    </header>
  );
};
