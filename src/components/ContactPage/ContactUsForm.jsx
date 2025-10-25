import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import CountryCode from "../../data/countrycode.json"
import { apiConnector } from '../../services/apiconnector';
import { contactusEndpoint } from '../../services/apis';



const ContactUsForm = () => {
    const [loading, setLoading] = useState(false);
    const {
      register, handleSubmit, reset,
      formState: {errors, isSubmitSuccessful}
    } = useForm();

    const sumbitContactForm = async(data) => {
      console.log("Logging Data", data);
      try {
        setLoading(true);
        const response = await apiConnector(
          "POST",
          contactusEndpoint.CONTACT_US_API,
          data
        );
        console.log("Logging response", response);
        setLoading(false);

      } catch (error) {
        console.log("Error:", error.message);
        setLoading(false);
      }
    }

    useEffect(() => {
      if(isSubmitSuccessful){
        reset({
          email:"",
          firstName: "",
          lastName: "",
          message: "",
          phoneNo: "",
        })
      }
    }, [reset, isSubmitSuccessful]);


    return (
      <form className='flex flex-col gap-7'
      onSubmit={handleSubmit(sumbitContactForm)}>
        <div className='flex flex-col gap-14'>
          
          <div className='flex gap-5'>

            <div className='flex flex-col'>
              <label htmlFor='firstName'>First Name</label>
              <input
                type='text'
                name='firstName'
                id='firstName'
                placeholder='Enter first Name'
                className='text-black'
                {...register("firstName", {required: true})}
              />
              {
                errors.firstName && (
                  <span className='-mt-1 text-[12px] text-yellow-100'>
                    Please enter your name
                  </span>
                )
              }
            </div>

            <div className='flex flex-col'>
              <label htmlFor='lastName'>Last Name</label>
              <input
                type='text'
                name='lastName'
                id='lastName'
                className='text-black'
                placeholder='Enter Last Name'
                {...register("lastName")}
              />
            </div>

          </div>

          <div className='flex flex-col'>
            <label htmlFor='email' className='lable-style'>First Name</label>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='Enter email Address'
              className='text-black'
              {...register("email", {required: true})}
            />
            {
              errors.email && (
                <span className='-mt-1 text-[12px] text-yellow-100'>
                  Please enter your email Address
                </span>
              )
            }
          </div>

          <div className='flex flex-col'>
            <label htmlFor='phonenumber'>Phone Number</label>

            <div className='flex flex-row gap-1'>
              <select
                name='dropdown'
                id='dropdown'
                className='bg-yellow-50 w-[80px]'
                {...register("countrycode", {required: true})}
              >
                {
                  CountryCode.map((element, index) => {
                    return (
                      <option key={index} value={element.code}>
                        {element.code} -{element.country}
                      </option>
                    )
                  })
                }

              </select>

              <input
                type='number'
                name='phonenumber'
                id='phonenumber'
                placeholder='12345 67890'
                className='text-black w-[calc(100%-90px)]'
                {...register("phoneNo",
                {
                  required: {value:true, message:"Please enter Phone Number"},
                  maxLength: {value: 10, message: "Invalid Phone Number"},
                  minLength: {value: 8, message: "Invalid Phone Number"}
                })}
              />

            </div>
            {
              errors.phoneNo && (
                <span className='-mt-1 text-[12px] text-yellow-100'>
                  {errors.phoneNo.message}
                </span>
              )
            }

          </div>

          <div className='flex flex-col'>
            <label htmlFor='message'>First Name</label>
            <textarea
              name='message'
              id='message'
              cols="30" rows="7"
              placeholder='Enter your message here'
              className='text-black'
              {...register("firstName", {required: true})}
            />
            {
              errors.message && (
                <span className='-mt-1 text-[12px] text-yellow-100'>
                  Please enter your message
                </span>
              )
            }
          </div>     

        </div>

        <button
            disabled={loading}
            type='submit' 
            className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]
            ${
              !loading && 
              "transition-all duration-200 hover:scale-95 hover:shadow-none"
            } disabled:bg-richblack-500 sm:text-[16px]`}
          >
            Send Message
          </button>

      </form>
    )
}

export default ContactUsForm