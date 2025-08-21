import React from 'react';

interface DistributionData {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

interface DistributionChartProps {
  data: DistributionData[];
}

const DistributionChart: React.FC<DistributionChartProps> = ({ data }) => {
  let cumulativePercentage = 0;

  const createPath = (percentage: number, startAngle: number) => {
    const angle = (percentage / 100) * 360;
    const endAngle = startAngle + angle;
    
    const x1 = 100 + 80 * Math.cos((startAngle * Math.PI) / 180);
    const y1 = 100 + 80 * Math.sin((startAngle * Math.PI) / 180);
    const x2 = 100 + 80 * Math.cos((endAngle * Math.PI) / 180);
    const y2 = 100 + 80 * Math.sin((endAngle * Math.PI) / 180);
    
    const largeArcFlag = angle > 180 ? 1 : 0;
    
    return `M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Distribuição das Doações</h3>
      
      <div className="flex items-center justify-between">
        <div className="relative">
          <svg width="200" height="200" viewBox="0 0 200 200">
            {data.map((item, index) => {
              const startAngle = cumulativePercentage * 3.6 - 90; // Start from top
              const path = createPath(item.percentage, startAngle);
              cumulativePercentage += item.percentage;
              
              return (
                <path
                  key={item.name}
                  d={path}
                  fill={item.color}
                  stroke="white"
                  strokeWidth="2"
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                />
              );
            })}
            
            {/* Center circle */}
            <circle
              cx="100"
              cy="100"
              r="40"
              fill="white"
              stroke="#E5E7EB"
              strokeWidth="1"
            />
            
            {/* Center text */}
            <text
              x="100"
              y="95"
              textAnchor="middle"
              fontSize="12"
              fill="#6B7280"
              fontWeight="500"
            >
              Total
            </text>
            <text
              x="100"
              y="110"
              textAnchor="middle"
              fontSize="14"
              fill="#1F2937"
              fontWeight="600"
            >
              R$ {data.reduce((sum, item) => sum + item.value, 0).toLocaleString('pt-BR')}
            </text>
          </svg>
        </div>
        
        <div className="flex-1 ml-8">
          <div className="space-y-3">
            {data.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm font-medium text-gray-700">{item.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">{item.percentage}%</div>
                  <div className="text-xs text-gray-500">
                    R$ {item.value.toLocaleString('pt-BR')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistributionChart;