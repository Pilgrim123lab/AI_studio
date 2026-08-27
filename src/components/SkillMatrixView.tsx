import React from 'react';
import { 
  Network, 
  CheckCircle2, 
  Lock, 
  Award, 
  Sparkles, 
  GitMerge, 
  TrendingUp, 
  Star,
  ShieldCheck
} from 'lucide-react';
import { SKILL_NODES, BADGES } from '../data/skillsAndBadges';
import { UserProgress } from '../types';
import { getRankTitle } from '../utils/storage';

interface SkillMatrixViewProps {
  progress: UserProgress;
}

export const SkillMatrixView: React.FC<SkillMatrixViewProps> = ({ progress }) => {
  const rankTitle = getRankTitle(progress.currentLevel);

  // Group skills by category
  const categories = Array.from(new Set(SKILL_NODES.map((s) => s.category)));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold mb-2">
          <Network className="w-3.5 h-3.5" />
          <span>Competency Matrix & Verified Badges</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Data Analyst to Global AI Engineer Skill Matrix
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl">
          Visual mapping of how your tabular analytics foundation transitions directly into deep learning tensors, vector indices, and distributed LLM serving.
        </p>
      </div>

      {/* Profile Overview Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-slate-800 shadow-xl mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center font-black text-2xl border-2 border-indigo-400/40 shadow-lg">
              L{progress.currentLevel}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-bold">{progress.userName}</h2>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  Active
                </span>
              </div>
              <p className="text-xs text-indigo-300 font-medium">{rankTitle}</p>
              <span className="text-[11px] text-slate-400 font-mono mt-0.5 block">
                Total XP Earned: {progress.totalXP} XP &bull; Streak: {progress.streakDays} Days
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="text-right">
              <span className="text-[11px] text-slate-400 block uppercase font-semibold">Badges Unlocked</span>
              <span className="text-xl font-black text-white">{progress.unlockedBadges.length} / {BADGES.length}</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-amber-400">
              <Award className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Badges Showcase */}
      <div className="mb-10">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
          Earned Global Credentials & Milestones
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {BADGES.map((badge) => {
            const isUnlocked = progress.unlockedBadges.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`p-4 rounded-xl border text-center transition-all flex flex-col items-center justify-between ${
                  isUnlocked
                    ? 'bg-white dark:bg-slate-800/90 border-indigo-500 shadow-md ring-1 ring-indigo-500/30'
                    : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-60'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-2">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-1">{badge.title}</h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-tight">
                    {badge.description}
                  </p>
                </div>
                <div className="mt-3">
                  {isUnlocked ? (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                      Unlocked
                    </span>
                  ) : (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500 font-mono">
                      {badge.conditionDescription}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Skill Matrix Grid */}
      <div className="space-y-8">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Core Competency Mapping
        </h3>

        {categories.map((category) => {
          const skillsInCat = SKILL_NODES.filter((s) => s.category === category);

          return (
            <div key={category} className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
              <h4 className="text-base font-extrabold text-slate-900 dark:text-white mb-4">
                {category}
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skillsInCat.map((skill) => {
                  const isUnlocked = progress.currentLevel >= skill.level;

                  return (
                    <div
                      key={skill.id}
                      className={`p-4 rounded-xl border transition-all ${
                        isUnlocked
                          ? 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-700'
                          : 'bg-slate-50/50 dark:bg-slate-950/40 border-dashed border-slate-300 dark:border-slate-800 opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">{skill.name}</span>
                        {isUnlocked ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Lock className="w-3.5 h-3.5 text-slate-400" />
                        )}
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/30 text-slate-700 dark:text-slate-300 text-[11px]">
                          <span className="font-semibold text-amber-700 dark:text-amber-400 block mb-0.5">Analyst Foundation:</span>
                          {skill.analystSource}
                        </div>

                        <div className="p-2 rounded bg-indigo-50 dark:bg-indigo-950/30 text-slate-700 dark:text-slate-300 text-[11px]">
                          <span className="font-semibold text-indigo-700 dark:text-indigo-400 block mb-0.5">AI Engineer Mastery:</span>
                          {skill.engineerTarget}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
