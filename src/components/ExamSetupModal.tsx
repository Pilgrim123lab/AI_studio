import React, { useState } from 'react';
import { 
  Play, 
  CheckCircle2, 
  Layers, 
  Timer, 
  Sparkles, 
  HelpCircle, 
  Compass, 
  ShieldCheck, 
  Sliders,
  ChevronRight,
  GraduationCap
} from 'lucide-react';
import { FACULTY_PRESETS } from '../data/facultyPresets';
import { SUBJECT_METADATA } from '../data/oauQuestions';
import { SubjectId, StudentProfile } from '../types';

interface ExamSetupModalProps {
  profile: StudentProfile;
  onStartExam: (config: {
    selectedSubjects: SubjectId[];
    examMode: 'standard_oau_mock' | 'subject_drill' | 'speed_sprint' | 'untimed_practice';
    questionsPerSubject: number;
    durationMinutes: number;
    examTitle: string;
  }) => void;
}

export const ExamSetupModal: React.FC<ExamSetupModalProps> = ({ profile, onStartExam }) => {
  const [selectedFacultyId, setSelectedFacultyId] = useState<string>('medicine_health');
  const [selectedSubjects, setSelectedSubjects] = useState<SubjectId[]>(profile.subjectCombination || ['english', 'biology', 'chemistry', 'physics']);
  const [examMode, setExamMode] = useState<'standard_oau_mock' | 'subject_drill' | 'speed_sprint' | 'untimed_practice'>('standard_oau_mock');
  const [singleSubject, setSingleSubject] = useState<SubjectId>('mathematics');
  const [customTimeMinutes, setCustomTimeMinutes] = useState<number>(40);

  // Handle Preset selection
  const handleSelectPreset = (presetId: string) => {
    setSelectedFacultyId(presetId);
    const preset = FACULTY_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setSelectedSubjects(preset.defaultSubjects);
    }
  };

  // Toggle elective subject
  const handleToggleSubject = (subId: SubjectId) => {
    if (subId === 'english') return; // English is strictly compulsory for OAU

    if (selectedSubjects.includes(subId)) {
      if (selectedSubjects.length > 2) {
        setSelectedSubjects(selectedSubjects.filter((id) => id !== subId));
      }
    } else {
      if (selectedSubjects.length < 4) {
        setSelectedSubjects([...selectedSubjects, subId]);
      } else {
        // Replace last chosen non-English subject
        const nonEnglish = selectedSubjects.filter((id) => id !== 'english');
        setSelectedSubjects(['english', nonEnglish[0], nonEnglish[1], subId]);
      }
    }
  };

  const handleLaunch = () => {
    let finalSubjects: SubjectId[] = [];
    let qPerSubject = 5;
    let duration = 40;
    let title = 'OAU Post-UTME 4-Subject CBT Mock';

    if (examMode === 'standard_oau_mock') {
      finalSubjects = selectedSubjects;
      qPerSubject = 5; // Total 20-40 depending on combination
      duration = 40;
      title = `OAU Post-UTME Mock (${finalSubjects.map((s) => SUBJECT_METADATA[s].shortName).join(' • ')})`;
    } else if (examMode === 'speed_sprint') {
      finalSubjects = selectedSubjects;
      qPerSubject = 3;
      duration = 15;
      title = 'OAU 15-Minute Rapid Speed Blitz';
    } else if (examMode === 'subject_drill') {
      finalSubjects = [singleSubject];
      qPerSubject = 10;
      duration = 15;
      title = `${SUBJECT_METADATA[singleSubject].name} Specialized Drill`;
    } else if (examMode === 'untimed_practice') {
      finalSubjects = selectedSubjects;
      qPerSubject = 5;
      duration = 999; // Untimed
      title = 'OAU Post-UTME Untimed Study Mode';
    }

    onStartExam({
      selectedSubjects: finalSubjects,
      examMode,
      questionsPerSubject: qPerSubject,
      durationMinutes: duration,
      examTitle: title,
    });
  };

  return (
    <div className="max-w-5xl mx-auto py-6 sm:py-10 px-4 sm:px-6">
      
      {/* Hero Welcome Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white p-6 sm:p-10 shadow-xl overflow-hidden mb-8 border border-blue-800/40">
        
        {/* Glow & Decorative Shapes */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-purple-200 mb-4">
            <GraduationCap className="w-3.5 h-3.5 text-purple-300" />
            <span>DLCF OAU Academic Excellence Initiative</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Obafemi Awolowo University <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 bg-clip-text text-transparent">
              Post-UTME CBT Exam Simulator
            </span>
          </h1>

          <p className="text-sm sm:text-base text-blue-100/90 max-w-2xl leading-relaxed mb-6 font-normal">
            Welcome, <span className="font-semibold text-white">{profile.fullName}</span>. Prepare under real OAU CBT conditions with verified past questions, automated marking, speed analytics, and AI tutor explanations.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-blue-200">
            <div className="flex items-center space-x-1.5 bg-black/20 px-3 py-1.5 rounded-lg border border-white/10">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Authentic OAU Past Questions</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-black/20 px-3 py-1.5 rounded-lg border border-white/10">
              <Timer className="w-4 h-4 text-amber-400" />
              <span>Realistic Countdown Timer</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-black/20 px-3 py-1.5 rounded-lg border border-white/10">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Instant Marking & Aggregate Predictor</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Config Panels */}
        <div className="lg:col-span-2 space-y-6">

          {/* STEP 1: Exam Mode Selection */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 text-xs font-black">
                  1
                </span>
                <span>Select Examination Mode</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* Mode A: Full 4-Subject Mock */}
              <div
                onClick={() => setExamMode('standard_oau_mock')}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  examMode === 'standard_oau_mock'
                    ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 dark:border-blue-500 shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    Full 4-Subject OAU Mock
                  </div>
                  <Timer className={`w-4 h-4 ${examMode === 'standard_oau_mock' ? 'text-blue-600' : 'text-slate-400'}`} />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Authentic 4-subject combo exam with 40-minute strict countdown timer.
                </p>
                <div className="mt-3 inline-block text-[11px] font-bold text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-950 px-2 py-0.5 rounded-md">
                  Recommended for Exam Readiness
                </div>
              </div>

              {/* Mode B: Speed Sprint Blitz */}
              <div
                onClick={() => setExamMode('speed_sprint')}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  examMode === 'speed_sprint'
                    ? 'border-purple-600 bg-purple-50/50 dark:bg-purple-950/40 dark:border-purple-500 shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    15-Min Speed Blitz
                  </div>
                  <Sparkles className={`w-4 h-4 ${examMode === 'speed_sprint' ? 'text-purple-600' : 'text-slate-400'}`} />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  High-speed accuracy workout to train your reflexes and quick calculations.
                </p>
                <div className="mt-3 inline-block text-[11px] font-bold text-purple-700 dark:text-purple-400 bg-purple-100 dark:bg-purple-950 px-2 py-0.5 rounded-md">
                  15 Minutes • Quick Session
                </div>
              </div>

              {/* Mode C: Single Subject Drill */}
              <div
                onClick={() => setExamMode('subject_drill')}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  examMode === 'subject_drill'
                    ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 dark:border-indigo-500 shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    Single Subject Deep Drill
                  </div>
                  <Layers className={`w-4 h-4 ${examMode === 'subject_drill' ? 'text-indigo-600' : 'text-slate-400'}`} />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Master a specific challenging subject (e.g. Maths calculus, Physics mechanics).
                </p>
                <div className="mt-3 inline-block text-[11px] font-bold text-indigo-700 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-950 px-2 py-0.5 rounded-md">
                  Targeted Subject Mastery
                </div>
              </div>

              {/* Mode D: Untimed Study Mode */}
              <div
                onClick={() => setExamMode('untimed_practice')}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  examMode === 'untimed_practice'
                    ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/40 dark:border-emerald-500 shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    Untimed Study Mode
                  </div>
                  <HelpCircle className={`w-4 h-4 ${examMode === 'untimed_practice' ? 'text-emerald-600' : 'text-slate-400'}`} />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Practice without timer pressure to thoroughly digest concepts and formulas.
                </p>
                <div className="mt-3 inline-block text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-md">
                  No Clock Stress • In-Depth
                </div>
              </div>

            </div>
          </div>

          {/* STEP 2: Subject Combination & Presets */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-400 text-xs font-black">
                  2
                </span>
                <span>
                  {examMode === 'subject_drill' ? 'Select Subject to Drill' : 'Choose Your 4-Subject Combination'}
                </span>
              </h2>
              {examMode !== 'subject_drill' && (
                <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950 px-2.5 py-1 rounded-full">
                  {selectedSubjects.length}/4 Selected
                </span>
              )}
            </div>

            {/* If Single Subject Drill */}
            {examMode === 'subject_drill' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {(Object.keys(SUBJECT_METADATA) as SubjectId[]).map((subId) => {
                  const meta = SUBJECT_METADATA[subId];
                  const isSelected = singleSubject === subId;
                  return (
                    <button
                      key={subId}
                      onClick={() => setSingleSubject(subId)}
                      className={`p-3 rounded-xl text-left border transition-all ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 dark:border-indigo-500 font-bold shadow-xs'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                        {meta.shortName}
                      </div>
                      <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                        {meta.name}
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              /* If 4-Subject Combination Mode */
              <div className="space-y-4">
                
                {/* Faculty Quick Presets Pills */}
                <div>
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                    Quick Preset by Target OAU Faculty:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {FACULTY_PRESETS.map((preset) => {
                      const isPresetActive = selectedFacultyId === preset.id;
                      return (
                        <button
                          key={preset.id}
                          onClick={() => handleSelectPreset(preset.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            isPresetActive
                              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xs'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                          }`}
                        >
                          {preset.facultyName.split('&')[0]}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Subject Selector Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                  {(Object.keys(SUBJECT_METADATA) as SubjectId[]).map((subId) => {
                    const meta = SUBJECT_METADATA[subId];
                    const isSelected = selectedSubjects.includes(subId);
                    const isCompulsory = subId === 'english';

                    return (
                      <button
                        key={subId}
                        onClick={() => handleToggleSubject(subId)}
                        disabled={isCompulsory}
                        className={`relative p-3 rounded-xl text-left border transition-all ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/60 dark:border-blue-500 shadow-xs'
                            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                        } ${isCompulsory ? 'cursor-default ring-1 ring-blue-500/30' : 'cursor-pointer'}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                            {meta.shortName}
                          </span>
                          {isCompulsory ? (
                            <span className="text-[10px] font-bold uppercase bg-blue-200 dark:bg-blue-900 text-blue-900 dark:text-blue-200 px-1.5 py-0.5 rounded">
                              Compulsory
                            </span>
                          ) : isSelected ? (
                            <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          ) : null}
                        </div>

                        <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate mt-1">
                          {meta.name}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {meta.category.toUpperCase()}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {selectedSubjects.length < 4 && (
                  <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                    ⚠️ Please pick {4 - selectedSubjects.length} more elective subject(s) to complete your 4-subject combination.
                  </p>
                )}

              </div>
            )}

          </div>

        </div>

        {/* Right 1 Column: Summary Card & Launch Action */}
        <div className="space-y-6">
          
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-indigo-100 dark:border-slate-800 shadow-md">
            
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
              Exam Hall Summary
            </h3>

            <div className="space-y-3.5 text-xs text-slate-600 dark:text-slate-300">
              
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Candidate:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 truncate max-w-[140px]">
                  {profile.fullName}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Target Faculty:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 text-right truncate max-w-[150px]">
                  {profile.targetFaculty}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Mode:</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">
                  {examMode === 'standard_oau_mock'
                    ? '4-Subject Mock'
                    : examMode === 'speed_sprint'
                    ? '15m Speed Blitz'
                    : examMode === 'subject_drill'
                    ? 'Single Subject Drill'
                    : 'Untimed Study'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Timer:</span>
                <span className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1">
                  <Timer className="w-3.5 h-3.5 text-amber-500" />
                  {examMode === 'speed_sprint' ? '15 Minutes' : examMode === 'untimed_practice' ? 'Untimed' : '40 Minutes'}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block mb-1.5">Exam Subjects:</span>
                <div className="flex flex-wrap gap-1.5">
                  {(examMode === 'subject_drill' ? [singleSubject] : selectedSubjects).map((sId) => (
                    <span
                      key={sId}
                      className="px-2 py-1 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-mono text-[11px] font-bold border border-purple-200 dark:border-purple-800"
                    >
                      {SUBJECT_METADATA[sId].shortName}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Launch Button */}
            <button
              id="start-cbt-exam-btn"
              onClick={handleLaunch}
              disabled={examMode !== 'subject_drill' && selectedSubjects.length < 4}
              className={`w-full mt-6 py-3.5 rounded-xl font-extrabold text-sm flex items-center justify-center space-x-2 text-white shadow-lg transition-all ${
                examMode !== 'subject_drill' && selectedSubjects.length < 4
                  ? 'bg-slate-300 dark:bg-slate-800 cursor-not-allowed text-slate-500'
                  : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-purple-500/25 active:scale-[0.98]'
              }`}
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Enter CBT Exam Hall</span>
            </button>

            {/* Fellowship Word of Encouragement */}
            <div className="mt-5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
              <span className="font-bold text-indigo-700 dark:text-indigo-400 block mb-0.5">
                DLCF Saintly Intellectual Motto:
              </span>
              "Assembly of Saintly Intellectuals: Diligence + Faith = Outstanding Success in Great Ife!"
            </div>

          </div>

          {/* Quick Cutoff Tip */}
          <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-xs text-blue-900 dark:text-blue-200 space-y-1">
            <span className="font-bold block">💡 OAU Post-UTME Strategy Tip:</span>
            <p className="text-blue-800/90 dark:text-blue-300/90">
              In OAU Post-UTME, accuracy and time management are paramount. Spend no more than 45-50 seconds per question. Mark difficult calculation questions for review and return to them.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
