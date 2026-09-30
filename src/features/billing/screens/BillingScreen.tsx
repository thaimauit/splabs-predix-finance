import React from 'react';
import {StyleSheet, View} from 'react-native';

import {AppScreen, AppText, SectionHeader, StatusBadge, SurfaceCard} from '../../../components';
import {colors, radius, spacing} from '../../../theme';

const metrics = [
  {icon: '🪙', label: 'TOTAL PAID', value: '$997'},
  {icon: '💰', label: 'REFUNDED', value: '$270'},
  {icon: '👝', label: 'NET SPENT', value: '$727'},
  {icon: '🎟️', label: 'VOUCHERS', value: '1'},
];
const transactions = [
  {
    icon: '🎁',
    title: 'Free trial activated · Trial-100',
    sub: '$100,000 demo account',
    amount: '$0.00',
    date: 'Aug 1, 2026',
    status: 'Free',
  },
  {
    icon: '↑',
    title: 'Challenge purchase · Analyst',
    sub: '$5,000 Sprint',
    amount: '-$54.00',
    date: 'Jul 30, 2026',
    status: 'Paid',
  },
  {
    icon: '↑',
    title: 'Challenge purchase · Trader',
    sub: '$10,000 Sprint',
    amount: '-$108.00',
    date: 'Jul 27, 2026',
    status: 'Paid',
  },
  {
    icon: '↑',
    title: 'Challenge purchase · C-25',
    sub: '$25,000 Classic',
    amount: '-$238.00',
    date: 'Jul 18, 2026',
    status: 'Paid',
  },
];

export function BillingScreen(): React.JSX.Element {
  return (
    <AppScreen description="Every purchase, refund, and reset voucher." title="Billing">
      <View style={styles.grid}>
        {metrics.map(item => (
          <SurfaceCard key={item.label} style={styles.metric}>
            <AppText style={styles.metricIcon}>{item.icon}</AppText>
            <View>
              <AppText style={styles.label} variant="caption">
                {item.label}
              </AppText>
              <AppText style={styles.gold} variant="section" weight="bold">
                {item.value}
              </AppText>
            </View>
          </SurfaceCard>
        ))}
      </View>
      <SectionHeader title="Transactions" />
      <View style={styles.list}>
        {transactions.map(item => (
          <SurfaceCard key={item.title} style={styles.transaction}>
            <View style={styles.transactionIcon}>
              <AppText>{item.icon}</AppText>
            </View>
            <View style={styles.copy}>
              <AppText weight="bold">{item.title}</AppText>
              <AppText style={styles.label} variant="bodySmall">
                {item.sub}
              </AppText>
              <View style={styles.meta}>
                <AppText style={styles.label} variant="caption">
                  {item.date}
                </AppText>
                <StatusBadge label={item.status} />
              </View>
            </View>
            <AppText weight="bold">{item.amount}</AppText>
          </SurfaceCard>
        ))}
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  grid: {flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm},
  metric: {
    width: '48.7%',
    minHeight: 84,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  metricIcon: {fontSize: 28},
  label: {color: colors.text.secondary},
  gold: {color: colors.action.gold},
  list: {gap: spacing.sm},
  transaction: {
    minHeight: 92,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    padding: spacing.md,
  },
  transactionIcon: {
    width: 34,
    height: 34,
    borderRadius: radius.sm,
    backgroundColor: colors.background.elevatedStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: {flex: 1, gap: spacing.xs},
  meta: {flexDirection: 'row', alignItems: 'center', gap: spacing.sm},
});
