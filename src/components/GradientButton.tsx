import React, {type ReactNode} from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  type StyleProp,
  View,
  type ViewStyle,
} from 'react-native';
import Svg, {Defs, LinearGradient, Rect, Stop} from 'react-native-svg';

import {colors, radius, spacing} from '../theme';
import {AppText} from './AppText';

type Props = {
  accessibilityLabel?: string;
  disabled?: boolean;
  label: string;
  leftIcon?: ReactNode;
  loading?: boolean;
  onPress: () => void;
  rightIcon?: ReactNode;
  shape?: 'pill' | 'rounded';
  style?: StyleProp<ViewStyle>;
};

export function GradientButton({
  accessibilityLabel,
  disabled = false,
  label,
  leftIcon,
  loading = false,
  onPress,
  rightIcon,
  shape = 'pill',
  style,
}: Props): React.JSX.Element {
  const isDisabled = disabled || loading;
  const borderRadius = shape === 'pill' ? radius.pill : radius.md;

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole="button"
      accessibilityState={{busy: loading, disabled: isDisabled}}
      disabled={isDisabled}
      onPress={onPress}
      style={({pressed}) => [
        styles.button,
        {borderRadius},
        isDisabled && styles.disabled,
        pressed && styles.pressed,
        style,
      ]}
    >
      <Svg height="100%" pointerEvents="none" style={styles.gradient} width="100%">
        <Defs>
          <LinearGradient id="buttonGradient" x1="0" x2="0" y1="0" y2="1">
            <Stop offset="0" stopColor={colors.action.authGoldLight} />
            <Stop offset="0.52" stopColor={colors.action.goldSoft} />
            <Stop offset="1" stopColor={colors.action.authGold} />
          </LinearGradient>
        </Defs>
        <Rect fill="url(#buttonGradient)" height="100%" width="100%" />
      </Svg>
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator color={colors.text.inverse} size="small" />
        ) : (
          <>
            {leftIcon}
            <AppText style={styles.label} weight="semibold">
              {label}
            </AppText>
            {rightIcon}
          </>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 54,
    justifyContent: 'center',
    overflow: 'hidden',
    width: '100%',
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  disabled: {opacity: 0.45},
  gradient: {bottom: 0, left: 0, position: 'absolute', right: 0, top: 0},
  label: {color: colors.text.inverse},
  pressed: {opacity: 0.82},
});
