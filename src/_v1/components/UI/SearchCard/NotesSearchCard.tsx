import { Input, Select } from '@/_v1/components/Inputs'
import CalendarIcon from '@/_v1/icons/sources/CalendarIcon'
import CaseIcon from '@/_v1/icons/sources/CaseIcon'
import DNAIcon from '@/_v1/icons/sources/DNAIcon'
import SearchBoxIcon from '@/_v1/icons/sources/SearchBoxIcon'
import StackIcon from '@/_v1/icons/sources/StackIcon'
import XIcon from '@/_v1/icons/sources/XIcon'
import { useCategory } from '@/_v1/lib/hooks/queryHooks/category/useCategory'
import { usePathology } from '@/_v1/lib/hooks/queryHooks/pathology/usePathology'
import { useSpeciality } from '@/_v1/lib/hooks/queryHooks/speciality/useSpeciality'
import { Container, Paper, Tooltip } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import React, { useState } from 'react'

interface NotesSearchCardProps {
    setFilterOptions: (options: { title: string | undefined; speciality: string | undefined; category: string | undefined; pathology: string | undefined; createdAt: Date | undefined }) => void
}

const NotesSearchCard: React.FC<NotesSearchCardProps> = ({ setFilterOptions }) => {
    const { data: categories } = useCategory({})
    const { data: specialties } = useSpeciality({})
    const { data: pathologies } = usePathology({})

    const [selectedTitle, setSelectedTitle] = useState<string>('')
    const [selectedCategory, setSelectedCategory] = useState<string | null>('')
    const [selectedSpeciality, setSelectedSpeciality] = useState<string | null>('')
    const [selectedPathology, setSelectedPathology] = useState<string | null>('')
    const [selectedCreatedAt, setSelectedCreatedAt] = useState<Date | null>(null)

    const inputComponents = [
        <Input
            key={0}
            icon={<SearchBoxIcon />}
            placeholder='Mots-clés'
            value={selectedTitle}
            onChange={(e) => setSelectedTitle(e.target.value)}
            sx={{
                input: {
                    padding: '18px'
                }
            }}
        />,
        <Select
            data={
                categories
                    ? categories.map((item: any) => ({
                          value: item.id,
                          label: item.name
                      }))
                    : []
            }
            key={1}
            allowDeselect
            searchable
            clearable
            icon={<StackIcon />}
            placeholder='Catégorie'
            value={selectedCategory || ''}
            onChange={(selectedValue) => setSelectedCategory(selectedValue || '')}
            sx={{
                input: {
                    padding: '18px'
                }
            }}
        />,
        <Select
            data={
                specialties?.items
                    ? specialties?.items.map((item: any) => ({
                          value: item.id,
                          label: item.name
                      }))
                    : []
            }
            allowDeselect
            searchable
            key={2}
            icon={<CaseIcon />}
            placeholder='Spécialité'
            value={selectedSpeciality || ''}
            onChange={(selectedValue) => setSelectedSpeciality(selectedValue || '')}
            sx={{
                input: {
                    padding: '18px'
                }
            }}
        />,
        <Select
            data={
                pathologies
                    ? pathologies.map((item: any) => ({
                          value: item.id,
                          label: item.name
                      }))
                    : []
            }
            allowDeselect
            searchable
            key={3}
            icon={<DNAIcon />}
            placeholder='Pathologie'
            value={selectedPathology || ''}
            onChange={(selectedValue) => setSelectedPathology(selectedValue || '')}
            sx={{
                input: {
                    padding: '18px'
                }
            }}
        />,
        <DateInput
            key={4}
            placeholder='Date de création'
            icon={<CalendarIcon />}
            value={selectedCreatedAt}
            onChange={(date) => setSelectedCreatedAt(date)}
            sx={{
                input: {
                    padding: '18px',
                    width: '60%'
                }
            }}
        />
    ]

    const resetForm = () => {
        setSelectedTitle('')
        setSelectedCategory('')
        setSelectedSpeciality(null)
        setSelectedPathology(null)
        setSelectedCreatedAt(null)
        setFilterOptions({
            title: undefined,
            speciality: undefined,
            category: undefined,
            pathology: undefined,
            createdAt: undefined
        })
    }

    const isAnyFilterSelected = selectedTitle || selectedCategory || selectedSpeciality || selectedPathology || selectedCreatedAt

    const handleFormSubmit = (e: React.FormEvent | null) => {
        if (e) {
            e.preventDefault()
            setFilterOptions({
                title: selectedTitle || undefined,
                speciality: selectedSpeciality || undefined,
                category: selectedCategory || undefined,
                pathology: selectedPathology || undefined,
                createdAt: selectedCreatedAt || undefined
            })
        }
    }

    return (
        <Container className='w-full' fluid>
            <Paper className='shadow-xs p-2 rounded-lg flex relative'>
                <form className='lg:grid lg:grid-flow-col justify-stretch w-full' onSubmit={handleFormSubmit}>
                    {inputComponents.map((input, index) => (
                        <div key={index} className='mr-2 sm:mt-2 lg:mt-1'>
                            {input}
                        </div>
                    ))}
                    {isAnyFilterSelected && (
                        <Tooltip label='Reset' position='top'>
                            <div
                                className='mx-[9px] pl-[6px] pt-[6px] mt-2 mr-8 lg:ml-[-100px] sm:ml-2 rounded-full bg-[#94A3B8]/20 h-[30px] w-[30px] hover:cursor-pointer'
                                onClick={resetForm}
                                style={{ zIndex: 1 }}
                            >
                                <XIcon />
                            </div>
                        </Tooltip>
                    )}
                    <div className='flex lg:absolute right-0 top-3 mx-3 sm:ml-[15rem] sm:mt-2 lg:mt-0 lg:ml-0'>
                        <button type='submit' className='hover:cursor-pointer text-white text-sm mt-[1px] p-2 px-4 rounded bg-[#0049E0]'>
                            Rechercher
                        </button>
                    </div>
                </form>
            </Paper>
        </Container>
    )
}

export default NotesSearchCard
