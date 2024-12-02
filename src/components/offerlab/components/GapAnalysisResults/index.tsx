import React from 'react';
import { BarChart3, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { Gap } from '../../../../types';

interface Props {
  gaps: Gap[];
  isLoading: boolean;
  error: string | null;
}

export function GapAnalysisResults({ gaps, isLoading, error }: Props) {
  const highPriorityGaps = gaps.filter(gap => gap.priority === 'high');
  const mediumPriorityGaps = gaps.filter(gap => gap.priority === 'medium');
  const lowPriorityGaps = gaps.filter(gap => gap.priority === 'low');

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-500" />
          <span className="text-gray-600">Analyzing financial data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-6 w-6 text-red-500 mt-0.5" />
          <div>
            <h3 className="text-red-800 font-medium mb-1">Analysis Error</h3>
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-red-50 to-red-100/50 rounded-xl p-6 border border-red-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-red-900 font-medium">High Priority</h3>
            <div className="bg-red-500/10 p-2 rounded-lg">
              <TrendingUp className="h-5 w-5 text-red-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-red-700">{highPriorityGaps.length}</p>
          <p className="text-sm text-red-600 mt-1">Critical gaps requiring immediate attention</p>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl p-6 border border-amber-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-amber-900 font-medium">Medium Priority</h3>
            <div className="bg-amber-500/10 p-2 rounded-lg">
              <BarChart3 className="h-5 w-5 text-amber-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-amber-700">{mediumPriorityGaps.length}</p>
          <p className="text-sm text-amber-600 mt-1">Gaps requiring strategic planning</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl p-6 border border-green-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-green-900 font-medium">Low Priority</h3>
            <div className="bg-green-500/10 p-2 rounded-lg">
              <TrendingDown className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-green-700">{lowPriorityGaps.length}</p>
          <p className="text-sm text-green-600 mt-1">Opportunities for optimization</p>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Detailed Gap Analysis</h3>
        
        {gaps.length === 0 ? (
          <div className="text-center py-8">
            <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No gaps detected in the financial data.</p>
            <p className="text-sm text-gray-500 mt-2">Try uploading different financial data or adjusting the analysis parameters.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {highPriorityGaps.length > 0 && (
              <div>
                <h4 className="text-red-700 font-medium mb-3">High Priority Gaps</h4>
                <div className="space-y-3">
                  {highPriorityGaps.map((gap, index) => (
                    <div key={index} className="bg-red-50 rounded-lg p-4 border border-red-100">
                      <h5 className="font-medium text-red-900 mb-2">{gap.description}</h5>
                      <p className="text-red-700 text-sm">{gap.impact}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {mediumPriorityGaps.length > 0 && (
              <div>
                <h4 className="text-amber-700 font-medium mb-3">Medium Priority Gaps</h4>
                <div className="space-y-3">
                  {mediumPriorityGaps.map((gap, index) => (
                    <div key={index} className="bg-amber-50 rounded-lg p-4 border border-amber-100">
                      <h5 className="font-medium text-amber-900 mb-2">{gap.description}</h5>
                      <p className="text-amber-700 text-sm">{gap.impact}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {lowPriorityGaps.length > 0 && (
              <div>
                <h4 className="text-green-700 font-medium mb-3">Low Priority Gaps</h4>
                <div className="space-y-3">
                  {lowPriorityGaps.map((gap, index) => (
                    <div key={index} className="bg-green-50 rounded-lg p-4 border border-green-100">
                      <h5 className="font-medium text-green-900 mb-2">{gap.description}</h5>
                      <p className="text-green-700 text-sm">{gap.impact}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}