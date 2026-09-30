import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import FlashMessage from 'react-native-flash-message';
import {AppKit, AppKitProvider} from '@reown/appkit-react-native';

import {AppNavigator} from './src/app/navigation/AppNavigator';
import {colors} from './src/theme';
import {reownAppKit} from './src/features/auth/wallet/reownConfig';

function AppContent(): React.JSX.Element {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.background.primary} />
      <AppNavigator />
      <FlashMessage position="top" floating />
      {reownAppKit ? <AppKit /> : null}
    </>
  );
}

export default function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      {reownAppKit ? (
        <AppKitProvider instance={reownAppKit}>
          <AppContent />
        </AppKitProvider>
      ) : (
        <AppContent />
      )}
    </SafeAreaProvider>
  );
}
