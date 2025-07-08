export const Card = {
  id: 1,
  bank_name: '신한카드',
  card_name: '신한카드 B.Big(삑)',
  card_description: '매일매일 가는 길마다 신한카드 교통 Big 할인!',
  major_benefits: ['대중교통 최대 1만 8천원', '택시 10%', '4대 백화점 5%'],
  min_previous_amount: '30',
  max_benefit_amount: '48000',

  image_url:
    'https://financialshopping-cdn.banksalad.com/shihan_b_big_5acbb579eb.png',

  annual_fee: [
    {
      company: 'S&',
      fee: '10000',
    },
    {
      company: 'UPI',
      fee: '10000',
    },
    {
      company: 'VISA',
      fee: '13000',
    },
  ],

  prev_payment_options: ['300000', '500000', '1000000', '1500000'],

  benefits: [
    {
      id: '4585250',
      title: '대중교통',
      summary: '버스/지하철 후불 교통 이용 금액 정액 할인',
      description:
        '<figure class="table"><table><thead><tr><th style="text-align:center;">전월 이용금액</th><th style="text-align:center;">30~50만원 이상</th><th style="text-align:center;">50~100만원 이상</th><th style="text-align:center;">100만원 이상</th></tr></thead><tbody><tr><td style="text-align:center;">할인 금액</td><td style="text-align:center;">일 200원</td><td style="text-align:center;">일 400원</td><td style="text-align:center;">일 600원</td></tr></tbody></table></figure><p>※ 버스/지하철 후불교통을 이용한 일수를 기준으로 할인 적용됩니다.<br>※ 전국 신한카드 후불교통 서비스 지역에서 서비스가 제공이 되며, 후불교통 카드가 아닌 비교통 카드는 서비스 제공이 불가합니다.<br>※ 당일 후불 교통 이용 금액이 정액 할인 금액보다 적게 이용한 경우는 당일 후불 교통 이용 금액으로 할인 적용됩니다. (단, 당일 후불 교통 이용 금액이 200원 미만인 경우는 할인 제외)<br>※ 신규 발급 회원에 대해서는 카드사용 등록월의 익월말(등록월+1개월)까지 버스/지하철 후불 교통 이용금액 日200원 할인 적용됩니다.</p><p>&nbsp;</p><p><strong>[대중교통 할인 예시]</strong></p><figure class="table"><table><thead><tr><th style="text-align:center;">전월 이용금액</th><th style="text-align:center;">45만원</th><th style="text-align:center;">75만원</th><th style="text-align:center;">115만원</th></tr></thead><tbody><tr><td style="text-align:center;">대중교통 이용일수</td><td style="text-align:center;" colspan="3">15일</td></tr><tr><td style="text-align:center;">할인 금액</td><td style="text-align:center;">3천원</td><td style="text-align:center;">6천원</td><td style="text-align:center;">9천원</td></tr></tbody></table></figure>',
      grades: [
        {
          required_payment: '300000',
          max_benefit: '6000',
        },
        {
          required_payment: '500000',
          max_benefit: '12000',
        },
        {
          required_payment: '1000000',
          max_benefit: '18000',
        },
      ],
    },
    {
      id: '4585251',
      title: '택시/KTX',
      summary: '택시/KTX 이용 금액 10% 할인',
      discount_rate: 0.1,
      description:
        '<figure class="table"><table><thead><tr><th style="text-align:center;">전월 이용금액</th><th style="text-align:center;">30~50만원 이상</th><th style="text-align:center;">50~100만원 이상</th><th style="text-align:center;">100~150만원 이상</th><th style="text-align:center;">150만원 이상</th></tr></thead><tbody><tr><td style="text-align:center;">할인한도</td><td style="text-align:center;">5천원</td><td style="text-align:center;">8천원</td><td style="text-align:center;">1만 2천원</td><td style="text-align:center;">1만 5천원</td></tr></tbody></table></figure><p>※ 택시/KTX 가맹점 통합 일 1회, 건당 5만원까지 할인 적용됩니다.<br>※ 할인 금액은 전월 실적에 따른 할인한도 금액 내에서 제공이 됩니다.<br>※ 후불 교통/비교통 카드 모두 서비스 제공이 됩니다. (단, 비교통 카드인 경우는 택시 이용시 일반 MS 거래 필요)<br>※ 신규 발급 회원에 대해서는 카드사용 등록월의 익월말(등록월+1개월)까지 택시/KTX이용금액 5천원의 할인한도가 제공됩니다.</p>',
      grades: [
        {
          required_payment: '300000',
          max_benefit: '5000',
        },
        {
          required_payment: '500000',
          max_benefit: '8000',
        },
        {
          required_payment: '1000000',
          max_benefit: '12000',
        },
        {
          required_payment: '1500000',
          max_benefit: '15000',
        },
      ],
    },
    {
      id: '4585253',
      title: '쇼핑',
      summary:
        '[통합 할인 서비스]\n4대 백화점(롯데, 현대, 신세계, 갤러리아) 5% 할인',
      discount_rate: 0.05,
      description:
        '<ul><li>일 1회, 월 2회, 건당 10만원까지 할인 적용</li></ul><p>※ 상기 서비스는 통합할인한도 범위내에서 제공이 됩니다.<br>※ 상품권 구매 및 온라인 매장 이용건은 할인에서 제외됩니다.<br>※ 이용 거래건의 할인순서는 카드사의 전표매입순서 기준으로 할인 적용됩니다.</p><p>&nbsp;</p><p><strong>[통합 할인 서비스 통합 할인한도]</strong></p><figure class="table"><table><thead><tr><th style="text-align:center;">전월 이용금액</th><th style="text-align:center;">30~50만원</th><th style="text-align:center;">50~100만원</th><th style="text-align:center;">100~150만원</th><th style="text-align:center;">150만원 이상</th></tr></thead><tbody><tr><td style="text-align:center;">할인한도</td><td style="text-align:center;">5천원</td><td style="text-align:center;">1만 2천원</td><td style="text-align:center;">1만 5천원</td><td style="text-align:center;">2만원</td></tr></tbody></table></figure><p>※ 신규 발급 회원에 대해서는 카드사용 등록월의 익월말(등록월+1개월)까지 5천원의 통합 할인한도가 제공됩니다.</p>',
      grades: [
        {
          required_payment: '300000',
          max_benefit: '5000',
        },
        {
          required_payment: '500000',
          max_benefit: '10000',
        },
      ],
    },
    {
      id: '4585254',
      title: '편의점',
      summary: '[통합 할인 서비스]\n편의점 5% 할인',
      description:
        '<ul><li>일 1회, 월 5회, 건당 1만원 까지 할인 적용</li></ul><p>※ 상기 서비스는 통합할인한도 범위내에서 제공이 됩니다.<br>※ 이용 거래건의 할인순서는 카드사의 전표매입순서 기준으로 할인 적용됩니다.</p><p>&nbsp;</p><p><strong>[통합 할인 서비스 통합 할인한도]</strong></p><figure class="table"><table><thead><tr><th style="text-align:center;">전월 이용금액</th><th style="text-align:center;">30~50만원</th><th style="text-align:center;">50~100만원</th><th style="text-align:center;">100~150만원</th><th style="text-align:center;">150만원 이상</th></tr></thead><tbody><tr><td style="text-align:center;">할인한도</td><td style="text-align:center;">5천원</td><td style="text-align:center;">1만 2천원</td><td style="text-align:center;">1만 5천원</td><td style="text-align:center;">2만원</td></tr></tbody></table></figure><p>※ 신규 발급 회원에 대해서는 카드사용 등록월의 익월말(등록월+1개월)까지 5천원의 통합 할인한도가 제공됩니다.</p>',
      grades: [
        {
          required_payment: '300000',
          max_benefit: '2500',
        },
      ],
    },
    {
      id: '4585255',
      title: '커피',
      summary:
        '[통합 할인 서비스]\n커피전문점(스타벅스, 커피빈, 카페베네, 엔제리너스 매장) 10% 할인',
      description:
        '<ul><li>일 1회, 월 8회, 건당 1만원까지 할인 적용&nbsp;</li></ul><p>※ 상기 서비스는 통합할인한도 범위내에서 제공이 됩니다.<br>※ 백화점, 할인점, 면세점 등 일부 쇼핑몰 내 입점 된 커피전문점에서는 적용되지 않을 수 있습니다.<br>※ 이용 거래건의 할인순서는 카드사의 전표매입순서 기준으로 할인 적용됩니다.</p><p>&nbsp;</p><p><strong>[통합 할인 서비스 통합 할인한도]</strong></p><figure class="table"><table><thead><tr><th style="text-align:center;">전월 이용금액</th><th style="text-align:center;">30~50만원</th><th style="text-align:center;">50~100만원</th><th style="text-align:center;">100~150만원</th><th style="text-align:center;">150만원 이상</th></tr></thead><tbody><tr><td style="text-align:center;">할인한도</td><td style="text-align:center;">5천원</td><td style="text-align:center;">1만 2천원</td><td style="text-align:center;">1만 5천원</td><td style="text-align:center;">2만원</td></tr></tbody></table></figure><p>※ 신규 발급 회원에 대해서는 카드사용 등록월의 익월말(등록월+1개월)까지 5천원의 통합 할인한도가 제공됩니다.</p>',
      grades: [
        {
          required_payment: '300000',
          max_benefit: '8000',
        },
      ],
    },
    {
      id: '4585256',
      title: '통신요금',
      summary: '[통합 할인 서비스]\n통신요금(SKT, KT, LG U+) 5% 할인',
      description:
        '<ul><li>SKT, KT, LG U+ 이동통신요금(결합상품 제외)</li><li>월 2건, 건당 5만원까지 할인 적용&nbsp;</li></ul><p>※ 상기 서비스는 통합할인한도 범위내에서 제공이 됩니다.<br>※ 이용 거래건의 할인순서는 카드사의 전표매입순서 기준으로 할인 적용됩니다.</p><p>&nbsp;</p><p><strong>[통합 할인 서비스 통합 할인한도]</strong></p><figure class="table"><table><thead><tr><th style="text-align:center;">전월 이용금액</th><th style="text-align:center;">30~50만원</th><th style="text-align:center;">50~100만원</th><th style="text-align:center;">100~150만원</th><th style="text-align:center;">150만원 이상</th></tr></thead><tbody><tr><td style="text-align:center;">할인한도</td><td style="text-align:center;">5천원</td><td style="text-align:center;">1만 2천원</td><td style="text-align:center;">1만 5천원</td><td style="text-align:center;">2만원</td></tr></tbody></table></figure><p>※ 신규 발급 회원에 대해서는 카드사용 등록월의 익월말(등록월+1개월)까지 5천원의 통합 할인한도가 제공됩니다.</p>',
      grades: [
        {
          required_payment: '300000',
          max_benefit: '5000',
        },
      ],
    },
    {
      id: '4585257',
      title: 'CGV, 메가박스 온라인 영화 예매',
      summary: 'CGV, 메가박스 온라인 영화 예매 최대 1만 2천원 할인',
      description:
        '<ul><li>최대 3천원 결제일 할인(9천원 이상일 경우 1,500원 할인, 1만 8천원 이상일 경우 3천원 할인)</li><li>제공기준 : 통합 1일 2회, 월 4회, 연 12회 제공</li></ul><p>※ 온라인 영화 할인 서비스의 경우 공식 홈페이지 및 APP을 통해 예매 시 제공됩니다.</p><p>&nbsp;</p><p>※ 서비스 이용 전월 해당 카드로 일시불 + 할부 이용 금액이 30만원 이상인 경우 서비스가 제공이 됩니다.</p><p>※ 신규 발급 회원에 대해서는 카드사용 등록 월의 익월 말(등록 월 + 1개월)까지 전월 이용 금액 기준과 무관하게 할인 서비스가 제공됩니다.</p>',
      grades: [
        {
          required_payment: '300000',
          max_benefit: '12000',
        },
      ],
    },
    {
      id: '4585258',
      title: 'CGV 영화',
      summary: 'CGV 영화 4천원 할인',
      description:
        '<ul><li>월 1회(1일~말일) 한하여 영화 4천원 할인</li><li>본인, 동반자 상관없이 총 결제금액에서 할인 적용되며, 총 결제금액이 4천원 미만인 경우, 해당 금액에 대해서 할인 적용</li></ul><p>※ 예매 前 영화관 內 매점 이용 시, 영화할인서비스가 先 적용될 수 있으므로 유의하시기 바랍니다.</p>',
      grades: [
        {
          required_payment: '300000',
          max_benefit: '4000',
        },
      ],
    },
  ],
  // chart_benefit_limits: [
  //   {
  //     required_prev_month_payment_amount_krw_0f: '300000',
  //     chart_benefit_ids: ['4585251'],
  //     limit_amount: '5000',
  //     is_integration_limit: false,
  //   },
  //   {
  //     required_prev_month_payment_amount_krw_0f: '500000',
  //     chart_benefit_ids: ['4585251'],
  //     limit_amount: '8000',
  //     is_integration_limit: false,
  //   },
  //   {
  //     required_prev_month_payment_amount_krw_0f: '1000000',
  //     chart_benefit_ids: ['4585251'],
  //     limit_amount: '12000',
  //     is_integration_limit: false,
  //   },
  //   {
  //     required_prev_month_payment_amount_krw_0f: '1500000',
  //     chart_benefit_ids: ['4585251'],
  //     limit_amount: '15000',
  //     is_integration_limit: false,
  //   },
  //   {
  //     required_prev_month_payment_amount_krw_0f: '300000',
  //     chart_benefit_ids: ['4585253', '4585254', '4585255', '4585256'],
  //     limit_amount: '5000',
  //     is_integration_limit: false,
  //   },
  //   {
  //     required_prev_month_payment_amount_krw_0f: '500000',
  //     chart_benefit_ids: ['4585253', '4585254', '4585255', '4585256'],
  //     limit_amount: '12000',
  //     is_integration_limit: false,
  //   },
  //   {
  //     required_prev_month_payment_amount_krw_0f: '1000000',
  //     chart_benefit_ids: ['4585253', '4585254', '4585255', '4585256'],
  //     limit_amount: '15000',
  //     is_integration_limit: false,
  //   },
  //   {
  //     required_prev_month_payment_amount_krw_0f: '1500000',
  //     chart_benefit_ids: ['4585253', '4585254', '4585255', '4585256'],
  //     limit_amount: '20000',
  //     is_integration_limit: false,
  //   },
  // ],

  // applied_prev_month_payment_amount_krw_0f: '500000',
  // applied_benefits: [
  //   {
  //     benefit_id: '4585250',
  //     benefit_amount_krw_0f: '12000',
  //   },
  //   {
  //     benefit_id: '4585251',
  //     benefit_amount_krw_0f: '8000',
  //   },
  //   {
  //     benefit_id: '4585253',
  //     benefit_amount_krw_0f: '10000',
  //   },
  //   {
  //     benefit_id: '4585254',
  //     benefit_amount_krw_0f: '2500',
  //   },
  //   {
  //     benefit_id: '4585255',
  //     benefit_amount_krw_0f: '8000',
  //   },
  //   {
  //     benefit_id: '4585256',
  //     benefit_amount_krw_0f: '5000',
  //   },
  //   {
  //     benefit_id: '4585257',
  //     benefit_amount_krw_0f: '12000',
  //   },
  //   {
  //     benefit_id: '4585258',
  //     benefit_amount_krw_0f: '4000',
  //   },
  // ],
  // applied_limits: [
  //   {
  //     required_prev_month_payment_amount_krw_0f: '500000',
  //     chart_benefit_ids: ['4585251'],
  //     limit_amount: '8000',
  //     is_integration_limit: false,
  //   },
  //   {
  //     required_prev_month_payment_amount_krw_0f: '500000',
  //     chart_benefit_ids: ['4585253', '4585254', '4585255', '4585256'],
  //     limit_amount: '12000',
  //     is_integration_limit: false,
  //   },
  // ],
};
