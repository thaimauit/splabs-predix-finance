import React, {useEffect, useRef, useState} from 'react';
import {hexlify, isHexString, toUtf8Bytes} from 'ethers';
import {useAccount, useAppKit, useProvider} from '@reown/appkit-react-native';

import {notifications} from '../../../services/notifications';
import {authApi} from '../services/authApi';

type RenderArgs = {
  loading: boolean;
  onPress: () => void;
};

type Props = {
  children: (args: RenderArgs) => React.ReactNode;
  onAuthenticated: () => void;
};

export function ReownWalletLogin({children, onAuthenticated}: Props): React.JSX.Element {
  const {address, chainId, isConnected} = useAccount();
  const {close, open} = useAppKit();
  const {provider, providerType} = useProvider();
  const [loginRequested, setLoginRequested] = useState(false);
  const processing = useRef(false);

  const connect = () => {
    setLoginRequested(true);
    if (!isConnected) {
      open({view: 'Connect'});
    }
  };

  useEffect(() => {
    if (
      !loginRequested ||
      processing.current ||
      !isConnected ||
      !address ||
      !chainId ||
      !provider ||
      providerType !== 'eip155'
    ) {
      return;
    }

    const authenticate = async () => {
      processing.current = true;
      try {
        await close();
        const numericChainId = Number(chainId);
        if (!Number.isSafeInteger(numericChainId)) {
          throw new Error('The connected wallet returned an invalid chain ID.');
        }
        const {message} = await authApi.createWalletNonce(address, numericChainId);
        const encodedMessage = isHexString(message) ? message : hexlify(toUtf8Bytes(message));
        const signature = await provider.request(
          {method: 'personal_sign', params: [encodedMessage, address]},
          `eip155:${chainId}`,
        );
        if (typeof signature !== 'string') {
          throw new Error('The wallet did not return a valid signature.');
        }
        await authApi.loginWithWallet(message, signature, 'walletconnect');
        notifications.success({message: 'Wallet connected successfully'});
        onAuthenticated();
      } catch (requestError) {
        notifications.error({
          message: requestError instanceof Error ? requestError.message : 'Wallet login failed.',
        });
      } finally {
        processing.current = false;
        setLoginRequested(false);
      }
    };

    authenticate();
  }, [
    address,
    chainId,
    close,
    isConnected,
    loginRequested,
    onAuthenticated,
    provider,
    providerType,
  ]);

  return <>{children({loading: loginRequested, onPress: connect})}</>;
}
