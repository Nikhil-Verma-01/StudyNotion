import React from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux'

const RenderCartCourses = () => {
    const {cart} = useSelector((state) => state.cart);
    const dispatch = useDispatch();

  return (
    <div>
        {
            cart.map((course, index) => (
                <div>
                    <div>
                        <img src={course?.thumbnail}/>
                        <div>
                            <p>{course?.courseName}</p>
                            <p>{course?.category?.name}</p>
                            <div>
                                <span>4.8</span>
                                {/* <ReactStars/> */}

                                <span>{course?.ratingAndReviews?.length} Ratings</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <button>
                            <RiDeleteBin6Line/>
                            <span>Remove</span>
                        </button>

                        <p>RS{course?.price}</p>
                    </div>
                </div>

            ))
        }
    </div>
  )
}

export default RenderCartCourses