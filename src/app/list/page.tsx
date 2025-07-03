/** @format */

export default function Shinhan() {
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
        {/* 카드 1 */}
        <div className="bg-gray100 flex items-start gap-8 rounded-lg px-6 py-8">
          <div>
            <img
              src="https://d1c5n4ri2guedi.cloudfront.net/card/13/card_img/28201/13card.png"
              alt="신한카드 B.Big"
              className="h-38 w-24 rounded-md object-cover"
            />
          </div>

          <div className="flex h-38 flex-col justify-between">
            <div className="text-text text-xl font-bold">
              신한카드 B.Big(빅)
            </div>

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

        <div className="flex items-start gap-4 rounded-lg bg-gray-50 p-4">
          <img
            src="https://via.placeholder.com/60x90"
            alt="신한카드 B.Big"
            className="h-24 w-16 rounded-md object-cover"
          />
          <div>
            <div className="text-lg font-bold text-gray-900">
              신한카드 B.Big(빅)
            </div>
            <div className="mt-1 text-sm font-semibold text-green-700">
              월 최대 혜택 48,000원
            </div>

            <ul className="flex gap-10 text-sm text-gray-700">
              <li className="px-4 py-4">대중교통 최대 1만 8천원</li>
              <li>택시 10%</li>
            </ul>
            <span className="mt-2 inline-block rounded bg-green-100 px-2 py-0.5 text-xs text-green-700">
              22만원 캐시백 이벤트
            </span>
            <div className="mt-1 text-xs text-gray-500">
              연회비 13,000원 · 전월실적 30만원 이상
            </div>
          </div>
        </div>

        {/* 카드 2 */}
        <div className="flex items-start gap-4 rounded-lg bg-gray-50 p-4">
          <img
            src="https://via.placeholder.com/60x90"
            alt="신한카드 Deep Oil"
            className="h-24 w-16 rounded-md object-cover"
          />
          <div>
            <div className="text-base font-bold text-gray-900">
              신한카드 Deep Oil
            </div>
            <div className="mt-1 text-sm font-semibold text-green-700">
              월 최대 혜택 42,500원
            </div>
            <div className="mt-1 text-xs text-gray-500">
              연회비 13,000원 · 전월실적 30만원 이상
            </div>
            <ul className="mt-2 space-y-0.5 text-xs text-gray-700">
              <li>주유 10%</li>
              <li>주차장 10%</li>
            </ul>
            <span className="mt-2 inline-block rounded bg-green-100 px-2 py-0.5 text-xs text-green-700">
              22만원 캐시백 이벤트
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
