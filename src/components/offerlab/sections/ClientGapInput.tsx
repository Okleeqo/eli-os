import React, { useState } from 'react';
import { Upload, FileDown, Bot, Plus, X, AlertTriangle } from 'lucide-react';
import { Gap } from '../../../types';

interface Props {
  gaps: Gap[];
  setGaps: (gaps: Gap[]) => void;
}

export function ClientGapInput({ gaps, setGaps }: Props) {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // File upload logic
  };

  return (
    <div className="space-y-8">
      {/* AI-Powered Gap Detection Section */}
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-8 shadow-lg border border-orange-100">
        <div className="flex items-center space-x-4 mb-6">
          <div className="p-3 bg-orange-100 rounded-2xl">
            <Bot className="w-8 h-8 text-orange-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">AI-Powered Gap Detection</h2>
            <p className="text-gray-600 mt-1">Upload financial documents or data to automatically identify potential gaps:</p>
          </div>
        </div>

        {/* Excel Template Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Excel Template</h3>
              <p className="text-gray-600 mt-1">Download our standardized Excel template for financial data input</p>
            </div>
            <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md">
              <FileDown className="w-5 h-5 mr-2" />
              Download Template
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-6">
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-medium text-gray-900">Balance Sheet</h4>
              <p className="text-sm text-gray-600 mt-1">Assets, liabilities, and equity metrics for financial position analysis</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-medium text-gray-900">Income Statement</h4>
              <p className="text-sm text-gray-600 mt-1">Revenue, costs, and profitability metrics for performance analysis</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-medium text-gray-900">Cash Flow</h4>
              <p className="text-sm text-gray-600 mt-1">Operating, investing, and financing cash flow metrics</p>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Upload Financial Documents</h3>
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-8">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileUpload}
              accept=".csv,.xlsx,.xls"
            />
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center cursor-pointer"
            >
              <Upload className="w-12 h-12 text-gray-400 mb-4" />
              <span className="text-sm font-medium text-gray-900">Choose File</span>
              <span className="text-sm text-gray-500 mt-1">or drag and drop</span>
              <span className="text-xs text-gray-400 mt-2">CSV, Excel, or PDF files</span>
            </label>
          </div>
        </div>
      </div>

      {/* Gap Identification Section */}
      <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-8 shadow-lg border border-emerald-100">
        <div className="flex items-center space-x-4 mb-6">
          <div className="p-3 bg-emerald-100 rounded-2xl">
            <Bot className="w-8 h-8 text-emerald-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Identifying Financial Gaps</h2>
            <p className="text-gray-600 mt-1">Start by identifying key financial and operational challenges your client faces. Consider areas like:</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            'Inconsistent cash flow forecasting',
            'Lack of real-time financial visibility',
            'Manual reporting processes',
            'Inefficient budgeting system'
          ].map((gap, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                <span className="text-gray-700">{gap}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Client Gaps Analysis Section */}
      <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Client Gaps Analysis</h2>
            <p className="text-gray-600 mt-1">Document and prioritize financial challenges</p>
          </div>
          <button
            onClick={() => setGaps([...gaps, { id: Date.now(), description: '', impact: '', priority: 'medium' }])}
            className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Gap
          </button>
        </div>

        {gaps.length === 0 ? (
          <div className="text-center py-12">
            <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No gaps identified</h3>
            <p className="text-gray-500 mt-2">Start by adding the first financial gap for your client</p>
            <button
              onClick={() => setGaps([...gaps, { id: Date.now(), description: '', impact: '', priority: 'medium' }])}
              className="mt-6 inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add First Gap
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {gaps.map((gap, index) => (
              <div key={gap.id} className="bg-gray-50 rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="flex-1 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <input
                        type="text"
                        value={gap.description}
                        onChange={(e) => {
                          const updatedGaps = [...gaps];
                          updatedGaps[index].description = e.target.value;
                          setGaps(updatedGaps);
                        }}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Describe the financial gap..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Impact</label>
                      <textarea
                        value={gap.impact}
                        onChange={(e) => {
                          const updatedGaps = [...gaps];
                          updatedGaps[index].impact = e.target.value;
                          setGaps(updatedGaps);
                        }}
                        rows={2}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Describe the business impact..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                      <select
                        value={gap.priority}
                        onChange={(e) => {
                          const updatedGaps = [...gaps];
                          updatedGaps[index].priority = e.target.value as Gap['priority'];
                          setGaps(updatedGaps);
                        }}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      >
                        <option value="low">Low Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="high">High Priority</option>
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={() => setGaps(gaps.filter((_, i) => i !== index))}
                    className="ml-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}