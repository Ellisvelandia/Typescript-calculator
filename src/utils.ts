export function range(start: number, end: number) {
  const length = end + 1 - start;
  return Array.from({ length }, (_, i) => start + i);
}

export function formatNum(num: number) {
  const intl = new Intl.NumberFormat("en-US");
  return intl.format(num);
}
