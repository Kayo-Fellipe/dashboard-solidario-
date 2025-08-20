import React from 'react';
import { DonationTrend } from '../types';

interface LineChartProps {
  data: DonationTrend[];
  title: string;
  showCumulative?: boolean;
}

const LineChart: React.FC<LineChartProps> = ({ data, title, showCumulative = false }) => {
  const maxAmount = Math.max(...data.map(d => showCumulative ? d.cumulativeAmount : d.amount));
  const minAmount = Math.min(...data.map(d => showCumulative ? d.cumulativeAmount : d.amount));
  const range = maxAmount - minAmount;
  
  const getY = (value: number) => {
    return 200 - ((value - minAmount) / range) * 180;
  };

  const pathData = data.map((item, index) => {
    const x = (index / (data.length - 1)) * 300;
    const y = getY(showCumulative ? item.cumulativeAmount : item.amount);
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  const areaData = `M 0 200 L ${pathData.substring(2)} L 300 200 Z`;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">
              {showCumulative ? 'Acumulado' : 'Diário'}
            </span>
          </div>
        </div>
      </div>
      
      <div className="relative">
        <svg width="100%" height="240" viewBox="0 0 320 240" className="overflow-visible">
          <defs>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.05"/>
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map(i => (
            <line
              key={i}
              x1="0"
              y1={20 + i * 45}
              x2="300"
              y2={20 + i * 45}
              stroke="#F3F4F6"
              strokeWidth="1"
            />
          ))}
          
          {/* Area fill */}
          <path
            d={areaData}
            fill="url(#areaGradient)"
            className="transition-all duration-1000 ease-out"
          />
          
          {/* Line */}
          <path
            d={pathData}
            fill="none"
            stroke="#3B82F6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
            className="transition-all duration-1000 ease-out"
          />
          
          {/* Data points */}
          {data.map((item, index) => {
            const x = (index / (data.length - 1)) * 300;
            const y = getY(showCumulative ? item.cumulativeAmount : item.amount);
            return (
              <g key={index}>
                <circle
                  cx={x}
                  cy={y}
                  r="6"
                  fill="white"
                  stroke="#3B82F6"
                  strokeWidth="3"
                  className="hover:r-8 transition-all duration-200 cursor-pointer"
                />
                <circle
                  cx={x}
                  cy={y}
                  r="12"
                  fill="transparent"
                  className="hover:fill-blue-50 transition-all duration-200 cursor-pointer"
                />
                
                {/* Tooltip on hover */}
                <g className="opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <rect
                    x={x - 40}
                    y={y - 35}
                    width="80"
                    height="25"
                    rx="4"
                    fill="#1F2937"
                    className="drop-shadow-lg"
                  />
                  <text
                    x={x}
                    y={y - 18}
                    textAnchor="middle"
                    fill="white"
                    fontSize="12"
                    fontWeight="500"
                  >
                    R$ {(showCumulative ? item.cumulativeAmount : item.amount).toLocaleString('pt-BR')}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>
        
        {/* X-axis labels */}
        <div className="flex justify-between mt-4 px-2">
          {data.map((item, index) => (
            <span key={index} className="text-xs text-gray-500">
              {item.date}
            </span>
          ))}
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-600 font-medium">Maior Valor</p>
          <p className="text-lg font-bold text-blue-900">
            R$ {Math.max(...data.map(d => showCumulative ? d.cumulativeAmount : d.amount)).toLocaleString('pt-BR')}
          </p>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <p className="text-sm text-green-600 font-medium">Média</p>
          <p className="text-lg font-bold text-green-900">
            R$ {Math.round(data.reduce((sum, d) => sum + (showCumulative ? d.cumulativeAmount : d.amount), 0) / data.length).toLocaleString('pt-BR')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LineChart;