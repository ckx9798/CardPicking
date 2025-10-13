export const ALL_COMPANIES = [
  '신한카드',
  'KB국민카드',
  '삼성카드',
  '현대카드',
  '롯데카드',
  '우리카드',
  '하나카드',
  'NH농협카드',
];

export const ALL_BENEFITS = [
  '교통',
  '쇼핑',
  '통신',
  '커피',
  '여행',
  '프리미엄',
  '주유',
  '영화',
  '배달',
];

export const BENEFIT_ICONS: Record<string, string> = {
  교통: '🚌',
  대중교통: '🚌',
  택시: '🚕',
  쇼핑: '🛍️',
  백화점: '🏬',
  커피: '☕',
  통신: '📞',
  여행: '✈️',
  프리미엄: '💎',
  주유: '⛽️',
  영화: '🍿',
  배달: '🛵',
};

export const getBenefitIcon = (benefitText: string): string => {
  for (const key in BENEFIT_ICONS) {
    if (benefitText.includes(key)) return BENEFIT_ICONS[key];
  }
  return '✔️';
};
