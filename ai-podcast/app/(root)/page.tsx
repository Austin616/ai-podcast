"use client";

import PodcastCard from "@/components/PodcastCard";
import { podcastData } from "@/constants";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { SignOutButton } from "@clerk/nextjs";

const Home = () => {
  const trendingPodcasts = useQuery(api.podcasts.getTrendingPodcasts);
  return (
    <div className="mt-9 flex flex-col gap-9">
      <section className="flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">Trending Podcasts</h1>

        {/* <div className="flex min-h-screen flex-col items-center justify-between p-24 text-white-1">
          
        </div> */}

        <div className="podcast_grid">
          {trendingPodcasts?.map(({ _id, podcastTitle, podcastDescription, imageUrl }) => (
            <PodcastCard
              key={_id}
              podcastId={parseInt(_id)}
              title={podcastTitle}
              description={podcastDescription}
              imgURL={imageUrl!}
            />
          ))}
        </div>
        <div className="mt-4">
          <SignOutButton>
            <button className="bg-red-500 text-white px-4 py-2 rounded">
              Sign Out
            </button>
          </SignOutButton>
        </div>
      </section>
    </div>
  );
};

export default Home;
