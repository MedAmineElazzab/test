import { Input, Select } from '@/_v1/components/Inputs'
import CaseIcon from '@/_v1/icons/sources/CaseIcon'
import DNAIcon from '@/_v1/icons/sources/DNAIcon'
import ProfileIcon from '@/_v1/icons/sources/ProfileIcon'
import SearchBoxIcon from '@/_v1/icons/sources/SearchBoxIcon'
import { Container, Paper } from '@mantine/core'

interface SeriesSearchCardProps {
    // Define your props here if needed
}

const SeriesSearchCard: React.FC<SeriesSearchCardProps> = () => {
    const inputComponents = [
        <Input
            key={0}
            icon={<SearchBoxIcon />}
            placeholder='Mots-clés'
            sx={{
                input: {
                    padding: '18px'
                }
            }}
        />,
        <Select
            data={[]}
            key={1}
            icon={<ProfileIcon />}
            placeholder='Profil'
            sx={{
                input: {
                    padding: '18px'
                }
            }}
        />,
        <Select
            data={[]}
            key={2}
            icon={<CaseIcon />}
            placeholder='Spécialité'
            sx={{
                input: {
                    padding: '18px'
                }
            }}
        />,
        <Select
            data={[]}
            key={3}
            icon={<DNAIcon />}
            placeholder='Pathologie'
            sx={{
                input: {
                    padding: '18px'
                }
            }}
        />
    ]

    return (
        <Container className='max-w-screen' fluid>
            <Paper className='shadow-xs p-2 rounded-lg flex relative '>
                <div className='grid grid-flow-col justify-stretch w-[92%]'>
                    {inputComponents.map((input, index) => (
                        <>
                            <div key={index} className='mr-2'>
                                {input}
                            </div>
                        </>
                    ))}
                </div>
                <button className='hover:cursor-pointer text-white text-sm absolute right-2 top-2 mt-[1px] p-2 px-4 rounded bg-[#0049E0]'>Rechercher</button>
            </Paper>
        </Container>
    )
}

export default SeriesSearchCard
