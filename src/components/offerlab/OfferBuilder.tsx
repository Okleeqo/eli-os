import React, { useState } from 'react';
import { ClientGapInput } from './sections/ClientGapInput';
import { ServiceParameters } from './sections/ServiceParameters';
import { ProposalPreview } from './sections/ProposalPreview';
import { useProposalStore } from '../../store/useProposalStore';
import { Gap } from '../../types';

export function OfferBuilder() {
  const [activeTab, setActiveTab] = useState(0);
  const { gaps = [], services = [], setGaps, setServices } = useProposalStore();

  const handleGapsUpdate = (newGaps: Gap[]) => {
    setGaps(Array.isArray(newGaps) ? newGaps : []);
  };

  const tabs = [
    { 
      title: 'Client Gaps', 
      content: <ClientGapInput 
        gaps={Array.isArray(gaps) ? gaps : []} 
        setGaps={handleGapsUpdate} 
      /> 
    },
    { 
      title: 'Service Parameters', 
      content: <ServiceParameters 
        services={Array.isArray(services) ? services : []} 
        setServices={setServices} 
      /> 
    },
    { 
      title: 'Preview Proposal', 
      content: <ProposalPreview 
        gaps={Array.isArray(gaps) ? gaps : []} 
        services={Array.isArray(services) ? services : []} 
      /> 
    },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 text-transparent bg-clip-text mb-2">
          Create Your Proposal
        </h1>
        <p className="text-gray-600 text-lg">
          Follow the steps below to build your customized financial advisory proposal
        </p>
      </div>
      
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-12">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`relative px-8 py-3 rounded-full font-medium ${
              activeTab === index 
                ? 'bg-[#34D399] text-white shadow-lg' 
                : 'bg-white text-gray-500'
            }`}
          >
            {tab.title}
            {activeTab === index && (
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="w-1 h-1 bg-[#34D399] rounded-full"></div>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-8">
        {tabs[activeTab].content}
      </div>

      {/* Navigation */}
      <div className="fixed bottom-8 inset-x-0 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-100 p-4 flex justify-between items-center">
          <button
            onClick={() => setActiveTab(Math.max(0, activeTab - 1))}
            disabled={activeTab === 0}
            className={`px-6 py-3 rounded-xl font-medium ${
              activeTab === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Previous
          </button>

          <div className="flex items-center space-x-2">
            {tabs.map((_, index) => (
              <div
                key={index}
                className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                  index === activeTab
                    ? 'bg-emerald-600 scale-125'
                    : index < activeTab
                    ? 'bg-emerald-200'
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setActiveTab(Math.min(tabs.length - 1, activeTab + 1))}
            disabled={activeTab === tabs.length - 1}
            className={`px-6 py-3 rounded-xl font-medium ${
              activeTab === tabs.length - 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-md hover:shadow-lg'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}