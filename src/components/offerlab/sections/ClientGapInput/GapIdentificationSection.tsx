import React from 'react';
import { Bot } from 'lucide-react';

export function GapIdentificationSection() {
  const commonGaps = [
    'Inconsistent cash flow forecasting',
    'Lack of real-time financial visibility',
    'Manual reporting processes',
    'Inefficient budgeting system'
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-emerald-100 rounded-lg">
          <Bot className="w-6 h-6 text-emerald-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Identifying Financial Gaps</h3>
          <p className="text-gray-600">Start by identifying key financial and operational challenges your client faces. Consider areas like:</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {commonGaps.map((gap, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
              <p className="text-gray-700">{gap}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}