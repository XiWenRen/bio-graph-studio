export type TaxonomicRank = 
  | 'kingdom' 
  | 'phylum' 
  | 'class' 
  | 'order' 
  | 'family' 
  | 'genus' 
  | 'species';

export const TAXONOMIC_RANK_NAMES: Record<TaxonomicRank, { zh: string; en: string; order: number }> = {
  kingdom: { zh: '界', en: 'Kingdom', order: 1 },
  phylum: { zh: '门', en: 'Phylum', order: 2 },
  class: { zh: '纲', en: 'Class', order: 3 },
  order: { zh: '目', en: 'Order', order: 4 },
  family: { zh: '科', en: 'Family', order: 5 },
  genus: { zh: '属', en: 'Genus', order: 6 },
  species: { zh: '种', en: 'Species', order: 7 },
};

export interface TaxonomyHierarchy {
  kingdom: string;
  phylum: string;
  class: string;
  order: string;
  family: string;
  genus: string;
  species: string;
}

export type ConservationLevel = 
  | '国家一级重点保护'
  | '国家二级重点保护'
  | 'IUCN 极危 (CR)'
  | 'IUCN 濒危 (EN)'
  | 'IUCN 易危 (VU)'
  | 'IUCN 近危 (NT)'
  | 'IUCN 无危 (LC)'
  | '中国特有 / 需关注'
  | '一般保护 / 未评估';

export type BiologicalDomain = 'fauna' | 'flora' | 'fungi';

export type MergeStrategy = 'smart_merge' | 'overwrite' | 'skip' | 'keep_both';

export interface SpeciesReference {
  title: string;
  source: string;
  year?: string;
  url?: string;
}

export interface SpeciesData {
  id: string;
  chineseName: string;
  commonNames?: string[];
  scientificName: string; // 拉丁学名
  namingAuthor?: string;  // 命名者与年份，如 (David, 1869)
  taxonomy: TaxonomyHierarchy;
  domain: BiologicalDomain;
  conservation: ConservationLevel;
  citesAppendix?: string;
  distribution: string[]; // 分布省份/区域
  habitat: string;        // 生境描述
  morphology: string;     // 形态特征
  habits: string;         // 生态习性
  evolutionaryMilestone: string; // 演化关键特征/进化树定位
  geologicalPeriod: string;      // 起源或繁盛地质时代，如 白垩纪晚期、三叠纪、第四纪等
  tags: string[];
  imageUrl: string;
  references: SpeciesReference[];
  dataSource: string;     // 如：中国生物物种名录 2024版 / GBIF API / 中国植物志
  createdAt: string;
  updatedAt: string;
  userCreated?: boolean;
}

// Tree node structure for D3 visualizations
export interface D3TaxonomyNode {
  id: string;
  name: string;
  scientificName?: string;
  rank: TaxonomicRank | 'domain' | 'root';
  level: number;
  count?: number;
  speciesData?: SpeciesData;
  color?: string;
  evolutionEra?: string;
  divergenceTimeMa?: number; // 百万年前 (Million years ago)
  children?: D3TaxonomyNode[];
  _collapsed?: boolean;
}

// Force Graph Node & Link
export interface GraphNode {
  id: string;
  name: string;
  type: 'kingdom' | 'phylum' | 'class' | 'order' | 'family' | 'species' | 'trait' | 'tag';
  rank?: string;
  val?: number;
  species?: SpeciesData;
  color?: string;
  x?: number;
  y?: number;
}

export interface GraphLink {
  source: string | GraphNode;
  target: string | GraphNode;
  relationship: string;
}

export interface CollectorJobLog {
  id: string;
  timestamp: string;
  source: string;
  query: string;
  status: 'success' | 'failed' | 'running';
  itemsFetched: number;
  message: string;
}

export interface EvolutionaryPeriod {
  era: string;
  period: string;
  timeRange: string; // e.g. "5.41亿 - 4.85亿年前"
  keyEvents: string;
  taxaAppeared: string[];
}
