import React from 'react';
import { DollarSign, Users, Target, CheckCircle } from 'lucide-react';
import MetricCard from './MetricCard';
import Chart from './Chart';
import CampaignCard from './CampaignCard';
import { Campaign, DashboardStats, ChartData } from '../types';

interface GeneralDashboardProps {
  stats: DashboardStats;
  campaigns: Campaign[];
  chartData: ChartData[];
  onViewCampaign: (campaign: Campaign) => void;
}

const GeneralDashboard: React.FC<GeneralDashboardProps> = ({
  stats,
  campaigns,
  chartData,
  onViewCampaign
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Painel Administrativo</h1>
        <p className="text-gray-600">Acompanhe o desempenho de suas campanhas</p>
      </div>

      {/* Métricas principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total Arrecadado no Mês"
          value={`R$ ${stats.totalRaised.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          change={stats.monthlyGrowth}
          icon={<DollarSign className="w-6 h-6" />}
          color="blue"
        />
        
        <MetricCard
          title="Total de Doações"
          value={stats.totalDonations.toString()}
          icon={<Users className="w-6 h-6" />}
          color="green"
        />
        
        <MetricCard
          title="Campanhas Ativas"
          value={stats.activeCampaigns.toString()}
          icon={<Target className="w-6 h-6" />}
          color="orange"
        />
        
        <MetricCard
          title="Campanhas Concluídas"
          value={stats.completedCampaigns.toString()}
          icon={<CheckCircle className="w-6 h-6" />}
          color="purple"
        />
      </div>

      {/* Gráfico */}
      <div className="mb-8">
        <Chart data={chartData} title="Total de Doações" />
      </div>

      {/* Lista de campanhas */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Campanhas</h2>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Ver todas
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {campaigns.slice(0, 4).map((campaign) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              onView={onViewCampaign}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GeneralDashboard;