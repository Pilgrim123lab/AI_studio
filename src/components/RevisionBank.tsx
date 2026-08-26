import React, { useState, useEffect } from 'react';
import { 
  BookmarkCheck, 
  Trash2, 
  Play, 
  HelpCircle, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  BookOpen, 
  Filter,
  GraduationCap
} from 'lucide-react';
import { SavedQuestionItem, SubjectId, Question } from '../types';
import { getStoredRevisionBank, toggleSaveQuestion } from '../utils/storage';
import { SUBJECT_METADATA } from '../data/oauQuestions';

interface RevisionBankProps {
  onStartCustomDrill: (questions: Question[]) => void;
  onOpenAiTutor: () => void;
}

export const RevisionBank: React.FC<RevisionBankProps> = ({ onStartCustomDrill, onOpenAiTutor }) => {
  const [savedItems, setSavedItems] = useState<SavedQuestionItem[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const loadSaved = () => {
    setSavedItems(getStoredRevisionBank());
  };

  useEffect(() => {
    loadSaved();
  }, []);

  const handleRemove = (item: SavedQuestionItem) => {
    toggleSaveQuestion(item);
    loadSaved();
  };

  const filteredItems = savedItems.filter((item) => {
    if (selectedSubject === 'all') return true;
    return item.question.subjectId === selectedSubject;
  });

  const handleLaunchDrill = () => {
    if (filteredItems.length === 0) return;
    const questionsToDrill = filteredItems.map((item) => item.question);
    onStartCustomDrill(questionsToDrill);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-indigo-900 to-purple-900 text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs font-semibold text-purple-200">
            <BookmarkCheck className="w-4 h-4 text-purple-300" />
            <span>Personalized Question Bank</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Revision & Weak-Spot Vault
          </h1>
          <p className="text-xs sm:text-sm text-purple-100 max-w-xl">
            Questions you flagged during mock exams or practice drills for targeted review and 100% mastery.
          </p>
        </div>

        {savedItems.length > 0 && (
          <button
            onClick={handleLaunchDrill}
            className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 text-white text-xs sm:text-sm font-extrabold shadow-lg shadow-emerald-500/25 active:scale-95 transition-all self-start sm:self-auto"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Test Saved Questions ({filteredItems.length})</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedSubject('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
            selectedSubject === 'all'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
          }`}
        >
          All Subjects ({savedItems.length})
        </button>

        {Object.keys(SUBJECT_METADATA).map((subKey) => {
          const count = savedItems.filter((i) => i.question.subjectId === subKey).length;
          if (count === 0) return null;

          return (
            <button
              key={subKey}
              onClick={() => setSelectedSubject(subKey)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                selectedSubject === subKey
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {SUBJECT_METADATA[subKey as SubjectId]?.name || subKey} ({count})
            </button>
          );
        })}
      </div>

      {/* List of Saved Questions */}
      {filteredItems.length > 0 ? (
        <div className="space-y-4">
          {filteredItems.map((item) => {
            const q = item.question;
            const isExpanded = expandedId === q.id;

            return (
              <div
                key={q.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-xs text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded">
                        {q.subjectName}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        {q.topic}
                      </span>
                      {q.year && (
                        <span className="text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded">
                          {q.year}
                        </span>
                      )}
                    </div>
                    <div className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 leading-relaxed pt-1">
                      {q.questionText}
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemove(item)}
                    className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                    title="Remove from Revision Bank"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Options Preview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                  {q.options.map((opt, optIdx) => {
                    const isCorrect = q.correctOptionIndex === optIdx;
                    return (
                      <div
                        key={optIdx}
                        className={`p-2.5 rounded-lg border flex items-center space-x-2 ${
                          isCorrect
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold'
                            : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span className="font-mono font-bold">{String.fromCharCode(65 + optIdx)}.</span>
                        <span>{opt}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Solution Reveal */}
                <div className="pt-2">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : q.id)}
                    className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
                  >
                    {isExpanded ? 'Hide Solution' : 'View Verified Solution & Tip'}
                  </button>

                  {isExpanded && (
                    <div className="mt-2 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
                      <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                        <GraduationCap className="w-4 h-4 text-indigo-600" />
                        <span>DLCF Solution:</span>
                      </div>
                      <p className="leading-relaxed">{q.explanation}</p>
                      {q.oauExamTip && (
                        <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 font-medium mt-1">
                          <strong>💡 OAU Tip:</strong> {q.oauExamTip}
                        </div>
                      )}
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 px-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
            Your Revision Vault is Empty
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            During any CBT Mock or study session, click the bookmark icon on difficult questions to store them here for quick revision before your exam date.
          </p>
        </div>
      )}

    </div>
  );
};
