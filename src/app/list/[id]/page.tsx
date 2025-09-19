'use client';

import React, { useEffect, useMemo, useState } from 'react';

import { Card } from './mock';
import { evaluateBenefitRate } from '@/shared/utils/evaluateBenefitRate';
import { formatPrice } from '@/shared/utils/formatPrice';

// Assuming Card is imported from '../[id]/mock' as provided in the DynamicDiscountForm

// Re-defining interfaces for clarity, assuming they are consistent with your 'Card' mock data.
interface AnnualFee {
  company: string;
  fee: number;
}

interface BenefitGrade {
  required_payment: number;
  max_benefit: number;
}

interface Benefit {
  id: string;
  title: string;
  description: string;
  discount_rate?: number; // Optional, as some benefits might not have a direct rate
  grades?: BenefitGrade[];
}

interface CardProps {
  image_url: string;
  card_name: string;
  card_description: string;
  major_benefits: string[];
  min_previous_amount: number;
  annual_fee: AnnualFee[];
  prev_payment_options: number[];
  benefits: Benefit[];
}

// DynamicDiscountForm component (as provided by you, integrated here)
function DynamicDiscountForm() {
  const [selectedPreviousPayment, setSelectedPreviousPayment] = useState('');
  const [formValues, setFormValues] = useState({});
  const [switchStates, setSwitchStates] = useState({});
  const [result, setResult] = useState(null);
  const [selectedAnnualFee, setSelectedAnnualFee] = useState(
    Card.annual_fee[0]?.fee || 0,
  );

  // 최대 사용금액 계산 함수
  function getMaxUsage(
    benefit: Benefit,
    selectedPreviousPayment: string | number,
  ) {
    if (!selectedPreviousPayment) return 0;
    const grade = benefit.grades
      ?.filter(
        (g) => Number(g.required_payment) <= Number(selectedPreviousPayment),
      )
      .sort(
        (a, b) => Number(b.required_payment) - Number(a.required_payment),
      )[0];
    if (!grade) return 0;
    if (benefit.discount_rate) {
      return Math.floor(Number(grade.max_benefit) / benefit.discount_rate);
    } else {
      // 할인율이 없으면 최대 혜택 금액만 입력
      return Number(grade.max_benefit);
    }
  }

  // 스위치 토글 핸들러
  const handleSwitchToggle = (benefit: Benefit) => {
    const isOn = !switchStates[benefit.id];
    setSwitchStates((prev) => ({
      ...prev,
      [benefit.id]: isOn,
    }));
    if (benefit.discount_rate) {
      setFormValues((prev) => ({
        ...prev,
        [benefit.id]: isOn ? getMaxUsage(benefit, selectedPreviousPayment) : '',
      }));
    } else {
      setFormValues((prev) => ({
        ...prev,
        [benefit.id]: isOn ? getMaxUsage(benefit, selectedPreviousPayment) : 0,
      }));
    }
  };

  // 입력값 변경 핸들러 (discount_rate가 있는 경우만)
  const handleInputChange = (benefit: Benefit, value: string) => {
    if (benefit.discount_rate === undefined || benefit.discount_rate === null)
      return; // Only for benefits with discount_rate
    let v = Number(value);
    const maxUsage = getMaxUsage(benefit, selectedPreviousPayment);
    if (v > maxUsage) v = maxUsage;
    if (v < 0) v = 0;
    setFormValues((prev) => ({
      ...prev,
      [benefit.id]: v,
    }));
    // 토글 상태를 해제(적용이 아닌 수동입력임을 표시)
    setSwitchStates((prev) => ({
      ...prev,
      [benefit.id]: false,
    }));
  };

  // 할인액 계산 함수
  function getDiscountedAmount(
    benefit: Benefit,
    selectedPrevPayment: string | number,
    inputAmount: number | string,
  ) {
    if (!selectedPrevPayment) return 0;
    const grade = benefit.grades
      ?.filter((g) => Number(g.required_payment) <= Number(selectedPrevPayment))
      .sort(
        (a, b) => Number(b.required_payment) - Number(a.required_payment),
      )[0];
    if (!grade) return 0;

    const inputNum = Number(inputAmount);

    if (benefit.discount_rate !== undefined && benefit.discount_rate !== null) {
      const rawDiscount = inputNum * benefit.discount_rate;
      const maxDiscount = Number(grade.max_benefit);
      return rawDiscount > maxDiscount ? maxDiscount : rawDiscount;
    } else {
      // 할인율이 없으면 최대 혜택 금액과 입력 금액이 일치할 때만 최대 혜택 반환
      return Number(grade.max_benefit) === inputNum
        ? Number(grade.max_benefit)
        : 0;
    }
  }

  // 제출 시 전체 할인액 계산
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPreviousPayment) {
      alert('전월실적을 선택하세요.');
      return;
    }
    const discounts = Card.benefits.map((benefit) => {
      const input =
        formValues[benefit.id] !== undefined
          ? Number(formValues[benefit.id])
          : '';
      const discount = getDiscountedAmount(
        benefit,
        selectedPreviousPayment,
        input,
      );
      return {
        title: benefit.title,
        input,
        discount,
      };
    });
    setResult(discounts);
  };

  // 피킹률 계산 함수
  function getPickingRate(
    totalDiscount: number,
    annualFee: number,
    prevPayment: number,
  ) {
    if (!prevPayment || prevPayment === 0) return 0;
    const pickingRate = ((totalDiscount - annualFee / 12) / prevPayment) * 100;
    return pickingRate;
  }

  // 연회비 옵션
  const annualFeeOptions = Card.annual_fee.map((fee) => ({
    label: `${fee.company} ${Number(fee.fee).toLocaleString()}원`,
    value: fee.fee,
  }));

  // 결과 계산
  const totalDiscount = result
    ? result.reduce((acc, cur) => acc + cur.discount, 0)
    : 0;
  const pickingRate = getPickingRate(
    totalDiscount,
    Number(selectedAnnualFee),
    Number(selectedPreviousPayment),
  );

  // 실적 변경 시 전체 초기화
  const handlePrevPaymentChange = (opt: number) => {
    setSelectedPreviousPayment(opt.toString()); // Ensure it's a string for consistency if needed
    setSwitchStates({});
    setFormValues({});
    setResult(null);
  };

  return (
    <div className="text-text mx-auto my-10 max-w-3xl rounded-xl border border-gray-200 bg-white px-10 py-12 shadow-lg">
      <h2 className="mb-6 text-center text-2xl font-bold text-green-700">
        나의 할인 계산기
      </h2>

      {/* 전월실적 */}
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {Card.prev_payment_options.map((opt) => (
          <button
            key={opt}
            className={`text-md min-w-[80px] flex-1 rounded-lg px-4 py-3 font-semibold transition-all duration-200 ${selectedPreviousPayment === opt.toString() ? 'bg-green-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => handlePrevPaymentChange(opt)}
            type="button"
          >
            {formatPrice(opt)}
          </button>
        ))}
      </div>

      <div className="mb-6">
        <label
          htmlFor="annual-fee-select"
          className="text-md mb-2 block font-medium text-gray-700"
        >
          연회비 선택
        </label>
        <select
          id="annual-fee-select"
          className="text-md w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
          value={selectedAnnualFee}
          onChange={(e) => setSelectedAnnualFee(Number(e.target.value))}
        >
          {annualFeeOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* 혜택계산 */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {Card.benefits.map((benefit) => {
          const isNoRate =
            benefit.discount_rate === undefined ||
            benefit.discount_rate === null;
          const isApplied = !!switchStates[benefit.id];
          const maxUsage = getMaxUsage(benefit, selectedPreviousPayment);
          const value =
            formValues[benefit.id] !== undefined ? formValues[benefit.id] : '';

          return (
            <div
              key={benefit.id}
              className="rounded-3xl border border-gray-200 bg-white p-4"
            >
              <div className="mb-2 flex items-center justify-between">
                <label className="block text-lg font-medium text-gray-800">
                  {benefit.title}
                  {benefit.discount_rate
                    ? ` (${(benefit.discount_rate * 100).toFixed(0)}% 할인)`
                    : ''}
                </label>
                <label className="flex cursor-pointer items-center">
                  <span className="mr-2 text-sm text-gray-600">
                    최대 혜택 적용
                  </span>
                  <input
                    type="checkbox"
                    checked={isApplied}
                    onChange={() => handleSwitchToggle(benefit)}
                    className="peer sr-only"
                  />
                  <div className="peer relative h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-green-600 peer-focus:ring-2 peer-focus:ring-green-300 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                </label>
              </div>
              <input
                type="number"
                className={`w-full rounded-lg border px-4 py-2 text-lg focus:ring-2 focus:ring-green-400 focus:outline-none ${isNoRate ? 'cursor-not-allowed border-gray-300 bg-gray-100 text-gray-500' : 'border-gray-300 bg-white'}`}
                placeholder={
                  isNoRate
                    ? '최대값만 자동 적용'
                    : `${benefit.title} 사용금액 입력 (최대 ${maxUsage.toLocaleString()}원)`
                }
                value={isNoRate ? (isApplied ? maxUsage : 0) : value}
                onChange={
                  isNoRate
                    ? undefined
                    : (e) => handleInputChange(benefit, e.target.value)
                }
                min={0}
                max={maxUsage === 0 ? undefined : maxUsage} // Ensure max is set for non-zero maxUsage
                readOnly={isNoRate}
                disabled={isNoRate}
              />
              {!isNoRate &&
                selectedPreviousPayment && ( // Only show max usage if a payment tier is selected and it's not a fixed benefit
                  <p className="mt-2 text-sm text-gray-500">
                    선택된 실적 기준, 최대 사용금액:{' '}
                    <span className="font-semibold">
                      {maxUsage.toLocaleString()}원
                    </span>
                  </p>
                )}
              {isNoRate &&
                selectedPreviousPayment && ( // For benefits without a rate, show the exact max benefit
                  <p className="mt-2 text-sm text-gray-500">
                    선택된 실적 기준, 혜택 금액:{' '}
                    <span className="font-semibold">
                      {maxUsage.toLocaleString()}원
                    </span>
                  </p>
                )}
            </div>
          );
        })}
        <button
          type="submit"
          className="w-full rounded-lg bg-green-600 py-3 text-lg font-bold text-white shadow-md transition duration-300 hover:bg-green-700"
        >
          할인액 계산하기
        </button>
      </form>

      {/* 계산결과 */}
      {result && (
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
      )}
    </div>
  );
}

// Main CardDetailPage component
export default function CardDetailPage() {
  const [cardData, setCardData] = useState<CardProps | null>(null);

  // Simulate data fetching
  useEffect(() => {
    // In a real application, you would fetch data based on card ID from the URL
    setCardData(Card); // Using the imported mock data directly
  }, []);

  if (!cardData) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-600">
        카드 정보를 불러오는 중입니다...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Card Header Section */}
      <div className="bg-white py-10 shadow-sm">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-4">
          <img
            src={cardData.image_url}
            alt={cardData.card_name}
            className="h-48 w-32 rounded-lg border border-gray-200 object-cover shadow-md"
          />
          <div className="mt-4 text-center">
            <h1 className="text-3xl font-extrabold text-gray-800">
              {cardData.card_name}
            </h1>
            <p className="text-md mt-2 text-gray-600">
              {cardData.card_description}
            </p>
          </div>
          <button className="mt-8 rounded-full bg-green-600 px-8 py-3 text-lg font-bold text-white shadow-lg transition duration-300 hover:bg-green-700">
            카드 신청하기
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-3xl space-y-12 px-4 py-10">
        {/* Key Benefits */}
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">주요 혜택</h2>
          <ul className="grid list-none grid-cols-1 gap-3 p-0 text-gray-700 md:grid-cols-2">
            {cardData.major_benefits.map((benefit, index) => (
              <li
                key={index}
                className="flex items-center text-lg leading-relaxed"
              >
                <span className="mr-2 text-xl text-green-500">✨</span>{' '}
                {benefit}
              </li>
            ))}
          </ul>
        </section>

        {/* Dynamic Discount Form - The newly designed calculator */}
        <DynamicDiscountForm />

        {/* Detailed Benefits - Original section from your code */}
        <section className="my-10 flex flex-col items-center justify-center space-y-6">
          <h2 className="mb-4 text-3xl font-bold text-gray-800">
            모든 혜택 상세
          </h2>
          {cardData.benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="w-full max-w-3xl rounded-xl border border-gray-200 bg-white p-6 shadow-md"
            >
              <h3 className="mb-4 text-xl font-bold text-gray-800">
                {benefit.title}
              </h3>
              <div className="text-md leading-8 text-gray-700">
                <div
                  dangerouslySetInnerHTML={{ __html: benefit.description }}
                />
              </div>
              {benefit.grades && benefit.grades.length > 0 && (
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <h4 className="mb-2 font-semibold text-gray-700">
                    실적 구간별 최대 혜택
                  </h4>
                  <ul className="ml-5 list-disc space-y-1 text-sm text-gray-600">
                    {benefit.grades.map((grade, index) => (
                      <li key={index}>
                        전월 실적{' '}
                        <span className="font-bold">
                          {Number(grade.required_payment).toLocaleString()}원
                        </span>{' '}
                        이상: 최대{' '}
                        <span className="font-bold text-green-600">
                          {Number(grade.max_benefit).toLocaleString()}원
                        </span>{' '}
                        혜택
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
