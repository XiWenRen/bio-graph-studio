import { SEED_SPECIES } from '../data/seedSpecies';
import { CollectorJobLog, MergeStrategy, SpeciesData } from '../types';

const STORAGE_KEY = 'bio_taxonomy_species_db_v3';
const LEGACY_STORAGE_KEY = 'bio_taxonomy_species_db_v2';
const LOGS_STORAGE_KEY = 'bio_taxonomy_collector_logs_v2';

export const storageService = {
  /**
   * Get all species from storage, fallback to seed data and auto-sync missing canonical seed taxa (e.g. Mollusca)
   */
  getAllSpecies(): SpeciesData[] {
    try {
      let rawStored = localStorage.getItem(STORAGE_KEY);
      // Migrate from v2 if v3 is not yet initialized
      if (!rawStored) {
        const legacyStored = localStorage.getItem(LEGACY_STORAGE_KEY);
        if (legacyStored) {
          rawStored = legacyStored;
        }
      }

      if (rawStored) {
        const parsed = JSON.parse(rawStored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const existingIds = new Set<string>();
          const existingNames = new Set<string>();
          parsed.forEach((sp: SpeciesData) => {
            if (sp.id) existingIds.add(sp.id);
            if (sp.scientificName) existingNames.add(sp.scientificName.trim().toLowerCase());
            if (sp.chineseName) existingNames.add(sp.chineseName.trim().toLowerCase());
          });

          const seedMap = new Map(SEED_SPECIES.map((s) => [s.id, s.imageUrl]));
          let modified = false;

          // Sync images
          const reconciled: SpeciesData[] = parsed.map((sp: SpeciesData) => {
            const canonicalUrl = seedMap.get(sp.id);
            if (canonicalUrl && sp.imageUrl !== canonicalUrl) {
              modified = true;
              return { ...sp, imageUrl: canonicalUrl };
            }
            return sp;
          });

          // Automatically inject canonical seed species (e.g. 软体动物门: 库氏砗磲, 鹦鹉螺, 佛耳丽蚌, 中华圆田螺)
          for (const seed of SEED_SPECIES) {
            const hasId = existingIds.has(seed.id);
            const hasSciName = seed.scientificName && existingNames.has(seed.scientificName.trim().toLowerCase());
            const hasCnName = seed.chineseName && existingNames.has(seed.chineseName.trim().toLowerCase());
            if (!hasId && !hasSciName && !hasCnName) {
              reconciled.push(seed);
              existingIds.add(seed.id);
              if (seed.scientificName) existingNames.add(seed.scientificName.trim().toLowerCase());
              if (seed.chineseName) existingNames.add(seed.chineseName.trim().toLowerCase());
              modified = true;
            }
          }

          if (modified || !localStorage.getItem(STORAGE_KEY)) {
            this.saveAllSpecies(reconciled);
          }
          return reconciled;
        }
      }
    } catch (e) {
      console.error('Failed to load species from localStorage:', e);
    }
    // Seed default dataset
    this.saveAllSpecies(SEED_SPECIES);
    return SEED_SPECIES;
  },

  /**
   * Save array of species
   */
  saveAllSpecies(speciesList: SpeciesData[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(speciesList));
    } catch (e) {
      console.error('Failed to save species to localStorage:', e);
    }
  },

  /**
   * Save or update a single species
   */
  saveSpecies(species: SpeciesData): SpeciesData[] {
    const list = this.getAllSpecies();
    const index = list.findIndex((s) => s.id === species.id);
    const updatedSpecies = {
      ...species,
      updatedAt: new Date().toISOString()
    };

    if (index >= 0) {
      list[index] = updatedSpecies;
    } else {
      list.unshift(updatedSpecies);
    }

    this.saveAllSpecies(list);
    return list;
  },

  /**
   * Delete species by ID
   */
  deleteSpecies(id: string): SpeciesData[] {
    const list = this.getAllSpecies();
    const filtered = list.filter((s) => s.id !== id);
    this.saveAllSpecies(filtered);
    return filtered;
  },

  /**
   * Batch delete species by IDs
   */
  batchDelete(ids: string[]): SpeciesData[] {
    const idSet = new Set(ids);
    const list = this.getAllSpecies().filter((s) => !idSet.has(s.id));
    this.saveAllSpecies(list);
    return list;
  },

  /**
   * Reset database back to authoritative seed dataset
   */
  resetToSeedData(): SpeciesData[] {
    this.saveAllSpecies(SEED_SPECIES);
    return SEED_SPECIES;
  },

  /**
   * Batch import species from parsed JSON, CSV, or Harvester
   * Supports four duplicate reconciliation strategies:
   * 1. 'smart_merge': Intelligently merge attributes (enrich hierarchy, union tags/provinces/references, keep custom photos)
   * 2. 'overwrite': Completely replace existing record with new authoritative record
   * 3. 'skip': Ignore duplicates and only insert newly discovered taxa
   * 4. 'keep_both': Retain both versions by appending version tag
   */
  batchImport(
    importedList: Partial<SpeciesData>[],
    mode: MergeStrategy | 'merge' | 'overwrite' = 'smart_merge'
  ): SpeciesData[] {
    const strategy: MergeStrategy = mode === 'merge' ? 'smart_merge' : (mode as MergeStrategy);
    const currentList = this.getAllSpecies();

    importedList.forEach((item) => {
      if (!item.chineseName || !item.scientificName) return;

      const normName = item.chineseName.trim();
      const normSci = item.scientificName.trim().toLowerCase();

      const existingIndex = currentList.findIndex(
        (s) =>
          s.id === item.id ||
          s.scientificName.trim().toLowerCase() === normSci ||
          s.chineseName.trim() === normName
      );

      const defaultDomain = item.domain || 'fauna';
      const completeSpecies: SpeciesData = {
        id: item.id || `sp-custom-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        chineseName: item.chineseName,
        commonNames: item.commonNames || [],
        scientificName: item.scientificName,
        namingAuthor: item.namingAuthor || '',
        taxonomy: item.taxonomy || {
          kingdom: defaultDomain === 'flora' ? '植物界 (Plantae)' : defaultDomain === 'fungi' ? '真菌界 (Fungi)' : '动物界 (Animalia)',
          phylum: '待分类门',
          class: '待分类纲',
          order: '待分类目',
          family: '待分类科',
          genus: '待分类属',
          species: `${item.chineseName} (${item.scientificName})`
        },
        domain: defaultDomain,
        conservation: item.conservation || '一般保护 / 未评估',
        citesAppendix: item.citesAppendix || '无',
        distribution: item.distribution || ['中国'],
        habitat: item.habitat || '暂无生境描述',
        morphology: item.morphology || '暂无形态描述',
        habits: item.habits || '暂无生态习性描述',
        evolutionaryMilestone: item.evolutionaryMilestone || '系统分类进化树收录物种',
        geologicalPeriod: item.geologicalPeriod || '全新世/现代',
        tags: item.tags || ['批量导入'],
        imageUrl: item.imageUrl || 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80',
        references: item.references || [{ title: '中国生物物种名录 / 本地导入', source: '科研数据库', year: new Date().getFullYear().toString() }],
        dataSource: item.dataSource || '批量采集导入',
        createdAt: item.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userCreated: true
      };

      if (existingIndex >= 0) {
        const existing = currentList[existingIndex];

        if (strategy === 'skip') {
          // Skip existing without modifying
          return;
        } else if (strategy === 'overwrite') {
          // Overwrite with incoming, preserving ID
          currentList[existingIndex] = {
            ...completeSpecies,
            id: existing.id,
            createdAt: existing.createdAt,
            updatedAt: new Date().toISOString()
          };
        } else if (strategy === 'keep_both') {
          // Retain both versions as distinct entries
          currentList.push({
            ...completeSpecies,
            id: `sp-dup-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            chineseName: `${completeSpecies.chineseName} (采集副本)`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          });
        } else {
          // 'smart_merge' (Default): Field-level intelligent fusion
          // 1. Image preservation: retain existing user photo if incoming is placeholder/empty
          const isPlaceholder = (url?: string) => !url || url.includes('unsplash.com/photo-1518531933037') || url.includes('placeholder');
          const finalImage = !isPlaceholder(existing.imageUrl) ? existing.imageUrl : completeSpecies.imageUrl;

          // 2. Tags union (deduplicated)
          const mergedTags = Array.from(new Set([...(existing.tags || []), ...(completeSpecies.tags || [])]));

          // 3. Distribution provinces union
          const mergedDist = Array.from(new Set([...(existing.distribution || []), ...(completeSpecies.distribution || [])]));

          // 4. Common names union
          const mergedCommonNames = Array.from(new Set([...(existing.commonNames || []), ...(completeSpecies.commonNames || [])]));

          // 5. References union (by title)
          const existingRefTitles = new Set((existing.references || []).map((r) => r.title));
          const newRefs = (completeSpecies.references || []).filter((r) => !existingRefTitles.has(r.title));
          const mergedRefs = [...(existing.references || []), ...newRefs];

          // 6. Taxonomy enrichment: if existing was "待分类", replace with valid scraped taxonomy
          const mergedTaxonomy = { ...existing.taxonomy };
          (Object.keys(completeSpecies.taxonomy) as (keyof typeof completeSpecies.taxonomy)[]).forEach((rank) => {
            if (
              !mergedTaxonomy[rank] ||
              mergedTaxonomy[rank].startsWith('待分类') ||
              (completeSpecies.taxonomy[rank] && !completeSpecies.taxonomy[rank].startsWith('待分类'))
            ) {
              mergedTaxonomy[rank] = completeSpecies.taxonomy[rank];
            }
          });

          // 7. Text fields: prefer richer descriptions
          const pickRicher = (orig?: string, incoming?: string, placeholder?: string) => {
            if (!orig || orig === placeholder) return incoming || orig || '';
            if (incoming && incoming !== placeholder && incoming.length > orig.length) return incoming;
            return orig;
          };

          currentList[existingIndex] = {
            ...existing,
            chineseName: existing.chineseName || completeSpecies.chineseName,
            scientificName: existing.scientificName || completeSpecies.scientificName,
            namingAuthor: existing.namingAuthor || completeSpecies.namingAuthor,
            taxonomy: mergedTaxonomy,
            domain: completeSpecies.domain || existing.domain,
            conservation: existing.conservation !== '一般保护 / 未评估' ? existing.conservation : completeSpecies.conservation,
            citesAppendix: existing.citesAppendix && existing.citesAppendix !== '无' ? existing.citesAppendix : completeSpecies.citesAppendix,
            distribution: mergedDist,
            commonNames: mergedCommonNames,
            habitat: pickRicher(existing.habitat, completeSpecies.habitat, '暂无生境描述'),
            morphology: pickRicher(existing.morphology, completeSpecies.morphology, '暂无形态描述'),
            habits: pickRicher(existing.habits, completeSpecies.habits, '暂无生态习性描述'),
            evolutionaryMilestone: pickRicher(existing.evolutionaryMilestone, completeSpecies.evolutionaryMilestone, '系统分类进化树收录物种'),
            geologicalPeriod: pickRicher(existing.geologicalPeriod, completeSpecies.geologicalPeriod, '全新世/现代'),
            tags: mergedTags,
            imageUrl: finalImage,
            references: mergedRefs,
            dataSource: existing.dataSource ? `${existing.dataSource} / ${completeSpecies.dataSource}` : completeSpecies.dataSource,
            updatedAt: new Date().toISOString()
          };
        }
      } else {
        // New species insertion
        currentList.unshift(completeSpecies);
      }
    });

    this.saveAllSpecies(currentList);
    return currentList;
  },

  /**
   * Export all species as formatted JSON string
   */
  exportJSON(list?: SpeciesData[]): string {
    const data = list || this.getAllSpecies();
    return JSON.stringify(data, null, 2);
  },

  /**
   * Export all species as CSV string
   */
  exportCSV(list?: SpeciesData[]): string {
    const data = list || this.getAllSpecies();
    const headers = [
      '中文正名',
      '拉丁学名',
      '门类',
      '界',
      '门',
      '纲',
      '目',
      '科',
      '属',
      '保护等级',
      '分布区域',
      '生境',
      '形态特征',
      '演化特征',
      '地质时代',
      '标签'
    ];

    const rows = data.map((s) => [
      `"${s.chineseName.replace(/"/g, '""')}"`,
      `"${s.scientificName.replace(/"/g, '""')}"`,
      `"${s.domain}"`,
      `"${s.taxonomy.kingdom}"`,
      `"${s.taxonomy.phylum}"`,
      `"${s.taxonomy.class}"`,
      `"${s.taxonomy.order}"`,
      `"${s.taxonomy.family}"`,
      `"${s.taxonomy.genus}"`,
      `"${s.conservation}"`,
      `"${s.distribution.join('; ').replace(/"/g, '""')}"`,
      `"${(s.habitat || '').replace(/"/g, '""')}"`,
      `"${(s.morphology || '').replace(/"/g, '""')}"`,
      `"${(s.evolutionaryMilestone || '').replace(/"/g, '""')}"`,
      `"${s.geologicalPeriod}"`,
      `"${s.tags.join('; ').replace(/"/g, '""')}"`
    ]);

    return '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  }
};

// Standalone Helper functions
export const getStoredSpeciesList = (): SpeciesData[] => storageService.getAllSpecies();
export const saveSpeciesToStorage = (species: SpeciesData): SpeciesData[] => storageService.saveSpecies(species);
export const deleteSpeciesFromStorage = (id: string): SpeciesData[] => storageService.deleteSpecies(id);
export const batchDeleteSpeciesFromStorage = (ids: string[]): SpeciesData[] => storageService.batchDelete(ids);
export const batchImportSpeciesToStorage = (
  imported: Partial<SpeciesData>[],
  mode: MergeStrategy | 'merge' | 'overwrite' = 'smart_merge'
): SpeciesData[] => storageService.batchImport(imported, mode);
export const resetSpeciesStorageToSeed = (): SpeciesData[] => storageService.resetToSeedData();
export const exportSpeciesToJSON = (list: SpeciesData[]): string => storageService.exportJSON(list);
export const exportSpeciesToCSV = (list: SpeciesData[]): string => storageService.exportCSV(list);

export const importSpeciesFromJSONString = (jsonStr: string): SpeciesData[] => {
  const parsed = JSON.parse(jsonStr);
  const array = Array.isArray(parsed) ? parsed : [parsed];
  return array.filter((item) => item && typeof item === 'object' && item.chineseName && item.scientificName);
};

export const importSpeciesFromCSVString = (csvStr: string): SpeciesData[] => {
  const lines = csvStr.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) return [];

  // Parse CSV line safely
  const parseLine = (line: string): string[] => {
    const result: string[] = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') {
        if (inQuotes && line[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (c === ',' && !inQuotes) {
        result.push(cur.trim());
        cur = '';
      } else {
        cur += c;
      }
    }
    result.push(cur.trim());
    return result;
  };

  const results: SpeciesData[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = parseLine(lines[i]);
    if (cols.length < 2 || !cols[0] || !cols[1]) continue;

    const chineseName = cols[0];
    const scientificName = cols[1];
    const domain = (cols[2] === 'flora' || cols[2] === 'fungi' ? cols[2] : 'fauna') as any;
    const kingdom = cols[3] || (domain === 'flora' ? '植物界 (Plantae)' : domain === 'fungi' ? '真菌界 (Fungi)' : '动物界 (Animalia)');
    const phylum = cols[4] || '待分类门';
    const cls = cols[5] || '待分类纲';
    const order = cols[6] || '待分类目';
    const family = cols[7] || '待分类科';
    const genus = cols[8] || '待分类属';
    const conservation = (cols[9] || '一般保护 / 未评估') as any;
    const distribution = cols[10] ? cols[10].split(';').map((s) => s.trim()) : ['中国'];
    const habitat = cols[11] || '';
    const morphology = cols[12] || '';
    const evolutionaryMilestone = cols[13] || '';
    const geologicalPeriod = cols[14] || '现代';
    const tags = cols[15] ? cols[15].split(';').map((s) => s.trim()) : ['批量导入'];

    results.push({
      id: `sp-import-${Date.now()}-${i}`,
      chineseName,
      scientificName,
      namingAuthor: '',
      taxonomy: {
        kingdom,
        phylum,
        class: cls,
        order,
        family,
        genus,
        species: `${chineseName} (${scientificName})`
      },
      domain,
      conservation,
      citesAppendix: '无',
      distribution,
      habitat,
      morphology,
      habits: '',
      evolutionaryMilestone,
      geologicalPeriod,
      tags,
      imageUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80',
      references: [{ title: '中国生物物种名录', source: 'CSV批量导入', year: '2024' }],
      dataSource: 'CSV批量导入',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userCreated: true
    });
  }

  return results;
};
