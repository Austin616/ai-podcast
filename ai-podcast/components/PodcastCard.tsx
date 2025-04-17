import React from 'react'
import Image from 'next/image'
import { PodcastCardProps } from '@/types'
import { useRouter } from 'next/navigation'


const PodcastCard: React.FC<PodcastCardProps> = ({ podcastId, title, description, imgUrl }) => {
  const router = useRouter()

  const handleViewPodcast = () => {
    router.push(`/podcast/${podcastId}`, {
      scroll: true,
    }
  )
    
  }
  return (

    <div onClick={handleViewPodcast} className='cursor-pointer'>
        <figure className='flex flex-col gap-2'>
            <Image
                src={imgUrl}
                alt={title}
                width={174}
                height={174}
            />
        </figure>
        <div className='flex flex-col'>
            <h1 className='text-16 font-bold text-white-1 truncate'>{title}</h1>
            <p className='text-12 font-normal text-white-4 capitalize'>{description}</p>
        </div>
    </div>
  )
}

export default PodcastCard