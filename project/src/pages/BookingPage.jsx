import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { FaRegCalendarAlt, FaUser, FaCreditCard, FaLock } from 'react-icons/fa'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import Loader from '../components/common/Loader'
import { useAuth } from '../hooks/useAuth'
import { useBooking } from '../hooks/useBooking'
import { useHotels } from '../hooks/useHotels'
import { mockRooms } from '../data/mockRooms'

const BookingPage = () => {
  const { hotelId, roomId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { searchParams, createBooking } = useBooking()
  const { getHotelById, loading: loadingHotel } = useHotels()
  
  const [hotel, setHotel] = useState(null)
  const [room, setRoom] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    specialRequests: '',
  })
  
  const [errors, setErrors] = useState({})
  
  useEffect(() => {
    const fetchData = async () => {
      // Get hotel data
      const hotelData = await getHotelById(hotelId)
      setHotel(hotelData)
      
      // Get room data (in a real app, this would be an API call)
      const roomData = mockRooms.find(r => r.id === roomId && r.hotelId === hotelId)
      setRoom(roomData)
      
      setLoading(false)
    }
    
    fetchData()
  }, [hotelId, roomId])

  // If not logged in, redirect to login
  useEffect(() => {
    if (!user && !loading) {
      navigate('/login', { state: { redirect: `/booking/${hotelId}/${roomId}` } })
    }
  }, [user, loading])

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
    
    // Clear error when field is edited
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.firstName) newErrors.firstName = 'First name is required'
    if (!formData.lastName) newErrors.lastName = 'Last name is required'
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    if (!formData.phone) newErrors.phone = 'Phone number is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    // Calculate total nights
    const checkIn = new Date(searchParams.checkIn)
    const checkOut = new Date(searchParams.checkOut)
    const nights = Math.round((checkOut - checkIn) / (1000 * 60 * 60 * 24))
    
    // Create booking
    const bookingData = {
      hotelId,
      hotelName: hotel.name,
      roomId,
      roomName: room.name,
      checkIn: searchParams.checkIn,
      checkOut: searchParams.checkOut,
      guests: searchParams.guests,
      nights: nights || 1,
      price: room.price,
      discount: room.discount,
      totalPrice: calculateTotalPrice(),
      guestDetails: formData,
    }
    
    const booking = createBooking(bookingData)
    navigate(`/payment/${booking.id}`)
  }

  const calculateTotalPrice = () => {
    if (!room) return 0
    
    const checkIn = new Date(searchParams.checkIn || new Date())
    const checkOut = new Date(searchParams.checkOut || new Date(checkIn.getTime() + 86400000))
    const nights = Math.max(1, Math.round((checkOut - checkIn) / (1000 * 60 * 60 * 24)))
    
    // Calculate price with discount
    const pricePerNight = room.discount 
      ? Math.round(room.price - (room.price * room.discount / 100)) 
      : room.price
    
    return pricePerNight * nights
  }

  if (loading || loadingHotel) {
    return (
      <div className="min-h-screen pt-20 bg-neutral-100">
        <div className="container-custom py-10">
          <Loader size="large" />
        </div>
      </div>
    )
  }

  if (!hotel || !room) {
    return (
      <div className="min-h-screen pt-20 bg-neutral-100">
        <div className="container-custom py-10">
          <div className="bg-error-50 text-error-700 p-4 rounded-md">
            Room or hotel not found. Please try again.
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

  // Get formatted dates
  const checkInDate = searchParams.checkIn 
    ? format(new Date(searchParams.checkIn), 'EEE, MMM d, yyyy')
    : format(new Date(), 'EEE, MMM d, yyyy')
    
  const checkOutDate = searchParams.checkOut 
    ? format(new Date(searchParams.checkOut), 'EEE, MMM d, yyyy')
    : format(new Date(new Date().getTime() + 86400000), 'EEE, MMM d, yyyy')

  const nights = searchParams.checkIn && searchParams.checkOut 
    ? Math.round((new Date(searchParams.checkOut) - new Date(searchParams.checkIn)) / (1000 * 60 * 60 * 24))
    : 1

  return (
    <div className="bg-neutral-100 min-h-screen pt-20">
      <div className="container-custom py-6">
        <h1 className="text-2xl font-bold mb-6">Complete Your Booking</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Guest Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  error={errors.firstName}
                  required
                />
                <Input
                  label="Last Name"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  error={errors.lastName}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Email"
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  error={errors.email}
                  required
                />
                <Input
                  label="Phone Number"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  error={errors.phone}
                  required
                />
              </div>
              
              <div className="mt-4">
                <label htmlFor="specialRequests" className="block text-sm font-medium text-neutral-700 mb-1">
                  Special Requests (optional)
                </label>
                <textarea
                  id="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  placeholder="Any special requests for your stay?"
                  className="input-field h-24 resize-none"
                />
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button
                  variant="primary"
                  type="submit"
                  size="large"
                >
                  Continue to Payment
                </Button>
              </div>
            </form>
          </div>
          
          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
              
              <div className="mb-4">
                <h3 className="font-medium text-lg">{hotel.name}</h3>
                <p className="text-neutral-600">{room.name}</p>
              </div>
              
              <div className="border-t border-b border-neutral-200 py-4 my-4 space-y-3">
                <div className="flex items-start">
                  <FaRegCalendarAlt className="text-primary-500 mt-1 mr-3" />
                  <div>
                    <p className="font-medium">Check-in</p>
                    <p className="text-neutral-600">{checkInDate}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FaRegCalendarAlt className="text-primary-500 mt-1 mr-3" />
                  <div>
                    <p className="font-medium">Check-out</p>
                    <p className="text-neutral-600">{checkOutDate}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FaUser className="text-primary-500 mt-1 mr-3" />
                  <div>
                    <p className="font-medium">Guests</p>
                    <p className="text-neutral-600">{searchParams.guests} Guest{searchParams.guests !== 1 ? 's' : ''}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-neutral-600">
                    ${room.discount ? (room.price - (room.price * room.discount / 100)).toFixed(0) : room.price} x {nights} night{nights !== 1 ? 's' : ''}
                  </span>
                  <span>${calculateTotalPrice()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-neutral-600">Taxes & fees</span>
                  <span>${Math.round(calculateTotalPrice() * 0.12)}</span>
                </div>
                
                <div className="border-t border-neutral-200 pt-2 mt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-primary-500">
                    ${calculateTotalPrice() + Math.round(calculateTotalPrice() * 0.12)}
                  </span>
                </div>
              </div>
              
              <div className="mt-6 text-sm text-neutral-600 flex items-center">
                <FaLock className="text-primary-500 mr-2" />
                <p>Secure booking with encrypted payment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingPage