'use client';

import React from 'react';
import { Job } from '@/types';
import { MapPin, DollarSign, Users, Bookmark, CheckCircle2, Sparkles } from 'lucide-react';

interface JobCardProps {
  job: Job;
  isSelected: boolean;
  isSaved: boolean;
  isApplied: boolean;
  onSelect: (job: Job) => void;
  onToggleSave: (jobId: string, e: React.MouseEvent) => void;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  isSelected,
  isSaved,
  isApplied,
  onSelect,
  onToggleSave,
}) => {
  const formatSalary = (min: number, max: number) => {
    return `$${(min / 1000).toFixed(0)}k - $${(max / 1000).toFixed(0)}k`;
  };

  return (
    <div
      onClick={() => onSelect(job)}
      className={`group relative p-5 rounded-2xl cursor-pointer transition-all duration-200 border ${
        isSelected
          ? 'bg-slate-900/90 border-indigo-500 shadow-xl shadow-indigo-500/10 ring-1 ring-indigo-500'
          : 'glass-panel hover:bg-slate-900/70 hover:border-slate-700 hover:shadow-lg'
      }`}
    >
      {/* Featured / Applied banner */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {job.featured && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
              <Sparkles className="w-3 h-3 text-amber-400" /> Featured
            </span>
          )}
          {isApplied && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Applied
            </span>
          )}
          <span className="text-[11px] font-medium text-slate-400">
            {job.postedDate}
          </span>
        </div>

        {/* Bookmark button */}
        <button
          onClick={(e) => onToggleSave(job.id, e)}
          className={`p-2 rounded-xl transition-all ${
            isSaved
              ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
              : 'text-slate-400 hover:text-white hover:bg-white/10'
          }`}
          title={isSaved ? 'Remove from saved' : 'Save job'}
        >
          <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-indigo-400 text-indigo-400' : ''}`} />
        </button>
      </div>

      {/* Main Role & Company info */}
      <div className="flex items-start gap-3.5">
        {/* Company Avatar / Logo */}
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center text-lg font-bold text-white shadow-md shrink-0 group-hover:scale-105 transition-transform">
          {job.logo}
        </div>

        <div className="flex-1 min-w-0">
          <h2 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors truncate">
            {job.title}
          </h2>
          <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-400">
            <span className="font-semibold text-slate-200">{job.company}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-500" />
              {job.location}
            </span>
            <span>•</span>
            <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
              job.locationType === 'Remote' 
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' 
                : job.locationType === 'Hybrid'
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                : 'bg-slate-800 text-slate-300'
            }`}>
              {job.locationType}
            </span>
          </div>
        </div>
      </div>

      {/* Compensation & Leveling Info */}
      <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
          <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
          <span>{formatSalary(job.salaryMin, job.salaryMax)}</span>
          {job.equity && (
            <span className="text-[11px] font-normal text-slate-400">
              + {job.equity}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
          <Users className="w-3 h-3 text-slate-500" />
          <span>{job.applicantsCount} applicants</span>
        </div>
      </div>

      {/* Tech Stack Tags */}
      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {job.techStack.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-800/80 text-slate-300 border border-white/5"
          >
            {tech}
          </span>
        ))}
        {job.techStack.length > 4 && (
          <span className="text-[10px] font-medium text-slate-500 px-1">
            +{job.techStack.length - 4} more
          </span>
        )}
      </div>
    </div>
  );
};
