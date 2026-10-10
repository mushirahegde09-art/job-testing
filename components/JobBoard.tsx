'use client';

import React, { useState, useMemo } from 'react';
import { Job } from '@/types';
import { JobSearchHero } from './JobSearchHero';
import { JobCard } from './JobCard';
import { JobDetailView } from './JobDetailView';
import { 
  SlidersHorizontal, 
  ArrowUpDown, 
  Briefcase, 
  Sparkles, 
  X,
  Filter
} from 'lucide-react';

interface JobBoardProps {
  jobs: Job[];
  savedJobIds: Set<string>;
  appliedJobIds: Set<string>;
  onToggleSave: (jobId: string) => void;
  onOpenApply: (job: Job) => void;
  onAnalyzeATS: (job: Job) => void;
  onPrepForJob: (department: string) => void;
}

export const JobBoard: React.FC<JobBoardProps> = ({
  jobs,
  savedJobIds,
  appliedJobIds,
  onToggleSave,
  onOpenApply,
  onAnalyzeATS,
  onPrepForJob,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedLocationType, setSelectedLocationType] = useState('All');
  const [selectedExpLevel, setSelectedExpLevel] = useState('All');
  const [minSalary, setMinSalary] = useState(0);
  const [sortBy, setSortBy] = useState<'recent' | 'salary' | 'applicants'>('recent');

  const [selectedJob, setSelectedJob] = useState<Job | null>(jobs[0] || null);

  // Filter & sort logic
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        searchQuery === '' ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDept =
        selectedDepartment === 'All' || job.department === selectedDepartment;

      const matchesLoc =
        selectedLocationType === 'All' || job.locationType === selectedLocationType;

      const matchesExp =
        selectedExpLevel === 'All' || job.experienceLevel === selectedExpLevel;

      const matchesSal = job.salaryMax >= minSalary;

      return matchesSearch && matchesDept && matchesLoc && matchesExp && matchesSal;
    }).sort((a, b) => {
      if (sortBy === 'salary') return b.salaryMax - a.salaryMax;
      if (sortBy === 'applicants') return b.applicantsCount - a.applicantsCount;
      return 0; // Default order
    });
  }, [jobs, searchQuery, selectedDepartment, selectedLocationType, selectedExpLevel, minSalary, sortBy]);

  const handleQuickTagClick = (tag: string) => {
    setSearchQuery(tag);
  };

  const handleCardSelect = (job: Job) => {
    setSelectedJob(job);
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedDepartment('All');
    setSelectedLocationType('All');
    setSelectedExpLevel('All');
    setMinSalary(0);
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedDepartment !== 'All' ||
    selectedLocationType !== 'All' ||
    selectedExpLevel !== 'All' ||
    minSalary > 0;

  return (
    <div className="w-full">
      {/* Animated Hero with Search & Filter input */}
      <JobSearchHero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedDepartment={selectedDepartment}
        setSelectedDepartment={setSelectedDepartment}
        selectedLocationType={selectedLocationType}
        setSelectedLocationType={setSelectedLocationType}
        onQuickTagClick={handleQuickTagClick}
        totalJobsCount={jobs.length}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Secondary Filter & Sort Control Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl glass-panel border border-white/5 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 mr-1">
              <Filter className="w-3.5 h-3.5 text-cyan-400" /> Seniority:
            </span>
            {['All', 'Entry-Level', 'Mid-Level', 'Senior', 'Staff / Lead'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedExpLevel(lvl)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedExpLevel === lvl
                    ? 'bg-indigo-600 text-white shadow'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                {lvl}
              </button>
            ))}

            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 font-semibold ml-2"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* Sort By Select */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs text-slate-400 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 rounded-lg glass-input text-xs font-semibold text-slate-200 cursor-pointer"
            >
              <option value="recent">Most Recent</option>
              <option value="salary">Highest Salary</option>
              <option value="applicants">Most Applicants</option>
            </select>
          </div>
        </div>

        {/* Main Split Grid (List on Left, Sticky Detail on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Job Cards List */}
          <div className="lg:col-span-5 space-y-3.5">
            <div className="flex items-center justify-between px-1 text-xs text-slate-400 font-medium">
              <span>Showing {filteredJobs.length} open roles</span>
              <span>Click to view details</span>
            </div>

            {filteredJobs.length === 0 ? (
              <div className="p-12 text-center glass-panel rounded-2xl border border-white/5">
                <Briefcase className="w-10 h-10 text-slate-500 mx-auto mb-3" />
                <h3 className="text-base font-bold text-white">No openings match your filters</h3>
                <p className="text-xs text-slate-400 mt-1 mb-4">
                  Try clearing your search query or broadening location requirements.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  isSelected={selectedJob?.id === job.id}
                  isSaved={savedJobIds.has(job.id)}
                  isApplied={appliedJobIds.has(job.id)}
                  onSelect={handleCardSelect}
                  onToggleSave={(jobId, e) => {
                    e.stopPropagation();
                    onToggleSave(jobId);
                  }}
                />
              ))
            )}
          </div>

          {/* Right Column: Sticky Job Detail View */}
          <div className="lg:col-span-7 sticky top-24">
            <JobDetailView
              job={selectedJob}
              isSaved={selectedJob ? savedJobIds.has(selectedJob.id) : false}
              isApplied={selectedJob ? appliedJobIds.has(selectedJob.id) : false}
              onApplyClick={() => selectedJob && onOpenApply(selectedJob)}
              onToggleSave={(jobId) => onToggleSave(jobId)}
              onAnalyzeATS={(job) => onAnalyzeATS(job)}
              onPrepForJob={(dept) => onPrepForJob(dept)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
