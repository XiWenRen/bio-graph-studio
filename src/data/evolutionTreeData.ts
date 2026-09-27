import { D3TaxonomyNode, EvolutionaryPeriod, GraphLink, GraphNode, SpeciesData } from '../types';

export const EVOLUTIONARY_PERIODS: EvolutionaryPeriod[] = [
  {
    era: '新元古代',
    period: '埃迪卡拉纪 (Ediacaran)',
    timeRange: '约 6.35亿 - 5.41亿年前',
    keyEvents: '多细胞真核生物崛起，原始后生动物出现辐射，生命开始形成宏观组织与器官。',
    taxaAppeared: ['多细胞真核藻类', '早期海绵动物', '埃迪卡拉奇特生物群']
  },
  {
    era: '古生代',
    period: '寒武纪 (Cambrian)',
    timeRange: '约 5.41亿 - 4.85亿年前',
    keyEvents: '寒武纪生命大爆发（澄江生物群），节肢动物、软体动物、脊索动物门类雏形在短时间内爆发式涌现。',
    taxaAppeared: ['昆明鱼（最原始脊椎动物）', '三叶虫', '奇虾', '原始软体动物（单板类/喙壳类）', '节肢动物门']
  },
  {
    era: '古生代',
    period: '奥陶纪 - 志留纪 (Ordovician-Silurian)',
    timeRange: '约 4.85亿 - 4.19亿年前',
    keyEvents: '早期植物与节肢动物开始登陆；有颌鱼类出现；早期维管束组织演化；直壳与旋壳头足类软体动物（鹦鹉螺类、房角石）称霸古海洋。',
    taxaAppeared: ['鹦鹉螺祖先（头足纲）', '早期陆生维管植物', '有颌脊椎动物', '原始珊瑚与笔石']
  },
  {
    era: '古生代',
    period: '泥盆纪 (Devonian)',
    timeRange: '约 4.19亿 - 3.59亿年前',
    keyEvents: '“鱼类时代”，硬骨鱼与肉鳍鱼爆发；早期四足类动物由水生演化登陆（两栖纲雏形）；原始裸子植物分化。',
    taxaAppeared: ['肉鳍鱼类（四足形类）', '原始两栖动物（鱼石螈）', '原始前裸子植物']
  },
  {
    era: '古生代',
    period: '石炭纪 - 二叠纪 (Carboniferous-Permian)',
    timeRange: '约 3.59亿 - 2.52亿年前',
    keyEvents: '羊膜卵演化成功（爬行类脱离水体繁殖）；巨大石松与蕨类森林形成煤炭；银杏目、苏铁目原始祖先出现。',
    taxaAppeared: ['早期爬行纲（羊膜动物）', '巨大昆虫（原始蜻蜓）', '原始苏铁纲', '银杏纲祖先']
  },
  {
    era: '中生代',
    period: '三叠纪 - 侏罗纪 (Triassic-Jurassic)',
    timeRange: '约 2.52亿 - 1.45亿年前',
    keyEvents: '主龙类崛起（恐龙与鳄目演化分支）；裸子植物处于陆地统治地位；原始哺乳动物与早期鸟类萌芽。',
    taxaAppeared: ['鳄目祖先', '原始隐鳃鲵科（大鲵祖先）', '原始哺乳形类', '始祖鸟']
  },
  {
    era: '中生代',
    period: '白垩纪 (Cretaceous)',
    timeRange: '约 1.45亿 - 6600万年前',
    keyEvents: '被子植物（有花植物）发生“惊人之谜”大爆发；昆虫与被子植物协同传粉演化；水杉与中华鲟祖先繁盛。',
    taxaAppeared: ['原始被子植物（木兰类、莲科基部群）', '中华鲟祖先', '水杉属古老类群', '传粉真骨昆虫']
  },
  {
    era: '新生代',
    period: '古近纪 - 新近纪 (Paleogene-Neogene)',
    timeRange: '约 6600万 - 258万年前',
    keyEvents: '恐龙灭绝后哺乳动物与鸟类发生极快速适应辐射；现代食肉目、灵长目分化；青藏高原剧烈抬升塑造现代东亚生物多样性格局。',
    taxaAppeared: ['始熊猫（大熊猫祖先）', '古食肉目与猫科/熊科分化', '古灵长类', '中国特有孑遗被子植物（珙桐、金花茶）']
  },
  {
    era: '新生代',
    period: '第四纪 (Quaternary)',
    timeRange: '约 258万年前 - 现今',
    keyEvents: '多次冰期与间冰期循环交替；中国南方山地成为全球动植物最重要的大避难所；现代物种形成与人类兴起。',
    taxaAppeared: ['现代大熊猫', '川金丝猴', '雪豹', '冬虫夏草高寒适应种群', '现代朱鹮']
  }
];

// Color mapping for major biological domains and kingdoms
export const DOMAIN_COLORS: Record<string, string> = {
  '动物界 (Animalia)': '#3B82F6', // Blue
  '植物界 (Plantae)': '#10B981',  // Emerald Green
  '真菌界 (Fungi)': '#F59E0B',    // Amber
  'Chordata': '#2563EB',
  'Arthropoda': '#0284C7',
  'Mollusca': '#06B6D4',          // Cyan / Ocean Molluscs
  '软体动物门 (Mollusca)': '#06B6D4',
  'Tracheophyta': '#059669',
  'Ginkgophyta': '#10B981',
  'Cycadophyta': '#14B8A6',
  'Ascomycota': '#D97706',
  'Basidiomycota': '#B45309',
};

/**
 * Builds a hierarchical tree node for D3 Tree / Sunburst from an array of species
 */
export function buildTaxonomyTreeFromSpecies(speciesList: SpeciesData[]): D3TaxonomyNode {
  const root: D3TaxonomyNode = {
    id: 'root-tree-of-life',
    name: '地球生命之树 (Tree of Life)',
    scientificName: 'Biota / Eukaryota',
    rank: 'root',
    level: 0,
    count: speciesList.length,
    children: []
  };

  speciesList.forEach((sp) => {
    const { kingdom, phylum, class: cls, order, family, genus, species } = sp.taxonomy;

    // 1. Kingdom
    let kingdomNode = root.children?.find((c) => c.name === kingdom);
    if (!kingdomNode) {
      kingdomNode = {
        id: `k-${kingdom}`,
        name: kingdom,
        rank: 'kingdom',
        level: 1,
        color: DOMAIN_COLORS[kingdom] || '#10B981',
        children: []
      };
      root.children = root.children || [];
      root.children.push(kingdomNode);
    }

    // 2. Phylum
    let phylumNode = kingdomNode.children?.find((c) => c.name === phylum);
    if (!phylumNode) {
      phylumNode = {
        id: `p-${kingdom}-${phylum}`,
        name: phylum,
        rank: 'phylum',
        level: 2,
        color: kingdomNode.color,
        children: []
      };
      kingdomNode.children = kingdomNode.children || [];
      kingdomNode.children.push(phylumNode);
    }

    // 3. Class
    let classNode = phylumNode.children?.find((c) => c.name === cls);
    if (!classNode) {
      classNode = {
        id: `c-${phylum}-${cls}`,
        name: cls,
        rank: 'class',
        level: 3,
        color: phylumNode.color,
        children: []
      };
      phylumNode.children = phylumNode.children || [];
      phylumNode.children.push(classNode);
    }

    // 4. Order
    let orderNode = classNode.children?.find((c) => c.name === order);
    if (!orderNode) {
      orderNode = {
        id: `o-${cls}-${order}`,
        name: order,
        rank: 'order',
        level: 4,
        color: classNode.color,
        children: []
      };
      classNode.children = classNode.children || [];
      classNode.children.push(orderNode);
    }

    // 5. Family
    let familyNode = orderNode.children?.find((c) => c.name === family);
    if (!familyNode) {
      familyNode = {
        id: `f-${order}-${family}`,
        name: family,
        rank: 'family',
        level: 5,
        color: orderNode.color,
        children: []
      };
      orderNode.children = orderNode.children || [];
      orderNode.children.push(familyNode);
    }

    // 6. Genus
    let genusNode = familyNode.children?.find((c) => c.name === genus);
    if (!genusNode) {
      genusNode = {
        id: `g-${family}-${genus}`,
        name: genus,
        rank: 'genus',
        level: 6,
        color: familyNode.color,
        children: []
      };
      familyNode.children = familyNode.children || [];
      familyNode.children.push(genusNode);
    }

    // 7. Species
    genusNode.children = genusNode.children || [];
    genusNode.children.push({
      id: `sp-${sp.id}`,
      name: sp.chineseName,
      scientificName: sp.scientificName,
      rank: 'species',
      level: 7,
      speciesData: sp,
      color: genusNode.color
    });
  });

  // Calculate cumulative counts
  function calculateCounts(node: D3TaxonomyNode): number {
    if (!node.children || node.children.length === 0) {
      node.count = 1;
      return 1;
    }
    node.count = node.children.reduce((sum, child) => sum + calculateCounts(child), 0);
    return node.count;
  }

  calculateCounts(root);
  return root;
}

/**
 * Builds Graph nodes & links for D3 Force-Directed Knowledge Graph
 */
export function buildKnowledgeGraphFromSpecies(speciesList: SpeciesData[]): { nodes: GraphNode[]; links: GraphLink[] } {
  const nodeMap = new Map<string, GraphNode>();
  const links: GraphLink[] = [];

  function addNode(id: string, name: string, type: GraphNode['type'], val: number, color: string, species?: SpeciesData) {
    if (!nodeMap.has(id)) {
      nodeMap.set(id, { id, name, type, val, color, species });
    }
  }

  // Root node
  addNode('root', '生命之树 (Biota)', 'kingdom', 28, '#4F46E5');

  speciesList.forEach((sp) => {
    const kId = `k_${sp.taxonomy.kingdom}`;
    const pId = `p_${sp.taxonomy.phylum}`;
    const cId = `c_${sp.taxonomy.class}`;
    const oId = `o_${sp.taxonomy.order}`;
    const fId = `f_${sp.taxonomy.family}`;
    const gId = `g_${sp.taxonomy.genus}`;
    const sId = `s_${sp.id}`;

    const domainColor = sp.domain === 'fauna' ? '#3B82F6' : sp.domain === 'flora' ? '#10B981' : '#F59E0B';

    addNode(kId, sp.taxonomy.kingdom, 'kingdom', 22, domainColor);
    addNode(pId, sp.taxonomy.phylum, 'phylum', 18, domainColor);
    addNode(cId, sp.taxonomy.class, 'class', 15, domainColor);
    addNode(oId, sp.taxonomy.order, 'order', 13, domainColor);
    addNode(fId, sp.taxonomy.family, 'family', 11, domainColor);
    addNode(sId, `${sp.chineseName} (${sp.scientificName})`, 'species', 14, domainColor, sp);

    links.push({ source: 'root', target: kId, relationship: '包含界' });
    links.push({ source: kId, target: pId, relationship: '包含门' });
    links.push({ source: pId, target: cId, relationship: '包含纲' });
    links.push({ source: cId, target: oId, relationship: '包含目' });
    links.push({ source: oId, target: fId, relationship: '包含科' });
    links.push({ source: fId, target: sId, relationship: '包含种' });

    // Connect tags as knowledge graph attributes
    sp.tags.slice(0, 3).forEach((tag) => {
      const tagId = `tag_${tag}`;
      addNode(tagId, tag, 'tag', 8, '#EC4899');
      links.push({ source: sId, target: tagId, relationship: '特征标签' });
    });
  });

  return {
    nodes: Array.from(nodeMap.values()),
    links
  };
}
