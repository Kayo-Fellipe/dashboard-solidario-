import React from 'react';
import { Calendar, CreditCard, Target, MapPin, Users, ChevronDown } from 'lucide-react';

interface FilterBarProps {
  filters: {
    periodo: string;
    formaPagamento: string;
    tipoCampanha: string;
    statusCampanha: string;
    localidade: string;
    doadores: string;
  };
  onFilterChange: (key: string, value: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange }) => {
  const filterOptions = {
    periodo: ['Último mês', 'Últimos 3 meses', 'Último ano', 'Personalizado'],
    formaPagamento: ['Todos', 'Crédito', 'Débito', 'PIX', 'Boleto'],
    tipoCampanha: ['Todos', 'Emergencial', 'Natal', 'Reforma', 'Volta às Aulas'],
    statusCampanha: ['Todos', 'Ativa', 'Inativa', 'Encerrada'],
    localidade: ['Todas', 'Campinas', 'São Paulo', 'Rio de Janeiro', 'Belo Horizonte'],
    doadores: ['Todos', 'Novos', 'Recorrentes', 'Antigos']
  };

  const filterLabels = {
    periodo: 'Período',
    formaPagamento: 'Forma de Pagamento',
    tipoCampanha: 'Tipo de Campanha',
    statusCampanha: 'Status da Campanha',
    localidade: 'Localidade',
    doadores: 'Doadores'
  };

  const filterIcons = {
    periodo: Calendar,
    formaPagamento: CreditCard,
    tipoCampanha: Target,
    statusCampanha: Target,
    localidade: MapPin,
    doadores: Users
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Object.entries(filters).map(([key, value]) => {
          const Icon = filterIcons[key as keyof typeof filterIcons];
          return (
            <div key={key} className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Icon className="w-4 h-4 inline mr-2" />
                {filterLabels[key as keyof typeof filterLabels]}
              </label>
              <div className="relative">
                <select
                  value={value}
                  onChange={(e) => onFilterChange(key, e.target.value)}
                  className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 pr-8 text-sm font-medium appearance-none cursor-pointer hover:bg-blue-600 transition-colors"
                >
                  {filterOptions[key as keyof typeof filterOptions].map((option) => (
                    <option key={option} value={option} className="bg-white text-gray-900">
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-white pointer-events-none" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilterBar;