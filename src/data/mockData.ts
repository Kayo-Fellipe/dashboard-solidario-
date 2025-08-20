import { Campaign, DashboardStats, ChartData } from '../types';

export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'Campanha Emergencial para Vítimas das Enchentes',
    description: 'Arrecadação de recursos para auxiliar famílias afetadas pelas enchentes',
    currentAmount: 32750.00,
    targetAmount: 50000.00,
    progress: 65.5,
    status: 'active',
    endDate: '31/05/2025',
    donationsCount: 147,
    category: 'Emergencial',
    createdAt: '15/01/2025'
  },
  {
    id: '2',
    title: 'Arrecadação para Reforma do Abrigo São José',
    description: 'Recursos para reforma e melhoria das instalações do abrigo',
    currentAmount: 18500.00,
    targetAmount: 30000.00,
    progress: 61.7,
    status: 'active',
    endDate: '15/06/2025',
    donationsCount: 89,
    category: 'Infraestrutura',
    createdAt: '10/02/2025'
  },
  {
    id: '3',
    title: 'Campanha de Natal 2024',
    description: 'Arrecadação para cestas natalinas e presentes para crianças carentes',
    currentAmount: 25000.00,
    targetAmount: 25000.00,
    progress: 100,
    status: 'completed',
    endDate: '25/12/2024',
    donationsCount: 156,
    category: 'Sazonal',
    createdAt: '01/11/2024'
  },
  {
    id: '4',
    title: 'Campanha Volta às Aulas 2025',
    description: 'Material escolar para crianças em situação de vulnerabilidade',
    currentAmount: 7200.00,
    targetAmount: 15000.00,
    progress: 48.0,
    status: 'active',
    endDate: '28/02/2025',
    donationsCount: 43,
    category: 'Educação',
    createdAt: '05/01/2025'
  }
];

export const mockStats: DashboardStats = {
  totalRaised: 83450.00,
  totalDonations: 435,
  activeCampaigns: 3,
  completedCampaigns: 1,
  monthlyGrowth: 15.2
};

export const mockChartData: ChartData[] = [
  { period: '01/05', amount: 2850, donations: 15 },
  { period: '02/05', amount: 3200, donations: 18 },
  { period: '03/05', amount: 4100, donations: 22 },
  { period: '04/05', amount: 2950, donations: 16 },
  { period: '05/05', amount: 5800, donations: 31 },
  { period: '06/05', amount: 4200, donations: 24 },
  { period: '07/05', amount: 4750, donations: 28 }
];