export const turfData = {
  id: 1,
  name: "Xciteplay Club",
  rating: 4.5,
  reviews: 128,
  address: "516/A, Katol Rd, KT Nagar, Nagpur, Maharashtra 440013",
  phone: "+91 98765 43210",
  pricePerHour: 1200,
  pricePerPlayer: 240,
  images: [
    require('../../assets/image - turf.png'),
    require('../../assets/image - turf2.png'),
  ],
  mapPreview: require('../../assets/image - location.png'),
  about: "Premium sports facility with state-of-the-art cricket courts. Perfect for casual games and professional practice sessions. Well-maintained grounds with modern amenities.",
  timings: "6:00 AM - 11:00 PM (All Days)",
  amenities: [
    "Parking",
    "Washroom",
    "Drinking Water",
    "First Aid",
    "Changing Room",
    "Seating Area"
  ],
  sports: ["Cricket", "Football", "Badminton"],
  offers: [
    {
      id: 1,
      title: "Weekend Special",
      description: "Get 20% off on bookings above ₹2000",
      code: "WEEKEND20"
    },
    {
      id: 2,
      title: "Early Bird Offer",
      description: "Book before 8 AM and save 15%",
      code: "EARLY15"
    }
  ],
  reviewsList: [
    {
      id: 1,
      name: "Rahul Sharma",
      rating: 5,
      comment: "Excellent facility! Well maintained courts and friendly staff.",
      date: "2 days ago"
    },
    {
      id: 2,
      name: "Priya Patel",
      rating: 4,
      comment: "Good experience overall. Parking could be better.",
      date: "1 week ago"
    },
    {
      id: 3,
      name: "Amit Kumar",
      rating: 5,
      comment: "Best turf in the city. Highly recommended!",
      date: "2 weeks ago"
    }
  ],
  mapCoordinates: {
    latitude: 19.0760,
    longitude: 72.8777
  }
};

export const timeSlots = {
  morning: {
    label: "Morning",
    icon: "☀️",
    timeRange: "06:00 AM - 12:00 PM",
    slots: [
      { id: 1, time: "06:00 AM", available: true },
      { id: 2, time: "07:00 AM", available: true },
      { id: 3, time: "08:00 AM", available: true },
      { id: 4, time: "09:00 AM", available: false },
      { id: 5, time: "10:00 AM", available: true },
      { id: 6, time: "11:00 AM", available: true }
    ],
    availableCount: 5
  },
  noon: {
    label: "Noon",
    icon: "🌤️",
    timeRange: "12:00 PM - 04:00 PM",
    slots: [
      { id: 7, time: "12:00 PM", available: true },
      { id: 8, time: "01:00 PM", available: true },
      { id: 9, time: "02:00 PM", available: true },
      { id: 10, time: "03:00 PM", available: true }
    ],
    availableCount: 4
  },
  evening: {
    label: "Evening",
    icon: "🌆",
    timeRange: "04:00 PM - 07:00 PM",
    slots: [
      { id: 11, time: "04:00 PM", available: true },
      { id: 12, time: "05:00 PM", available: false },
      { id: 13, time: "06:00 PM", available: true }
    ],
    availableCount: 2
  },
  twilight: {
    label: "Twilight",
    icon: "🌙",
    timeRange: "07:00 PM - 11:00 PM",
    slots: [
      { id: 14, time: "07:00 PM", available: true },
      { id: 15, time: "08:00 PM", available: true },
      { id: 16, time: "09:00 PM", available: true },
      { id: 17, time: "10:00 PM", available: true }
    ],
    availableCount: 4
  }
};

export const courts = [
  { id: "A", name: "Court A", available: true },
  { id: "B", name: "Court B", available: true }
];
