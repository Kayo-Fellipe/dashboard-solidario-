import React from 'react';

interface Donation {
  id: number;
  donor: string;
  amount: number;
  date: string;
}

interface RecentDonationsProps {
  donations: Donation[];
}

const RecentDonations: React.FC<RecentDonationsProps> = ({ donations }) => {
  return (
    <div className="bg-blue-500 rounded-xl p-6 text-white">
      <h3 className="text-lg font-semibold mb-6">Doações Recentes</h3>
      
      <div className="space-y-1 mb-4">
        <div className="flex justify-between text-sm font-medium text-blue-100 pb-2">
          <span>Doador</span>
          <span>Valor</span>
          <span>Data</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {donations.map((donation) => (
          <div key={donation.id} className="flex items-center justify-between py-2 border-b border-blue-400 last:border-b-0">
            <div className="flex-1">
              <span className="font-medium text-sm">{donation.donor}</span>
            </div>
            <div className="flex-1 text-center">
              <span className="font-semibold">
                R$ {donation.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex-1 text-right">
              <span className="text-sm text-blue-100">{donation.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentDonations;