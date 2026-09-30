import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';

import {colors, radius, spacing, typography} from '../../../theme';
import type {RootStackParamList} from '../../../types/navigation';
import {notifications} from '../../../services/notifications';
import {authApi} from '../services/authApi';

type Props = NativeStackScreenProps<RootStackParamList, 'EmailAuth'>;

const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

export function EmailAuthScreen({navigation, route}: Props): React.JSX.Element {
  const isLogin = route.params.mode === 'login';
  const registrationComplete = route.params.registrationComplete === true;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const submit = async () => {
    setMessage(null);
    setIsError(false);
    if (!email.includes('@')) {
      setIsError(true);
      setMessage('Enter a valid email address.');
      notifications.error({message: 'Enter a valid email address.'});
      return;
    }
    if (!passwordPattern.test(password)) {
      setIsError(true);
      setMessage('Password needs 8+ characters with a letter, number and special character.');
      notifications.error({
        message: 'Password needs 8+ characters with a letter, number and special character.',
      });
      return;
    }
    setLoading(true);
    try {
      if (isLogin) {
        await authApi.loginWithEmail({email, password});
        navigation.replace('Main');
      } else {
        await authApi.registerWithEmail({email, password});
        navigation.replace('EmailAuth', {mode: 'login', registrationComplete: true});
        notifications.success({
          description: 'Please verify your email before logging in.',
          message: 'Registration successful',
        });
      }
    } catch (requestError) {
      setIsError(true);
      setMessage(requestError instanceof Error ? requestError.message : 'Authentication failed.');
      notifications.error({
        message: requestError instanceof Error ? requestError.message : 'Authentication failed.',
      });
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async () => {
    if (!email.includes('@')) {
      setIsError(true);
      setMessage('Enter your email first.');
      notifications.error({message: 'Enter your email first.'});
      return;
    }
    setLoading(true);
    try {
      await authApi.requestPasswordReset(email);
      setIsError(false);
      setMessage('Check your inbox for the password reset link.');
      notifications.success({message: 'Password reset email sent'});
    } catch (requestError) {
      setIsError(true);
      setMessage(requestError instanceof Error ? requestError.message : 'Request failed.');
      notifications.error({
        message: requestError instanceof Error ? requestError.message : 'Request failed.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <Pressable
          accessibilityLabel="Go back"
          accessibilityRole="button"
          onPress={navigation.goBack}
          style={styles.back}
        >
          <Text style={styles.backLabel}>‹</Text>
        </Pressable>
        <View style={styles.content}>
          <Text style={styles.eyebrow}>PREDIX FINANCE</Text>
          <Text style={styles.title}>{isLogin ? 'Log in with email' : 'Create your account'}</Text>
          <Text style={styles.subtitle}>
            {registrationComplete
              ? 'Please check your email to verify your account, then log in again.'
              : isLogin
              ? 'Welcome back.'
              : 'Verify your email after registration.'}
          </Text>

          <Text style={styles.label}>EMAIL</Text>
          <TextInput
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            onChangeText={setEmail}
            placeholder="you@example.com"
            placeholderTextColor={colors.text.tertiary}
            style={styles.input}
            value={email}
          />
          <Text style={styles.label}>PASSWORD</Text>
          <TextInput
            autoCapitalize="none"
            autoComplete={isLogin ? 'current-password' : 'new-password'}
            onChangeText={setPassword}
            placeholder="••••••••"
            placeholderTextColor={colors.text.tertiary}
            secureTextEntry
            style={styles.input}
            value={password}
          />

          {isLogin ? (
            <Pressable accessibilityRole="button" disabled={loading} onPress={forgotPassword}>
              <Text style={styles.forgot}>Forgot password?</Text>
            </Pressable>
          ) : null}

          {message ? <Text style={isError ? styles.error : styles.success}>{message}</Text> : null}
          <Pressable
            accessibilityRole="button"
            disabled={loading}
            onPress={submit}
            style={styles.button}
          >
            <Text style={styles.buttonLabel}>
              {loading ? 'Please wait…' : isLogin ? 'Log in' : 'Sign up'}
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {backgroundColor: colors.background.black, flex: 1},
  container: {flex: 1, paddingHorizontal: spacing.xl},
  back: {alignItems: 'center', height: 44, justifyContent: 'center', width: 44},
  backLabel: {color: colors.text.primary, fontSize: 36},
  content: {flex: 1, justifyContent: 'center'},
  eyebrow: {color: colors.action.gold, fontSize: 11, letterSpacing: 2, marginBottom: spacing.md},
  title: {color: colors.text.primary, fontSize: 30, fontWeight: '700'},
  subtitle: {
    color: colors.text.secondary,
    fontSize: typography.size.body,
    marginBottom: spacing.xxl,
    marginTop: spacing.sm,
  },
  label: {color: colors.text.secondary, fontSize: 11, letterSpacing: 1.5, marginBottom: spacing.sm},
  input: {
    backgroundColor: colors.background.sunken,
    borderColor: colors.border.onboarding,
    borderRadius: radius.md,
    borderWidth: 1,
    color: colors.text.primary,
    fontSize: 16,
    height: 56,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  forgot: {color: colors.action.goldSoft, marginBottom: spacing.lg, textAlign: 'right'},
  error: {color: colors.status.danger, lineHeight: 20, marginBottom: spacing.md},
  success: {color: colors.status.success, lineHeight: 20, marginBottom: spacing.md},
  button: {
    alignItems: 'center',
    backgroundColor: colors.action.gold,
    borderRadius: 28,
    height: 56,
    justifyContent: 'center',
  },
  buttonLabel: {color: colors.text.inverse, fontSize: 16, fontWeight: '700'},
});
