import React, { useState } from 'react';
import Header from './components/Header';
import GeneralDashboard from './components/GeneralDashboard';
import IndividualDashboard from './components/IndividualDashboard';
import CampaignsPage from './components/CampaignsPage';
import { mockCampaigns, mockStats, mockChartData, mockDonationTrend, mockDonorAnalytics, mockCampaignPerformance } from './data/mockData';
import { Campaign } from './types';

type View = 'dashboard' | 'campaigns' | 'settings';

function App() {
  const [activeTab, setActiveTab] = useState<View>('dashboard');
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  const handleViewCampaign = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
  };

  const handleBackToDashboard = () => {
    setSelectedCampaign(null);
  };

  const handleCreateCampaign = () => {
    // Implementar modal ou página de criação de campanha
    console.log('Criar nova campanha');
  };

  const handleTabChange = (tab: View) => {
    setActiveTab(tab);
    setSelectedCampaign(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onCreateCampaign={handleCreateCampaign}
      />

      {activeTab === 'dashboard' && (
        <>
          {selectedCampaign ? (
            <IndividualDashboard
              campaign={selectedCampaign}
              chartData={mockChartData}
              onBack={handleBackToDashboard}
            />
          ) : (
            <GeneralDashboard
              stats={mockStats}
              campaigns={mockCampaigns}
              chartData={mockChartData}
              donationTrend={mockDonationTrend}
              donorAnalytics={mockDonorAnalytics}
              performance={mockCampaignPerformance}
              onViewCampaign={handleViewCampaign}
            />
          )}
        </>
      )}

              donationTrend={mockDonationTrend}
              donorAnalytics={mockDonorAnalytics}
              performance={mockCampaignPerformance}
      {activeTab === 'campaigns' && (
        <CampaignsPage
          campaigns={mockCampaigns}
          onViewCampaign={handleViewCampaign}
          onCreateCampaign={handleCreateCampaign}
        />
      )}

      {activeTab === 'settings' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Configurações</h1>
            <p className="text-gray-600">Página em desenvolvimento...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;