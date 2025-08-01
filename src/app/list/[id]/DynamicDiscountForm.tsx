'use client';

import { formatPrice } from '@/shared/utils/formatPrice';
import { Card } from './mock';
import { useState } from 'react';

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
  discount_rate?: number;
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

export default function DynamicDiscountForm() {
  const [data, setData] = useState<CardProps | null>(Card);
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

  // 입력값 변경 핸들러
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
    setSwitchStates((prev) => ({
      ...prev,
      [benefit.id]: false,
    }));
  };

  // 할인액 계산 함수
  function getDiscountedAmount(
    benefit: Benefit,
    selectedPrevPayment: string | number,
  ) {
    if (!selectedPrevPayment) return 0;
    const grade = benefit.grades
      ?.filter((g) => Number(g.required_payment) <= Number(selectedPrevPayment))
      .sort(
        (a, b) => Number(b.required_payment) - Number(a.required_payment),
      )[0];
    if (!grade) return 0;
  }

  // 제출 전체 할인액 계산
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

  const pickingRate = getPickingRate(
    totalDiscount,
    Number(selectedAnnualFee),
    Number(selectedPreviousPayment),
  );

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

  // 실적 변경 클린업 함수
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

      {/* 연회비 선택 */}
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
    </div>
  );
}
