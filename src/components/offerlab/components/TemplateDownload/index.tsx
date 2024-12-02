import React, { useState } from 'react';
import { FileDown, CheckCircle, AlertCircle } from 'lucide-react';
import { generateExcelTemplate } from '../../../../utils/excelTemplate';

export function TemplateDownload() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleDownload = () => {
    try {
      generateExcelTemplate();
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error('Error downloading template:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Excel Template</h3>
          <p className="text-gray-600">Download our standardized Excel template for financial data input</p>
        </div>
        <div className="flex items-center space-x-4">
          {status === 'success' && (
            <div className="flex items-center text-emerald-600">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span className="text-sm">Template downloaded</span>
            </div>
          )}
          {status === 'error' && (
            <div className="flex items-center text-red-600">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span className="text-sm">Download failed</span>
            </div>
          )}
          <button
            onClick={handleDownload}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
          >
            <FileDown className="h-5 w-5 mr-2" />
            Download Template
          </button>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <h4 className="font-medium text-gray-900 mb-2">Balance Sheet</h4>
          <p className="text-sm text-gray-600">Assets, liabilities, and equity metrics for financial position analysis</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <h4 className="font-medium text-gray-900 mb-2">Income Statement</h4>
          <p className="text-sm text-gray-600">Revenue, costs, and profitability metrics for performance analysis</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <h4 className="font-medium text-gray-900 mb-2">Cash Flow</h4>
          <p className="text-sm text-gray-600">Operating, investing, and financing cash flow metrics</p>
        </div>
      </div>
    </div>
  );
}