import React, { useState } from 'react';
import { Upload, X, FileText } from 'lucide-react';
import { useFileStore } from '../../../store/useFileStore';
import { useFileProcessing } from '../../../hooks/useFileProcessing';
import { formatFileSize } from '../../../utils/formatters';
import { Gap } from '../../../types';

interface Props {
  onAnalyze: (fileId: string) => Promise<void>;
  isAnalyzing: boolean;
  onGapsDetected?: (gaps: Gap[]) => void;
}

export function FileUploadSection({ onAnalyze, isAnalyzing, onGapsDetected }: Props) {
  const { files, removeFile } = useFileStore();
  const { processFile, isProcessing, error } = useFileProcessing();

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
    <div className="bg-white rounded-xl shadow-sm">
      {/* Upload Section */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900">Upload Financial Documents</h3>
        <p className="text-gray-600 mb-6">Upload your financial data for AI-powered gap analysis</p>

        <div className="border-2 border-dashed border-[#FCD34D] rounded-lg p-6 text-center">
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileUpload}
            disabled={isProcessing || isAnalyzing}
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Upload className="w-5 h-5 mr-2" />
            Choose File
          </label>
          <p className="mt-2 text-sm text-gray-500">
            Supported formats: CSV or Excel files containing financial metrics
          </p>
        </div>
      </div>

      {/* Uploaded Files */}
      {files.length > 0 && (
        <div className="border-t border-gray-200 p-6">
          <h4 className="text-sm font-medium text-gray-700 mb-4">Uploaded Files</h4>
          <div className="space-y-3">
            {files.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <FileText className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)} • {new Date(file.uploadDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => onAnalyze(file.id)}
                    disabled={isAnalyzing}
                    className="text-xs text-emerald-600 hover:text-emerald-700"
                  >
                    View Analysis
                  </button>
                  <button
                    onClick={() => removeFile(file.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}