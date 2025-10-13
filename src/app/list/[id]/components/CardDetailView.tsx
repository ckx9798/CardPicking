import { CardData } from '@/shared/types/card';

export function CardDetailView({ cardData }: { cardData: CardData }) {
  return (
    <section className="my-10 flex flex-col items-center justify-center space-y-6">
      <h2 className="mb-4 text-3xl font-bold text-gray-800">모든 혜택 상세</h2>
      {cardData.benefits.map((benefit) => (
        <div
          key={benefit.id}
          className="w-full max-w-3xl rounded-xl border border-gray-200 bg-white p-6 shadow-md"
        >
          <h3 className="mb-4 text-xl font-bold text-gray-800">
            {benefit.title}
          </h3>
          <div className="text-md leading-8 text-gray-700">
            <div dangerouslySetInnerHTML={{ __html: benefit.description }} />
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
  );
}
