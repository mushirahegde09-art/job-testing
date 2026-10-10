'use client';

import React, { useState } from 'react';
import { INITIAL_JOBS } from '@/data/jobsData';
import { Job, Application, TrackType } from '@/types';
import { Navbar, ActiveTab } from '@/components/Navbar';
import { JobBoard } from '@/components/JobBoard';
import { InterviewPrepHub } from '@/components/InterviewPrepHub';
import { MockInterviewSimulator } from '@/components/MockInterviewSimulator';
import { ATSResumeScanner } from '@/components/ATSResumeScanner';
import { CompanyBlueprints } from '@/components/CompanyBlueprints';
import { SalaryNegotiator } from '@/components/SalaryNegotiator';
import { ApplyModal } from '@/components/ApplyModal';
import { PostJobModal } from '@/components/PostJobModal';
import { ApplicationsDrawer } from '@/components/ApplicationsDrawer';
import { 
  Briefcase, 
  CheckCircle2
} from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('jobs');
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  
  // Saved & Applied states
  const [savedJobIds, setSavedJobIds] = useState<Set<string>>(new Set(['job-1', 'job-3']));
  const [appliedJobIds, setAppliedJobIds] = useState<Set<string>>(new Set(['job-2']));
  const [applications, setApplications] = useState<Application[]>([
    {
      id: 'app-init-1',
      jobId: 'job-2',
      jobTitle: 'Staff Distributed Systems Engineer',
      company: 'Stripe',
      appliedDate: 'Yesterday',
      status: 'Interview Scheduled',
      candidateName: 'Alex Rivera',
      candidateEmail: 'alex.rivera@example.com',
      matchScore: 92,
    },
  ]);

  // Modal states
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [targetApplyJob, setTargetApplyJob] = useState<Job | null>(null);
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);

  // Cross-feature preselection states
  const [targetATSJob, setTargetATSJob] = useState<Job | null>(null);
  const [targetPrepTrack, setTargetPrepTrack] = useState<TrackType>('frontend');

  // Toggle Save / Bookmark
  const handleToggleSave = (jobId: string) => {
    setSavedJobIds((prev) => {
      const next = new Set(prev);
      if (next.has(jobId)) {
        next.delete(jobId);
      } else {
        next.add(jobId);
      }
      return next;
    });
  };

  // Open Apply modal
  const handleOpenApply = (job: Job) => {
    setTargetApplyJob(job);
    setIsApplyModalOpen(true);
  };

  // Submit Application
  const handleSubmitApplication = (
    job: Job,
    applicantData: { name: string; email: string; note: string }
  ) => {
    setAppliedJobIds((prev) => new Set([...prev, job.id]));
    const newApp: Application = {
      id: `app-${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      appliedDate: 'Just now',
      status: 'Submitted',
      candidateName: applicantData.name,
      candidateEmail: applicantData.email,
      matchScore: 94,
    };
    setApplications((prev) => [newApp, ...prev]);
  };

  // Add new job (from employer wizard)
  const handleAddJob = (newJob: Job) => {
    setJobs((prev) => [newJob, ...prev]);
  };

  // Cross-feature triggers
  const handleAnalyzeATS = (job: Job) => {
    setTargetATSJob(job);
    setActiveTab('ats');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrepForJob = (department: string) => {
    const deptLower = department.toLowerCase();
    if (deptLower.includes('frontend')) setTargetPrepTrack('frontend');
    else if (deptLower.includes('backend')) setTargetPrepTrack('backend');
    else if (deptLower.includes('ai') || deptLower.includes('ml')) setTargetPrepTrack('ai-ml');
    else setTargetPrepTrack('system-design');
    
    setActiveTab('prep');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Saved jobs list for drawer
  const savedJobsList = jobs.filter((j) => savedJobIds.has(j.id));

  return (
    <div className="min-h-screen flex flex-col text-slate-100 selection:bg-cyan-500 selection:text-black">
      {/* Global Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedJobIds.size}
        appliedCount={appliedJobIds.size}
        onOpenPostJob={() => setIsPostJobModalOpen(true)}
        onOpenSavedDrawer={() => setIsSavedDrawerOpen(true)}
      />

      {/* Main Tab View Routing */}
      <main className="flex-1 w-full">
        {activeTab === 'jobs' && (
          <JobBoard
            jobs={jobs}
            savedJobIds={savedJobIds}
            appliedJobIds={appliedJobIds}
            onToggleSave={handleToggleSave}
            onOpenApply={handleOpenApply}
            onAnalyzeATS={handleAnalyzeATS}
            onPrepForJob={handlePrepForJob}
          />
        )}

        {activeTab === 'prep' && (
          <InterviewPrepHub initialTrack={targetPrepTrack} />
        )}

        {activeTab === 'mock' && (
          <MockInterviewSimulator />
        )}

        {activeTab === 'ats' && (
          <ATSResumeScanner jobs={jobs} initialJob={targetATSJob} />
        )}

        {activeTab === 'companies' && (
          <CompanyBlueprints />
        )}

        {activeTab === 'salary' && (
          <SalaryNegotiator />
        )}
      </main>

      {/* Apply Modal */}
      {targetApplyJob && (
        <ApplyModal
          job={targetApplyJob}
          isOpen={isApplyModalOpen}
          onClose={() => setIsApplyModalOpen(false)}
          onSubmitApplication={handleSubmitApplication}
        />
      )}

      {/* Post a Job Modal */}
      <PostJobModal
        isOpen={isPostJobModalOpen}
        onClose={() => setIsPostJobModalOpen(false)}
        onAddJob={handleAddJob}
      />

      {/* Saved & Applied Drawer */}
      <ApplicationsDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedJobs={savedJobsList}
        applications={applications}
        onSelectJob={(job) => {
          setActiveTab('jobs');
        }}
        onRemoveSaved={handleToggleSave}
      />

      {/* Modern Platform Footer */}
      <footer className="mt-20 border-t border-white/10 glass-panel bg-slate-950/90 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            {/* Col 1: Brand & Mission */}
            <div className="space-y-3 md:col-span-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center font-bold text-white shadow">
                  <Briefcase className="w-4 h-4 text-white" />
                </div>
                <span className="font-extrabold text-lg text-white">
                  Nexus<span className="text-cyan-400">Careers</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                The unified platform connecting ambitious engineers with high-growth tech companies, backed by real-time interview prep and ATS analytics.
              </p>
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> 100% Verified Tech Roles
              </div>
            </div>

            {/* Col 2: Job Board Tracks */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                Job Disciplines
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li className="hover:text-cyan-400 cursor-pointer" onClick={() => setActiveTab('jobs')}>
                  Frontend & React Architects
                </li>
                <li className="hover:text-cyan-400 cursor-pointer" onClick={() => setActiveTab('jobs')}>
                  Distributed Backend & Go / Rust
                </li>
                <li className="hover:text-cyan-400 cursor-pointer" onClick={() => setActiveTab('jobs')}>
                  Frontier AI & Machine Learning
                </li>
                <li className="hover:text-cyan-400 cursor-pointer" onClick={() => setActiveTab('jobs')}>
                  Cloud Infrastructure & Kubernetes
                </li>
                <li className="hover:text-cyan-400 cursor-pointer" onClick={() => setActiveTab('jobs')}>
                  Principal Product Designers
                </li>
              </ul>
            </div>

            {/* Col 3: Preparation Tools */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                Interview Mastery
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li className="hover:text-cyan-400 cursor-pointer" onClick={() => setActiveTab('prep')}>
                  System Design & Architecture
                </li>
                <li className="hover:text-cyan-400 cursor-pointer" onClick={() => setActiveTab('mock')}>
                  AI Mock Technical Simulator
                </li>
                <li className="hover:text-cyan-400 cursor-pointer" onClick={() => setActiveTab('ats')}>
                  ATS Resume Scanner & Score
                </li>
                <li className="hover:text-cyan-400 cursor-pointer" onClick={() => setActiveTab('companies')}>
                  FAANG Company Cheat Sheets
                </li>
                <li className="hover:text-cyan-400 cursor-pointer" onClick={() => setActiveTab('salary')}>
                  Compensation Benchmarks & Scripts
                </li>
              </ul>
            </div>

            {/* Col 4: Platform Insights */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                Employer Solutions
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Hire senior engineering talent with proven domain mastery. Zero spam, high response rates.
              </p>
              <button
                onClick={() => setIsPostJobModalOpen(true)}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white shadow-md transition-all cursor-pointer"
              >
                Post an Opening
              </button>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              © 2026 NexusCareers Platform. Built for engineering excellence and career growth.
            </div>
            <div className="flex items-center gap-4">
              <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
              <span>•</span>
              <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
              <span>•</span>
              <span className="hover:text-slate-300 cursor-pointer">Security Standards</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
