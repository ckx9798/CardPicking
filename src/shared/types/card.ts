export interface AnnualFee {
  company: string;
  fee: number;
}

export interface BenefitGrade {
  required_payment: number;
  max_benefit: number;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  discount_rate?: number;
  grades?: BenefitGrade[];
}

export interface CardData {
  image_url: string;
  card_name: string;
  card_description: string;
  major_benefits: string[];
  min_previous_amount: number;
  annual_fee: AnnualFee[];
  prev_payment_options: number[];
  benefits: Benefit[];
}

export interface DiscountResult {
  title: string;
  input: number | '';
  discount: number;
}

export interface CardListItem {
  id: string;
  bank_name: string;
  card_name: string;
  card_description: string;
  image_url: string;
  major_benefits: string[];
  tags: string[];
}
