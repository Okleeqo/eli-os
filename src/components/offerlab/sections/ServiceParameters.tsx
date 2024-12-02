import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  BarChart2, 
  Package, 
  Target, 
  Wallet, 
  LineChart, 
  GitBranch, 
  Brain, 
  Calculator, 
  PieChart, 
  Shield,
  Plus,
  X
} from 'lucide-react';
import { Service } from '../../../types';

interface Props {
  services: Service[];
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
}

export function ServiceParameters({ services, setServices }: Props) {
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customService, setCustomService] = useState({
    name: '',
    price: '',
    description: '',
    deliverables: '',
    frequency: 'monthly' as const
  });

  const serviceTemplates = [
    {
      name: "Profitability Enhancement Program",
      description: "Comprehensive analysis and optimization of profitability metrics",
      deliverables: [
        "Monthly profit analysis",
        "Margin optimization roadmap",
        "Pricing strategy review",
        "Cost reduction recommendations",
        "Performance tracking dashboard"
      ],
      price: "4,500",
      frequency: "monthly",
      icon: TrendingUp,
      iconBg: "bg-emerald-500",
      gradient: "from-emerald-500 to-green-500"
    },
    {
      name: "Cash Flow Management Suite",
      description: "Strategic cash flow optimization and forecasting",
      deliverables: [
        "Weekly cash flow forecasts",
        "Working capital optimization",
        "Cash conversion cycle analysis",
        "Liquidity management strategy",
        "Cash flow dashboard"
      ],
      price: "3,800",
      frequency: "monthly",
      icon: DollarSign,
      iconBg: "bg-blue-500",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      name: "Financial Analytics Package",
      description: "Advanced financial metrics and KPI tracking",
      deliverables: [
        "Custom KPI dashboard",
        "Trend analysis reports",
        "Benchmark comparisons",
        "Performance insights",
        "Monthly strategy sessions"
      ],
      price: "3,200",
      frequency: "monthly",
      icon: BarChart2,
      iconBg: "bg-purple-500",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      name: "Strategic Growth Planning",
      description: "Data-driven growth strategy development",
      deliverables: [
        "Market opportunity analysis",
        "Growth roadmap development",
        "Financial modeling",
        "Risk assessment",
        "Quarterly strategy reviews"
      ],
      price: "5,500",
      frequency: "quarterly",
      icon: Target,
      iconBg: "bg-red-500",
      gradient: "from-red-500 to-red-600"
    },
    {
      name: "Investment Strategy Service",
      description: "Comprehensive investment planning and analysis",
      deliverables: [
        "Portfolio analysis",
        "Investment recommendations",
        "Risk assessment",
        "Performance tracking",
        "Monthly review calls"
      ],
      price: "4,200",
      frequency: "monthly",
      icon: LineChart,
      iconBg: "bg-indigo-500",
      gradient: "from-indigo-500 to-indigo-600"
    },
    {
      name: "Risk Management Program",
      description: "Enterprise risk assessment and mitigation",
      deliverables: [
        "Risk assessment matrix",
        "Mitigation strategies",
        "Compliance review",
        "Insurance analysis",
        "Quarterly risk reports"
      ],
      price: "4,800",
      frequency: "quarterly",
      icon: Shield,
      iconBg: "bg-orange-500",
      gradient: "from-orange-500 to-orange-600"
    },
    {
      name: "M&A Advisory Package",
      description: "Merger and acquisition strategic support",
      deliverables: [
        "Deal valuation",
        "Due diligence support",
        "Integration planning",
        "Synergy analysis",
        "Transaction advisory"
      ],
      price: "6,500",
      frequency: "monthly",
      icon: GitBranch,
      iconBg: "bg-pink-500",
      gradient: "from-pink-500 to-pink-600"
    },
    {
      name: "Financial Transformation",
      description: "Complete financial process optimization",
      deliverables: [
        "Process assessment",
        "Technology evaluation",
        "Implementation roadmap",
        "Change management",
        "ROI tracking"
      ],
      price: "5,800",
      frequency: "monthly",
      icon: Brain,
      iconBg: "bg-cyan-500",
      gradient: "from-cyan-500 to-cyan-600"
    },
    {
      name: "Tax Strategy Optimization",
      description: "Strategic tax planning and optimization",
      deliverables: [
        "Tax structure review",
        "Planning opportunities",
        "Compliance assessment",
        "Savings calculations",
        "Implementation support"
      ],
      price: "4,300",
      frequency: "quarterly",
      icon: Calculator,
      iconBg: "bg-teal-500",
      gradient: "from-teal-500 to-teal-600"
    },
    {
      name: "Business Intelligence Suite",
      description: "Advanced analytics and reporting package",
      deliverables: [
        "Custom dashboards",
        "Data visualization",
        "Automated reporting",
        "Insight generation",
        "Monthly reviews"
      ],
      price: "3,900",
      frequency: "monthly",
      icon: PieChart,
      iconBg: "bg-violet-500",
      gradient: "from-violet-500 to-violet-600"
    },
    {
      name: "Supply Chain Finance",
      description: "Supply chain financial optimization",
      deliverables: [
        "Working capital analysis",
        "Vendor financing options",
        "Payment term optimization",
        "Cost reduction strategies",
        "Performance tracking"
      ],
      price: "4,600",
      frequency: "monthly",
      icon: Package,
      iconBg: "bg-amber-500",
      gradient: "from-amber-500 to-amber-600"
    },
    {
      name: "Treasury Management",
      description: "Comprehensive treasury operations service",
      deliverables: [
        "Cash management",
        "Investment strategies",
        "Banking relationships",
        "Liquidity planning",
        "Monthly reporting"
      ],
      price: "4,100",
      frequency: "monthly",
      icon: Wallet,
      iconBg: "bg-lime-500",
      gradient: "from-lime-500 to-lime-600"
    }
  ];

  const addService = (template: typeof serviceTemplates[0]) => {
    setServices([...services, {
      id: Date.now(),
      name: template.name,
      description: template.description,
      deliverables: template.deliverables.join(', '),
      frequency: template.frequency as Service['frequency'],
      price: template.price
    }]);
  };

  const handleCustomServiceSubmit = () => {
    if (customService.name && customService.price && customService.description && customService.deliverables) {
      setServices([...services, {
        id: Date.now(),
        ...customService
      }]);
      setCustomService({
        name: '',
        price: '',
        description: '',
        deliverables: '',
        frequency: 'monthly'
      });
      setShowCustomForm(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Service Templates Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Service Templates</h2>
        <p className="text-gray-600 mt-2">Choose from our pre-configured service packages</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
          {serviceTemplates.map((template, index) => {
            const Icon = template.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`p-3 rounded-xl ${template.iconBg} text-white`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                      <div className="text-sm text-gray-500">per {template.frequency}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">${template.price}</div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{template.description}</p>

                  <div className="space-y-3">
                    <div className="text-sm font-medium text-gray-700">Deliverables:</div>
                    <ul className="space-y-2">
                      {template.deliverables.map((item, i) => (
                        <li key={i} className="flex items-center text-sm text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-2"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => addService(template)}
                    className="mt-6 w-full px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl font-medium transition-colors duration-200"
                  >
                    Select Package
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Custom Services Section */}
      <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Custom Services</h2>
            <p className="text-gray-600 mt-1">Configure your own service offerings</p>
          </div>
          <button
            onClick={() => setShowCustomForm(true)}
            className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Service
          </button>
        </div>

        {showCustomForm && (
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-lg font-semibold text-gray-900">New Service</h3>
              <button
                onClick={() => setShowCustomForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={customService.name}
                    onChange={(e) => setCustomService({ ...customService, name: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="e.g., Cash Flow Management Suite"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">$</span>
                    <input
                      type="text"
                      value={customService.price}
                      onChange={(e) => setCustomService({ ...customService, price: e.target.value })}
                      className="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="4,800"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={customService.description}
                  onChange={(e) => setCustomService({ ...customService, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Comprehensive description of your service..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deliverables <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={customService.deliverables}
                  onChange={(e) => setCustomService({ ...customService, deliverables: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="List the key deliverables, separated by commas..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Frequency
                </label>
                <select
                  value={customService.frequency}
                  onChange={(e) => setCustomService({ ...customService, frequency: e.target.value as 'weekly' | 'monthly' | 'quarterly' })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                </select>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowCustomForm(false)}
                  className="px-6 py-3 text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCustomServiceSubmit}
                  className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Add Service
                </button>
              </div>
            </div>
          </div>
        )}

        {services.length > 0 && (
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Selected Services</h3>
            {services.map((service) => (
              <div key={service.id} className="bg-gray-50 rounded-xl p-4 flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-900">{service.name}</h4>
                  <p className="text-sm text-gray-500">${service.price} per {service.frequency}</p>
                </div>
                <button
                  onClick={() => setServices(services.filter(s => s.id !== service.id))}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}