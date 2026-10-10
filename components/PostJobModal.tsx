'use client';

import React, { useState } from 'react';
import { Job } from '@/types';
import { X, PlusCircle, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PostJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddJob: (newJob: Job) => void;
}

export const PostJobModal: React.FC<PostJobModalProps> = ({
  isOpen,
  onClose,
  onAddJob,
}) => {
  const [title, setTitle] = useState('Senior AI Systems Engineer');
  const [company, setCompany] = useState('OpenScale AI');
  const [logo, setLogo] = useState('⚡');
  const [location, setLocation] = useState('San Francisco, CA');
  const [locationType, setLocationType] = useState<'Remote' | 'Hybrid' | 'On-site'>('Remote');
  const [department, setDepartment] = useState<Job['department']>('AI & ML');
  const [experienceLevel, setExperienceLevel] = useState<Job['experienceLevel']>('Senior');
  const [salaryMin, setSalaryMin] = useState(195000);
  const [salaryMax, setSalaryMax] = useState(260000);
  const [equity, setEquity] = useState('0.1% - 0.3%');
  const [techStackInput, setTechStackInput] = useState('Python, PyTorch, vLLM, CUDA, FastAPI, TypeScript');
  const [description, setDescription] = useState(
    'We are scaling high-throughput inference engines and low-latency LLM routing pipelines. Looking for a senior engineer to drive model serving architecture.'
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const techStack = techStackInput.split(',').map((s) => s.trim()).filter(Boolean);

    const newJob: Job = {
      id: `job-user-${Date.now()}`,
      title,
      company,
      logo: logo || '🚀',
      location,
      locationType,
      department,
      experienceLevel,
      salaryMin: Number(salaryMin),
      salaryMax: Number(salaryMax),
      salaryCurrency: 'USD',
      equity,
      featured: true,
      postedDate: 'Just now',
      applicantsCount: 1,
      description,
      responsibilities: [
        'Architect high-throughput, low-latency microservices and streaming inference.',
        'Profile CPU and GPU memory bottlenecks with production telemetry.',
        'Collaborate with product and ML researchers to ship high-impact features.',
      ],
      requirements: [
        '4+ years building production distributed systems or high-scale web platforms.',
        'Proficiency with primary languages and cloud environments.',
        'Excellent written engineering communication and technical documentation.',
      ],
      niceToHave: [
        'Open source contributions or experience with distributed model training.',
      ],
      benefits: [
        'Competitive equity package with early exercise provisions.',
        'Full health, vision, and dental insurance (100% premium coverage).',
        'Flexible remote-first work environment.',
      ],
      techStack,
      companySize: '50 - 200 employees',
      companyWebsite: 'https://example.com',
      hiringManager: {
        name: 'Jordan Hayes',
        role: 'VP of Engineering',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      },
    };

    onAddJob(newJob);

    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 },
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div 
        className="w-full max-w-xl glass-panel bg-slate-900/95 border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
              Employer Portal
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white mt-1">Post a Tech Opening</h2>
            <p className="text-xs text-slate-400">Reach top software engineers, architects & designers instantly</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">Job Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Company *</label>
              <input
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm cursor-pointer"
              >
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Fullstack">Fullstack</option>
                <option value="AI & ML">AI & ML</option>
                <option value="DevOps & Cloud">DevOps & Cloud</option>
                <option value="Product & Design">Product & Design</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Location Type</label>
              <select
                value={locationType}
                onChange={(e) => setLocationType(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm cursor-pointer"
              >
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Seniority Level</label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm cursor-pointer"
              >
                <option value="Entry-Level">Entry-Level</option>
                <option value="Mid-Level">Mid-Level</option>
                <option value="Senior">Senior</option>
                <option value="Staff / Lead">Staff / Lead</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Min Salary ($/yr)</label>
              <input
                type="number"
                value={salaryMin}
                onChange={(e) => setSalaryMin(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Max Salary ($/yr)</label>
              <input
                type="number"
                value={salaryMax}
                onChange={(e) => setSalaryMax(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Equity</label>
              <input
                type="text"
                value={equity}
                onChange={(e) => setEquity(e.target.value)}
                placeholder="e.g. 0.1% or $80k RSU"
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Tech Stack (comma separated)
            </label>
            <input
              type="text"
              value={techStackInput}
              onChange={(e) => setTechStackInput(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Job Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl glass-input text-xs sm:text-sm resize-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Publish Live Listing</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
