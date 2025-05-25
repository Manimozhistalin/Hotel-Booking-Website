import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaHotel, FaYoutube, FaPinterest } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-neutral-800 text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <Link to="/" className="flex items-center mb-4">
              <FaHotel className="text-accent-500 text-2xl mr-2" />
              <span className="font-bold text-xl">Hoteluxe</span>
            </Link>
            <p className="text-neutral-400 mb-4">
              Book your perfect stay with hoteluxe. The best hotels at the best prices.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/luxuryhotelsluxuryhotels/" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-accent-500 transition-colors">
                <FaFacebook size={20} />
              </a>
              {/* <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-accent-500 transition-colors">
                <FaTwitter size={20} />
              </a> */}
              <a href="https://www.instagram.com/luxuryhotelsworld/?hl=en" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-accent-500 transition-colors">
                <FaInstagram size={20} />
              </a>
              {/* <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-accent-500 transition-colors">
                <FaLinkedin size={20} />
              </a> */}
              <a href="https://www.youtube.com/playlist?list=PLZ5q04PqOZWTakfA2OrcIEp4VM9D5NNYW" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-accent-500 transition-colors">
                <FaYoutube size={20} />
              </a>
              
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-neutral-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/search" className="text-neutral-400 hover:text-white transition-colors">Hotels</Link></li>
              <li><Link to="/profile" className="text-neutral-400 hover:text-white transition-colors">My Bookings</Link></li>
              <li><Link to="/login" className="text-neutral-400 hover:text-white transition-colors">Login</Link></li>
              <li><Link to="/signup" className="text-neutral-400 hover:text-white transition-colors">Sign Up</Link></li>
            </ul>
          </div>

          {/* Support
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Cancellation Policy</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div> */}

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="not-italic text-neutral-400">
              <p className="mb-2">153 Hotel Street</p>
              <p className="mb-2">Chennai,TamilNadu</p>
              <p className="mb-2">Email: Hoteluxe@gmail.com</p>
              <p>Phone:+91 9876543210
              </p>
            </address>
          </div>
        </div>

        {/* <div className="border-t border-neutral-700 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} StayEase. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">Terms of Service</a>
            </div>
          </div>
        </div> */}
      </div>
    </footer>
  )
}

export default Footer