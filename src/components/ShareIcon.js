import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';

const ShareIcon = ({ size = 24, color = '#fff' }) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Circle cx="18" cy="5" r="3" stroke={color} strokeWidth="2" fill="none" />
        <Circle cx="18" cy="19" r="3" stroke={color} strokeWidth="2" fill="none" />
        <Circle cx="6" cy="12" r="3" stroke={color} strokeWidth="2" fill="none" />
        <Line x1="8.5" y1="13" x2="15.5" y2="17.5" stroke={color} strokeWidth="2" />
        <Line x1="8.5" y1="11" x2="15.5" y2="6.5" stroke={color} strokeWidth="2" />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ShareIcon;
