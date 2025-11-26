import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TurfDetailsScreen from '../screens/TurfDetailsScreen';
import BookingScreen from '../screens/BookingScreen';
import MyBookingsScreen from '../screens/MyBookingsScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="TurfDetails"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#00BFA5',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="TurfDetails"
          component={TurfDetailsScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Booking"
          component={BookingScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MyBookings"
          component={MyBookingsScreen}
          options={{
            title: 'My Bookings',
            headerStyle: {
              backgroundColor: '#00BFA5',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
