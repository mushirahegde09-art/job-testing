'use client';

import React from 'react';
import { 
  Briefcase, 
  BookOpen, 
  Sparkles, 
  FileCheck, 
  Building2, 
  DollarSign, 
  PlusCircle, 
  Bookmark, 
  Flame 
} from 'lucide-react';

export type ActiveTab = 'jobs' | 'prep' | 'mock' | 'ats' | 'companies' | 'salary';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  savedCount: number;
  appliedCount: number;
  onOpenPostJob: () => void;
  onOpenSavedDrawer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  appliedCount,
  onOpenPostJob,
  onOpenSavedDrawer,
}) => {
  const navItems = [
    { id: 'jobs' as ActiveTab, label: 'Find Jobs', icon: Briefcase },
    { id: 'prep' as ActiveTab, label: 'Interview Prep', icon: BookOpen },
    { id: 'mock' as ActiveTab, label: 'AI Mock Interview', icon: Sparkles, badge: 'AI' },
    { id: 'ats' as ActiveTab, label: 'ATS Scanner', icon: FileCheck },
    { id: 'companies' as ActiveTab, label: 'Company Blueprints', icon: Building2 },
    { id: 'salary' as ActiveTab, label: 'Salary Benchmark', icon: DollarSign },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 backdrop-blur-xl bg-slate-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Platform Name */}
          <div 
            onClick={() => setActiveTab('jobs')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow">
              <div className="w-full h-full bg-slate-950 rounded-xl flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  Nexus<span className="text-cyan-400">Careers</span>
                </span>
                <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  PRO
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">Jobs & Interview Mastery</p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-white/5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all relative ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-cyan-500/30 text-cyan-300 border border-cyan-400/40 font-bold uppercase tracking-wider">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Streak & User Stats Pill */}
            <div 
              onClick={onOpenSavedDrawer}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs font-medium text-slate-300 cursor-pointer hover:border-indigo-500/40 hover:bg-slate-800 transition-all"
              title="View saved jobs & applications"
            >
              <div className="flex items-center gap-1 text-amber-400">
                <Flame className="w-3.5 h-3.5 fill-amber-400 animate-pulse" />
                <span className="font-bold text-amber-300">5d</span>
              </div>
              <span className="text-slate-600">|</span>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Bookmark className="w-3.5 h-3.5 text-indigo-400" />
                <span className="font-semibold text-white">{savedCount}</span>
              </div>
              <span className="text-slate-600">|</span>
              <span className="text-emerald-400 font-semibold">{appliedCount} Applied</span>
            </div>

            {/* Post Job Button */}
            <button
              onClick={onOpenPostJob}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Post a Job</span>
              <span className="sm:hidden">Post</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Scrollbar */}
        <div className="lg:hidden flex items-center gap-1 overflow-x-auto py-2.5 border-t border-white/5 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-white bg-slate-900/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
