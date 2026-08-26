import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  GraduationCap, 
  BookOpen, 
  Flame, 
  BrainCircuit, 
  Lightbulb,
  CheckCircle2
} from 'lucide-react';
import { StudentProfile, TestResult } from '../types';

interface AITutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
  lastTestResult?: TestResult | null;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  tips?: string[];
}

export const AITutorModal: React.FC<AITutorModalProps> = ({
  isOpen,
  onClose,
  profile,
  lastTestResult,
}) => {
  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg_welcome',
      sender: 'ai',
      text: `Greetings in Christ Jesus, ${profile.fullName}! I am your DLCF "Saintly Intellectual" AI Study Coach for OAU Post-UTME. 
      
How can I assist your preparation today? You can ask me to:
• Explain difficult calculus or physics mechanics problems
• Break down tricky English lexis & structure rules
• Generate mnemonic memory aids for biology classification or chemistry periodic trends
• Provide high-yield time management tips for OAU CBT`,
      timestamp: 'Just now',
    },
  ]);

  if (!isOpen) return null;

  const handleSendMessage = async (customPrompt?: string) => {
    const query = customPrompt || inputPrompt.trim();
    if (!query) return;

    const userMsg: Message = {
      id: 'user_' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setLoading(true);

    try {
      // Call recommendations or tutor endpoint
      const res = await fetch('/api/ai/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: profile.fullName,
          targetCourse: profile.targetCourse,
          jambScore: profile.jambScore,
          subjects: profile.subjectCombination,
          weakTopics: [query],
          recentScore: lastTestResult?.totalScore || profile.targetPostUtmeScore,
        }),
      });

      const data = await res.json();

      const aiText = data.studyPlan
        ? `Here is your customized DLCF academic breakdown for **${query}**:\n\n${data.studyPlan}\n\n**Key Syllabus Tips:**\n${data.keyTips?.map((t: string) => `• ${t}`).join('\n') || '• Review past questions consistently.'}\n\n*${data.fellowshipEncouragement || 'Assembly of Saintly Intellectuals: Diligence and prayer guarantee success.'}*`
        : `Here is the comprehensive OAU exam insight:\n\nFocus on speed and accuracy. In OAU Post-UTME, calculation questions must be solved in under 45 seconds using standard formulas and shortcuts. Always eliminate extreme options first.`;

      const aiMsg: Message = {
        id: 'ai_' + Date.now(),
        sender: 'ai',
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        tips: data.keyTips,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('AI Tutor error', err);
      const fallbackMsg: Message = {
        id: 'ai_err_' + Date.now(),
        sender: 'ai',
        text: `Here is academic guidance for **${query}**:\n\n1. Ensure you thoroughly memorize core formulas and definitions.\n2. Practice past questions from 2010 to 2024 to identify recurring patterns.\n3. Keep your focus sharp: "Assembly of Saintly Intellectuals — study to shew thyself approved!"`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const samplePrompts = [
    'How do I score 340+ in OAU Post-UTME for Medicine?',
    'Give me a 3-week study timetable for English, Biology, Chem & Physics',
    'Explain the most frequent OAU Organic Chemistry questions',
    'Tips for solving OAU Mathematics Calculus in 30 seconds',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="w-full max-w-2xl h-[85vh] max-h-[700px] rounded-3xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-purple-300 border border-white/20">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-sm sm:text-base">DLCF Saintly AI Study Coach</span>
                <span className="text-[10px] bg-purple-500/40 text-purple-200 px-2 py-0.5 rounded font-mono">
                  Gemini 3.7
                </span>
              </div>
              <p className="text-[11px] text-purple-200/80">
                Academic & Spiritual Mentorship for OAU Aspirants
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-white/20 text-white/80 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Chat Feed */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50 dark:bg-slate-950">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none shadow-md'
                    : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-bl-none shadow-xs'
                }`}
              >
                <div className="whitespace-pre-line font-medium">
                  {m.text}
                </div>
                <div
                  className={`text-[10px] text-right mt-1.5 ${
                    m.sender === 'user' ? 'text-blue-200' : 'text-slate-400'
                  }`}
                >
                  {m.timestamp}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-slate-900 border border-purple-200 dark:border-slate-800 rounded-2xl p-4 rounded-bl-none shadow-xs flex items-center space-x-2 text-xs text-purple-700 dark:text-purple-300">
                <BrainCircuit className="w-4 h-4 animate-spin text-purple-600" />
                <span>Coach is researching syllabus & generating solution...</span>
              </div>
            </div>
          )}
        </div>

        {/* Sample Prompt Chips */}
        <div className="p-2.5 bg-slate-100 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 overflow-x-auto flex gap-2 shrink-0">
          {samplePrompts.map((promptText, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(promptText)}
              className="px-2.5 py-1 rounded-lg text-[11px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-purple-400 whitespace-nowrap transition-colors"
            >
              {promptText}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="Ask a question about an OAU Post-UTME topic, formula, or exam strategy..."
              className="flex-1 px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-hidden focus:ring-2 focus:ring-purple-500 text-slate-900 dark:text-slate-100"
            />
            <button
              type="submit"
              disabled={loading || !inputPrompt.trim()}
              className="p-2.5 sm:px-4 sm:py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm disabled:opacity-50 transition-colors flex items-center space-x-1.5 shadow-md shadow-purple-500/20"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Ask Coach</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
