import React from 'react';
import { ArrowLeft, Calendar, Target, Users, DollarSign, TrendingUp, Share2 } from 'lucide-react';
import { Campaign, ChartData } from '../types';
import MetricCard from './MetricCard';
import Chart from './Chart';

interface IndividualDashboardProps {
  campaign: Campaign;
  chartData: ChartData[];
  onBack: () => void;
}

const IndividualDashboard: React.FC<IndividualDashboardProps> = ({
  campaign,
  chartData,
  onBack
}) => {
  const daysRemaining = Math.ceil((new Date(campaign.endDate.split('/').reverse().join('-')).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const averageDonation = campaign.currentAmount / campaign.donationsCount;
  const dailyAverage = campaign.currentAmount / 30; // Assumindo 30 dias de campanha

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
            <p className="text-gray-600">{campaign.description}</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              <Share2 className="w-4 h-4" />
              <span>Compartilhar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Status da campanha */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-8 text-white mb-8">
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

      {/* Gráfico específico da campanha */}
      <div className="mb-8">
        <Chart data={chartData} title={`Evolução - ${campaign.title}`} />
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
                  className="bg-green-500 h-2 rounded-full"
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
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${Math.min(campaign.progress, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualDashboard;