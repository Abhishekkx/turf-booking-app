import React from 'react';
import { StatusBar } from 'react-native';
import { BookingProvider } from './src/context/BookingContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <BookingProvider>
      <StatusBar barStyle="light-content" backgroundColor="#00BFA5" />
      <AppNavigator />
    </BookingProvider>
  );
}
