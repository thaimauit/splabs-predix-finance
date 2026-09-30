import React, {type PropsWithChildren} from 'react';
import {StyleSheet, View, type ViewStyle} from 'react-native';

import {colors, radius, spacing} from '../theme';

type Props = PropsWithChildren<{style?: ViewStyle}>;

export function SurfaceCard({children, style}: Props): React.JSX.Element {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.card,
    borderColor: colors.border.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.lg,
  },
});
