import React from 'react';
import { StatusBar, Platform } from 'react-native';
import { BookingProvider } from './src/context/BookingContext';
import AppNavigator from './src/navigation/AppNavigator';

// Polyfill for Snack compatibility
if (typeof global.HermesInternal === 'undefined') {
  try {
    const { TurboModuleRegistry } = require('react-native');
    if (TurboModuleRegistry && !TurboModuleRegistry.get('PlatformConstants')) {
      TurboModuleRegistry.get = (name) => {
        if (name === 'PlatformConstants') {
          return {
            getConstants: () => ({
              isTesting: false,
              reactNativeVersion: { major: 0, minor: 72, patch: 0 },
              forceTouchAvailable: false,
              osVersion: Platform.Version,
              systemName: Platform.OS,
            }),
          };
        }
        return null;
      };
    }
  } catch (e) {
    // Ignore polyfill errors
  }
}

export default function App() {
  return (
    <BookingProvider>
      <StatusBar barStyle="light-content" backgroundColor="#00BFA5" />
      <AppNavigator />
    </BookingProvider>
  );
}
