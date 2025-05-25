import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FaLock, FaCreditCard, FaCalendarAlt, FaLockOpen } from 'react-icons/fa'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import Loader from '../components/common/Loader'
import { useBooking } from '../hooks/useBooking'

const PaymentPage = () => {
  const { bookingId } = useParams()
  const navigate = useNavigate()
  const { getBookingById, updateBookingStatus } = useBooking()
  
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)
  const [paymentData, setPaymentData] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  })
  const [errors, setErrors] = useState({})
  const [processingPayment, setProcessingPayment] = useState(false)
  
  useEffect(() => {
    const fetchBooking = () => {
      const bookingData = getBookingById(bookingId)
      
      if (!bookingData) {
        navigate('/search')
        return
      }
      
      setBooking(bookingData)
      setLoading(false)
    }
    
    fetchBooking()
  }, [bookingId])

  const handleChange = (e) => {
    const { id, value } = e.target
    
    // Format card number with spaces
    if (id === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim()
      setPaymentData(prev => ({
        ...prev,
        [id]: formatted.substring(0, 19) // limit to 16 digits + 3 spaces
      }))
    } 
    // Format expiry date with slash
    else if (id === 'expiryDate') {
      let formatted = value.replace(/\D/g, '')
      if (formatted.length > 2) {
        formatted = `${formatted.substring(0, 2)}/${formatted.substring(2, 4)}`
      }
      setPaymentData(prev => ({
        ...prev,
        [id]: formatted
      }))
    }
    // Limit CVV to 3 digits
    else if (id === 'cvv') {
      const formatted = value.replace(/\D/g, '').substring(0, 3)
      setPaymentData(prev => ({
        ...prev,
        [id]: formatted
      }))
    }
    else {
      setPaymentData(prev => ({
        ...prev,
        [id]: value
      }))
    }
    
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
    
    if (!paymentData.cardName) newErrors.cardName = 'Cardholder name is required'
    
    if (!paymentData.cardNumber) {
      newErrors.cardNumber = 'Card number is required'
    } else if (paymentData.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Card number must be 16 digits'
    }
    
    if (!paymentData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required'
    } else if (!/^\d{2}\/\d{2}$/.test(paymentData.expiryDate)) {
      newErrors.expiryDate = 'Invalid format (MM/YY)'
    }
    
    if (!paymentData.cvv) {
      newErrors.cvv = 'CVV is required'
    } else if (paymentData.cvv.length !== 3) {
      newErrors.cvv = 'CVV must be 3 digits'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setProcessingPayment(true)
    
    // Simulate payment processing
    setTimeout(() => {
      updateBookingStatus(bookingId, 'confirmed')
      navigate(`/booking-confirmation/${bookingId}`)
    }, 2000)
  }

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
        <h1 className="text-2xl font-bold mb-6">Payment Details</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Enter Payment Information</h2>
                <div className="flex items-center text-primary-500">
                  <FaLock className="mr-2" />
                  <span className="text-sm">Secure Payment</span>
                </div>
              </div>
              
              {processingPayment ? (
                <div className="py-8 text-center">
                  <Loader />
                  <p className="mt-4 text-neutral-600">Processing your payment...</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <Input
                    label="Cardholder Name"
                    id="cardName"
                    value={paymentData.cardName}
                    onChange={handleChange}
                    placeholder="Name as it appears on card"
                    error={errors.cardName}
                    required
                  />
                  
                  <Input
                    label="Card Number"
                    id="cardNumber"
                    value={paymentData.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    error={errors.cardNumber}
                    icon={<FaCreditCard />}
                    required
                    maxLength={19}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Expiry Date"
                      id="expiryDate"
                      value={paymentData.expiryDate}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      error={errors.expiryDate}
                      icon={<FaCalendarAlt />}
                      required
                      maxLength={5}
                    />
                    
                    <Input
                      label="CVV"
                      id="cvv"
                      value={paymentData.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      error={errors.cvv}
                      icon={<FaLockOpen />}
                      required
                      maxLength={3}
                      type="password"
                    />
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <Button
                      variant="primary"
                      type="submit"
                      size="large"
                    >
                      Pay ${booking.totalPrice + Math.round(booking.totalPrice * 0.12)}
                    </Button>
                  </div>
                </form>
              )}
              
              <div className="mt-6 border-t border-neutral-200 pt-4">
                <p className="text-sm text-neutral-600">
                  By clicking "Pay", you agree to our terms and conditions and authorize a charge of ${booking.totalPrice + Math.round(booking.totalPrice * 0.12)} to your credit card.
                </p>
              </div>
            </div>
          </div>
          
          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
              
              <div className="mb-4">
                <h3 className="font-medium text-lg">{booking.hotelName}</h3>
                <p className="text-neutral-600">{booking.roomName}</p>
              </div>
              
              <div className="space-y-2 border-b border-neutral-200 pb-4 mb-4">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Check-in</span>
                  <span>{new Date(booking.checkIn).toLocaleDateString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-neutral-600">Check-out</span>
                  <span>{new Date(booking.checkOut).toLocaleDateString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-neutral-600">Guests</span>
                  <span>{booking.guests}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-neutral-600">Nights</span>
                  <span>{booking.nights}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Room total</span>
                  <span>${booking.totalPrice}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-neutral-600">Taxes & fees</span>
                  <span>${Math.round(booking.totalPrice * 0.12)}</span>
                </div>
                
                <div className="border-t border-neutral-200 pt-2 mt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-primary-500">
                    ${booking.totalPrice + Math.round(booking.totalPrice * 0.12)}
                  </span>
                </div>
              </div>
              
              <div className="mt-6 bg-primary-50 p-3 rounded-md text-primary-700 text-sm">
                <p>
                  <strong>Free cancellation</strong> until 24 hours before check-in.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentPage