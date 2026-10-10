'use client';

import React from 'react';
import { Job } from '@/types';
import { 
  Building2, 
  MapPin, 
  DollarSign, 
  Briefcase, 
  Users, 
  Bookmark, 
  Send, 
  CheckCircle2, 
  ExternalLink, 
  Sparkles, 
  FileCheck, 
  BookOpen, 
  Check 
} from 'lucide-react';

interface JobDetailViewProps {
  job: Job | null;
  isSaved: boolean;
  isApplied: boolean;
  onApplyClick: () => void;
  onToggleSave: (jobId: string) => void;
  onAnalyzeATS: (job: Job) => void;
  onPrepForJob: (department: string) => void;
}

export const JobDetailView: React.FC<JobDetailViewProps> = ({
  job,
  isSaved,
  isApplied,
  onApplyClick,
  onToggleSave,
  onAnalyzeATS,
  onPrepForJob,
}) => {
  if (!job) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-12 text-center glass-panel rounded-2xl border border-white/5 min-h-[500px]">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4">
          <Briefcase className="w-8 h-8 text-indigo-400" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Select a position</h3>
        <p className="text-sm text-slate-400 max-w-sm">
          Click any job listing on the left to inspect complete specifications, engineering requirements, compensation, and team insights.
        </p>
      </div>
    );
  }

  const formatSalary = (min: number, max: number) => {
    return `$${(min / 1000).toFixed(0)}k - $${(max / 1000).toFixed(0)}k / year`;
  };

  return (
    <div className="glass-panel rounded-2xl border border-white/10 p-6 sm:p-8 max-h-[calc(100vh-140px)] overflow-y-auto">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-slate-800 to-indigo-950 border border-indigo-500/30 flex items-center justify-center text-2xl font-bold text-white shadow-xl shadow-indigo-950/40 shrink-0">
            {job.logo}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                {job.department}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                {job.experienceLevel}
              </span>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                job.locationType === 'Remote' 
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                  : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
              }`}>
                {job.locationType}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {job.title}
            </h1>
            <div className="flex items-center gap-2 mt-1 text-sm text-slate-400">
              <span className="font-semibold text-slate-200">{job.company}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                {job.location}
              </span>
              <span>•</span>
              <span className="text-xs text-slate-500">Posted {job.postedDate}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => onToggleSave(job.id)}
            className={`p-3 rounded-xl border transition-all ${
              isSaved
                ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300'
                : 'glass-input text-slate-300 hover:text-white hover:border-slate-600'
            }`}
            title={isSaved ? 'Job saved' : 'Save job'}
          >
            <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-indigo-400 text-indigo-400' : ''}`} />
          </button>

          {isApplied ? (
            <div className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Applied</span>
            </div>
          ) : (
            <button
              onClick={onApplyClick}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Easy Apply</span>
            </button>
          )}
        </div>
      </div>

      {/* Quick Helper Tools Bar */}
      <div className="my-5 p-3.5 rounded-xl bg-slate-900/90 border border-white/5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-semibold text-slate-300">Target Preparation Tools:</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onAnalyzeATS(job)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 transition-colors cursor-pointer"
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>Scan My Resume for this Role</span>
          </button>

          <button
            onClick={() => onPrepForJob(job.department)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Practice Interview Questions</span>
          </button>
        </div>
      </div>

      {/* Compensation Highlights Box */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-900/60 border border-white/5 my-5">
        <div>
          <div className="text-xs text-slate-400 mb-0.5">Base Salary</div>
          <div className="text-base font-bold text-emerald-400 flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            {formatSalary(job.salaryMin, job.salaryMax)}
          </div>
        </div>

        <div>
          <div className="text-xs text-slate-400 mb-0.5">Equity Compensation</div>
          <div className="text-base font-bold text-cyan-300">
            {job.equity || 'Inquire with Recruiter'}
          </div>
        </div>

        <div>
          <div className="text-xs text-slate-400 mb-0.5">Company Scale</div>
          <div className="text-base font-bold text-slate-200 flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-slate-400" />
            {job.companySize}
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="my-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">
          Technologies & Ecosystem
        </h2>
        <div className="flex flex-wrap gap-2">
          {job.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-200 border border-white/10 shadow-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* About The Role */}
      <div className="my-6">
        <h2 className="text-lg font-bold text-white mb-3">Role Overview</h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          {job.description}
        </p>
      </div>

      {/* Responsibilities */}
      <div className="my-6">
        <h2 className="text-lg font-bold text-white mb-3">Key Responsibilities</h2>
        <ul className="space-y-2.5">
          {job.responsibilities.map((resp, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
              <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                ✓
              </span>
              <span>{resp}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Requirements */}
      <div className="my-6">
        <h2 className="text-lg font-bold text-white mb-3">Qualifications & Mastery</h2>
        <ul className="space-y-2.5">
          {job.requirements.map((req, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
              <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                •
              </span>
              <span>{req}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Nice to Have */}
      {job.niceToHave.length > 0 && (
        <div className="my-6">
          <h2 className="text-lg font-bold text-white mb-3">Bonus Points (Nice-to-Have)</h2>
          <ul className="space-y-2">
            {job.niceToHave.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-400">
                <span className="text-amber-400 font-bold">+</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Benefits */}
      <div className="my-6">
        <h2 className="text-lg font-bold text-white mb-3">Comprehensive Benefits</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {job.benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center gap-2 text-xs text-slate-300"
            >
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hiring Manager Card */}
      <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <img
            src={job.hiringManager.avatar}
            alt={job.hiringManager.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500/40 shadow"
          />
          <div>
            <div className="text-xs text-slate-400">Hiring Lead</div>
            <div className="text-sm font-bold text-white">{job.hiringManager.name}</div>
            <div className="text-xs text-indigo-300">{job.hiringManager.role}</div>
          </div>
        </div>

        <a
          href={job.companyWebsite}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold glass-input text-slate-300 hover:text-white"
        >
          <span>Visit Company Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
