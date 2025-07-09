'use client';

import { CardItem } from './components/CardItem';
import { CardList } from './[id]/listmock';
import { useRouter } from 'next/navigation';

export default function Shinhan() {
  const router = useRouter();
  return (
    <div className="mx-auto w-full max-w-3xl rounded-lg bg-white p-6 shadow">
      {/* 헤더 */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold">
          신용카드 - 신한카드 할인·적립 TOP
        </h2>
        <div className="mt-2 flex space-x-4">
          <button className="rounded-full bg-green-100 px-4 py-1 text-xs font-medium text-green-700">
            최대 26만 5천원
          </button>
          <span className="text-xs text-gray-500">이벤트 카드 40</span>
        </div>
      </div>

      {/* 필터 */}
      <div className="mb-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-800">
          전월실적~50만원
        </span>
        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
          신한카드
        </span>
        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
          C 2
        </span>
        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
          캐시백 이벤트
        </span>
        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
          연회비 지원
        </span>
      </div>

      {/* 카드 리스트 */}
      <div className="space-y-6">
        {CardList.map((card) => (
          <CardItem
            key={card.id}
            card={card}
            onClick={() => router.push(`list/${card.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
