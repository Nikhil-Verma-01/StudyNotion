
import HighlightText from './HighlightText'
import known_you_progress from "../../../assets/Images/Know_your_progress.png"
import compare_with_others from "../../../assets/Images/Compare_with_others.png"
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton from '../HomePage/CTAButton'



const LearningLanguage = () => {
  return (
    <div className='mt-[130px] mb-32'>
        <div className='flex flex-col gap-5 items-center'>

            <div>
                Your Swiss Knife for 
                <HighlightText text={"learning for language"}/>
            </div>

            <div className='text-center text-richblack-600 mx-auto font-medium w-[70%]'>
                Using spin 
            </div>

            <div className='flex flex-row items-center justify-center mt-5'>
                <img src={known_you_progress} alt='Know Yor Progress'
                    className='object-contain -mr-24'
                />
                <img src={compare_with_others} alt='Comapre with others'
                    className='object-contain'
                />
                <img src={plan_your_lesson} alt='Plan your lessons'
                    className='object-contain mr-24'
                />
            </div>

            <div className='w-fit'>
                <CTAButton active={true} linkto={"/signup"}>
                    <div>
                        Learn More
                    </div>

                </CTAButton>
            </div>
        </div>
    </div>
  )
}

export default LearningLanguage