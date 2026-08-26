import React, { useState } from 'react';
import { X, Calculator, Info, CheckCircle2, AlertCircle, ChevronRight, Award } from 'lucide-react';
import { calculateOauAggregate, getAdmissionRating, FACULTY_PRESETS } from '../data/facultyPresets';

interface AggregateCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialJambScore?: number;
  initialPostUtmeScore?: number;
  targetCourse?: string;
}

export const AggregateCalculatorModal: React.FC<AggregateCalculatorModalProps> = ({
  isOpen,
  onClose,
  initialJambScore = 280,
  initialPostUtmeScore = 320,
  targetCourse = 'Medicine & Surgery (MBBS)',
}) => {
  const [jambScore, setJambScore] = useState<number>(initialJambScore);
  const [postUtmeScore, setPostUtmeScore] = useState<number>(initialPostUtmeScore);
  const [course, setCourse] = useState<string>(targetCourse);

  if (!isOpen) return null;

  const { jambPoints, postUtmePoints, totalAggregate } = calculateOauAggregate(
    jambScore,
    postUtmeScore
  );
  const admissionRating = getAdmissionRating(totalAggregate, course);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="w-full max-w-xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6 my-8 animate-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-slate-100">
                Official OAU Aggregate Calculator
              </h2>
              <p className="text-xs text-slate-500">
                Obafemi Awolowo University 50:50 Composite Formula
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

        {/* Aggregate Output Banner */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white text-center space-y-2 shadow-lg">
          <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider">
            Total Composite Admission Aggregate
          </span>
          <div className="text-4xl font-black font-mono text-white tracking-tight">
            {totalAggregate}%
          </div>
          <div className="inline-block px-3 py-1 rounded-full bg-white/15 text-xs font-bold text-emerald-300 border border-white/20">
            {admissionRating.verdict}
          </div>
          <p className="text-xs text-blue-100/80 pt-1">
            {admissionRating.recommendation}
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          
          {/* JAMB Score Slider & Input */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                UTME / JAMB Score (out of 400):
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min={0}
                  max={400}
                  value={jambScore}
                  onChange={(e) => setJambScore(Math.min(400, Math.max(0, Number(e.target.value))))}
                  className="w-16 px-2 py-1 text-center font-mono font-bold text-sm bg-white dark:bg-slate-900 border rounded-lg"
                />
                <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-bold">
                  → {jambPoints}% (÷ 8)
                </span>
              </div>
            </div>
            <input
              type="range"
              min={120}
              max={400}
              value={jambScore}
              onChange={(e) => setJambScore(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          {/* Post-UTME Score Slider & Input */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Target / Mock Post-UTME Score (out of 400):
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min={0}
                  max={400}
                  value={postUtmeScore}
                  onChange={(e) => setPostUtmeScore(Math.min(400, Math.max(0, Number(e.target.value))))}
                  className="w-16 px-2 py-1 text-center font-mono font-bold text-sm bg-white dark:bg-slate-900 border rounded-lg"
                />
                <span className="text-xs font-mono text-purple-600 dark:text-purple-400 font-bold">
                  → {postUtmePoints}% (÷ 4)
                </span>
              </div>
            </div>
            <input
              type="range"
              min={100}
              max={400}
              value={postUtmeScore}
              onChange={(e) => setPostUtmeScore(Number(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer"
            />
          </div>

        </div>

        {/* Formula Explanation */}
        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-xs space-y-1.5 text-blue-950 dark:text-blue-200">
          <div className="font-bold flex items-center space-x-1.5">
            <Info className="w-4 h-4 text-blue-600" />
            <span>Official OAU Admission Formula Breakdown:</span>
          </div>
          <p className="leading-relaxed font-mono">
            Aggregate = (JAMB ÷ 8) + (Post-UTME ÷ 4)
          </p>
          <p className="text-[11px] text-blue-800/80 dark:text-blue-300/80">
            For instance: 280 in JAMB gives 35.0% + 320 in Post-UTME gives 80.0% = <strong>75.0% Composite Score</strong>.
          </p>
        </div>

        {/* Benchmark Cutoff Table Reference */}
        <div>
          <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2">
            Historical OAU Merit Cutoff Benchmarks:
          </h4>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 flex justify-between">
              <span>Medicine (MBBS):</span>
              <strong className="text-purple-600">76.0%+</strong>
            </div>
            <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 flex justify-between">
              <span>Pharmacy:</span>
              <strong className="text-purple-600">72.5%+</strong>
            </div>
            <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 flex justify-between">
              <span>Law:</span>
              <strong className="text-purple-600">71.0%+</strong>
            </div>
            <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 flex justify-between">
              <span>Computer Science:</span>
              <strong className="text-purple-600">68.5%+</strong>
            </div>
            <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 flex justify-between">
              <span>Nursing Science:</span>
              <strong className="text-purple-600">73.0%+</strong>
            </div>
            <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 flex justify-between">
              <span>Electrical Engineering:</span>
              <strong className="text-purple-600">69.0%+</strong>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md"
        >
          Done
        </button>

      </div>
    </div>
  );
};
