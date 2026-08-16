export interface NavItem {
  title: string;
  href: string;
  description?: string;
  badge?: string;
}

export interface Destination {
  id: string;
  title: string;
  country: string;
  region: 'asia' | 'europe' | 'americas' | 'tropical' | 'exotic';
  tagline: string;
  rating: number;
  reviewsCount: number;
  pricePerNight: number;
  durationDays: number;
  image: string;
  featured?: boolean;
  highlights: string[];
  vibe: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number;
  destination: string;
  location: string;
}

export interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  priceMonthly: number;
  priceAnnually: number;
  popular?: boolean;
  features: string[];
  ctaText: string;
  ctaHref: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'membership' | 'booking' | 'perks' | 'cancellation';
}

export interface BookingFormData {
  destinationId: string;
  travelers: number;
  startDate: string;
  endDate: string;
  tier: string;
  specialRequests?: string;
}
