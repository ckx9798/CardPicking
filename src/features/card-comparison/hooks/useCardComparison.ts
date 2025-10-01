'use client';

import { useState } from 'react';

const MAX_COMPARISON_ITEMS = 3;

export function useCardComparison() {
  const [comparisonList, setComparisonList] = useState<string[]>([]);

  const toggleComparison = (cardId: string) => {
    setComparisonList((prev) => {
      if (prev.includes(cardId)) {
        return prev.filter((id) => id !== cardId);
      }
      if (prev.length < MAX_COMPARISON_ITEMS) {
        return [...prev, cardId];
      }
      alert(`카드는 최대 ${MAX_COMPARISON_ITEMS}개까지 비교할 수 있습니다.`);
      return prev;
    });
  };

  const clearComparison = () => setComparisonList([]);

  return { comparisonList, toggleComparison, clearComparison };
}
