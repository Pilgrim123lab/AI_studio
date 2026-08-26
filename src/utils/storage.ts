import { StudentProfile, SubjectId, TestResult, SavedQuestionItem } from '../types';

const STORAGE_KEYS = {
  PROFILE: 'dlcf_oau_profile',
  HISTORY: 'dlcf_oau_test_history',
  REVISION_BANK: 'dlcf_oau_revision_bank',
  THEME: 'dlcf_oau_theme',
  ACTIVE_EXAM_BACKUP: 'dlcf_oau_active_exam_backup',
};

export const DEFAULT_PROFILE: StudentProfile = {
  id: 'student_' + Math.random().toString(36).substring(2, 9),
  fullName: 'Great Ife Scholar',
  targetCourse: 'Medicine & Surgery (MBBS)',
  targetFaculty: 'Clinical Sciences & Health Sciences',
  jambScore: 285,
  targetPostUtmeScore: 330,
  subjectCombination: ['english', 'biology', 'chemistry', 'physics'],
  streakDays: 4,
  lastActiveDate: new Date().toISOString().split('T')[0],
  avatarSeed: 'scholar_1',
  dlcfFellowshipSubUnit: 'Academic & Career Guidance Committee',
};

export function getStoredProfile(): StudentProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (!raw) {
      saveProfile(DEFAULT_PROFILE);
      return DEFAULT_PROFILE;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load profile from localStorage', err);
    return DEFAULT_PROFILE;
  }
}

export function saveProfile(profile: StudentProfile): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  } catch (err) {
    console.error('Failed to save profile', err);
  }
}

export function getStoredTestHistory(): TestResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load test history', err);
    return [];
  }
}

export function saveTestResult(result: TestResult): TestResult[] {
  try {
    const current = getStoredTestHistory();
    const updated = [result, ...current];
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
    
    // Update streak if needed
    const profile = getStoredProfile();
    const today = new Date().toISOString().split('T')[0];
    if (profile.lastActiveDate !== today) {
      profile.streakDays += 1;
      profile.lastActiveDate = today;
      saveProfile(profile);
    }

    return updated;
  } catch (err) {
    console.error('Failed to save test result', err);
    return [];
  }
}

export function clearTestHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
  } catch (err) {
    console.error('Failed to clear test history', err);
  }
}

export function getStoredRevisionBank(): SavedQuestionItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.REVISION_BANK);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load revision bank', err);
    return [];
  }
}

export function toggleSaveQuestion(item: SavedQuestionItem): boolean {
  try {
    const current = getStoredRevisionBank();
    const exists = current.some((q) => q.question.id === item.question.id);
    let updated: SavedQuestionItem[];
    if (exists) {
      updated = current.filter((q) => q.question.id !== item.question.id);
    } else {
      updated = [item, ...current];
    }
    localStorage.setItem(STORAGE_KEYS.REVISION_BANK, JSON.stringify(updated));
    return !exists; // returns true if now saved, false if removed
  } catch (err) {
    console.error('Failed to toggle saved question', err);
    return false;
  }
}

export function isQuestionSaved(questionId: string): boolean {
  try {
    const current = getStoredRevisionBank();
    return current.some((q) => q.question.id === questionId);
  } catch {
    return false;
  }
}

export function getStoredTheme(): 'light' | 'dark' {
  try {
    const theme = localStorage.getItem(STORAGE_KEYS.THEME);
    if (theme === 'dark' || theme === 'light') return theme;
    return 'light'; // Default to sophisticated light mode
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
