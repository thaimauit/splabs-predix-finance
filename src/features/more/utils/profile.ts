import type {WalletAccount} from '../types/profile';

export function abbreviate(value: string, leading = 6, trailing = 4): string {
  if (value.length <= leading + trailing + 1) {
    return value;
  }
  return `${value.slice(0, leading)}…${value.slice(-trailing)}`;
}

export function getWalletAddress(wallet: WalletAccount): string | null {
  return wallet.address ?? wallet.walletAddress ?? null;
}
