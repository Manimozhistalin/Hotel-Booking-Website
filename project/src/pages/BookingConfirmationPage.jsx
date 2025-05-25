import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { FaCheckCircle, FaCalendarAlt, FaMapMarkerAlt, FaUser, FaEnvelope, FaPrint, FaDownload } from 'react-icons/fa'
import Button from '../components/common/Button'
import Loader from '../components/common/Loader'
import { useBooking } from '../hooks/useBooking'

const BookingConfirmationPage = () => {
  const { bookingId } = useParams()
  const navigate = useNavigate()
  const { getBookingById } = useBooking()
  
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchBooking = () => {
      const bookingData = getBookingById(bookingId)
      
      if (!bookingData || bookingData.status !== 'confirmed') {
        navigate('/search')
        return
      }
      
      setBooking(bookingData)
      setLoading(false)
    }
    
    fetchBooking()
  }, [bookingId])

  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-neutral-100">
        <div className="container-custom py-10">
          <Loader size="large" />
        </div>
      </div>
    )
  }

  if (!booking) {
    return (
      <div className="min-h-screen pt-20 bg-neutral-100">
        <div className="container-custom py-10">
          <div className="bg-error-50 text-error-700 p-4 rounded-md">
            Booking not found. Please try again.
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

  return (
    <div className="bg-neutral-100 min-h-screen pt-20">
      <div className="container-custom py-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col items-center mb-6 text-center">
            <FaCheckCircle className="text-success-500 text-5xl mb-4" />
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Booking Confirmed!</h1>
            <p className="text-neutral-600">
              Your booking has been confirmed and is ready. You will receive a confirmation email shortly.
            </p>
          </div>
          
          <div className="border-t border-b border-neutral-200 py-4 my-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Booking Details</h2>
              <p className="text-primary-500 font-medium">
                Booking ID: {bookingId}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hotel & Room Details */}
            <div>
              <h3 className="font-semibold mb-4">Your Stay</h3>
              
              <div className="space-y-4">
                <div className="flex">
                  <FaMapMarkerAlt className="text-accent-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{booking.hotelName}</p>
                    <p className="text-neutral-600">{booking.roomName}</p>
                  </div>
                </div>
                
                <div className="flex">
                  <FaCalendarAlt className="text-accent-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Check-in</p>
                    <p className="text-neutral-600">
                      {new Date(booking.checkIn).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </p>
                    <p className="text-sm text-neutral-500">From 3:00 PM</p>
                  </div>
                </div>
                
                <div className="flex">
                  <FaCalendarAlt className="text-accent-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Check-out</p>
                    <p className="text-neutral-600">
                      {new Date(booking.checkOut).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </p>
                    <p className="text-sm text-neutral-500">Until 11:00 AM</p>
                  </div>
                </div>
                
                <div className="flex">
                  <FaUser className="text-accent-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Guests</p>
                    <p className="text-neutral-600">{booking.guests} Guest{booking.guests !== 1 ? 's' : ''}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Guest & Payment Details */}
            <div>
              <h3 className="font-semibold mb-4">Guest Details</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex">
                  <FaUser className="text-accent-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Primary Guest</p>
                    <p className="text-neutral-600">
                      {`${booking.guestDetails.firstName} ${booking.guestDetails.lastName}`}
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <FaEnvelope className="text-accent-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Contact Information</p>
                    <p className="text-neutral-600">{booking.guestDetails.email}</p>
                    <p className="text-neutral-600">{booking.guestDetails.phone}</p>
                  </div>
                </div>
              </div>
              
              <h3 className="font-semibold mb-4">Payment Summary</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Room total ({booking.nights} night{booking.nights !== 1 ? 's' : ''})</span>
                  <span>${booking.totalPrice}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-neutral-600">Taxes & fees</span>
                  <span>${Math.round(booking.totalPrice * 0.12)}</span>
                </div>
                
                <div className="border-t border-neutral-200 pt-2 mt-2 flex justify-between font-bold">
                  <span>Total paid</span>
                  <span className="text-primary-500">
                    ${booking.totalPrice + Math.round(booking.totalPrice * 0.12)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-neutral-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 text-center md:text-left">
              <p className="text-sm text-neutral-600 mb-1">
                Need help with your booking?
              </p>
              <Link to="/contact" className="text-primary-500 font-medium hover:underline">
                Contact our support team
              </Link>
            </div>
            
            <div className="flex space-x-3">
              <Button
                variant="outlined"
                onClick={() => window.print()}
              >
                <FaPrint className="mr-2" />
                Print
              </Button>
              
              <Button
                variant="primary"
                onClick={() => navigate('/profile')}
              >
                View All Bookings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingConfirmationPage