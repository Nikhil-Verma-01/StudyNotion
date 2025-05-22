import React from 'react'

const CourseCard = ({cardData, currentCard, setCurrentCard}) => {
  return (
    <div className='flex flex-row'>
        <div className={`flex flex-col ${currentCard === setCurrentCard ? "": ""}`}>
            <h className='text-3xl font-bold'>{cardData.heading}</h>
            <p className='text-lg text-richblack-600'>{cardData.description}</p>

            {/* {2 icons} */}
        </div>

    </div>
  )
}

export default CourseCard