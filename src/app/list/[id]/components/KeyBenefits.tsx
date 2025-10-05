import { CardData } from '@/shared/types/card';

export function KeyBenefits({ cardData }: { cardData: CardData }) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">주요 혜택</h2>
      <ul className="grid list-none grid-cols-1 gap-3 p-0 text-gray-700 md:grid-cols-2">
        {cardData.major_benefits.map((benefit, index) => (
          <li key={index} className="flex items-center text-lg leading-relaxed">
            <span className="mr-2 text-xl text-green-500">✨</span> {benefit}
          </li>
        ))}
      </ul>
    </section>
  );
}
