import React from 'react';
import {StyleSheet, Text, type TextProps, type TextStyle} from 'react-native';

import {colors, typography} from '../theme';

type TextVariant = 'caption' | 'bodySmall' | 'body' | 'section' | 'title' | 'hero';
type TextWeight = keyof typeof typography.weight;

type Props = TextProps & {
  variant?: TextVariant;
  weight?: TextWeight;
};

const variantStyles: Record<TextVariant, TextStyle> = {
  caption: {fontSize: typography.size.caption},
  bodySmall: {fontSize: typography.size.bodySmall},
  body: {fontSize: typography.size.body},
  section: {fontSize: typography.size.section},
  title: {fontSize: typography.size.title},
  hero: {fontSize: typography.size.hero},
};

export function AppText({style, variant = 'body', weight = 'regular', ...props}: Props) {
  return (
    <Text
      {...props}
      style={[styles.base, variantStyles[variant], {fontWeight: typography.weight[weight]}, style]}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    color: colors.text.primary,
    fontFamily: typography.family.sans,
  },
});
