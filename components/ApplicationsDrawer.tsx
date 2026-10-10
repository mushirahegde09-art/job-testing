'use client';

import React, { useState } from 'react';
import { Job, Application } from '@/types';
import { 
  X, 
  Bookmark, 
  CheckCircle2, 
  Trash2, 
  ArrowRight, 
  Clock, 
  Sparkles, 
  Briefcase 
} from 'lucide-react';

interface ApplicationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedJobs: Job[];
  applications: Application[];
  onSelectJob: (job: Job) => void;
  onRemoveSaved: (jobId: string) => void;
}

export const ApplicationsDrawer: React.FC<ApplicationsDrawerProps> = ({
  isOpen,
  onClose,
  savedJobs,
  applications,
  onSelectJob,
  onRemoveSaved,
}) => {
  const [activeTab, setActiveTab] = useState<'saved' | 'applied'>('saved');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-md h-full bg-slate-900 border-l border-white/10 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-indigo-400" />
              <span>Career Dashboard</span>
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Switcher */}
          <div className="flex gap-2 my-4 p-1 bg-slate-950 rounded-xl border border-white/5">
            <button
              onClick={() => setActiveTab('saved')}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'saved'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Saved Jobs ({savedJobs.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('applied')}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'applied'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Applied ({applications.length})</span>
            </button>
          </div>

          {/* Tab 1: Saved Jobs Content */}
          {activeTab === 'saved' && (
            <div className="space-y-3">
              {savedJobs.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  <Bookmark className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-xs">No saved jobs yet.</p>
                  <p className="text-[11px] text-slate-600 mt-1">
                    Bookmark jobs to review and compare them later.
                  </p>
                </div>
              ) : (
                savedJobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-4 rounded-xl bg-slate-950/80 border border-white/5 hover:border-indigo-500/30 transition-all flex items-start justify-between gap-3 group"
                  >
                    <div 
                      onClick={() => {
                        onSelectJob(job);
                        onClose();
                      }}
                      className="cursor-pointer flex-1"
                    >
                      <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {job.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {job.company} • {job.location}
                      </p>
                      <div className="text-[11px] font-semibold text-emerald-400 mt-2">
                        ${(job.salaryMin / 1000).toFixed(0)}k - ${(job.salaryMax / 1000).toFixed(0)}k
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveSaved(job.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-white/5 transition-colors"
                      title="Remove bookmark"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Tab 2: Applied Applications Content */}
          {activeTab === 'applied' && (
            <div className="space-y-3">
              {applications.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  <CheckCircle2 className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-xs">No active applications submitted.</p>
                  <p className="text-[11px] text-slate-600 mt-1">
                    Use 1-Click Fast Apply on any listing.
                  </p>
                </div>
              ) : (
                applications.map((app) => (
                  <div
                    key={app.id}
                    className="p-4 rounded-xl bg-slate-950/80 border border-white/5 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                        {app.status}
                      </span>
                      <span className="text-[11px] text-slate-500">{app.appliedDate}</span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-white">{app.jobTitle}</h4>
                      <p className="text-xs text-slate-400">{app.company}</p>
                    </div>

                    <div className="text-[11px] text-slate-400 pt-1 border-t border-white/5 flex items-center justify-between">
                      <span>Applicant: {app.candidateName}</span>
                      <span className="text-cyan-400 font-semibold">Match: {app.matchScore}%</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="pt-4 border-t border-white/10 text-center">
          <p className="text-[11px] text-slate-500">
            NexusCareers Pro • Instant applicant status updates
          </p>
        </div>
      </div>
    </div>
  );
};
