import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FaUser, FaEnvelope, FaPhone, FaEdit, FaHotel, FaCalendarAlt, FaTimes, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import { useAuth } from '../hooks/useAuth'
import { useBooking } from '../hooks/useBooking'

const ProfilePage = () => {
  const navigate = useNavigate()
  const { user, updateProfile, logout } = useAuth()
  const { bookings, cancelBooking } = useBooking()
  
  const [activeTab, setActiveTab] = useState('bookings')
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  })
  const [successMessage, setSuccessMessage] = useState('')
  
  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { redirect: '/profile' } })
      return
    }
    
    // Populate form data with user info
    setFormData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      phone: user.phone || '',
    })
  }, [user])

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    updateProfile(formData)
    setEditMode(false)
    setSuccessMessage('Profile updated successfully!')
    
    // Clear success message after 3 seconds
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  const handleCancelBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) {
      cancelBooking(bookingId)
    }
  }

  const getBookingStatusBadge = (status) => {
    switch(status) {
      case 'confirmed':
        return (
          <span className="bg-success-500 text-white px-2 py-1 rounded-full text-xs flex items-center">
            <FaCheckCircle className="mr-1" />
            Confirmed
          </span>
        )
      case 'pending':
        return (
          <span className="bg-warning-500 text-white px-2 py-1 rounded-full text-xs flex items-center">
            <FaExclamationTriangle className="mr-1" />
            Pending
          </span>
        )
      case 'cancelled':
        return (
          <span className="bg-neutral-500 text-white px-2 py-1 rounded-full text-xs flex items-center">
            <FaTimes className="mr-1" />
            Cancelled
          </span>
        )
      default:
        return (
          <span className="bg-neutral-500 text-white px-2 py-1 rounded-full text-xs">
            {status}
          </span>
        )
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="bg-neutral-100 min-h-screen pt-20">
      <div className="container-custom py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <div className="flex flex-col items-center mb-6">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center text-primary-500 text-2xl mb-3">
                  {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                </div>
                <h2 className="text-xl font-semibold">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-neutral-600">{user.email}</p>
              </div>
              
              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`w-full text-left px-4 py-2 rounded-md ${
                    activeTab === 'bookings'
                      ? 'bg-primary-50 text-primary-600'
                      : 'hover:bg-neutral-50'
                  }`}
                >
                  <FaHotel className="inline-block mr-2" />
                  My Bookings
                </button>
                
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-2 rounded-md ${
                    activeTab === 'profile'
                      ? 'bg-primary-50 text-primary-600'
                      : 'hover:bg-neutral-50'
                  }`}
                >
                  <FaUser className="inline-block mr-2" />
                  Profile Settings
                </button>
                
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 rounded-md text-error-500 hover:bg-neutral-50"
                >
                  <FaTimes className="inline-block mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'bookings' && (
              <div>
                <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                  <h2 className="text-xl font-semibold mb-4">My Bookings</h2>
                  
                  {bookings.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-neutral-600 mb-4">You don't have any bookings yet.</p>
                      <Button
                        variant="primary"
                        onClick={() => navigate('/search')}
                      >
                        Find Hotels
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {bookings.map(booking => (
                        <div key={booking.id} className="border border-neutral-200 rounded-lg p-4">
                          <div className="flex flex-col md:flex-row justify-between mb-4">
                            <div>
                              <h3 className="font-semibold text-lg">{booking.hotelName}</h3>
                              <p className="text-neutral-600">{booking.roomName}</p>
                            </div>
                            {getBookingStatusBadge(booking.status)}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-start">
                              <FaCalendarAlt className="text-accent-500 mt-1 mr-2 flex-shrink-0" />
                              <div>
                                <p className="text-sm text-neutral-500">Check-in</p>
                                <p className="font-medium">
                                  {new Date(booking.checkIn).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-start">
                              <FaCalendarAlt className="text-accent-500 mt-1 mr-2 flex-shrink-0" />
                              <div>
                                <p className="text-sm text-neutral-500">Check-out</p>
                                <p className="font-medium">
                                  {new Date(booking.checkOut).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-start">
                              <FaUser className="text-accent-500 mt-1 mr-2 flex-shrink-0" />
                              <div>
                                <p className="text-sm text-neutral-500">Guests</p>
                                <p className="font-medium">{booking.guests}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center pt-3 border-t border-neutral-200">
                            <div>
                              <span className="font-medium">Total: </span>
                              <span className="text-primary-500 font-semibold">
                                ${booking.totalPrice + Math.round(booking.totalPrice * 0.12)}
                              </span>
                            </div>
                            
                            <div className="flex space-x-2">
                              <Button
                                variant="outlined"
                                size="small"
                                onClick={() => navigate(`/booking-confirmation/${booking.id}`)}
                              >
                                View Details
                              </Button>
                              
                              {booking.status === 'confirmed' && (
                                <Button
                                  variant="outlined"
                                  size="small"
                                  className="text-error-500 border-error-500 hover:bg-error-50"
                                  onClick={() => handleCancelBooking(booking.id)}
                                >
                                  Cancel
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Profile Settings</h2>
                  {!editMode && (
                    <Button
                      variant="outlined"
                      onClick={() => setEditMode(true)}
                    >
                      <FaEdit className="mr-2" />
                      Edit Profile
                    </Button>
                  )}
                </div>
                
                {successMessage && (
                  <div className="bg-success-50 text-success-700 p-3 rounded-md mb-4">
                    {successMessage}
                  </div>
                )}
                
                {editMode ? (
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <Input
                        label="First Name"
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                      <Input
                        label="Last Name"
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <Input
                        label="Email"
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      <Input
                        label="Phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-3">
                      <Button
                        variant="outlined"
                        type="button"
                        onClick={() => setEditMode(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="primary"
                        type="submit"
                      >
                        Save Changes
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="flex">
                      <FaUser className="text-primary-500 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-neutral-500">Name</p>
                        <p className="font-medium">
                          {user.firstName} {user.lastName}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <FaEnvelope className="text-primary-500 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-neutral-500">Email</p>
                        <p className="font-medium">{user.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <FaPhone className="text-primary-500 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-neutral-500">Phone</p>
                        <p className="font-medium">{user.phone}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage