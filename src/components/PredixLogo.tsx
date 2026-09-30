import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

const predixLogo = require('../assets/images/predix-logo.png');
const LOGO_ASPECT_RATIO = 5.1;

type Props = {
  height?: number;
  width?: number;
};

export function PredixLogo({height, width = 88}: Props): React.JSX.Element {
  const resolvedHeight = height ?? width / LOGO_ASPECT_RATIO;

  return (
    <View style={[styles.frame, {height: resolvedHeight, width}]}>
      <Image
        accessibilityLabel="Predix"
        accessibilityRole="image"
        resizeMode="cover"
        source={predixLogo}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {overflow: 'hidden'},
  image: {height: '100%', width: '100%'},
});
