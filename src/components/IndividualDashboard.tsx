import React from 'react';
import { ArrowLeft, Calendar, Target, Users, DollarSign, TrendingUp, Share2, Download, Bell, Settings } from 'lucide-react';
import { Campaign, ChartData, DonationTrend, DonorAnalytics, CampaignPerformance } from '../types';
import MetricCard from './MetricCard';
import LineChart from './LineChart';
import AdvancedMetrics from './AdvancedMetrics';

interface IndividualDashboardProps {
  campaign: Campaign;
  chartData: ChartData[];
  donationTrend: DonationTrend[];
  donorAnalytics: DonorAnalytics;
  performance: CampaignPerformance;
  onBack: () => void;
}

const IndividualDashboard: React.FC<IndividualDashboardProps> = ({
  campaign,
  chartData,
  donationTrend,
  donorAnalytics,
  performance,
  onBack
}) => {
  const daysRemaining = Math.ceil((new Date(campaign.endDate.split('/').reverse().join('-')).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const averageDonation = campaign.currentAmount / campaign.donationsCount;
  const dailyAverage = campaign.currentAmount / 30; // Assumindo 30 dias de campanha
  const [selectedView, setSelectedView] = React.useState<'overview' | 'analytics' | 'donors'>('overview');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao painel geral</span>
        </button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{campaign.title}</h1>
            <div className="flex items-center space-x-4">
              <p className="text-gray-600">{campaign.description}</p>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                campaign.status === 'completed' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {campaign.status === 'active' ? 'Ativa' : campaign.status === 'completed' ? 'Encerrada' : 'Pausada'}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              <span>Exportar</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              <Bell className="w-4 h-4" />
              <span>Alertas</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              <Settings className="w-4 h-4" />
              <span>Configurar</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              <Share2 className="w-4 h-4" />
              <span>Compartilhar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', label: 'Visão Geral', icon: Target },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              { id: 'donors', label: 'Doadores', icon: Users }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setSelectedView(id as any)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  selectedView === id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Status da campanha */}
      <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 rounded-xl p-8 text-white mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white bg-opacity-10 rounded-full -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white bg-opacity-5 rounded-full -ml-16 -mb-16"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="text-blue-100 mb-2">Valor Arrecadado</p>
            <p className="text-4xl font-bold">
              R$ {campaign.currentAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-blue-100 mt-1">
              {campaign.progress.toFixed(1)}% da meta atingida
            </p>
          </div>
          
          <div>
            <p className="text-blue-100 mb-2">Meta</p>
            <p className="text-2xl font-semibold">
              R$ {campaign.targetAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
          
          <div>
            <p className="text-blue-100 mb-2">Progresso</p>
            <div className="w-full bg-blue-400 rounded-full h-3 mb-2">
              <div 
                className="bg-white h-3 rounded-full transition-all duration-1000"
                style={{ width: `${Math.min(campaign.progress, 100)}%` }}
              ></div>
            </div>
            <p className="text-sm text-blue-100">
              Faltam R$ {(campaign.targetAmount - campaign.currentAmount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>

      {/* Métricas detalhadas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total de Doadores"
          value={campaign.donationsCount.toString()}
          icon={<Users className="w-6 h-6" />}
          color="green"
        />
        
        <MetricCard
          title="Doação Média"
          value={`R$ ${averageDonation.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          icon={<DollarSign className="w-6 h-6" />}
          color="blue"
        />
        
        <MetricCard
          title="Média Diária"
          value={`R$ ${dailyAverage.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          icon={<TrendingUp className="w-6 h-6" />}
          color="purple"
        />
        
        <MetricCard
          title="Dias Restantes"
          value={daysRemaining > 0 ? daysRemaining.toString() : "Encerrada"}
          icon={<Calendar className="w-6 h-6" />}
          color="orange"
        />
      </div>

      {selectedView === 'overview' && (
        <>
          {/* Gráfico específico da campanha */}
          <div className="mb-8">
            <LineChart data={donationTrend} title={`Evolução - ${campaign.title}`} />
          </div>

          {/* Detalhes adicionais */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações da Campanha</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Categoria:</span>
                  <span className="font-medium">{campaign.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Data de Início:</span>
                  <span className="font-medium">{campaign.createdAt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Data de Encerramento:</span>
                  <span className="font-medium">{campaign.endDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-medium ${
                    campaign.status === 'active' ? 'text-green-600' : 
                    campaign.status === 'completed' ? 'text-blue-600' : 'text-gray-600'
                  }`}>
                    {campaign.status === 'active' ? 'Ativa' : 
                     campaign.status === 'completed' ? 'Concluída' : 'Pausada'}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Metas e Performance</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Meta de Doações</span>
                    <span className="text-sm font-medium">{campaign.donationsCount}/200</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${(campaign.donationsCount / 200) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Meta Financeira</span>
                    <span className="text-sm font-medium">{campaign.progress.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${Math.min(campaign.progress, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {selectedView === 'analytics' && (
        <div className="space-y-8">
          <AdvancedMetrics donorAnalytics={donorAnalytics} performance={performance} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <LineChart data={donationTrend} title="Tendência de Doações" showCumulative={true} />
            <LineChart data={donationTrend} title="Doações Diárias" showCumulative={false} />
          </div>
        </div>
      )}

      {selectedView === 'donors' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Análise de Doadores</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{donorAnalytics.newDonors}</p>
              <p className="text-sm text-blue-800">Novos Doadores</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{donorAnalytics.returningDonors}</p>
              <p className="text-sm text-green-800">Doadores Recorrentes</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">R$ {donorAnalytics.topDonationAmount.toLocaleString('pt-BR')}</p>
              <p className="text-sm text-purple-800">Maior Doação</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <p className="text-2xl font-bold text-orange-600">{donorAnalytics.averageSessionTime}</p>
              <p className="text-sm text-orange-800">Tempo Médio</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndividualDashboard;