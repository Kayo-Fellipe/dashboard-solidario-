import React, { useState } from 'react';
import FilterBar from './FilterBar';
import EvolutionChart from './EvolutionChart';
import DistributionChart from './DistributionChart';
import WeeklyChart from './WeeklyChart';
import TopCampaigns from './TopCampaigns';
import TopDonors from './TopDonors';
import RecentDonations from './RecentDonations';
import CampaignsList from './CampaignsList';
import HighlightBanner from './HighlightBanner';
import {
  evolutionData,
  distributionData,
  weeklyData,
  topCampaigns,
  topDonors,
  recentDonations,
  campaignsList
} from '../data/dashboardData';

interface DashboardPageProps {
  onCampaignClick: (campaignId: number) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onCampaignClick }) => {
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

  return (
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
      <CampaignsList campaigns={campaignsList} onCampaignClick={onCampaignClick} />
    </div>
  );
};

export default DashboardPage;