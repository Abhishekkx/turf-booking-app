import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Circle, Rect, G } from 'react-native-svg';

export const ParkingIcon = ({ size = 20, color = '#1a1a1a' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"
      fill={color}
    />
  </Svg>
);

export const WaterIcon = ({ size = 20, color = '#1a1a1a' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const BallIcon = ({ size = 20, color = '#1a1a1a' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
    <Path
      d="M12 2a10 10 0 0 0-6.88 2.77M12 2a10 10 0 0 1 6.88 2.77M2 12h20M12 2v20"
      stroke={color}
      strokeWidth="2"
    />
  </Svg>
);

export const LightIcon = ({ size = 20, color = '#1a1a1a' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="5" fill={color} />
    <Path
      d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);
