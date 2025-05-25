import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { FaSearch, FaCalendarAlt, FaUserFriends } from 'react-icons/fa'
import DatePicker from './DatePicker'
import GuestSelector from './GuestSelector'
import Button from '../common/Button'
import { useBooking } from '../../hooks/useBooking'

const SearchForm = ({ className = '', variant = 'normal' }) => {
  const navigate = useNavigate()
  const { searchParams, updateSearchParams } = useBooking()
  
  const [location, setLocation] = useState(searchParams.location || '')
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showGuestSelector, setShowGuestSelector] = useState(false)
  
  // Formatted date strings for display
  const checkInDisplay = searchParams.checkIn 
    ? format(new Date(searchParams.checkIn), 'dd MMM yyyy') 
    : 'Check-in'
    
  const checkOutDisplay = searchParams.checkOut 
    ? format(new Date(searchParams.checkOut), 'dd MMM yyyy') 
    : 'Check-out'

  const handleLocationChange = (e) => {
    setLocation(e.target.value)
  }

  const handleDateSelection = (startDate, endDate) => {
    updateSearchParams({ 
      checkIn: startDate ? startDate.toISOString() : null, 
      checkOut: endDate ? endDate.toISOString() : null 
    })
    setShowDatePicker(false)
  }

  const handleGuestSelection = (guests, rooms) => {
    updateSearchParams({ guests, rooms })
    setShowGuestSelector(false)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    updateSearchParams({ location })
    navigate('/search')
  }

  // Close dropdowns when clicking outside
  const handleClickOutside = (e) => {
    if (!e.target.closest('.date-picker-container') && !e.target.closest('.date-picker-trigger')) {
      setShowDatePicker(false)
    }
    if (!e.target.closest('.guest-selector-container') && !e.target.closest('.guest-selector-trigger')) {
      setShowGuestSelector(false)
    }
  }

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Different styles based on variant
  const containerClass = variant === 'hero' 
    ? 'bg-white rounded-lg shadow-lg p-4 md:p-6 animate-slide-up'
    : 'bg-white rounded-lg shadow-md p-4'
  
  return (
    <form onSubmit={handleSearch} className={`${containerClass} ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Location */}
        <div className="relative">
          <label htmlFor="location" className="block text-sm font-medium text-neutral-700 mb-1">
            Destination
          </label>
          <div className="relative">
            <input
              id="location"
              type="text"
              value={location}
              onChange={handleLocationChange}
              placeholder="Where are you going?"
              className="input-field pl-10"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
              <FaSearch />
            </div>
          </div>
        </div>

        {/* Date Range */}
        <div className="relative date-picker-container">
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Check-in / Check-out
          </label>
          <button
            type="button"
            className="input-field pl-10 text-left date-picker-trigger"
            onClick={() => setShowDatePicker(!showDatePicker)}
          >
            {checkInDisplay} — {checkOutDisplay}
          </button>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
            <FaCalendarAlt />
          </div>
          
          {showDatePicker && (
            <div className="absolute top-full left-0 z-10 mt-1 w-auto">
              <DatePicker
                startDate={searchParams.checkIn ? new Date(searchParams.checkIn) : null}
                endDate={searchParams.checkOut ? new Date(searchParams.checkOut) : null}
                onSelect={handleDateSelection}
              />
            </div>
          )}
        </div>

        {/* Guests */}
        <div className="relative guest-selector-container">
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Guests & Rooms
          </label>
          <button
            type="button"
            className="input-field pl-10 text-left guest-selector-trigger"
            onClick={() => setShowGuestSelector(!showGuestSelector)}
          >
            {searchParams.guests} Guest{searchParams.guests !== 1 ? 's' : ''}, {searchParams.rooms} Room{searchParams.rooms !== 1 ? 's' : ''}
          </button>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
            <FaUserFriends />
          </div>
          
          {showGuestSelector && (
            <div className="absolute top-full left-0 z-10 mt-1">
              <GuestSelector
                guests={searchParams.guests}
                rooms={searchParams.rooms}
                onSelect={handleGuestSelection}
              />
            </div>
          )}
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <Button
            type="submit"
            variant="accent"
            fullWidth
            className="h-11"
          >
            Search Hotels
          </Button>
        </div>
      </div>
    </form>
  )
}

export default SearchForm