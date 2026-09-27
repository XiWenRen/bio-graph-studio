import React, { useState } from 'react';
import { 
  Radio, 
  DownloadCloud, 
  Database, 
  CheckCircle2, 
  Clock, 
  Terminal, 
  RefreshCw, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  AlertCircle, 
  ExternalLink,
  PlusCircle,
  FileCode,
  ArrowRight,
  GitMerge,
  Zap,
  HelpCircle,
  Info,
  Sliders,
  ChevronDown,
  ChevronUp,
  Filter
} from 'lucide-react';
import { MergeStrategy, SpeciesData } from '../types';

interface DataCollectorWorkbenchProps {
  onImportBatch: (species: SpeciesData[], mergeMode?: MergeStrategy) => void;
  existingCount: number;
  existingNames?: string[];
}

export const DataCollectorWorkbench: React.FC<DataCollectorWorkbenchProps> = ({
  onImportBatch,
  existingCount,
  existingNames = []
}) => {
  const [selectedSource, setSelectedSource] = useState('col_china');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [keyword, setKeyword] = useState('');
  const [limitCount, setLimitCount] = useState<number | 'all'>(10);
  const [mergeStrategy, setMergeStrategy] = useState<MergeStrategy>('smart_merge');
  const [autoImport, setAutoImport] = useState(true);
  const [isHarvesting, setIsHarvesting] = useState(false);
  const [isFullHarvesting, setIsFullHarvesting] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [harvestedResults, setHarvestedResults] = useState<SpeciesData[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [importSuccessMessage, setImportSuccessMessage] = useState<string | null>(null);
  const [showMergeDetails, setShowMergeDetails] = useState(false);

  // 7-Level Taxonomy State
  const [taxonomyFilter, setTaxonomyFilter] = useState({
    kingdom: '',
    phylum: '',
    class: '',
    order: '',
    family: '',
    genus: '',
    species: ''
  });
  const [showAdvancedTaxonomy, setShowAdvancedTaxonomy] = useState(true);

  const QUICK_TOPICS = [
    {
      label: '🦞 节肢动物门 (昆虫/蛛形/甲壳/肢口纲活化石)',
      domain: 'fauna',
      phylum: '节肢动物门 (Arthropoda)',
      class: '',
      order: '',
      key: '节肢动物门'
    },
    {
      label: '🐌 软体动物门 (双壳纲/腹足纲/头足纲)',
      domain: 'fauna',
      phylum: '软体动物门 (Mollusca)',
      class: '',
      order: '',
      key: '软体动物门'
    },
    {
      label: '🪲 鞘翅目 (阳彩臂金龟/拉步甲/金龟子)',
      domain: 'fauna',
      phylum: '节肢动物门 (Arthropoda)',
      class: '昆虫纲 (Insecta)',
      order: '鞘翅目 (Coleoptera)',
      key: '鞘翅目'
    },
    {
      label: '🦋 鳞翅目 (金斑喙凤蝶/中国国蝶)',
      domain: 'fauna',
      phylum: '节肢动物门 (Arthropoda)',
      class: '昆虫纲 (Insecta)',
      order: '鳞翅目 (Lepidoptera)',
      key: '凤蝶科'
    },
    {
      label: '🩵 肢口纲剑尾目 (中国鲎/远古蓝血活化石)',
      domain: 'fauna',
      phylum: '节肢动物门 (Arthropoda)',
      class: '肢口纲 (Merostomata)',
      order: '剑尾目 (Xiphosura)',
      key: '中国鲎'
    },
    { label: '🇨🇳 国家一级重点保护野生动物', domain: 'fauna', phylum: '', class: '', order: '', key: '国家一级重点保护' },
    { label: '🐒 灵长目 (金丝猴/长臂猿/叶猴)', domain: 'fauna', phylum: '脊索动物门 (Chordata)', class: '哺乳纲 (Mammalia)', order: '灵长目 (Primates)', key: '灵长目' },
    { label: '🐯 食肉目 (虎/豹/雪豹/兔狲/藏狐)', domain: 'fauna', phylum: '脊索动物门 (Chordata)', class: '哺乳纲 (Mammalia)', order: '食肉目 (Carnivora)', key: '食肉目' },
    { label: '🦜 鸟纲 (鹤形目/鸡形目/雁形目)', domain: 'fauna', phylum: '脊索动物门 (Chordata)', class: '鸟纲 (Aves)', order: '', key: '鸟纲' },
    { label: '🌲 裸子植物与活化石 (银杉/水杉/银杏)', domain: 'flora', phylum: '维管植物门 (Tracheophyta)', class: '松柏纲 (Pinopsida)', order: '', key: '裸子植物活化石' },
    { label: '🌸 珍稀兰科与被子植物', domain: 'flora', phylum: '维管植物门 (Tracheophyta)', class: '木兰纲 (Magnoliopsida)', order: '', key: '兰科珍稀被子植物' },
    { label: '🍄 大型药用与大型真菌', domain: 'fungi', phylum: '担子菌门 (Basidiomycota)', class: '伞菌纲 (Agaricomycetes)', order: '', key: '大型真菌' },
    { label: '🌊 长江与青藏高原特有物种', domain: 'all', phylum: '', class: '', order: '', key: '青藏高原与长江特有' },
  ];

  const sourceNameMap: Record<string, string> = {
    col_china: '《中国生物物种名录》(CoL China)',
    gbif: '全球生物多样性信息网络 (GBIF API)',
    flora_china: '中国植物志 / 植物智 (iPlant)',
    national_protected: '国家重点保护野生动植物名录 (2024)'
  };

  const domainNameMap: Record<string, string> = {
    all: '全部类群 (动物界 + 植物界 + 真菌界)',
    flora: '植物界 (Plantae)',
    fauna: '动物界 (Animalia)',
    fungi: '真菌界 (Fungi)'
  };

  const strategyDescriptions: Record<MergeStrategy, { title: string; desc: string; icon: string }> = {
    smart_merge: {
      title: '🌿 智能增量融合 (推荐)',
      desc: '以拉丁学名/正名为唯一主键，保留已有高清图片与自定义标签，自动补全七级阶元、生态习性与文献引用，避免重复卡片。',
      icon: 'GitMerge'
    },
    overwrite: {
      title: '🔄 权威覆盖',
      desc: '用最新采集的权威数据完全覆写已有同名物种的所有属性。',
      icon: 'RefreshCw'
    },
    skip: {
      title: '🛡️ 跳过重复项',
      desc: '若本地已收录同名物种，则完全忽略并跳过，仅将全新发现的物种入库。',
      icon: 'ShieldCheck'
    },
    keep_both: {
      title: '📑 副本并存对比',
      desc: '保留原物种，同时为采集数据创建标注为“采集副本”的独立新记录以供科研对比。',
      icon: 'Layers'
    }
  };

  // General Harvest function
  const handleStartHarvest = async (isAllMode: boolean = false) => {
    if (isAllMode) {
      setIsFullHarvesting(true);
    } else {
      setIsHarvesting(true);
    }
    setLogs([]);
    setHarvestedResults([]);
    setSelectedItems(new Set());
    setImportSuccessMessage(null);

    const addLog = (msg: string) => {
      setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
    };

    // Determine target domain based on selection or active taxonomy
    let targetDomain = selectedDomain;
    if (taxonomyFilter.phylum) {
      if (taxonomyFilter.phylum.includes('节肢') || taxonomyFilter.phylum.includes('软体') || taxonomyFilter.phylum.includes('脊索')) {
        targetDomain = 'fauna';
      } else if (taxonomyFilter.phylum.includes('植物') || taxonomyFilter.phylum.includes('维管') || taxonomyFilter.phylum.includes('银杏')) {
        targetDomain = 'flora';
      } else if (taxonomyFilter.phylum.includes('真菌') || taxonomyFilter.phylum.includes('担子') || taxonomyFilter.phylum.includes('子囊')) {
        targetDomain = 'fungi';
      }
    }
    if (isAllMode && !taxonomyFilter.phylum && !keyword.trim()) {
      targetDomain = 'all';
    }

    const targetLimit = isAllMode ? 'all' : limitCount;
    const targetKeyword = keyword.trim();

    addLog(`🚀 初始化数据源连接: ${sourceNameMap[selectedSource] || selectedSource} ...`);
    if (isAllMode) {
      addLog(`⚡ 开启【全谱系全量采集模式】: 跨目标阶元进行名录深潜同步 (请求数量: 全部/上限50条)`);
    } else {
      addLog(`配置采集过滤器: 目标类群 = ${domainNameMap[targetDomain] || targetDomain}, 采集量 = ${targetLimit === 'all' ? '全部' : `${targetLimit} 种`}, 关键词 = ${targetKeyword || '多样性代表性物种'}`);
    }

    // Explicit 7-level taxonomy constraints
    const hasTaxonomyConstraint = Boolean(
      taxonomyFilter.kingdom ||
      taxonomyFilter.phylum ||
      taxonomyFilter.class ||
      taxonomyFilter.order ||
      taxonomyFilter.family ||
      taxonomyFilter.genus ||
      taxonomyFilter.species
    );

    if (hasTaxonomyConstraint) {
      const parts = [
        taxonomyFilter.kingdom ? `界: ${taxonomyFilter.kingdom}` : '',
        taxonomyFilter.phylum ? `门: ${taxonomyFilter.phylum}` : '',
        taxonomyFilter.class ? `纲: ${taxonomyFilter.class}` : '',
        taxonomyFilter.order ? `目: ${taxonomyFilter.order}` : '',
        taxonomyFilter.family ? `科: ${taxonomyFilter.family}` : '',
        taxonomyFilter.genus ? `属: ${taxonomyFilter.genus}` : ''
      ].filter(Boolean);
      addLog(`🎯 锁定 7 阶分类学定向: 【${parts.join(' › ')}】`);
    }
    
    addLog(`⚙️ 当前重复合并策略: ${strategyDescriptions[mergeStrategy].title}`);
    if (existingNames.length > 0 && mergeStrategy === 'skip') {
      addLog(`🛡️ 启用去重过滤: 自动比对排重本地已收录的 ${existingNames.length} 个物种`);
    }

    try {
      addLog(`向后端数据网关发送 Darwin Core 标准采集请求 (/api/collector/harvest) ...`);

      const response = await fetch('/api/collector/harvest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: sourceNameMap[selectedSource] || selectedSource,
          domain: targetDomain,
          category: targetDomain,
          limit: targetLimit,
          keyword: targetKeyword,
          query: targetKeyword,
          existingNames: existingNames,
          targetTaxonomy: {
            kingdom: taxonomyFilter.kingdom || (targetDomain === 'fauna' ? '动物界 (Animalia)' : targetDomain === 'flora' ? '植物界 (Plantae)' : targetDomain === 'fungi' ? '真菌界 (Fungi)' : ''),
            phylum: taxonomyFilter.phylum,
            class: taxonomyFilter.class,
            order: taxonomyFilter.order,
            family: taxonomyFilter.family,
            genus: taxonomyFilter.genus,
            species: taxonomyFilter.species
          }
        })
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || '采集接口返回异常');
      }

      const harvestedList: SpeciesData[] = data.harvestedSpecies || data.data || [];
      const totalCount = data.totalHarvested ?? harvestedList.length;

      addLog(`✅ 数据流接收完成: 成功抓取到 ${totalCount} 条规范化生物分类学记录`);
      addLog(`执行 Darwin Core 标准分类学阶元映射 (界 Kingdom -> 门 Phylum -> 纲 Class -> 目 Order -> 科 Family -> 属 Genus -> 种 Species)`);
      
      // Calculate duplicate stats
      let dupCount = 0;
      let newCount = 0;
      harvestedList.forEach((sp) => {
        const isDup = existingNames.some(
          (n) => n.trim() === sp.chineseName.trim() || n.trim().toLowerCase() === sp.scientificName.trim().toLowerCase()
        );
        if (isDup) {
          dupCount++;
          addLog(`  ↳ [阶元解析 / 🔄 重复待合并] ${sp.chineseName} (${sp.scientificName}) › ${sp.taxonomy.class?.split(' ')[0] || ''} › ${sp.taxonomy.order?.split(' ')[0] || ''}`);
        } else {
          newCount++;
          addLog(`  ↳ [阶元解析 / ✨ 全新物种] ${sp.chineseName} (${sp.scientificName}) › ${sp.taxonomy.class?.split(' ')[0] || ''} › ${sp.taxonomy.order?.split(' ')[0] || ''}`);
        }
      });

      addLog(`📊 智能比对结果: 本批次全新物种 ${newCount} 种，与本地库重复物种 ${dupCount} 种 (采用 ${strategyDescriptions[mergeStrategy].title} 处理)`);

      setHarvestedResults(harvestedList);
      const ids = new Set<string>(harvestedList.map((s: SpeciesData) => s.id));
      setSelectedItems(ids);

      // Auto-import directly to database if enabled
      if (autoImport && harvestedList.length > 0) {
        onImportBatch(harvestedList, mergeStrategy);
        addLog(`💾 [自动入库完成] 已将 ${harvestedList.length} 条记录按【${strategyDescriptions[mergeStrategy].title}】写入本地知识图谱库！`);
        setImportSuccessMessage(`🎉 采集与入库成功！共 ${harvestedList.length} 种物种（新增 ${newCount} 种，合并 ${dupCount} 种），知识图谱分类树已实时更新。`);
      } else {
        addLog(`📋 数据已载入待入库缓冲区，请在下方核验物种详情后点击【确认合并入库】。`);
      }
    } catch (err: any) {
      addLog(`❌ 采集失败: ${err.message}`);
    } finally {
      setIsHarvesting(false);
      setIsFullHarvesting(false);
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSelectAll = () => {
    if (selectedItems.size === harvestedResults.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(harvestedResults.map((s) => s.id)));
    }
  };

  const handleImportSelected = () => {
    const toImport = harvestedResults.filter((s) => selectedItems.has(s.id));
    if (toImport.length === 0) {
      alert('请先勾选需要导入的物种');
      return;
    }

    onImportBatch(toImport, mergeStrategy);
    setImportSuccessMessage(`成功将选中的 ${toImport.length} 种权威物种按【${strategyDescriptions[mergeStrategy].title}】同步合并至本地知识图谱库！`);
  };

  // Check if a species is already in local database
  const checkIsDuplicate = (sp: SpeciesData) => {
    return existingNames.some(
      (n) => n.trim() === sp.chineseName.trim() || n.trim().toLowerCase() === sp.scientificName.trim().toLowerCase()
    );
  };

  const totalHarvestedCount = harvestedResults.length;
  const duplicateHarvestedCount = harvestedResults.filter(checkIsDuplicate).length;
  const newHarvestedCount = totalHarvestedCount - duplicateHarvestedCount;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 text-slate-100">
      {/* Top Banner & Quick Full Sync */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                权威科研数据库集成
              </span>
              <span className="text-xs text-slate-400">支持 API 全量采集、实时排重与智能增量合并</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              中国生物物种名录与权威科研数据采集工作台
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
              整合《中国生物物种名录》(Catalogue of Life China)、全球生物多样性信息网络 (GBIF)、中国植物志及国家重点保护名录，提供**一键全量采集**与**多重数据合并去重策略**。
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick One-Click Harvest All Button */}
            <button
              id="btn-harvest-all"
              onClick={() => handleStartHarvest(true)}
              disabled={isHarvesting || isFullHarvesting}
              className="px-5 py-3 bg-gradient-to-r from-amber-600 via-emerald-600 to-cyan-600 hover:from-amber-500 hover:to-cyan-500 disabled:opacity-50 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-emerald-950/40 transition cursor-pointer border border-emerald-400/30"
            >
              {isFullHarvesting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>全量深潜采集进行中...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                  <div className="text-left">
                    <div className="font-extrabold text-sm">
                      {taxonomyFilter.phylum
                        ? `一键采集所有【${taxonomyFilter.phylum.split(' ')[0]}】数据`
                        : '一键全量采集所有数据'}
                    </div>
                    <div className="text-[10px] text-emerald-200 font-normal">
                      {taxonomyFilter.phylum
                        ? `抓取${taxonomyFilter.phylum.split(' ')[0]}名录并按【${strategyDescriptions[mergeStrategy].title.split(' ')[1]}】同步`
                        : '全谱系同步动物+植物+真菌名录'}
                    </div>
                  </div>
                </>
              )}
            </button>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 shrink-0 text-center space-y-0.5">
              <div className="text-[11px] text-slate-400">本地已存物种</div>
              <div className="text-2xl font-black text-emerald-400 font-mono">{existingCount}</div>
              <div className="text-[10px] text-slate-500">已就绪节点</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Harvester Config, Merge Policy & Live Console */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Config Form */}
        <div className="lg:col-span-1 bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>采集与合并策略配置</span>
            </div>
          </div>

          {/* Source Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">① 选择权威数据源</label>
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="col_china">🇨🇳 《中国生物物种名录》CoL China (中科院)</option>
              <option value="gbif">🌐 GBIF 全球生物多样性信息网络 API</option>
              <option value="flora_china">🌿 中国植物志 / 植物智 (iPlant 数据库)</option>
              <option value="national_protected">🛡️ 国家重点保护野生动植物名录 (2024版)</option>
            </select>
          </div>

          {/* Domain & 7-Level Taxonomy Selection */}
          <div className="space-y-3 p-3.5 bg-slate-950/90 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-cyan-400" />
                ② 目标类群与 Darwin Core 7阶定向采集
              </label>
              <button
                type="button"
                onClick={() => setShowAdvancedTaxonomy(!showAdvancedTaxonomy)}
                className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
              >
                <span>{showAdvancedTaxonomy ? '收起阶元' : '展开 7 阶'}</span>
                {showAdvancedTaxonomy ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* 1. Kingdom (界) */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400">1. 界 (Kingdom)</span>
                {taxonomyFilter.phylum && (
                  <span className="text-[10px] text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/40">
                    已选: {taxonomyFilter.phylum.split(' ')[0]}
                  </span>
                )}
              </div>
              <select
                value={selectedDomain}
                onChange={(e) => {
                  const val = e.target.value;
                  setSelectedDomain(val);
                  setTaxonomyFilter(prev => ({
                    ...prev,
                    kingdom: val === 'fauna' ? '动物界 (Animalia)' : val === 'flora' ? '植物界 (Plantae)' : val === 'fungi' ? '真菌界 (Fungi)' : '',
                    phylum: '',
                    class: '',
                    order: '',
                    family: '',
                    genus: '',
                    species: ''
                  }));
                }}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="all">🌟 全部界别 (动物界 + 植物界 + 真菌界)</option>
                <option value="fauna">🐾 动物界 (Animalia) - 涵盖节肢/软体/脊索动物等</option>
                <option value="flora">🌿 植物界 (Plantae) - 被子/裸子/蕨类植物</option>
                <option value="fungi">🍄 真菌界 (Fungi) - 担子菌/大型药食用菌</option>
              </select>
            </div>

            {/* Advanced 7-level controls (Phylum, Class, Order, Family, Genus, Species) */}
            {showAdvancedTaxonomy && (
              <div className="pt-2 border-t border-slate-800/80 space-y-2.5">
                {/* 2. Phylum (门) */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-semibold text-cyan-300">2. 门 (Phylum)</label>
                    {taxonomyFilter.phylum && (
                      <button
                        type="button"
                        onClick={() => setTaxonomyFilter(prev => ({ ...prev, phylum: '', class: '', order: '' }))}
                        className="text-[10px] text-slate-400 hover:text-rose-300 cursor-pointer"
                      >
                        清空门筛选
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    <select
                      value={taxonomyFilter.phylum}
                      onChange={(e) => {
                        const phylumVal = e.target.value;
                        let domainVal = selectedDomain;
                        if (phylumVal.includes('节肢') || phylumVal.includes('软体') || phylumVal.includes('脊索')) {
                          domainVal = 'fauna';
                        } else if (phylumVal.includes('维管') || phylumVal.includes('银杏') || phylumVal.includes('植物')) {
                          domainVal = 'flora';
                        } else if (phylumVal.includes('担子') || phylumVal.includes('子囊') || phylumVal.includes('真菌')) {
                          domainVal = 'fungi';
                        }
                        setSelectedDomain(domainVal);
                        setTaxonomyFilter(prev => ({
                          ...prev,
                          phylum: phylumVal,
                          class: '',
                          order: ''
                        }));
                      }}
                      className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                    >
                      <option value="">-- 选择常用生物门 --</option>
                      <optgroup label="动物界 (Animalia)">
                        <option value="节肢动物门 (Arthropoda)">🦞 节肢动物门 (Arthropoda)</option>
                        <option value="软体动物门 (Mollusca)">🐌 软体动物门 (Mollusca)</option>
                        <option value="脊索动物门 (Chordata)">🐒 脊索动物门 (Chordata)</option>
                        <option value="环节动物门 (Annelida)">🪱 环节动物门 (Annelida)</option>
                        <option value="刺胞动物门 (Cnidaria)">🪸 刺胞动物门 (Cnidaria)</option>
                      </optgroup>
                      <optgroup label="植物界 (Plantae)">
                        <option value="维管植物门 (Tracheophyta)">🌿 维管植物门 (Tracheophyta)</option>
                        <option value="银杏门 (Ginkgophyta)">🌲 银杏门 (Ginkgophyta)</option>
                        <option value="苔藓植物门 (Bryophyta)">🌱 苔藓植物门 (Bryophyta)</option>
                      </optgroup>
                      <optgroup label="真菌界 (Fungi)">
                        <option value="担子菌门 (Basidiomycota)">🍄 担子菌门 (Basidiomycota)</option>
                        <option value="子囊菌门 (Ascomycota)">🧫 子囊菌门 (Ascomycota)</option>
                      </optgroup>
                    </select>

                    <input
                      type="text"
                      placeholder="或输入自定义门名..."
                      value={taxonomyFilter.phylum}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val.includes('节肢') || val.includes('软体')) setSelectedDomain('fauna');
                        setTaxonomyFilter(prev => ({ ...prev, phylum: val }));
                      }}
                      className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                {/* 3. Class (纲) */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300">3. 纲 (Class)</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    <select
                      value={taxonomyFilter.class}
                      onChange={(e) => setTaxonomyFilter(prev => ({ ...prev, class: e.target.value }))}
                      className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                    >
                      <option value="">-- 选择常用纲 (选填) --</option>
                      {taxonomyFilter.phylum.includes('节肢') ? (
                        <>
                          <option value="昆虫纲 (Insecta)">🪲 昆虫纲 (Insecta)</option>
                          <option value="肢口纲 (Merostomata)">🩵 肢口纲 (Merostomata - 鲎类)</option>
                          <option value="蛛形纲 (Arachnida)">🕷️ 蛛形纲 (Arachnida)</option>
                          <option value="软甲纲 (Malacostraca)">🦀 软甲纲 (Malacostraca - 虾蟹)</option>
                          <option value="唇足纲 (Chilopoda)">🐛 唇足纲 (Chilopoda - 蜈蚣)</option>
                        </>
                      ) : taxonomyFilter.phylum.includes('软体') ? (
                        <>
                          <option value="双壳纲 (Bivalvia)">🦪 双壳纲 (Bivalvia - 砗磲/蚌)</option>
                          <option value="腹足纲 (Gastropoda)">🐌 腹足纲 (Gastropoda - 蜗牛/螺)</option>
                          <option value="头足纲 (Cephalopoda)">🦑 头足纲 (Cephalopoda - 鹦鹉螺/乌贼)</option>
                        </>
                      ) : (
                        <>
                          <option value="昆虫纲 (Insecta)">🪲 昆虫纲 (节肢动物门)</option>
                          <option value="肢口纲 (Merostomata)">🩵 肢口纲 (中国鲎)</option>
                          <option value="哺乳纲 (Mammalia)">🐅 哺乳纲 (脊索动物门)</option>
                          <option value="鸟纲 (Aves)">🦜 鸟纲 (脊索动物门)</option>
                          <option value="爬行纲 (Reptilia)">🐊 爬行纲 (扬子鳄等)</option>
                          <option value="双壳纲 (Bivalvia)">🦪 双壳纲 (软体动物门)</option>
                          <option value="松柏纲 (Pinopsida)">🌲 松柏纲 (裸子植物)</option>
                          <option value="伞菌纲 (Agaricomycetes)">🍄 伞菌纲 (大型真菌)</option>
                        </>
                      )}
                    </select>
                    <input
                      type="text"
                      placeholder="或输入纲名 (如: 昆虫纲)..."
                      value={taxonomyFilter.class}
                      onChange={(e) => setTaxonomyFilter(prev => ({ ...prev, class: e.target.value }))}
                      className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                {/* 4. Order (目) & 5. Family (科) */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-300">4. 目 (Order)</label>
                    <input
                      type="text"
                      placeholder="如: 鞘翅目、剑尾目"
                      value={taxonomyFilter.order}
                      onChange={(e) => setTaxonomyFilter(prev => ({ ...prev, order: e.target.value }))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-300">5. 科 (Family)</label>
                    <input
                      type="text"
                      placeholder="如: 臂金龟科、鲎科"
                      value={taxonomyFilter.family}
                      onChange={(e) => setTaxonomyFilter(prev => ({ ...prev, family: e.target.value }))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                {/* 6. Genus (属) & 7. Species (种) */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-300">6. 属 (Genus)</label>
                    <input
                      type="text"
                      placeholder="如: 彩臂金龟属"
                      value={taxonomyFilter.genus}
                      onChange={(e) => setTaxonomyFilter(prev => ({ ...prev, genus: e.target.value }))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-300">7. 种 (Species)</label>
                    <input
                      type="text"
                      placeholder="如: 阳彩臂金龟"
                      value={taxonomyFilter.species}
                      onChange={(e) => setTaxonomyFilter(prev => ({ ...prev, species: e.target.value }))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                {/* Reset button */}
                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedDomain('all');
                      setTaxonomyFilter({
                        kingdom: '',
                        phylum: '',
                        class: '',
                        order: '',
                        family: '',
                        genus: '',
                        species: ''
                      });
                    }}
                    className="text-[10px] text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-900 border border-slate-800 hover:border-slate-700 cursor-pointer"
                  >
                    重置所有 7 阶筛选
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Duplicate Resolution Strategy */}
          <div className="space-y-1.5 p-3 bg-slate-950 rounded-xl border border-cyan-900/40">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                <GitMerge className="w-3.5 h-3.5" />
                ③ 重复数据合并策略
              </label>
              <button
                type="button"
                onClick={() => setShowMergeDetails(!showMergeDetails)}
                className="text-[10px] text-cyan-400 hover:text-cyan-200 flex items-center gap-0.5 cursor-pointer"
              >
                <span>机制说明</span>
                {showMergeDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            </div>

            <select
              value={mergeStrategy}
              onChange={(e) => setMergeStrategy(e.target.value as MergeStrategy)}
              className="w-full bg-slate-900 border border-cyan-800/80 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="smart_merge">🌿 智能增量融合 (保留照片与自定义，补全阶元与文献) - 推荐</option>
              <option value="overwrite">🔄 权威覆盖 (用最新采集数据完全替换已有记录)</option>
              <option value="skip">🛡️ 跳过重复 (若已存在则直接忽略，仅导入新物种)</option>
              <option value="keep_both">📑 副本并存 (保留旧条目并新增采集副本)</option>
            </select>
            <p className="text-[10px] text-slate-400 leading-tight">
              {strategyDescriptions[mergeStrategy].desc}
            </p>
          </div>

          {/* Quick Topics Pills */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-400">快速专题筛选：</label>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_TOPICS.map((topic, idx) => {
                const isActive = (topic.phylum && taxonomyFilter.phylum === topic.phylum) || (!topic.phylum && keyword === topic.key);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSelectedDomain(topic.domain);
                      setKeyword(topic.key);
                      if (topic.phylum) {
                        setTaxonomyFilter({
                          kingdom: topic.domain === 'fauna' ? '动物界 (Animalia)' : topic.domain === 'flora' ? '植物界 (Plantae)' : topic.domain === 'fungi' ? '真菌界 (Fungi)' : '',
                          phylum: topic.phylum,
                          class: topic.class || '',
                          order: topic.order || '',
                          family: '',
                          genus: '',
                          species: ''
                        });
                        setShowAdvancedTaxonomy(true);
                      }
                    }}
                    className={`text-[10px] px-2 py-1 rounded-lg border transition text-left cursor-pointer ${
                      isActive
                        ? 'bg-cyan-900/80 border-cyan-400 text-cyan-200 font-bold shadow-sm'
                        : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    {topic.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Keyword Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">④ 检索关键词 / 演化阶元 (选填)</label>
            <input
              type="text"
              placeholder="如: 裸子植物、灵长目、食肉目、川滇特有"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Batch Limit Count */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">⑤ 单批次采集数量</label>
            <div className="grid grid-cols-5 gap-1.5">
              {[5, 10, 15, 20].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setLimitCount(num)}
                  className={`py-1.5 text-xs font-bold rounded-lg border transition cursor-pointer ${
                    limitCount === num
                      ? 'bg-cyan-600 border-cyan-400 text-white shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {num} 种
                </button>
              ))}
              <button
                type="button"
                onClick={() => setLimitCount('all')}
                className={`py-1.5 text-xs font-bold rounded-lg border transition cursor-pointer ${
                  limitCount === 'all'
                    ? 'bg-amber-600 border-amber-400 text-white shadow-md'
                    : 'bg-slate-950 border-slate-800 text-amber-400 hover:text-amber-200 hover:border-amber-700'
                }`}
              >
                全量
              </button>
            </div>
          </div>

          {/* Auto-import Switch */}
          <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
            <div className="space-y-0.5">
              <label htmlFor="auto-import-toggle" className="text-xs font-bold text-slate-200 cursor-pointer">
                采集后自动写入数据库
              </label>
              <p className="text-[10px] text-slate-400">抓取解析完成后直接持久化至知识图谱</p>
            </div>
            <input
              id="auto-import-toggle"
              type="checkbox"
              checked={autoImport}
              onChange={(e) => setAutoImport(e.target.checked)}
              className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
            />
          </div>

          {/* Start Harvesting Button */}
          <button
            id="btn-start-harvest"
            onClick={() => handleStartHarvest(false)}
            disabled={isHarvesting || isFullHarvesting}
            className="w-full py-3 bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 disabled:from-slate-800 disabled:to-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/40 transition cursor-pointer"
          >
            {isHarvesting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>正在连接 API 抓取名录...</span>
              </>
            ) : (
              <>
                <DownloadCloud className="w-4 h-4" />
                <span>启动当前批次采集与解析</span>
              </>
            )}
          </button>
        </div>

        {/* Real-time Log Stream Console */}
        <div className="lg:col-span-2 bg-slate-950 rounded-2xl border border-slate-800 p-4 font-mono text-xs flex flex-col justify-between shadow-inner">
          <div className="space-y-1">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="font-semibold text-slate-300">采集调度任务终端 (Live Ingestion Log)</span>
              </div>
              <span className="text-[11px] text-slate-500">Darwin Core Protocol v1.4</span>
            </div>

            <div className="h-64 overflow-y-auto space-y-1.5 pt-2 text-slate-300">
              {logs.length === 0 ? (
                <div className="text-slate-600 italic py-16 text-center space-y-2">
                  <DownloadCloud className="w-8 h-8 mx-auto text-slate-700 stroke-1" />
                  <p>等待启动采集任务... 可点击上方【一键全量采集所有数据】或左侧按钮发起抓取。</p>
                </div>
              ) : (
                logs.map((log, idx) => (
                  <div
                    key={idx}
                    className={`${
                      log.includes('❌')
                        ? 'text-rose-400'
                        : log.includes('完成') || log.includes('成功')
                        ? 'text-emerald-400'
                        : log.includes('全量') || log.includes('智能比对')
                        ? 'text-cyan-300'
                        : log.includes('重复')
                        ? 'text-amber-300'
                        : 'text-slate-300'
                    }`}
                  >
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2">
            <span>接口协议: RESTful Darwin Core JSON / CoL OpenAPI</span>
            <span>编码格式: UTF-8 Linnaean Standard</span>
          </div>
        </div>
      </div>

      {/* Merge Strategy Explanatory Detail Accordion */}
      {showMergeDetails && (
        <div className="bg-slate-900/90 rounded-2xl border border-cyan-800/60 p-5 space-y-4 shadow-lg animate-fadeIn">
          <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
            <GitMerge className="w-4 h-4" />
            <span>多次采集相同数据的排重与属性合并机制解析</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs text-slate-300">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
              <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                1. 唯一主键精准识别
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                系统依据国际双名法规范拉丁学名 (<code className="text-emerald-300">scientificName</code>) 与中文正名 (<code className="text-emerald-300">chineseName</code>) 作为唯一物种标识符，进行严格大小写不敏感比对。
              </p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
              <div className="font-bold text-cyan-400 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5" />
                2. 用户自定义资产保留
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                智能合并模式下，用户手动上传或收藏的高清物种真彩图片、手填私有标签及特定笔记将被完全保留，不会被采集默认占位图覆写。
              </p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
              <div className="font-bold text-blue-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                3. 分类阶元与文本增量富化
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                若原有条目存在“待分类”阶元或缺失生境/习性，新采集的界门纲目科属种与地质演化纪元将自动增量填充；标签、分布省区与文献列表自动执行并集去重。
              </p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
              <div className="font-bold text-amber-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                4. 数据溯源与更新审计
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                保留物种最初创建时间 (<code className="text-amber-300">createdAt</code>)，同时将新数据源追加至溯源列表，并实时刷新更新时间 (<code className="text-amber-300">updatedAt</code>)。
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3. Harvested Results Table & Batch Import */}
      {harvestedResults.length > 0 && (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm sm:text-base font-bold text-white">
                  采集结果待入库清单 ({totalHarvestedCount} 种)
                </h3>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1 text-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  全新物种: <strong>{newHarvestedCount}</strong> 种
                </span>
                <span className="flex items-center gap-1 text-amber-300">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  已存重复: <strong>{duplicateHarvestedCount}</strong> 种 (将按【{strategyDescriptions[mergeStrategy].title}】执行)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleSelectAll}
                className="text-xs text-slate-300 hover:text-white underline cursor-pointer"
              >
                {selectedItems.size === harvestedResults.length ? '取消全选' : '全部选中'}
              </button>

              <button
                onClick={handleImportSelected}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md transition cursor-pointer"
              >
                <Database className="w-4 h-4" />
                <span>确认合并入库 ({selectedItems.size})</span>
              </button>
            </div>
          </div>

          {importSuccessMessage && (
            <div className="p-3 bg-emerald-950/80 border border-emerald-800 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{importSuccessMessage}</span>
            </div>
          )}

          {/* Results Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
                <tr>
                  <th className="p-3 w-10">
                    <input
                      type="checkbox"
                      checked={selectedItems.size === harvestedResults.length}
                      onChange={handleSelectAll}
                      className="rounded"
                    />
                  </th>
                  <th className="p-3">物种名称与状态</th>
                  <th className="p-3">拉丁学名</th>
                  <th className="p-3">界门纲目科</th>
                  <th className="p-3">保护级别</th>
                  <th className="p-3">演化时代</th>
                  <th className="p-3">数据来源</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {harvestedResults.map((sp) => {
                  const isDup = checkIsDuplicate(sp);
                  return (
                    <tr key={sp.id} className="hover:bg-slate-800/40">
                      <td className="p-3">
                        <input
                          type="checkbox"
                          checked={selectedItems.has(sp.id)}
                          onChange={() => handleToggleSelect(sp.id)}
                          className="rounded"
                        />
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">{sp.chineseName}</span>
                          {isDup ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-950 text-amber-300 border border-amber-800/80 flex items-center gap-1">
                              <GitMerge className="w-2.5 h-2.5" />
                              {mergeStrategy === 'smart_merge' ? '已存·智能合并' : mergeStrategy === 'overwrite' ? '已存·将覆盖' : mergeStrategy === 'skip' ? '已存·将跳过' : '已存·并存'}
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800/80">
                              ✨ 全新发现
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-3 font-serif italic text-emerald-300">{sp.scientificName}</td>
                      <td className="p-3 text-slate-400">
                        {sp.taxonomy.kingdom?.split(' ')[0] || ''} › {sp.taxonomy.phylum?.split(' ')[0] || ''} ›{' '}
                        {sp.taxonomy.class?.split(' ')[0] || ''} › {sp.taxonomy.family?.split(' ')[0] || ''}
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 text-[10px] border border-rose-800">
                          {sp.conservation}
                        </span>
                      </td>
                      <td className="p-3 font-mono text-slate-400">{sp.geologicalPeriod}</td>
                      <td className="p-3 text-slate-400">{sp.dataSource}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. Taxonomy Ingestion Architecture Documentation Box */}
      <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-6 space-y-4">
        <div className="flex items-center gap-2 text-white font-bold text-sm">
          <FileCode className="w-4 h-4 text-emerald-400" />
          <span>生物分类学数据采集与解析映射机制 (Darwin Core Architecture)</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-emerald-400">1. 名录规范化与双名法校验</h4>
            <p className="text-slate-400 leading-relaxed">
              将物种正名与学名比对至《中国生物物种名录》，依据国际植物命名法规 (ICN) 和国际动物命名法规 (ICZN) 校验双名法合法性，确保属名首字母大写与种加词正规化。
            </p>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-blue-400">2. 七级阶元自动对齐与补全</h4>
            <p className="text-slate-400 leading-relaxed">
              将扁平数据映射为标准的界 (Kingdom)、门 (Phylum)、纲 (Class)、目 (Order)、科 (Family)、属 (Genus)、种 (Species) 层次树，实现物种在演化树上的精确定位。
            </p>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-amber-400">3. 知识图谱与多维关系拓扑</h4>
            <p className="text-slate-400 leading-relaxed">
              实时生成 D3.js 支序发生树节点与力导向关系边，将保护级别、地质纪元与生态生境关联为动态交互图谱。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
