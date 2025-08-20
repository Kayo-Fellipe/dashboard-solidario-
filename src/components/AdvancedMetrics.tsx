import React from 'react';
import { TrendingUp, Users, Eye, Share2, MousePointer, Clock, Award, Repeat } from 'lucide-react';
import { DonorAnalytics, CampaignPerformance } from '../types';

interface AdvancedMetricsProps {
  donorAnalytics: DonorAnalytics;
  performance: CampaignPerformance;
}

const AdvancedMetrics: React.FC<AdvancedMetricsProps> = ({ donorAnalytics, performance }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Novos Doadores */}
      <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -mr-10 -mt-10"></div>
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8" />
            <span className="text-emerald-100 text-sm font-medium">Novos</span>
          </div>
          <p className="text-3xl font-bold mb-1">{donorAnalytics.newDonors}</p>
          <p className="text-emerald-100 text-sm">Novos doadores</p>
        </div>
      </div>

      {/* Doadores Recorrentes */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -mr-10 -mt-10"></div>
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <Repeat className="w-8 h-8" />
            <span className="text-blue-100 text-sm font-medium">Recorrentes</span>
          </div>
          <p className="text-3xl font-bold mb-1">{donorAnalytics.returningDonors}</p>
          <p className="text-blue-100 text-sm">Doadores fiéis</p>
        </div>
      </div>

      {/* Taxa de Conversão */}
      <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -mr-10 -mt-10"></div>
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8" />
            <span className="text-purple-100 text-sm font-medium">Conversão</span>
          </div>
          <p className="text-3xl font-bold mb-1">{performance.conversionRate}%</p>
          <p className="text-purple-100 text-sm">Taxa de conversão</p>
        </div>
      </div>

      {/* Maior Doação */}
      <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -mr-10 -mt-10"></div>
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <Award className="w-8 h-8" />
            <span className="text-amber-100 text-sm font-medium">Recorde</span>
          </div>
          <p className="text-3xl font-bold mb-1">R$ {donorAnalytics.topDonationAmount.toLocaleString('pt-BR')}</p>
          <p className="text-amber-100 text-sm">Maior doação</p>
        </div>
      </div>

      {/* Visualizações */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
        <div className="flex items-center justify-between mb-4">
          <Eye className="w-8 h-8 text-indigo-600" />
          <span className="text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full text-xs font-medium">
            +15.2%
          </span>
        </div>
        <p className="text-3xl font-bold text-gray-900 mb-1">{performance.viewCount.toLocaleString('pt-BR')}</p>
        <p className="text-gray-600 text-sm">Visualizações</p>
      </div>

      {/* Compartilhamentos */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
        <div className="flex items-center justify-between mb-4">
          <Share2 className="w-8 h-8 text-pink-600" />
          <span className="text-pink-600 bg-pink-50 px-2 py-1 rounded-full text-xs font-medium">
            +8.7%
          </span>
        </div>
        <p className="text-3xl font-bold text-gray-900 mb-1">{performance.shareCount}</p>
        <p className="text-gray-600 text-sm">Compartilhamentos</p>
      </div>

      {/* CTR */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
        <div className="flex items-center justify-between mb-4">
          <MousePointer className="w-8 h-8 text-cyan-600" />
          <span className="text-cyan-600 bg-cyan-50 px-2 py-1 rounded-full text-xs font-medium">
            +2.1%
          </span>
        </div>
        <p className="text-3xl font-bold text-gray-900 mb-1">{performance.clickThroughRate}%</p>
        <p className="text-gray-600 text-sm">Taxa de cliques</p>
      </div>

      {/* Tempo Médio */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
        <div className="flex items-center justify-between mb-4">
          <Clock className="w-8 h-8 text-orange-600" />
          <span className="text-orange-600 bg-orange-50 px-2 py-1 rounded-full text-xs font-medium">
            +12.3%
          </span>
        </div>
        <p className="text-3xl font-bold text-gray-900 mb-1">{donorAnalytics.averageSessionTime}</p>
        <p className="text-gray-600 text-sm">Tempo médio</p>
      </div>
    </div>
  );
};

export default AdvancedMetrics;