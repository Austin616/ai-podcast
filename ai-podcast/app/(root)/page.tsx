import PodcastCard from "@/components/PodcastCard";
import { podcastData } from "@/constants";

const Home = () => {
  return (
    <div className="mt-9 flex flex-col gap-9">
      <section className="flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">Trending Podcasts</h1>
        
        {podcastData.map(({ id, title, description, imgURL }) => (
          <PodcastCard
            key={id}
            podcastId={id}
            title={title}
            description={description}
            imgURL={imgURL}
          />
        ))}
        
      </section>
    </div>
  );
};

export default Home;
