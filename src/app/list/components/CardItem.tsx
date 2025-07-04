export const CardItem = ({ card, onClick }) => {
  return (
    <div
      className="bg-gray100 flex cursor-pointer items-start gap-8 rounded-lg px-6 py-8 hover:shadow-md"
      onClick={onClick}
    >
      <div>
        <img
          src={card.img}
          alt={card.name}
          className="h-38 w-24 rounded-md object-cover"
        />
      </div>
      <div className="flex h-38 flex-col justify-between">
        <div className="text-text text-xl font-bold">{card.name}</div>
        <div className="-mt-3 flex gap-4">
          <span className="bg-main inline-block rounded-full px-4 py-1 text-sm font-semibold">
            월 최대 혜택 {card.max_benefit}원
          </span>
          <span className="bg-main inline-block rounded-full px-4 py-1 text-sm font-semibold">
            최대 피킹률 {card.max_picking}%
          </span>
        </div>
        <ul className="text-text flex gap-4 text-sm">
          {card.major_benefits.map((benefit) => (
            <li
              className="text-text inline-block rounded-full px-3 py-1 text-xs font-semibold shadow-sm"
              key={benefit}
            >
              {benefit}
            </li>
          ))}
        </ul>
        <div className="flex gap-3">
          <div className="text-text inline-block rounded px-2 py-1 text-xs font-medium">
            🚀 연회비 {card.annual_costs}원
          </div>
          <div className="text-text inline-block rounded px-2 py-1 text-xs font-medium">
            🚀 전월실적 {card.minimum_previous_month_payment}원
          </div>
        </div>
      </div>
    </div>
  );
};
