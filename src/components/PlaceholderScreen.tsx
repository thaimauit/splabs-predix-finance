import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppHeader} from './AppHeader';
import {colors} from '../theme';
export function PlaceholderScreen({
  title,
  description,
}: {
  title: string;
  description: string;
}): React.JSX.Element {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader />
      <View style={styles.body}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: colors.background.primary},
  body: {padding: 16},
  title: {fontSize: 21, fontWeight: '800', color: colors.text.primary},
  description: {fontSize: 13, color: colors.text.secondary, marginTop: 4},
});
