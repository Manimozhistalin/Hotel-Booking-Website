import React, { useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'
import Button from '../common/Button'

const GuestSelector = ({ guests = 2, rooms = 1, onSelect }) => {
  const [guestCount, setGuestCount] = useState(guests)
  const [roomCount, setRoomCount] = useState(rooms)

  const handleGuestIncrease = () => {
    setGuestCount(prev => Math.min(prev + 1, 20))
  }

  const handleGuestDecrease = () => {
    setGuestCount(prev => Math.max(prev - 1, 1))
  }

  const handleRoomIncrease = () => {
    setRoomCount(prev => Math.min(prev + 1, 10))
  }

  const handleRoomDecrease = () => {
    setRoomCount(prev => Math.max(prev - 1, 1))
  }

  const handleApply = () => {
    onSelect(guestCount, roomCount)
  }

  const CounterButton = ({ onClick, icon, disabled }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        w-8 h-8 rounded-full flex items-center justify-center border
        ${disabled 
          ? 'border-neutral-200 text-neutral-300 cursor-not-allowed' 
          : 'border-neutral-300 hover:border-primary-500 text-neutral-600 hover:text-primary-500'}
        transition-colors
      `}
    >
      {icon}
    </button>
  )

  return (
    <div className="bg-white shadow-dropdown rounded-lg p-4 w-72 animate-fade-in">
      {/* Guest Counter */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-medium">Guests</h3>
          <p className="text-sm text-neutral-500">Ages 13 or above</p>
        </div>
        <div className="flex items-center space-x-3">
          <CounterButton 
            onClick={handleGuestDecrease} 
            icon={<FaMinus size={12} />} 
            disabled={guestCount <= 1}
          />
          <span className="w-6 text-center">{guestCount}</span>
          <CounterButton 
            onClick={handleGuestIncrease} 
            icon={<FaPlus size={12} />} 
            disabled={guestCount >= 20}
          />
        </div>
      </div>

      {/* Room Counter */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-medium">Rooms</h3>
          <p className="text-sm text-neutral-500">Max 10 rooms</p>
        </div>
        <div className="flex items-center space-x-3">
          <CounterButton 
            onClick={handleRoomDecrease} 
            icon={<FaMinus size={12} />} 
            disabled={roomCount <= 1}
          />
          <span className="w-6 text-center">{roomCount}</span>
          <CounterButton 
            onClick={handleRoomIncrease} 
            icon={<FaPlus size={12} />} 
            disabled={roomCount >= 10}
          />
        </div>
      </div>

      <Button
        variant="primary"
        fullWidth
        onClick={handleApply}
      >
        Apply
      </Button>
    </div>
  )
}

export default GuestSelector