import React from 'react';
import {StyleSheet, View} from 'react-native';

import {colors, radius, spacing} from '../theme';
import {AppText} from './AppText';

type Tone = 'info' | 'success' | 'neutral';
type Props = {label: string; tone?: Tone};

export function StatusBadge({label, tone = 'neutral'}: Props): React.JSX.Element {
  return (
    <View
      style={[styles.root, tone === 'info' && styles.info, tone === 'success' && styles.success]}
    >
      <AppText
        style={[
          styles.label,
          tone === 'info' && styles.infoText,
          tone === 'success' && styles.successText,
        ]}
        variant="caption"
        weight="bold"
      >
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    backgroundColor: colors.background.elevatedStrong,
  },
  label: {color: colors.text.secondary},
  info: {backgroundColor: colors.status.infoMuted},
  infoText: {color: colors.status.info},
  success: {backgroundColor: colors.status.successMuted},
  successText: {color: colors.status.success},
});
