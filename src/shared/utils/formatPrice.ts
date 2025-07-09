export function formatPrice(price: string | number): string {
  const numericPrice = typeof price === 'string' ? Number(price) : price;
  const formatPrice = Math.floor(numericPrice / 10000);
  return `${formatPrice}만원`;
}
