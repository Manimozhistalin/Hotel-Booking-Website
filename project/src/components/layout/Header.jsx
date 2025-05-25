import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FaUser, FaBars, FaTimes, FaHotel } from 'react-icons/fa'
import { useAuth } from '../../hooks/useAuth'
import Button from '../common/Button'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Check if we're on the homepage
  const isHomePage = location.pathname === '/'

  // Change header style on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when navigating
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const headerClass = isHomePage && !isScrolled 
    ? 'bg-transparent text-white'
    : 'bg-white text-neutral-800 shadow-md'

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerClass}`}>
      <div className="container-custom flex justify-between items-center py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <FaHotel className="text-accent-500 text-2xl mr-2" />
          <span className="font-bold text-xl">Hoteluxe</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="font-medium hover:text-accent-500 transition-colors">Home</Link>
          <Link to="/search" className="font-medium hover:text-accent-500 transition-colors">Hotels</Link>
          <Link to="/profile" className="font-medium hover:text-accent-500 transition-colors">My Bookings</Link>
          
          {user ? (
            <div className="relative group">
              <button className="flex items-center space-x-2 font-medium hover:text-accent-500 transition-colors">
                <FaUser />
                <span>{user.name}</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-dropdown invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 transform origin-top-right">
                <div className="py-1">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-neutral-100">My Profile</Link>
                  <Link to="/profile/bookings" className="block px-4 py-2 hover:bg-neutral-100">My Bookings</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-neutral-100 text-error-500">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex space-x-2">
              <Button 
                variant="secondary" 
                size="small" 
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button 
                variant="accent" 
                size="small" 
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </Button>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white absolute top-16 left-0 right-0 shadow-md animate-slide-down">
          <div className="container-custom py-4 flex flex-col space-y-4">
            <Link to="/" className="font-medium py-2 hover:text-accent-500">Home</Link>
            <Link to="/search" className="font-medium py-2 hover:text-accent-500">Hotels</Link>
            <Link to="/profile" className="font-medium py-2 hover:text-accent-500">My Bookings</Link>
            
            {user ? (
              <>
                <div className="flex items-center space-x-2 font-medium py-2">
                  <FaUser />
                  <span>{user.name}</span>
                </div>
                <Link to="/profile" className="font-medium py-2 pl-6 hover:text-accent-500">My Profile</Link>
                <Link to="/profile/bookings" className="font-medium py-2 pl-6 hover:text-accent-500">My Bookings</Link>
                <button 
                  onClick={handleLogout} 
                  className="font-medium py-2 text-left text-error-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-2">
                <Button 
                  variant="secondary" 
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
                <Button 
                  variant="accent" 
                  onClick={() => navigate('/signup')}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Header