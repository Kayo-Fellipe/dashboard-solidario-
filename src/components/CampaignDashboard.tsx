import React, { useState } from 'react';
import { ArrowLeft, Heart, Users, Calendar, Target, TrendingUp } from 'lucide-react';
import FilterBar from './FilterBar';
import EvolutionChart from './EvolutionChart';
import DistributionChart from './DistributionChart';
import WeeklyChart from './WeeklyChart';
import TopDonors from './TopDonors';
import RecentDonations from './RecentDonations';
import HighlightBanner from './HighlightBanner';
import { campaignsList, evolutionData, weeklyData, topDonors, recentDonations } from '../data/dashboardData';

interface CampaignDashboardProps {
  campaignId: number;
  onBack: () => void;
}

const CampaignDashboard: React.FC<CampaignDashboardProps> = ({ campaignId, onBack }) => {
  const [filters, setFilters] = useState({
    periodo: 'Último mês',
    formaPagamento: 'Todos',
    tipoCampanha: 'Todos',
    statusCampanha: 'Todos',
    localidade: 'Todas',
    doadores: 'Todos'
  });

  const campaign = campaignsList.find(c => c.id === campaignId);

  if (!campaign) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Campanha não encontrada</h1>
          <button
            onClick={onBack}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </button>
        </div>
      </div>
    );
  }

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativa':
        return 'bg-green-100 text-green-800';
      case 'Encerrada':
        return 'bg-blue-100 text-blue-800';
      case 'Inativa':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 100) return 'bg-green-500';
    if (progress >= 75) return 'bg-blue-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Mock data específica da campanha
  const campaignDistributionData = [
    { name: 'PIX', value: campaign.raised * 0.6, percentage: 60, color: '#3B82F6' },
    { name: 'Cartão de Crédito', value: campaign.raised * 0.25, percentage: 25, color: '#60A5FA' },
    { name: 'Cartão de Débito', value: campaign.raised * 0.10, percentage: 10, color: '#93C5FD' },
    { name: 'Boleto', value: campaign.raised * 0.05, percentage: 5, color: '#DBEAFE' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button and Campaign Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para Campanhas
        </button>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                <Heart className="w-8 h-8 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">{campaign.title}</h1>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(campaign.status)}`}>
                    {campaign.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{campaign.description}</p>
                
                <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Target className="w-4 h-4" />
                    <span>{campaign.category}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{campaign.donations} doações</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Criada em {campaign.date}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Progresso da Meta</span>
                    <span className="font-medium text-gray-900">{campaign.progress.toFixed(1)}%</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-1000 ${getProgressColor(campaign.progress)}`}
                      style={{ width: `${Math.min(campaign.progress, 100)}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="text-gray-500">Arrecadado: </span>
                      <span className="font-bold text-gray-900 text-lg">
                        R$ {campaign.raised.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Meta: </span>
                      <span className="font-semibold text-gray-900">
                        R$ {campaign.goal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex items-center space-x-2 text-green-600 mb-2">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm font-medium">+12% esta semana</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                R$ {(campaign.raised / campaign.donations).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-sm text-gray-500">Doação média</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <FilterBar filters={filters} onFilterChange={handleFilterChange} />

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <EvolutionChart data={evolutionData} />
        <DistributionChart data={campaignDistributionData} />
      </div>

      {/* Highlight Banner */}
      <HighlightBanner message={`A campanha ${campaign.title} recebeu ${campaign.donations} doações este mês`} />

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <WeeklyChart data={weeklyData} />
        <TopDonors donors={topDonors} />
      </div>

      {/* Recent Donations */}
      <div className="grid grid-cols-1 gap-8">
        <RecentDonations donations={recentDonations} />
      </div>
    </div>
  );
};

export default CampaignDashboard;