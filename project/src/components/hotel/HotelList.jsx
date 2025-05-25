import React, { useState } from 'react'
import { FaSort } from 'react-icons/fa'
import HotelCard from './HotelCard'
import Loader from '../common/Loader'

const HotelList = ({ hotels, loading, sortHotels }) => {
  const [sortOption, setSortOption] = useState('recommended')
  
  const handleSortChange = (e) => {
    const option = e.target.value
    setSortOption(option)
  }
  
  const sortedHotels = sortHotels ? sortHotels(hotels, sortOption) : hotels

  // Sorting options
  const sortOptions = [
    { value: 'recommended', label: 'Recommended' },
    { value: 'price-low-high', label: 'Price: Low to High' },
    { value: 'price-high-low', label: 'Price: High to Low' },
    { value: 'rating-high-low', label: 'Rating: High to Low' },
    { value: 'popularity', label: 'Popularity' },
  ]

  if (loading) {
    return <Loader />
  }

  if (hotels.length === 0) {
    return (
      <div className="py-10 text-center">
        <h3 className="text-xl font-medium mb-2">No hotels found</h3>
        <p className="text-neutral-600">
          Try adjusting your search criteria or explore different dates.
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* Sort Controls */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-neutral-600">
          <span className="font-medium">{hotels.length}</span> hotels found
        </p>
        <div className="flex items-center">
          <FaSort className="text-neutral-500 mr-2" />
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="border border-neutral-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Hotel List */}
      <div className="space-y-4">
        {sortedHotels.map(hotel => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </div>
  )
}

export default HotelList