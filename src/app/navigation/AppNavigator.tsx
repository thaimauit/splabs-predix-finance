import React from 'react';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {colors} from '../../theme';
import {LoginScreen} from '../../features/auth/screens/LoginScreen';
import {EmailAuthScreen} from '../../features/auth/screens/EmailAuthScreen';
import {IntroScreen} from '../../features/onboarding/screens/IntroScreen';
import {OnboardingScreen} from '../../features/onboarding/screens/OnboardingScreen';
import type {RootStackParamList} from '../../types/navigation';
import {MainTabs} from './MainTabs';

const Stack = createNativeStackNavigator<RootStackParamList>();
const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.action.primary,
    background: colors.background.primary,
    card: colors.background.primary,
    text: colors.text.primary,
    border: colors.border.subtle,
  },
};

export function AppNavigator(): React.JSX.Element {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Intro" component={IntroScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="EmailAuth" component={EmailAuthScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
