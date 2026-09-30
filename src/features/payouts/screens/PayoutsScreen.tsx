import React from 'react';
import {StyleSheet, View} from 'react-native';

import {AppScreen, AppText, SectionHeader, SurfaceCard} from '../../../components';
import {colors, radius, spacing} from '../../../theme';

const stats = [
  {icon: '🪙', label: 'Paid', value: '$3,632'},
  {icon: '👥', label: 'Funded', value: '2'},
  {icon: '⚡', label: 'Ready', value: '1'},
];
const checks = [
  '12/10 days since funded',
  '31/8 positions closed',
  'Net profit 3%+ (6.8% now)',
  'KYC complete',
];

export function PayoutsScreen(): React.JSX.Element {
  return (
    <AppScreen>
      <SurfaceCard style={styles.hero}>
        <View style={styles.heroCopy}>
          <AppText style={styles.gold} variant="hero" weight="heavy">
            PAYOUTS
          </AppText>
          <AppText style={styles.heroSub} variant="section">
            Profit share paid to you in USDC
          </AppText>
        </View>
        <AppText style={styles.heroIcon}>🪙</AppText>
      </SurfaceCard>
      <View style={styles.stats}>
        {stats.map(item => (
          <SurfaceCard key={item.label} style={styles.stat}>
            <AppText style={styles.statIcon}>{item.icon}</AppText>
            <View>
              <AppText style={styles.muted}>{item.label}</AppText>
              <AppText style={styles.gold} variant="section" weight="bold">
                {item.value}
              </AppText>
            </View>
          </SurfaceCard>
        ))}
      </View>
      <SectionHeader title="Funded accounts" />
      <SurfaceCard>
        <View style={styles.accountHeader}>
          <View style={styles.crown}>
            <AppText style={styles.crownText}>♛</AppText>
          </View>
          <View>
            <AppText variant="section" weight="bold">
              $10,000 <AppText style={styles.muted}>I-10</AppText>
            </AppText>
            <AppText style={styles.muted} variant="bodySmall">
              PX-INS-10K-C4E2 · net +6.84%
            </AppText>
          </View>
        </View>
        <View style={styles.request}>
          <View style={styles.progress}>
            <AppText weight="bold">2/4</AppText>
            <AppText style={styles.muted} variant="caption">
              met
            </AppText>
          </View>
          <View style={styles.requestCopy}>
            <AppText variant="section" weight="bold">
              Ready to request
            </AppText>
            <AppText style={styles.muted}>Profit share this cycle</AppText>
            <AppText style={styles.gold} variant="hero" weight="bold">
              $513
            </AppText>
          </View>
        </View>
        <View style={styles.divider} />
        {checks.map(check => (
          <View key={check} style={styles.check}>
            <AppText style={styles.checkIcon}>✓</AppText>
            <AppText>{check}</AppText>
          </View>
        ))}
        <View style={styles.meta}>
          <AppText style={styles.muted} variant="caption">
            Cycle every 7d
          </AppText>
          <AppText style={styles.muted} variant="caption">
            Unichain · USDC
          </AppText>
          <AppText style={styles.muted} variant="caption">
            Paid so far $512
          </AppText>
        </View>
      </SurfaceCard>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  hero: {minHeight: 150, flexDirection: 'row', alignItems: 'center', borderRadius: radius.xl},
  heroCopy: {flex: 1},
  gold: {color: colors.action.gold},
  heroSub: {color: colors.text.secondary, lineHeight: 25, marginTop: spacing.lg},
  heroIcon: {fontSize: 58},
  stats: {flexDirection: 'row', gap: spacing.sm, marginTop: spacing.lg},
  stat: {
    flex: 1,
    minHeight: 80,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  statIcon: {fontSize: 25},
  muted: {color: colors.text.secondary},
  accountHeader: {flexDirection: 'row', alignItems: 'center', gap: spacing.md},
  crown: {
    width: 54,
    height: 54,
    borderRadius: radius.pill,
    borderColor: colors.action.gold,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  crownText: {fontSize: 25, color: colors.action.gold},
  request: {flexDirection: 'row', marginTop: spacing.xl, alignItems: 'center'},
  progress: {
    width: 84,
    height: 84,
    borderRadius: radius.pill,
    borderWidth: 8,
    borderColor: colors.action.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  requestCopy: {marginLeft: spacing.xl, gap: spacing.xs},
  divider: {height: 1, backgroundColor: colors.border.divider, marginVertical: spacing.lg},
  check: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'center',
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.divider,
  },
  checkIcon: {
    color: colors.action.gold,
    borderColor: colors.action.gold,
    borderWidth: 1,
    borderRadius: radius.pill,
    width: 24,
    height: 24,
    textAlign: 'center',
    lineHeight: 22,
  },
  meta: {flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.lg},
});
