import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaMapMarkerAlt, FaWifi, FaParking, FaSwimmingPool, FaUtensils } from 'react-icons/fa'
import Rating from '../common/Rating'
import Button from '../common/Button'

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate()
  
  const {
    id,
    name,
    thumbnail,
    city,
    address,
    rating,
    reviewCount,
    price,
    discount,
    amenities,
  } = hotel

  // Calculate discounted price
  const discountedPrice = discount 
    ? Math.round(price - (price * discount / 100)) 
    : price

  // Show only the first 3 amenities
  const topAmenities = amenities.slice(0, 3)

  // Map amenities to icons
  const amenityIcons = {
    wifi: <FaWifi />,
    parking: <FaParking />,
    pool: <FaSwimmingPool />,
    restaurant: <FaUtensils />,
  }

  const handleViewDetails = () => {
    navigate(`/hotel/${id}`)
  }

  return (
    <div className="card flex flex-col md:flex-row">
      {/* Hotel Image */}
      <div className="relative w-full md:w-1/3 h-48 md:h-auto">
        <img 
          src={thumbnail} 
          alt={name} 
          className="w-full h-full object-cover"
        />
        {discount > 0 && (
          <div className="absolute top-0 right-0 bg-accent-500 text-white px-2 py-1 text-sm font-medium">
            {discount}% OFF
          </div>
        )}
      </div>

      {/* Hotel Details */}
      <div className="flex flex-col flex-grow p-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-1">{name}</h3>
            <div className="flex items-center text-sm text-neutral-600 mb-2">
              <FaMapMarkerAlt className="text-accent-500 mr-1" />
              <span>{address}, {city}</span>
            </div>
            <div className="flex items-center mb-3">
              <Rating value={rating} />
              <span className="ml-2 text-sm text-neutral-600">
                ({reviewCount} reviews)
              </span>
            </div>
          </div>

          {/* Price and Booking */}
          <div className="flex flex-col items-end mt-2 md:mt-0">
            <div className="text-right">
              {discount > 0 && (
                <span className="text-sm text-neutral-500 line-through mr-2">
                  ${price}
                </span>
              )}
              <span className="text-xl font-bold text-primary-500">
                ${discountedPrice}
              </span>
              <span className="text-sm text-neutral-500"> /night</span>
            </div>
            <p className="text-xs text-neutral-500 mb-3">
              Excluding taxes & fees
            </p>
            <Button
              variant="accent"
              onClick={handleViewDetails}
            >
              View Details
            </Button>
          </div>
        </div>

        {/* Amenities */}
        <div className="mt-auto pt-4 border-t border-neutral-200">
          <div className="flex flex-wrap">
            {topAmenities.map((amenity, index) => (
              <div key={index} className="flex items-center mr-4 mb-1 text-sm text-neutral-600">
                <span className="mr-1">{amenityIcons[amenity] || null}</span>
                <span className="capitalize">{amenity}</span>
              </div>
            ))}
            {amenities.length > 3 && (
              <span className="text-sm text-primary-500">
                +{amenities.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HotelCard