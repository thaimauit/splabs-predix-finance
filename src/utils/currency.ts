export function formatCompactUsd(value: number): string {
  const sign = value < 0 ? '-' : '';
  const abs = Math.abs(value);
  if (abs >= 1000) {
    return `${sign}$${Number((abs / 1000).toFixed(1))}k`;
  }
  return `${sign}$${abs.toLocaleString('en-US')}`;
}
