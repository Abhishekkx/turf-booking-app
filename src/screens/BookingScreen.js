import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import { timeSlots, courts } from '../data/turfData';
import { useBooking } from '../context/BookingContext';
import Button from '../components/Button';

const BookingScreen = ({ route, navigation }) => {
  const { turf } = route.params;
  const { addBooking } = useBooking();

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [playerCount, setPlayerCount] = useState(5);
  const [showCalendar, setShowCalendar] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0.125);
  const timelineRef = useRef(null);
  const [timelineWidth, setTimelineWidth] = useState(0);
  const [calendarMonth, setCalendarMonth] = useState(0);

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        day: date.getDate(),
        month: date.toLocaleString('default', { month: 'short' }),
        weekday: date.toLocaleString('default', { weekday: 'short' }),
        fullDate: date.toISOString().split('T')[0],
      });
    }
    return dates;
  };

  const generateCalendarDates = () => {
    const dates = [];
    const today = new Date();
    const startDate = new Date(today);
    startDate.setMonth(today.getMonth() + calendarMonth);
    startDate.setDate(1);
    
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1);
    endDate.setDate(0);
    
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      if (currentDate >= today || currentDate.toDateString() === today.toDateString()) {
        dates.push({
          day: currentDate.getDate(),
          month: currentDate.toLocaleString('default', { month: 'short' }),
          monthFull: currentDate.toLocaleString('default', { month: 'long' }),
          year: currentDate.getFullYear(),
          weekday: currentDate.toLocaleString('default', { weekday: 'short' }),
          fullDate: currentDate.toISOString().split('T')[0],
        });
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  const dates = generateDates();
  const calendarDates = generateCalendarDates();
  
  const getCurrentMonthYear = () => {
    const today = new Date();
    const targetDate = new Date(today);
    targetDate.setMonth(today.getMonth() + calendarMonth);
    return `${targetDate.toLocaleString('default', { month: 'long' })} ${targetDate.getFullYear()}`;
  };

  const canGoToPreviousMonth = () => {
    return calendarMonth > 0;
  };

  const canGoToNextMonth = () => {
    return calendarMonth < 11;
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedPeriod('morning');
    setSelectedSlot(null);
    setSliderPosition(0.125);
  };

  const handlePeriodSelect = (period) => {
    setSelectedPeriod(period);
    setSelectedSlot(null);
    const periodPositions = {
      morning: 0.125,
      afternoon: 0.375,
      evening: 0.625,
      night: 0.875,
    };
    setSliderPosition(periodPositions[period] || 0.125);
  };

  const getPeriodFromSliderPosition = (position) => {
    if (position < 0.25) return 'morning';
    if (position < 0.5) return 'afternoon';
    if (position < 0.75) return 'evening';
    return 'night';
  };

  useEffect(() => {
    if (selectedDate) {
      const period = getPeriodFromSliderPosition(sliderPosition);
      setSelectedPeriod(period);
    }
  }, [sliderPosition, selectedDate]);

  const handleSliderMove = (evt) => {
    if (timelineWidth > 0) {
      const locationX = evt.nativeEvent.locationX;
      const newPosition = Math.max(0, Math.min(1, locationX / timelineWidth));
      setSliderPosition(newPosition);
    }
  };

  const handleSlotSelect = (slot) => {
    if (slot.available) {
      setSelectedSlot(slot);
    }
  };

  const handleCourtSelect = (court) => {
    setSelectedCourt(court);
  };

  const incrementPlayers = () => {
    if (playerCount < 22) {
      setPlayerCount(playerCount + 1);
    }
  };

  const decrementPlayers = () => {
    if (playerCount > 1) {
      setPlayerCount(playerCount - 1);
    }
  };

  const calculateTotal = () => {
    return turf.pricePerPlayer * playerCount;
  };

  const isNextEnabled = selectedDate && selectedPeriod && selectedCourt;

  const handleNext = async () => {
    if (!isNextEnabled) return;

    const booking = {
      turfName: turf.name,
      date: selectedDate.fullDate,
      dateDisplay: `${selectedDate.day} ${selectedDate.month}`,
      slot: timeSlots[selectedPeriod]?.timeRange || 'N/A',
      period: selectedPeriod,
      court: selectedCourt.name,
      playerCount,
      pricePerHour: turf.pricePerHour,
      pricePerPlayer: turf.pricePerPlayer,
      totalPrice: calculateTotal(),
    };

    await addBooking(booking);
    
    Alert.alert(
      'Booking Confirmed!',
      `Your booking at ${turf.name} has been confirmed.`,
      [
        {
          text: 'View Bookings',
          onPress: () => navigation.navigate('MyBookings'),
        },
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Modal
        visible={showCalendar}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCalendar(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.calendarModal}>
            <View style={styles.calendarHeader}>
              <TouchableOpacity 
                style={[styles.monthNavButton, !canGoToPreviousMonth() && styles.monthNavButtonDisabled]}
                onPress={() => canGoToPreviousMonth() && setCalendarMonth(calendarMonth - 1)}
                disabled={!canGoToPreviousMonth()}
              >
                <Text style={[styles.monthNavText, !canGoToPreviousMonth() && styles.monthNavTextDisabled]}>←</Text>
              </TouchableOpacity>
              <Text style={styles.calendarTitle}>{getCurrentMonthYear()}</Text>
              <TouchableOpacity 
                style={[styles.monthNavButton, !canGoToNextMonth() && styles.monthNavButtonDisabled]}
                onPress={() => canGoToNextMonth() && setCalendarMonth(calendarMonth + 1)}
                disabled={!canGoToNextMonth()}
              >
                <Text style={[styles.monthNavText, !canGoToNextMonth() && styles.monthNavTextDisabled]}>→</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.calendarScrollView} showsVerticalScrollIndicator={false}>
              <View style={styles.calendarGrid}>
                {calendarDates.map((date, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.calendarDateCard,
                      selectedDate?.fullDate === date.fullDate && styles.calendarDateCardSelected,
                    ]}
                    onPress={() => {
                      handleDateSelect(date);
                      setShowCalendar(false);
                      setCalendarMonth(0);
                    }}
                  >
                    <Text style={[
                      styles.calendarWeekday,
                      selectedDate?.fullDate === date.fullDate && styles.calendarTextSelected,
                    ]}>
                      {date.weekday}
                    </Text>
                    <Text style={[
                      styles.calendarDateNumber,
                      selectedDate?.fullDate === date.fullDate && styles.calendarTextSelected,
                    ]}>
                      {date.day}
                    </Text>
                    <Text style={[
                      styles.calendarMonth,
                      selectedDate?.fullDate === date.fullDate && styles.calendarTextSelected,
                    ]}>
                      {date.month}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
            
            <TouchableOpacity 
              style={styles.closeCalendarButton}
              onPress={() => {
                setShowCalendar(false);
                setCalendarMonth(0);
              }}
            >
              <Text style={styles.closeCalendarText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Xciteplay Club</Text>
        <TouchableOpacity 
          onPress={() => navigation.navigate('MyBookings')}
          style={styles.viewBookingsButton}
        >
          <Text style={styles.viewBookingsIcon}>📋</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Select Date</Text>
              <View style={styles.dateHeaderRight}>
                <Text style={styles.monthLabel}>November 2025</Text>
                <TouchableOpacity 
                  style={styles.expandButton}
                  onPress={() => setShowCalendar(true)}
                >
                  <Text style={styles.expandIcon}>⛶</Text>
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.dateRow}>
                {dates.map((date, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.dateCard,
                      selectedDate?.fullDate === date.fullDate && styles.dateCardSelected,
                    ]}
                    onPress={() => handleDateSelect(date)}
                  >
                    <Text style={[
                      styles.weekday,
                      selectedDate?.fullDate === date.fullDate && styles.textSelected,
                    ]}>
                      {date.weekday}
                    </Text>
                    <Text style={[
                      styles.dateNumber,
                      selectedDate?.fullDate === date.fullDate && styles.textSelected,
                    ]}>
                      {date.day}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Select Time</Text>
              {selectedDate && (
                <Text style={styles.availableText}>
                  {Object.values(timeSlots).reduce((sum, p) => sum + p.availableCount, 0)} slots available for today
                </Text>
              )}
            </View>
            <View style={styles.periodGrid}>
              {Object.entries(timeSlots).map(([key, period]) => (
                <TouchableOpacity
                  key={key}
                  style={[
                    styles.periodCard,
                    selectedPeriod === key && styles.periodCardSelected,
                    !selectedDate && styles.periodCardDisabled,
                  ]}
                  onPress={() => selectedDate && handlePeriodSelect(key)}
                  disabled={!selectedDate}
                >
                  <View style={styles.periodHeader}>
                    <Text style={styles.periodIcon}>{period.icon}</Text>
                    <Text style={[
                      styles.periodLabel,
                      selectedPeriod === key && { color: '#fff' },
                    ]}>
                      {period.label}
                    </Text>
                    <View style={[styles.countBadge, selectedPeriod === key && { backgroundColor: '#fff' }]}>
                      <Text style={styles.countText}>{period.availableCount}</Text>
                    </View>
                  </View>
                  {selectedPeriod === key && (
                    <Text style={styles.periodTime}>{period.timeRange}</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {selectedDate && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Select Time Slot</Text>
              <View style={styles.timelineContainer}>
                <View style={styles.timelineLabels}>
                  <Text style={styles.timelineLabel}>6AM</Text>
                  <Text style={styles.timelineLabel}>12PM</Text>
                  <Text style={styles.timelineLabel}>6PM</Text>
                  <Text style={styles.timelineLabel}>12AM</Text>
                </View>
                <View 
                  ref={timelineRef}
                  style={styles.timelineBar}
                  onLayout={(event) => {
                    const { width } = event.nativeEvent.layout;
                    setTimelineWidth(width);
                  }}
                  onStartShouldSetResponder={() => true}
                  onResponderMove={handleSliderMove}
                >
                  <View 
                    style={[
                      styles.timelineProgress, 
                      { width: `${sliderPosition * 100}%` }
                    ]} 
                  />
                  <View
                    style={[
                      styles.timelineMarker,
                      { left: `${sliderPosition * 100}%` }
                    ]}
                  />
                </View>
                {selectedPeriod && timeSlots[selectedPeriod] && (
                  <View style={styles.periodDisplay}>
                    <Text style={styles.periodDisplayIcon}>{timeSlots[selectedPeriod].icon}</Text>
                    <Text style={styles.periodDisplayText}>
                      {timeSlots[selectedPeriod].label} ({timeSlots[selectedPeriod].timeRange})
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Cricket Court</Text>
            <View style={styles.courtRow}>
              {courts.map((court) => (
                <TouchableOpacity
                  key={court.id}
                  style={[
                    styles.courtCard,
                    selectedCourt?.id === court.id && styles.courtCardSelected,
                  ]}
                  onPress={() => handleCourtSelect(court)}
                >
                  <View style={[
                    styles.courtRadio,
                    selectedCourt?.id === court.id && styles.courtRadioSelected,
                  ]}>
                    {selectedCourt?.id === court.id && <View style={styles.courtRadioDot} />}
                  </View>
                  <Text style={[
                    styles.courtText,
                    selectedCourt?.id === court.id && styles.courtTextSelected,
                  ]}>
                    {court.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Players Count</Text>
            <View style={styles.playerCounter}>
              <TouchableOpacity
                style={styles.counterButton}
                onPress={decrementPlayers}
              >
                <Text style={styles.counterButtonText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.playerCountText}>{playerCount} Players</Text>
              <TouchableOpacity
                style={styles.counterButton}
                onPress={incrementPlayers}
              >
                <Text style={styles.counterButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ height: 120 }} />
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View style={styles.bottomContent}>
          <View style={styles.priceSection}>
            <View style={styles.priceRow}>
              <Text style={styles.price}>₹ {calculateTotal()}</Text>
              <Text style={styles.priceSubtext}>₹{turf.pricePerPlayer} × {playerCount} players</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.breakupLink}>Total for {playerCount} player{playerCount > 1 ? 's' : ''}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.nextButton, !isNextEnabled && styles.nextButtonDisabled]}
            onPress={handleNext}
            disabled={!isNextEnabled}
          >
            <Text style={styles.nextButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 50,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: '#1a1a1a',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    flex: 1,
    textAlign: 'center',
    marginRight: 40,
  },
  headerSpacer: {
    width: 40,
  },
  viewBookingsButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0F7F4',
    borderRadius: 20,
  },
  viewBookingsIcon: {
    fontSize: 20,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
  },
  dateHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  monthLabel: {
    fontSize: 14,
    color: '#00BFA5',
    fontWeight: '500',
  },
  expandButton: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  expandIcon: {
    fontSize: 18,
    color: '#666',
  },
  availableText: {
    fontSize: 12,
    color: '#757575',
  },
  dateRow: {
    flexDirection: 'row',
    gap: 12,
  },
  dateCard: {
    width: 56,
    paddingVertical: 14,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#F0F0F0',
  },
  dateCardSelected: {
    backgroundColor: '#00BFA5',
    borderColor: '#00BFA5',
  },
  weekday: {
    fontSize: 11,
    color: '#999',
    marginBottom: 6,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  dateNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  textSelected: {
    color: '#fff',
  },
  periodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  periodCard: {
    flex: 1,
    minWidth: '45%',
    padding: 14,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#F0F0F0',
  },
  periodCardSelected: {
    backgroundColor: '#1a1a1a',
    borderColor: '#1a1a1a',
  },
  periodCardDisabled: {
    opacity: 0.5,
  },
  periodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  periodIcon: {
    fontSize: 20,
  },
  periodLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
    flex: 1,
  },
  countBadge: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 28,
    alignItems: 'center',
  },
  countText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  periodTime: {
    fontSize: 13,
    color: '#fff',
    marginTop: 8,
    fontWeight: '500',
  },
  timelineContainer: {
    marginTop: 8,
  },
  timelineLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  timelineLabel: {
    fontSize: 11,
    color: '#999',
    fontWeight: '500',
  },
  timelineBar: {
    height: 6,
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
    position: 'relative',
    marginHorizontal: 8,
  },
  timelineProgress: {
    position: 'absolute',
    left: 0,
    height: 6,
    backgroundColor: '#00BFA5',
    borderRadius: 3,
  },
  timelineMarker: {
    position: 'absolute',
    top: -7,
    marginLeft: -10,
    width: 20,
    height: 20,
    backgroundColor: '#00BFA5',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  periodDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    padding: 12,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    gap: 8,
  },
  periodDisplayIcon: {
    fontSize: 20,
  },
  periodDisplayText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  courtRow: {
    flexDirection: 'row',
    gap: 12,
  },
  courtCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#F0F0F0',
  },
  courtCardSelected: {
    backgroundColor: '#E0F7F4',
    borderColor: '#00BFA5',
  },
  courtRadio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#D0D0D0',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  courtRadioSelected: {
    borderColor: '#00BFA5',
  },
  courtRadioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#00BFA5',
  },
  courtText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  courtTextSelected: {
    color: '#00BFA5',
    fontWeight: '700',
  },
  playerCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
  },
  counterButton: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterButtonText: {
    fontSize: 24,
    color: '#00BFA5',
    fontWeight: '600',
  },
  playerCountText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginHorizontal: 32,
  },
  bottomBar: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  bottomContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  priceSection: {
    flex: 1,
  },
  priceRow: {
    marginBottom: 4,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  priceSubtext: {
    fontSize: 13,
    color: '#999',
  },
  breakupLink: {
    fontSize: 13,
    color: '#00BFA5',
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: '#00BFA5',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 25,
    minWidth: 120,
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  calendarModal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '80%',
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  monthNavButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 20,
  },
  monthNavButtonDisabled: {
    opacity: 0.3,
  },
  monthNavText: {
    fontSize: 20,
    color: '#00BFA5',
    fontWeight: 'bold',
  },
  monthNavTextDisabled: {
    color: '#999',
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    flex: 1,
    textAlign: 'center',
  },
  calendarScrollView: {
    maxHeight: 400,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'flex-start',
  },
  calendarDateCard: {
    width: '13%',
    minWidth: 60,
    paddingVertical: 10,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#F0F0F0',
    marginBottom: 8,
  },
  calendarDateCardSelected: {
    backgroundColor: '#00BFA5',
    borderColor: '#00BFA5',
  },
  calendarWeekday: {
    fontSize: 11,
    color: '#999',
    marginBottom: 4,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  calendarDateNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  calendarMonth: {
    fontSize: 11,
    color: '#666',
    fontWeight: '500',
  },
  calendarTextSelected: {
    color: '#fff',
  },
  closeCalendarButton: {
    marginTop: 20,
    backgroundColor: '#00BFA5',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  closeCalendarText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default BookingScreen;
