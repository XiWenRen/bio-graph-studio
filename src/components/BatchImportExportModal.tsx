import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Upload, 
  FileJson, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Database,
  ArrowDownToLine,
  ArrowUpFromLine
} from 'lucide-react';
import { MergeStrategy, SpeciesData } from '../types';
import { 
  exportSpeciesToJSON, 
  exportSpeciesToCSV, 
  importSpeciesFromJSONString, 
  importSpeciesFromCSVString 
} from '../services/storageService';

interface BatchImportExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  speciesList: SpeciesData[];
  onImportSuccess: (imported: SpeciesData[], mergeMode?: MergeStrategy) => void;
}

export const BatchImportExportModal: React.FC<BatchImportExportModalProps> = ({
  isOpen,
  onClose,
  speciesList,
  onImportSuccess
}) => {
  const [activeTab, setActiveTab] = useState<'export' | 'import'>('export');
  const [importFormat, setImportFormat] = useState<'json' | 'csv'>('json');
  const [importText, setImportText] = useState('');
  const [mergeStrategy, setMergeStrategy] = useState<MergeStrategy>('smart_merge');
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  // Export handlers
  const handleDownloadJSON = () => {
    const jsonStr = exportSpeciesToJSON(speciesList);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `china_biotaxa_dataset_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadCSV = () => {
    const csvStr = exportSpeciesToCSV(speciesList);
    const blob = new Blob(['\uFEFF' + csvStr], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `china_biotaxa_dataset_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import handler
  const handleExecuteImport = () => {
    setImportError(null);
    setImportSuccess(null);

    if (!importText.trim()) {
      setImportError('请先粘贴或上传要导入的 JSON / CSV 文本数据');
      return;
    }

    try {
      let imported: SpeciesData[] = [];
      if (importFormat === 'json') {
        imported = importSpeciesFromJSONString(importText);
      } else {
        imported = importSpeciesFromCSVString(importText);
      }

      if (imported.length === 0) {
        throw new Error('未解析到有效的物种记录，请检查数据格式是否正确');
      }

      onImportSuccess(imported, mergeStrategy);
      setImportSuccess(`成功批量导入并按【${mergeStrategy === 'smart_merge' ? '智能合并' : mergeStrategy === 'overwrite' ? '覆盖' : mergeStrategy === 'skip' ? '跳过重复' : '副本并存'}】策略同步 ${imported.length} 种物种数据！`);
      setImportText('');
    } catch (e: any) {
      setImportError(e.message || '导入解析失败，请检查格式');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isCsv = file.name.endsWith('.csv');
    setImportFormat(isCsv ? 'csv' : 'json');

    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target?.result as string;
      setImportText(text);
    };
    reader.readAsText(file, 'utf-8');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-2xl w-full flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <Database className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold text-white">生物分类数据批量导入与导出</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="px-6 pt-4 border-b border-slate-800 flex gap-4">
          <button
            onClick={() => setActiveTab('export')}
            className={`pb-3 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 cursor-pointer transition ${
              activeTab === 'export'
                ? 'border-emerald-500 text-emerald-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ArrowDownToLine className="w-4 h-4" />
            <span>批量导出数据 ({speciesList.length} 种)</span>
          </button>
          <button
            onClick={() => setActiveTab('import')}
            className={`pb-3 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 cursor-pointer transition ${
              activeTab === 'import'
                ? 'border-emerald-500 text-emerald-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ArrowUpFromLine className="w-4 h-4" />
            <span>批量导入数据</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 text-xs sm:text-sm text-slate-300">
          {activeTab === 'export' ? (
            /* EXPORT TAB */
            <div className="space-y-4">
              <p className="text-slate-400">
                将当前系统中的全部动植物分类学数据导出为通用格式，便于在 Excel、科研文献或外部知识图谱系统中归档与分析。
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <button
                  onClick={handleDownloadJSON}
                  className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500 flex flex-col items-center justify-center gap-2 group transition text-center cursor-pointer"
                >
                  <FileJson className="w-10 h-10 text-emerald-400 group-hover:scale-110 transition duration-300" />
                  <span className="font-bold text-white text-sm">导出为标准 JSON 格式</span>
                  <span className="text-[11px] text-slate-500">保留完整的七级阶元对象、演化历史及引用</span>
                </button>

                <button
                  onClick={handleDownloadCSV}
                  className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-blue-500 flex flex-col items-center justify-center gap-2 group transition text-center cursor-pointer"
                >
                  <FileSpreadsheet className="w-10 h-10 text-blue-400 group-hover:scale-110 transition duration-300" />
                  <span className="font-bold text-white text-sm">导出为 CSV 表格 (Excel 兼容)</span>
                  <span className="text-[11px] text-slate-500">适合在电子表格中进行分类学统计和检索</span>
                </button>
              </div>
            </div>
          ) : (
            /* IMPORT TAB */
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">导入格式:</span>
                  <div className="flex bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-xs">
                    <button
                      onClick={() => setImportFormat('json')}
                      className={`px-3 py-1 rounded-md ${
                        importFormat === 'json' ? 'bg-emerald-600 text-white font-medium' : 'text-slate-400'
                      }`}
                    >
                      JSON
                    </button>
                    <button
                      onClick={() => setImportFormat('csv')}
                      className={`px-3 py-1 rounded-md ${
                        importFormat === 'csv' ? 'bg-emerald-600 text-white font-medium' : 'text-slate-400'
                      }`}
                    >
                      CSV
                    </button>
                  </div>
                </div>

                <label className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg border border-slate-700 cursor-pointer flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5" />
                  <span>上传文件 (.json / .csv)</span>
                  <input type="file" accept=".json,.csv" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>

              {/* Merge Strategy Select */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5">
                <label className="text-xs font-semibold text-emerald-400 block">重复数据合并策略：</label>
                <select
                  value={mergeStrategy}
                  onChange={(e) => setMergeStrategy(e.target.value as MergeStrategy)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="smart_merge">🌿 智能增量融合 (保留高清图片/标签，自动补全阶元与文献 - 推荐)</option>
                  <option value="overwrite">🔄 权威覆盖 (完全替换已有同名物种)</option>
                  <option value="skip">🛡️ 跳过重复项 (仅导入全新物种)</option>
                  <option value="keep_both">📑 副本并存 (生成带“采集副本”的独立记录)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">粘贴数据内容：</label>
                <textarea
                  rows={6}
                  placeholder={
                    importFormat === 'json'
                      ? '[{"chineseName": "白鱀豚", "scientificName": "Lipotes vexillifer", ...}]'
                      : '中文正名,拉丁学名,界,门,纲,目,科,属,种,保护等级...'
                  }
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 font-mono text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              {importError && (
                <div className="p-3 bg-rose-950/80 border border-rose-800 rounded-xl text-xs text-rose-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{importError}</span>
                </div>
              )}

              {importSuccess && (
                <div className="p-3 bg-emerald-950/80 border border-emerald-800 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{importSuccess}</span>
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleExecuteImport}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition cursor-pointer shadow-lg shadow-emerald-950/40"
                >
                  <Upload className="w-4 h-4" />
                  <span>解析并批量入库</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
