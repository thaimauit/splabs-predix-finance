export type WalletAccount = {
  id?: string;
  address?: string;
  walletAddress?: string;
  provider?: string;
};

export type UserProfile = {
  id: string;
  email: string;
  walletAccounts: WalletAccount[];
  challengeHistories: unknown[];
};
