import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useBooking } from '../context/BookingContext';
import {
  CalendarIcon,
  ClockIcon,
  StadiumIcon,
  UsersIcon,
  CheckCircleIcon,
  TrashIcon,
  EmptyBookingIcon,
  MoneyIcon,
} from '../components/BookingIcons';

const MyBookingsScreen = () => {
  const { bookings, removeBooking, loading } = useBooking();

  const handleDeleteBooking = (bookingId, turfName) => {
    Alert.alert(
      'Cancel Booking',
      `Are you sure you want to cancel your booking at ${turfName}?`,
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: () => removeBooking(bookingId),
        },
      ]
    );
  };

  const renderBookingCard = ({ item }) => (
    <View style={styles.bookingCard}>
      <View style={styles.cardHeader}>
        <View style={styles.headerLeft}>
          <View style={styles.turfIconContainer}>
            <StadiumIcon size={24} color="#00BFA5" />
          </View>
          <Text style={styles.turfName}>{item.turfName}</Text>
        </View>
        <TouchableOpacity
          onPress={() => handleDeleteBooking(item.id, item.turfName)}
          style={styles.deleteButton}
        >
          <TrashIcon size={18} color="#D32F2F" />
        </TouchableOpacity>
      </View>

      <View style={styles.detailsGrid}>
        <View style={styles.detailRow}>
          <View style={styles.detailLabelContainer}>
            <CalendarIcon size={18} color="#00BFA5" />
            <Text style={styles.detailLabel}>Date</Text>
          </View>
          <Text style={styles.detailValue}>{item.dateDisplay}</Text>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailLabelContainer}>
            <ClockIcon size={18} color="#00BFA5" />
            <Text style={styles.detailLabel}>Time</Text>
          </View>
          <Text style={styles.detailValue}>{item.slot}</Text>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailLabelContainer}>
            <StadiumIcon size={18} color="#00BFA5" />
            <Text style={styles.detailLabel}>Court</Text>
          </View>
          <Text style={styles.detailValue}>{item.court}</Text>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailLabelContainer}>
            <UsersIcon size={18} color="#00BFA5" />
            <Text style={styles.detailLabel}>Players</Text>
          </View>
          <Text style={styles.detailValue}>{item.playerCount}</Text>
        </View>
      </View>

      <View style={styles.priceSection}>
        <View style={styles.priceLabelContainer}>
          <MoneyIcon size={20} color="#2E7D32" />
          <Text style={styles.priceLabel}>Total Amount</Text>
        </View>
        <Text style={styles.priceValue}>₹{item.totalPrice}/hour</Text>
      </View>

      <View style={styles.statusBadge}>
        <CheckCircleIcon size={16} color="#4CAF50" />
        <Text style={styles.statusText}>Confirmed</Text>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <EmptyBookingIcon size={100} color="#BDBDBD" />
      <Text style={styles.emptyTitle}>No Bookings Yet</Text>
      <Text style={styles.emptyText}>
        Your bookings will appear here once you make a reservation.
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={bookings}
        renderItem={renderBookingCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.listContent,
          bookings.length === 0 && styles.emptyListContent,
        ]}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 16,
  },
  emptyListContent: {
    flex: 1,
    justifyContent: 'center',
  },
  bookingCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  turfIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#E0F7F4',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  turfName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    flex: 1,
  },
  deleteButton: {
    width: 36,
    height: 36,
    backgroundColor: '#FFEBEE',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsGrid: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  detailLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#757575',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212121',
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },
  priceLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: '#2E7D32',
    fontWeight: '600',
  },
  priceValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1B5E20',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2E7D32',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default MyBookingsScreen;
