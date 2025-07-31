'use client';

import { useEffect, useState } from 'react';

import { Card } from './mock';

interface AnnualFee {
  company: string;
  fee: number;
}

interface BenefitGrade {
  required_payment: number;
  max_benefit: number;
}

interface Benefit {
  id: string;
  title: string;
  description: string;
  discount_rate?: number;
  grades?: BenefitGrade[];
}

interface CardProps {
  image_url: string;
  card_name: string;
  card_description: string;
  major_benefits: string[];
  min_previous_amount: number;
  annual_fee: AnnualFee[];
  prev_payment_options: number[];
  benefits: Benefit[];
}

export default function CardDetailPage() {
  const [cardData, setCardData] = useState<CardProps | null>(null);

  useEffect(() => {
    setCardData(Card);
  }, []);

  if (!cardData) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-600">
        카드 정보를 불러오는 중입니다...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Card Header Section */}
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

      <div className="mx-auto max-w-3xl space-y-12 px-4 py-10">
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">주요 혜택</h2>
          <ul className="grid list-none grid-cols-1 gap-3 p-0 text-gray-700 md:grid-cols-2">
            {cardData.major_benefits.map((benefit, index) => (
              <li
                key={index}
                className="flex items-center text-lg leading-relaxed"
              >
                <span className="mr-2 text-xl text-green-500">✨</span>{' '}
                {benefit}
              </li>
            ))}
          </ul>
        </section>

        <section className="my-10 flex flex-col items-center justify-center space-y-6">
          <h2 className="mb-4 text-3xl font-bold text-gray-800">
            모든 혜택 상세
          </h2>
          {cardData.benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="w-full max-w-3xl rounded-xl border border-gray-200 bg-white p-6 shadow-md"
            >
              <h3 className="mb-4 text-xl font-bold text-gray-800">
                {benefit.title}
              </h3>
              <div className="text-md leading-8 text-gray-700">
                <div
                  dangerouslySetInnerHTML={{ __html: benefit.description }}
                />
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
      </div>
    </div>
  );
}
