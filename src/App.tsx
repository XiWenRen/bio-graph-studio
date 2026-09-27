import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { TaxonomyTreeView } from './components/TaxonomyTreeView';
import { TaxonomyExplorer } from './components/TaxonomyExplorer';
import { DataManagementCenter } from './components/DataManagementCenter';
import { DataCollectorWorkbench } from './components/DataCollectorWorkbench';
import { TaxonomyLearningCenter } from './components/TaxonomyLearningCenter';
import { SpeciesDetailModal } from './components/SpeciesDetailModal';
import { SpeciesEditorModal } from './components/SpeciesEditorModal';
import { BatchImportExportModal } from './components/BatchImportExportModal';
import { MergeStrategy, SpeciesData } from './types';
import { 
  getStoredSpeciesList, 
  saveSpeciesToStorage, 
  deleteSpeciesFromStorage, 
  batchDeleteSpeciesFromStorage, 
  batchImportSpeciesToStorage, 
  resetSpeciesStorageToSeed 
} from './services/storageService';

export default function App() {
  const [activeTab, setActiveTab] = useState<'tree' | 'explorer' | 'manage' | 'collector' | 'learning'>('tree');
  const [speciesList, setSpeciesList] = useState<SpeciesData[]>([]);
  const [selectedSpecies, setSelectedSpecies] = useState<SpeciesData | null>(null);
  const [speciesToEdit, setSpeciesToEdit] = useState<SpeciesData | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isImportExportOpen, setIsImportExportOpen] = useState(false);
  const [treeHighlightId, setTreeHighlightId] = useState<string | undefined>(undefined);

  // Load species on initial mount
  useEffect(() => {
    const list = getStoredSpeciesList();
    setSpeciesList(list);
  }, []);

  // Safeguard: auto-reconcile in case memory state lacked newly introduced taxa (like Mollusca)
  useEffect(() => {
    if (speciesList.length > 0 && !speciesList.some(s => s.taxonomy.phylum?.includes('软体动物') || s.taxonomy.phylum?.includes('Mollusca'))) {
      const refreshed = getStoredSpeciesList();
      setSpeciesList(refreshed);
    }
  }, [speciesList]);

  // Handlers
  const handleSelectSpecies = useCallback((species: SpeciesData) => {
    setSelectedSpecies(species);
  }, []);

  const handleOpenAddModal = useCallback(() => {
    setSpeciesToEdit(null);
    setIsEditorOpen(true);
  }, []);

  const handleEditSpecies = useCallback((species: SpeciesData) => {
    setSpeciesToEdit(species);
    setIsEditorOpen(true);
  }, []);

  const handleSaveSpecies = useCallback((species: SpeciesData) => {
    const updated = saveSpeciesToStorage(species);
    setSpeciesList(updated);
  }, []);

  const handleDeleteSpecies = useCallback((id: string) => {
    const updated = deleteSpeciesFromStorage(id);
    setSpeciesList(updated);
    if (selectedSpecies?.id === id) {
      setSelectedSpecies(null);
    }
  }, [selectedSpecies]);

  const handleBatchDelete = useCallback((ids: string[]) => {
    const updated = batchDeleteSpeciesFromStorage(ids);
    setSpeciesList(updated);
  }, []);

  const handleBatchImport = useCallback((newItems: SpeciesData[], mergeMode: MergeStrategy = 'smart_merge') => {
    const updated = batchImportSpeciesToStorage(newItems, mergeMode);
    setSpeciesList(updated);
  }, []);

  const handleResetSeed = useCallback(() => {
    if (confirm('确定要恢复为中国国家权威标准种子物种库吗？这将重置为初始数据集。')) {
      const freshSeed = resetSpeciesStorageToSeed();
      setSpeciesList(freshSeed);
      alert('已成功重置为标准动植物种子数据集！');
    }
  }, []);

  const handleLocateInTree = useCallback((species: SpeciesData) => {
    setTreeHighlightId(species.id);
    setActiveTab('tree');
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Main Navigation & System Status */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        speciesList={speciesList}
        onOpenAddModal={handleOpenAddModal}
        onOpenImportExportModal={() => setIsImportExportOpen(true)}
        onResetSeed={handleResetSeed}
      />

      {/* Main Tab Content View */}
      <main className="flex-1 w-full flex flex-col">
        {activeTab === 'tree' && (
          <TaxonomyTreeView
            speciesList={speciesList}
            onSelectSpecies={handleSelectSpecies}
            selectedSpeciesId={treeHighlightId}
          />
        )}

        {activeTab === 'explorer' && (
          <TaxonomyExplorer
            speciesList={speciesList}
            onSelectSpecies={handleSelectSpecies}
            onEditSpecies={handleEditSpecies}
            onDeleteSpecies={handleDeleteSpecies}
            onLocateInTree={handleLocateInTree}
          />
        )}

        {activeTab === 'manage' && (
          <DataManagementCenter
            speciesList={speciesList}
            onOpenAddModal={handleOpenAddModal}
            onEditSpecies={handleEditSpecies}
            onDeleteSpecies={handleDeleteSpecies}
            onBatchDelete={handleBatchDelete}
            onSelectSpecies={handleSelectSpecies}
            onOpenImportExport={() => setIsImportExportOpen(true)}
            onResetSeed={handleResetSeed}
          />
        )}

        {activeTab === 'collector' && (
          <DataCollectorWorkbench
            onImportBatch={handleBatchImport}
            existingCount={speciesList.length}
            existingNames={[
              ...speciesList.map((s) => s.chineseName.trim()),
              ...speciesList.map((s) => s.scientificName.trim())
            ]}
          />
        )}

        {activeTab === 'learning' && (
          <TaxonomyLearningCenter
            speciesList={speciesList}
            onSelectSpecies={handleSelectSpecies}
          />
        )}
      </main>

      {/* Modals & Dialogs */}
      <SpeciesDetailModal
        species={selectedSpecies}
        onClose={() => setSelectedSpecies(null)}
        onEdit={handleEditSpecies}
        onLocateInTree={handleLocateInTree}
      />

      <SpeciesEditorModal
        speciesToEdit={speciesToEdit}
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        onSave={handleSaveSpecies}
      />

      <BatchImportExportModal
        isOpen={isImportExportOpen}
        onClose={() => setIsImportExportOpen(false)}
        speciesList={speciesList}
        onImportSuccess={handleBatchImport}
      />
    </div>
  );
}
