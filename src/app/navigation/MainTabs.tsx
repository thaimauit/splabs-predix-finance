import React from 'react';
import {StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {BillingScreen} from '../../features/billing/screens/BillingScreen';
import {ChallengesScreen} from '../../features/challenges/screens/ChallengesScreen';
import {MoreScreen} from '../../features/more/screens/MoreScreen';
import {PayoutsScreen} from '../../features/payouts/screens/PayoutsScreen';
import {Icon, type IconProps} from '../../components';
import {colors, radius} from '../../theme';
import type {MainTabParamList} from '../../types/navigation';

const Tab = createBottomTabNavigator<MainTabParamList>();
const icons: Record<keyof MainTabParamList, IconProps> = {
  Challenges: {family: 'material-icons', name: 'layers'},
  Payouts: {family: 'material-icons', name: 'account-balance-wallet'},
  Trade: {family: 'feather', name: 'sliders'},
  Billing: {family: 'material-icons', name: 'credit-card'},
  More: {family: 'material-icons', name: 'more-horiz'},
};
const Empty = (): React.JSX.Element => <View />;

export function MainTabs(): React.JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.text.primary,
        tabBarInactiveTintColor: colors.text.tertiary,
        tabBarStyle: styles.bar,
        tabBarLabelStyle: styles.label,
        tabBarIcon: ({color}) => {
          const tabIcon = icons[route.name];
          return route.name === 'Trade' ? (
            <View style={styles.trade}>
              <Icon {...tabIcon} color={colors.text.inverse} size={27} />
            </View>
          ) : (
            <Icon {...tabIcon} color={color} size={25} />
          );
        },
      })}
    >
      <Tab.Screen name="Challenges" component={ChallengesScreen} />
      <Tab.Screen name="Payouts" component={PayoutsScreen} />
      <Tab.Screen
        name="Trade"
        component={Empty}
        options={{tabBarLabel: 'Trade'}}
        listeners={{tabPress: event => event.preventDefault()}}
      />
      <Tab.Screen name="Billing" component={BillingScreen} />
      <Tab.Screen name="More" component={MoreScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: colors.background.navigation,
    borderTopColor: colors.border.divider,
    height: 76,
    paddingTop: 7,
  },
  label: {fontSize: 10, fontWeight: '700', paddingBottom: 7},
  trade: {
    backgroundColor: colors.action.gold,
    borderRadius: radius.pill,
    width: 58,
    height: 58,
    marginTop: -28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 6,
    borderColor: colors.background.navigation,
  },
});
