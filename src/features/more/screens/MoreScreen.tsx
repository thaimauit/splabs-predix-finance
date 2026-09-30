import React, {useCallback, useState} from 'react';
import {ActivityIndicator, Pressable, StyleSheet, View} from 'react-native';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {useFocusEffect, type CompositeScreenProps} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppScreen, AppText, Icon, StatusBadge, SurfaceCard} from '../../../components';
import {notifications} from '../../../services/notifications';
import {colors, radius, spacing} from '../../../theme';
import type {MainTabParamList, RootStackParamList} from '../../../types/navigation';
import {authSessionStore} from '../../auth/services/authSessionStore';
import {profileApi} from '../services/profileApi';
import type {UserProfile} from '../types/profile';
import {abbreviate, getWalletAddress} from '../utils/profile';

const achievements = [
  {icon: '🗓️', label: 'Clean Streak'},
  {icon: '🚀', label: 'Clean Streak'},
  {icon: '🏠', label: 'Perfect Month'},
];

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'More'>,
  NativeStackScreenProps<RootStackParamList, 'Main'>
>;

export function MoreScreen({navigation}: Props): React.JSX.Element {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);

  const loadProfile = useCallback(async () => {
    setIsLoadingProfile(true);
    setProfileError(null);
    try {
      setProfile(await profileApi.getProfile());
    } catch (requestError) {
      setProfileError(
        requestError instanceof Error ? requestError.message : 'Could not load your profile.',
      );
    } finally {
      setIsLoadingProfile(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [loadProfile]),
  );

  const logOut = async () => {
    setIsLoggingOut(true);
    try {
      await authSessionStore.clear();
      navigation.replace('Login');
    } catch {
      notifications.error({message: 'Could not log out. Please try again.'});
      setIsLoggingOut(false);
    }
  };

  return (
    <AppScreen description="Profile, wallets, security and support." title="More">
      <SurfaceCard style={styles.streak}>
        <View style={styles.row}>
          <AppText>🔥 Clean streak</AppText>
          <AppText style={styles.gold} weight="bold">
            8 days
          </AppText>
        </View>
        <View style={styles.days}>
          {[1, 2, 3, 4, 5, 6, 7].map(day => (
            <View key={day} style={[styles.day, day === 1 && styles.dayOn]}>
              <AppText style={day === 1 ? styles.gold : styles.muted} variant="caption">
                {day}
              </AppText>
            </View>
          ))}
        </View>
        <View style={styles.row}>
          <AppText style={styles.muted} variant="caption">
            Best: 14 days
          </AppText>
          <AppText style={styles.muted} variant="caption">
            next reward at 10
          </AppText>
        </View>
      </SurfaceCard>
      <SurfaceCard style={styles.sectionCard}>
        <View style={styles.row}>
          <AppText variant="section" weight="bold">
            🏆 Achievements
          </AppText>
          <AppText style={styles.gold} variant="bodySmall">
            View all
          </AppText>
        </View>
        <View style={styles.achievements}>
          {achievements.map(item => (
            <View key={item.icon} style={styles.achievement}>
              <AppText style={styles.achievementIcon}>{item.icon}</AppText>
              <AppText variant="bodySmall">{item.label}</AppText>
            </View>
          ))}
        </View>
      </SurfaceCard>
      <SurfaceCard style={styles.sectionCard}>
        <AppText variant="section" weight="bold">
          ◎ Account
        </AppText>
        {isLoadingProfile && !profile ? (
          <View style={styles.profileStatus}>
            <ActivityIndicator color={colors.action.gold} />
            <AppText style={styles.muted}>Loading profile…</AppText>
          </View>
        ) : null}
        {profileError && !profile ? (
          <View style={styles.profileStatus}>
            <AppText style={styles.muted}>{profileError}</AppText>
            <Pressable accessibilityRole="button" onPress={loadProfile}>
              <AppText style={styles.gold} weight="bold">
                Try again
              </AppText>
            </Pressable>
          </View>
        ) : null}
        {profile ? (
          <>
            <View style={styles.inner}>
              <AppText weight="bold">♙ Profile</AppText>
              <View style={styles.detail}>
                <AppText style={styles.muted}>User ID</AppText>
                <AppText style={styles.muted}>{abbreviate(profile.id)}</AppText>
              </View>
              <View style={styles.detail}>
                <AppText style={styles.muted}>Email address</AppText>
                <AppText numberOfLines={1} style={[styles.muted, styles.detailValue]}>
                  {profile.email}
                </AppText>
              </View>
            </View>
            <View style={styles.inner}>
              <View style={styles.row}>
                <AppText weight="bold">⬡ Wallets</AppText>
                <StatusBadge
                  label={`${profile.walletAccounts.length} linked`}
                  tone={profile.walletAccounts.length > 0 ? 'success' : 'neutral'}
                />
              </View>
              {profile.walletAccounts.length === 0 ? (
                <AppText style={styles.muted}>No linked wallets</AppText>
              ) : (
                profile.walletAccounts.map((wallet, index) => {
                  const address = getWalletAddress(wallet);
                  return (
                    <View key={wallet.id ?? address ?? index} style={styles.detail}>
                      <AppText style={styles.muted}>
                        {wallet.provider ?? `Wallet ${index + 1}`}
                      </AppText>
                      <AppText style={styles.muted}>
                        {address ? abbreviate(address) : 'Linked'}
                      </AppText>
                    </View>
                  );
                })
              )}
            </View>
          </>
        ) : null}
      </SurfaceCard>
      <Pressable
        accessibilityLabel="Log out of your account"
        accessibilityRole="button"
        accessibilityState={{disabled: isLoggingOut}}
        disabled={isLoggingOut}
        onPress={logOut}
        style={({pressed}) => [
          styles.logoutButton,
          pressed && styles.logoutButtonPressed,
          isLoggingOut && styles.logoutButtonDisabled,
        ]}
      >
        <Icon name="log-out" size={18} />
        <AppText weight="bold">{isLoggingOut ? 'Logging out…' : 'Log out'}</AppText>
      </Pressable>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  streak: {gap: spacing.md},
  row: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
  gold: {color: colors.action.gold},
  muted: {color: colors.text.secondary},
  days: {flexDirection: 'row', gap: spacing.xs},
  day: {
    flex: 1,
    height: 24,
    borderRadius: radius.sm,
    backgroundColor: colors.background.cardRaised,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayOn: {borderWidth: 1, borderColor: colors.action.gold},
  sectionCard: {marginTop: spacing.md, gap: spacing.lg},
  achievements: {flexDirection: 'row', gap: spacing.sm},
  achievement: {
    flex: 1,
    height: 86,
    borderWidth: 1,
    borderColor: colors.border.card,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  achievementIcon: {fontSize: 28},
  inner: {
    borderWidth: 1,
    borderColor: colors.border.card,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: spacing.md,
  },
  detail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border.divider,
  },
  detailValue: {flex: 1, marginLeft: spacing.md, textAlign: 'right'},
  profileStatus: {alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.lg},
  logoutButton: {
    minHeight: 48,
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: colors.border.card,
    borderRadius: radius.xl,
    backgroundColor: colors.background.card,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  logoutButtonPressed: {backgroundColor: colors.background.cardRaised},
  logoutButtonDisabled: {opacity: 0.6},
});
