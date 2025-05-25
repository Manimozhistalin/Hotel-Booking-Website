import React, { useState } from 'react'
import { FaFilter, FaChevronDown, FaChevronUp } from 'react-icons/fa'
import Button from '../common/Button'

const HotelFilters = ({ onApplyFilters }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [starRating, setStarRating] = useState(0)
  const [selectedAmenities, setSelectedAmenities] = useState([])

  const amenitiesList = [
    { id: 'wifi', label: 'Free WiFi' },
    { id: 'breakfast', label: 'Free Breakfast' },
    { id: 'parking', label: 'Free Parking' },
    { id: 'pool', label: 'Swimming Pool' },
    { id: 'gym', label: 'Fitness Center' },
    { id: 'restaurant', label: 'Restaurant' },
    { id: 'ac', label: 'Air Conditioning' },
    { id: 'petfriendly', label: 'Pet Friendly' },
  ]

  const handlePriceChange = (e, index) => {
    const newValue = parseInt(e.target.value, 10)
    setPriceRange(prev => {
      const newRange = [...prev]
      newRange[index] = newValue
      return newRange
    })
  }

  const handleStarRatingChange = (rating) => {
    setStarRating(rating === starRating ? 0 : rating)
  }

  const handleAmenityChange = (amenityId) => {
    setSelectedAmenities(prev => {
      if (prev.includes(amenityId)) {
        return prev.filter(id => id !== amenityId)
      } else {
        return [...prev, amenityId]
      }
    })
  }

  const handleApplyFilters = () => {
    onApplyFilters({
      priceMin: priceRange[0],
      priceMax: priceRange[1],
      rating: starRating,
      amenities: selectedAmenities,
    })
  }

  const handleClearFilters = () => {
    setPriceRange([0, 1000])
    setStarRating(0)
    setSelectedAmenities([])
    onApplyFilters({})
  }

  return (
    <div className="bg-white rounded-lg shadow-md mb-6">
      {/* Filter Header */}
      <div 
        className="flex justify-between items-center p-4 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <FaFilter className="mr-2 text-primary-500" />
          <h3 className="font-medium">Filters</h3>
        </div>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>

      {/* Filter Content */}
      {isOpen && (
        <div className="p-4 border-t border-neutral-200 animate-slide-down">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Price Range */}
            <div>
              <h4 className="font-medium mb-3">Price Range</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">${priceRange[0]}</span>
                  <span className="text-sm">${priceRange[1]}</span>
                </div>
                <div className="flex space-x-4">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="50"
                    value={priceRange[0]}
                    onChange={(e) => handlePriceChange(e, 0)}
                    className="w-full accent-primary-500"
                  />
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="50"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceChange(e, 1)}
                    className="w-full accent-primary-500"
                  />
                </div>
              </div>
            </div>

            {/* Star Rating */}
            <div>
              <h4 className="font-medium mb-3">Star Rating</h4>
              <div className="flex flex-wrap gap-2">
                {[5, 4, 3, 2, 1].map(rating => (
                  <button
                    key={rating}
                    onClick={() => handleStarRatingChange(rating)}
                    className={`
                      px-3 py-1 rounded-md border text-sm
                      ${starRating === rating 
                        ? 'bg-primary-500 text-white border-primary-500' 
                        : 'bg-white text-neutral-700 border-neutral-300 hover:border-primary-400'}
                      transition-colors
                    `}
                  >
                    {rating}★ & Up
                  </button>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h4 className="font-medium mb-3">Amenities</h4>
              <div className="grid grid-cols-2 gap-2">
                {amenitiesList.map(amenity => (
                  <div key={amenity.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`amenity-${amenity.id}`}
                      checked={selectedAmenities.includes(amenity.id)}
                      onChange={() => handleAmenityChange(amenity.id)}
                      className="mr-2 accent-primary-500 h-4 w-4"
                    />
                    <label htmlFor={`amenity-${amenity.id}`} className="text-sm">
                      {amenity.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex justify-end space-x-3 mt-6">
            <Button
              variant="outlined"
              onClick={handleClearFilters}
            >
              Clear All
            </Button>
            <Button
              variant="primary"
              onClick={handleApplyFilters}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default HotelFilters