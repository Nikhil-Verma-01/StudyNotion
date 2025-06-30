import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operations/authAPI'

const EnrolledCourses = () => {
    const {token} = useSelector((state) => state.auth);

    const [enrolledCourses, setEnrolledCourses] = useState(null);

    const getEnrolledCourses = async () => {
        try {
            const response = await getUserEnrolledCourses(token);
            setEnrolledCourses(response);
        } catch (error) {
            console.log("Unable to Fetch Enrolled Courses");
        }
    }
  return (
    <div>EnrolledCourses</div>
  )
}

export default EnrolledCourses