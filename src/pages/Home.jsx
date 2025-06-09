import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import HighlightText from '../components/core/HomePage/HighlightText'
import CTAButton from '../components/core/HomePage/CTAButton'
import Banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../components/core/HomePage/CodeBlocks'
import Timeline from '../components/core/HomePage/Timeline'
import LearningLanguage from '../components/core/HomePage/LearningLanguage'
import InstructorSection from '../components/core/HomePage/InstructorSection'
import ExploreMore from '../components/core/HomePage/ExploreMore'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'

const Home = () => {
  return (
    <div>

        {/* Section 1 */}
        <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center justify-center text-white'>
            <Link to={"/signup"}>
                <div className='group mt-16 p-1mx-auto rounded-full bg-richblack-800 font-bold text-richblack-5
                transition-all duration-200 hover:scale-95 w-fit shadow-sm shadow-richblack-200'>
                    <div className='flex flex-row items-center gap-2 rounded-full px-10 py-1
                    transition-all duration-200 group-hover:bg-richblack-900'>
                        <p>Become an Instuctor</p>
                        <FaArrowRight/>
                    </div>
                </div>
            </Link>

            <div className='text-4xl text-center mt-7 font-semibold ml-4'>
                Empower your Future with
                <HighlightText text={"Coding Skills"}/>
            </div>

            <div className='w-[90%] text-center text-lg font-bold text-richblack-300 mt-4'>
                With our online coding courses, you can learn at your own pace, from anywhere in th world, and get access to a
                wealth of resources, including hands-on projects, quizzes and personalized feedback form instructors.
            </div>

            <div className='flex flex-row gap-7 mt-8'>
                <CTAButton active={true} linkto={"/signup"} >
                    Learn More
                </CTAButton>
                <CTAButton active={false} linkto={"/login"}>
                    Book a Demo
                </CTAButton>
            </div>

            <div className='mx-3 my-12'>
                <video muted loop autoPlay className='shadow-lg shadow-blue-100'>
                    <source src={Banner} type='video/mp4' 
                        height={515} width={1035}
                    />
                </video>
            </div>
         
        
            {/* CodeSpace 1 */}
            <div className='flex flex-row justify-evenly'>
                <CodeBlocks
                    position={"lg: flex-row"}
                    heading={
                        <div className='text-4xl font-semibold ml-4'>
                            Unlock Your
                            <HighlightText text={"coding potential"}/>
                            with our online courses
                        </div>
                    }
                    subheading={
                        "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                    }
                    ctabtn1={
                        {
                            btnText: "Try it yourself",
                            linkto: "/signup",
                            active: true,
                        }
                    }
                    ctabtn2={
                        {
                            btnText: "Learn more",
                            linkto: "/login",
                            active: false,
                        }
                    }

                    codeblock={`<<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\n`}
                    codeColor={"text-yellow-25"}

                />
            </div>
            
            {/* Code Section 2 */}
            <div>
                <CodeBlocks
                    position={"lg: flex-row-reverse"}
                    heading={
                        <div className='text-4xl font-semibold ml-4'>
                            Start 
                            <HighlightText text={"coding in seconds"}/>
                            
                        </div>
                    }
                    subheading={
                        "Go ahead, give it a try. Our hands-on learning environmen means you'll be writing real code from your very first lesson."
                    }
                    ctabtn1={
                        {
                            btnText: "Continue Lesson",
                            linkto: "/signup",
                            active: true,
                        }
                    }
                    ctabtn2={
                        {
                            btnText: "Learn More",
                            linkto: "/login",
                            active: false,
                        }
                    }

                    codeblock={`head><title>Example</title><linkrel="stylesheet"href="styles.css">`}
                    codeColor={"text-yellow-25"}

                />
            </div>
        </div>

        <div className='w-11/12 flex item-center justify-center'>
            <ExploreMore/>
        </div>

        {/* Section 2 */}
        <div className='bg-pure-greys-5 text-richblack-700'>
            <div className='homepage_bg h-[310px]'>

                <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-center gap-5 mx-auto'>
                    <div className='h-[150px]'></div>
                    <div className='flex flex-row gap-7 text-white'>
                        <CTAButton active={true} linkto={"/signup"}>
                            <div className='flex items-center gap-3'>
                                Explore Full Catalog
                                <FaArrowRight/>
                            </div>
                        </CTAButton>

                        <CTAButton active={false} linkto={"/signup"}>
                            <div>
                                Learn More
                            </div>
                        </CTAButton>
                    </div>
                </div>
            </div>

            <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>
                <div className='flex flex-row gap-5 mb-10 mt-[95px]'>
                    <div className='text-4xl font-semibold w-[45%]'>
                        Get the Skills you need for a
                        <HighlightText text={"Job that is in demand"}/>
                    </div>

                    <div className='flex flex-col gap-10 w-[40%] items-start'>
                        <div className='text-[16px]'>
                            The modern StudyNotion is the dicates its own terms. Today, to be a competitive
                            specialist requires more than professional skills.
                        </div>

                        <CTAButton active={true} linkto={"/signup"}>
                            Learn More
                        </CTAButton>

                    </div>

                </div>
            

                <Timeline/>

                <LearningLanguage/>

            </div>
            
        </div>

        
        {/* Section 3 */}

        <div className='w-11/12 mx-auto max-w-maxContent items-center justify-between gap-8 first-letter 
        bg-richblack-900 flex-col text-white'>

            <InstructorSection/>

            <h2 className='text-center texxt-4xl font-semibold mt-10'>
                Review form others learners
            </h2>
        </div>


        {/* Footer */}
        <Footer/>


    </div>
  )
}

export default Home