export function evaluateBenefitRate(rate: number): string {
  if (rate >= 5) {
    return '✅ 추천 카드입니다! 혜택이 아주 좋아요.';
  } else if (rate >= 3) {
    return '👍 혜택을 꽤 받는 편이에요.';
  } else if (rate >= 1) {
    return '🙂 보통 수준의 혜택입니다.';
  } else {
    return '⚠️ 혜택을 거의 받지 못해요.';
  }
}
