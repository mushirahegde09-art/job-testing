'use client';

import React from 'react';
import { Search, MapPin, Briefcase, Sparkles, TrendingUp, ShieldCheck, Zap } from 'lucide-react';

interface JobSearchHeroProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedDepartment: string;
  setSelectedDepartment: (dept: string) => void;
  selectedLocationType: string;
  setSelectedLocationType: (loc: string) => void;
  onQuickTagClick: (tag: string) => void;
  totalJobsCount: number;
}

export const JobSearchHero: React.FC<JobSearchHeroProps> = ({
  searchQuery,
  setSearchQuery,
  selectedDepartment,
  setSelectedDepartment,
  selectedLocationType,
  setSelectedLocationType,
  onQuickTagClick,
  totalJobsCount,
}) => {
  const quickTags = [
    'Next.js 16',
    'AI & Alignment',
    'Distributed Systems',
    'Rust',
    'Design Systems',
    'Staff Engineer',
    'Kubernetes',
  ];

  return (
    <div className="relative overflow-hidden pt-8 pb-10 sm:pt-14 sm:pb-16 bg-gradient-to-b from-slate-900/80 via-slate-950 to-slate-950 border-b border-white/5">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-600/20 via-cyan-500/15 to-purple-600/10 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          {/* Top Announcement Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-5 shadow-sm backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Over 250+ top tech companies hiring right now</span>
            <span className="hidden sm:inline text-indigo-400 font-normal">| Verified salaries & transparent equity</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight sm:leading-tight">
            Land your next high-impact tech role with{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              complete interview mastery.
            </span>
          </h1>

          <p className="mt-4 sm:mt-5 text-sm sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Discover verified senior roles, simulate realistic AI mock interviews, optimize your resume for ATS algorithms, and negotiate top-tier compensation.
          </p>
        </div>

        {/* Unified Search & Filter Command Center */}
        <div className="max-w-4xl mx-auto p-2 sm:p-3 rounded-2xl glass-panel shadow-2xl shadow-indigo-950/40 border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-3">
            {/* Search Input */}
            <div className="md:col-span-5 relative flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Job title, tech stack (e.g. React, Go, AI), or company..."
                className="w-full pl-11 pr-4 py-3 bg-slate-900/90 rounded-xl text-sm text-white placeholder-slate-400 border border-white/10 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            {/* Department Selector */}
            <div className="md:col-span-4 relative flex items-center">
              <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full pl-10 pr-8 py-3 bg-slate-900/90 rounded-xl text-sm text-slate-200 border border-white/10 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 appearance-none cursor-pointer"
              >
                <option value="All">All Departments</option>
                <option value="Frontend">Frontend Engineering</option>
                <option value="Backend">Backend & Systems</option>
                <option value="Fullstack">Fullstack Engineering</option>
                <option value="AI & ML">AI & Machine Learning</option>
                <option value="DevOps & Cloud">DevOps & Cloud</option>
                <option value="Product & Design">Product & Design</option>
              </select>
            </div>

            {/* Location Type Selector */}
            <div className="md:col-span-3 relative flex items-center">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <select
                value={selectedLocationType}
                onChange={(e) => setSelectedLocationType(e.target.value)}
                className="w-full pl-10 pr-8 py-3 bg-slate-900/90 rounded-xl text-sm text-slate-200 border border-white/10 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 appearance-none cursor-pointer"
              >
                <option value="All">All Locations</option>
                <option value="Remote">Remote Only 🌍</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>
          </div>

          {/* Quick Filter Tags */}
          <div className="mt-3 pt-3 border-t border-white/5 flex flex-wrap items-center gap-1.5 sm:gap-2 px-1">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 mr-1">
              <TrendingUp className="w-3.5 h-3.5 text-cyan-400" /> Popular:
            </span>
            {quickTags.map((tag) => (
              <button
                key={tag}
                onClick={() => onQuickTagClick(tag)}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-indigo-600/30 text-slate-300 hover:text-white border border-white/5 hover:border-indigo-500/40 transition-colors cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Metrics Bar */}
        <div className="mt-8 max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-3.5 rounded-xl glass-panel text-center">
            <div className="flex items-center justify-center gap-1.5 text-cyan-400 text-xs font-semibold mb-1">
              <Zap className="w-4 h-4" /> Live Openings
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white">{totalJobsCount} Verified</div>
            <div className="text-[11px] text-slate-400">Direct hiring links</div>
          </div>

          <div className="p-3.5 rounded-xl glass-panel text-center">
            <div className="flex items-center justify-center gap-1.5 text-emerald-400 text-xs font-semibold mb-1">
              <ShieldCheck className="w-4 h-4" /> Avg Senior Comp
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white">$215,000+</div>
            <div className="text-[11px] text-slate-400">Base salary + RSUs</div>
          </div>

          <div className="p-3.5 rounded-xl glass-panel text-center">
            <div className="flex items-center justify-center gap-1.5 text-indigo-400 text-xs font-semibold mb-1">
              <Sparkles className="w-4 h-4" /> Prep Questions
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white">450+ Curated</div>
            <div className="text-[11px] text-slate-400">FAANG & top startups</div>
          </div>

          <div className="p-3.5 rounded-xl glass-panel text-center">
            <div className="flex items-center justify-center gap-1.5 text-purple-400 text-xs font-semibold mb-1">
              <TrendingUp className="w-4 h-4" /> ATS Match Tool
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white">Instant Score</div>
            <div className="text-[11px] text-slate-400">Real-time keyword audit</div>
          </div>
        </div>
      </div>
    </div>
  );
};
