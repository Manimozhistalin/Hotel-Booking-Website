export const mockRooms = [
  // Rooms for hotel h1 - Grand Luxury Resort & Spa
  {
    id: 'r1',
    hotelId: 'h1',
    name: 'Deluxe Ocean View Room',
    description: 'Spacious room with breathtaking ocean views, featuring a king-size bed, luxury linens, and a private balcony.',
    price: 299,
    discount: 10,
    maxOccupancy: 2,
    size: 38,
    bedType: 'King',
    image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
    amenities: ['wifi', 'tv', 'ac', 'minibar', 'safe', 'bathtub']
  },
  {
    id: 'r2',
    hotelId: 'h1',
    name: 'Premium Suite',
    description: 'Luxurious suite with separate living area, two bathrooms, and a wrap-around balcony offering panoramic ocean views.',
    price: 459,
    discount: 0,
    maxOccupancy: 4,
    size: 68,
    bedType: 'King + Sofa Bed',
    image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
    amenities: ['wifi', 'tv', 'ac', 'minibar', 'safe', 'bathtub', 'kitchenette', 'balcony']
  },
  {
    id: 'r3',
    hotelId: 'h1',
    name: 'Garden View Double Room',
    description: 'Comfortable room overlooking the resort gardens with two queen beds, perfect for families or groups.',
    price: 259,
    discount: 15,
    maxOccupancy: 4,
    size: 42,
    bedType: 'Two Queens',
    image: 'https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg',
    amenities: ['wifi', 'tv', 'ac', 'minibar', 'safe']
  },

  // Rooms for hotel h2 - Riverside Boutique Hotel
  {
    id: 'r4',
    hotelId: 'h2',
    name: 'Classic Queen Room',
    description: 'Charming room with a queen bed, featuring custom furnishings and local artwork.',
    price: 189,
    discount: 0,
    maxOccupancy: 2,
    size: 25,
    bedType: 'Queen',
    image: 'https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg',
    amenities: ['wifi', 'tv', 'ac', 'coffee_maker', 'safe']
  },
  {
    id: 'r5',
    hotelId: 'h2',
    name: 'Deluxe King Room',
    description: 'Spacious room with a king bed, sitting area, and large windows with city views.',
    price: 229,
    discount: 0,
    maxOccupancy: 2,
    size: 32,
    bedType: 'King',
    image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
    amenities: ['wifi', 'tv', 'ac', 'coffee_maker', 'safe', 'desk']
  },
  {
    id: 'r6',
    hotelId: 'h2',
    name: 'River View Suite',
    description: 'Elegant suite with separate bedroom and living room, featuring panoramic river views and premium amenities.',
    price: 329,
    discount: 10,
    maxOccupancy: 3,
    size: 48,
    bedType: 'King + Sofa Bed',
    image: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg',
    amenities: ['wifi', 'tv', 'ac', 'coffee_maker', 'safe', 'desk', 'bathtub', 'minibar']
  },

  // Rooms for hotel h3 - Oceanview Paradise Resort
  {
    id: 'r7',
    hotelId: 'h3',
    name: 'Beachfront Bungalow',
    description: 'Private bungalow steps from the beach with a king bed, outdoor shower, and private terrace.',
    price: 429,
    discount: 0,
    maxOccupancy: 2,
    size: 45,
    bedType: 'King',
    image: 'https://images.pexels.com/photos/2869215/pexels-photo-2869215.jpeg',
    amenities: ['wifi', 'tv', 'ac', 'minibar', 'safe', 'outdoor_shower', 'breakfast']
  },
  {
    id: 'r8',
    hotelId: 'h3',
    name: 'Ocean View Room',
    description: 'Bright and airy room with a king bed and private balcony overlooking the ocean.',
    price: 349,
    discount: 5,
    maxOccupancy: 2,
    size: 36,
    bedType: 'King',
    image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
    amenities: ['wifi', 'tv', 'ac', 'minibar', 'safe', 'balcony']
  },
  {
    id: 'r9',
    hotelId: 'h3',
    name: 'Family Suite',
    description: 'Spacious two-bedroom suite with full kitchen, living area, and large balcony with ocean views.',
    price: 559,
    discount: 10,
    maxOccupancy: 6,
    size: 76,
    bedType: 'King + Two Queens',
    image: 'https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg',
    amenities: ['wifi', 'tv', 'ac', 'kitchen', 'safe', 'balcony', 'washer_dryer']
  },

  // Rooms for other hotels follow the same pattern...
  {
    id: 'r10',
    hotelId: 'h4',
    name: 'Standard Suite',
    description: 'Comfortable suite with separate living area, queen bed, and fully equipped kitchen.',
    price: 159,
    discount: 10,
    maxOccupancy: 2,
    size: 42,
    bedType: 'Queen',
    image: 'https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg',
    amenities: ['wifi', 'tv', 'ac', 'kitchen', 'breakfast']
  },
  {
    id: 'r11',
    hotelId: 'h5',
    name: 'Mountain View Room',
    description: 'Cozy room with a king bed, gas fireplace, and balcony offering stunning mountain views.',
    price: 229,
    discount: 0,
    maxOccupancy: 2,
    size: 30,
    bedType: 'King',
    image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
    amenities: ['wifi', 'tv', 'ac', 'fireplace', 'balcony']
  },
  {
    id: 'r12',
    hotelId: 'h6',
    name: 'Historic King Room',
    description: 'Elegant room with period details, featuring a four-poster king bed and antique furnishings.',
    price: 279,
    discount: 12,
    maxOccupancy: 2,
    size: 35,
    bedType: 'King',
    image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg',
    amenities: ['wifi', 'tv', 'ac', 'minibar', 'bathtub']
  }
]