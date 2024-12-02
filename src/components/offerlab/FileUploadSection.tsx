import React, { useState } from 'react';
import { Upload, X, FileText, AlertTriangle, Loader, ChevronDown, ChevronUp, BarChart3 } from 'lucide-react';
import { useFileStore } from '../../store/useFileStore';
import { useFileProcessing } from '../../hooks/useFileProcessing';
import { formatFileSize } from '../../utils/formatters';
import { Gap } from '../../types';

interface Props {
  onAnalyze: (fileId: string) => Promise<void>;
  isAnalyzing: boolean;
  onGapsDetected?: (gaps: Gap[]) => void;
}

export function FileUploadSection({ onAnalyze, isAnalyzing, onGapsDetected }: Props) {
  const { files, removeFile, analyses, getAnalysisForFile } = useFileStore();
  const { processFile, isProcessing, error } = useFileProcessing();
  const [expandedFile, setExpandedFile] = useState<string | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const result = await processFile(file);
    if (result) {
      await onAnalyze(result.id);
      const analysis = getAnalysisForFile(result.id);
      if (analysis && onGapsDetected) {
        onGapsDetected(analysis.gaps);
      }
    }
  };

  const toggleFileExpansion = (fileId: string) => {
    setExpandedFile(expandedFile === fileId ? null : fileId);
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="bg-gradient-to-br from-amber-50 via-white to-orange-50 rounded-2xl p-8 shadow-lg border border-amber-100/20">
        <div className="flex items-start space-x-6">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Upload Financial Documents</h3>
            <p className="text-gray-600 mb-6">Upload your financial data for AI-powered gap analysis</p>
            
            <label className="flex-1">
              <input
                type="file"
                className="hidden"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileUpload}
                disabled={isProcessing || isAnalyzing}
              />
              <div className="flex items-center justify-center px-6 py-4 border-2 border-dashed border-amber-200 rounded-xl hover:border-amber-400 transition-colors cursor-pointer bg-white/50">
                <Upload className="h-5 w-5 text-amber-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">
                  {isProcessing ? 'Processing...' : 'Choose File'}
                </span>
              </div>
            </label>

            <p className="text-sm text-gray-500 mt-4">
              Supported formats: CSV or Excel files containing financial metrics
            </p>

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                <AlertTriangle className="h-4 w-4 inline-block mr-2" />
                {error}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Uploaded Files List */}
      {files.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h4 className="text-lg font-semibold mb-4">Uploaded Files</h4>
          <div className="space-y-3">
            {files.map((file) => {
              const analysis = getAnalysisForFile(file.id);
              const isExpanded = expandedFile === file.id;

              return (
                <div
                  key={file.id}
                  className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden"
                >
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{file.name}</p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(file.size)} • {new Date(file.uploadDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {file.analyzed ? (
                        <button
                          onClick={() => toggleFileExpansion(file.id)}
                          className="flex items-center space-x-1 text-xs text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full hover:bg-emerald-100 transition-colors"
                        >
                          <span>View Analysis</span>
                          {isExpanded ? (
                            <ChevronUp className="h-3 w-3" />
                          ) : (
                            <ChevronDown className="h-3 w-3" />
                          )}
                        </button>
                      ) : (
                        <button
                          onClick={() => onAnalyze(file.id)}
                          disabled={isAnalyzing}
                          className="text-xs text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors"
                        >
                          {isAnalyzing ? (
                            <Loader className="h-3 w-3 animate-spin" />
                          ) : (
                            'Analyze'
                          )}
                        </button>
                      )}
                      <button
                        onClick={() => removeFile(file.id)}
                        className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {isExpanded && analysis && (
                    <div className="border-t border-gray-200 p-4 bg-white">
                      <div className="flex items-center justify-between mb-4">
                        <h5 className="text-sm font-medium text-gray-900">Analysis Results</h5>
                        <BarChart3 className="h-4 w-4 text-gray-500" />
                      </div>
                      <div className="space-y-4">
                        {analysis.gaps.map((gap, index) => (
                          <div
                            key={index}
                            className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-900">
                                {gap.description}
                              </span>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                gap.priority === 'high' 
                                  ? 'bg-red-100 text-red-700'
                                  : gap.priority === 'medium'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-green-100 text-green-700'
                              }`}>
                                {gap.priority.charAt(0).toUpperCase() + gap.priority.slice(1)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">{gap.impact}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}