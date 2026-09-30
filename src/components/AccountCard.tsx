import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, radius, spacing, typography} from '../theme';

export function AccountCard(): React.JSX.Element {
  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <View>
          <Text style={styles.program}>⚡ PREDIX SPRINT</Text>
          <Text style={styles.name}>
            $10,000 <Text style={styles.muted}>Trader</Text>
          </Text>
        </View>
        <Text style={styles.badge}>♟ In evaluation</Text>
      </View>
      <View style={styles.runwayHeader}>
        <Text style={styles.tiny}>BREACH FLOOR</Text>
        <Text style={styles.tiny}>PASS TARGET</Text>
      </View>
      <View style={styles.track}>
        <View style={styles.fill} />
        <View style={styles.current} />
      </View>
      <View style={styles.legend}>
        <View>
          <Text style={styles.key}>FLOOR</Text>
          <Text style={styles.number}>$9,000</Text>
        </View>
        <View style={styles.center}>
          <Text style={styles.key}>START</Text>
          <Text style={styles.number}>$10,000</Text>
        </View>
        <View style={styles.right}>
          <Text style={styles.key}>TARGET</Text>
          <Text style={styles.number}>$11,200</Text>
        </View>
      </View>
      <View style={styles.metrics}>
        <View>
          <Text style={styles.metricLabel}>Equity</Text>
          <Text style={styles.metricValue}>$10,552</Text>
        </View>
        <View style={styles.metricColumn}>
          <Text style={styles.metricLabel}>Net P&amp;L</Text>
          <Text style={styles.metricPositive}>+$552</Text>
        </View>
        <View style={styles.metricColumn}>
          <Text style={styles.metricLabel}>Target progress</Text>
          <Text style={styles.metricValue}>46%</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.sub}>PX-SPR-10K-7F3A</Text>
        <Text style={styles.open}>Details →</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.elevated,
    borderWidth: 1,
    borderColor: colors.border.accent,
    borderRadius: radius.lg,
    minHeight: 310,
    padding: spacing.xl,
  },
  top: {flexDirection: 'row', justifyContent: 'space-between'},
  program: {fontSize: 14, color: colors.action.goldSoft, fontWeight: '800'},
  name: {fontSize: 25, color: colors.text.primary, fontWeight: '800', marginTop: spacing.xl},
  muted: {fontSize: 14, color: colors.text.secondary, fontWeight: '600'},
  badge: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.status.info,
    backgroundColor: colors.status.infoMuted,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
  },
  sub: {fontSize: 10, color: colors.text.tertiary, marginTop: 5},
  runwayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xl,
    marginBottom: 6,
  },
  tiny: {fontSize: 9, color: colors.text.tertiary, fontWeight: '700'},
  track: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.background.sunken,
    position: 'relative',
  },
  fill: {
    position: 'absolute',
    left: '37%',
    width: '27%',
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.status.success,
  },
  current: {
    position: 'absolute',
    left: '63%',
    top: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.status.success,
    borderWidth: 2,
    borderColor: colors.background.primary,
  },
  legend: {flexDirection: 'row', justifyContent: 'space-between', marginTop: 8},
  key: {fontSize: 9, color: colors.text.tertiary, fontWeight: '700'},
  number: {
    fontFamily: typography.family.mono,
    fontSize: 12,
    color: colors.text.primary,
    fontWeight: '700',
    marginTop: 2,
  },
  positive: {
    fontFamily: typography.family.mono,
    fontSize: 12,
    color: colors.status.success,
    fontWeight: '700',
    marginTop: 2,
  },
  center: {alignItems: 'center'},
  right: {alignItems: 'flex-end'},
  metrics: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.border.subtle,
    marginTop: 14,
    paddingTop: 12,
  },
  metricColumn: {
    flex: 1,
    marginLeft: spacing.lg,
    paddingLeft: spacing.lg,
    borderLeftWidth: 1,
    borderLeftColor: colors.border.divider,
  },
  metricLabel: {fontSize: 12, color: colors.text.secondary},
  metricValue: {fontSize: 17, color: colors.text.primary, fontWeight: '700', marginTop: spacing.sm},
  metricPositive: {
    fontSize: 17,
    color: colors.status.success,
    fontWeight: '700',
    marginTop: spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  open: {fontSize: 11, color: colors.action.primary, fontWeight: '700'},
});
