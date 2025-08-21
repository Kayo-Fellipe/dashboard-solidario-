import React, { useState } from 'react';
import { Heart, BarChart3, Settings, LogOut, Plus } from 'lucide-react';
import FilterBar from './components/FilterBar';
import EvolutionChart from './components/EvolutionChart';
import DistributionChart from './components/DistributionChart';
import WeeklyChart from './components/WeeklyChart';
import TopCampaigns from './components/TopCampaigns';
import TopDonors from './components/TopDonors';
import RecentDonations from './components/RecentDonations';
import CampaignsList from './components/CampaignsList';
import HighlightBanner from './components/HighlightBanner';
import {
  evolutionData,
  distributionData,
  weeklyData,
  topCampaigns,
  topDonors,
  recentDonations,
  campaignsList
} from './data/dashboardData';

type Tab = 'painel' | 'campanhas' | 'configuracoes';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('painel');
  const [filters, setFilters] = useState({
    periodo: 'Último mês',
    formaPagamento: 'Todos',
    tipoCampanha: 'Todos',
    statusCampanha: 'Todos',
    localidade: 'Todas',
    doadores: 'Todos'
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleCreateCampaign = () => {
    console.log('Criar nova campanha');
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-lg">
                  <Heart className="w-6 h-6 text-white fill-current" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Solidário+</h1>
                </div>
              </div>
            </div>

            <nav className="flex space-x-8">
              <button
                onClick={() => handleTabChange('painel')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'painel'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Painel</span>
              </button>

              <button
                onClick={() => handleTabChange('campanhas')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'campanhas'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Heart className="w-4 h-4" />
                <span>Campanhas</span>
              </button>

              <button
                onClick={() => handleTabChange('configuracoes')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'configuracoes'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Configurações</span>
              </button>
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleCreateCampaign}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nova Campanha
              </button>

              <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors">
                <LogOut className="w-4 h-4" />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      {activeTab === 'painel' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Painel Administrativo</h1>
            <p className="text-gray-600">Acompanhe o desempenho de suas campanhas</p>
          </div>

          {/* Filters */}
          <FilterBar filters={filters} onFilterChange={handleFilterChange} />

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <EvolutionChart data={evolutionData} />
            <DistributionChart data={distributionData} />
          </div>

          {/* Highlight Banner */}
          <HighlightBanner message="Este mês, 45% das doações vieram da campanha Emergencial" />

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <WeeklyChart data={weeklyData} />
            <TopCampaigns campaigns={topCampaigns} />
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <RecentDonations donations={recentDonations} />
            <TopDonors donors={topDonors} />
          </div>

          {/* Campaigns List */}
          <CampaignsList campaigns={campaignsList} />
        </div>
      )}

      {activeTab === 'campanhas' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Campanhas</h1>
            <p className="text-gray-600">Página em desenvolvimento...</p>
          </div>
        </div>
      )}

      {activeTab === 'configuracoes' && (
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