export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price_per_day: number;
  price_sale: number | null;
  condition: 'new' | 'used';
  transmission: 'manual' | 'automatic';
  fuel_type: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  seats: number;
  mileage: number | null;
  image_url: string;
  images: string[];
  description: string;
  is_available: boolean;
  location: string;
  rating: number;
  features: string[];
  created_at: string;
}

export interface Rental {
  id: string;
  user_id: string;
  car_id: string;
  start_date: string;
  end_date: string;
  total_price: number;
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  pickup_location: string;
  dropoff_location: string;
  payment_status: 'pending' | 'paid' | 'refunded';
  created_at: string;
  car?: Car;
}

export interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface DocumentRenewal {
  id: string;
  user_id: string;
  document_type: 'registration' | 'insurance' | 'license' | 'inspection';
  vehicle_registration: string;
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
  expiry_date: string | null;
  renewal_date: string | null;
  document_urls: string[];
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface BrainTeaser {
  id: string;
  title: string;
  question: string;
  options: string[];
  correct_answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'trivia' | 'puzzle' | 'quiz' | 'riddle';
  points: number;
  created_at: string;
}

export interface LeaderboardEntry {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  total_points: number;
  correct_answers: number;
  total_attempts: number;
}
