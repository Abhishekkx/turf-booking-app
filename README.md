# Turf Booking Application

A production-ready React Native mobile application for booking sports turf facilities, built with Expo.

## Technology Stack

**Frontend Framework**
- React Native with Expo SDK
- React Navigation (Native Stack Navigator)

**State Management**
- React Context API
- AsyncStorage for data persistence

**UI Components**
- Custom SVG icons (react-native-svg)
- Reusable component architecture
- Responsive design patterns

**Development Tools**
- Expo CLI
- Node.js & npm

## Features

**Core Functionality**
- Browse turf facility details with image carousel
- Interactive booking system with date/time selection
- Booking management with persistent storage
- Form validation and user feedback

**User Interface**
- Three main screens: Turf Details, Booking, My Bookings
- Calendar modal with month navigation
- Interactive timeline slider for time selection
- Custom SVG icon components
- Professional styling with consistent design system

**Data Management**
- Context API for global state
- AsyncStorage for offline data persistence
- CRUD operations for bookings

## Installation

```bash
cd turf-booking-app
npm install
```

## Running the Application

```bash
npx expo start
```

Scan the QR code with the Expo Go app (iOS/Android) to run on your device.

## Project Structure

```
turf-booking-app/
├── src/
│   ├── components/       # Reusable UI components
│   ├── context/         # State management
│   ├── data/            # Static data and configurations
│   ├── navigation/      # Navigation setup
│   └── screens/         # Main application screens
├── assets/              # Images and static resources
├── App.js              # Application entry point
└── package.json        # Dependencies and scripts
```

## Key Components

**Screens**
- TurfDetailsScreen: Facility information and booking initiation
- BookingScreen: Date, time, and court selection
- MyBookingsScreen: View and manage bookings

**Context**
- BookingContext: Global booking state management

**Navigation**
- AppNavigator: Stack-based navigation configuration

## Implementation Details

**State Management**
- Centralized booking state using React Context
- Persistent storage with AsyncStorage
- Automatic data loading on app start

**Form Validation**
- Progressive validation for booking form
- Conditional button enabling based on required fields
- User-friendly error handling

**UI/UX**
- Custom SVG icons for consistent branding
- Interactive calendar with month navigation
- Timeline slider for intuitive time selection
- Confirmation dialogs for destructive actions

## Dependencies

```json
{
  "@react-navigation/native": "^6.x",
  "@react-navigation/native-stack": "^6.x",
  "@react-native-async-storage/async-storage": "^1.x",
  "react-native-svg": "^13.x",
  "expo": "~49.x",
  "react": "18.x",
  "react-native": "0.72.x"
}
```

## Development

Built following React Native best practices with:
- Component-based architecture
- Separation of concerns
- Reusable utility functions
- Clean code principles
- Professional error handling
