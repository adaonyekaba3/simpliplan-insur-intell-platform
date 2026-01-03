export interface POSProduct {
  id: string;
  name: string;
  price: number;
  category: 'HEALTH_PLAN' | 'SUPPLEMENT' | 'WELLNESS' | 'SERVICE';
  description: string;
  imageUrl?: string;
}

export const products: POSProduct[] = [
  {
    id: "1",
    name: "Annual Wellness Check",
    price: 150,
    category: "SERVICE",
    description: "Comprehensive health assessment"
  },
  {
    id: "2",
    name: "Vitamin D3 Supplement",
    price: 24.99,
    category: "SUPPLEMENT",
    description: "60-day supply"
  },
  {
    id: "3",
    name: "Premium Health Plan Enrollment",
    price: 299,
    category: "HEALTH_PLAN",
    description: "One-time setup fee"
  },
  {
    id: "4",
    name: "Fitness Consultation",
    price: 75,
    category: "WELLNESS",
    description: "1-hour session"
  },
  {
    id: "5",
    name: "Multivitamin Pack",
    price: 34.99,
    category: "SUPPLEMENT",
    description: "30-day supply"
  },
  {
    id: "6",
    name: "Mental Health Screening",
    price: 50,
    category: "SERVICE",
    description: "Online assessment"
  },
  {
    id: "7",
    name: "Omega-3 Fish Oil",
    price: 29.99,
    category: "SUPPLEMENT",
    description: "90 softgels"
  },
  {
    id: "8",
    name: "Nutrition Coaching",
    price: 120,
    category: "WELLNESS",
    description: "4-week program"
  },
];
