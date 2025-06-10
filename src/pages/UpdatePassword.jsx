import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { resetPassword } from '../services/operations/authAPI';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';

const UpdatePassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    })
    const {loading} = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const {password, confirmPassword} = formData;

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }
    const handleOnSubmit = (e) => {
        e.preventDefault();
        const token = location.pathname.split("/").at(-1)
        dispatch(resetPassword(password, confirmPassword, token, navigate))
    }

  return (
    <div>
        {
            loading ? (
                <div className='spinner'></div>
            ) : (
                <div className='max-w-[500] p-4 lg:p-8'>
                    <h1>Choose new Password</h1>
                    <p>Almost done. Enter ypur new password and youre all set.</p>
                    <form onSubmit={handleOnSubmit}>
                        <label className='relative'>
                            <p>New Password<sup className='text-pink-200'>*</sup></p>
                            <input
                                required
                                type={showPassword ? "text" : "password"}
                                name='password'
                                value={password}
                                onChange={handleOnChange}
                                placeholder='Enter Password'
                                className='form-style w-full !pr-10'
                            />
                            <span onClick={() => setShowPassword((prev) => !prev)}
                            className='absolute right-3 top-[38px] z-[10] cursor-pointer'>
                                {showPassword ? (
                                    <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>
                                ): (
                                    <AiOutlineEye fontSize={24}/>
                                )}
                            </span>
                            
                        </label>

                        <label className='relative'>
                            <p>New Password<sup className='text-pink-200'>*</sup></p>
                            <input
                                required
                                type={showConfirmPassword ? "text" : "password"}
                                name='confirmPassword'
                                value={confirmPassword}
                                onChange={handleOnChange}
                                placeholder='Confirm Password'
                                className='form-style w-full !pr-10'
                            />
                            <span onClick={() => setShowConfirmPassword((prev) => !prev)}
                            className='absolute right-3 top-[38px] z-[10] cursor-pointer'>
                                {showConfirmPassword ? (
                                    <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>
                                ): (
                                    <AiOutlineEye fontSize={24}/>
                                )}
                            </span>
                            
                        </label>

                        <button type='submit' 
                        className='mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900'>
                            Reset Password
                        </button>

                    </form>

                    <div className='mt-6 flex items-center justify-between'>
                        <Link to='/login'>
                            <p>
                                <BiArrowBack/> Back To Login
                            </p>
                        </Link>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default UpdatePassword