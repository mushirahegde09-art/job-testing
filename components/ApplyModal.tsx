'use client';

import React, { useState } from 'react';
import { Job } from '@/types';
import { X, Sparkles, Upload, FileText, CheckCircle2, Send, Wand2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ApplyModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
  onSubmitApplication: (job: Job, applicantData: { name: string; email: string; note: string }) => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({
  job,
  isOpen,
  onClose,
  onSubmitApplication,
}) => {
  const [name, setName] = useState('Alex Rivera');
  const [email, setEmail] = useState('alex.rivera@example.com');
  const [portfolio, setPortfolio] = useState('https://github.com/alexrivera');
  const [workAuth, setWorkAuth] = useState('Yes, authorized without sponsorship');
  const [expectedSalary, setExpectedSalary] = useState(`$${(job.salaryMin / 1000).toFixed(0)}k`);
  const [note, setNote] = useState(
    `Excited to apply for the ${job.title} position at ${job.company}. My background in scalable frontend architecture, Next.js, and TypeScript directly matches your technical requirements.`
  );
  const [hasResumeUploaded, setHasResumeUploaded] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleGenerateCoverLetter = () => {
    setNote(
      `Dear ${job.company} Hiring Team,\n\nI am writing to express my strong interest in the ${job.title} role. With extensive hands-on experience leveraging ${job.techStack.slice(0, 3).join(', ')}, I have driven measurable engineering impact—improving web performance, reducing latency, and scaling applications to millions of users.\n\n${job.company}'s focus on engineering excellence and velocity deeply aligns with my passion. I look forward to contributing to your team's key milestones.`
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      // Trigger festive celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#06b6d4', '#10b981', '#f59e0b'],
      });

      onSubmitApplication(job, { name, email, note });
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div 
        className="w-full max-w-xl glass-panel bg-slate-900/95 border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300">
                1-Click Fast Apply
              </span>
              <span className="text-xs text-slate-400">Response guaranteed in 48h</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
              Apply to {job.company}
            </h2>
            <p className="text-xs text-slate-400">{job.title}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Application Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                GitHub / Portfolio URL
              </label>
              <input
                type="url"
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Target Salary Base
              </label>
              <input
                type="text"
                value={expectedSalary}
                onChange={(e) => setExpectedSalary(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Work Authorization
            </label>
            <select
              value={workAuth}
              onChange={(e) => setWorkAuth(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm cursor-pointer"
            >
              <option value="Yes, authorized without sponsorship">Authorized to work without sponsorship</option>
              <option value="Need sponsorship (H-1B, TN, etc.)">Require visa sponsorship</option>
              <option value="EU / UK Citizen">EU / UK Citizen</option>
            </select>
          </div>

          {/* Resume Uploader Simulation */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Resume / CV (PDF, DOCX) *
            </label>
            <div className="p-3.5 rounded-xl border border-dashed border-indigo-500/40 bg-indigo-500/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    Alex_Rivera_Senior_Engineer_2026.pdf
                    <span className="text-[10px] text-emerald-400 font-normal">● Ready</span>
                  </div>
                  <div className="text-[11px] text-slate-400">142 KB • ATS Score: 94%</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setHasResumeUploaded(!hasResumeUploaded)}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
              >
                Change
              </button>
            </div>
          </div>

          {/* AI Cover Letter Generator */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-300">
                Quick Pitch / Note to Hiring Team
              </label>
              <button
                type="button"
                onClick={handleGenerateCoverLetter}
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>AI Tailor Note</span>
              </button>
            </div>
            <textarea
              rows={4}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl glass-input text-xs sm:text-sm resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Submitting Application...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Application to {job.company}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
