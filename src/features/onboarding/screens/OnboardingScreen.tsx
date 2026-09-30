import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  Animated,
  Easing,
  Image,
  type ImageSourcePropType,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';

import {AppText, GradientButton, PredixLogo} from '../../../components';
import {colors, spacing, typography} from '../../../theme';
import type {RootStackParamList} from '../../../types/navigation';
import {onboardingStore} from '../services/onboardingStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;
type Step = {
  artwork: ImageSourcePropType;
  body: string;
  eyebrow: string;
  title: string;
};

const steps: readonly Step[] = [
  {
    artwork: require('../../../assets/images/onboarding-step-1.gif'),
    body: 'Prove your edge in one evaluation and get a funded account. Fixed drawdown. No time limit.',
    eyebrow: 'PREDIX FINANCE',
    title: 'Trade our capital.\nKeep up to 95%.',
  },
  {
    artwork: require('../../../assets/images/onboarding-step-2.png'),
    body: 'Your loss floor is measured on the starting balance and never lifts as you gain. Breach is assessed at the 00:00 UTC snapshot.',
    eyebrow: 'FIXED DRAWDOWN',
    title: 'The floor never moves\nagainst you.',
  },
  {
    artwork: require('../../../assets/images/onboarding-step-3.png'),
    body: 'Start at 80% and climb with every successful payout. A level is never lost unless you break a rule.',
    eyebrow: 'PROFIT SPLIT',
    title: 'The steadier you trade,\nthe more you keep.',
  },
  {
    artwork: require('../../../assets/images/onboarding-step-4.png'),
    body: 'Buy a challenge, hit your target, get funded. Payouts settle in USDC on-chain, under 24 hours.',
    eyebrow: 'FROM SIGN-UP TO PAYOUT',
    title: 'Three steps.\nNo middle men.',
  },
];

const payoutSteps = [
  ['01', 'Pick a plan & add-ons', 'Sprint, Classic, Instant or Trial'],
  ['02', 'Pass the evaluation', 'Trade under fixed-risk rules'],
  ['03', 'Get funded & paid', 'USDC payout, under 24h'],
] as const;

function StepOneTags(): React.JSX.Element {
  return (
    <View style={styles.tags}>
      <View style={[styles.tag, styles.goldTag]}>
        <Text style={[styles.tagLabel, styles.goldTagLabel]}>Fixed Drawdown</Text>
      </View>
      <View style={[styles.tag, styles.purpleTag]}>
        <Text style={[styles.tagLabel, styles.purpleTagLabel]}>No Time Limit</Text>
      </View>
      <View style={[styles.tag, styles.greenTag]}>
        <Text style={[styles.tagLabel, styles.greenTagLabel]}>Instant Funding</Text>
      </View>
    </View>
  );
}

function PayoutProcess(): React.JSX.Element {
  return (
    <View style={styles.process}>
      <View style={styles.processHeading}>
        <Text style={styles.processLabel}>FROM SIGN-UP TO PAYOUT</Text>
        <Text style={styles.networkBadge}>● USDT · BSC</Text>
      </View>
      {payoutSteps.map(([number, title, detail]) => (
        <View key={number} style={styles.processCard}>
          <View style={styles.processNumber}>
            <Text style={styles.processNumberLabel}>{number}</Text>
          </View>
          <View style={styles.processCopy}>
            <Text style={styles.processTitle}>{title}</Text>
            <Text style={styles.processDetail}>{detail}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

export function OnboardingScreen({navigation}: Props): React.JSX.Element {
  const [activeStep, setActiveStep] = useState(0);
  const {height: screenHeight, width: screenWidth} = useWindowDimensions();
  const responsiveStyles = useMemo(
    () => createResponsiveStyles(screenWidth, screenHeight),
    [screenHeight, screenWidth],
  );
  const pagePosition = useRef(new Animated.Value(0)).current;
  const isAnimating = useRef(false);
  const step = steps[activeStep];

  const finish = async () => {
    await onboardingStore.markComplete();
    navigation.replace('Login');
  };
  const turnPage = useCallback(
    (direction: 'next' | 'previous') => {
      if (isAnimating.current) {
        return;
      }
      const nextStep = direction === 'next' ? activeStep + 1 : activeStep - 1;
      if (nextStep < 0 || nextStep >= steps.length) {
        Animated.spring(pagePosition, {toValue: 0, useNativeDriver: true}).start();
        return;
      }
      isAnimating.current = true;
      const exitPosition = direction === 'next' ? -screenWidth : screenWidth;
      Animated.timing(pagePosition, {
        duration: 220,
        easing: Easing.in(Easing.cubic),
        toValue: exitPosition,
        useNativeDriver: true,
      }).start(() => {
        setActiveStep(nextStep);
        pagePosition.setValue(-exitPosition);
        Animated.timing(pagePosition, {
          duration: 260,
          easing: Easing.out(Easing.cubic),
          toValue: 0,
          useNativeDriver: true,
        }).start(() => {
          isAnimating.current = false;
        });
      });
    },
    [activeStep, pagePosition, screenWidth],
  );

  const advance = () => {
    if (activeStep === steps.length - 1) {
      finish();
    } else {
      turnPage('next');
    }
  };

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gesture) =>
          Math.abs(gesture.dx) > 8 && Math.abs(gesture.dx) > Math.abs(gesture.dy),
        onPanResponderMove: (_, gesture) => {
          const isBlockedAtFirst = activeStep === 0 && gesture.dx > 0;
          const isBlockedAtLast = activeStep === steps.length - 1 && gesture.dx < 0;
          pagePosition.setValue(
            isBlockedAtFirst || isBlockedAtLast ? gesture.dx * 0.08 : gesture.dx,
          );
        },
        onPanResponderRelease: (_, gesture) => {
          const threshold = screenWidth * 0.2;
          if (gesture.dx < -threshold && activeStep < steps.length - 1) {
            turnPage('next');
          } else if (gesture.dx > threshold && activeStep > 0) {
            turnPage('previous');
          } else {
            Animated.spring(pagePosition, {
              damping: 18,
              stiffness: 180,
              toValue: 0,
              useNativeDriver: true,
            }).start();
          }
        },
        onPanResponderTerminate: () => {
          Animated.spring(pagePosition, {toValue: 0, useNativeDriver: true}).start();
        },
      }),
    [activeStep, pagePosition, screenWidth, turnPage],
  );

  const pageRotation = pagePosition.interpolate({
    inputRange: [-screenWidth, 0, screenWidth],
    outputRange: ['-78deg', '0deg', '78deg'],
  });
  const pageOpacity = pagePosition.interpolate({
    inputRange: [-screenWidth, 0, screenWidth],
    outputRange: [0.15, 1, 0.15],
  });
  const imageStyle =
    activeStep === 2
      ? responsiveStyles.stepThreeArtwork
      : activeStep === 3
      ? responsiveStyles.stepFourArtwork
      : responsiveStyles.squareArtwork;

  return (
    <SafeAreaView edges={['top', 'bottom']} style={[styles.container, responsiveStyles.container]}>
      <View style={styles.header}>
        <PredixLogo width={58} />
        <Pressable accessibilityRole="button" hitSlop={12} onPress={finish}>
          <Text style={styles.skip}>Skip</Text>
        </Pressable>
      </View>

      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.page,
          responsiveStyles.page,
          {opacity: pageOpacity, transform: [{perspective: 900}, {rotateY: pageRotation}]},
        ]}
      >
        {activeStep >= 2 ? (
          <View
            pointerEvents="none"
            style={[
              styles.squareArtworkBackground,
              responsiveStyles.squareArtworkBackground,
              activeStep === 3 && responsiveStyles.stepFourArtworkBackground,
            ]}
          >
            <Image resizeMode="contain" source={step.artwork} style={imageStyle} />
          </View>
        ) : (
          <View
            pointerEvents="none"
            style={[
              styles.artworkBackground,
              responsiveStyles.artworkBackground,
              activeStep === 1 && responsiveStyles.fullScreenArtworkBackground,
            ]}
          >
            <Image
              resizeMode={activeStep === 1 ? 'cover' : 'contain'}
              source={step.artwork}
              style={[
                styles.artwork,
                activeStep === 1 ? responsiveStyles.fullScreenArtwork : imageStyle,
              ]}
            />
          </View>
        )}
        {activeStep === 3 && (
          <View style={responsiveStyles.contentInset}>
            <PayoutProcess />
          </View>
        )}
        <View
          style={[
            styles.content,
            responsiveStyles.content,
            activeStep === 3 && responsiveStyles.finalContent,
          ]}
        >
          {activeStep !== 3 && <Text style={styles.eyebrow}>● {step.eyebrow}</Text>}
          {activeStep === 0 ? (
            <Text style={[styles.title, responsiveStyles.title]}>
              Trade our capital.\nKeep up to <Text style={styles.titleAccent}>95%.</Text>
            </Text>
          ) : (
            <Text style={[styles.title, responsiveStyles.title]}>{step.title}</Text>
          )}
          <Text style={[styles.body, responsiveStyles.body]}>{step.body}</Text>
          {activeStep === 0 && <StepOneTags />}
        </View>
      </Animated.View>

      <View style={styles.pagination}>
        {steps.map((_, index) => (
          <View key={index} style={[styles.dot, index === activeStep && styles.activeDot]} />
        ))}
      </View>
      <GradientButton
        label={activeStep === steps.length - 1 ? 'Get started' : 'Next'}
        onPress={advance}
        rightIcon={<AppText style={styles.buttonIcon}>→</AppText>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {backgroundColor: colors.background.black, flex: 1},
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 34,
  },
  skip: {color: colors.text.muted, fontSize: 13},
  page: {flex: 1},
  artworkBackground: {
    alignItems: 'center',
    overflow: 'hidden',
    position: 'absolute',
    zIndex: 0,
  },
  squareArtworkBackground: {
    alignItems: 'center',
    aspectRatio: 1,
    position: 'absolute',
    top: 0,
    zIndex: 0,
  },
  artwork: {alignSelf: 'center'},
  content: {
    bottom: 0,
    justifyContent: 'flex-start',
    left: 0,
    position: 'absolute',
    right: 0,
    zIndex: 1,
  },
  eyebrow: {
    color: colors.action.gold,
    fontFamily: typography.family.mono,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.6,
    marginBottom: spacing.md,
  },
  title: {color: colors.text.primary, fontWeight: '700', marginBottom: spacing.md},
  titleAccent: {color: colors.action.gold},
  body: {color: colors.text.secondary},
  buttonIcon: {color: colors.text.inverse, fontSize: 17},
  tags: {flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginTop: spacing.md},
  tag: {borderRadius: 12, borderWidth: 1, paddingHorizontal: 11, paddingVertical: 5},
  tagLabel: {fontFamily: typography.family.mono, fontSize: 9},
  goldTag: {backgroundColor: colors.action.primaryMuted, borderColor: colors.border.accent},
  goldTagLabel: {color: colors.action.primaryLight},
  purpleTag: {backgroundColor: colors.status.purpleMuted, borderColor: colors.status.purple},
  purpleTagLabel: {color: colors.status.purple},
  greenTag: {backgroundColor: colors.status.successMuted, borderColor: colors.status.success},
  greenTagLabel: {color: colors.status.success},
  process: {gap: 8, marginTop: 12, zIndex: 1},
  processHeading: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  processLabel: {
    color: colors.text.secondary,
    fontFamily: typography.family.mono,
    fontSize: 8,
    letterSpacing: 1.5,
  },
  networkBadge: {
    backgroundColor: colors.status.successMuted,
    borderColor: colors.status.success,
    borderRadius: 5,
    borderWidth: 1,
    color: colors.status.success,
    fontFamily: typography.family.mono,
    fontSize: 7,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  processCard: {
    alignItems: 'center',
    borderColor: colors.border.onboarding,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    minHeight: 45,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  processNumber: {
    alignItems: 'center',
    backgroundColor: colors.action.primaryMuted,
    borderColor: colors.action.primary,
    borderRadius: 8,
    borderWidth: 1,
    height: 35,
    justifyContent: 'center',
    width: 35,
  },
  processNumberLabel: {
    color: colors.action.gold,
    fontFamily: typography.family.mono,
    fontSize: 9,
  },
  processCopy: {flex: 1, marginLeft: 13},
  processTitle: {color: colors.text.primary, fontSize: 12, fontWeight: '700'},
  processDetail: {color: colors.text.secondary, fontSize: 9, marginTop: 3},
  pagination: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  dot: {backgroundColor: colors.border.default, borderRadius: 3, height: 5, width: 5},
  activeDot: {backgroundColor: colors.action.gold, width: 22},
});

function createResponsiveStyles(screenWidth: number, screenHeight: number) {
  const compact = screenHeight < 720;
  const horizontalPadding = Math.max(spacing.lg, (screenWidth - 430) / 2);
  return StyleSheet.create({
    container: {
      paddingBottom: compact ? spacing.md : spacing.xl,
      paddingHorizontal: horizontalPadding,
    },
    page: {
      marginLeft: -horizontalPadding,
      width: screenWidth,
    },
    contentInset: {
      paddingHorizontal: horizontalPadding,
    },
    artworkBackground: {
      height: compact ? screenHeight * 0.4 : screenHeight * 0.48,
      left: 0,
      top: 0,
      width: screenWidth,
    },
    fullScreenArtworkBackground: {
      height: screenHeight,
      top: -34,
    },
    squareArtworkBackground: {
      left: 0,
      width: screenWidth,
    },
    stepFourArtworkBackground: {
      top: compact ? screenHeight * 0.08 : screenHeight * 0.13,
    },
    squareArtwork: {height: '100%', width: screenWidth},
    stepThreeArtwork: {height: '100%', width: '100%'},
    stepFourArtwork: {height: '100%', width: '100%'},
    fullScreenArtwork: {height: screenHeight, width: screenWidth},
    content: {
      minHeight: compact ? 155 : 184,
      paddingHorizontal: horizontalPadding,
    },
    finalContent: {minHeight: compact ? 125 : 145},
    title: {fontSize: compact ? 23 : 27, lineHeight: compact ? 28 : 33},
    body: {fontSize: compact ? 12 : typography.size.body, lineHeight: compact ? 18 : 21},
  });
}
