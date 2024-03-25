
import CertificationIcon from '@/_v1/icons/sources/CertificationIcon'
import ShareIcon from '@/_v1/icons/sources/ShareIcon'
import StarIcon from '@/_v1/icons/sources/StarIcon'
import { toFrenchNumber } from '@/_v1/lib/utils'
import { Badge, Card, Image, Text } from '@mantine/core'

interface SeriesCardProps {
  numberOfModules: number
  duration: string
  certified: boolean
  title: string
  stars: number
  reviewCount: number
}

const SeriesCard: React.FC<SeriesCardProps> = (props) => {
  const { numberOfModules, duration, certified, title, stars, reviewCount } =
    props

  return (
    <Card shadow='sm' padding='lg' radius='md' withBorder className='h-full'>
      <Card.Section component='a' href='#' className='relative'>
        <div className='relative'>
          <Image
            src='assets/images/doctorImage.jpeg'
            height={160}
            alt='series'
          />
          <Badge
            color='rgba(0, 73, 224, 1)'
            size='lg'
            radius='md'
            fw={400}
            className='absolute top-2 right-2 text-white bg-[#0049E0]'
          >
            {numberOfModules} Modules
          </Badge>
          <Badge
            color='red'
            radius='md'
            fw={400}
            className='absolute bottom-2 left-2 bg-[#242730]/50 text-white'
          >
            {duration}
          </Badge>
          <div className='mb-2 bottom-2 right-2 flex items-center justify-center bg-white text-[#0049E0] w-[32px] h-[32px] rounded-full absolute top-2 left-2'>
            <ShareIcon />
          </div>
        </div>
      </Card.Section>

      {certified ? (
        <div className='flex my-4'>
          <CertificationIcon />
          <Text size='sm' color='rgba(0, 73, 224, 1)' className='mt-[2px]'>
            Certification
          </Text>
        </div>
      ) : (
        <div className='flex my-4' style={{ opacity: 0.4 }}>
          <div style={{ opacity: 0.4 }}>
            <CertificationIcon />
          </div>
          <Text size='sm' color='rgba(0, 73, 224, 0.5)' className='mt-[2px]'>
            Certification
          </Text>
        </div>
      )}

      <Text size='sm'>{title}</Text>
      <div className='mt-3 flex'>
        <Text size='md' fw={600}>
          {stars}
        </Text>
        <div className='m-1'>
          <StarIcon />
        </div>
        <div className='ml-4 mt-[2px]'>
          <Text size='sm' c='dimmed'>
            ({toFrenchNumber(reviewCount)} reviews)
          </Text>
        </div>
      </div>
    </Card>
  )
}

export default SeriesCard
