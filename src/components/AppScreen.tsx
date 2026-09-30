import React, {type PropsWithChildren, type ReactNode} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {colors, spacing} from '../theme';
import {AppHeader} from './AppHeader';
import {AppText} from './AppText';

type Props = PropsWithChildren<{
  title?: string;
  description?: string;
  header?: ReactNode;
}>;

export function AppScreen({children, description, header, title}: Props): React.JSX.Element {
  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      {header ?? <AppHeader />}
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {title ? (
          <View style={styles.intro}>
            <AppText variant="title" weight="bold">
              {title}
            </AppText>
            {description ? <AppText style={styles.description}>{description}</AppText> : null}
          </View>
        ) : null}
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: colors.background.app},
  content: {paddingHorizontal: spacing.lg, paddingTop: spacing.lg, paddingBottom: spacing.xxl},
  intro: {marginBottom: spacing.lg},
  description: {color: colors.text.secondary, marginTop: spacing.xs},
});
