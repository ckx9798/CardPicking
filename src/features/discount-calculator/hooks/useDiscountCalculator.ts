'use client';

import { Benefit, CardData, DiscountResult } from '@/shared/types/card';
import { useCallback, useMemo, useState } from 'react';

interface UseDiscountCalculatorProps {
  benefits: CardData['benefits'];
  annualFees: CardData['annual_fee'];
}

export function useDiscountCalculator({
  benefits,
  annualFees,
}: UseDiscountCalculatorProps) {
  const [selectedPrevPayment, setSelectedPrevPayment] = useState<string>('');
  const [formValues, setFormValues] = useState<Record<string, number | ''>>({});
  const [switchStates, setSwitchStates] = useState<Record<string, boolean>>({});
  const [result, setResult] = useState<DiscountResult[] | null>(null);
  const [selectedAnnualFee, setSelectedAnnualFee] = useState<number>(
    annualFees[0]?.fee || 0,
  );

  const getMaxUsage = useCallback((benefit: Benefit, payment: string) => {
    if (!payment) return 0;
    const grade = benefit.grades
      ?.slice()
      .sort((a, b) => b.required_payment - a.required_payment)
      .find((g) => g.required_payment <= Number(payment));

    if (!grade) return 0;
    return benefit.discount_rate
      ? Math.floor(grade.max_benefit / benefit.discount_rate)
      : grade.max_benefit;
  }, []);

  const handleSwitchToggle = useCallback(
    (benefit: Benefit, isChecked: boolean) => {
      setSwitchStates((prev) => ({ ...prev, [benefit.id]: isChecked }));
      const maxUsage = getMaxUsage(benefit, selectedPrevPayment);
      setFormValues((prev) => ({
        ...prev,
        [benefit.id]: isChecked ? maxUsage : '',
      }));
    },
    [selectedPrevPayment, getMaxUsage],
  );

  const handleInputChange = useCallback(
    (benefitId: string, value: string, maxUsage: number) => {
      let numValue = Number(value.replace(/,/g, ''));
      if (isNaN(numValue)) numValue = 0;
      if (numValue > maxUsage) numValue = maxUsage;
      if (numValue < 0) numValue = 0;

      setFormValues((prev) => ({ ...prev, [benefitId]: numValue }));
      setSwitchStates((prev) => ({ ...prev, [benefitId]: false }));
    },
    [],
  );

  const handlePrevPaymentChange = useCallback((option: number) => {
    setSelectedPrevPayment(option.toString());
    setSwitchStates({});
    setFormValues({});
    setResult(null);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!selectedPrevPayment) {
        alert('전월실적을 선택하세요.');
        return;
      }

      const getDiscountedAmount = (
        benefit: Benefit,
        inputAmount: number | '',
      ) => {
        const grade = benefit.grades
          ?.slice()
          .sort((a, b) => b.required_payment - a.required_payment)
          .find((g) => g.required_payment <= Number(selectedPrevPayment));
        if (!grade) return 0;

        const numInput = Number(inputAmount);
        if (benefit.discount_rate) {
          return Math.min(numInput * benefit.discount_rate, grade.max_benefit);
        }
        return grade.max_benefit === numInput ? grade.max_benefit : 0;
      };

      const newResult = benefits.map((benefit) => {
        const input = formValues[benefit.id] ?? '';
        return {
          title: benefit.title,
          input,
          discount: getDiscountedAmount(benefit, input),
        };
      });
      setResult(newResult);
    },
    [selectedPrevPayment, formValues, benefits],
  );

  const { totalDiscount, pickingRate } = useMemo(() => {
    if (!result) return { totalDiscount: 0, pickingRate: 0 };

    const totalDiscount = result.reduce((acc, cur) => acc + cur.discount, 0);
    const payment = Number(selectedPrevPayment);
    if (!payment) return { totalDiscount, pickingRate: 0 };

    const rate = ((totalDiscount - selectedAnnualFee / 12) / payment) * 100;
    return { totalDiscount, pickingRate: rate };
  }, [result, selectedAnnualFee, selectedPrevPayment]);

  return {
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
  };
}
