import React from 'react';
import { Gap } from '../../../../types';
import { ExcelTemplate } from './ExcelTemplate';
import { FileUploadSection } from './FileUploadSection';
import { GapIdentification } from './GapIdentification';
import { ManualGapEntry } from './ManualGapEntry';

interface Props {
  gaps: Gap[];
  setGaps: (gaps: Gap[]) => void;
}

export function ClientGapInput({ gaps = [], setGaps }: Props) {
  const handleGapsDetected = (detectedGaps: Gap[]) => {
    setGaps(detectedGaps);
  };

  return (
    <div className="space-y-8">
      <ExcelTemplate />
      <FileUploadSection onGapsDetected={handleGapsDetected} />
      <GapIdentification gaps={gaps} isLoading={false} error={null} />
      <ManualGapEntry gaps={gaps} setGaps={setGaps} />
    </div>
  );
}