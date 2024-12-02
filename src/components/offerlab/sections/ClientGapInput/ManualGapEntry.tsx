import React from 'react';
import { Bot, Plus, X } from 'lucide-react';
import { Gap } from '../../../../types';

interface Props {
  gaps: Gap[];
  setGaps: (gaps: Gap[]) => void;
}

export function ManualGapEntry({ gaps, setGaps }: Props) {
  const addGap = () => {
    setGaps([...gaps, {
      id: Date.now(),
      description: '',
      impact: '',
      priority: 'medium'
    }]);
  };

  const removeGap = (id: number) => {
    setGaps(gaps.filter(gap => gap.id !== id));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Manual Gap Entry</h3>
          <p className="text-gray-600">Add or modify gaps manually</p>
        </div>
        <button
          onClick={addGap}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Gap
        </button>
      </div>

      {gaps.length === 0 ? (
        <div className="text-center py-12">
          <Bot className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">No gaps identified</h4>
          <p className="text-gray-500">Start by analyzing financial data or adding gaps manually</p>
        </div>
      ) : (
        <div className="space-y-4">
          {gaps.map(gap => (
            <div key={gap.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <input
                      type="text"
                      value={gap.description}
                      onChange={(e) => {
                        const updatedGaps = gaps.map(g =>
                          g.id === gap.id ? { ...g, description: e.target.value } : g
                        );
                        setGaps(updatedGaps);
                      }}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                      placeholder="Describe the financial gap..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Impact</label>
                    <textarea
                      value={gap.impact}
                      onChange={(e) => {
                        const updatedGaps = gaps.map(g =>
                          g.id === gap.id ? { ...g, impact: e.target.value } : g
                        );
                        setGaps(updatedGaps);
                      }}
                      rows={2}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                      placeholder="Describe the business impact..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select
                      value={gap.priority}
                      onChange={(e) => {
                        const updatedGaps = gaps.map(g =>
                          g.id === gap.id ? { ...g, priority: e.target.value as Gap['priority'] } : g
                        );
                        setGaps(updatedGaps);
                      }}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={() => removeGap(gap.id)}
                  className="ml-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}