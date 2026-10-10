'use client';

import React, { useState } from 'react';
import { COMPANY_BLUEPRINTS } from '@/data/companyGuides';
import { CompanyBlueprint } from '@/types';
import { 
  Building2, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  HelpCircle, 
  Award, 
  DollarSign, 
  ShieldCheck, 
  Layers 
} from 'lucide-react';

export const CompanyBlueprints: React.FC = () => {
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('google');
  const company = COMPANY_BLUEPRINTS.find((c) => c.id === selectedCompanyId) || COMPANY_BLUEPRINTS[0];

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-3">
          <Building2 className="w-3.5 h-3.5" />
          <span>Tier-1 Tech Interview Blueprints</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          FAANG & High-Growth Company Cheat Sheets
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          Detailed breakdown of interview rounds, culture evaluation rubric, compensation bands, and frequent technical questions.
        </p>
      </div>

      {/* Company Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {COMPANY_BLUEPRINTS.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCompanyId(c.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              selectedCompanyId === c.id
                ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-white/5'
            }`}
          >
            <span>{c.logo}</span>
            <span>{c.name}</span>
          </button>
        ))}
      </div>

      {/* Blueprint Detail Card */}
      <div className="glass-panel rounded-3xl border border-white/10 p-6 sm:p-8 space-y-8">
        {/* Company Overview Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center text-3xl shadow-lg shrink-0">
              {company.logo}
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">{company.name}</h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">{company.tagline}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                  {company.hiringBar}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 w-full md:w-auto">
            <div className="text-xs text-slate-400">Typical Senior (L5/MTS) Comp</div>
            <div className="text-lg sm:text-xl font-bold text-emerald-400 flex items-center gap-1 mt-0.5">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              {company.averageSalarySenior}
            </div>
          </div>
        </div>

        {/* Stages Breakdown Timeline */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" /> Interview Process & Stages
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {company.stages.map((stage, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-900/70 border border-white/5 space-y-3 relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                    Stage {idx + 1}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{stage.duration}</span>
                </div>
                <h4 className="text-base font-bold text-white">{stage.stage}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{stage.description}</p>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-white/5 text-xs text-amber-300">
                  <span className="font-bold text-amber-400">Pro Tip: </span>
                  {stage.tips}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Culture & Behavioral Rubric */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Core Culture & Evaluation Principles
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {company.culturePrinciples.map((principle, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-1.5"
              >
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                  {principle.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Frequently Asked Interview Questions */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-purple-400" /> Top Frequent Onsite Questions
          </h3>
          <div className="space-y-3">
            {company.frequentQuestions.map((fq, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-900/80 border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-cyan-300">
                      {fq.type}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{fq.question}</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    <span className="text-indigo-400 font-semibold">Focus: </span>
                    {fq.insight}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Perks Highlight */}
        <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
          <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-2.5">
            Key Benefits & Culture Highlights
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
            {company.benefitsHighlight.map((b, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
