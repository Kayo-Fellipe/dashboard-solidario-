import React from 'react';
import { ChartData } from '../types';

interface ChartProps {
  data: ChartData[];
  title: string;
}

const Chart: React.FC<ChartProps> = ({ data, title }) => {
  const maxAmount = Math.max(...data.map(d => d.amount));
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="text-2xl font-bold text-gray-900">{data.reduce((sum, d) => sum + d.donations, 0)}</div>
      </div>
      
      <div className="space-y-1 mb-4">
        {['R$ 4500', 'R$ 4000', 'R$ 3500', 'R$ 3000', 'R$ 2500', 'R$ 2000', 'R$ 1500', 'R$ 1000', 'R$ 500', 'R$ 0'].map((label, index) => (
          <div key={index} className="text-xs text-gray-400 h-6 flex items-center">
            {label}
          </div>
        ))}
      </div>
      
      <div className="flex items-end justify-between h-64 border-l border-b border-gray-200 pl-4 pb-4">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center space-y-2 flex-1">
            <div 
              className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-sm w-8 hover:from-blue-600 hover:to-blue-500 transition-all duration-300 cursor-pointer group relative"
              style={{ 
                height: `${(item.amount / maxAmount) * 240}px`,
                minHeight: '8px'
              }}
            >
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                R$ {item.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </div>
            <span className="text-xs text-gray-500 transform -rotate-0">
              {item.period}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chart;