import React from 'react';
import { FileDown } from 'lucide-react';
import { generateExcelTemplate } from '../../../utils/excelTemplate';

export function ExcelTemplate() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Excel Template</h3>
          <p className="text-gray-600">Download our standardized Excel template for financial data input</p>
        </div>
        <button
          onClick={generateExcelTemplate}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-[#4F46E5] bg-[#EEF2FF] rounded-lg hover:bg-[#E0E7FF] transition-colors"
        >
          <FileDown className="w-5 h-5 mr-2" />
          Download Template
        </button>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900">Balance Sheet</h4>
          <p className="text-sm text-gray-600">Assets, liabilities, and equity metrics for financial position analysis</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900">Income Statement</h4>
          <p className="text-sm text-gray-600">Revenue, costs, and profitability metrics for performance analysis</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900">Cash Flow</h4>
          <p className="text-sm text-gray-600">Operating, investing, and financing cash flow metrics</p>
        </div>
      </div>
    </div>
  );
}