import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BookingContext = createContext();

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within BookingProvider');
  }
  return context;
};

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const stored = await AsyncStorage.getItem('bookings');
      if (stored) {
        setBookings(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveBookings = async (newBookings) => {
    try {
      await AsyncStorage.setItem('bookings', JSON.stringify(newBookings));
    } catch (error) {
      console.error('Error saving bookings:', error);
    }
  };

  const addBooking = async (booking) => {
    const newBooking = {
      ...booking,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    await saveBookings(updatedBookings);
    return newBooking;
  };

  const removeBooking = async (bookingId) => {
    const updatedBookings = bookings.filter(b => b.id !== bookingId);
    setBookings(updatedBookings);
    await saveBookings(updatedBookings);
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        addBooking,
        removeBooking,
        loading
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
