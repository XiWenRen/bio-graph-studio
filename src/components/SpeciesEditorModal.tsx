import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Save, 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Loader2, 
  Dna, 
  Layers, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { ConservationLevel, SpeciesData, TaxonomicRank } from '../types';

interface SpeciesEditorModalProps {
  speciesToEdit?: SpeciesData | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (species: SpeciesData) => void;
}

export const SpeciesEditorModal: React.FC<SpeciesEditorModalProps> = ({
  speciesToEdit,
  isOpen,
  onClose,
  onSave
}) => {
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Form State
  const [chineseName, setChineseName] = useState('');
  const [commonNamesStr, setCommonNamesStr] = useState('');
  const [scientificName, setScientificName] = useState('');
  const [namingAuthor, setNamingAuthor] = useState('');
  const [domain, setDomain] = useState<'fauna' | 'flora' | 'fungi'>('fauna');
  const [conservation, setConservation] = useState<ConservationLevel>('国家二级重点保护');
  const [citesAppendix, setCitesAppendix] = useState('CITES 附录 II');
  const [distributionStr, setDistributionStr] = useState('');
  const [habitat, setHabitat] = useState('');
  const [morphology, setMorphology] = useState('');
  const [habits, setHabits] = useState('');
  const [evolutionaryMilestone, setEvolutionaryMilestone] = useState('');
  const [geologicalPeriod, setGeologicalPeriod] = useState('第四纪更新世');
  const [tagsStr, setTagsStr] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [refTitle, setRefTitle] = useState('中国生物物种名录');
  const [refSource, setRefSource] = useState('中国科学院生物多样性委员会');

  // Linnaean 7 Ranks
  const [kingdom, setKingdom] = useState('动物界 (Animalia)');
  const [phylum, setPhylum] = useState('脊索动物门 (Chordata)');
  const [cls, setCls] = useState('哺乳纲 (Mammalia)');
  const [order, setOrder] = useState('食肉目 (Carnivora)');
  const [family, setFamily] = useState('熊科 (Ursidae)');
  const [genus, setGenus] = useState('');
  const [speciesRank, setSpeciesRank] = useState('');

  // Load existing species when editing
  useEffect(() => {
    if (speciesToEdit) {
      setChineseName(speciesToEdit.chineseName);
      setCommonNamesStr(speciesToEdit.commonNames?.join('、') || '');
      setScientificName(speciesToEdit.scientificName);
      setNamingAuthor(speciesToEdit.namingAuthor || '');
      setDomain(speciesToEdit.domain);
      setConservation(speciesToEdit.conservation);
      setCitesAppendix(speciesToEdit.citesAppendix || '无');
      setDistributionStr(speciesToEdit.distribution.join('，'));
      setHabitat(speciesToEdit.habitat);
      setMorphology(speciesToEdit.morphology);
      setHabits(speciesToEdit.habits);
      setEvolutionaryMilestone(speciesToEdit.evolutionaryMilestone);
      setGeologicalPeriod(speciesToEdit.geologicalPeriod);
      setTagsStr(speciesToEdit.tags.join('，'));
      setImageUrl(speciesToEdit.imageUrl);
      setRefTitle(speciesToEdit.references?.[0]?.title || '中国生物物种名录');
      setRefSource(speciesToEdit.references?.[0]?.source || '中国科学院生物多样性委员会');

      setKingdom(speciesToEdit.taxonomy.kingdom);
      setPhylum(speciesToEdit.taxonomy.phylum);
      setCls(speciesToEdit.taxonomy.class);
      setOrder(speciesToEdit.taxonomy.order);
      setFamily(speciesToEdit.taxonomy.family);
      setGenus(speciesToEdit.taxonomy.genus);
      setSpeciesRank(speciesToEdit.taxonomy.species);
    } else {
      // Default blank
      setChineseName('');
      setCommonNamesStr('');
      setScientificName('');
      setNamingAuthor('');
      setDomain('flora');
      setConservation('国家二级重点保护');
      setCitesAppendix('无');
      setDistributionStr('四川，云南，贵州');
      setHabitat('');
      setMorphology('');
      setHabits('');
      setEvolutionaryMilestone('');
      setGeologicalPeriod('新生代');
      setTagsStr('中国特有，重点保护');
      setImageUrl('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80');
      setRefTitle('中国生物物种名录');
      setRefSource('中国科学院生物多样性委员会');

      setKingdom('植物界 (Plantae)');
      setPhylum('维管植物门 (Tracheophyta)');
      setCls('木兰纲 (Magnoliopsida)');
      setOrder('');
      setFamily('');
      setGenus('');
      setSpeciesRank('');
    }
  }, [speciesToEdit, isOpen]);

  if (!isOpen) return null;

  // AI Auto-completion handler
  const handleAiAutoFill = async () => {
    if (!chineseName.trim()) {
      setAiError('请先输入物种名称（如：朱鹮、银杉、普氏原羚）');
      return;
    }

    setIsAiLoading(true);
    setAiError(null);

    try {
      const response = await fetch('/api/ai/enrich-species', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ queryName: chineseName.trim(), domainHint: domain })
      });

      const resJson = await response.json();
      if (!resJson.success || !resJson.data) {
        throw new Error(resJson.error || '获取AI补全失败');
      }

      const data = resJson.data;

      // Populate form
      if (data.chineseName) setChineseName(data.chineseName);
      if (data.commonNames) setCommonNamesStr(data.commonNames.join('、'));
      if (data.scientificName) setScientificName(data.scientificName);
      if (data.namingAuthor) setNamingAuthor(data.namingAuthor);
      if (data.domain) setDomain(data.domain);
      if (data.conservation) setConservation(data.conservation);
      if (data.citesAppendix) setCitesAppendix(data.citesAppendix);
      if (data.distribution) setDistributionStr(data.distribution.join('，'));
      if (data.habitat) setHabitat(data.habitat);
      if (data.morphology) setMorphology(data.morphology);
      if (data.habits) setHabits(data.habits);
      if (data.evolutionaryMilestone) setEvolutionaryMilestone(data.evolutionaryMilestone);
      if (data.geologicalPeriod) setGeologicalPeriod(data.geologicalPeriod);
      if (data.tags) setTagsStr(data.tags.join('，'));
      if (data.imageUrl) setImageUrl(data.imageUrl);

      if (data.taxonomy) {
        if (data.taxonomy.kingdom) setKingdom(data.taxonomy.kingdom);
        if (data.taxonomy.phylum) setPhylum(data.taxonomy.phylum);
        if (data.taxonomy.class) setCls(data.taxonomy.class);
        if (data.taxonomy.order) setOrder(data.taxonomy.order);
        if (data.taxonomy.family) setFamily(data.taxonomy.family);
        if (data.taxonomy.genus) setGenus(data.taxonomy.genus);
        if (data.taxonomy.species) setSpeciesRank(data.taxonomy.species);
      }
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || 'AI补全出现错误，请检查网络或稍后再试');
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chineseName.trim() || !scientificName.trim()) {
      alert('请填写中文正名与拉丁学名！');
      return;
    }

    const distList = distributionStr
      .split(/[,，;；\n]+/)
      .map((d) => d.trim())
      .filter(Boolean);

    const tagList = tagsStr
      .split(/[,，;；、\n]+/)
      .map((t) => t.trim())
      .filter(Boolean);

    const commonList = commonNamesStr
      .split(/[,，;；、\n]+/)
      .map((c) => c.trim())
      .filter(Boolean);

    const finalSpecies: SpeciesData = {
      id: speciesToEdit?.id || `sp-custom-${Date.now()}`,
      chineseName: chineseName.trim(),
      commonNames: commonList,
      scientificName: scientificName.trim(),
      namingAuthor: namingAuthor.trim(),
      taxonomy: {
        kingdom: kingdom || '植物界 (Plantae)',
        phylum: phylum || '维管植物门 (Tracheophyta)',
        class: cls || '木兰纲 (Magnoliopsida)',
        order: order || `${chineseName}目`,
        family: family || `${chineseName}科`,
        genus: genus || `${chineseName}属`,
        species: speciesRank || `${chineseName} (${scientificName})`
      },
      domain,
      conservation,
      citesAppendix,
      distribution: distList.length > 0 ? distList : ['中国'],
      habitat: habitat || '山地森林生境',
      morphology: morphology || '典型分类学特征',
      habits: habits || '生态习性良好',
      evolutionaryMilestone: evolutionaryMilestone || '系统分类进化树收录物种',
      geologicalPeriod: geologicalPeriod || '全新世/第四纪',
      tags: tagList.length > 0 ? tagList : ['中国特有'],
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80',
      references: [
        {
          title: refTitle || '中国生物物种名录',
          source: refSource || '中国科学院生物多样性委员会',
          year: '2024'
        }
      ],
      dataSource: speciesToEdit?.dataSource || '用户录入与AI分类学辅助校验',
      createdAt: speciesToEdit?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userCreated: true
    };

    onSave(finalSpecies);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
              <Dna className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                {speciesToEdit ? `编辑物种档案: ${speciesToEdit.chineseName}` : '录入与创建新物种档案'}
              </h2>
              <p className="text-xs text-slate-400">支持一键AI智能补全林奈七级阶元、拉丁学名与形态演化特征</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 text-xs sm:text-sm">
          {/* AI Helper Banner */}
          <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 p-4 rounded-2xl border border-emerald-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-inner">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-300 font-bold text-xs sm:text-sm">
                <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
                <span>AI 分类学专家一键自动补全</span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-300">
                输入中文名称（如“大天鹅”、“红豆杉”、“冬虫夏草”），AI将自动检索中国权威分类学知识库补全全部字段。
              </p>
            </div>
            <button
              type="button"
              onClick={handleAiAutoFill}
              disabled={isAiLoading}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-md cursor-pointer shrink-0"
            >
              {isAiLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>正在精准补全中...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>一键智能补全全套档案</span>
                </>
              )}
            </button>
          </div>

          {aiError && (
            <div className="p-3 bg-rose-950/80 border border-rose-800 rounded-xl text-xs text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{aiError}</span>
            </div>
          )}

          {/* 1. Basic Identification */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider border-b border-slate-800 pb-1">
              一、物种基础命名与属性
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  中文正名 <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="如: 银杏 / 大熊猫"
                  value={chineseName}
                  onChange={(e) => setChineseName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  拉丁学名 (斜体双名法) <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="如: Ginkgo biloba"
                  value={scientificName}
                  onChange={(e) => setScientificName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white font-serif italic focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">命名人与年代</label>
                <input
                  type="text"
                  placeholder="如: L., 1771 或 (David, 1869)"
                  value={namingAuthor}
                  onChange={(e) => setNamingAuthor(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">生物界门类</label>
                <select
                  value={domain}
                  onChange={(e) => setDomain(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="flora">🌿 植物界 (Flora / Plantae)</option>
                  <option value="fauna">🐾 动物界 (Fauna / Animalia)</option>
                  <option value="fungi">🍄 真菌界 (Fungi)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">保护等级</label>
                <select
                  value={conservation}
                  onChange={(e) => setConservation(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="国家一级重点保护">国家一级重点保护</option>
                  <option value="国家二级重点保护">国家二级重点保护</option>
                  <option value="IUCN 极危 (CR)">IUCN 极危 (CR)</option>
                  <option value="IUCN 濒危 (EN)">IUCN 濒危 (EN)</option>
                  <option value="IUCN 易危 (VU)">IUCN 易危 (VU)</option>
                  <option value="IUCN 近危 (NT)">IUCN 近危 (NT)</option>
                  <option value="IUCN 无危 (LC)">IUCN 无危 (LC)</option>
                  <option value="中国特有 / 需关注">中国特有 / 需关注</option>
                  <option value="一般保护 / 未评估">一般保护 / 未评估</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">别名与俗名 (逗号隔开)</label>
                <input
                  type="text"
                  placeholder="如: 白果树、公孙树"
                  value={commonNamesStr}
                  onChange={(e) => setCommonNamesStr(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* 2. Seven Taxonomic Ranks */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider border-b border-slate-800 pb-1 flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              <span>二、林奈七级分类阶元 (界·门·纲·目·科·属·种)</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-emerald-300 mb-1">界 (Kingdom)</label>
                <input
                  type="text"
                  value={kingdom}
                  onChange={(e) => setKingdom(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-teal-300 mb-1">门 (Phylum)</label>
                <input
                  type="text"
                  value={phylum}
                  onChange={(e) => setPhylum(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-cyan-300 mb-1">纲 (Class)</label>
                <input
                  type="text"
                  value={cls}
                  onChange={(e) => setCls(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-blue-300 mb-1">目 (Order)</label>
                <input
                  type="text"
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-indigo-300 mb-1">科 (Family)</label>
                <input
                  type="text"
                  value={family}
                  onChange={(e) => setFamily(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-purple-300 mb-1">属 (Genus)</label>
                <input
                  type="text"
                  value={genus}
                  onChange={(e) => setGenus(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-amber-300 mb-1">种 (Species)</label>
                <input
                  type="text"
                  value={speciesRank}
                  onChange={(e) => setSpeciesRank(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
                />
              </div>
            </div>
          </div>

          {/* 3. Description & Ecology */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider border-b border-slate-800 pb-1">
              三、形态描述与生境特征
            </h3>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">形态解剖与外观特征详细描述</label>
              <textarea
                rows={3}
                placeholder="详细描述叶、花、果实、骨骼、毛色、体型等特征..."
                value={morphology}
                onChange={(e) => setMorphology(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">生态习性与行为</label>
                <textarea
                  rows={2}
                  placeholder="食性、繁殖方式、季节节律等..."
                  value={habits}
                  onChange={(e) => setHabits(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">典型生境与海拔区间</label>
                <textarea
                  rows={2}
                  placeholder="如: 海拔1500-3000米的高山针阔混交林..."
                  value={habitat}
                  onChange={(e) => setHabitat(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* 4. Evolution, Distribution & Media */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider border-b border-slate-800 pb-1">
              四、演化地位、地理分布与图片
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">进化树演化地位 / 活化石特性</label>
                <input
                  type="text"
                  placeholder="如: 熊科最古老分支 / 裸子植物二叠纪孑遗"
                  value={evolutionaryMilestone}
                  onChange={(e) => setEvolutionaryMilestone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">地质起源时代</label>
                <input
                  type="text"
                  placeholder="如: 二叠纪 / 白垩纪 / 更新世"
                  value={geologicalPeriod}
                  onChange={(e) => setGeologicalPeriod(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">中国主要分布省区 (逗号分隔)</label>
              <input
                type="text"
                placeholder="如: 四川，陕西，甘肃，湖北神农架"
                value={distributionStr}
                onChange={(e) => setDistributionStr(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">自定义标签 (逗号分隔)</label>
                <input
                  type="text"
                  placeholder="如: 活化石，中国特有，药用植物，旗舰物种"
                  value={tagsStr}
                  onChange={(e) => setTagsStr(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-medium text-slate-300">高清影像URL (支持权威库自动提取)</label>
                  <button
                    type="button"
                    onClick={async () => {
                      if (!scientificName && !chineseName) {
                        alert('请先输入物种学名或中文名');
                        return;
                      }
                      const { fetchScientificSpeciesImage } = await import('../services/imageService');
                      const resolved = await fetchScientificSpeciesImage(scientificName, chineseName);
                      if (resolved) {
                        setImageUrl(resolved);
                      } else {
                        alert('未能从GBIF/Wikipedia自动检索到合适的高清图片，请手动填写URL');
                      }
                    }}
                    className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer font-medium"
                  >
                    <Sparkles className="w-3 h-3" />
                    从权威库检索图片
                  </button>
                </div>
                <input
                  type="url"
                  placeholder="https://... 或点击上方按钮从权威库获取"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Footer Submit Buttons */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 font-medium text-xs transition cursor-pointer"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-2 transition shadow-lg shadow-emerald-950/40 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>保存物种分类档案</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
