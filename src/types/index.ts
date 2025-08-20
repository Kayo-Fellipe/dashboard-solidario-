export interface Campaign {
  id: string;
  title: string;
  description: string;
  currentAmount: number;
  targetAmount: number;
  progress: number;
  status: 'active' | 'completed' | 'paused';
  endDate: string;
  donationsCount: number;
  category: string;
  createdAt: string;
}

export interface DashboardStats {
  totalRaised: number;
  totalDonations: number;
  activeCampaigns: number;
  completedCampaigns: number;
  monthlyGrowth: number;
}

export interface ChartData {
  period: string;
  amount: number;
  donations: number;
}