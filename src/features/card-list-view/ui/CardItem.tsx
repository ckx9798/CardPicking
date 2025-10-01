'use client';

import { CardListItem } from '@/shared/types/card';
import Image from 'next/image';
import { getBenefitIcon } from '@/shared/types/constants';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface CardItemProps {
  card: CardListItem;
  isComparing: boolean;
  onToggleCompare: (id: string) => void;
}

export function CardItem({
  card,
  isComparing,
  onToggleCompare,
}: CardItemProps) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group flex transform flex-col justify-between rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? (
        <div className="flex h-72 items-center justify-center rounded-t-2xl bg-slate-100 p-5">
          <Image
            src={card.image_url}
            alt={card.card_name}
            width={220}
            height={138}
            className="h-40 w-auto rounded-xl object-contain"
          />
        </div>
      ) : (
        <div className="relative h-72 rounded-t-2xl bg-gradient-to-br from-indigo-400 via-blue-300 to-purple-300 px-5 py-8 text-white shadow-lg">
          <Image
            src={card.image_url}
            alt={card.card_name}
            width={200}
            height={126}
            className="mb-4 h-32 w-auto rounded-xl"
          />
          <div className="text-md font-medium opacity-90">{card.bank_name}</div>
          <div className="text-2xl font-extrabold tracking-tight">
            {card.card_name}
          </div>
          <p className="mt-1 line-clamp-2 text-sm opacity-80">
            {card.card_description}
          </p>
        </div>
      )}
      <div className="flex-grow p-5">
        <h4 className="mb-3 text-sm font-semibold text-slate-800">주요 혜택</h4>
        <ul className="space-y-2">
          {card.major_benefits.slice(0, 3).map((benefit, index) => (
            <li
              key={index}
              className="flex items-center text-sm text-slate-600"
            >
              <span className="mr-2 text-lg">{getBenefitIcon(benefit)}</span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-slate-100 p-5">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onToggleCompare(card.id)}
            className={`w-full rounded-lg py-2.5 text-center text-sm font-semibold transition-colors ${isComparing ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            {isComparing ? '비교함에서 빼기' : '비교함에 담기'}
          </button>
          <button
            onClick={() => router.push(`/list/${card.id}`)}
            className="w-full rounded-lg bg-indigo-600 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
          >
            상세보기
          </button>
        </div>
      </div>
    </div>
  );
}
