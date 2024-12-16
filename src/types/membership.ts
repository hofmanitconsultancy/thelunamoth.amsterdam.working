export interface MembershipTier {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  description: string;
}

export interface UserMembership {
  userId: string;
  tierId: string;
  startDate: Date;
  status: 'active' | 'cancelled' | 'expired';
}