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
      Podcast Card
    </div>
  )
}

export default PodcastCard
