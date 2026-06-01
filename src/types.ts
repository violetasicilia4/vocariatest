export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  imageUrl: string;
  readTime: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tag: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
}

export type HeroVersion = 'V1' | 'V2' | 'V3';
