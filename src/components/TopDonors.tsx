import React from 'react';

interface Donor {
  id: number;
  name: string;
  total: number;
}

interface TopDonorsProps {
  donors: Donor[];
}

const TopDonors: React.FC<TopDonorsProps> = ({ donors }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Doadores</h3>
      
      <div className="space-y-1 mb-4">
        <div className="flex justify-between text-sm font-medium text-gray-600 pb-2">
          <span>Doador</span>
          <span>Total</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {donors.map((donor, index) => (
          <div key={donor.id} className="flex items-center justify-between p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <div className="flex items-center space-x-3">
              <span className="font-semibold text-sm">
                {index + 1}. {donor.name}
              </span>
            </div>
            <span className="font-bold">
              R$ {donor.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopDonors;