import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchForm from '../components/search/SearchForm'
import HotelFilters from '../components/hotel/HotelFilters'
import HotelList from '../components/hotel/HotelList'
import { useHotels } from '../hooks/useHotels'
import { useBooking } from '../hooks/useBooking'

const SearchResultsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { searchParams: bookingParams, updateSearchParams } = useBooking()
  const { hotels, loading, error, fetchHotels, sortHotels } = useHotels()
  const [filters, setFilters] = useState({})

  const location = searchParams.get('location') || bookingParams.location || ''

  useEffect(() => {
    // Update context with URL params if present
    if (location) {
      updateSearchParams({ location })
    }

    // Fetch hotels with current filters
    fetchHotels({ location, ...filters })
  }, [location, filters])

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters)
  }

  return (
    <div className="bg-neutral-100 min-h-screen pt-20">
      <div className="container-custom py-6">
        {/* Search Form */}
        <div className="mb-6">
          <SearchForm />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Filters Section */}
          <div className="lg:col-span-12">
            <HotelFilters onApplyFilters={handleApplyFilters} />
          </div>

          {/* Results Section */}
          <div className="lg:col-span-12">
            {error ? (
              <div className="bg-error-50 text-error-700 p-4 rounded-md mb-4">
                {error}
              </div>
            ) : (
              <HotelList 
                hotels={hotels} 
                loading={loading} 
                sortHotels={sortHotels}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchResultsPage