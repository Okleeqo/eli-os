import { useState, useCallback } from 'react';
import { useProposalStore } from '../store/useProposalStore';

export function useGPTAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { gaps, services } = useProposalStore();

  const analyzeProposal = useCallback(async () => {
    if (isAnalyzing) return;
    
    setIsAnalyzing(true);
    setError(null);
    
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const proposal = `# Strategic Financial Advisory Proposal

## Executive Summary
Based on our analysis of ${gaps.length} identified gaps and opportunities...

## Detailed Recommendations
${gaps.map(gap => `### ${gap.description}\n${gap.impact}`).join('\n\n')}

## Proposed Services
${services.map(service => `### ${service.name}\n${service.description}\n\nDeliverables: ${service.deliverables}\n\nInvestment: $${service.price} per ${service.frequency}`).join('\n\n')}
`;

      setAnalysis(proposal);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to generate proposal';
      setError(message);
      console.error('Proposal Generation Error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  }, [gaps, services, isAnalyzing]);

  return {
    isAnalyzing,
    analysis,
    error,
    analyzeProposal
  };
}