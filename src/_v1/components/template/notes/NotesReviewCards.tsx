
import { Input } from '@/_v1/components/Inputs'
import StarIcon from '@/_v1/icons/sources/StarIcon'
import { toFrenchNumber } from '@/_v1/lib/utils'
import { Checkbox, Progress, Text, Textarea } from '@mantine/core'

const reviewsData = [
    {
        stars: '5 stars',
        progressValue: 89,
        percentage: '89.80%'
    },
    {
        stars: '4 stars',
        progressValue: 10,
        percentage: '9.38%'
    },
    {
        stars: '3 stars',
        progressValue: 2,
        percentage: '0.59%'
    },
    {
        stars: '2 stars',
        progressValue: 2,
        percentage: '0.17%'
    },
    {
        stars: '1 star',
        progressValue: 2,
        percentage: '0.21%'
    }
]

const NotesReviewCards = () => {
    return (
        <div className='lg:flex p-10  lg:pl-[5rem]'>
            <div className='w-[45%]'>
                <Text fw={700} size='xl'>
                    Learner reviews
                </Text>
                <div className='mt-2 flex'>
                    <div className='m-1 mt-[5px]'>
                        <StarIcon />
                    </div>
                    <Text size='md' fw={700} className='text-xl'>
                        4.5
                    </Text>
                    <div className='ml-4 mt-[4px]'>
                        <Text size='sm'>{toFrenchNumber(8002)} reviews</Text>
                    </div>
                </div>

                <div className='mt-3'>
                    {reviewsData.map((item, index) => (
                        <div key={index} className='flex my-1'>
                            <Text size='xs' fw={700}>
                                {item.stars}
                            </Text>
                            <Progress color='indigo' value={item.progressValue} size='sm' className='lg:w-[200px] w-[100px] m-2' />
                            <Text size='xs' fw={300}>
                                {item.percentage}
                            </Text>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <Text fw={700} size='xl'>
                    Learner reviews
                </Text>
                <Text fw={400} size='sm' c='dimmed'>
                    Your email address will not be published. Required fields are marked *
                </Text>

                <div className='flex'>
                    <Input placeholder='Your Name *' className='mt-3 w-[20rem] mr-4' />
                    <Input placeholder='Your Email *' className='mt-3 w-[20rem]' />
                </div>
                <Textarea size='xl' className='mt-3' />
                <Checkbox size='xs' defaultChecked label='Save my name, email, and website in this browser for the next time I comment.' className='mt-2 ml-[2px]' color='rgba(0, 73, 224, 1)' />
                <button className='hover:cursor-pointer mt-3 ml-[2px] text-white p-2 px-6 rounded-[3px] bg-[#0049E0] text-xs'>Post Comment</button>
            </div>
        </div>
    )
}

export default NotesReviewCards
