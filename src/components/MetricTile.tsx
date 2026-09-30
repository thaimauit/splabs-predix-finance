import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, radius, spacing, typography} from '../theme';

type Props = {label: string; value: string; accent?: boolean; subtitle?: string};
export function MetricTile({label, value, accent = false, subtitle}: Props): React.JSX.Element {
  return (
    <View style={[styles.root, accent && styles.accent]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, accent && styles.valueAccent]}>{value}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
    minHeight: 103,
    justifyContent: 'center',
    backgroundColor: colors.background.elevated,
    borderWidth: 1,
    borderColor: colors.border.default,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  accent: {backgroundColor: colors.action.primaryMuted, borderColor: colors.border.accent},
  label: {fontSize: 11, fontWeight: '600', color: colors.text.secondary},
  value: {
    fontFamily: typography.family.mono,
    fontSize: 21,
    fontWeight: '800',
    color: colors.text.primary,
    marginTop: 4,
  },
  valueAccent: {color: colors.action.primary},
  subtitle: {fontSize: 10, color: colors.text.tertiary, marginTop: 2},
});
