import {abbreviate, getWalletAddress} from '../../../src/features/more/utils/profile';

describe('profile formatting', () => {
  test('abbreviates long identifiers', () => {
    expect(abbreviate('019fb73d-e86f-74e1-a812-225f8571007c')).toBe('019fb7…007c');
  });

  test('leaves short identifiers unchanged', () => {
    expect(abbreviate('short-id')).toBe('short-id');
  });

  test('supports both documented wallet address shapes', () => {
    expect(getWalletAddress({address: '0x123'})).toBe('0x123');
    expect(getWalletAddress({walletAddress: '0x456'})).toBe('0x456');
    expect(getWalletAddress({})).toBeNull();
  });
});
