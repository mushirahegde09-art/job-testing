'use client';

import React, { useState } from 'react';
import { Job, ATSScanResult } from '@/types';
import { analyzeResumeForJob } from '@/lib/atsAnalyzer';
import { 
  FileCheck, 
  Sparkles, 
  Upload, 
  CheckCircle2, 
  AlertTriangle, 
  Zap, 
  Search, 
  Layers, 
  Award,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ATSResumeScannerProps {
  jobs: Job[];
  initialJob?: Job | null;
}

const SAMPLE_RESUMES = {
  strong: `Alex Rivera
Senior Fullstack & Frontend Architect | alex.rivera@example.com | San Francisco, CA | github.com/alexrivera | linkedin.com/in/alexrivera

PROFESSIONAL SUMMARY:
Accomplished Senior Frontend Architect with 7+ years of experience designing high-performance distributed web applications using React 19, Next.js App Router, TypeScript, and Tailwind CSS. Spearheaded rendering optimization, reducing TTFB by 42% and Interaction to Next Paint (INP) to <60ms for 3.5M daily active users.

TECHNICAL SKILLS:
- Languages & Frameworks: TypeScript, JavaScript, React 19, Next.js, Node.js, GraphQL, Edge Runtime, Turbopack, HTML5, CSS3
- Performance & Cloud: Core Web Vitals, INP, TTFB, AWS, Kubernetes, Docker, CI/CD, Redis, PostgreSQL
- Architecture: Micro-frontends, React Server Components (RSC), State Management, WebSockets, WCAG AAA Accessibility

EXPERIENCE:
Staff Software Engineer — Horizon Cloud (2022 - Present)
- Architected next-generation client and server component rendering system using Next.js and React Server Components, reducing JavaScript bundle size by 54% and improving First Contentful Paint by 35%.
- Orchestrated real-time collaborative workspace supporting 50,000 concurrent socket connections with sub-25ms synchronization latency.
- Mentored 12 senior engineers, led engineering RFCs, and standardized testing coverage with Vitest and Playwright.

Senior Frontend Engineer — Velocity Commerce (2019 - 2022)
- Engineered checkout optimization flows that increased conversion by 18.5% and generated $4.2M in incremental revenue.
- Automated deployment pipelines using Docker and Kubernetes, reducing release cycle times from 2 days to 15 minutes.`,

  needsWork: `Jordan Doe
Web Developer | jordan@example.com

SUMMARY:
Hardworking web developer with experience making websites for clients. Worked on frontend and backend projects.

SKILLS:
HTML, CSS, JavaScript, React, Git, Bootstrap

EXPERIENCE:
Web Developer — Small Agency (2023 - Present)
- Responsible for building websites for local business clients.
- Fixed bugs and helped with updates when requested.
- Worked with other team members on daily tasks.
- Used React and CSS to design web pages.`
};

export const ATSResumeScanner: React.FC<ATSResumeScannerProps> = ({ jobs, initialJob }) => {
  const [selectedJobId, setSelectedJobId] = useState<string>(initialJob ? initialJob.id : jobs[0]?.id || '');
  const [customJobDesc, setCustomJobDesc] = useState('');
  const [resumeText, setResumeText] = useState(SAMPLE_RESUMES.strong);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ATSScanResult | null>(() => {
    const job = jobs.find(j => j.id === (initialJob?.id || jobs[0]?.id));
    return analyzeResumeForJob(SAMPLE_RESUMES.strong, job);
  });

  const selectedJob = jobs.find(j => j.id === selectedJobId);

  const handleScan = () => {
    if (!resumeText.trim()) return;
    setIsScanning(true);

    setTimeout(() => {
      const result = analyzeResumeForJob(
        resumeText,
        selectedJobId === 'custom' ? undefined : selectedJob,
        selectedJobId === 'custom' ? customJobDesc : undefined
      );

      setScanResult(result);
      setIsScanning(false);

      if (result.score >= 80) {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#06b6d4', '#6366f1', '#10b981']
        });
      }
    }, 700);
  };

  const loadSample = (type: 'strong' | 'needsWork') => {
    setResumeText(SAMPLE_RESUMES[type]);
    const job = jobs.find(j => j.id === selectedJobId);
    setScanResult(analyzeResumeForJob(SAMPLE_RESUMES[type], job));
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-3">
          <FileCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>Real-Time Applicant Tracking System (ATS) Diagnostic</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Beat the Automated Screening Algorithms
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          Over 75% of technical resumes are filtered out before reaching a human recruiter. Scan your resume against any role to identify missing keywords, weak verbs, and formatting pitfalls.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Input Column */}
        <div className="lg:col-span-6 space-y-4">
          {/* Target Job Selection Card */}
          <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
              1. Choose Target Role to Benchmark Against
            </label>
            <select
              value={selectedJobId}
              onChange={(e) => setSelectedJobId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm cursor-pointer"
            >
              {jobs.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.company} — {job.title}
                </option>
              ))}
              <option value="custom">Paste Custom Job Description...</option>
            </select>

            {selectedJobId === 'custom' && (
              <textarea
                rows={3}
                value={customJobDesc}
                onChange={(e) => setCustomJobDesc(e.target.value)}
                placeholder="Paste the target job description requirements here..."
                className="w-full p-3 rounded-xl glass-input text-xs resize-none"
              />
            )}
          </div>

          {/* Resume Content Input Card */}
          <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                2. Candidate Resume Text
              </label>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-slate-400">Load Demo:</span>
                <button
                  type="button"
                  onClick={() => loadSample('strong')}
                  className="px-2 py-0.5 rounded text-[11px] font-semibold bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 border border-indigo-500/30"
                >
                  Strong Architect (94%)
                </button>
                <button
                  type="button"
                  onClick={() => loadSample('needsWork')}
                  className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-800 text-slate-400 hover:text-white"
                >
                  Basic (45%)
                </button>
              </div>
            </div>

            <textarea
              rows={14}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your plain text resume or CV content here..."
              className="w-full p-4 rounded-xl glass-input text-xs font-mono leading-relaxed resize-y"
            />

            <button
              onClick={handleScan}
              disabled={isScanning || !resumeText.trim()}
              className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isScanning ? (
                <span>Running Algorithmic Audit...</span>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-cyan-300" />
                  <span>Scan Resume Against ATS Criteria</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Diagnostic Results Column */}
        <div className="lg:col-span-6 space-y-4">
          {scanResult && (
            <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-6">
              {/* Score Gauge Box */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950/60 border border-indigo-500/30 flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    ATS Pass Probability
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-4xl font-black text-white">{scanResult.score}</span>
                    <span className="text-sm font-semibold text-slate-400">/ 100</span>
                  </div>
                  <div className="text-xs font-semibold mt-1">
                    {scanResult.score >= 85 ? (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> High Match Tier — Ready to Submit
                      </span>
                    ) : scanResult.score >= 68 ? (
                      <span className="text-amber-400 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> Competitive — 2 Quick Fixes Recommended
                      </span>
                    ) : (
                      <span className="text-rose-400 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> Low ATS Match — High Rejection Risk
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-slate-400">Keyword Density</div>
                  <div className="text-2xl font-black text-cyan-300">
                    {scanResult.matchPercentage}%
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {scanResult.matchedKeywords.length} matched
                  </div>
                </div>
              </div>

              {/* Summary */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/50 p-4 rounded-xl border border-white/5">
                {scanResult.summary}
              </p>

              {/* Matched Keywords */}
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Matched High-Value Skills ({scanResult.matchedKeywords.length})
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {scanResult.matchedKeywords.map((kw) => (
                    <span
                      key={kw}
                      className="px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                    >
                      ✓ {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing High Priority Keywords */}
              {scanResult.missingKeywords.length > 0 && (
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" /> Missing Keywords from Job Description
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {scanResult.missingKeywords.map((kw) => (
                      <span
                        key={kw}
                        className="px-2.5 py-1 rounded-md text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20"
                      >
                        + {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Power Verbs Analysis */}
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Action Verbs Impact ({scanResult.strongVerbsFound.length} Detected)
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {scanResult.strongVerbsFound.length === 0 ? (
                    <span className="text-xs text-slate-400 italic">No strong action verbs identified.</span>
                  ) : (
                    scanResult.strongVerbsFound.map((v) => (
                      <span
                        key={v}
                        className="px-2.5 py-1 rounded-md text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 capitalize"
                      >
                        {v}
                      </span>
                    ))
                  )}
                </div>
              </div>

              {/* Formatting & Content Checklist */}
              {scanResult.formattingIssues.length > 0 && (
                <div className="p-4 rounded-xl bg-slate-900 border border-white/5 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Formatting & Metric Flags
                  </div>
                  {scanResult.formattingIssues.map((issue, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-amber-300">
                      <span className="mt-0.5">•</span>
                      <span>{issue}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Actionable Recommendations */}
              {scanResult.suggestedAdditions.length > 0 && (
                <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                    Recommended Fixes Before Submitting
                  </div>
                  {scanResult.suggestedAdditions.map((sug, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <ArrowRight className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{sug}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
