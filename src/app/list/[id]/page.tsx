'use client';

import { useEffect, useState } from 'react';

import { Card } from './mock';
import { CardData } from '@/shared/types/card';
import { CardDetailView } from '../components/CardDetailView';
import { CardHeader } from '../components/CardHeader';
import { DiscountCalculator } from '@/features/discount-calculator';
import { KeyBenefits } from '../components/KeyBenefits';

export default function CardDetailPage() {
  const [cardData, setCardData] = useState<CardData | null>(null);

  useEffect(() => {
    // 실제 애플리케이션에서는 useParams 등을 통해 id를 얻고 API를 호출합니다.
    setCardData(Card);
  }, []);

  if (!cardData) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-600">
        카드 정보를 불러오는 중입니다...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <CardHeader cardData={cardData} />
      <div className="mx-auto max-w-3xl space-y-12 px-4 py-10">
        <KeyBenefits cardData={cardData} />
        <DiscountCalculator cardData={cardData} />
        <CardDetailView cardData={cardData} />
      </div>
    </div>
  );
}
