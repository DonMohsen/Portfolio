import React from 'react'

const ButtonLoading = () => {
  return (
    <div className="flex items-center space-x-2">
    <div className="animate-wave h-3 w-3 bg-white rounded-full"></div>
    <div className="animate-wave h-3 w-3 bg-white rounded-full animation-delay-200"></div>
    <div className="animate-wave h-3 w-3 bg-white rounded-full animation-delay-400"></div>
  </div>  )
}

export default ButtonLoading