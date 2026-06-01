import { Testimonial, BlogPost, PricingPlan, ServiceItem } from './types';

// Let's import the specific images we generated or use high-quality Unsplash fallbacks
export const IMAGES = {
  heroClouds: '/src/assets/images/clear_blue_sky_1780058835753.png',
  youngMan: '/src/assets/images/young_man_hoodie_1780058232387.png',
  beachGrass: '/src/assets/images/windy_beach_grass_1780058248331.png',
  workspace: '/src/assets/images/consulting_workspace_1780058264415.png',
  // High-fidelity fallback public stock photos to enrich avatars and backgrounds
  avatar1: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
  avatar2: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
  avatar3: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80',
  avatar4: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80',
  blog1: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
  blog2: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
  blog3: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
};

export const LOGOS = [
  { name: 'Logoipsum 1', icon: 'zap' },
  { name: 'Logoipsum 2', icon: 'shield' },
  { name: 'Logoipsum 3', icon: 'globe' },
  { name: 'Logoipsum 4', icon: 'activity' },
  { name: 'Logoipsum 5', icon: 'sun' },
  { name: 'Logoipsum 6', icon: 'compass' },
  { name: 'Logoipsum 7', icon: 'cpu' },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'ai-strategy',
    title: 'AI Strategy & integration',
    description: 'We help you identify opportunities for AI adoption and implement the right solutions tailored perfectly to your business goals.',
    tags: ['Strategic', 'Implementation', 'Adoption'],
    imageUrl: IMAGES.workspace,
  },
  {
    id: 'business-consulting',
    title: 'Business & digital consulting',
    description: 'We help you identify opportunities for AI adoption, design intelligent workflows, and execute modern digital transformations.',
    tags: ['Workflow', 'Optimization', 'Growth'],
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'data-insights',
    title: 'Data & insights',
    description: 'We help you identify opportunities for AI adoption and unlock highly visual data analytics dashboards to make smarter decisions.',
    tags: ['Analytics', 'Real-time', 'Forecasting'],
    imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80',
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'STARTER PLAN',
    tag: 'Perfect for small teams beginning to explore AI and automation.',
    price: '$2,500',
    description: '/month',
    features: [
      'Strategy consultation (up to 10 hours)',
      'Business process mapping',
      'Basic AI workflow setup',
      'Email support'
    ]
  },
  {
    id: 'growth',
    name: 'GROWTH PLAN',
    tag: 'Designed for growing companies ready to integrate AI into their operations.',
    price: '$8,500',
    description: '/month',
    features: [
      'Dedicated consultant and project manager',
      'End-to-end automation setup',
      'Predictive analytics dashboards',
      'AI-driven reporting & insights'
    ],
    isPopular: true
  },
  {
    id: 'enterprise',
    name: 'ENTERPRISE PLAN',
    tag: 'Custom-built for enterprises seeking full-scale transformation optimization.',
    price: '$10,500',
    description: '/month',
    features: [
      'Tailored AI implementation roadmap',
      'Custom automation architecture',
      'Advanced data analytics and forecasting',
      '24/7 premium support'
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quote: 'They brought clarity to complex problems, breaking down barriers and delivering innovative, highly measurable solutions.',
    author: 'John Doe',
    role: 'Co-Founder',
    company: 'Tech Innovations',
    avatar: IMAGES.avatar2,
  },
  {
    id: '2',
    quote: "Their automation strategy completely reshaped how we work. It's incredibly efficient, intelligent, and seamless.",
    author: 'Jane Smith',
    role: 'Chief Executive',
    company: 'Core Global',
    avatar: IMAGES.avatar1,
  },
  {
    id: '3',
    quote: "Their team paired deep data knowledge with beautiful interface execution. A truly game-changing global consulting partner.",
    author: 'Michael Chang',
    role: 'AI Architect',
    company: 'Synergy Systems',
    avatar: IMAGES.avatar3,
  },
  {
    id: '4',
    quote: "Smarter workflows and more adaptive strategies. Our performance increased by 49% within the first two quarters.",
    author: 'Sarah Jenkins',
    role: 'Director of Tech',
    company: 'Horizon Corp',
    avatar: IMAGES.avatar4,
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Turning Data into Strategy: The Power of Predictive Analytics',
    category: 'Analytics',
    date: 'May 28, 2026',
    imageUrl: IMAGES.blog1,
    readTime: '5 min read'
  },
  {
    id: 'blog-2',
    title: '5 Ways AI Can Streamline Business Operations',
    category: 'Automation',
    date: 'May 24, 2026',
    imageUrl: IMAGES.blog2,
    readTime: '4 min read'
  },
  {
    id: 'blog-3',
    title: 'Human + Machine: Finding the Perfect Balance',
    category: 'Innovation',
    date: 'May 18, 2026',
    imageUrl: IMAGES.blog3,
    readTime: '6 min read'
  }
];
