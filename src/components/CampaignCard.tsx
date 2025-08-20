import React from 'react';
import { Calendar, Eye, Edit, MoreHorizontal, Target, Users } from 'lucide-react';
import { Campaign } from '../types';

interface CampaignCardProps {
  campaign: Campaign;
  onView: (campaign: Campaign) => void;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, onView }) => {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    completed: 'bg-blue-100 text-blue-800',
    paused: 'bg-gray-100 text-gray-800'
  };

  const statusLabels = {
    active: 'Ativa',
    completed: 'Encerrada',
    paused: 'Pausada'
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 group cursor-pointer"
         onClick={() => onView(campaign)}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Target className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {campaign.title}
            </h3>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[campaign.status]}`}>
              {statusLabels[campaign.status]}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-1 hover:bg-gray-100 rounded-md transition-colors">
            <Eye className="w-4 h-4 text-gray-400" />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded-md transition-colors">
            <Edit className="w-4 h-4 text-gray-400" />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded-md transition-colors">
            <MoreHorizontal className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4">{campaign.description}</p>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Progresso</span>
          <span className="font-medium text-gray-900">{campaign.progress.toFixed(1)}%</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${Math.min(campaign.progress, 100)}%` }}
          ></div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="text-gray-500">Arrecadado: </span>
            <span className="font-semibold text-gray-900">
              R$ {campaign.currentAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="text-sm">
            <span className="text-gray-500">Meta: </span>
            <span className="font-semibold text-gray-900">
              R$ {campaign.targetAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{campaign.donationsCount} doações</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{campaign.endDate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;