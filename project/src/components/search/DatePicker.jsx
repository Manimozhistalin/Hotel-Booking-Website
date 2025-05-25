import React, { useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import { addDays } from 'date-fns'
import Button from '../common/Button'

const DatePicker = ({ startDate, endDate, onSelect }) => {
  const [dateRange, setDateRange] = useState({
    startDate: startDate || null,
    endDate: endDate || null,
  })

  const handleDateChange = (dates) => {
    const [start, end] = dates
    setDateRange({
      startDate: start,
      endDate: end,
    })
  }

  const handleApply = () => {
    onSelect(dateRange.startDate, dateRange.endDate)
  }

  const handleClear = () => {
    setDateRange({ startDate: null, endDate: null })
  }

  return (
    <div className="bg-white shadow-dropdown rounded-lg p-4 animate-fade-in">
      <ReactDatePicker
        selected={dateRange.startDate}
        onChange={handleDateChange}
        startDate={dateRange.startDate}
        endDate={dateRange.endDate}
        selectsRange
        inline
        minDate={new Date()}
        monthsShown={2}
        calendarClassName="custom-calendar-styles"
      />
      <div className="flex justify-between mt-4">
        <Button
          variant="outlined"
          size="small"
          onClick={handleClear}
        >
          Clear
        </Button>
        <Button
          variant="primary"
          size="small"
          onClick={handleApply}
        >
          Apply
        </Button>
      </div>
    </div>
  )
}

export default DatePicker