import React from 'react';
import {StyleSheet, View} from 'react-native';

import {colors, spacing} from '../theme';
import {AppText} from './AppText';

type Props = {title: string; action?: string};

export function SectionHeader({action, title}: Props): React.JSX.Element {
  return (
    <View style={styles.root}>
      <View style={styles.accent} />
      <AppText style={styles.title} variant="section" weight="bold">
        {title}
      </AppText>
      {action ? (
        <AppText style={styles.action} variant="bodySmall">
          {action}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    marginTop: spacing.xl,
  },
  accent: {
    width: 4,
    height: 24,
    borderRadius: 2,
    backgroundColor: colors.action.gold,
    marginRight: spacing.md,
  },
  title: {flex: 1},
  action: {color: colors.action.gold},
});
