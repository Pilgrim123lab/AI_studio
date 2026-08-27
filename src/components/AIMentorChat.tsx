import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquareCode, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  RotateCcw, 
  Cpu, 
  GitMerge, 
  Layers, 
  Code,
  Terminal
} from 'lucide-react';
import { UserProgress, AIMentorMessage } from '../types';

interface AIMentorChatProps {
  progress: UserProgress;
}

export const AIMentorChat: React.FC<AIMentorChatProps> = ({ progress }) => {
  const [messages, setMessages] = useState<AIMentorMessage[]>([
    {
      id: 'welcome_1',
      sender: 'assistant',
      content: `Hello! I am your Senior Staff AI Systems Architect mentor.

I specialize in transforming skilled Data Analysts into world-class AI Engineers and LLM architects. 

Whether you need to:
1. Translate a complex SQL/Pandas workflow into a PyTorch vector tensor operation
2. Deconstruct Self-Attention math and KV-Cache formulas
3. Design enterprise RAG pipelines with Qdrant and vLLM
4. Prepare for Senior / Staff AI Engineer technical system design interviews

What concept or real-world problem would you like to explore together?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isLoading) return;

    const userMsg: AIMentorMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      content: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/mentor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          conversationHistory: messages.slice(-6),
          userLevel: progress.currentLevel,
        }),
      });

      const data = await response.json();
      const mentorMsg: AIMentorMessage = {
        id: `mentor_${Date.now()}`,
        sender: 'assistant',
        content: data.reply || 'I have analyzed your request. Let us examine the architectural pattern.',
        timestamp: data.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, mentorMsg]);
    } catch (err) {
      console.error('AI Mentor chat error:', err);
      const fallbackMsg: AIMentorMessage = {
        id: `mentor_${Date.now()}`,
        sender: 'assistant',
        content: 'System design advisory: Focus on grounding embeddings with cosine distance and hybrid sparse-dense indexes.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    {
      label: 'SQL to Vector Math',
      prompt: 'Explain how vector dot products and cosine similarity relate to SQL JOINs and GROUP BY aggregation.',
      icon: <GitMerge className="w-3.5 h-3.5" />,
    },
    {
      label: 'Deconstruct Attention',
      prompt: 'Explain the math of Scaled Dot-Product Attention Softmax(QK^T / sqrt(d_k))V in simple intuitive terms for a Data Analyst.',
      icon: <Cpu className="w-3.5 h-3.5" />,
    },
    {
      label: 'KV-Cache & VRAM Sizing',
      prompt: 'How do I calculate the exact GPU VRAM requirement for a 70B parameter model with 8k context length and batch size 32?',
      icon: <Terminal className="w-3.5 h-3.5" />,
    },
    {
      label: 'Staff AI Interview Tips',
      prompt: 'What are the top 3 architectural questions asked in Senior Staff AI Engineer interviews at top labs?',
      icon: <Sparkles className="w-3.5 h-3.5" />,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold mb-2">
            <Bot className="w-3.5 h-3.5" />
            <span>Senior Staff AI Architect Copilot (Gemini 2.5)</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            AI Engineering Mentorship & Architecture Review
          </h1>
        </div>

        <button
          onClick={() => {
            setMessages([messages[0]]);
          }}
          className="self-start sm:self-auto flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear Chat</span>
        </button>
      </div>

      {/* Chat Box Container */}
      <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col h-[600px] overflow-hidden">
        {/* Messages Scroll Area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  isUser ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-emerald-400 border border-slate-700'
                }`}>
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className={`max-w-[82%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10'
                    : 'bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-slate-200 whitespace-pre-line'
                }`}>
                  {msg.content}
                  <span className={`block text-[10px] mt-2 font-mono ${isUser ? 'text-indigo-200' : 'text-slate-400'}`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-xl bg-slate-900 text-emerald-400 border border-slate-700 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 flex items-center space-x-2 text-xs text-slate-500">
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]" />
                <span className="font-mono text-[11px] text-slate-400 ml-2">Analyzing architecture...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts Bar */}
        <div className="px-6 py-2.5 bg-slate-50/60 dark:bg-slate-900/40 border-t border-slate-200 dark:border-slate-700/60 overflow-x-auto scrollbar-none flex items-center space-x-2">
          {quickPrompts.map((qp, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(qp.prompt)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs whitespace-nowrap hover:border-indigo-500 transition-colors"
            >
              {qp.icon}
              <span>{qp.label}</span>
            </button>
          ))}
        </div>

        {/* Message Input Bar */}
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 flex items-center space-x-3">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Ask your Senior Staff AI Mentor about architectures, code, math, or career transitions..."
            className="flex-1 p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-slate-100 outline-none focus:border-indigo-500"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputMessage.trim() || isLoading}
            className="p-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-40 transition-colors shadow-md"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
