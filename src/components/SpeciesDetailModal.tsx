import React from 'react';
import { 
  X, 
  ShieldCheck, 
  MapPin, 
  TreePine, 
  Dna, 
  Clock, 
  Tag, 
  BookOpen, 
  Edit3, 
  Share2, 
  ExternalLink,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';
import { SpeciesData, TAXONOMIC_RANK_NAMES } from '../types';
import { SpeciesImage } from './SpeciesImage';

interface SpeciesDetailModalProps {
  species: SpeciesData | null;
  onClose: () => void;
  onEdit: (species: SpeciesData) => void;
  onLocateInTree: (species: SpeciesData) => void;
}

export const SpeciesDetailModal: React.FC<SpeciesDetailModalProps> = ({
  species,
  onClose,
  onEdit,
  onLocateInTree
}) => {
  if (!species) return null;

  const ranks = [
    { rank: 'kingdom', zh: '界', name: species.taxonomy.kingdom, color: 'text-emerald-400 border-emerald-800 bg-emerald-950/60' },
    { rank: 'phylum', zh: '门', name: species.taxonomy.phylum, color: 'text-teal-400 border-teal-800 bg-teal-950/60' },
    { rank: 'class', zh: '纲', name: species.taxonomy.class, color: 'text-cyan-400 border-cyan-800 bg-cyan-950/60' },
    { rank: 'order', zh: '目', name: species.taxonomy.order, color: 'text-blue-400 border-blue-800 bg-blue-950/60' },
    { rank: 'family', zh: '科', name: species.taxonomy.family, color: 'text-indigo-400 border-indigo-800 bg-indigo-950/60' },
    { rank: 'genus', zh: '属', name: species.taxonomy.genus, color: 'text-purple-400 border-purple-800 bg-purple-950/60' },
    { rank: 'species', zh: '种', name: species.taxonomy.species, color: 'text-amber-400 border-amber-800 bg-amber-950/60' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header with Hero Image */}
        <div className="relative h-64 sm:h-72 w-full bg-slate-950 shrink-0 overflow-hidden">
          <SpeciesImage
            src={species.imageUrl}
            alt={species.chineseName}
            scientificName={species.scientificName}
            domain={species.domain}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>

          {/* Close & Action buttons */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={() => onLocateInTree(species)}
              className="p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 backdrop-blur transition cursor-pointer"
              title="在系统发生树中高亮定位"
            >
              <Dna className="w-4 h-4 text-blue-400" />
            </button>
            <button
              onClick={() => {
                onClose();
                onEdit(species);
              }}
              className="p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 backdrop-blur transition cursor-pointer"
              title="编辑此物种"
            >
              <Edit3 className="w-4 h-4 text-amber-400" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 backdrop-blur transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Title & Scientific Name Hero */}
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
              <span
                className={`px-2.5 py-0.5 text-xs font-semibold rounded-md border ${
                  species.domain === 'flora'
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                    : species.domain === 'fungi'
                    ? 'bg-amber-950 text-amber-300 border-amber-700'
                    : 'bg-blue-950 text-blue-300 border-blue-700'
                }`}
              >
                {species.domain === 'flora' ? '植物界' : species.domain === 'fungi' ? '真菌界' : '动物界'}
              </span>
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-md bg-rose-950 text-rose-300 border border-rose-800 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                {species.conservation}
              </span>
              {species.citesAppendix && species.citesAppendix !== '无' && (
                <span className="px-2 py-0.5 text-xs font-mono rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                  {species.citesAppendix}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-baseline gap-3">
              <span>{species.chineseName}</span>
              {species.commonNames && species.commonNames.length > 0 && (
                <span className="text-sm font-normal text-slate-400">
                  (别名: {species.commonNames.join('、')})
                </span>
              )}
            </h1>

            <p className="text-sm sm:text-base text-emerald-300 font-serif italic mt-0.5">
              {species.scientificName}{' '}
              <span className="text-xs text-slate-400 not-italic font-sans">{species.namingAuthor}</span>
            </p>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm text-slate-300 leading-relaxed">
          {/* 1. Seven-Level Linnaean Classification Ladder */}
          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>林奈七级阶元系统分类 (Linnaean Taxonomic Ladder)</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {ranks.map((r, i) => (
                <div key={i} className={`p-2 rounded-xl border ${r.color} text-center space-y-0.5`}>
                  <div className="text-[10px] uppercase font-bold text-slate-400">
                    {i + 1}. {r.zh} ({r.rank})
                  </div>
                  <div className="font-semibold text-white text-xs truncate" title={r.name}>
                    {r.name.split(' ')[0]}
                  </div>
                  <div className="text-[10px] text-slate-400 italic truncate" title={r.name}>
                    {r.name.includes('(') ? r.name.match(/\((.*?)\)/)?.[1] || '' : ''}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Morphology & Habits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800 space-y-2">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 text-emerald-400">
                <Info className="w-4 h-4" />
                <span>形态解剖特征描述</span>
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">{species.morphology}</p>
            </div>

            <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800 space-y-2">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 text-blue-400">
                <TreePine className="w-4 h-4" />
                <span>生态习性与生境</span>
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">{species.habits}</p>
              <div className="pt-2 text-xs text-slate-400">
                <strong className="text-slate-300">生境海拔: </strong> {species.habitat}
              </div>
            </div>
          </div>

          {/* 3. Evolutionary Significance & Geological Era */}
          <div className="bg-gradient-to-r from-amber-950/30 via-slate-900 to-slate-950 p-4 rounded-2xl border border-amber-900/40 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>演化支序地位与地质起源</span>
              </h3>
              <span className="text-xs font-mono bg-amber-950 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-800">
                地质时代: {species.geologicalPeriod}
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">{species.evolutionaryMilestone}</p>
          </div>

          {/* 4. Geographic Distribution in China */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-rose-400" />
              <span>中国国内主要地理分布</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {species.distribution.map((dist, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-slate-800 text-slate-200 rounded-lg text-xs border border-slate-700"
                >
                  📍 {dist}
                </span>
              ))}
            </div>
          </div>

          {/* 5. Custom Tags & Data Provenance */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
            <div>
              <h4 className="text-xs font-bold text-slate-400 mb-2 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" /> 特色属性与自定义标签
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {species.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800 text-xs font-medium"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-400 mb-2 flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" /> 权威文献与数据来源
              </h4>
              <div className="space-y-1 text-xs text-slate-400">
                <div>
                  <strong className="text-slate-300">数据库来源: </strong> {species.dataSource}
                </div>
                {species.references && species.references.map((ref, idx) => (
                  <div key={idx} className="text-[11px] text-slate-400 truncate">
                    • 《{ref.title}》 - {ref.source} ({ref.year || '2024'})
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-950 px-6 py-3.5 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>记录更新时间: {new Date(species.updatedAt).toLocaleDateString('zh-CN')}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onLocateInTree(species);
              }}
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl transition cursor-pointer"
            >
              在演化树中查看
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
