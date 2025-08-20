import React from 'react';
import { DollarSign, Users, Target, CheckCircle, TrendingUp, Calendar } from 'lucide-react';
import MetricCard from './MetricCard';
import LineChart from './LineChart';
import AdvancedMetrics from './AdvancedMetrics';
import CampaignCard from './CampaignCard';
import { Campaign, DashboardStats, ChartData, DonationTrend, DonorAnalytics, CampaignPerformance } from '../types';

interface GeneralDashboardProps {
  stats: DashboardStats;
  campaigns: Campaign[];
  chartData: ChartData[];
  donationTrend: DonationTrend[];
  donorAnalytics: DonorAnalytics;
  performance: CampaignPerformance;
  onViewCampaign: (campaign: Campaign) => void;
}

const GeneralDashboard: React.FC<GeneralDashboardProps> = ({
  stats,
  campaigns,
  chartData,
  donationTrend,
  donorAnalytics,
  performance,
  onViewCampaign
}) => {
  const [selectedPeriod, setSelectedPeriod] = React.useState<'7d' | '30d' | '90d'>('30d');
  const [showCumulative, setShowCumulative] = React.useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Painel Administrativo</h1>
            <p className="text-gray-600">Acompanhe o desempenho de suas campanhas em tempo real</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white rounded-lg border border-gray-200 p-1">
              {['7d', '30d', '90d'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period as any)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                    selectedPeriod === period
                      ? 'bg-blue-500 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {period === '7d' ? '7 dias' : period === '30d' ? '30 dias' : '90 dias'}
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Última atualização: há 2 min</span>
            </div>
          </div>
        </div>
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

      {/* Métricas avançadas */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Análise Detalhada</h2>
        </div>
        <AdvancedMetrics donorAnalytics={donorAnalytics} performance={performance} />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <LineChart 
          data={donationTrend} 
          title="Evolução das Doações" 
          showCumulative={showCumulative}
        />
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Distribuição por Período</h3>
            <button
              onClick={() => setShowCumulative(!showCumulative)}
              className="flex items-center space-x-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors text-sm font-medium"
            >
              <TrendingUp className="w-4 h-4" />
              <span>{showCumulative ? 'Acumulado' : 'Diário'}</span>
            </button>
          </div>
          
          <div className="space-y-4">
            {chartData.slice(0, 5).map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">{item.period}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">R$ {item.amount.toLocaleString('pt-BR')}</p>
                    <p className="text-sm text-gray-600">{item.donations} doações • {item.donors} doadores</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">R$ {item.averageDonation}</p>
                  <p className="text-sm text-gray-600">média</p>
                </div>
              </div>
            ))}
          </div>
        </div>
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