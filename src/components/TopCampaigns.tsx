import React from 'react';

interface Campaign {
  id: number;
  name: string;
  total: number;
  growth?: number;
}

interface TopCampaignsProps {
  campaigns: Campaign[];
}

const TopCampaigns: React.FC<TopCampaignsProps> = ({ campaigns }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Campanhas</h3>
      
      <div className="space-y-1 mb-4">
        <div className="flex justify-between text-sm font-medium text-gray-600 pb-2">
          <span>Campanha</span>
          <span>Total</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {campaigns.map((campaign, index) => (
          <div key={campaign.id} className="flex items-center justify-between p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <div className="flex items-center space-x-3">
              <span className="font-semibold text-sm">
                {index + 1}. {campaign.name}
              </span>
            </div>
            <span className="font-bold">
              R$ {campaign.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
        ))}
      </div>
      
      {campaigns.length > 0 && campaigns[2]?.growth && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700">
            A campanha <span className="font-semibold">{campaigns[2].name}</span> tem crescimento acelerado 
            de <span className="font-semibold text-green-600">+{campaigns[2].growth}%</span> na última semana
          </p>
        </div>
      )}
    </div>
  );
};

export default TopCampaigns;