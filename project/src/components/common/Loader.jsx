import React from 'react'

const Loader = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-5 h-5',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  }

  return (
    <div className="flex justify-center items-center py-8">
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-neutral-200 border-t-primary-500`}></div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default Loader