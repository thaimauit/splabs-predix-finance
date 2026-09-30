import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';

import {colors, radius, spacing} from '../theme';
import {AppText} from './AppText';
import {Icon} from './Icon';

export function AppHeader(): React.JSX.Element {
  return (
    <View style={styles.root}>
      <View style={styles.avatar}>
        <AppText style={styles.avatarText}>🤠</AppText>
      </View>
      <View>
        <AppText weight="bold">Mannhi</AppText>
        <AppText style={styles.role} variant="bodySmall">
          Trader
        </AppText>
      </View>
      <View style={styles.wallet}>
        <View style={styles.dot} />
        <AppText style={styles.walletText} variant="bodySmall">
          0x7a2b…3f9c
        </AppText>
      </View>
      <Pressable accessibilityLabel="Notifications" style={styles.iconButton}>
        <Icon name="bell" size={18} />
        <View style={styles.notification}>
          <AppText style={styles.notificationText} variant="caption" weight="bold">
            3
          </AppText>
        </View>
      </Pressable>
      <Pressable accessibilityLabel="Add account" style={styles.addButton}>
        <Icon color={colors.text.inverse} name="plus" size={23} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    height: 76,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.divider,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: radius.pill,
    backgroundColor: colors.status.infoMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {fontSize: 24},
  role: {color: colors.text.secondary},
  wallet: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    borderWidth: 1,
    borderColor: colors.border.card,
    borderRadius: radius.pill,
    paddingVertical: 9,
    paddingHorizontal: 12,
  },
  dot: {width: 8, height: 8, borderRadius: radius.pill, backgroundColor: colors.status.success},
  walletText: {color: colors.text.secondary},
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notification: {
    position: 'absolute',
    right: -3,
    top: -5,
    width: 18,
    height: 18,
    borderRadius: radius.pill,
    backgroundColor: colors.status.danger,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationText: {color: colors.text.primary},
  addButton: {
    width: 46,
    height: 46,
    borderRadius: radius.md,
    backgroundColor: colors.action.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
