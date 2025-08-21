import React from 'react';
import { MoreHorizontal, Heart, Edit, Trash2 } from 'lucide-react';

interface Campaign {
  id: number;
  title: string;
  description: string;
  status: 'Ativa' | 'Encerrada' | 'Inativa';
  raised: number;
  goal: number;
  progress: number;
  donations: number;
  date: string;
}

interface CampaignsListProps {
  campaigns: Campaign[];
  onCampaignClick?: (campaignId: number) => void;
}

const CampaignsList: React.FC<CampaignsListProps> = ({ campaigns, onCampaignClick }) => {
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

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Campanhas</h3>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Ver todas
          </button>
        </div>
      </div>
      
      <div className="divide-y divide-gray-200">
        {campaigns.map((campaign) => (
          <div 
            key={campaign.id} 
            className={`p-6 hover:bg-gray-50 transition-colors ${onCampaignClick ? 'cursor-pointer' : ''}`}
            onClick={() => onCampaignClick && onCampaignClick(campaign.id)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className={`text-lg font-semibold text-gray-900 ${onCampaignClick ? 'hover:text-blue-600 transition-colors' : ''}`}>
                      {campaign.title}
                    </h4>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                      {campaign.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{campaign.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Progresso</span>
                      <span className="font-medium text-gray-900">{campaign.progress.toFixed(1)}%</span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-1000 ${getProgressColor(campaign.progress)}`}
                        style={{ width: `${Math.min(campaign.progress, 100)}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <span className="text-gray-500">Arrecadado: </span>
                        <span className="font-semibold text-gray-900">
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
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 pt-2">
                      <span>{campaign.donations} doações</span>
                      <span>{campaign.date}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
                  <Edit className="w-4 h-4 text-gray-400" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
                  <Trash2 className="w-4 h-4 text-gray-400" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignsList;