import React from 'react';
import { ArrowRight } from 'lucide-react';

export function GapIdentification() {
  const commonGaps = [
    'Inconsistent cash flow forecasting',
    'Lack of real-time financial visibility',
    'Manual reporting processes',
    'Inefficient budgeting system'
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Identifying Financial Gaps</h3>
      <p className="text-gray-600 mb-6">Start by identifying key financial and operational challenges your client faces. Consider areas like:</p>

      <div className="grid grid-cols-2 gap-4">
        {commonGaps.map((gap, index) => (
          <div key={index} className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg">
            <ArrowRight className="w-5 h-5 text-emerald-500" />
            <span className="text-gray-700">{gap}</span>
          </div>
        ))}
      </div>
    </div>
  );
}