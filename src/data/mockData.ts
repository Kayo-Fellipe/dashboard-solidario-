export interface Campaign {
  id: string;
  title: string;
  description: string;
  goal: number;
  raised: number;
  donors: number;
  daysLeft: number;
  category: string;
  image: string;
  status: 'active' | 'completed' | 'draft';
}

export interface Stats {
  totalRaised: number;
  totalDonors: number;
  activeCampaigns: number;
  completedCampaigns: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
}

export interface DonationTrendPoint {
  date: string;
  amount: number;
}

export interface DonorAnalytics {
  newDonors: number;
  returningDonors: number;
  averageDonation: number;
  topDonationAmount: number;
}

export interface CampaignPerformance {
  campaignId: string;
  title: string;
  conversionRate: number;
  clickThroughRate: number;
  socialShares: number;
  emailOpens: number;
}

export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'Help Build Clean Water Wells',
    description: 'Providing clean water access to rural communities in need.',
    goal: 50000,
    raised: 32500,
    donors: 245,
    daysLeft: 15,
    category: 'Health',
    image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg',
    status: 'active'
  },
  {
    id: '2',
    title: 'Education for All Children',
    description: 'Supporting education initiatives for underprivileged children.',
    goal: 25000,
    raised: 18750,
    donors: 156,
    daysLeft: 8,
    category: 'Education',
    image: 'https://images.pexels.com/photos/1720186/pexels-photo-1720186.jpeg',
    status: 'active'
  },
  {
    id: '3',
    title: 'Emergency Food Relief',
    description: 'Providing emergency food supplies to families in crisis.',
    goal: 75000,
    raised: 75000,
    donors: 423,
    daysLeft: 0,
    category: 'Emergency',
    image: 'https://images.pexels.com/photos/6995247/pexels-photo-6995247.jpeg',
    status: 'completed'
  },
  {
    id: '4',
    title: 'Medical Equipment Fund',
    description: 'Purchasing essential medical equipment for local hospitals.',
    goal: 100000,
    raised: 45000,
    donors: 189,
    daysLeft: 22,
    category: 'Health',
    image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg',
    status: 'active'
  }
];

export const mockStats: Stats = {
  totalRaised: 171250,
  totalDonors: 1013,
  activeCampaigns: 3,
  completedCampaigns: 1
};

export const mockChartData: ChartDataPoint[] = [
  { name: 'Health', value: 77500 },
  { name: 'Education', value: 18750 },
  { name: 'Emergency', value: 75000 }
];

export const mockDonationTrend: DonationTrendPoint[] = [
  { date: '2024-01-01', amount: 5000 },
  { date: '2024-01-02', amount: 7500 },
  { date: '2024-01-03', amount: 6200 },
  { date: '2024-01-04', amount: 8900 },
  { date: '2024-01-05', amount: 12000 },
  { date: '2024-01-06', amount: 9800 },
  { date: '2024-01-07', amount: 15600 }
];

export const mockDonorAnalytics: DonorAnalytics = {
  newDonors: 156,
  returningDonors: 857,
  averageDonation: 169,
  topDonationAmount: 5000
};

export const mockCampaignPerformance: CampaignPerformance[] = [
  {
    campaignId: '1',
    title: 'Help Build Clean Water Wells',
    conversionRate: 3.2,
    clickThroughRate: 12.5,
    socialShares: 89,
    emailOpens: 1250
  },
  {
    campaignId: '2',
    title: 'Education for All Children',
    conversionRate: 2.8,
    clickThroughRate: 9.8,
    socialShares: 67,
    emailOpens: 890
  },
  {
    campaignId: '3',
    title: 'Emergency Food Relief',
    conversionRate: 4.1,
    clickThroughRate: 15.2,
    socialShares: 156,
    emailOpens: 2100
  },
  {
    campaignId: '4',
    title: 'Medical Equipment Fund',
    conversionRate: 2.5,
    clickThroughRate: 8.9,
    socialShares: 45,
    emailOpens: 670
  }
];