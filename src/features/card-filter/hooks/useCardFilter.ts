'use client';

import { useMemo, useState } from 'react';

import { CardListItem } from '@/shared/types/card';

export function useCardFilter(initialCards: CardListItem[]) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>([]);

  const filteredCards = useMemo(() => {
    if (!Array.isArray(initialCards)) {
      return [];
    }

    return initialCards.filter((card) => {
      const searchTermMatch =
        card.card_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.card_description.toLowerCase().includes(searchTerm.toLowerCase());

      const companyMatch =
        selectedCompanies.length === 0 ||
        selectedCompanies.includes(card.bank_name);

      const benefitMatch =
        selectedBenefits.length === 0 ||
        selectedBenefits.every((benefit) => card.tags.includes(benefit));

      return searchTermMatch && companyMatch && benefitMatch;
    });
  }, [searchTerm, selectedCompanies, selectedBenefits, initialCards]);

  const toggleFilter = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setter((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const toggleCompanyFilter = (company: string) =>
    toggleFilter(company, setSelectedCompanies);
  const toggleBenefitFilter = (benefit: string) =>
    toggleFilter(benefit, setSelectedBenefits);

  return {
    searchTerm,
    setSearchTerm,
    selectedCompanies,
    selectedBenefits,
    filteredCards,
    toggleCompanyFilter,
    toggleBenefitFilter,
  };
}
