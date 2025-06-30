import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';

const MyProfile = () => {
    const {user} = useSelector((state) => state.profile);
    const navigate = useNavigate();

  return (
    <div className='text-white'>
        <h1>
            My Profile
        </h1>
        {/* Section  1*/}
        <div>
            <div>
                <img
                    src={user.image}
                    alt={`profile-${user?.firstName}`}
                    className='aspect-square w-[78px] rounded-full object-cover'
                />
                <div>
                    <p>{user?.firstName + " " + user?.lastName}</p>
                    <p>{user?.email}</p>
                </div>
            </div>
            <IconBtn
                text="Edit"
                onClick={() => {
                    navigate("/dashboard/settings")
                }}
            >
            </IconBtn>
        </div>

        <div>
            <div>
                <p>About</p>
                <IconBtn
                    text="Edit"
                    onClick={() => {
                        navigate("/dashboard/settings")
                    }}
                />
            </div>
            <p>{user?.additionalDetails?.about ?? "Write Something about Yourself"}</p>
        </div>

        {/* Section 3 */}
        <div>
            <div>
                <p>Personal Details</p>
                <IconBtn
                    text="Edit"
                    onClick={() => {
                        navigate("/dashboard/settings")
                    }}
                />
            </div>
            <div>
                <div>
                    <p>Fist Name</p>
                    <p>{user?.firstName}</p>
                </div>
                <div>
                    <p>Email</p>
                    <p>{user?.email}</p>
                </div>
                <div>
                    <p>Gender</p>
                    <p>{user?.additionalDetails?.gender ?? "Add Gender"}</p>
                </div>
                <div>
                    <p>Last Name</p>
                    <p>{user?.lastName}</p>
                </div>
                <div>
                    <p>Phone Number</p>
                    <p>{user?.additionalDetails?.contactNumber ?? "Add Contact Number"}</p>
                </div>
                <div>
                    <p>Date of Birth</p>
                    <p>{user?.additionalDetails?.dateOfBirth ?? "Add Date of Birth"}</p>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default MyProfile