import React from 'react'
import { Link } from 'react-router-dom'

const CTAButton = ({children, active, linkto}) => {
  return (
    <Link to={linkto}>
        <div className={`text-center text-[15px] px-6 py-3 rounded-md font-semibold
        ${active ? "bg-yellow-50 text-black shadow-sm shadow-richblack-25" : "bg-richblack-800 shadow-sm shadow-richblack-500"} hover:scale-95 transition-all duration-200` }>
            {children}
        </div>
    </Link>
  )
}

export default CTAButton