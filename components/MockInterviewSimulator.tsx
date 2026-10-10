'use client';

import React, { useState, useEffect } from 'react';
import { MOCK_INTERVIEW_SESSIONS } from '@/data/prepData';
import { 
  Sparkles, 
  Play, 
  RotateCcw, 
  Clock, 
  Mic, 
  MicOff, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  Award, 
  Lightbulb, 
  Layers, 
  Send 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const MockInterviewSimulator: React.FC = () => {
  const [selectedSessionIndex, setSelectedSessionIndex] = useState(0);
  const currentSession = MOCK_INTERVIEW_SESSIONS[selectedSessionIndex];

  const [userAnswer, setUserAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<{
    score: number;
    verdict: 'Strong Hire' | 'Hire' | 'Leaning Hire' | 'Needs Practice';
    breakdown: { label: string; score: number }[];
    strengths: string[];
    missedPoints: string[];
    feedback: string;
  } | null>(null);

  // Timer effect
  useEffect(() => {
    let interval: any = null;
    if (timerActive) {
      interval = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const handleStartInterview = () => {
    setTimerActive(true);
    setEvaluationResult(null);
    setSecondsElapsed(0);
  };

  const handleToggleRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      if (!timerActive) setTimerActive(true);
      // Simulate live transcription
      if (!userAnswer) {
        setUserAnswer('Starting with clarifying questions: I would estimate the read-to-write ratio at roughly 100 to 1...');
      }
    } else {
      setIsRecording(false);
    }
  };

  const handleLoadSampleAnswer = () => {
    setUserAnswer(currentSession.sampleBestAnswer);
    if (!timerActive) setTimerActive(true);
  };

  const handleSubmitAnswer = () => {
    if (!userAnswer.trim()) return;

    setTimerActive(false);
    setIsRecording(false);
    setIsEvaluating(true);

    setTimeout(() => {
      // Simulate intelligent Rubric scoring
      const wordCount = userAnswer.trim().split(/\s+/).length;
      const coversBase = /ratio|qps|traffic|cache|redis|scale/i.test(userAnswer);
      const coversArch = /snowflake|base62|partition|cdn|redirect/i.test(userAnswer);

      let score = 75;
      if (wordCount > 100) score += 10;
      if (coversBase) score += 5;
      if (coversArch) score += 8;
      score = Math.min(96, Math.max(62, score));

      let verdict: 'Strong Hire' | 'Hire' | 'Leaning Hire' | 'Needs Practice' = 'Hire';
      if (score >= 90) verdict = 'Strong Hire';
      else if (score >= 75) verdict = 'Hire';
      else if (score >= 65) verdict = 'Leaning Hire';
      else verdict = 'Needs Practice';

      setEvaluationResult({
        score,
        verdict,
        breakdown: [
          { label: 'Technical Depth & Architecture', score: Math.min(100, score + 2) },
          { label: 'Trade-off Analysis & Scalability', score: Math.min(100, score - 3) },
          { label: 'Precision & Structured Delivery', score: Math.min(100, score + 4) },
          { label: 'Edge Case & Failure Mitigation', score: Math.min(100, score - 6) },
        ],
        strengths: [
          'Calculated back-of-envelope math and read/write QPS capacity explicitly upfront.',
          'Identified Base62 encoding for unique ID compression to guarantee compact URL length.',
          'Leveraged multi-tier caching (Redis LRU) to absorb 80% read traffic spikes.',
        ],
        missedPoints: [
          'Could expand on 301 Permanent vs 302 Temporary redirect impact on click analytics collection.',
          'Consider mention of Rate Limiting per IP/API token to prevent scraping attacks.',
        ],
        feedback:
          'Excellent structural clarity. You structured your answer with methodical back-of-the-envelope estimation before jumping into database schemas, which interviewers at Google and Meta look for.',
      });

      setIsEvaluating(false);

      if (score >= 85) {
        confetti({
          particleCount: 65,
          spread: 60,
          origin: { y: 0.6 },
        });
      }
    }, 1200);
  };

  const handleReset = () => {
    setUserAnswer('');
    setSecondsElapsed(0);
    setTimerActive(false);
    setIsRecording(false);
    setEvaluationResult(null);
  };

  return (
    <div className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Simulator Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive AI Technical Interview Loop</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Simulate Real-Time Technical Onsite Rounds
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          Practice answering complex system architecture and performance scenarios with countdown timers, sample transcripts, and automated rubric evaluation.
        </p>
      </div>

      {/* Scenario Selector Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
        {MOCK_INTERVIEW_SESSIONS.map((session, idx) => (
          <button
            key={session.id}
            onClick={() => {
              setSelectedSessionIndex(idx);
              handleReset();
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              selectedSessionIndex === idx
                ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-white/5'
            }`}
          >
            Scenario {idx + 1}: {session.category}
          </button>
        ))}
      </div>

      {/* Main Interactive Stage */}
      <div className="glass-panel rounded-3xl border border-white/10 p-6 sm:p-8 space-y-6">
        {/* Question Header & Timer Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                {currentSession.difficulty}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {currentSession.category} Round
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              {currentSession.question}
            </h2>
          </div>

          {/* Active Timer Box */}
          <div className="flex items-center gap-3 shrink-0 bg-slate-900/90 px-4 py-2.5 rounded-2xl border border-white/10">
            <Clock className={`w-5 h-5 ${timerActive ? 'text-cyan-400 animate-pulse' : 'text-slate-400'}`} />
            <div>
              <div className="text-[10px] text-slate-400 font-medium">Session Time</div>
              <div className="text-base font-mono font-bold text-white">
                {formatTime(secondsElapsed)}
              </div>
            </div>
          </div>
        </div>

        {/* Expected Discussion Points Checklist */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-cyan-400" /> Rubric Evaluation Criteria
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {currentSession.expectedPoints.map((point, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Answer Drafting Section */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <span>Your Architectural Proposal & Response</span>
              {timerActive && (
                <span className="text-emerald-400 text-xs font-normal flex items-center gap-1">
                  ● Interview in progress
                </span>
              )}
            </label>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleLoadSampleAnswer}
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                title="Populate with candidate sample answer"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Load Model Answer</span>
              </button>

              <button
                type="button"
                onClick={handleToggleRecord}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  isRecording
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                {isRecording ? <MicOff className="w-3.5 h-3.5 text-rose-400" /> : <Mic className="w-3.5 h-3.5" />}
                <span>{isRecording ? 'Listening...' : 'Simulate Voice'}</span>
              </button>
            </div>
          </div>

          <textarea
            rows={8}
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Structure your answer methodically: 1. Requirements & QPS Math, 2. High-Level Architecture, 3. Deep Dive into Data Stores & Caching, 4. Edge Cases & Resilience..."
            className="w-full p-4 rounded-2xl glass-input text-xs sm:text-sm font-sans leading-relaxed resize-y"
          />
        </div>

        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            {!timerActive && secondsElapsed === 0 ? (
              <button
                onClick={handleStartInterview}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 text-emerald-400" />
                <span>Start Timer</span>
              </button>
            ) : (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>

          <button
            onClick={handleSubmitAnswer}
            disabled={!userAnswer.trim() || isEvaluating}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white shadow-lg shadow-indigo-600/30 transition-all cursor-pointer disabled:opacity-50"
          >
            {isEvaluating ? (
              <span>Evaluating Rubric Score...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit for AI Rubric Evaluation</span>
              </>
            )}
          </button>
        </div>

        {/* Evaluation Results Card */}
        {evaluationResult && (
          <div className="mt-8 pt-8 border-t border-white/10 space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950/60 border border-indigo-500/30">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex flex-col items-center justify-center shrink-0">
                    <span className="text-2xl font-black text-cyan-300">{evaluationResult.score}</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">/ 100</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                        evaluationResult.verdict === 'Strong Hire'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      }`}>
                        {evaluationResult.verdict}
                      </span>
                      <Award className="w-4 h-4 text-amber-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white mt-1">
                      Technical Assessment Report
                    </h3>
                  </div>
                </div>
              </div>

              {/* Rubric Breakdown Progress Bars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                {evaluationResult.breakdown.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950/70 border border-white/5">
                    <div className="flex items-center justify-between text-xs font-medium text-slate-300 mb-1.5">
                      <span>{item.label}</span>
                      <span className="font-bold text-cyan-400">{item.score}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400"
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Strengths & Blindspots */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Strong Architectural Decisions
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {evaluationResult.strengths.map((str, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-400">✓</span>
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" /> Suggested Refinements
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {evaluationResult.missedPoints.map((pts, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-400">•</span>
                        <span>{pts}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Summary note */}
              <p className="mt-4 text-xs text-slate-300 bg-slate-950/60 p-3.5 rounded-xl border border-white/5 leading-relaxed">
                <span className="font-bold text-indigo-300">Interviewer Takeaway: </span>
                {evaluationResult.feedback}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
