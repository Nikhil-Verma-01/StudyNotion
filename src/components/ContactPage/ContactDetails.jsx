import React from 'react'
import * as Icon1 from "react-icons/bi"
import * as Icon3 from "react-icons/hi2"
import * as Icon2 from "react-icons/io5"


const contactDetails = [
    {
        icon: "HiChatBubbleLeftRight",
        heading: "Chat on us",
        descritpion: "Our friendly team",
        details: "info@studynotion.com",
    },
    {
        icon: "BiWorld",
        heading: "Visit us",
        descritpion: "Come and say hello at our office HQ.",
        details: "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
    },
    {
        icon: "IoCall",
        heading: "Call us",
        descritpion: "Mon - Fri From 8am to  5pm",
        details: "+123 456 7869",
    },

]

const ContactDetails = () => {
  return (
    <div className='flex flex-col gap-6 rounded-xl bg-richblack-800 p-4 lg:p-6'>
        {contactDetails.map((element, index) => {
            let Icon = Icon1[element.icon] || Icon2[element.icon] || Icon3[element.icon]
            return(
                <div className='flex flex-col gap-[2px] p-3 text-sm text-richblack-200' key={index}>
                    <div className='flex flex-row items-center gap-3'>
                        <Icon size={25}/>
                        <h1 className='text-lg font-semibold text-richblack-5'>
                            {element.heading}
                        </h1>
                    </div>
                    <p className='font-medium'>{element?.descritpion}</p>
                    <p className='font-semibold'>{element?.details}</p>
                </div>
            )
        })}
    </div>
  )
}

export default ContactDetails