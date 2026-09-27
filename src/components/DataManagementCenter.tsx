import React, { useState, useMemo } from 'react';
import { 
  Database, 
  PlusCircle, 
  Trash2, 
  Edit3, 
  Search, 
  Tag, 
  Filter, 
  CheckSquare, 
  Square, 
  Download, 
  Upload, 
  RotateCcw, 
  Eye, 
  Sparkles,
  ShieldCheck,
  HardDrive,
  FileCheck
} from 'lucide-react';
import { SpeciesData } from '../types';
import { SpeciesImage } from './SpeciesImage';

interface DataManagementCenterProps {
  speciesList: SpeciesData[];
  onOpenAddModal: () => void;
  onEditSpecies: (species: SpeciesData) => void;
  onDeleteSpecies: (id: string) => void;
  onBatchDelete: (ids: string[]) => void;
  onSelectSpecies: (species: SpeciesData) => void;
  onOpenImportExport: () => void;
  onResetSeed: () => void;
}

export const DataManagementCenter: React.FC<DataManagementCenterProps> = ({
  speciesList,
  onOpenAddModal,
  onEditSpecies,
  onDeleteSpecies,
  onBatchDelete,
  onSelectSpecies,
  onOpenImportExport,
  onResetSeed
}) => {
  const [search, setSearch] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [customTagInput, setCustomTagInput] = useState('');

  // Filtered list
  const filtered = useMemo(() => {
    return speciesList.filter((s) => {
      if (selectedDomain !== 'all' && s.domain !== selectedDomain) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchName = s.chineseName.toLowerCase().includes(q);
        const matchSci = s.scientificName.toLowerCase().includes(q);
        const matchTax = Object.values(s.taxonomy).some((v) => typeof v === 'string' && v.toLowerCase().includes(q));
        const matchTag = s.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchName && !matchSci && !matchTax && !matchTag) return false;
      }
      return true;
    });
  }, [speciesList, selectedDomain, search]);

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSelectAll = () => {
    if (selectedIds.size === filtered.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filtered.map((s) => s.id)));
    }
  };

  const handleExecuteBatchDelete = () => {
    if (selectedIds.size === 0) return;
    if (confirm(`确定要批量删除选中的 ${selectedIds.size} 条物种分类记录吗？此操作无法撤销。`)) {
      onBatchDelete(Array.from(selectedIds));
      setSelectedIds(new Set());
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 text-slate-100">
      {/* Top Banner with DB Metrics */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800 text-xs font-semibold">
                后台数据中心
              </span>
              <span className="text-xs text-slate-400">分类数据增删改查 · 标签管理 · 批量操作</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              中国生物分类数据管理与维护控制台
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onOpenAddModal}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md transition cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>录入新物种 (AI辅助)</span>
            </button>

            <button
              onClick={onOpenImportExport}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>导入/导出</span>
            </button>

            <button
              onClick={onResetSeed}
              className="px-3 py-2 bg-slate-800/80 hover:bg-rose-950/60 border border-slate-700 hover:border-rose-700 text-slate-400 hover:text-rose-300 font-medium rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer"
              title="重置为国家标准种子物种库"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>重置种子库</span>
            </button>
          </div>
        </div>
      </div>

      {/* Control & Filter Bar */}
      <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="在管理后台中检索中文名、拉丁学名、科属、标签..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
          />
        </div>

        {/* Domain & Batch Action */}
        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
          >
            <option value="all">全部界门类</option>
            <option value="flora">植物界 (Flora)</option>
            <option value="fauna">动物界 (Fauna)</option>
            <option value="fungi">真菌界 (Fungi)</option>
          </select>

          {selectedIds.size > 0 && (
            <button
              onClick={handleExecuteBatchDelete}
              className="px-3 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-md transition cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>批量删除 ({selectedIds.size})</span>
            </button>
          )}
        </div>
      </div>

      {/* Species Management Table */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 border-collapse">
            <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="p-3.5 w-10">
                  <input
                    type="checkbox"
                    checked={filtered.length > 0 && selectedIds.size === filtered.length}
                    onChange={handleSelectAll}
                    className="rounded cursor-pointer"
                  />
                </th>
                <th className="p-3.5">中文正名</th>
                <th className="p-3.5">拉丁学名</th>
                <th className="p-3.5">门 / 纲 / 目 / 科</th>
                <th className="p-3.5">保护等级</th>
                <th className="p-3.5">自定义标签</th>
                <th className="p-3.5">更新时间</th>
                <th className="p-3.5 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map((sp) => (
                <tr key={sp.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-3.5">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(sp.id)}
                      onChange={() => handleToggleSelect(sp.id)}
                      className="rounded cursor-pointer"
                    />
                  </td>
                  <td className="p-3.5 font-bold text-white flex items-center gap-2">
                    <div className="w-7 h-7 rounded-md overflow-hidden border border-slate-700 shrink-0">
                      <SpeciesImage
                        src={sp.imageUrl}
                        alt={sp.chineseName}
                        scientificName={sp.scientificName}
                        domain={sp.domain}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span>{sp.chineseName}</span>
                  </td>
                  <td className="p-3.5 font-serif italic text-emerald-300">
                    {sp.scientificName}{' '}
                    <span className="not-italic text-[10px] text-slate-400">{sp.namingAuthor}</span>
                  </td>
                  <td className="p-3.5 text-slate-400">
                    {sp.taxonomy.phylum.split(' ')[0]} › {sp.taxonomy.class.split(' ')[0]} ›{' '}
                    {sp.taxonomy.order.split(' ')[0]} ›{' '}
                    <strong className="text-slate-300">{sp.taxonomy.family.split(' ')[0]}</strong>
                  </td>
                  <td className="p-3.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        sp.conservation.includes('一级')
                          ? 'bg-rose-950 text-rose-300 border border-rose-800'
                          : sp.conservation.includes('二级')
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {sp.conservation.split(' ')[0]}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {sp.tags.slice(0, 2).map((t, idx) => (
                        <span
                          key={idx}
                          className="px-1.5 py-0.5 bg-slate-800 text-slate-300 rounded text-[10px] border border-slate-700"
                        >
                          #{t}
                        </span>
                      ))}
                      {sp.tags.length > 2 && (
                        <span className="text-[10px] text-slate-500 self-center">+{sp.tags.length - 2}</span>
                      )}
                    </div>
                  </td>
                  <td className="p-3.5 font-mono text-slate-500 text-[11px]">
                    {new Date(sp.updatedAt).toLocaleDateString('zh-CN')}
                  </td>
                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onSelectSpecies(sp)}
                        className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg cursor-pointer"
                        title="查看详细档案"
                      >
                        <Eye className="w-3.5 h-3.5 text-emerald-400" />
                      </button>
                      <button
                        onClick={() => onEditSpecies(sp)}
                        className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg cursor-pointer"
                        title="编辑物种信息"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`确定要删除物种“${sp.chineseName}”吗？`)) {
                            onDeleteSpecies(sp.id);
                          }
                        }}
                        className="p-1.5 bg-slate-800 hover:bg-rose-950/80 text-slate-400 hover:text-rose-300 rounded-lg cursor-pointer"
                        title="删除"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
