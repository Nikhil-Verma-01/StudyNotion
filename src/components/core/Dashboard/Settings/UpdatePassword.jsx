import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../../../../services/operations/SettingsAPI';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import IconBtn from "../../../common/IconBtn"

const UpdatePassword = () => {
    const {token} = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [showOldPassowrd, setOldShowPassowrd] = useState();
    const [showNewPassword, setShowNewPassword] = useState();

    const {
        register, handleSumbit, formState: {errors},
    } = useForm();

    const submitPasswordForm= async (data) => {
        try {
            await changePassword(token, data)
        } catch (error) {
            console.log("Error message: ", error.messgae);
        }
    }
  return (
    <>
        <form onSubmit={handleSumbit(submitPasswordForm)}>
            <div className='my-10 flex flex-col gap-y-6 rounded-md bordre-[1px] border-richblue-700 bg-richblack-800 p-8 px-12'>
                <h2 className='text-lg font-semibold text-richblack-5'>Password</h2>
                <div className='flex flex-col gap-5 lg:flex-row'>
                    <div className='relative flex flex-col gap-2 lg:w-[48%]'>
                        <label htmlFor='oldPassword' className='label-style'>
                            Current Password 
                        </label>
                        <input
                            type={showOldPassowrd ? "text" : "password"}
                            name='oldPassword'
                            id='oldPassword'
                            placeholder='Enter Current Password'
                            className='form-style'
                            {...register("olaPassword", {required: true})}
                        />
                        <span className='absolute right-3 top-[38px] z-[10] cursor-pointer'
                        onClick={() => setOldShowPassowrd((prev) => !prev)}>
                            {showOldPassowrd ? (
                                <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>
                            ): (
                                <AiOutlineEye fontSize={24} fill='#AFB2BF'/>
                            )}
                        </span>
                        {errors.oldPassword && (
                            <span className='-mt-1 text-[12px] text-yellow-100'>
                                Please enter your Current Password
                            </span>
                        )}
                    </div>
                    <div className='relative flex flex-col gap-2 lg:w-[48%]'>
                        <label htmlFor='newPassword' className='label-style'>
                            New Password 
                        </label>
                        <input
                            type={showNewPassword ? "text" : "password"}
                            name='newPassword'
                            id='newPassword'
                            placeholder='Enter New Password'
                            className='form-style'
                            {...register("newPassword", {required: true})}
                        />
                        <span
                            onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                        >
                            {showNewPassword ? (
                                <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>
                            ): (
                                <AiOutlineEye fontSize={24} fill='#AFB2BF'/>
                            )}
                        </span>
                        {errors.newPassword && (
                            <span className='-mt-1 text-[12px] text-yellow-100'>
                                Please enter your New Password
                            </span>
                        )}
                    </div>
                </div>
            </div>
            
            <div className='flex justify-end gap-2'>
                <button
                    onClick={() => {
                        navigate("/dashboard/my-profile")
                    }}
                    className='cursor-pointer rounded-md bg-richblack-700 py-2 px-2 font-semibold text-richblack-25'
                >
                    Cancel
                </button>
                <IconBtn type="submit" text="Update"/>
            </div>
        </form>
    </>
  )
}

export default UpdatePassword