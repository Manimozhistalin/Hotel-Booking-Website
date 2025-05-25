import React from 'react'
import { useNavigate } from 'react-router-dom'
import SearchForm from '../components/search/SearchForm'
import Button from '../components/common/Button'
import { FaStar, FaHotel, FaWallet, FaPhone } from 'react-icons/fa'

const HomePage = () => {
  const navigate = useNavigate()
  
  const popularDestinations = [
    { id: 1, name: 'New York', image: 'https://images.pexels.com/photos/802024/pexels-photo-802024.jpeg', count: 532 },
    { id: 2, name: 'Las Vegas', image: 'https://images.pexels.com/photos/415999/pexels-photo-415999.jpeg', count: 421 },
    { id: 3, name: 'Miami', image: 'https://images.pexels.com/photos/3722888/pexels-photo-3722888.jpeg', count: 327 },
    { id: 4, name: 'San Francisco', image: 'https://images.pexels.com/photos/208745/pexels-photo-208745.jpeg', count: 281 },
  ]

  const featuredHotels = [
    { id: 'h1', name: 'Grand Luxury Resort & Spa', location: 'Miami Beach, FL', image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg', rating: 4.8, price: 299 },
    { id: 'h2', name: 'Riverside Boutique Hotel', location: 'New York, NY', image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg', rating: 4.7, price: 189 },
    { id: 'h3', name: 'Oceanview Paradise Resort', location: 'Malibu, CA', image: 'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg', rating: 4.9, price: 349 },
  ]

  const handleDestinationClick = (destination) => {
    navigate(`/search?location=${destination}`)
  }

  const handleHotelClick = (id) => {
    navigate(`/hotel/${id}`)
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/2869215/pexels-photo-2869215.jpeg" 
            alt="Luxury hotel room" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        </div>
        
        <div className="container-custom relative z-10 mt-16">
          <div className="max-w-2xl mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Find Your Perfect Stay with Hoteluxe
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Discover amazing hotels at the best prices. Book with confidence and enjoy your journey.
            </p>
          </div>
          
          <SearchForm variant="hero" className="mb-4" />
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8">Popular Destinations</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDestinations.map(destination => (
              <div 
                key={destination.id}
                className="relative rounded-lg overflow-hidden group cursor-pointer shadow-md"
                onClick={() => handleDestinationClick(destination.name)}
              >
                <img 
                  src={destination.image} 
                  alt={destination.name} 
                  className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                  <h3 className="text-xl font-bold text-white">{destination.name}</h3>
                  <p className="text-white/80">{destination.count} properties</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="py-16 bg-neutral-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8">Featured Hotels</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredHotels.map(hotel => (
              <div 
                key={hotel.id}
                className="card group cursor-pointer"
                onClick={() => handleHotelClick(hotel.id)}
              >
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={hotel.image} 
                    alt={hotel.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">{hotel.name}</h3>
                    <div className="flex items-center bg-primary-500 text-white px-2 py-1 rounded text-sm">
                      <FaStar className="mr-1" />
                      {hotel.rating}
                    </div>
                  </div>
                  <p className="text-neutral-600 mb-3">{hotel.location}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-lg font-bold text-primary-500">${hotel.price}</span>
                      <span className="text-neutral-500 text-sm"> /night</span>
                    </div>
                    <Button 
                      variant="outlined"
                      size="small"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-4 text-center">Why Choose Hoteluxe</h2>
          <p className="text-neutral-600 max-w-3xl mx-auto text-center mb-12">
            We make booking hotels simple, affordable, and stress-free.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mb-4">
                <FaHotel className="text-2xl text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Extensive Selection</h3>
              <p className="text-neutral-600">
                Access thousands of hotels worldwide, from budget-friendly to luxury stays.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mb-4">
                <FaWallet className="text-2xl text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Price Guarantee</h3>
              <p className="text-neutral-600">
                We promise the best rates with no hidden fees or surprise charges.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mb-4">
                <FaPhone className="text-2xl text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-neutral-600">
                Our dedicated support team is always available to assist you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Book Your Next Stay?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied travelers who book with Hoteluxe.
            Get exclusive deals and offers today!
          </p>
          <Button 
            variant="accent"
            size="large"
            onClick={() => navigate('/search')}
          >
            Find Hotels Now
          </Button>
        </div>
      </section>
    </div>
  )
}

export default HomePage