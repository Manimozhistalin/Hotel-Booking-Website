import React, { createContext, useState, useEffect } from 'react'

export const BookingContext = createContext()

export const BookingProvider = ({ children }) => {
  // Search state
  const [searchParams, setSearchParams] = useState({
    location: '',
    checkIn: null,
    checkOut: null,
    guests: 2,
    rooms: 1,
  })

  // Booking state
  const [bookings, setBookings] = useState([])
  const [currentBooking, setCurrentBooking] = useState(null)

  useEffect(() => {
    // Load bookings from localStorage
    const storedBookings = localStorage.getItem('bookings')
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings))
    }
  }, [])

  // Update search parameters
  const updateSearchParams = (params) => {
    setSearchParams({ ...searchParams, ...params })
  }

  // Create a new booking
  const createBooking = (bookingData) => {
    const newBooking = {
      id: `booking-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
      ...bookingData,
    }
    
    const updatedBookings = [...bookings, newBooking]
    setBookings(updatedBookings)
    setCurrentBooking(newBooking)
    localStorage.setItem('bookings', JSON.stringify(updatedBookings))
    
    return newBooking
  }

  // Update booking status
  const updateBookingStatus = (bookingId, status) => {
    const updatedBookings = bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status } : booking
    )
    
    setBookings(updatedBookings)
    localStorage.setItem('bookings', JSON.stringify(updatedBookings))
    
    if (currentBooking && currentBooking.id === bookingId) {
      setCurrentBooking({ ...currentBooking, status })
    }
    
    return updatedBookings.find(booking => booking.id === bookingId)
  }

  // Cancel booking
  const cancelBooking = (bookingId) => {
    return updateBookingStatus(bookingId, 'cancelled')
  }

  // Get booking by ID
  const getBookingById = (bookingId) => {
    return bookings.find(booking => booking.id === bookingId)
  }

  return (
    <BookingContext.Provider 
      value={{
        searchParams,
        updateSearchParams,
        bookings,
        currentBooking,
        setCurrentBooking,
        createBooking,
        updateBookingStatus,
        cancelBooking,
        getBookingById,
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}