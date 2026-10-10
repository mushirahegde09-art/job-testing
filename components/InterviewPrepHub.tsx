'use client';

import React, { useState } from 'react';
import { PREP_QUESTIONS } from '@/data/prepData';
import { PrepQuestion, TrackType } from '@/types';
import { 
  BookOpen, 
  Code2, 
  Cpu, 
  Layers, 
  Sparkles, 
  UserCheck, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Copy, 
  Check, 
  Search, 
  Building2, 
  HelpCircle,
  Flame
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface InterviewPrepHubProps {
  initialTrack?: TrackType;
}

export const InterviewPrepHub: React.FC<InterviewPrepHubProps> = ({ initialTrack = 'frontend' }) => {
  const [selectedTrack, setSelectedTrack] = useState<TrackType | 'all'>(initialTrack);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>('fe-1');
  const [masteredQuestionIds, setMasteredQuestionIds] = useState<Set<string>>(new Set(['fe-1']));
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);

  const tracks: { id: TrackType | 'all'; label: string; icon: any; count: number }[] = [
    { id: 'all', label: 'All Tracks', icon: BookOpen, count: PREP_QUESTIONS.length },
    { id: 'frontend', label: 'Frontend', icon: Code2, count: PREP_QUESTIONS.filter(q => q.track === 'frontend').length },
    { id: 'backend', label: 'Backend & Systems', icon: Cpu, count: PREP_QUESTIONS.filter(q => q.track === 'backend').length },
    { id: 'system-design', label: 'System Design', icon: Layers, count: PREP_QUESTIONS.filter(q => q.track === 'system-design').length },
    { id: 'ai-ml', label: 'AI & Machine Learning', icon: Sparkles, count: PREP_QUESTIONS.filter(q => q.track === 'ai-ml').length },
    { id: 'behavioral', label: 'Behavioral & Leadership', icon: UserCheck, count: PREP_QUESTIONS.filter(q => q.track === 'behavioral').length },
  ];

  const filteredQuestions = PREP_QUESTIONS.filter((q) => {
    const matchesTrack = selectedTrack === 'all' || q.track === selectedTrack;
    const matchesDiff = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
    const matchesSearch = 
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.companies.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTrack && matchesDiff && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedQuestionId(expandedQuestionId === id ? null : id);
  };

  const toggleMastered = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = new Set(masteredQuestionIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#10b981', '#06b6d4', '#6366f1']
      });
    }
    setMasteredQuestionIds(next);
  };

  const copyCode = (code: string, id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedSnippetId(id);
    setTimeout(() => setCopiedSnippetId(null), 2000);
  };

  const masteryPercent = Math.round((masteredQuestionIds.size / Math.max(1, PREP_QUESTIONS.length)) * 100);

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Banner & Mastery Progress */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 mb-8 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Curated High-Yield Question Bank
              </span>
              <span className="text-xs text-slate-400">Updated for 2026 FAANG & Tier-1 Startups</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Interview & Technical Preparation Hub
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Master the exact architectural tradeoffs, system design blueprints, and behavioral STAR stories tested in top tier technical interview loops.
            </p>
          </div>

          {/* Mastery Progress Card */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 flex items-center gap-5 w-full md:w-auto">
            <div className="flex items-center gap-2 text-amber-400">
              <Flame className="w-8 h-8 fill-amber-400" />
            </div>
            <div>
              <div className="flex items-center justify-between gap-4 text-xs font-semibold text-slate-300 mb-1">
                <span>Your Mastery Progress</span>
                <span className="text-cyan-400 font-bold">{masteryPercent}%</span>
              </div>
              <div className="w-48 h-2 rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-500"
                  style={{ width: `${masteryPercent}%` }}
                />
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {masteredQuestionIds.size} of {PREP_QUESTIONS.length} questions mastered
              </div>
            </div>
          </div>
        </div>

        {/* Track Selector Bar */}
        <div className="mt-8 flex flex-wrap gap-2 pt-6 border-t border-white/10">
          {tracks.map((track) => {
            const Icon = track.icon;
            const isSelected = selectedTrack === track.id;
            return (
              <button
                key={track.id}
                onClick={() => setSelectedTrack(track.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{track.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  {track.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filters & Search Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions, companies, topics..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-semibold text-slate-400">Difficulty:</span>
          {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedDifficulty === diff
                  ? 'bg-slate-800 text-white border border-indigo-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Question Accordion List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-16 glass-panel rounded-2xl border border-white/5">
            <BookOpen className="w-10 h-10 text-slate-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">No questions found</h3>
            <p className="text-xs text-slate-400 mt-1">Try broadening your search or switching tracks.</p>
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const isExpanded = expandedQuestionId === q.id;
            const isMastered = masteredQuestionIds.has(q.id);

            return (
              <div
                key={q.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isExpanded
                    ? 'bg-slate-900/95 border-indigo-500/40 shadow-xl'
                    : 'glass-panel hover:border-slate-700'
                }`}
              >
                {/* Accordion Question Header */}
                <div
                  onClick={() => toggleExpand(q.id)}
                  className="p-5 sm:p-6 cursor-pointer flex items-start justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                        q.difficulty === 'Easy'
                          ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                          : q.difficulty === 'Medium'
                          ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                          : 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                      }`}>
                        {q.difficulty}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">{q.category}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        {q.estimatedMinutes} mins
                      </span>
                    </div>

                    <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      {q.title}
                    </h2>

                    {/* Companies asking */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Building2 className="w-3 h-3 text-slate-500" /> Asked at:
                      </span>
                      {q.companies.map((c) => (
                        <span
                          key={c}
                          className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-300"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions & Chevron */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => toggleMastered(q.id, e)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        isMastered
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-slate-800/80 text-slate-400 hover:text-white border border-white/5'
                      }`}
                      title="Toggle Mastered"
                    >
                      <CheckCircle2 className={`w-3.5 h-3.5 ${isMastered ? 'text-emerald-400' : ''}`} />
                      <span className="hidden sm:inline">{isMastered ? 'Mastered' : 'Mark Done'}</span>
                    </button>

                    <div className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/40">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Detailed Content */}
                {isExpanded && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-white/5 bg-slate-950/60 space-y-5">
                    {/* Scenario Description */}
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Problem Context & Interviewer Focus
                      </h3>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {q.description}
                      </p>
                    </div>

                    {/* Hint Box */}
                    {q.hint && (
                      <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 flex items-start gap-2.5">
                        <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold">Interview Hint: </span>
                          {q.hint}
                        </div>
                      </div>
                    )}

                    {/* STAR Guide for Behavioral */}
                    {q.starGuide && (
                      <div className="p-4 rounded-xl bg-slate-900 border border-indigo-500/20 space-y-3">
                        <div className="text-xs font-bold uppercase text-indigo-400 tracking-wider flex items-center gap-1.5">
                          <UserCheck className="w-4 h-4" /> STAR Framework Solution Blueprint
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                          <div className="p-3 rounded-lg bg-slate-950/80 border border-white/5">
                            <span className="font-bold text-cyan-400 block mb-1">1. Situation</span>
                            <span className="text-slate-300">{q.starGuide.situation}</span>
                          </div>
                          <div className="p-3 rounded-lg bg-slate-950/80 border border-white/5">
                            <span className="font-bold text-indigo-400 block mb-1">2. Task</span>
                            <span className="text-slate-300">{q.starGuide.task}</span>
                          </div>
                          <div className="p-3 rounded-lg bg-slate-950/80 border border-white/5">
                            <span className="font-bold text-amber-400 block mb-1">3. Action</span>
                            <span className="text-slate-300">{q.starGuide.action}</span>
                          </div>
                          <div className="p-3 rounded-lg bg-slate-950/80 border border-white/5">
                            <span className="font-bold text-emerald-400 block mb-1">4. Result</span>
                            <span className="text-slate-300">{q.starGuide.result}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Code Snippet */}
                    {q.codeSnippet && (
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                            <Code2 className="w-4 h-4 text-cyan-400" /> Reference Implementation
                          </span>
                          <button
                            onClick={(e) => copyCode(q.codeSnippet!, q.id, e)}
                            className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
                          >
                            {copiedSnippetId === q.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-emerald-400">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy Code</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="p-4 rounded-xl bg-slate-900 border border-white/10 text-xs sm:text-sm text-cyan-200 overflow-x-auto font-mono leading-relaxed">
                          {q.codeSnippet}
                        </pre>
                      </div>
                    )}

                    {/* Detailed Technical Solution */}
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Comprehensive Solution & Engineering Trade-offs
                      </h3>
                      <div className="p-4 rounded-xl bg-slate-900/90 border border-white/5 text-xs sm:text-sm text-slate-300 whitespace-pre-line leading-relaxed font-sans">
                        {q.solution}
                      </div>
                    </div>

                    {/* Key Takeaways */}
                    {q.keyTakeaways && q.keyTakeaways.length > 0 && (
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                          Key Evaluation Criteria to Remember
                        </h3>
                        <div className="space-y-1.5">
                          {q.keyTakeaways.map((takeaway, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{takeaway}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
