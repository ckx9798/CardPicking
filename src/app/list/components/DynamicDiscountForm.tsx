'use client';

import { Card } from '../[id]/mock';
import { evaluateBenefitRate } from '@/shared/utils/evaluateBenefitRate';
import { formatPrice } from '@/shared/utils/formatPrice';
import { useState } from 'react';

// 최대 사용금액 계산 함수
function getMaxUsage(benefit, selectedPreviousPayment) {
  if (!selectedPreviousPayment) return '';
  const grade = benefit.grades
    .filter(
      (g) => Number(g.required_payment) <= Number(selectedPreviousPayment),
    )
    .sort((a, b) => Number(b.required_payment) - Number(a.required_payment))[0];
  if (!grade) return '';
  if (benefit.discount_rate) {
    return Math.floor(Number(grade.max_benefit) / benefit.discount_rate);
  } else {
    // 할인율이 없으면 최대 혜택 금액만 입력
    return Number(grade.max_benefit);
  }
}

export default function DynamicDiscountForm() {
  const [selectedPreviousPayment, setSelectedPreviousPayment] = useState('');
  const [formValues, setFormValues] = useState({});
  const [switchStates, setSwitchStates] = useState({});
  const [result, setResult] = useState(null);
  const [selectedAnnualFee, setSelectedAnnualFee] = useState(
    Card.annual_fee[0]?.fee || 0,
  );

  // 스위치 토글 핸들러
  const handleSwitchToggle = (benefit) => {
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
  const handleInputChange = (benefit, value) => {
    if (!benefit.discount_rate) return;
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
  function getDiscountedAmount(benefit, selectedPrevPayment, inputAmount) {
    if (!selectedPrevPayment) return 0;
    const grade = benefit.grades
      .filter((g) => Number(g.required_payment) <= Number(selectedPrevPayment))
      .sort(
        (a, b) => Number(b.required_payment) - Number(a.required_payment),
      )[0];
    if (!grade) return 0;
    if (benefit.discount_rate) {
      const rawDiscount = inputAmount * benefit.discount_rate;
      const maxDiscount = Number(grade.max_benefit);
      return rawDiscount > maxDiscount ? maxDiscount : rawDiscount;
    } else {
      // 할인율이 없으면 최대 혜택 금액만 반환
      return Number(grade.max_benefit) === Number(inputAmount)
        ? Number(grade.max_benefit)
        : 0;
    }
  }

  // 제출 시 전체 할인액 계산
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedPreviousPayment) {
      alert('전월실적을 선택하세요.');
      return;
    }
    const discounts = Card.benefits.map((benefit) => {
      const isNoRate =
        benefit.discount_rate === undefined || benefit.discount_rate === null;
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
  function getPickingRate(totalDiscount, annualFee, prevPayment) {
    if (!prevPayment || prevPayment === '0') return 0;
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
  const handlePrevPaymentChange = (opt) => {
    setSelectedPreviousPayment(opt);
    setSwitchStates({});
    setFormValues({});
    setResult(null);
  };

  return (
    <div className="text-text mx-auto my-10 max-w-xl rounded-lg border p-6">
      <h2 className="mb-6 text-center text-xl font-bold text-green-600">
        할인 계산기
      </h2>
      <div className="mb-4 flex justify-between gap-2">
        {Card.prev_payment_options.map((opt) => (
          <button
            key={opt}
            className={`rounded px-4 py-2 ${selectedPreviousPayment === opt ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handlePrevPaymentChange(opt)}
            type="button"
          >
            {formatPrice(opt)}
          </button>
        ))}
      </div>
      <div className="mb-4">
        <label className="mb-1 block font-medium">연회비 선택</label>
        <select
          className="w-full rounded border px-3 py-2"
          value={selectedAnnualFee}
          onChange={(e) => setSelectedAnnualFee(e.target.value)}
        >
          {annualFeeOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Card.benefits.map((benefit) => {
          const isNoRate =
            benefit.discount_rate === undefined ||
            benefit.discount_rate === null;
          const isApplied = !!switchStates[benefit.id];
          const maxUsage = getMaxUsage(benefit, selectedPreviousPayment);
          const value =
            formValues[benefit.id] !== undefined ? formValues[benefit.id] : '';

          return (
            <div key={benefit.id} className="flex items-center gap-2">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <label className="mb-1 block font-medium">
                    {benefit.title}
                    {benefit.discount_rate
                      ? ` (${benefit.discount_rate * 100}% 할인)`
                      : ''}
                  </label>
                  <label className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={isApplied}
                      onChange={() => handleSwitchToggle(benefit)}
                      className="accent-green-500"
                    />
                    <span className="text-xs">최대 혜택 적용</span>
                  </label>
                </div>
                <input
                  type="number"
                  className="w-full rounded border px-3 py-2"
                  placeholder={
                    benefit.discount_rate
                      ? `${benefit.title} 최대 사용금액`
                      : '최대값만 입력 가능'
                  }
                  value={isNoRate ? (isApplied ? maxUsage : 0) : value}
                  onChange={
                    isNoRate
                      ? undefined
                      : (e) => handleInputChange(benefit, e.target.value)
                  }
                  min={0}
                  max={maxUsage}
                  readOnly={isNoRate}
                  disabled={isNoRate}
                />
                {!isNoRate && (
                  <div className="text-xs text-gray-500">
                    최대 혜택 사용금액 {maxUsage.toLocaleString()}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <button
          type="submit"
          className="w-full rounded bg-green-600 py-2 font-bold text-white"
        >
          할인액 계산하기
        </button>
      </form>
      {result && (
        <div className="mt-8">
          <h3 className="mb-4 text-lg font-semibold">할인 결과</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full rounded-lg border text-center">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border-b px-3 py-2 font-semibold">혜택명</th>
                  <th className="border-b px-3 py-2 font-semibold">사용금액</th>
                  <th className="border-b px-3 py-2 font-semibold">할인액</th>
                </tr>
              </thead>
              <tbody>
                {result.map((r) => (
                  <tr key={r.title} className="hover:bg-gray-50">
                    <td className="border-b px-3 py-2">{r.title}</td>
                    <td className="border-b px-3 py-2">
                      {Number(r.input).toLocaleString()}원
                    </td>
                    <td className="border-b px-3 py-2 font-bold text-green-600">
                      {Number(r.discount).toLocaleString()}원
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex flex-col items-end gap-1">
            <div className="text-xl font-bold text-green-700">
              총 할인액: {totalDiscount.toLocaleString()}원
            </div>
            <div className="text-lg font-bold text-blue-600">
              피킹률: {pickingRate.toFixed(2)}%
            </div>
            <div className="text-lg font-bold text-blue-600">
              {evaluateBenefitRate(pickingRate.toFixed(2))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
