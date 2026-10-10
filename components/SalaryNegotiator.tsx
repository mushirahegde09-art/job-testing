'use client';

import React, { useState } from 'react';
import { SALARY_BENCHMARKS, NEGOTIATION_SCRIPTS } from '@/data/salaryData';
import { 
  DollarSign, 
  TrendingUp, 
  Copy, 
  Check, 
  ShieldCheck, 
  FileText, 
  Award, 
  HelpCircle 
} from 'lucide-react';

export const SalaryNegotiator: React.FC = () => {
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);
  const [selectedLevelIndex, setSelectedLevelIndex] = useState(2); // Senior default
  const [copiedScriptIndex, setCopiedScriptIndex] = useState<number | null>(null);

  const currentRole = SALARY_BENCHMARKS[selectedRoleIndex];
  const currentLevel = currentRole.levels[selectedLevelIndex] || currentRole.levels[0];

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedScriptIndex(idx);
    setTimeout(() => setCopiedScriptIndex(null), 2000);
  };

  const formatCurrency = (val: number) => `$${val.toLocaleString()}`;

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-3">
          <DollarSign className="w-3.5 h-3.5" />
          <span>Compensation Intelligence & Negotiation Playbook</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Benchmark & Maximize Your Total Tech Compensation
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          Access verified median compensation data across roles and seniority levels, with battle-tested scripts for negotiating your base, equity, and signing bonus.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Calculator */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-panel rounded-3xl border border-white/10 p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" /> Compensation Calculator
            </h2>

            {/* Role Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Engineering Discipline
              </label>
              <select
                value={selectedRoleIndex}
                onChange={(e) => {
                  setSelectedRoleIndex(Number(e.target.value));
                  setSelectedLevelIndex(2);
                }}
                className="w-full p-3 rounded-xl glass-input text-xs sm:text-sm cursor-pointer"
              >
                {SALARY_BENCHMARKS.map((b, idx) => (
                  <option key={b.role} value={idx}>
                    {b.role}
                  </option>
                ))}
              </select>
            </div>

            {/* Level Selector Pills */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Seniority Level
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {currentRole.levels.map((lvl, idx) => (
                  <button
                    key={lvl.levelName}
                    onClick={() => setSelectedLevelIndex(idx)}
                    className={`p-2.5 rounded-xl text-xs font-semibold text-center transition-all cursor-pointer ${
                      selectedLevelIndex === idx
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-white/5'
                    }`}
                  >
                    <div>{lvl.levelName.split(' ')[0]}</div>
                    <div className="text-[10px] opacity-75">{lvl.yearsExp}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Compensation Display Breakdown */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-emerald-950/40 border border-emerald-500/30 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Total Compensation (Annual Median)
                </span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-400">
                  {formatCurrency(currentLevel.totalComp)}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5">
                  <div className="text-[11px] text-slate-400 mb-0.5">Base Salary</div>
                  <div className="text-sm sm:text-base font-bold text-white">
                    {formatCurrency(currentLevel.baseMedian)}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5">
                  <div className="text-[11px] text-slate-400 mb-0.5">Annual Equity</div>
                  <div className="text-sm sm:text-base font-bold text-cyan-300">
                    {formatCurrency(currentLevel.equityMedian)}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5">
                  <div className="text-[11px] text-slate-400 mb-0.5">Annual Bonus</div>
                  <div className="text-sm sm:text-base font-bold text-amber-300">
                    {formatCurrency(currentLevel.bonusMedian)}
                  </div>
                </div>
              </div>
            </div>

            {/* Golden Rules */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2 text-xs text-slate-300">
              <span className="font-bold text-emerald-400 block mb-1">
                Rule #1 of Tech Salary Negotiations:
              </span>
              <p>
                Never state a specific number first during early recruiter calls. Instead respond: &ldquo;I am flexible and expect competitive compensation aligned with current market benchmarks for this seniority tier.&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Negotiation Email Scripts */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-panel rounded-3xl border border-white/10 p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-400" /> Battle-Tested Negotiation Scripts
            </h2>

            <div className="space-y-4">
              {NEGOTIATION_SCRIPTS.map((script, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-bold text-white">{script.title}</h3>
                      <p className="text-xs text-slate-400">{script.scenario}</p>
                    </div>

                    <button
                      onClick={() => handleCopy(script.template, idx)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 border border-indigo-500/40 shrink-0 cursor-pointer"
                    >
                      {copiedScriptIndex === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Template</span>
                        </>
                      )}
                    </button>
                  </div>

                  <pre className="p-3.5 rounded-xl bg-slate-950 border border-white/5 text-xs text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">
                    {script.template}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
