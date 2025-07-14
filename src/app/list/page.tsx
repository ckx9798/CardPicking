'use client';

import { useMemo, useState } from 'react';

import { mockCardData } from './[id]/mockCardData';
import { useRouter } from 'next/navigation';

export default function ListPage() {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [selectedBenefits, setSelectedBenefits] = useState([]);

  const filteredAndSortedCards = useMemo(() => {
    return mockCardData.filter((card) => {
      // 검색어 필터 (카드 이름, 설명으로 검색)
      const searchTermMatch =
        card.card_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.card_description.toLowerCase().includes(searchTerm.toLowerCase());
      // 카드사 필터
      const companyMatch =
        selectedCompanies.length === 0 ||
        selectedCompanies.includes(card.bank_name);
      // 혜택 필터
      const benefitMatch =
        selectedBenefits.length === 0 ||
        selectedBenefits.every((benefit) => card.tags.includes(benefit));

      return searchTermMatch && companyMatch && benefitMatch;
    });
  }, [searchTerm, selectedCompanies, selectedBenefits]);

  const toggleCompanyFilter = (company) => {
    setSelectedCompanies((prev) =>
      prev.includes(company)
        ? prev.filter((c) => c !== company)
        : [...prev, company],
    );
  };

  const toggleBenefitFilter = (benefit) => {
    setSelectedBenefits((prev) =>
      prev.includes(benefit)
        ? prev.filter((b) => b !== benefit)
        : [...prev, benefit],
    );
  };

  const allCompanies = [
    '신한카드',
    'KB국민카드',
    '삼성카드',
    '현대카드',
    '롯데카드',
    '우리카드',
  ];
  const allBenefits = [
    '교통',
    '쇼핑',
    '통신',
    '커피',
    '여행',
    '프리미엄',
    '주유',
  ];

  const benefitIcons = {
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
  };

  const getBenefitIcon = (benefitText) => {
    for (const key in benefitIcons) {
      if (benefitText.includes(key)) return benefitIcons[key];
    }
    return '✔️'; // 기본 아이콘
  };

  return (
    <div className="mx-auto w-full max-w-3xl rounded-lg bg-white p-6 shadow">
      {/* 헤더 */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-slate-800">
          내게 꼭 맞는 카드 찾기
        </h1>
        <p className="mt-2 text-lg text-slate-500">
          다양한 카드를 비교해보고 최고의 혜택을 찾아보세요.
        </p>
        <div className="relative mt-6">
          <span className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400">
            {'🔍'}
          </span>
          <input
            type="text"
            placeholder="카드 이름이나 혜택으로 검색해보세요 (예: 삑, 쇼핑)"
            className="w-full rounded-full border border-slate-300 bg-white py-3 pr-4 pl-12 text-base focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      {/* 필터섹션 */}
      <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-slate-700">
          상세 조건 설정
        </h3>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-slate-600">
            카드사
          </label>
          <div className="flex flex-wrap gap-2">
            {allCompanies.map((company) => (
              <button
                key={company}
                onClick={() => toggleCompanyFilter(company)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${selectedCompanies.includes(company) ? 'bg-indigo-600 text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              >
                {company}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600">
            주요 혜택
          </label>
          <div className="flex flex-wrap gap-2">
            {allBenefits.map((benefit) => (
              <button
                key={benefit}
                onClick={() => toggleBenefitFilter(benefit)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${selectedBenefits.includes(benefit) ? 'bg-indigo-600 text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              >
                {benefit}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 결과 헤더  */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-base font-medium text-slate-700">
          <span className="font-bold text-indigo-600">
            {filteredAndSortedCards.length}개
          </span>
          의 카드를 찾았어요.
        </p>
        <select className="rounded-lg border-slate-300 text-sm focus:border-indigo-500 focus:ring-indigo-500">
          <option>인기순</option>
          <option>혜택 많은 순</option>
          <option>연회비 낮은 순</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-600">
          주요 혜택
        </label>
        <div className="flex flex-wrap gap-2">
          {allBenefits.map((benefit) => (
            <button
              key={benefit}
              onClick={() => toggleBenefitFilter(benefit)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${selectedBenefits.includes(benefit) ? 'bg-indigo-600 text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            >
              {benefit}
            </button>
          ))}
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
