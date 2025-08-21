import React from 'react';

interface WeeklyData {
  week: string;
  amount: number;
}

interface WeeklyChartProps {
  data: WeeklyData[];
}

const WeeklyChart: React.FC<WeeklyChartProps> = ({ data }) => {
  const maxAmount = Math.max(...data.map(d => d.amount));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Doações por Semana</h3>
      
      <div className="relative h-64">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 w-16">
          <span>R$ {maxAmount.toLocaleString('pt-BR')}</span>
          <span>R$ {Math.round(maxAmount * 0.75).toLocaleString('pt-BR')}</span>
          <span>R$ {Math.round(maxAmount * 0.5).toLocaleString('pt-BR')}</span>
          <span>R$ {Math.round(maxAmount * 0.25).toLocaleString('pt-BR')}</span>
          <span>R$ 0</span>
        </div>
        
        {/* Chart area */}
        <div className="ml-16 h-full flex items-end justify-between space-x-2">
          {data.map((item, index) => {
            const height = (item.amount / maxAmount) * 100;
            return (
              <div key={index} className="flex flex-col items-center flex-1 h-full justify-end">
                <div className="relative group w-full">
                  {/* Tooltip */}
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    R$ {item.amount.toLocaleString('pt-BR')}
                  </div>
                  
                  {/* Value label on top of bar */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-700">
                    R$ {item.amount >= 1000 ? `${(item.amount / 1000).toFixed(0)}k` : item.amount.toLocaleString('pt-BR')}
                  </div>
                  
                  {/* Bar */}
                  <div
                    className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg w-full hover:from-blue-600 hover:to-blue-500 transition-all duration-300 cursor-pointer"
                    style={{ 
                      height: `${height}%`,
                      minHeight: height > 0 ? '8px' : '0px'
                    }}
                  ></div>
                </div>
                
                {/* Week label */}
                <span className="text-xs text-gray-600 mt-3 font-medium">
                  {item.week}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeeklyChart;