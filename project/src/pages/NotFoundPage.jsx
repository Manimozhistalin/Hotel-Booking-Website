import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/common/Button'

const NotFoundPage = () => {
  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-neutral-100">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-primary-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-neutral-600 mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Button
            variant="primary"
            size="large"
            as={Link}
            to="/"
          >
            Go to Homepage
          </Button>
          <Button
            variant="outlined"
            size="large"
            as={Link}
            to="/search"
          >
            Search Hotels
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage