import React from 'react';

export const Card = () => {
  return (
    <div className="bg-gray100 flex items-start gap-8 rounded-lg px-6 py-8">
      <div>
        <img
          src="https://d1c5n4ri2guedi.cloudfront.net/card/13/card_img/28201/13card.png"
          alt="신한카드 B.Big"
          className="h-38 w-24 rounded-md object-cover"
        />
      </div>

      <div className="flex h-38 flex-col justify-between">
        <div className="text-text text-xl font-bold">신한카드 B.Big(빅)</div>

        <div className="-mt-3 flex gap-4">
          <span className="bg-main inline-block rounded-full px-4 py-1 text-sm font-semibold">
            월 최대 혜택 48,000원
          </span>
          <span className="bg-main inline-block rounded-full px-4 py-1 text-sm font-semibold">
            최대 피킹률 5%
          </span>
        </div>

        <ul className="text-text flex gap-4 text-sm">
          <li className="text-text inline-block rounded-full px-3 py-1 text-xs font-semibold shadow-sm">
            커피 50%
          </li>
          <li className="text-text inline-block rounded-full px-4 py-1 text-xs font-semibold shadow-sm">
            주유 10%
          </li>
          <li className="text-text inline-block rounded-full px-4 py-1 text-xs font-semibold shadow-sm">
            놀이공원 10%
          </li>
        </ul>

        <div className="flex gap-3">
          <div className="text-text inline-block rounded px-2 py-1 text-xs font-medium">
            🚀 연회비 13,000원
          </div>
          <div className="text-text inline-block rounded px-2 py-1 text-xs font-medium">
            🚀 전월실적 300,000원
          </div>
        </div>
      </div>
    </div>
  );
};
