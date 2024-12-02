import React, { useState } from 'react';
import OfferLabHeader from '../components/offerlab/OfferLabHeader';
import OfferLabSidebar from '../components/offerlab/OfferLabSidebar';
import Dashboard from '../components/offerlab/Dashboard';
import ActionPlanPanel from '../components/offerlab/ActionPlanPanel';
import WorkflowPanel from '../components/offerlab/WorkflowPanel';
import DeliveryPanel from '../components/offerlab/DeliveryPanel';
import FrameworksPanel from '../components/offerlab/FrameworksPanel';

const OfferLab: React.FC = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'action-plan':
        return <ActionPlanPanel />;
      case 'workflows':
        return <WorkflowPanel />;
      case 'delivery':
        return <DeliveryPanel />;
      case 'frameworks':
        return <FrameworksPanel />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <OfferLabHeader 
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onBack={() => console.log('Navigate back to offer creation')}
      />
      
      <div className="flex flex-1 h-full">
        <OfferLabSidebar 
          isOpen={isSidebarOpen}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1920px]">
            <div className="max-w-screen-xl mx-auto">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OfferLab;
