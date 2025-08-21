// Mock data for the new dashboard design

export const evolutionData = [
  { day: 1, amount: 15000 },
  { day: 5, amount: 18000 },
  { day: 10, amount: 25000 },
  { day: 15, amount: 32000 },
  { day: 20, amount: 28000 },
  { day: 25, amount: 35000 },
  { day: 30, amount: 40000 }
];

export const distributionData = [
  { name: 'Emergencial', value: 40000, percentage: 45, color: '#3B82F6' },
  { name: 'Natal', value: 30000, percentage: 30, color: '#60A5FA' },
  { name: 'Reforma', value: 20000, percentage: 15, color: '#93C5FD' },
  { name: 'Volta às Aulas', value: 10000, percentage: 10, color: '#DBEAFE' }
];

export const weeklyData = [
  { week: 'Semana 1', amount: 20000 },
  { week: 'Semana 2', amount: 27000 },
  { week: 'Semana 3', amount: 30000 },
  { week: 'Semana 4', amount: 40000 }
];

export const topCampaigns = [
  { id: 1, name: 'Emergencial', total: 40000 },
  { id: 2, name: 'Natal', total: 30000 },
  { id: 3, name: 'Volta às Aulas', total: 20000, growth: 25 }
];

export const topDonors = [
  { id: 1, name: 'João da Silva', total: 30000 },
  { id: 2, name: 'Maria de Jesus', total: 20000 },
  { id: 3, name: 'Jessica dos Santos', total: 10000 }
];

export const campaignsList = [
  {
    id: 1,
    title: 'Campanha Emergencial para Vítimas das Enchentes',
    description: 'Arrecadação de recursos para auxiliar famílias afetadas pelas enchentes',
    status: 'Ativa' as const,
    raised: 32750,
    goal: 50000,
    progress: 65.5,
    donations: 147,
    date: '31/05/2025',
    category: 'Emergencial'
  },
  {
    id: 2,
    title: 'Arrecadação para Reforma do Abrigo São José',
    description: 'Recursos para reforma e melhoria das instalações do abrigo',
    status: 'Ativa' as const,
    raised: 18500,
    goal: 30000,
    progress: 61.7,
    donations: 89,
    date: '15/06/2025',
    category: 'Reforma'
  },
  {
    id: 3,
    title: 'Campanha de Natal 2024',
    description: 'Arrecadação para cestas natalinas e presentes para crianças carentes',
    status: 'Encerrada' as const,
    raised: 25000,
    goal: 25000,
    progress: 100.0,
    donations: 156,
    date: '25/12/2024',
    category: 'Natal'
  },
  {
    id: 4,
    title: 'Campanha Volta às Aulas 2025',
    description: 'Material escolar para crianças em situação de vulnerabilidade',
    status: 'Ativa' as const,
    raised: 7200,
    goal: 15000,
    progress: 48.0,
    donations: 43,
    date: '28/02/2025',
    category: 'Volta às Aulas'
  },
  {
    id: 5,
    title: 'Construção de Poço Artesiano',
    description: 'Projeto para construção de poço artesiano em comunidade rural',
    status: 'Ativa' as const,
    raised: 12300,
    goal: 20000,
    progress: 61.5,
    donations: 67,
    date: '10/03/2025',
    category: 'Infraestrutura'
  },
  {
    id: 6,
    title: 'Campanha de Agasalho 2024',
    description: 'Arrecadação de roupas e cobertores para o inverno',
    status: 'Encerrada' as const,
    raised: 15000,
    goal: 15000,
    progress: 100.0,
    donations: 89,
    date: '15/06/2024',
    category: 'Assistência Social'
  }
];

export const recentDonations = [
  { id: 1, donor: 'João da Silva', amount: 200, date: '20/08/2025' },
  { id: 2, donor: 'Osvaldo Cruz', amount: 200, date: '20/08/2025' },
  { id: 3, donor: 'Kleber Marques', amount: 200, date: '20/08/2025' }
];
