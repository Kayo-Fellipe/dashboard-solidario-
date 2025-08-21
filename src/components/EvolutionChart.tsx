import React from 'react';

interface EvolutionChartProps {
  data: { day: number; amount: number }[];
}

const EvolutionChart: React.FC<EvolutionChartProps> = ({ data }) => {
  const maxAmount = Math.max(...data.map(d => d.amount));
  const minAmount = Math.min(...data.map(d => d.amount));
  const range = maxAmount - minAmount;

  const getY = (value: number) => {
    return 200 - ((value - minAmount) / range) * 180;
  };

  const pathData = data.map((item, index) => {
    const x = (index / (data.length - 1)) * 350;
    const y = getY(item.amount);
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  const areaData = `M 0 200 L ${pathData.substring(2)} L 350 200 Z`;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Evolução das Doações</h3>
      
      <div className="relative">
        <svg width="100%" height="240" viewBox="0 0 370 240" className="overflow-visible">
          <defs>
            <linearGradient id="evolutionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2"/>
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.05"/>
            </linearGradient>
          </defs>
          
          {/* Grid lines */}
          {[10000, 20000, 30000, 40000].map((value, i) => (
            <g key={value}>
              <line
                x1="0"
                y1={200 - (i + 1) * 45}
                x2="350"
                y2={200 - (i + 1) * 45}
                stroke="#F3F4F6"
                strokeWidth="1"
                strokeDasharray="2,2"
              />
              <text
                x="-10"
                y={200 - (i + 1) * 45 + 5}
                textAnchor="end"
                fontSize="12"
                fill="#9CA3AF"
              >
                R$ {value.toLocaleString('pt-BR')}
              </text>
            </g>
          ))}
          
          {/* Area fill */}
          <path
            d={areaData}
            fill="url(#evolutionGradient)"
          />
          
          {/* Line */}
          <path
            d={pathData}
            fill="none"
            stroke="#3B82F6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Data points */}
          {data.map((item, index) => {
            const x = (index / (data.length - 1)) * 350;
            const y = getY(item.amount);
            return (
              <g key={index}>
                <circle
                  cx={x}
                  cy={y}
                  r="4"
                  fill="white"
                  stroke="#3B82F6"
                  strokeWidth="2"
                />
                {/* Peak point highlight */}
                {item.amount === maxAmount && (
                  <>
                    <circle
                      cx={x}
                      cy={y}
                      r="6"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="2"
                    />
                    <text
                      x={x}
                      y={y - 15}
                      textAnchor="middle"
                      fontSize="12"
                      fontWeight="600"
                      fill="#3B82F6"
                    >
                      R$ {item.amount.toLocaleString('pt-BR')}
                    </text>
                  </>
                )}
              </g>
            );
          })}
        </svg>
        
        {/* X-axis labels */}
        <div className="flex justify-between mt-4 px-2">
          {[5, 10, 15, 20, 25, 30].map((day) => (
            <span key={day} className="text-xs text-gray-500">
              {day}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EvolutionChart;