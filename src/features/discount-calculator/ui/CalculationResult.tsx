'use client';

import { DiscountResult } from '@/shared/types/card';
import { evaluateBenefitRate } from '@/shared/utils/evaluateBenefitRate';

interface CalculationResultProps {
  result: DiscountResult[];
  totalDiscount: number;
  pickingRate: number;
}

export function CalculationResult({
  result,
  totalDiscount,
  pickingRate,
}: CalculationResultProps) {
  return (
    <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-md">
      <h3 className="mb-5 text-center text-xl font-bold text-gray-800">
        계산 결과
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full rounded-lg border border-gray-200 text-center text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border-b border-gray-200 px-3 py-3 font-semibold text-gray-700">
                혜택명
              </th>
              <th className="border-b border-gray-200 px-3 py-3 font-semibold text-gray-700">
                사용금액
              </th>
              <th className="border-b border-gray-200 px-3 py-3 font-semibold text-gray-700">
                할인액
              </th>
            </tr>
          </thead>
          <tbody>
            {result.map((r) => (
              <tr key={r.title} className="hover:bg-gray-50">
                <td className="border-b border-gray-200 px-3 py-3">
                  {r.title}
                </td>
                <td className="border-b border-gray-200 px-3 py-3">
                  {Number(r.input).toLocaleString()}원
                </td>
                <td className="border-b border-gray-200 px-3 py-3 font-bold text-green-600">
                  {Number(r.discount).toLocaleString()}원
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 flex flex-col items-end gap-2 pr-2">
        <div className="text-2xl font-extrabold text-green-700">
          총 할인액:{' '}
          <span className="text-green-600">
            {totalDiscount.toLocaleString()}원
          </span>
        </div>
        <div className="text-xl font-bold text-blue-600">
          피킹률:{' '}
          <span className="text-blue-500">{pickingRate.toFixed(2)}%</span>
        </div>
        <div className="text-lg font-bold text-gray-700">
          {evaluateBenefitRate(pickingRate.toFixed(2))}
        </div>
      </div>
    </div>
  );
}
