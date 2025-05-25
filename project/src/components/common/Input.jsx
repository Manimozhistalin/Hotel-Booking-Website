import React from 'react'

const Input = ({
  label,
  type = 'text',
  id,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  className = '',
  icon,
  ...props
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-neutral-700 mb-1">
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
            {icon}
          </div>
        )}
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`input-field ${icon ? 'pl-10' : 'pl-3'} ${error ? 'border-error-500 focus:ring-error-300' : ''}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-error-500">{error}</p>}
    </div>
  )
}

export default Input