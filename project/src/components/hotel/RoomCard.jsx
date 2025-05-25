import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaCheck, FaWifi, FaUtensils, FaTv, FaSnowflake } from 'react-icons/fa'
import Button from '../common/Button'

const RoomCard = ({ room, hotelId }) => {
  const navigate = useNavigate()
  
  const {
    id,
    name,
    description,
    price,
    discount,
    maxOccupancy,
    size,
    bedType,
    image,
    amenities,
  } = room
  
  // Calculate discounted price
  const discountedPrice = discount 
    ? Math.round(price - (price * discount / 100)) 
    : price
    
  // Amenity icons
  const amenityIcons = {
    wifi: <FaWifi />,
    breakfast: <FaUtensils />,
    tv: <FaTv />,
    ac: <FaSnowflake />,
  }
  
  const handleBookNow = () => {
    navigate(`/booking/${hotelId}/${id}`)
  }
  
  return (
    <div className="card overflow-hidden mb-4">
      <div className="flex flex-col md:flex-row">
        {/* Room Image */}
        <div className="w-full md:w-1/4 h-40 md:h-auto">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Room Details */}
        <div className="flex flex-col md:flex-row flex-grow">
          <div className="p-4 flex-grow">
            {/* Room Name and Features */}
            <h3 className="text-lg font-semibold mb-1">{name}</h3>
            <div className="flex flex-wrap mb-2 text-sm text-neutral-600">
              <div className="mr-4">
                <span className="font-medium">Room Size:</span> {size} m²
              </div>
              <div className="mr-4">
                <span className="font-medium">Bed:</span> {bedType}
              </div>
              <div>
                <span className="font-medium">Max Guests:</span> {maxOccupancy}
              </div>
            </div>
            
            {/* Room Description */}
            <p className="text-neutral-600 text-sm mb-3">
              {description}
            </p>
            
            {/* Room Amenities */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 mt-2">
              {amenities.map((amenity, index) => (
                <div key={index} className="flex items-center text-sm text-neutral-600">
                  <span className="mr-2 text-primary-500">
                    {amenityIcons[amenity] || <FaCheck />}
                  </span>
                  <span className="capitalize">{amenity.replace('_', ' ')}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Price and Booking */}
          <div className="bg-neutral-50 p-4 flex flex-col justify-between md:w-1/4 border-t md:border-t-0 md:border-l border-neutral-200">
            <div>
              {discount > 0 && (
                <div className="mb-1">
                  <span className="text-sm text-neutral-500 line-through">
                    ${price}
                  </span>
                  <span className="ml-2 text-xs bg-accent-500 text-white px-2 py-1 rounded">
                    {discount}% OFF
                  </span>
                </div>
              )}
              <div className="text-2xl font-bold text-primary-500 mb-1">
                ${discountedPrice}
              </div>
              <p className="text-xs text-neutral-500 mb-3">
                per night
              </p>
            </div>
            
            <Button
              variant="accent"
              fullWidth
              onClick={handleBookNow}
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomCard