
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

export interface ImpactStory {
  id: string;
  title: string;
  category: 'Orphans' | 'Widows' | 'Community' | 'Education';
  image_url: string; // Changed from image to match DB
  description: string;
  date_distributed: string; // Changed from date to match DB
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface DonationTier {
  amount: number;
  label: string;
  description: string;
  theme: 'red' | 'black' | 'white';
}

// Auth & DB Types
export type UserRole = 'donor' | 'admin';

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  phone_number?: string;
  avatar_url?: string;
}

export interface AdminDonorView {
  user_id: string;
  full_name: string;
  email: string;
  phone_number: string;
  pledge_amount: number;
  tier_name: string;
  pledge_status: 'active' | 'paused' | 'cancelled';
  last_donation_date: string;
  current_month_status: 'Paid' | 'Unpaid' | 'No Pledge';
}
