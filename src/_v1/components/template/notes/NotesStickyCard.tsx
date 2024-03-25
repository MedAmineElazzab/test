import { Divider, Image, Paper, Text } from '@mantine/core'


const NotesStickyCard = ({ topics }: any) => {
    const topicElements = topics.map((topic: any, index: any) => (
        <Text key={index} fw={600} className='mt-3 bg-[#0049E01A] text-[#0049E0] text-sm rounded py-1 px-2 mr-2 w-fit'>
            {topic}
        </Text>
    ))
    return (
        <div className='sticky top-20'>
            <Paper className='bg-white h-[190px]'>
                <div className='flex'>
                    <div className='ml-6 mt-9 h-[1rem] w-[2rem] '>
                        <Image src='/assets/shape-meducate-logo.svg' alt='logo' />
                    </div>

                    <div className='ml-7'>
                        <Text fw={600} className='mt-5'>
                            Partenaire: Meducate
                        </Text>
                        <Text fw={600} className='mt-1 bg-[#0049E01A] text-[#0049E0] text-sm rounded py-1 px-2 mr-2 w-fit'>
                            Top Partenaire
                        </Text>
                    </div>
                </div>

                <Divider size='xs' className='mt-4 ml-3 w-[90%] flex justify-center items-center' />

                <div className='flex'>
                    <div className='ml-6 mt-9 h-[1rem] w-[2rem] '>
                        <Image src='/assets/shape-meducate-logo.svg' alt='logo' />
                    </div>

                    <div className='ml-7'>
                        <Text fw={600} className='mt-5'>
                            Partenaire: Meducate
                        </Text>
                        <Text fw={600} className='mt-1 bg-[#0049E01A] text-[#0049E0] text-sm rounded py-1 px-2 mr-2 w-fit'>
                            Top Partenaire
                        </Text>
                    </div>
                </div>
            </Paper>
            <Paper className='bg-white mt-4 p-6'>{topicElements}</Paper>
        </div>
    )
}

export default NotesStickyCard
