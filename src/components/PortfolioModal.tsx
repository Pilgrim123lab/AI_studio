import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Download, 
  FileText, 
  Sparkles, 
  Award, 
  ExternalLink,
  Github
} from 'lucide-react';
import { UserProgress } from '../types';
import { REAL_WORLD_PROJECTS } from '../data/projectsData';
import { BADGES } from '../data/skillsAndBadges';
import { getRankTitle } from '../utils/storage';

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
}

export const PortfolioModal: React.FC<PortfolioModalProps> = ({
  isOpen,
  onClose,
  progress,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  if (!isOpen) return null;

  const rankTitle = getRankTitle(progress.currentLevel);

  // Generate Markdown text for export
  const portfolioMarkdown = `# AI Systems Engineer Portfolio & Verified Capabilities
**Engineer:** ${progress.userName}
**Rank & Level:** Level ${progress.currentLevel} — ${rankTitle}
**Total Capability XP:** ${progress.totalXP} XP
**Continuous Active Streak:** ${progress.streakDays} Days

---

## Executive Profile
Senior AI Systems Engineer with a deep foundation in tabular analytics, SQL optimization, and statistical modeling, transitioned into building high-throughput production LLM systems, multimodal vector search indices, and autonomous agent swarms.

---

## Flagship Real-World Enterprise Projects

${REAL_WORLD_PROJECTS.map((proj, idx) => {
  const completedMilestones = progress.completedProjectMilestones[proj.id] || [];
  return `### ${idx + 1}. ${proj.title}
- **Category & Level:** ${proj.category} (Level ${proj.level})
- **Tech Stack:** ${proj.techStack.join(', ')}
- **Architecture Highlights:**
${proj.portfolioHighlights.map((h) => `  - ${h}`).join('\n')}
- **Milestone Progress:** ${completedMilestones.length} / ${proj.milestones.length} Verified
`;
}).join('\n')}

---

## Core Competencies & Theoretical Math
- **Autograd & Attention:** Scaled Dot-Product Attention from first principles ($Softmax(\\frac{QK^T}{\\sqrt{d_k}})V$)
- **Hybrid Retrieval:** Dense Embeddings (HNSW) combined with BM25 Sparse Search via Reciprocal Rank Fusion (RRF)
- **Inference Optimization:** Continuous Batching, PagedAttention, KV-Cache memory footprint mathematical planning
- **Agent Architectures:** ReAct loops with structured tool calling and self-correction reflection

---

## Verified Badges & Global Credentials
${progress.unlockedBadges.map((badgeId) => {
  const b = BADGES.find((badge) => badge.id === badgeId);
  return b ? `- **${b.title}:** ${b.description}` : '';
}).filter(Boolean).join('\n') || '- Data Analyst to AI Transition Active'}

---
*Generated via NexusAI Global AI Engineering Studio on ${new Date().toLocaleDateString()}*
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(portfolioMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([portfolioMarkdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AI_Engineer_Portfolio_${progress.userName.replace(/\s+/g, '_')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Global AI Engineer Portfolio Dossier
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Export verified accomplishments in GitHub / Markdown format for resumes & LinkedIn
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Preview */}
        <div className="p-6 flex-1 overflow-y-auto font-mono text-xs text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-950">
          <pre className="whitespace-pre-wrap leading-relaxed">{portfolioMarkdown}</pre>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Ready to attach to your GitHub README or Technical Job Applications.
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Markdown'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download .MD File</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
