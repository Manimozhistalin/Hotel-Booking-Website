import { useState, useEffect } from 'react'
import { mockHotels } from '../data/mockHotels'

export const useHotels = () => {
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load hotels on initial mount
  useEffect(() => {
    fetchHotels()
  }, [])

  // Fetch all hotels
  const fetchHotels = async (filters = {}) => {
    setLoading(true)
    try {
      // In a real app, this would be an API call
      // Simulating network delay
      await new Promise(resolve => setTimeout(resolve, 800))
      
      let filteredHotels = [...mockHotels]
      
      // Apply filters
      if (filters.location) {
        const locationLower = filters.location.toLowerCase()
        filteredHotels = filteredHotels.filter(hotel => 
          hotel.city.toLowerCase().includes(locationLower) || 
          hotel.name.toLowerCase().includes(locationLower)
        )
      }
      
      if (filters.priceMin) {
        filteredHotels = filteredHotels.filter(hotel => 
          hotel.price >= filters.priceMin
        )
      }
      
      if (filters.priceMax) {
        filteredHotels = filteredHotels.filter(hotel => 
          hotel.price <= filters.priceMax
        )
      }
      
      if (filters.rating) {
        filteredHotels = filteredHotels.filter(hotel => 
          hotel.rating >= filters.rating
        )
      }
      
      setHotels(filteredHotels)
      setLoading(false)
      return filteredHotels
    } catch (err) {
      setError('Failed to fetch hotels. Please try again.')
      setLoading(false)
      return []
    }
  }

  // Get a single hotel by ID
  const getHotelById = async (id) => {
    setLoading(true)
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 400))
      
      const hotel = mockHotels.find(h => h.id === id)
      setLoading(false)
      
      if (!hotel) {
        throw new Error('Hotel not found')
      }
      
      return hotel
    } catch (err) {
      setError('Failed to fetch hotel details. Please try again.')
      setLoading(false)
      return null
    }
  }

  // Sort hotels by different criteria
  const sortHotels = (hotels, sortBy) => {
    switch(sortBy) {
      case 'price-low-high':
        return [...hotels].sort((a, b) => a.price - b.price)
      case 'price-high-low':
        return [...hotels].sort((a, b) => b.price - a.price)
      case 'rating-high-low':
        return [...hotels].sort((a, b) => b.rating - a.rating)
      case 'popularity':
        return [...hotels].sort((a, b) => b.reviewCount - a.reviewCount)
      default:
        return hotels
    }
  }

  return {
    hotels,
    loading,
    error,
    fetchHotels,
    getHotelById,
    sortHotels,
  }
}