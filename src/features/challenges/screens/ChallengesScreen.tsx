import React, {useState} from 'react';
import {Pressable, ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {AccountCard, AppHeader, AppText, Icon} from '../../../components';
import {colors, radius, spacing, typography} from '../../../theme';

const filters = ['All', 'Evaluation', 'Funded', 'Trial', 'Closed'] as const;
type Filter = (typeof filters)[number];

const summaries = [
  {icon: 'award', label: 'ACTIVE', value: '10', subtitle: '7 owned'},
  {icon: 'trending-up', label: 'IN EVALUATION', value: '30', subtitle: '→ funded'},
  {icon: 'briefcase', label: 'FUNDED', value: '5', subtitle: 'our capital'},
  {icon: 'wallet', label: 'LIFETIME PAYOUT', value: '$3,632', subtitle: 'USD on-chain'},
] as const;

export function ChallengesScreen(): React.JSX.Element {
  const [filter, setFilter] = useState<Filter>('All');

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <AppHeader />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.summaryGrid}>
          {summaries.map(summary => (
            <View key={summary.label} style={styles.summaryCard}>
              <View style={styles.summaryIcon}>
                <Icon color={colors.action.gold} name={summary.icon} size={30} />
              </View>
              <View style={styles.summaryCopy}>
                <AppText style={styles.summaryLabel} variant="bodySmall" weight="bold">
                  {summary.label}
                </AppText>
                <AppText style={styles.summaryValue} weight="heavy">
                  {summary.value}
                </AppText>
                <AppText style={styles.summarySubtitle} variant="bodySmall">
                  {summary.subtitle}
                </AppText>
              </View>
            </View>
          ))}
        </View>

        <ScrollView
          contentContainerStyle={styles.filters}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {filters.map(item => {
            const selected = filter === item;
            return (
              <Pressable
                accessibilityRole="button"
                accessibilityState={{selected}}
                key={item}
                onPress={() => setFilter(item)}
                style={[styles.filter, selected && styles.filterSelected]}
              >
                <AppText style={[styles.filterText, selected && styles.filterTextSelected]}>
                  {item}
                </AppText>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <AppText variant="section" weight="heavy">
            Your Challenges
          </AppText>
          <AppText style={styles.accountCount}>7 accounts</AppText>
        </View>

        <AccountCard />
        <View style={styles.dots}>
          <View style={styles.dotSelected} />
          {[1, 2, 3, 4, 5, 6].map(dot => (
            <View key={dot} style={styles.dot} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: colors.background.black},
  content: {paddingHorizontal: spacing.lg, paddingTop: spacing.lg, paddingBottom: spacing.xxl},
  summaryGrid: {flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md},
  summaryCard: {
    width: '48%',
    minHeight: 112,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border.card,
    borderRadius: radius.md,
    backgroundColor: colors.background.card,
  },
  summaryIcon: {
    width: 54,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    backgroundColor: colors.action.primaryMuted,
  },
  summaryCopy: {flex: 1},
  summaryLabel: {color: colors.text.secondary, letterSpacing: 0.3},
  summaryValue: {
    marginTop: spacing.xs,
    color: colors.action.goldSoft,
    fontFamily: typography.family.mono,
    fontSize: 25,
  },
  summarySubtitle: {marginTop: spacing.xs, color: colors.text.secondary},
  filters: {gap: spacing.sm, paddingVertical: spacing.xl},
  filter: {
    height: 42,
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border.card,
    borderRadius: radius.pill,
    backgroundColor: colors.background.cardRaised,
  },
  filterSelected: {borderColor: colors.text.primary, backgroundColor: colors.text.primary},
  filterText: {color: colors.text.primary, fontSize: 16},
  filterTextSelected: {color: colors.background.black, fontWeight: '700'},
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  accountCount: {color: colors.text.secondary, fontSize: 16},
  dots: {flexDirection: 'row', justifyContent: 'center', gap: 7, marginTop: spacing.xl},
  dot: {width: 8, height: 8, borderRadius: radius.pill, backgroundColor: colors.border.default},
  dotSelected: {
    width: 28,
    height: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.action.gold,
  },
});
