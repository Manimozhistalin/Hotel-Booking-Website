import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Loader from './components/common/Loader'
import { AuthProvider } from './context/AuthContext'
import { BookingProvider } from './context/BookingContext'

// Lazy loaded pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'))
const SearchResultsPage = lazy(() => import('./pages/SearchResultsPage'))
const HotelDetailsPage = lazy(() => import('./pages/HotelDetailsPage'))
const BookingPage = lazy(() => import('./pages/BookingPage'))
const PaymentPage = lazy(() => import('./pages/PaymentPage'))
const BookingConfirmationPage = lazy(() => import('./pages/BookingConfirmationPage'))
const ProfilePage = lazy(() => import('./pages/ProfilePage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const SignupPage = lazy(() => import('./pages/SignupPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BookingProvider>
          <Layout>
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchResultsPage />} />
                <Route path="/hotel/:id" element={<HotelDetailsPage />} />
                <Route path="/booking/:hotelId/:roomId" element={<BookingPage />} />
                <Route path="/payment/:bookingId" element={<PaymentPage />} />
                <Route path="/booking-confirmation/:bookingId" element={<BookingConfirmationPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </Layout>
        </BookingProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App