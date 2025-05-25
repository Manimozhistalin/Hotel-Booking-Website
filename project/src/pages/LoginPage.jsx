import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import { useAuth } from '../hooks/useAuth'

const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, login } = useAuth()
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState('')
  
  // If user is already logged in, redirect to home
  useEffect(() => {
    if (user) {
      const redirect = location.state?.redirect || '/'
      navigate(redirect)
    }
  }, [user])

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
    
    // Clear error when field is edited
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: ''
      }))
    }
    
    // Clear login error when form is edited
    if (loginError) {
      setLoginError('')
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev)
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    // For demo purposes, let's use a simple login
    // In a real app, this would make an API call
    if (formData.email === 'demo@example.com' && formData.password === 'password') {
      const userData = {
        id: '1',
        firstName: 'Demo',
        lastName: 'User',
        email: formData.email,
        phone: '+1 (555) 123-4567',
      }
      
      const success = login(userData)
      
      if (success) {
        const redirect = location.state?.redirect || '/'
        navigate(redirect)
      }
    } else {
      // For demo, allow any email/password with minimum length
      if (formData.password.length >= 6) {
        const firstName = formData.email.split('@')[0]
        const userData = {
          id: Date.now().toString(),
          firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
          lastName: 'User',
          email: formData.email,
          phone: '+1 (555) 123-4567',
        }
        
        const success = login(userData)
        
        if (success) {
          const redirect = location.state?.redirect || '/'
          navigate(redirect)
        }
      } else {
        setLoginError('Invalid email or password')
      }
    }
  }

  return (
    <div className="min-h-screen pt-20 bg-neutral-100 flex items-center">
      <div className="container-custom py-6">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
            
            {loginError && (
              <div className="mb-4 bg-error-50 text-error-700 p-3 rounded-md">
                {loginError}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <Input
                label="Email"
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                icon={<FaEnvelope />}
                error={errors.email}
                required
              />
              
              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  icon={<FaLock />}
                  error={errors.password}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-9 text-neutral-500"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 text-primary-500 focus:ring-primary-400 border-neutral-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-neutral-700">
                    Remember me
                  </label>
                </div>
                
                <a href="#" className="text-sm text-primary-500 hover:text-primary-600">
                  Forgot password?
                </a>
              </div>
              
              <Button
                variant="primary"
                type="submit"
                fullWidth
                size="large"
              >
                Sign In
              </Button>
            </form>
            
            <p className="mt-6 text-center text-neutral-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary-500 hover:text-primary-600 font-medium">
                Sign Up
              </Link>
            </p>
          </div>
          
          <div className="mt-4 text-center text-xs text-neutral-500">
            <p>For demo purposes, you can use:</p>
            <p className="mt-1">Email: demo@example.com | Password: password</p>
            <p className="mt-1">Or sign in with any email and password (min 6 chars)</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage