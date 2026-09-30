import '@walletconnect/react-native-compat';

import {createAppKit} from '@reown/appkit-react-native';
import {EthersAdapter} from '@reown/appkit-ethers-react-native';
import {base, baseSepolia, mainnet} from 'viem/chains';

import {env} from '../../../config/env';
import {colors} from '../../../theme/colors';
import {reownStorage} from './reownStorage';

export const isReownConfigured = env.reownProjectId.length > 0;

export const reownAppKit = isReownConfigured
  ? createAppKit({
      adapters: [new EthersAdapter()],
      defaultNetwork: base,
      enableAnalytics: false,
      features: {onramp: false, showWallets: true, socials: false, swaps: false},
      metadata: {
        description: 'PrediX Finance authentication',
        icons: ['https://test-landing-page.predixpro.io/assets/logo-predix-footer.png'],
        name: 'PrediX Finance',
        redirect: {native: `${env.oauthCallbackScheme}://`},
        url: 'https://test-landing-page.predixpro.io',
      },
      networks: [base, baseSepolia, mainnet],
      projectId: env.reownProjectId,
      storage: reownStorage,
      themeMode: 'dark',
      themeVariables: {accent: colors.action.authGold},
    })
  : null;
