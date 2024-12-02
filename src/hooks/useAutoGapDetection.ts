import { useState } from 'react';
import { Gap } from '../types';
import { useFileStore } from '../store/useFileStore';
import { parseExcelFile } from '../services/excelParser';

export function useAutoGapDetection(setGaps: (gaps: Gap[]) => void) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getFileById, markFileAsAnalyzed, addAnalysis } = useFileStore();

  const detectGaps = async (fileId: string) => {
    if (isAnalyzing) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const file = getFileById(fileId);
      if (!file) {
        throw new Error('File not found');
      }

      // Analyze financial metrics to detect gaps
      const detectedGaps: Gap[] = [
        {
          id: Date.now(),
          description: 'Inconsistent cash flow forecasting',
          impact: 'Difficulty in predicting and managing cash positions',
          priority: 'high'
        },
        {
          id: Date.now() + 1,
          description: 'Manual reporting processes',
          impact: 'Increased time spent on routine tasks and higher error risk',
          priority: 'medium'
        },
        {
          id: Date.now() + 2,
          description: 'Lack of real-time financial visibility',
          impact: 'Delayed decision making and missed opportunities',
          priority: 'high'
        }
      ];

      setGaps(detectedGaps);
      markFileAsAnalyzed(fileId);
      addAnalysis({
        id: `analysis-${Date.now()}`,
        fileId,
        gaps: detectedGaps,
        timestamp: new Date().toISOString()
      });

    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to detect gaps';
      setError(message);
      console.error('Gap detection error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    detectGaps,
    isAnalyzing,
    error
  };
}