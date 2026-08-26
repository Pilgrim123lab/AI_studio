import React, { useState } from 'react';
import { X, User, GraduationCap, Target, Save } from 'lucide-react';
import { StudentProfile, SubjectId } from '../types';
import { FACULTY_PRESETS } from '../data/facultyPresets';
import { SUBJECT_METADATA } from '../data/oauQuestions';

interface StudentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
  onSaveProfile: (updated: StudentProfile) => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
}) => {
  const [fullName, setFullName] = useState(profile.fullName);
  const [targetCourse, setTargetCourse] = useState(profile.targetCourse);
  const [targetFaculty, setTargetFaculty] = useState(profile.targetFaculty);
  const [jambScore, setJambScore] = useState(profile.jambScore);
  const [targetPostUtmeScore, setTargetPostUtmeScore] = useState(profile.targetPostUtmeScore);
  const [selectedSubjects, setSelectedSubjects] = useState<SubjectId[]>(profile.subjectCombination);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({
      ...profile,
      fullName: fullName.trim() || 'Great Ife Scholar',
      targetCourse: targetCourse.trim() || 'Medicine & Surgery (MBBS)',
      targetFaculty,
      jambScore: Number(jambScore) || 280,
      targetPostUtmeScore: Number(targetPostUtmeScore) || 320,
      subjectCombination: selectedSubjects,
    });
    onClose();
  };

  const handleFacultyChange = (facName: string) => {
    setTargetFaculty(facName);
    const preset = FACULTY_PRESETS.find((p) => p.facultyName === facName);
    if (preset) {
      setSelectedSubjects(preset.defaultSubjects);
      if (preset.courseExamples.length > 0) {
        setTargetCourse(preset.courseExamples[0]);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6 my-8 animate-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-slate-100">
                Student Profile & Target Settings
              </h2>
              <p className="text-xs text-slate-500">
                Personalize your OAU aspirant goals and target scores
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Full Name */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Full Name / Candidate Name:
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Oluwaseun Emmanuel"
              required
              className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
            />
          </div>

          {/* Target Faculty */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Target Faculty:
            </label>
            <select
              value={targetFaculty}
              onChange={(e) => handleFacultyChange(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
            >
              {FACULTY_PRESETS.map((preset) => (
                <option key={preset.id} value={preset.facultyName}>
                  {preset.facultyName}
                </option>
              ))}
            </select>
          </div>

          {/* Target Course */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Target Degree Course:
            </label>
            <input
              type="text"
              value={targetCourse}
              onChange={(e) => setTargetCourse(e.target.value)}
              placeholder="e.g. Medicine & Surgery (MBBS), Law, Computer Science"
              required
              className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
            />
          </div>

          {/* JAMB & Target Post-UTME Scores */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Your JAMB Score:
              </label>
              <input
                type="number"
                min={100}
                max={400}
                value={jambScore}
                onChange={(e) => setJambScore(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Target Post-UTME (/400):
              </label>
              <input
                type="number"
                min={100}
                max={400}
                value={targetPostUtmeScore}
                onChange={(e) => setTargetPostUtmeScore(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xs sm:text-sm font-extrabold shadow-md flex items-center justify-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save & Update Profile</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
