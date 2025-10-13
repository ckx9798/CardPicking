'use client';

import { Benefit } from '@/shared/types/card';
import React from 'react';
import { ToggleSwitch } from '@/shared/components/ToggleSwitch';

interface BenefitFormProps {
  benefit: Benefit;
  selectedPrevPayment: string;
  formValue: number | '';
  isSwitchOn: boolean;
  maxUsage: number;
  onSwitchChange: (isChecked: boolean) => void;
  onInputChange: (value: string) => void;
}

export function BenefitForm({
  benefit,
  selectedPrevPayment,
  formValue,
  isSwitchOn,
  maxUsage,
  onSwitchChange,
  onInputChange,
}: BenefitFormProps) {
  const hasRate = benefit.discount_rate != null;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="mb-2 flex items-center justify-between">
        <label className="block text-lg font-medium text-gray-800">
          {benefit.title}
          {hasRate && ` (${(benefit.discount_rate! * 100).toFixed(0)}% 할인)`}
        </label>
        <ToggleSwitch
          id={`toggle-${benefit.id}`}
          checked={isSwitchOn}
          onChange={onSwitchChange}
        />
      </div>
      <input
        type="text"
        inputMode="numeric"
        className={`w-full rounded-lg border px-4 py-2 text-lg focus:ring-2 focus:ring-green-400 focus:outline-none ${!hasRate ? 'cursor-not-allowed border-gray-300 bg-gray-100 text-gray-500' : 'border-gray-300 bg-white'}`}
        placeholder={
          hasRate
            ? `사용금액 입력 (최대 ${maxUsage.toLocaleString()}원)`
            : '최대값만 자동 적용'
        }
        value={formValue.toLocaleString()}
        onChange={(e) => onInputChange(e.target.value)}
        readOnly={!hasRate}
        disabled={!hasRate}
      />
      {selectedPrevPayment && (
        <p className="mt-2 text-sm text-gray-500">
          {hasRate
            ? '선택된 실적 기준, 최대 사용금액: '
            : '선택된 실적 기준, 혜택 금액: '}
          <span className="font-semibold">{maxUsage.toLocaleString()}원</span>
        </p>
      )}
    </div>
  );
}
