'use client';

import { ALL_BENEFITS, ALL_COMPANIES } from '@/shared/types/constants';

interface FilterPanelProps {
  selectedCompanies: string[];
  selectedBenefits: string[];
  onCompanyToggle: (company: string) => void;
  onBenefitToggle: (benefit: string) => void;
}

const FilterButton = ({
  label,
  isSelected,
  onClick,
}: {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${isSelected ? 'bg-indigo-600 text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
  >
    {label}
  </button>
);

export function FilterPanel({
  selectedCompanies,
  selectedBenefits,
  onCompanyToggle,
  onBenefitToggle,
}: FilterPanelProps) {
  return (
    <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-slate-700">
        상세 조건 설정
      </h3>
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-slate-600">
          카드사
        </label>
        <div className="flex flex-wrap gap-2">
          {ALL_COMPANIES.map((company) => (
            <FilterButton
              key={company}
              label={company}
              isSelected={selectedCompanies.includes(company)}
              onClick={() => onCompanyToggle(company)}
            />
          ))}
        </div>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-600">
          주요 혜택
        </label>
        <div className="flex flex-wrap gap-2">
          {ALL_BENEFITS.map((benefit) => (
            <FilterButton
              key={benefit}
              label={benefit}
              isSelected={selectedBenefits.includes(benefit)}
              onClick={() => onBenefitToggle(benefit)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
