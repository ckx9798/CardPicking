'use client';

import { Card } from './mock';
import DynamicDiscountForm from '../components/DynamicDiscountForm';
import { formatPrice } from '@/shared/utils/formatPrice';
import { useState } from 'react';

// 연회비 타입 예시
export interface AnnualFee {
  company: string; // 예: "국내", "해외", "기타" 등
  fee: number | string; // 금액 (숫자 또는 문자열)
}

// 혜택 타입 예시
export interface Benefit {
  id: string;
  title: string;
  summary: string;
  description: string;
  grades: [];
}

export interface grades {
  required_payment: string;
  max_benefit: string;
}

// 카드 타입
export interface CardProps {
  id: number;
  bank_name: string;
  card_name: string;
  card_description: string;
  image_url: string;
  annual_fee: AnnualFee[];
  major_benefits: string[];
  benefits: Benefit[];
  max_benefit_amount: string; // 숫자형 문자열
  min_previous_amount: string; // 숫자형 문자열
  prev_payment_options: string[]; // 숫자형 문자열 배열
}

export default function PostPage() {
  const [data, setData] = useState<CardProps | null>(Card);
  console.log(data);
  const [selectedPreviousPayment, setSelectedPreviousPayment] = useState(null);

  const [transport, setTransport] = useState(0);
  const [oil, setOil] = useState(0);
  const [telecom, setTelecom] = useState(0);

  // 최대 사용금액 계산 함수
  function getMaxUsage(
    benefit: Benefit,
    selectedPreviousPayment: string | number,
  ) {
    if (!selectedPreviousPayment) return 0;
    const grade = benefit.grades
      ?.filter(
        (g) => Number(g.required_payment) <= Number(selectedPreviousPayment),
      )
      .sort(
        (a, b) => Number(b.required_payment) - Number(a.required_payment),
      )[0];
    if (!grade) return 0;
    if (benefit.discount_rate) {
      return Math.floor(Number(grade.max_benefit) / benefit.discount_rate);
    } else {
      // 할인율이 없으면 최대 혜택 금액만 입력
      return Number(grade.max_benefit);
    }
  }

  // 스위치 토글 핸들러
  const handleSwitchToggle = (benefit: Benefit) => {
    const isOn = !switchStates[benefit.id];
    setSwitchStates((prev) => ({
      ...prev,
      [benefit.id]: isOn,
    }));
    if (benefit.discount_rate) {
      setFormValues((prev) => ({
        ...prev,
        [benefit.id]: isOn ? getMaxUsage(benefit, selectedPreviousPayment) : '',
      }));
    } else {
      setFormValues((prev) => ({
        ...prev,
        [benefit.id]: isOn ? getMaxUsage(benefit, selectedPreviousPayment) : 0,
      }));
    }
  };

  // 각 항목별 할인액 계산
  const transportDiscount = calcDiscount(transport, 0.1, 10000);
  const oilDiscount = calcDiscount(oil, 0.05, 15000);
  const telecomDiscount = calcDiscount(telecom, 0.03, 5000);

  // 총 할인액
  const totalDiscount = transportDiscount + oilDiscount + telecomDiscount;

  function calcDiscount(amount, rate, max) {
    const discount = amount * rate;
    return discount > max ? max : discount;
  }

  return (
    <div className="bg-white">
      <div className="text-text flex flex-col items-center bg-white py-10">
        <img
          src={data?.image_url}
          alt="신한카드 B.Big"
          className="h-38 w-24 rounded-md object-cover"
        />

        <div className="text-center">
          <h2 className="mt-2 mb-1 text-2xl font-bold">{data?.card_name}</h2>
          <p className="mb-6 text-gray-600">{data?.card_description}</p>
        </div>

        <div className="w-full max-w-xl">
          <h3 className="mb-2 text-lg font-semibold">주요 혜택</h3>
          <ul className="text-gray500 mb-3 ml-2 flex gap-6">
            {data?.major_benefits.map((b) => (
              <li className="flex items-center" key={b}>
                ▪ {b}
              </li>
            ))}
          </ul>

          {/* <span>⛽☕🚗</span> */}

          <div className="mb-3">
            <h3 className="mb-2 text-lg font-semibold">전월실적</h3>
            <span className="text-gray500 ml-2">
              ▪ 최소 {data?.min_previous_amount}만원
            </span>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-semibold">연회비</h3>
            <div className="flex gap-3">
              {data?.annual_fee.map((fee) => (
                <span className="text-gray500 ml-2" key={fee.company}>
                  ▪ {fee.company} {fee.fee}원
                </span>
              ))}
              {/* 국내용(S&) 10,000원 / 해외겸용 13,000원 */}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-xl space-y-6 rounded-xl border-2 bg-white p-6">
        <h2 className="mb-2 text-center text-xl font-bold text-green-600">
          할인 계산기
        </h2>

        <div className="bg-gray100 flex justify-between gap-4 rounded-xl px-3 py-2">
          {data?.prev_payment_options.map((opt) => (
            <div
              className="bg-gray200 text-text rounded-lg px-5 py-1 text-sm"
              key={opt}
              onClick={() => setSelectedPreviousPayment(opt)}
            >
              {formatPrice(opt)}
            </div>
          ))}
          <button onClick={() => console.log(selectedPreviousPayment)}>
            asdasd
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block font-medium text-gray-700">
              대중교통 사용금액
            </label>
            <input
              type="number"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
              placeholder="금액 입력"
              value={transport}
              onChange={(e) => setTransport(Number(e.target.value))}
            />
            <div className="mt-1 text-xs text-gray-500">
              할인액:{' '}
              <span className="font-semibold text-green-600">
                {transportDiscount.toLocaleString()}원
              </span>
            </div>
          </div>
          {/* 주유 입력 */}
          <div>
            <label className="mb-1 block font-medium text-gray-700">
              주유 사용금액
            </label>
            <input
              type="number"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
              placeholder="금액 입력"
              value={oil}
              onChange={(e) => setOil(Number(e.target.value))}
            />
            <div className="mt-1 text-xs text-gray-500">
              할인액:{' '}
              <span className="font-semibold text-green-600">
                {oilDiscount.toLocaleString()}원
              </span>
            </div>
          </div>
          {/* 통신 입력 */}
          <div>
            <label className="mb-1 block font-medium text-gray-700">
              통신 사용금액
            </label>
            <input
              type="number"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
              placeholder="금액 입력"
              value={telecom}
              onChange={(e) => setTelecom(Number(e.target.value))}
            />
            <div className="mt-1 text-xs text-gray-500">
              할인액:{' '}
              <span className="font-semibold text-green-600">
                {telecomDiscount.toLocaleString()}원
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="mb-2 text-lg font-semibold">
            선택한 전월실적별 최대혜택
          </h3>
          {selectedPreviousPayment ? (
            <div className="space-y-3">
              {data?.benefits.map((benefit) => {
                // 선택한 실적 이하 중 가장 큰 구간의 혜택만 표시
                const selectedGrade = benefit.grades
                  ?.filter(
                    (grade) =>
                      Number(grade.required_payment) <=
                      Number(selectedPreviousPayment),
                  )
                  .sort(
                    (a, b) =>
                      Number(b.required_payment) - Number(a.required_payment),
                  )[0];

                return (
                  <div
                    key={benefit.id}
                    className="rounded-md border bg-gray-50 px-4 py-2"
                  >
                    <div className="font-semibold">{benefit.title}</div>
                    {selectedGrade ? (
                      <div className="text-sm text-gray-600">
                        최대혜택:{' '}
                        <span className="font-bold text-green-600">
                          {Number(selectedGrade.max_benefit).toLocaleString()}원
                        </span>
                        <span className="ml-3 text-gray-400">
                          (실적:{' '}
                          {Number(
                            selectedGrade.required_payment,
                          ).toLocaleString()}
                          원)
                        </span>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-400">
                        해당 실적 구간 혜택 없음
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-gray-400">전월실적을 선택하세요.</div>
          )}
        </div>

        {/* 총 할인액 */}
        <div className="mt-4 flex justify-between rounded-lg bg-green-50 px-20 py-4 text-center">
          <div>
            <span className="text-lg font-bold text-green-700">총 할인액</span>
            <div className="mt-1 text-2xl font-extrabold text-green-600">
              {totalDiscount.toLocaleString()}원
            </div>
          </div>
          <div>
            <span className="text-lg font-bold text-green-700">피킹률</span>
            <div className="mt-1 text-2xl font-extrabold text-green-600">
              {totalDiscount.toLocaleString()}%
            </div>
          </div>
        </div>
      </div>

      <DynamicDiscountForm />

      <div className="my-20 flex flex-col items-center justify-center">
        {data?.benefits.map((benefit) => (
          <div
            key={benefit.id}
            className="w-full max-w-xl rounded-lg bg-gray-50 p-6"
          >
            <div className="text-text font-semibold">{benefit.title}</div>
            <div className="text-xs text-gray-500">
              <div dangerouslySetInnerHTML={{ __html: benefit.description }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
