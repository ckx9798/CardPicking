'use client';

import { CardList } from './ui/CardList';
import { ComparisonBar } from '@/features/card-comparison/ui/ComparisonBar';
import { FilterPanel } from '@/features/card-filter/ui/FilterPanel';
import { ListHeader } from './ui/ListHeader';
import { mockCardData } from '@/app/list/mockCardData';
import { useCardComparison } from '@/features/card-comparison/hooks/useCardComparison';
import { useCardFilter } from '@/features/card-filter/hooks/useCardFilter';

export function CardListView() {
  const {
    searchTerm,
    setSearchTerm,
    selectedCompanies,
    selectedBenefits,
    filteredCards,
    toggleCompanyFilter,
    toggleBenefitFilter,
  } = useCardFilter(mockCardData);

  const { comparisonList, toggleComparison, clearComparison } =
    useCardComparison();

  const handleCompare = () => {
    alert(`비교할 카드 ID: ${comparisonList.join(', ')}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="mx-auto w-full max-w-6xl p-4 md:p-8">
        <ListHeader searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <FilterPanel
          selectedCompanies={selectedCompanies}
          selectedBenefits={selectedBenefits}
          onCompanyToggle={toggleCompanyFilter}
          onBenefitToggle={toggleBenefitFilter}
        />
        <CardList
          cards={filteredCards}
          comparisonList={comparisonList}
          onToggleCompare={toggleComparison}
        />
      </div>
      <ComparisonBar
        count={comparisonList.length}
        onClear={clearComparison}
        onCompare={handleCompare}
      />
    </div>
  );
}
