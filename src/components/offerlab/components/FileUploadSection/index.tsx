import React, { useState } from 'react';
import { Upload, X, FileText, AlertTriangle, Loader, ChevronDown, ChevronUp } from 'lucide-react';
import { useFileStore } from '../../../../store/useFileStore';
import { useFileProcessing } from '../../../../hooks/useFileProcessing';
import { formatFileSize } from '../../../../utils/formatters';
import { Gap } from '../../../../types';

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

  return (
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

      {/* Uploaded Files List */}
      {files.length > 0 && (
        <div className="mt-8">
          <h4 className="text-sm font-medium text-gray-700 mb-4">Uploaded Files</h4>
          <div className="space-y-3">
            {files.map((file) => (
              <div key={file.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{file.name}</p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(file.size)} • {new Date(file.uploadDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {file.analyzed ? (
                      <button
                        onClick={() => setExpandedFile(expandedFile === file.id ? null : file.id)}
                        className="text-emerald-600 text-sm hover:text-emerald-700"
                      >
                        View Analysis {expandedFile === file.id ? <ChevronUp className="inline-block w-4 h-4" /> : <ChevronDown className="inline-block w-4 h-4" />}
                      </button>
                    ) : (
                      <button
                        onClick={() => onAnalyze(file.id)}
                        disabled={isAnalyzing}
                        className="text-blue-600 text-sm hover:text-blue-700"
                      >
                        {isAnalyzing ? (
                          <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                          'Analyze'
                        )}
                      </button>
                    )}
                    <button
                      onClick={() => removeFile(file.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}