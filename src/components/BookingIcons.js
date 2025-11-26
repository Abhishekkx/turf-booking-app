import React from 'react';
import Svg, { Path, Circle, Rect, G } from 'react-native-svg';

export const CalendarIcon = ({ size = 20, color = '#00BFA5' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="6" width="18" height="15" rx="2" stroke={color} strokeWidth="2" fill="none" />
    <Path d="M3 10h18" stroke={color} strokeWidth="2" />
    <Path d="M8 3v4M16 3v4" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

export const ClockIcon = ({ size = 20, color = '#00BFA5' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" fill="none" />
    <Path d="M12 7v5l3 3" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

export const StadiumIcon = ({ size = 20, color = '#00BFA5' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path 
      d="M3 10c0-2 2-3 4-3h10c2 0 4 1 4 3v6c0 2-2 3-4 3H7c-2 0-4-1-4-3v-6z" 
      stroke={color} 
      strokeWidth="2" 
      fill="none" 
    />
    <Path d="M7 7V5M17 7V5M12 7V4" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M3 13h18" stroke={color} strokeWidth="2" />
  </Svg>
);

export const UsersIcon = ({ size = 20, color = '#00BFA5' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="9" cy="7" r="3" stroke={color} strokeWidth="2" fill="none" />
    <Path 
      d="M3 21v-2c0-2.21 1.79-4 4-4h4c2.21 0 4 1.79 4 4v2" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round"
      fill="none"
    />
    <Circle cx="17" cy="7" r="2" stroke={color} strokeWidth="2" fill="none" />
    <Path 
      d="M21 21v-1.5c0-1.66-1.34-3-3-3h-1" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round"
      fill="none"
    />
  </Svg>
);

export const CheckCircleIcon = ({ size = 20, color = '#4CAF50' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" fill={color} />
    <Path 
      d="M8 12l2.5 2.5L16 9" 
      stroke="#fff" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </Svg>
);

export const TrashIcon = ({ size = 20, color = '#D32F2F' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path 
      d="M3 6h18M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    <Path d="M10 11v6M14 11v6" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

export const EmptyBookingIcon = ({ size = 80, color = '#BDBDBD' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="6" width="18" height="15" rx="2" stroke={color} strokeWidth="1.5" fill="none" />
    <Path d="M3 10h18" stroke={color} strokeWidth="1.5" />
    <Path d="M8 3v4M16 3v4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <Circle cx="12" cy="15" r="3" stroke={color} strokeWidth="1.5" fill="none" />
    <Path d="M12 14v2M12 18h.01" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </Svg>
);

export const MoneyIcon = ({ size = 20, color = '#2E7D32' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" fill="none" />
    <Path 
      d="M12 6v1m0 10v1m0-9c-1.66 0-3 1.12-3 2.5S10.34 14 12 14s3-1.12 3-2.5S13.66 9 12 9z" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round"
    />
  </Svg>
);
