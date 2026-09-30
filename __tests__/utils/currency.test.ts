import {formatCompactUsd} from '../../src/utils/currency';
describe('formatCompactUsd', () => {
  it('formats compact values', () => {
    expect(formatCompactUsd(175000)).toBe('$175k');
    expect(formatCompactUsd(1250)).toBe('$1.3k');
  });
  it('keeps negative sign', () => {
    expect(formatCompactUsd(-500)).toBe('-$500');
  });
});
