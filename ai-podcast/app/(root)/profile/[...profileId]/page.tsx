"use client";

import { useQuery } from "convex/react";
import EmptyState from "@/components/EmptyState";
import LoaderSpinner from "@/components/LoaderSpinner";
import PodcastCard from "@/components/PodcastCard";
import ProfileCard from "@/components/ProfileCard";
import { api } from "@/convex/_generated/api";

const ProfilePage = ({
  params,
}: {
  params: {
    profileId: string | string[]; // just in case
  };
}) => {
  const profileId = Array.isArray(params.profileId)
    ? params.profileId[0]
    : params.profileId;

  const user = useQuery(api.users.getUserById, {
    clerkId: profileId,
  });

  const podcastsData = useQuery(api.podcasts.getPodcastByAuthorId, {
    authorId: profileId,
  });

  const normalizedPodcasts = podcastsData?.podcasts?.map((p) => ({
    ...p,
    audioStorageId: p.audioStorageId ?? null,
    imageStorageId: p.imageStorageId ?? null,
    audioUrl: p.audioUrl ?? null,
    imageUrl: p.imageUrl ?? null,
  })) ?? [];
  

  if (!user || !podcastsData) return <LoaderSpinner />;

  return (
    <section className="mt-9 flex flex-col">
      <h1 className="text-20 font-bold text-white-1 max-md:text-center">
        Podcaster Profile
      </h1>
      <div className="mt-6 flex flex-col gap-6 max-md:items-center md:flex-row">
      <ProfileCard
  podcastData={{ ...podcastsData, podcasts: normalizedPodcasts }}
  imageUrl={user?.imageUrl!}
  userFirstName={user?.name!}
/>

      </div>

<section className="mt-9 flex flex-col gap-5">
  <h1 className="text-20 font-bold text-white-1">All Podcasts</h1>
  {podcastsData?.podcasts && podcastsData.podcasts.length > 0 ? (
    <div className="podcast_grid">
      {podcastsData.podcasts.slice(0, 4).map((podcast) => (
        <PodcastCard
          key={podcast._id}
          imgUrl={podcast.imageUrl!}
          title={podcast.podcastTitle!}
          description={podcast.podcastDescription}
          podcastId={podcast._id}
        />
      ))}
    </div>
  ) : (
    <EmptyState
      title="You have not created any podcasts yet"
      buttonLink="/create-podcast"
      buttonText="Create Podcast"
    />
  )}
</section>

    </section>
  );
};

export default ProfilePage;
