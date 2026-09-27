import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Layers, 
  Grid, 
  List, 
  ShieldCheck, 
  MapPin, 
  Tag, 
  Sparkles, 
  ExternalLink, 
  Edit3, 
  Trash2, 
  ChevronRight, 
  RotateCcw,
  BookOpen,
  Dna
} from 'lucide-react';
import { SpeciesData, TaxonomicRank, TAXONOMIC_RANK_NAMES } from '../types';
import { SpeciesImage } from './SpeciesImage';

interface TaxonomyExplorerProps {
  speciesList: SpeciesData[];
  onSelectSpecies: (species: SpeciesData) => void;
  onEditSpecies: (species: SpeciesData) => void;
  onDeleteSpecies: (id: string) => void;
  onLocateInTree: (species: SpeciesData) => void;
}

export const TaxonomyExplorer: React.FC<TaxonomyExplorerProps> = ({
  speciesList,
  onSelectSpecies,
  onEditSpecies,
  onDeleteSpecies,
  onLocateInTree
}) => {
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [selectedConservation, setSelectedConservation] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [viewLayout, setViewLayout] = useState<'grid' | 'table'>('grid');

  // 7-Level Cascading Hierarchy State
  const [hierKingdom, setHierKingdom] = useState<string>('');
  const [hierPhylum, setHierPhylum] = useState<string>('');
  const [hierClass, setHierClass] = useState<string>('');
  const [hierOrder, setHierOrder] = useState<string>('');
  const [hierFamily, setHierFamily] = useState<string>('');
  const [hierGenus, setHierGenus] = useState<string>('');

  // Extract unique regions & tags for dropdowns
  const allRegions = useMemo(() => {
    const set = new Set<string>();
    speciesList.forEach((s) => {
      s.distribution.forEach((d) => {
        // extract simplified province name
        const match = d.match(/[\u4e00-\u9fa5]{2,3}/);
        if (match) set.add(match[0]);
      });
    });
    return Array.from(set).sort();
  }, [speciesList]);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    speciesList.forEach((s) => s.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [speciesList]);

  // Cascading options calculation
  const availableKingdoms = useMemo(() => {
    const map = new Map<string, number>();
    speciesList.forEach((s) => {
      const k = s.taxonomy.kingdom;
      map.set(k, (map.get(k) || 0) + 1);
    });
    return Array.from(map.entries());
  }, [speciesList]);

  // All phyla across the entire database with their respective kingdom & count
  const allPhylaMap = useMemo(() => {
    const map = new Map<string, { count: number; kingdom: string }>();
    speciesList.forEach((s) => {
      const p = s.taxonomy.phylum;
      if (!p) return;
      const current = map.get(p) || { count: 0, kingdom: s.taxonomy.kingdom };
      current.count += 1;
      map.set(p, current);
    });
    return map;
  }, [speciesList]);

  const availablePhyla = useMemo(() => {
    const filtered = hierKingdom ? speciesList.filter((s) => s.taxonomy.kingdom === hierKingdom) : speciesList;
    const map = new Map<string, number>();
    filtered.forEach((s) => {
      const p = s.taxonomy.phylum;
      if (p) map.set(p, (map.get(p) || 0) + 1);
    });
    return Array.from(map.entries());
  }, [speciesList, hierKingdom]);

  // Phyla outside the currently selected kingdom to allow direct selection
  const otherPhyla = useMemo(() => {
    if (!hierKingdom) return [];
    const list: Array<[string, { count: number; kingdom: string }]> = [];
    allPhylaMap.forEach((info, p) => {
      if (info.kingdom !== hierKingdom) {
        list.push([p, info]);
      }
    });
    return list;
  }, [allPhylaMap, hierKingdom]);

  const availableClasses = useMemo(() => {
    let filtered = speciesList;
    if (hierKingdom) filtered = filtered.filter((s) => s.taxonomy.kingdom === hierKingdom);
    if (hierPhylum) filtered = filtered.filter((s) => s.taxonomy.phylum === hierPhylum);
    const map = new Map<string, number>();
    filtered.forEach((s) => {
      const c = s.taxonomy.class;
      map.set(c, (map.get(c) || 0) + 1);
    });
    return Array.from(map.entries());
  }, [speciesList, hierKingdom, hierPhylum]);

  const availableOrders = useMemo(() => {
    let filtered = speciesList;
    if (hierKingdom) filtered = filtered.filter((s) => s.taxonomy.kingdom === hierKingdom);
    if (hierPhylum) filtered = filtered.filter((s) => s.taxonomy.phylum === hierPhylum);
    if (hierClass) filtered = filtered.filter((s) => s.taxonomy.class === hierClass);
    const map = new Map<string, number>();
    filtered.forEach((s) => {
      const o = s.taxonomy.order;
      map.set(o, (map.get(o) || 0) + 1);
    });
    return Array.from(map.entries());
  }, [speciesList, hierKingdom, hierPhylum, hierClass]);

  const availableFamilies = useMemo(() => {
    let filtered = speciesList;
    if (hierKingdom) filtered = filtered.filter((s) => s.taxonomy.kingdom === hierKingdom);
    if (hierPhylum) filtered = filtered.filter((s) => s.taxonomy.phylum === hierPhylum);
    if (hierClass) filtered = filtered.filter((s) => s.taxonomy.class === hierClass);
    if (hierOrder) filtered = filtered.filter((s) => s.taxonomy.order === hierOrder);
    const map = new Map<string, number>();
    filtered.forEach((s) => {
      const f = s.taxonomy.family;
      map.set(f, (map.get(f) || 0) + 1);
    });
    return Array.from(map.entries());
  }, [speciesList, hierKingdom, hierPhylum, hierClass, hierOrder]);

  const availableGenera = useMemo(() => {
    let filtered = speciesList;
    if (hierKingdom) filtered = filtered.filter((s) => s.taxonomy.kingdom === hierKingdom);
    if (hierPhylum) filtered = filtered.filter((s) => s.taxonomy.phylum === hierPhylum);
    if (hierClass) filtered = filtered.filter((s) => s.taxonomy.class === hierClass);
    if (hierOrder) filtered = filtered.filter((s) => s.taxonomy.order === hierOrder);
    if (hierFamily) filtered = filtered.filter((s) => s.taxonomy.family === hierFamily);
    const map = new Map<string, number>();
    filtered.forEach((s) => {
      const g = s.taxonomy.genus;
      map.set(g, (map.get(g) || 0) + 1);
    });
    return Array.from(map.entries());
  }, [speciesList, hierKingdom, hierPhylum, hierClass, hierOrder, hierFamily]);

  // Main Filter Logic
  const filteredList = useMemo(() => {
    return speciesList.filter((s) => {
      // Cascading taxonomy matches
      if (hierKingdom && s.taxonomy.kingdom !== hierKingdom) return false;
      if (hierPhylum && s.taxonomy.phylum !== hierPhylum) return false;
      if (hierClass && s.taxonomy.class !== hierClass) return false;
      if (hierOrder && s.taxonomy.order !== hierOrder) return false;
      if (hierFamily && s.taxonomy.family !== hierFamily) return false;
      if (hierGenus && s.taxonomy.genus !== hierGenus) return false;

      // Domain filter
      if (selectedDomain !== 'all' && s.domain !== selectedDomain) return false;

      // Conservation filter
      if (selectedConservation !== 'all') {
        if (!s.conservation.includes(selectedConservation)) return false;
      }

      // Region filter
      if (selectedRegion !== 'all') {
        const hasRegion = s.distribution.some((d) => d.includes(selectedRegion));
        if (!hasRegion) return false;
      }

      // Tag filter
      if (selectedTag !== 'all') {
        if (!s.tags.includes(selectedTag)) return false;
      }

      // Text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = s.chineseName.toLowerCase().includes(q);
        const matchSci = s.scientificName.toLowerCase().includes(q);
        const matchCommon = s.commonNames?.some((c) => c.toLowerCase().includes(q));
        const matchTaxa = Object.values(s.taxonomy).some((v) => typeof v === 'string' && v.toLowerCase().includes(q));
        const matchMorph = s.morphology.toLowerCase().includes(q);
        const matchEvo = s.evolutionaryMilestone.toLowerCase().includes(q);
        if (!matchName && !matchSci && !matchCommon && !matchTaxa && !matchMorph && !matchEvo) {
          return false;
        }
      }

      return true;
    });
  }, [
    speciesList,
    hierKingdom,
    hierPhylum,
    hierClass,
    hierOrder,
    hierFamily,
    hierGenus,
    selectedDomain,
    selectedConservation,
    selectedRegion,
    selectedTag,
    searchQuery
  ]);

  const resetAllFilters = () => {
    setHierKingdom('');
    setHierPhylum('');
    setHierClass('');
    setHierOrder('');
    setHierFamily('');
    setHierGenus('');
    setSelectedDomain('all');
    setSelectedConservation('all');
    setSelectedRegion('all');
    setSelectedTag('all');
    setSearchQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* 1. 7-Level Cascading Linnaean Hierarchy Ladder (界门纲目科属种级联定位器) */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 sm:p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-400" />
            <h2 className="text-sm sm:text-base font-bold text-white">
              生物分类学「界·门·纲·目·科·属·种」七级阶元快速定位器
            </h2>
          </div>
          {(hierKingdom || hierPhylum || hierClass || hierOrder || hierFamily || hierGenus) && (
            <button
              onClick={() => {
                setHierKingdom('');
                setHierPhylum('');
                setHierClass('');
                setHierOrder('');
                setHierFamily('');
                setHierGenus('');
              }}
              className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 font-medium cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>清空阶元筛选</span>
            </button>
          )}
        </div>

        {/* 7-Level Dropdown Cascading Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {/* 1. 界 (Kingdom) */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-emerald-400 flex items-center justify-between">
              <span>① 界 (Kingdom)</span>
              {hierKingdom && <span className="text-[10px] text-slate-400">已选</span>}
            </label>
            <select
              value={hierKingdom}
              onChange={(e) => {
                setHierKingdom(e.target.value);
                setHierPhylum('');
                setHierClass('');
                setHierOrder('');
                setHierFamily('');
                setHierGenus('');
              }}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="">全部界...</option>
              {availableKingdoms.map(([k, count]) => (
                <option key={k} value={k}>
                  {k.split(' ')[0]} ({count})
                </option>
              ))}
            </select>
          </div>

          {/* 2. 门 (Phylum) */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-teal-400 flex items-center justify-between">
              <span>② 门 (Phylum)</span>
              {hierPhylum && <span className="text-[10px] text-slate-400">已选</span>}
            </label>
            <select
              value={hierPhylum}
              onChange={(e) => {
                const newPhylum = e.target.value;
                setHierPhylum(newPhylum);
                if (newPhylum) {
                  const info = allPhylaMap.get(newPhylum);
                  if (info?.kingdom && hierKingdom !== info.kingdom) {
                    setHierKingdom(info.kingdom);
                  }
                  // Auto-resolve domain conflicts when selecting a phylum
                  if (newPhylum.includes('软体动物') || newPhylum.includes('Mollusca') || info?.kingdom?.includes('动物')) {
                    if (selectedDomain === 'flora' || selectedDomain === 'fungi') {
                      setSelectedDomain('all');
                    }
                  }
                }
                setHierClass('');
                setHierOrder('');
                setHierFamily('');
                setHierGenus('');
              }}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="">全部门...</option>
              {hierKingdom ? (
                <>
                  <optgroup label={`当前界 [${hierKingdom.split(' ')[0]}] 的门类`}>
                    {availablePhyla.map(([p, count]) => (
                      <option key={p} value={p}>
                        {p.split(' ')[0]} ({count})
                      </option>
                    ))}
                  </optgroup>
                  {otherPhyla.length > 0 && (
                    <optgroup label="其他界的门类 (选择将自动切换所属界)">
                      {otherPhyla.map(([p, info]) => (
                        <option key={p} value={p}>
                          {p.split(' ')[0]} ({info.count}) · 属{info.kingdom.split(' ')[0]}
                        </option>
                      ))}
                    </optgroup>
                  )}
                </>
              ) : (
                availablePhyla.map(([p, count]) => {
                  const info = allPhylaMap.get(p);
                  return (
                    <option key={p} value={p}>
                      {p.split(' ')[0]} ({count}) {info?.kingdom ? `· ${info.kingdom.split(' ')[0]}` : ''}
                    </option>
                  );
                })
              )}
            </select>
          </div>

          {/* 3. 纲 (Class) */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-cyan-400">③ 纲 (Class)</label>
            <select
              value={hierClass}
              onChange={(e) => {
                setHierClass(e.target.value);
                setHierOrder('');
                setHierFamily('');
                setHierGenus('');
              }}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="">全部纲...</option>
              {availableClasses.map(([c, count]) => (
                <option key={c} value={c}>
                  {c.split(' ')[0]} ({count})
                </option>
              ))}
            </select>
          </div>

          {/* 4. 目 (Order) */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-blue-400">④ 目 (Order)</label>
            <select
              value={hierOrder}
              onChange={(e) => {
                setHierOrder(e.target.value);
                setHierFamily('');
                setHierGenus('');
              }}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="">全部目...</option>
              {availableOrders.map(([o, count]) => (
                <option key={o} value={o}>
                  {o.split(' ')[0]} ({count})
                </option>
              ))}
            </select>
          </div>

          {/* 5. 科 (Family) */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-indigo-400">⑤ 科 (Family)</label>
            <select
              value={hierFamily}
              onChange={(e) => {
                setHierFamily(e.target.value);
                setHierGenus('');
              }}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="">全部科...</option>
              {availableFamilies.map(([f, count]) => (
                <option key={f} value={f}>
                  {f.split(' ')[0]} ({count})
                </option>
              ))}
            </select>
          </div>

          {/* 6. 属 (Genus) */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-purple-400">⑥ 属 (Genus)</label>
            <select
              value={hierGenus}
              onChange={(e) => setHierGenus(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="">全部属...</option>
              {availableGenera.map(([g, count]) => (
                <option key={g} value={g}>
                  {g.split(' ')[0]} ({count})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Current Active Breadcrumb path */}
        <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-400">当前分类路径:</span>
          <span className="font-semibold text-emerald-300">生命之树</span>
          {hierKingdom && (
            <>
              <ChevronRight className="w-3 h-3 text-slate-600" />
              <span className="bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
                {hierKingdom}
              </span>
            </>
          )}
          {hierPhylum && (
            <>
              <ChevronRight className="w-3 h-3 text-slate-600" />
              <span className="bg-teal-950/80 text-teal-300 px-2 py-0.5 rounded border border-teal-800">{hierPhylum}</span>
            </>
          )}
          {hierClass && (
            <>
              <ChevronRight className="w-3 h-3 text-slate-600" />
              <span className="bg-cyan-950/80 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800">{hierClass}</span>
            </>
          )}
          {hierOrder && (
            <>
              <ChevronRight className="w-3 h-3 text-slate-600" />
              <span className="bg-blue-950/80 text-blue-300 px-2 py-0.5 rounded border border-blue-800">{hierOrder}</span>
            </>
          )}
          {hierFamily && (
            <>
              <ChevronRight className="w-3 h-3 text-slate-600" />
              <span className="bg-indigo-950/80 text-indigo-300 px-2 py-0.5 rounded border border-indigo-800">{hierFamily}</span>
            </>
          )}
          {hierGenus && (
            <>
              <ChevronRight className="w-3 h-3 text-slate-600" />
              <span className="bg-purple-950/80 text-purple-300 px-2 py-0.5 rounded border border-purple-800">{hierGenus}</span>
            </>
          )}
          <span className="ml-auto text-slate-400 font-mono text-[11px]">
            匹配物种: <strong className="text-white">{filteredList.length}</strong> 种
          </span>
        </div>
      </div>

      {/* 2. Comprehensive Search & Filter Controls Bar */}
      <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="搜索中文名、拉丁学名、别名、科属、形态特征、演化历史..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
          />
        </div>

        {/* Dropdown Filters & View Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Domain */}
          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">门类 (全部)</option>
            <option value="flora">🌿 植物界 (Plantae)</option>
            <option value="fauna">🐾 动物界 (Animalia)</option>
            <option value="fungi">🍄 真菌界 (Fungi)</option>
          </select>

          {/* Conservation */}
          <select
            value={selectedConservation}
            onChange={(e) => setSelectedConservation(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">保护级别 (全部)</option>
            <option value="国家一级">国家一级重点保护</option>
            <option value="国家二级">国家二级重点保护</option>
            <option value="极危">IUCN 极危 (CR)</option>
            <option value="濒危">IUCN 濒危 (EN)</option>
            <option value="易危">IUCN 易危 (VU)</option>
            <option value="无危">IUCN 无危 (LC)</option>
          </select>

          {/* Region */}
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">分布省区 (全部)</option>
            {allRegions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>

          {/* Tag */}
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">特色标签 (全部)</option>
            {allTags.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          {/* View Mode Toggle */}
          <div className="flex border border-slate-700 rounded-lg overflow-hidden bg-slate-950">
            <button
              onClick={() => setViewLayout('grid')}
              className={`p-1.5 cursor-pointer ${
                viewLayout === 'grid' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="卡片网格视图"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewLayout('table')}
              className={`p-1.5 cursor-pointer ${
                viewLayout === 'table' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="林奈分类学表格视图"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Results Grid / Table View */}
      {filteredList.length === 0 ? (
        <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-12 text-center space-y-3">
          <BookOpen className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-semibold text-slate-300">未找到符合条件的物种</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            请尝试调整七级阶元筛选条件，或使用上方搜索框直接检索物种正名与学名。
          </p>
          <button
            onClick={resetAllFilters}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition cursor-pointer"
          >
            重置所有筛选条件
          </button>
        </div>
      ) : viewLayout === 'grid' ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredList.map((sp) => {
            const isProtected =
              sp.conservation.includes('一级') ||
              sp.conservation.includes('二级') ||
              sp.conservation.includes('CR') ||
              sp.conservation.includes('EN');

            return (
              <div
                key={sp.id}
                className="bg-slate-900 rounded-2xl border border-slate-800 hover:border-slate-700 overflow-hidden shadow-lg hover:shadow-2xl transition duration-200 flex flex-col group"
              >
                {/* Photo & Top Badges */}
                <div className="relative h-44 w-full bg-slate-950 overflow-hidden">
                  <SpeciesImage
                    src={sp.imageUrl}
                    alt={sp.chineseName}
                    scientificName={sp.scientificName}
                    domain={sp.domain}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40"></div>

                  {/* Domain & Conservation Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-semibold rounded-md backdrop-blur-md border ${
                        sp.domain === 'flora'
                          ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700'
                          : sp.domain === 'fungi'
                          ? 'bg-amber-950/80 text-amber-300 border-amber-700'
                          : 'bg-blue-950/80 text-blue-300 border-blue-700'
                      }`}
                    >
                      {sp.domain === 'flora' ? '植物界' : sp.domain === 'fungi' ? '真菌界' : '动物界'}
                    </span>
                    {isProtected && (
                      <span className="px-2 py-0.5 text-[10px] font-semibold rounded-md bg-rose-950/90 text-rose-300 border border-rose-700 backdrop-blur-md flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        {sp.conservation.split(' ')[0]}
                      </span>
                    )}
                  </div>

                  {/* Scientific Name overlay */}
                  <div className="absolute bottom-2.5 left-3 right-3">
                    <div className="text-lg font-bold text-white flex items-center justify-between">
                      <span>{sp.chineseName}</span>
                      <span className="text-xs font-mono text-slate-400 font-normal">
                        {sp.geologicalPeriod.split(' ')[0]}
                      </span>
                    </div>
                    <div className="text-xs text-emerald-300 italic font-serif truncate">
                      {sp.scientificName} <span className="text-[10px] text-slate-400 not-italic">{sp.namingAuthor}</span>
                    </div>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  {/* Linnaean Ladder Pills */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                      <span className="text-slate-500">分类:</span>
                      <span className="text-slate-300">{sp.taxonomy.phylum.split(' ')[0]}</span>
                      <span>›</span>
                      <span className="text-slate-300">{sp.taxonomy.class.split(' ')[0]}</span>
                      <span>›</span>
                      <span className="text-slate-300">{sp.taxonomy.order.split(' ')[0]}</span>
                      <span>›</span>
                      <span className="text-emerald-400 font-medium">{sp.taxonomy.family.split(' ')[0]}</span>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{sp.morphology}</p>
                  </div>

                  {/* Evolutionary Milestone Pill */}
                  <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800 text-[11px] text-slate-400 leading-snug">
                    <span className="text-amber-400 font-medium">⚡ 演化定位: </span>
                    <span className="text-slate-300 line-clamp-1">{sp.evolutionaryMilestone}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {sp.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-[10px] border border-slate-700/60"
                      >
                        #{tag}
                      </span>
                    ))}
                    {sp.tags.length > 3 && (
                      <span className="text-[10px] text-slate-500 self-center">+{sp.tags.length - 3}</span>
                    )}
                  </div>

                  {/* Card Actions Footer */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <button
                      onClick={() => onSelectSpecies(sp)}
                      className="text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 cursor-pointer"
                    >
                      <span>分类学档案</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onLocateInTree(sp)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
                        title="在系统发生树中定位"
                      >
                        <Dna className="w-3.5 h-3.5 text-blue-400" />
                      </button>
                      <button
                        onClick={() => onEditSpecies(sp)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
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
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/50 text-slate-400 hover:text-rose-300 cursor-pointer"
                        title="删除"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">中文正名</th>
                  <th className="py-3 px-4">拉丁学名 (含命名人)</th>
                  <th className="py-3 px-4">界</th>
                  <th className="py-3 px-4">门</th>
                  <th className="py-3 px-4">纲</th>
                  <th className="py-3 px-4">目</th>
                  <th className="py-3 px-4">科</th>
                  <th className="py-3 px-4">属</th>
                  <th className="py-3 px-4">保护等级</th>
                  <th className="py-3 px-4 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredList.map((sp) => (
                  <tr key={sp.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          sp.domain === 'flora'
                            ? 'bg-emerald-400'
                            : sp.domain === 'fungi'
                            ? 'bg-amber-400'
                            : 'bg-blue-400'
                        }`}
                      ></span>
                      {sp.chineseName}
                    </td>
                    <td className="py-3 px-4 font-serif italic text-emerald-300">
                      {sp.scientificName}{' '}
                      <span className="not-italic text-[10px] text-slate-400">{sp.namingAuthor}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-400">{sp.taxonomy.kingdom.split(' ')[0]}</td>
                    <td className="py-3 px-4 text-slate-400">{sp.taxonomy.phylum.split(' ')[0]}</td>
                    <td className="py-3 px-4 text-slate-400">{sp.taxonomy.class.split(' ')[0]}</td>
                    <td className="py-3 px-4 text-slate-400">{sp.taxonomy.order.split(' ')[0]}</td>
                    <td className="py-3 px-4 text-slate-300 font-medium">{sp.taxonomy.family.split(' ')[0]}</td>
                    <td className="py-3 px-4 text-slate-300">{sp.taxonomy.genus.split(' ')[0]}</td>
                    <td className="py-3 px-4">
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
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onSelectSpecies(sp)}
                          className="px-2 py-1 bg-emerald-900/50 hover:bg-emerald-800 text-emerald-300 rounded font-medium cursor-pointer"
                        >
                          详情
                        </button>
                        <button
                          onClick={() => onEditSpecies(sp)}
                          className="p-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded cursor-pointer"
                          title="编辑"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
