
import { NotesCardProps } from '@/_v1/common/types'
import CalendarIcon from '@/_v1/icons/sources/CalendarIcon'
import CasePlusIcon from '@/_v1/icons/sources/CasePlusIcon'
import ShareIcon from '@/_v1/icons/sources/ShareIcon'
import { formatDateToFrench } from '@/_v1/lib/utils'
import Link from 'next/link'
// import { boomarkNote } from '@/api/note'
import { Tooltip } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { IconCheck } from '@tabler/icons-react'

const NotesCard: React.FC<NotesCardProps> = (props) => {
    const { slug, date, title, level, source, specialities, pathology } = props

    return (
        <>
            <div className='card bg-white p-4 shadow-sm hover:shadow-lg transition-all rounded-md h-full relative'>
                <Link href={`notes/${slug}`} className=' hover:cursor-pointer'>
                    {level && (
                        <div className='absolute top-2 right-2'>
                            <div className='bg-[#FD646F33] text-[#FC4755] text-sm rounded py-1 px-2 mr-2 mt-2'>{level}</div>
                        </div>
                    )}
                    <div className='flex'>
                        <div className='mr-1'>
                            <CalendarIcon color='#0049E0' />
                        </div>
                        {formatDateToFrench(date)}
                    </div>
                    <div className='mt-5'>{title}</div>
                    <div className='mt-5 bg-[#11A75C]/10 text-[#11A75C] text-sm rounded py-1 px-2 w-fit'>{source}</div>
                    <div className='w-[96%] mt-4'>
                        <div className='flex overflow-x-auto'>
                            {specialities.map((word, index) => (
                                <div key={index} className='mr-2 bg-[#E6EDFC] text-[#0049E0] text-xs rounded py-1 px-2 w-fit h-fit'>
                                    {word}
                                </div>
                            ))}
                            <div className='flex text-sm text-[#0049E0] mt-[2px]'>
                                <div className=''>
                                    <CasePlusIcon />
                                </div>
                                {pathology}
                            </div>
                        </div>
                    </div>
                </Link>
                <Tooltip label={'Bookmark Note'} withArrow position='top'>
                    <div
                        className='absolute bottom-4 right-2 flex items-center justify-center bg-[#0049E0] text-white w-[25px] h-[25px] rounded-full hover:cursor-pointer'
                        onClick={() => {
                            // boomarkNote(slug)
                            notifications.show({
                                id : "load-data",
                                color: 'blue',
                                title: <span className='font-bold'>Bookmark note</span>,

                                message: <span>Note bookmarked successfully!</span>,
                                icon: <IconCheck className='w-[25px] text-white' />,
                                autoClose: 4000,
                                styles: {
                                    icon: {
                                        width: '2.75rem',
                                        height: '2.75rem'
                                    }
                                }
                            })
                        }}
                    >
                        <ShareIcon />
                    </div>
                </Tooltip>
            </div>
        </>
    )
}

export default NotesCard
