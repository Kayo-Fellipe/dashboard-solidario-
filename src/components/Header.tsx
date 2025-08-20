import React from 'react';
import { Heart, BarChart3, Settings, LogOut, Plus } from 'lucide-react';

interface HeaderProps {
  activeTab: 'dashboard' | 'campaigns' | 'settings';
  onTabChange: (tab: 'dashboard' | 'campaigns' | 'settings') => void;
  onCreateCampaign: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange, onCreateCampaign }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-lg">
                <Heart className="w-6 h-6 text-white fill-current" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Solidário</h1>
                <div className="w-2 h-2 bg-green-400 rounded-full inline-block ml-1"></div>
              </div>
            </div>
          </div>

          <nav className="flex space-x-8">
            <button
              onClick={() => onTabChange('dashboard')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'dashboard'
                  ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Painel</span>
            </button>

            <button
              onClick={() => onTabChange('campaigns')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'campaigns'
                  ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>Campanhas</span>
            </button>

            <button
              onClick={() => onTabChange('settings')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'settings'
                  ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Configurações</span>
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={onCreateCampaign}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nova Campanha
            </button>

            <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors">
              <LogOut className="w-4 h-4" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;