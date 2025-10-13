'use client';

interface ComparisonBarProps {
  count: number;
  onClear: () => void;
  onCompare: () => void;
}

export function ComparisonBar({
  count,
  onClear,
  onCompare,
}: ComparisonBarProps) {
  if (count === 0) return null;

  return (
    <div className="fixed right-0 bottom-0 left-0 z-50">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between rounded-xl bg-slate-800 p-4 shadow-2xl">
          <div>
            <p className="font-semibold text-white">카드를 비교해보세요</p>
            <p className="text-sm text-slate-300">
              {count}개의 카드가 선택되었어요.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClear}
              className="text-sm text-slate-400 hover:text-white"
            >
              초기화
            </button>
            <button
              onClick={onCompare}
              className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-500"
            >
              비교하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
