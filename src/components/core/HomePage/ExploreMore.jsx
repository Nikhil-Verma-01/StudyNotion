import React, { useState } from 'react'
import HighlightText from './HighlightText';
import { HomePageExplore } from '../../../data/homepage-explore';
import CourseCard from './CourseCard';

const tabsName = [
    "Free",
    "New to Coding",
    "Most Popular",
    "Skills paths",
    "Career paths",
];

const ExploreMore = () => {
    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);

        if(result.length > 0){
            setCourses(result[0].courses);
            setCurrentCard(result[0].courses[0].heading);

        }
    }

  return (
    <div>
        
        <div className='text-4xl font-semibold text-center my-10 text-white'>
            Unlock the
            <HighlightText text={"Power of Code"}/>
            <p className='text-center text-richblack-300 text-lg font-semibold mt-1'>
                Learn to build anything you can imagine
            </p>
        </div>

     

        {/* Tab Section */}
        <div className="hidden lg:flex gap-5 -mt-5 mx-auto w-max bg-richblack-800 text-richblack-200 p-1 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]">
            {tabsName.map((ele, index) => {
                return (
                    <div
                    className={` text-[16px] flex flex-row items-center gap-2 ${
                        currentTab === ele
                        ? "bg-richblack-900 text-richblack-5 font-medium"
                        : "text-richblack-200"
                    } px-7 py-[7px] rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5`}
                    key={index}
                    onClick={() => setMyCards(ele)}
                    >
                    {ele}
                    </div>
                );
            })}
        </div>

        <div className='hidden lg:block lg:h-[200px]'></div>
        
        {/* Card Section */}
        <div className="lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[15] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-100%] text-black lg:mb-0 mb-7 lg:px-0 px-3">
            {
                courses.map((element, index) => {
                    return(
                        <CourseCard
                            key={index}
                            cardData = {element}
                            currentCard = {currentCard}
                            setCurrentCard = {setCurrentCard}

                        />
                    );
                })
            }
        </div>
    </div>
  )
}

export default ExploreMore