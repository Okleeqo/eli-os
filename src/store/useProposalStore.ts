import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Gap, Service } from '../types';

interface ProposalState {
  gaps: Gap[];
  services: Service[];
  setGaps: (gaps: Gap[]) => void;
  setServices: (services: Service[]) => void;
  saveData: () => void;
}

export const useProposalStore = create<ProposalState>()(
  persist(
    (set) => ({
      gaps: [],
      services: [],
      setGaps: (gaps) => set({ gaps }),
      setServices: (services) => set({ services }),
      saveData: () => {
        console.log('Saving proposal data...');
      }
    }),
    {
      name: 'proposal-store'
    }
  )
);