import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import { turfData } from '../data/turfData';
import Button from '../components/Button';
import HeartIcon from '../components/HeartIcon';
import ShareIcon from '../components/ShareIcon';
import { ParkingIcon, WaterIcon, BallIcon, LightIcon } from '../components/FacilityIcons';

const { width } = Dimensions.get('window');

const TurfDetailsScreen = ({ navigation }) => {
  const turf = turfData;
  const [activeTab, setActiveTab] = useState('about');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [timingsExpanded, setTimingsExpanded] = useState(false);
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedTime, setSelectedTime] = useState('06:00 PM - 07:00 PM');
  const flatListRef = useRef(null);

  const timingsData = {
    Monday: '06:00 PM - 07:00 PM',
    Tuesday: '06:00 PM - 07:00 PM',
    Wednesday: '06:00 PM - 07:00 PM',
    Thursday: '06:00 PM - 07:00 PM',
    Friday: '06:00 PM - 07:00 PM',
    Saturday: '06:00 AM - 11:00 PM',
    Sunday: '06:00 AM - 11:00 PM',
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(Math.floor(rating));
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const toggleTimings = () => {
    setTimingsExpanded(!timingsExpanded);
  };

  const selectTiming = (day) => {
    setSelectedDay(day);
    setSelectedTime(timingsData[day]);
    setTimingsExpanded(false);
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveImageIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.bannerContainer}>
          <FlatList
            ref={flatListRef}
            data={turf.images}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Image source={item} style={styles.banner} />
            )}
          />
          <View style={styles.bannerOverlay}>
            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <View style={styles.rightIcons}>
              <TouchableOpacity style={styles.iconButton} onPress={toggleWishlist}>
                <HeartIcon filled={isWishlisted} size={28} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <ShareIcon size={28} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.indicatorContainer}>
            {turf.images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  activeImageIndex === index && styles.indicatorActive,
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.titleRatingRow}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{turf.name}</Text>
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedText}>✓</Text>
              </View>
            </View>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingNumber}>{turf.rating}</Text>
              <Text style={styles.ratingStar}>⭐</Text>
              <Text style={styles.ratingDivider}>|</Text>
              <Text style={styles.ratingCount}>{turf.reviews} Ratings</Text>
            </View>
          </View>

          <View style={styles.addressSection}>
            <Text style={styles.locationIcon}>📍</Text>
            <Text style={styles.address}>{turf.address}</Text>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.directionButton}>
              <Text style={styles.directionButtonText}>Get Direction →</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.callButton}>
              <Text style={styles.callIcon}>📞</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'about' && styles.tabActive]}
              onPress={() => setActiveTab('about')}
            >
              <Text style={[styles.tabText, activeTab === 'about' && styles.tabTextActive]}>
                About
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'policies' && styles.tabActive]}
              onPress={() => setActiveTab('policies')}
            >
              <Text style={[styles.tabText, activeTab === 'policies' && styles.tabTextActive]}>
                Policies
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About 'Xciteplay Club</Text>
            <Text style={styles.aboutText}>
              {turf.about}{' '}
              <Text style={styles.readMore}>read more</Text>
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Timings Information</Text>
            <TouchableOpacity style={styles.timingRow} onPress={toggleTimings}>
              <Text style={styles.timingDay}>{selectedDay}</Text>
              <Text style={styles.timingHours}>{selectedTime}</Text>
              <Text style={styles.timingIcon}>{timingsExpanded ? '⌃' : '⌄'}</Text>
            </TouchableOpacity>
            {timingsExpanded && (
              <View style={styles.timingsList}>
                {Object.keys(timingsData).map((day) => (
                  <TouchableOpacity
                    key={day}
                    style={[
                      styles.timingItem,
                      selectedDay === day && styles.timingItemSelected,
                    ]}
                    onPress={() => selectTiming(day)}
                  >
                    <Text style={[
                      styles.timingDayText,
                      selectedDay === day && styles.timingDayTextSelected,
                    ]}>
                      {day}
                    </Text>
                    <Text style={[
                      styles.timingHoursText,
                      selectedDay === day && styles.timingHoursTextSelected,
                    ]}>
                      {timingsData[day]}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <View style={styles.divider} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Facilities</Text>
            <View style={styles.facilitiesGrid}>
              <View style={styles.facilityItem}>
                <ParkingIcon size={20} color="#1a1a1a" />
                <Text style={styles.facilityText}>Parking</Text>
              </View>
              <View style={styles.facilityItem}>
                <WaterIcon size={20} color="#1a1a1a" />
                <Text style={styles.facilityText}>Water</Text>
              </View>
              <View style={styles.facilityItem}>
                <BallIcon size={20} color="#1a1a1a" />
                <Text style={styles.facilityText}>Ball</Text>
              </View>
              <View style={styles.facilityItem}>
                <LightIcon size={20} color="#1a1a1a" />
                <Text style={styles.facilityText}>Night Light</Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Available Sports & Types</Text>
            <View style={styles.sportsRow}>
              <TouchableOpacity style={styles.sportChipActive}>
                <Text style={styles.sportIcon}>⚽</Text>
                <Text style={styles.sportTextActive}>Foot Ball</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sportChip}>
                <Text style={styles.sportIcon}>🏏</Text>
                <Text style={styles.sportText}>Cricket</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sportChip}>
                <Text style={styles.sportIcon}>🎾</Text>
                <Text style={styles.sportText}>Pickle Ball</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.turfImageContainer}>
              <Image
                source={require('../../assets/preview.png')}
                style={styles.turfFieldImage}
                resizeMode="contain"
              />
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Offers</Text>
            <View style={styles.offerCard}>
              <View style={styles.offerBadge}>
                <View style={styles.offerCheckIcon}>
                  <Text style={styles.offerCheckText}>✓</Text>
                </View>
                <Text style={styles.offerBadgeText}>FIRSTBOOK</Text>
              </View>
              <Text style={styles.offerDescription}>
                Get a 20% Offer on your first turf booking with Kixar App
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.section}>
            <View style={styles.reviewsHeader}>
              <Text style={styles.sectionTitle}>Ratings & Reviews</Text>
              <View style={styles.ratingsInfo}>
                <View style={styles.ratingBadge}>
                  <Text style={styles.ratingBadgeText}>4.5</Text>
                </View>
                <Text style={styles.ratingsCount}>15 Ratings</Text>
                <Text style={styles.reviewsCount}>10 Reviews</Text>
              </View>
            </View>
            <View style={styles.reviewItem}>
              <View style={styles.reviewHeader}>
                <View style={styles.reviewerInfo}>
                  <View style={styles.reviewerAvatar}>
                    <Text style={styles.avatarText}>S</Text>
                  </View>
                  <View>
                    <View style={styles.reviewerNameRow}>
                      <Text style={styles.reviewName}>Siva</Text>
                      <Text style={styles.reviewRating}>5.0 ⭐</Text>
                    </View>
                    <Text style={styles.reviewDate}>2 days ago • 22 Nov, 2025</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.reviewComment}>
                Hand On The Best And The Easiest Way Of Booking Turfs Just In Seconds And Within Your Hand !
              </Text>
            </View>
            <View style={styles.reviewDivider} />
            <View style={styles.reviewItem}>
              <View style={styles.reviewHeader}>
                <View style={styles.reviewerInfo}>
                  <View style={styles.reviewerAvatar}>
                    <Text style={styles.avatarText}>K</Text>
                  </View>
                  <View>
                    <View style={styles.reviewerNameRow}>
                      <Text style={styles.reviewName}>Kumar</Text>
                      <Text style={styles.reviewRating}>5.0 ⭐</Text>
                    </View>
                    <Text style={styles.reviewDate}>2 days ago • 22 Nov, 2025</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.reviewComment}>
                Hand On The Best And The Easiest Way Of Booking Turfs Just In Seconds And Within Your Hand !
              </Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.seeAllReviews}>See All Reviews</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Map View</Text>
            <Image source={turf.mapPreview} style={styles.mapImage} resizeMode="cover" />
            <TouchableOpacity style={styles.getDirectionButton}>
              <Text style={styles.getDirectionText}>Get Direction →</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.floatingBookingsButton}
        onPress={() => navigation.navigate('MyBookings')}
      >
        <Text style={styles.floatingBookingsIcon}>📋</Text>
        <Text style={styles.floatingBookingsText}>My Bookings</Text>
      </TouchableOpacity>

      <View style={styles.bottomBar}>
        <View style={styles.bottomContent}>
          <View style={styles.offerBanner}>
            <Text style={styles.offerBannerText}>15% OFF ends in 01:50 s</Text>
          </View>
          
          <View style={styles.priceBookRow}>
            <View style={styles.priceSection}>
              <View style={styles.priceRow}>
                <Text style={styles.price}>₹ {turf.pricePerHour}</Text>
                <Text style={styles.priceSubtext}>/ 1 hour</Text>
              </View>
              <Text style={styles.priceLabel}>per player cost in next step</Text>
            </View>
            <TouchableOpacity
              style={styles.bookNowButton}
              onPress={() => navigation.navigate('Booking', { turf })}
            >
              <Text style={styles.bookNowText}>Book Now →</Text>
            </TouchableOpacity>
          </View>
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
  scrollView: {
    flex: 1,
  },
  bannerContainer: {
    position: 'relative',
  },
  banner: {
    width: width,
    height: 280,
    backgroundColor: '#E0E0E0',
  },
  bannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 40,
  },
  iconButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },

  rightIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  indicatorActive: {
    backgroundColor: '#00BFA5',
    width: 24,
  },
  content: {
    padding: 20,
  },
  titleRatingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginRight: 10,
  },
  verifiedBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#00BFA5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  ratingNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginRight: 4,
  },
  ratingStar: {
    fontSize: 16,
    marginRight: 6,
  },
  ratingDivider: {
    fontSize: 14,
    color: '#D0D0D0',
    marginRight: 6,
  },
  ratingCount: {
    fontSize: 13,
    color: '#999',
  },
  addressSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  locationIcon: {
    fontSize: 18,
    marginRight: 8,
    marginTop: 2,
  },
  address: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  directionButton: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
  },
  directionButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  callButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
  },
  callIcon: {
    fontSize: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 12,
  },
  tab: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  tabActive: {
    backgroundColor: '#1a1a1a',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#666',
  },
  tabTextActive: {
    color: '#fff',
  },
  section: {
    marginTop: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 24,
  },
  readMore: {
    color: '#00BFA5',
    fontWeight: '600',
  },
  timingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  timingDay: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
    flex: 1,
  },
  timingHours: {
    fontSize: 14,
    color: '#666',
    flex: 2,
  },
  timingIcon: {
    fontSize: 20,
    color: '#666',
    fontWeight: 'bold',
  },
  timingsList: {
    marginTop: 12,
    gap: 8,
  },
  timingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F8F8F8',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  timingItemSelected: {
    backgroundColor: '#E0F7F4',
    borderColor: '#00BFA5',
  },
  timingDayText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1a1a1a',
  },
  timingDayTextSelected: {
    color: '#00BFA5',
    fontWeight: '600',
  },
  timingHoursText: {
    fontSize: 14,
    color: '#666',
  },
  timingHoursTextSelected: {
    color: '#00BFA5',
  },
  facilitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  facilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    gap: 8,
  },

  facilityText: {
    fontSize: 14,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  sportsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  sportChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#F8F8F8',
    borderRadius: 20,
    gap: 6,
  },
  sportChipActive: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    gap: 6,
  },
  sportIcon: {
    fontSize: 16,
  },
  sportText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  sportTextActive: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  turfImageContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  turfFieldImage: {
    width: '100%',
    height: 180,
  },
  offerCard: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  offerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  offerCheckIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#00BFA5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  offerCheckText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  offerBadgeText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  offerDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ratingBadge: {
    backgroundColor: '#00BFA5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  ratingBadgeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  ratingsCount: {
    fontSize: 13,
    color: '#666',
  },
  reviewsCount: {
    fontSize: 13,
    color: '#666',
  },
  reviewItem: {
    paddingVertical: 16,
  },
  reviewDivider: {
    height: 1,
    backgroundColor: 'transparent',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    borderStyle: 'dashed',
    marginVertical: 8,
  },
  reviewHeader: {
    marginBottom: 12,
  },
  reviewerInfo: {
    flexDirection: 'row',
    gap: 12,
  },
  reviewerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  reviewerNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  reviewName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  reviewRating: {
    fontSize: 13,
    color: '#666',
  },
  reviewDate: {
    fontSize: 12,
    color: '#999',
  },
  reviewComment: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  seeAllReviews: {
    fontSize: 14,
    color: '#00BFA5',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8,
  },
  mapImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  getDirectionButton: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
  },
  getDirectionText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  bottomBar: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  bottomContent: {
    gap: 12,
  },
  offerBanner: {
    backgroundColor: '#D4F4DD',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  offerBannerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00BFA5',
  },
  priceBookRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceSection: {
    flex: 1,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  priceSubtext: {
    fontSize: 16,
    color: '#666',
  },
  priceLabel: {
    fontSize: 13,
    color: '#999',
    marginTop: 4,
  },
  bookNowButton: {
    backgroundColor: '#00BFA5',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 25,
    minWidth: 150,
    alignItems: 'center',
  },
  bookNowText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  floatingBookingsButton: {
    position: 'absolute',
    bottom: 140,
    right: 20,
    backgroundColor: '#00BFA5',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    gap: 8,
  },
  floatingBookingsIcon: {
    fontSize: 20,
  },
  floatingBookingsText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default TurfDetailsScreen;
