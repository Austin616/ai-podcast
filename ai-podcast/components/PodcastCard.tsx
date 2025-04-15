import React from 'react'
import Image from 'next/image'

const PodcastCard: React.FC<{
    imgURL: string;
    title: string;
    description: string;
    podcastId: number;
}> = ({ imgURL, title, description, podcastId }) => {
  return (
    <div className='cursor-pointer'>
        <figure className='flex flex-col gap-2'>
            <Image
                src={imgURL}
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
