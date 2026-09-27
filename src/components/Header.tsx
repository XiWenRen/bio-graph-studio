import React from 'react';
import { 
  TreePine, 
  Search, 
  Database, 
  Radio, 
  GraduationCap, 
  PlusCircle, 
  Download, 
  Upload, 
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Dna
} from 'lucide-react';
import { SpeciesData } from '../types';

interface HeaderProps {
  activeTab: 'tree' | 'explorer' | 'manage' | 'collector' | 'learning';
  setActiveTab: (tab: 'tree' | 'explorer' | 'manage' | 'collector' | 'learning') => void;
  speciesList: SpeciesData[];
  onOpenAddModal: () => void;
  onOpenImportExportModal: () => void;
  onResetSeed: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  speciesList,
  onOpenAddModal,
  onOpenImportExportModal,
  onResetSeed
}) => {
  const floraCount = speciesList.filter((s) => s.domain === 'flora').length;
  const faunaCount = speciesList.filter((s) => s.domain === 'fauna').length;
  const fungiCount = speciesList.filter((s) => s.domain === 'fungi').length;
  const protectedCount = speciesList.filter(
    (s) => s.conservation.includes('一级') || s.conservation.includes('二级') || s.conservation.includes('CR') || s.conservation.includes('EN')
  ).length;

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-slate-100 sticky top-0 z-40 shadow-lg">
      {/* Top Banner with App Title and Database Quick Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-cyan-500 flex items-center justify-center shadow-md shadow-emerald-950/40 text-white ring-1 ring-white/20">
            <Dna className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                中国生物分类与演化知识图谱系统
              </h1>
              <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                CoL China v2024
              </span>
            </div>
            <p className="text-xs text-slate-400">
              面向动植物分类学学习、界门纲目科属种检索与演化支序知识图谱
            </p>
          </div>
        </div>

        {/* Real-time Taxa Stats Badges & Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Quick Metrics */}
          <div className="hidden lg:flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60 text-xs">
            <span className="text-slate-400">物种总数:</span>
            <span className="font-semibold text-white bg-slate-700 px-1.5 py-0.5 rounded">{speciesList.length}</span>
            <span className="text-slate-500">|</span>
            <span className="text-emerald-400 font-medium">植物 {floraCount}</span>
            <span className="text-slate-500">|</span>
            <span className="text-blue-400 font-medium">动物 {faunaCount}</span>
            <span className="text-slate-500">|</span>
            <span className="text-amber-400 font-medium">真菌 {fungiCount}</span>
            <span className="text-slate-500">|</span>
            <span className="text-rose-400 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 重点保护 {protectedCount}
            </span>
          </div>

          {/* Quick Buttons */}
          <button
            id="btn-add-species-header"
            onClick={onOpenAddModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition shadow-sm cursor-pointer"
            title="录入新物种，支持AI智能补全"
          >
            <PlusCircle className="w-4 h-4" />
            <span>录入物种</span>
          </button>

          <button
            id="btn-import-export-header"
            onClick={onOpenImportExportModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium transition cursor-pointer"
            title="批量导入导出 JSON / CSV 数据"
          >
            <Download className="w-3.5 h-3.5" />
            <span>导入 / 导出</span>
          </button>

          <button
            id="btn-reset-seed-header"
            onClick={onResetSeed}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800/60 hover:bg-rose-900/40 border border-slate-700 hover:border-rose-700/60 text-slate-400 hover:text-rose-300 text-xs font-medium transition cursor-pointer"
            title="恢复为国家权威标准动植物种子数据集"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">重置种子库</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
        <nav className="flex space-x-1 sm:space-x-3 overflow-x-auto py-2 no-scrollbar" aria-label="Tabs">
          <button
            id="nav-tab-tree"
            onClick={() => setActiveTab('tree')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap cursor-pointer ${
              activeTab === 'tree'
                ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 shadow-inner'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <TreePine className="w-4 h-4 text-emerald-400" />
            <span>演化树与知识图谱</span>
            <span className="ml-1 text-[10px] bg-emerald-950/80 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-800">
              D3交互
            </span>
          </button>

          <button
            id="nav-tab-explorer"
            onClick={() => setActiveTab('explorer')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap cursor-pointer ${
              activeTab === 'explorer'
                ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 shadow-inner'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Search className="w-4 h-4 text-blue-400" />
            <span>界门纲目科属种检索</span>
            <span className="ml-1 text-[10px] bg-blue-950/80 text-blue-300 px-1.5 py-0.2 rounded border border-blue-800">
              7级阶元
            </span>
          </button>

          <button
            id="nav-tab-manage"
            onClick={() => setActiveTab('manage')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap cursor-pointer ${
              activeTab === 'manage'
                ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 shadow-inner'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Database className="w-4 h-4 text-amber-400" />
            <span>数据管理与录入后台</span>
          </button>

          <button
            id="nav-tab-collector"
            onClick={() => setActiveTab('collector')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap cursor-pointer ${
              activeTab === 'collector'
                ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 shadow-inner'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Radio className="w-4 h-4 text-cyan-400" />
            <span>权威名录数据采集器</span>
            <span className="ml-1 text-[10px] bg-cyan-950/80 text-cyan-300 px-1.5 py-0.2 rounded border border-cyan-800">
              API同步
            </span>
          </button>

          <button
            id="nav-tab-learning"
            onClick={() => setActiveTab('learning')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap cursor-pointer ${
              activeTab === 'learning'
                ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 shadow-inner'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-purple-400" />
            <span>分类学速记与自测</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
