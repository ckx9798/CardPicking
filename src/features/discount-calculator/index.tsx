'use client';

import { BenefitForm } from './ui/BenefitForm';
import { CalculationResult } from './ui/CalculationResult';
import { CardData } from '@/shared/types/card';
import { formatPrice } from '@/shared/utils/formatPrice';
import { useDiscountCalculator } from './hooks/useDiscountCalculator';

interface DiscountCalculatorProps {
  cardData: CardData;
}

export function DiscountCalculator({ cardData }: DiscountCalculatorProps) {
  const {
    selectedPrevPayment,
    formValues,
    switchStates,
    result,
    selectedAnnualFee,
    totalDiscount,
    pickingRate,
    setSelectedAnnualFee,
    getMaxUsage,
    handleSwitchToggle,
    handleInputChange,
    handlePrevPaymentChange,
    handleSubmit,
  } = useDiscountCalculator({
    benefits: cardData.benefits,
    annualFees: cardData.annual_fee,
  });

  const annualFeeOptions = cardData.annual_fee.map((fee) => ({
    label: `${fee.company} ${Number(fee.fee).toLocaleString()}원`,
    value: fee.fee,
  }));

  return (
    <div className="text-text mx-auto my-10 max-w-3xl rounded-xl border border-gray-200 bg-white px-10 py-12 shadow-lg">
      <h2 className="mb-6 text-center text-2xl font-bold text-green-700">
        나의 할인 계산기
      </h2>
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {cardData.prev_payment_options.map((opt) => (
          <button
            key={opt}
            className={`text-md min-w-[80px] flex-1 rounded-lg px-4 py-3 font-semibold transition-all duration-200 ${selectedPrevPayment === opt.toString() ? 'bg-green-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
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
      <form onSubmit={handleSubmit} className="space-y-5">
        {cardData.benefits.map((benefit) => (
          <BenefitForm
            key={benefit.id}
            benefit={benefit}
            selectedPrevPayment={selectedPrevPayment}
            formValue={formValues[benefit.id] ?? ''}
            isSwitchOn={!!switchStates[benefit.id]}
            maxUsage={getMaxUsage(benefit, selectedPrevPayment)}
            onSwitchChange={(isChecked) =>
              handleSwitchToggle(benefit, isChecked)
            }
            onInputChange={(value) =>
              handleInputChange(
                benefit.id,
                value,
                getMaxUsage(benefit, selectedPrevPayment),
              )
            }
          />
        ))}
        <button
          type="submit"
          className="w-full rounded-lg bg-green-600 py-3 text-lg font-bold text-white shadow-md transition duration-300 hover:bg-green-700"
        >
          할인액 계산하기
        </button>
      </form>
      {result && (
        <CalculationResult
          result={result}
          totalDiscount={totalDiscount}
          pickingRate={pickingRate}
        />
      )}
    </div>
  );
}
