import { CardData } from '@/shared/types/card';

export function CardHeader({ cardData }: { cardData: CardData }) {
  return (
    <div className="bg-white py-10 shadow-sm">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4">
        <img
          src={cardData.image_url}
          alt={cardData.card_name}
          className="h-48 w-32 rounded-lg border border-gray-200 object-cover shadow-md"
        />
        <div className="mt-4 text-center">
          <h1 className="text-3xl font-extrabold text-gray-800">
            {cardData.card_name}
          </h1>
          <p className="text-md mt-2 text-gray-600">
            {cardData.card_description}
          </p>
        </div>
        <button className="mt-8 rounded-full bg-green-600 px-8 py-3 text-lg font-bold text-white shadow-lg transition duration-300 hover:bg-green-700">
          카드 신청하기
        </button>
      </div>
    </div>
  );
}
