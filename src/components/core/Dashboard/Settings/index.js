import React from 'react'
import EditProfile from './EditProfile'
import DeleteAccount from './DeleteAccount'
import UpdatePassword from './UpdatePassword'
import ChangeProfilePicture from './ChangeProfilePicture'

const Settings = () => {
  return (
    <>
        <h1 className='mb-14 text-3xl font-medium text-richblack-5' >
            Edit Profile
        </h1>

        <ChangeProfilePicture/>
        <EditProfile/>
        <UpdatePassword/>
        <DeleteAccount/>
    </>
  )
}

export default Settings