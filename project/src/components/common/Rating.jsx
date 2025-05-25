import React from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

const Rating = ({ value, text, color = 'text-accent-500' }) => {
  return (
    <div className="flex items-center">
      <div className="flex mr-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={color}>
            {value >= star ? (
              <FaStar />
            ) : value >= star - 0.5 ? (
              <FaStarHalfAlt />
            ) : (
              <FaRegStar />
            )}
          </span>
        ))}
      </div>
      {text && <span className="text-sm text-neutral-600">{text}</span>}
    </div>
  )
}

export default Rating