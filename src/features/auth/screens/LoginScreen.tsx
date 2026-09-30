import React, {useCallback, useEffect, useState} from 'react';
import {Image, Linking, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Icon} from '../../../components';
import {colors, typography} from '../../../theme';
import type {RootStackParamList} from '../../../types/navigation';
import {notifications} from '../../../services/notifications';
import {authApi} from '../services/authApi';
import {appleAuthService} from '../services/appleAuthService';
import {xAuthService} from '../services/xAuthService';
import type {AuthMethod, AuthSession} from '../types/auth';
import {ReownWalletLogin} from '../wallet/ReownWalletLogin';
import {isReownConfigured} from '../wallet/reownConfig';

const loginHero = require('../../../assets/images/login-hero.png');
const googleIcon = require('../../../assets/images/google-g.png');

const legalUrls = {
  disclaimer: 'https://beta.predixpro.io/disclaimer',
  privacy: 'https://beta.predixpro.io/privacy',
  terms: 'https://beta.predixpro.io/terms',
} as const;

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;
type AuthMode = 'login' | 'signup';

type AuthOptionProps = {
  accent?: boolean;
  disabled?: boolean;
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
};

function AuthOption({accent = false, disabled = false, icon, label, onPress}: AuthOptionProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={[styles.option, accent && styles.optionAccent]}
    >
      <View style={styles.optionIcon}>{icon}</View>
      <Text style={[styles.optionLabel, accent && styles.optionTextAccent]}>{label}</Text>
      <Icon
        color={accent ? colors.action.authGoldLight : colors.text.authMuted}
        name="chevron-right"
        size={17}
      />
    </Pressable>
  );
}

export function LoginScreen({navigation}: Props): React.JSX.Element {
  const [mode, setMode] = useState<AuthMode>('login');
  const [loadingMethod, setLoadingMethod] = useState<AuthMethod | null>(null);

  useEffect(() => {
    const handleUrl = async ({url}: {url: string}) => {
      if (await authApi.completeGoogleLogin(url)) {
        navigation.replace('Main');
      }
    };
    Linking.getInitialURL().then(url => {
      if (url) {
        handleUrl({url});
      }
    });
    const subscription = Linking.addEventListener('url', handleUrl);
    return () => subscription.remove();
  }, [navigation]);

  const authenticate = async (method: AuthMethod, request: () => Promise<AuthSession>) => {
    setLoadingMethod(method);
    try {
      await request();
      navigation.replace('Main');
    } catch (requestError) {
      notifications.error({
        message:
          requestError instanceof Error
            ? requestError.message
            : 'Authentication failed. Please try again.',
      });
    } finally {
      setLoadingMethod(null);
    }
  };

  const signInWithGoogle = async () => {
    setLoadingMethod('google');
    try {
      await authApi.startGoogleLogin();
    } catch (requestError) {
      notifications.error({
        message: requestError instanceof Error ? requestError.message : 'Could not open Google.',
      });
    } finally {
      setLoadingMethod(null);
    }
  };
  const signInWithX = () => authenticate('x', () => xAuthService.signIn());
  const signInWithApple = () => authenticate('apple', () => appleAuthService.signIn());
  const completeWalletAuthentication = useCallback(() => navigation.replace('Main'), [navigation]);
  const showReownConfigurationError = () =>
    notifications.error({message: 'Reown project ID is not configured.'});
  const continueWithEmail = () => navigation.navigate('EmailAuth', {mode});
  const openLegalPage = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch {
      notifications.error({message: 'Could not open this legal page.'});
    }
  };
  const selectLogin = () => setMode('login');
  const selectSignup = () => setMode('signup');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Image resizeMode="contain" source={loginHero} style={styles.hero} />

        <View style={styles.switcher}>
          <Pressable
            accessibilityRole="tab"
            accessibilityState={{selected: mode === 'login'}}
            onPress={selectLogin}
            style={[styles.tab, mode === 'login' && styles.activeTab]}
          >
            <Text style={[styles.tabLabel, mode === 'login' && styles.activeTabLabel]}>Log in</Text>
          </Pressable>
          <Pressable
            accessibilityRole="tab"
            accessibilityState={{selected: mode === 'signup'}}
            onPress={selectSignup}
            style={[styles.tab, mode === 'signup' && styles.activeTab]}
          >
            <Text style={[styles.tabLabel, mode === 'signup' && styles.activeTabLabel]}>
              Sign up
            </Text>
          </Pressable>
        </View>

        <View style={styles.panel}>
          <Text style={styles.sectionTitle}>AUTHENTICATION METHOD</Text>
          <AuthOption
            accent
            disabled={loadingMethod !== null}
            icon={<Icon color={colors.text.authMuted} name="mail" size={21} />}
            label="Continue with email"
            onPress={continueWithEmail}
          />
          <AuthOption
            disabled={loadingMethod !== null}
            icon={<Image source={googleIcon} style={styles.googleIcon} />}
            label={loadingMethod === 'google' ? 'Connecting…' : 'Continue with Google'}
            onPress={signInWithGoogle}
          />
          <AuthOption
            disabled={loadingMethod !== null}
            icon={<Text style={styles.xIcon}>X</Text>}
            label={loadingMethod === 'x' ? 'Connecting…' : 'Continue with X'}
            onPress={signInWithX}
          />
          <AuthOption
            disabled={loadingMethod !== null}
            icon={
              <Icon color={colors.text.authPrimary} family="ionicons" name="logo-apple" size={22} />
            }
            label={loadingMethod === 'apple' ? 'Connecting…' : 'Continue with Apple'}
            onPress={signInWithApple}
          />
          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>WALLET</Text>
            <View style={styles.divider} />
          </View>

          {isReownConfigured ? (
            <ReownWalletLogin onAuthenticated={completeWalletAuthentication}>
              {({loading, onPress}) => (
                <AuthOption
                  disabled={loading}
                  icon={<Icon color={colors.text.authMuted} name="wallet-cards" size={21} />}
                  label={loading ? 'Connecting…' : 'Continue with wallet'}
                  onPress={onPress}
                />
              )}
            </ReownWalletLogin>
          ) : (
            <AuthOption
              icon={<Icon color={colors.text.authMuted} name="wallet-cards" size={21} />}
              label="Continue with wallet"
              onPress={showReownConfigurationError}
            />
          )}
          <Text style={styles.legal}>
            By continuing you agree to our{' '}
            <Text
              accessibilityRole="link"
              onPress={() => openLegalPage(legalUrls.terms)}
              style={styles.legalLink}
            >
              Terms of Service
            </Text>
            {', '}
            <Text
              accessibilityRole="link"
              onPress={() => openLegalPage(legalUrls.privacy)}
              style={styles.legalLink}
            >
              Privacy Policy
            </Text>
            {'\n'}and{' '}
            <Text
              accessibilityRole="link"
              onPress={() => openLegalPage(legalUrls.disclaimer)}
              style={styles.legalLink}
            >
              Disclaimer
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {backgroundColor: colors.background.black, flex: 1},
  scrollContent: {flexGrow: 1},
  hero: {
    alignSelf: 'center',
    height: 292,
    width: 292,
  },
  switcher: {
    backgroundColor: colors.background.authControl,
    borderColor: colors.border.auth,
    borderRadius: 12.5,
    borderWidth: 1,
    flexDirection: 'row',
    height: 46,
    marginBottom: 21,
    marginHorizontal: 21,
    padding: 3,
  },
  tab: {
    alignItems: 'center',
    borderRadius: 12.5,
    flex: 1,
    justifyContent: 'center',
    minHeight: 38,
  },
  activeTab: {backgroundColor: colors.action.authGold},
  tabLabel: {color: colors.text.authSecondary, fontSize: 15, fontWeight: '600'},
  activeTabLabel: {color: colors.text.inverse},
  panel: {
    backgroundColor: colors.background.authSheet,
    borderColor: colors.border.authStrong,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderTopWidth: 1,
    gap: 10.5,
    paddingBottom: 33,
    paddingHorizontal: 21,
    paddingTop: 25,
  },
  sectionTitle: {
    color: colors.text.authSecondary,
    fontSize: typography.size.bodySmall,
    letterSpacing: 1.15,
    lineHeight: 15,
  },
  option: {
    alignItems: 'center',
    backgroundColor: colors.background.authControl,
    borderColor: colors.border.auth,
    borderRadius: 8.4,
    borderWidth: 1,
    flexDirection: 'row',
    height: 52,
    paddingHorizontal: 19,
  },
  optionAccent: {
    backgroundColor: colors.action.authGoldMuted,
    borderColor: colors.action.authGold,
  },
  optionIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 29,
  },
  googleIcon: {height: 20, width: 20},
  xIcon: {
    color: colors.text.authPrimary,
    fontFamily: typography.family.sans,
    fontSize: 19,
    fontWeight: '700',
  },
  optionLabel: {
    color: colors.text.authPrimary,
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.16,
    marginLeft: 12.5,
  },
  optionTextAccent: {color: colors.action.authGoldLight},
  dividerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10.5,
    height: 18,
  },
  divider: {backgroundColor: colors.border.auth, flex: 1, height: 1},
  dividerText: {color: colors.text.authFaint, fontSize: typography.size.bodySmall},
  legal: {
    color: colors.text.authSecondary,
    fontSize: typography.size.bodySmall,
    lineHeight: 18,
    marginTop: 5,
    textAlign: 'center',
  },
  legalLink: {color: colors.text.authPrimary},
});
