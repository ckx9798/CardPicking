'use client';

import { CardListItem as Card } from '@/shared/types/card';
import { CardItem } from './CardItem';

interface CardListProps {
  cards: Card[];
  comparisonList: string[];
  onToggleCompare: (id: string) => void;
}

export function CardList({
  cards,
  comparisonList,
  onToggleCompare,
}: CardListProps) {
  if (cards.length === 0) {
    return (
      <div className="py-20 text-center text-slate-500">
        조건에 맞는 카드가 없습니다.
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-base font-medium text-slate-700">
          <span className="font-bold text-indigo-600">{cards.length}개</span>의
          카드를 찾았어요.
        </p>
        <select className="rounded-lg border-slate-300 text-sm focus:border-indigo-500 focus:ring-indigo-500">
          <option>인기순</option>
          <option>혜택 많은 순</option>
          <option>연회비 낮은 순</option>
        </select>
      </div>
      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <CardItem
            key={card.id}
            card={card}
            isComparing={comparisonList.includes(card.id)}
            onToggleCompare={onToggleCompare}
          />
        ))}
      </main>
    </>
  );
}
