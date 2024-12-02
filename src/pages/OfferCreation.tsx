import React from 'react';
import { OfferBuilder } from '../components/offerlab/OfferBuilder';

const OfferCreation: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      <div className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1920px] py-8">
        <div className="max-w-screen-xl mx-auto">
          <OfferBuilder />
        </div>
      </div>
    </div>
  );
};

export default OfferCreation;