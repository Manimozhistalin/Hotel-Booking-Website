import React from 'react'
import RoomCard from './RoomCard'
import Loader from '../common/Loader'

const RoomList = ({ rooms, loading, hotelId }) => {
  if (loading) {
    return <Loader />
  }

  if (!rooms || rooms.length === 0) {
    return (
      <div className="py-6 text-center">
        <h3 className="text-lg font-medium mb-2">No rooms available</h3>
        <p className="text-neutral-600">
          Try adjusting your dates or check back later.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Available Rooms</h2>
      {rooms.map(room => (
        <RoomCard key={room.id} room={room} hotelId={hotelId} />
      ))}
    </div>
  )
}

export default RoomList