import React, {useEffect, useRef, useState} from 'react';
import {Animated, Easing, Image, LayoutChangeEvent, StyleSheet, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';

import {colors} from '../../../theme';
import type {RootStackParamList} from '../../../types/navigation';
import {INTRO_DURATION_MS, isUserAuthenticated, shouldShowOnboarding} from '../utils/bootstrap';

const introHero = require('../../../assets/images/intro-hero.png');
const GLOW_SIZE = 18;

type Props = NativeStackScreenProps<RootStackParamList, 'Intro'>;

export function IntroScreen({navigation}: Props): React.JSX.Element {
  const progress = useRef(new Animated.Value(0)).current;
  const animation = useRef<Animated.CompositeAnimation | null>(null);
  const [trackWidth, setTrackWidth] = useState(0);

  useEffect(() => {
    animation.current = Animated.loop(
      Animated.sequence([
        Animated.timing(progress, {
          toValue: 1,
          duration: 1600,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.delay(220),
        Animated.timing(progress, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.current.start();

    const timer = setTimeout(async () => {
      if (await shouldShowOnboarding()) {
        navigation.replace('Onboarding');
        return;
      }
      navigation.replace((await isUserAuthenticated()) ? 'Main' : 'Login');
    }, INTRO_DURATION_MS);

    return () => {
      clearTimeout(timer);
      animation.current?.stop();
    };
  }, [navigation, progress]);

  const handleTrackLayout = (event: LayoutChangeEvent) => {
    setTrackWidth(event.nativeEvent.layout.width);
  };

  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [-GLOW_SIZE, Math.max(trackWidth - GLOW_SIZE, 0)],
  });

  return (
    <SafeAreaView style={styles.container}>
      <Image source={introHero} resizeMode="contain" style={styles.hero} />
      <View
        accessibilityLabel="Đang tải ứng dụng"
        accessibilityRole="progressbar"
        onLayout={handleTrackLayout}
        style={styles.track}
      >
        <Animated.View style={[styles.glow, {transform: [{translateX}]}]} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.background.black,
    justifyContent: 'center',
  },
  hero: {
    height: '100%',
    width: '100%',
  },
  track: {
    backgroundColor: colors.action.goldTrack,
    borderRadius: 2,
    bottom: 80,
    height: 2,
    overflow: 'visible',
    position: 'absolute',
    width: '64%',
  },
  glow: {
    backgroundColor: colors.action.goldSoft,
    borderRadius: GLOW_SIZE / 2,
    height: 4,
    shadowColor: colors.action.gold,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 7,
    top: -1,
    width: GLOW_SIZE,
  },
});
