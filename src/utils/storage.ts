import { UserProgress } from '../types';
import { BADGES } from '../data/skillsAndBadges';

const STORAGE_KEYS = {
  USER_PROGRESS: 'nexus_ai_user_progress',
  THEME: 'nexus_ai_theme',
};

export const DEFAULT_USER_PROGRESS: UserProgress = {
  userName: 'Aspiring Global AI Engineer',
  currentLevel: 1,
  totalXP: 0,
  activeRole: 'ai_engineer',
  completedTopicIds: [],
  completedTutorialIds: [],
  completedPracticumIds: [],
  completedProjectMilestones: {},
  completedProjectIds: [],
  completedChallengeIds: [],
  unlockedBadges: [],
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  notes: {},
  savedCodeSnippets: {},
  savedTutorials: [],
};

export function getRankTitle(level: number): string {
  if (level <= 2) return 'Data Analyst & AI Apprentice';
  if (level <= 4) return 'Vector & ML Systems Practitioner';
  if (level <= 6) return 'Deep Learning & Attention Engineer';
  if (level <= 8) return 'Production LLM & RAG Architect';
  if (level <= 10) return 'Principal Autonomous Systems Engineer';
  return 'Global AI Luminary & Enterprise Architect';
}

export function calculateLevelFromXP(xp: number): number {
  // Base 500 XP per level with gentle scaling
  return Math.max(1, Math.floor(xp / 500) + 1);
}

export function getXPProgressInCurrentLevel(xp: number): { currentLevelXP: number; requiredLevelXP: number; progressPercent: number } {
  const currentLevel = calculateLevelFromXP(xp);
  const startXP = (currentLevel - 1) * 500;
  const currentLevelXP = xp - startXP;
  const requiredLevelXP = 500;
  const progressPercent = Math.min(100, Math.round((currentLevelXP / requiredLevelXP) * 100));
  return { currentLevelXP, requiredLevelXP, progressPercent };
}

export function getStoredUserProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_PROGRESS);
    if (!raw) {
      saveUserProgress(DEFAULT_USER_PROGRESS);
      return DEFAULT_USER_PROGRESS;
    }
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_USER_PROGRESS, ...parsed };
  } catch (err) {
    console.error('Failed to load user progress from localStorage', err);
    return DEFAULT_USER_PROGRESS;
  }
}

export function saveUserProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(progress));
  } catch (err) {
    console.error('Failed to save user progress', err);
  }
}

export function addXP(amount: number): { newProgress: UserProgress; leveledUp: boolean } {
  const current = getStoredUserProgress();
  const oldLevel = current.currentLevel;
  const newXP = current.totalXP + amount;
  const newLevel = calculateLevelFromXP(newXP);

  // Update streak if needed
  const today = new Date().toISOString().split('T')[0];
  let streak = current.streakDays;
  if (current.lastActiveDate !== today) {
    streak += 1;
  }

  // Check badges
  const unlockedBadges = [...current.unlockedBadges];
  BADGES.forEach((badge) => {
    if (!unlockedBadges.includes(badge.id)) {
      if (badge.id === 'badge_first_project' && Object.keys(current.completedProjectMilestones).length > 0) {
        unlockedBadges.push(badge.id);
      }
      if (badge.id === 'badge_code_challenger' && current.completedChallengeIds.length > 0) {
        unlockedBadges.push(badge.id);
      }
      if (badge.id === 'badge_global_expert' && newLevel >= 10) {
        unlockedBadges.push(badge.id);
      }
    }
  });

  const updated: UserProgress = {
    ...current,
    totalXP: newXP,
    currentLevel: newLevel,
    streakDays: streak,
    lastActiveDate: today,
    unlockedBadges,
  };

  saveUserProgress(updated);
  return { newProgress: updated, leveledUp: newLevel > oldLevel };
}

export function markTopicComplete(topicId: string, xpReward: number): { newProgress: UserProgress; leveledUp: boolean } {
  const current = getStoredUserProgress();
  if (current.completedTopicIds.includes(topicId)) {
    return { newProgress: current, leveledUp: false };
  }

  const updatedTopics = [...current.completedTopicIds, topicId];
  saveUserProgress({ ...current, completedTopicIds: updatedTopics });
  return addXP(xpReward);
}

export function markMilestoneComplete(projectId: string, milestoneId: string, xpReward: number): { newProgress: UserProgress; leveledUp: boolean } {
  const current = getStoredUserProgress();
  const milestonesForProj = current.completedProjectMilestones[projectId] || [];
  
  if (milestonesForProj.includes(milestoneId)) {
    return { newProgress: current, leveledUp: false };
  }

  const updatedMilestones = {
    ...current.completedProjectMilestones,
    [projectId]: [...milestonesForProj, milestoneId],
  };

  saveUserProgress({ ...current, completedProjectMilestones: updatedMilestones });
  return addXP(xpReward);
}

export function markChallengeComplete(challengeId: string, xpReward: number): { newProgress: UserProgress; leveledUp: boolean } {
  const current = getStoredUserProgress();
  if (current.completedChallengeIds.includes(challengeId)) {
    return { newProgress: current, leveledUp: false };
  }

  const updatedChallenges = [...current.completedChallengeIds, challengeId];
  saveUserProgress({ ...current, completedChallengeIds: updatedChallenges });
  return addXP(xpReward);
}

export function setActiveRole(role: import('../types').CareerRole): UserProgress {
  const current = getStoredUserProgress();
  const updated = { ...current, activeRole: role };
  saveUserProgress(updated);
  return updated;
}

export function markPracticumComplete(practicumId: string, xpReward: number): { newProgress: UserProgress; leveledUp: boolean } {
  const current = getStoredUserProgress();
  const completedPracticums = current.completedPracticumIds || [];
  if (completedPracticums.includes(practicumId)) {
    return { newProgress: current, leveledUp: false };
  }

  const updated = [...completedPracticums, practicumId];
  saveUserProgress({ ...current, completedPracticumIds: updated });
  return addXP(xpReward);
}

export function markTutorialComplete(tutorialId: string, xpReward: number): { newProgress: UserProgress; leveledUp: boolean } {
  const current = getStoredUserProgress();
  const completedTutorials = current.completedTutorialIds || [];
  if (completedTutorials.includes(tutorialId)) {
    return { newProgress: current, leveledUp: false };
  }

  const updated = [...completedTutorials, tutorialId];
  saveUserProgress({ ...current, completedTutorialIds: updated });
  return addXP(xpReward);
}

export function saveGeneratedMasterclass(masterclass: any): UserProgress {
  const current = getStoredUserProgress();
  const existing = current.savedTutorials || [];
  const updatedList = [masterclass, ...existing.filter((m: any) => m.id !== masterclass.id)];
  const updated = { ...current, savedTutorials: updatedList };
  saveUserProgress(updated);
  return updated;
}

export function deleteGeneratedMasterclass(masterclassId: string): UserProgress {
  const current = getStoredUserProgress();
  const existing = current.savedTutorials || [];
  const updatedList = existing.filter((m: any) => m.id !== masterclassId);
  const updated = { ...current, savedTutorials: updatedList };
  saveUserProgress(updated);
  return updated;
}

export function saveTopicNote(topicId: string, noteText: string): UserProgress {
  const current = getStoredUserProgress();
  const updatedNotes = { ...current.notes, [topicId]: noteText };
  const updated = { ...current, notes: updatedNotes };
  saveUserProgress(updated);
  return updated;
}

export function saveUserCodeSnippet(key: string, code: string): UserProgress {
  const current = getStoredUserProgress();
  const updatedSnippets = { ...current.savedCodeSnippets, [key]: code };
  const updated = { ...current, savedCodeSnippets: updatedSnippets };
  saveUserProgress(updated);
  return updated;
}

export function getStoredTheme(): 'light' | 'dark' {
  try {
    const theme = localStorage.getItem(STORAGE_KEYS.THEME);
    if (theme === 'dark' || theme === 'light') return theme;
    return 'light'; // Sophisticated light mode default
  } catch {
    return 'light';
  }
}

export function setStoredTheme(theme: 'light' | 'dark'): void {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (err) {
    console.error('Failed to set theme', err);
  }
}
