import React from 'react';
import {
  Upload,
  X,
  FileText,
  AlertTriangle,
  Loader,
  ChevronDown,
  ChevronUp,
  BarChart3,
} from 'lucide-react';
import { useFileStore } from '../../../store/useFileStore';
import { useFileProcessing } from '../../../hooks/useFileProcessing';
import { formatFileSize } from '../../../utils/formatters';
import { Gap } from '../../../types';
import { TemplateDownload } from '/src/components/offerlab/components/TemplateDownload'; // Correct import

interface Props {
  onAnalyze: (fileId: string) => Promise<void>;
  isAnalyzing: boolean;
  onGapsDetected?: (gaps: Gap[]) => void;
}

export function FileUploadSection({ onAnalyze, isAnalyzing, onGapsDetected }: Props) {
  return (
    <div className="file-upload-section">
      <h1 className="text-2xl font-bold">Upload File</h1>
      {/* File upload UI */}
      <div className="file-upload-container">
        <Upload className="icon" />
        <p>Drag and drop your file here, or click to browse</p>
      </div>

      {/* Integrate TemplateDownload */}
      <TemplateDownload />

      {isAnalyzing && (
        <div className="loading-indicator">
          <Loader className="icon animate-spin" />
          <p>Analyzing file...</p>
        </div>
      )}

      {/* Other functionality */}
    </div>
  );
}
