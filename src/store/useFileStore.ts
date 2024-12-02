import { create } from 'zustand';
import { FileUpload, Analysis } from '../types';

interface FileStore {
  files: FileUpload[];
  analyses: Analysis[];
  addFile: (file: FileUpload) => void;
  removeFile: (id: string) => void;
  getFileById: (id: string) => FileUpload | undefined;
  markFileAsAnalyzed: (id: string) => void;
  addAnalysis: (analysis: Analysis) => void;
  getAnalysisForFile: (fileId: string) => Analysis | undefined;
}

export const useFileStore = create<FileStore>((set, get) => ({
  // ... rest of the store code
}));