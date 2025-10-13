'use client';

interface ListHeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export function ListHeader({ searchTerm, onSearchChange }: ListHeaderProps) {
  return (
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
          placeholder="카드 이름이나 혜택으로 검색해보세요"
          className="w-full rounded-full border border-slate-300 bg-white py-3 pr-4 pl-12 text-base focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </header>
  );
}
