import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import useOnClickOutside from '../../../hooks/useOnClickOutside'
import { AiOutlineCaretDown } from 'react-icons/ai'
import { VscDashboard, VscSignOut } from 'react-icons/vsc'
import { logout } from '../../../services/operations/authAPI'

const ProfileDropdown = () => {
  const {user} = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useOnClickOutside(ref, () => setOpen(false));

  if(!user) return null;

  return (
    <button className='relative' onClick={() => setOpen(true)}>
      <div className='flex items-center gap-x-1'>
        <img 
          src={user?.image} alt={`profile-${user?.firstName}`}
          className='aspect-sqaure w-[30px] rounded-full object-cover'
        />
        <AiOutlineCaretDown className='text-sm text-richblack-100'/>
      </div>
      {open && (
        <div className='absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md
        border-[1px] border-richblack-700 bg-richblack-800' ref={ref}
        onClick={(e) => e.stopPropagation()}>
          <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
            <div>
              <VscDashboard className='text-lg'/>
            </div>
          </Link>

          <div  className='flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100
           hover:bg-richblack-700 hover:text-richblack-25'
          onClick={() => {dispatch(logout(navigate))
           setOpen(false)}}>
            <VscSignOut className='text-lg'/>
            Logout
          </div>

        </div>
      )}

    </button>
  )
}

export default ProfileDropdown