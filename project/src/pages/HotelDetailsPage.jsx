import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Slider from 'react-slick'
import { FaMapMarkerAlt, FaPhoneAlt, FaGlobe, FaStar, FaSwimmingPool, FaWifi, FaParking, FaCar, FaUtensils, FaCocktail } from 'react-icons/fa'
import Rating from '../components/common/Rating'
import Button from '../components/common/Button'
import RoomList from '../components/hotel/RoomList'
import Loader from '../components/common/Loader'
import { useHotels } from '../hooks/useHotels'
import { mockRooms } from '../data/mockRooms'

const HotelDetailsPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getHotelById, loading, error } = useHotels()
  const [hotel, setHotel] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [rooms, setRooms] = useState([])
  const [loadingRooms, setLoadingRooms] = useState(true)

  useEffect(() => {
    const fetchHotelDetails = async () => {
      const hotelData = await getHotelById(id)
      setHotel(hotelData)
      
      // Simulate API call for rooms
      setTimeout(() => {
        // Filter rooms that belong to this hotel
        const hotelRooms = mockRooms.filter(room => room.hotelId === id)
        setRooms(hotelRooms)
        setLoadingRooms(false)
      }, 800)
    }
    
    fetchHotelDetails()
  }, [id])

  if (loading || !hotel) {
    return (
      <div className="min-h-screen pt-20 bg-neutral-100">
        <div className="container-custom py-10">
          <Loader size="large" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 bg-neutral-100">
        <div className="container-custom py-10">
          <div className="bg-error-50 text-error-700 p-4 rounded-md">
            {error}
          </div>
          <Button
            variant="primary"
            className="mt-4"
            onClick={() => navigate('/search')}
          >
            Back to Search
          </Button>
        </div>
      </div>
    )
  }

  const {
    name,
    description,
    address,
    city,
    rating,
    reviewCount,
    price,
    discount,
    images,
    amenities,
    phone,
    website,
  } = hotel

  // Calculate discounted price
  const discountedPrice = discount 
    ? Math.round(price - (price * discount / 100)) 
    : price

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  }

  // Map amenities to icons
  const amenityIcons = {
    wifi: <FaWifi size={20} />,
    parking: <FaParking size={20} />,
    pool: <FaSwimmingPool size={20} />,
    shuttle: <FaCar size={20} />,
    restaurant: <FaUtensils size={20} />,
    bar: <FaCocktail size={20} />,
  }

  return (
    <div className="bg-neutral-100 min-h-screen pt-20">
      <div className="container-custom py-6">
        {/* Breadcrumbs */}
        <div className="text-sm mb-4">
          <button onClick={() => navigate('/search')} className="text-primary-500 hover:underline">
            Hotels
          </button>
          <span className="mx-2">›</span>
          <span className="text-neutral-600">{city}</span>
          <span className="mx-2">›</span>
          <span className="text-neutral-800">{name}</span>
        </div>

        {/* Hotel Basic Info */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col lg:flex-row justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{name}</h1>
              <div className="flex items-center mb-2">
                <Rating value={rating} />
                <span className="ml-2 text-neutral-600">
                  ({reviewCount} reviews)
                </span>
              </div>
              <div className="flex items-center text-neutral-600 mb-4">
                <FaMapMarkerAlt className="mr-1 text-accent-500" />
                <span>{address}, {city}</span>
              </div>
            </div>
            <div className="mt-4 lg:mt-0">
              <div className="text-right">
                {discount > 0 && (
                  <span className="text-sm text-neutral-500 line-through mr-2">
                    ${price}
                  </span>
                )}
                <span className="text-2xl font-bold text-primary-500">
                  ${discountedPrice}
                </span>
                <span className="text-sm text-neutral-500"> /night</span>
              </div>
              <Button
                variant="accent"
                className="mt-2"
                onClick={() => {
                  document.getElementById('rooms-section').scrollIntoView({ 
                    behavior: 'smooth' 
                  })
                }}
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <Slider {...sliderSettings}>
            {images.map((image, index) => (
              <div key={index} className="h-96">
                <img 
                  src={image} 
                  alt={`${name} - ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </Slider>
        </div>

        {/* Hotel Details Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="border-b border-neutral-200">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-3 text-sm md:text-base font-medium whitespace-nowrap ${
                  activeTab === 'overview'
                    ? 'border-b-2 border-primary-500 text-primary-500'
                    : 'text-neutral-600 hover:text-primary-500'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('amenities')}
                className={`px-6 py-3 text-sm md:text-base font-medium whitespace-nowrap ${
                  activeTab === 'amenities'
                    ? 'border-b-2 border-primary-500 text-primary-500'
                    : 'text-neutral-600 hover:text-primary-500'
                }`}
              >
                Amenities
              </button>
              <button
                onClick={() => setActiveTab('location')}
                className={`px-6 py-3 text-sm md:text-base font-medium whitespace-nowrap ${
                  activeTab === 'location'
                    ? 'border-b-2 border-primary-500 text-primary-500'
                    : 'text-neutral-600 hover:text-primary-500'
                }`}
              >
                Location
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-6 py-3 text-sm md:text-base font-medium whitespace-nowrap ${
                  activeTab === 'reviews'
                    ? 'border-b-2 border-primary-500 text-primary-500'
                    : 'text-neutral-600 hover:text-primary-500'
                }`}
              >
                Reviews
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">About {name}</h2>
                <p className="text-neutral-700 mb-6 leading-relaxed">
                  {description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <FaPhoneAlt className="text-primary-500 mr-3" />
                    <span>{phone}</span>
                  </div>
                  <div className="flex items-center">
                    <FaGlobe className="text-primary-500 mr-3" />
                    <a href={website} target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">
                      Visit hotel website
                    </a>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'amenities' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Hotel Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <div className="text-primary-500 mr-3">
                        {amenityIcons[amenity] || <FaStar />}
                      </div>
                      <span className="capitalize">{amenity.replace('_', ' ')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'location' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Location & Surroundings</h2>
                <div className="mb-4">
                  <p className="font-medium">Address:</p>
                  <p className="text-neutral-700">{address}, {city}</p>
                </div>
                <div className="h-96 bg-neutral-200 rounded-md mb-4">
                  {/* In a real app, this would be a Google Map */}
                  <div className="w-full h-full flex items-center justify-center text-neutral-500">
                    Map would be displayed here
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Nearby Attractions:</h3>
                  <ul className="list-disc list-inside text-neutral-700">
                    <li>City Center (0.5 miles)</li>
                    <li>Beach (0.8 miles)</li>
                    <li>Shopping District (1.2 miles)</li>
                    <li>International Airport (12 miles)</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Guest Reviews</h2>
                  <div className="flex items-center bg-primary-500 text-white px-3 py-1 rounded-lg">
                    <FaStar className="mr-1" />
                    <span className="font-bold">{rating}</span>
                    <span className="mx-1">/</span>
                    <span>5</span>
                  </div>
                </div>
                <div className="space-y-6">
                  {/* This would be a list of reviews from the API */}
                  <div className="p-4 border border-neutral-200 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium">John Smith</h3>
                      <Rating value={5} size="small" />
                    </div>
                    <p className="text-neutral-600 text-sm mb-1">Stayed: June 2023</p>
                    <p className="text-neutral-700">
                      Excellent hotel with amazing staff and beautiful rooms. The location is perfect for exploring the city.
                    </p>
                  </div>
                  <div className="p-4 border border-neutral-200 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium">Sarah Johnson</h3>
                      <Rating value={4} size="small" />
                    </div>
                    <p className="text-neutral-600 text-sm mb-1">Stayed: May 2023</p>
                    <p className="text-neutral-700">
                      Very comfortable stay with great amenities. The breakfast was delicious and the pool area was well maintained.
                    </p>
                  </div>
                  <div className="p-4 border border-neutral-200 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium">Michael Brown</h3>
                      <Rating value={4.5} size="small" />
                    </div>
                    <p className="text-neutral-600 text-sm mb-1">Stayed: April 2023</p>
                    <p className="text-neutral-700">
                      Great experience overall. Clean rooms, friendly staff, and convenient location. Would definitely stay again.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Rooms Section */}
        <div id="rooms-section" className="bg-white rounded-lg shadow-md p-6">
          <RoomList 
            rooms={rooms} 
            loading={loadingRooms} 
            hotelId={id} 
          />
        </div>
      </div>
    </div>
  )
}

export default HotelDetailsPage