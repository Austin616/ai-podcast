import React from "react";
import { GeneratePodcastProps } from "@/types";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";
import { useState } from "react";

const useGeneratePodcast = ({
  setAudioStorageId,
  setAudio,
  voiceType,
  voicePrompt,
  setVoicePrompt,
  setAudioDuration,
}: GeneratePodcastProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePodcast = async () => {
    setIsGenerating(true);

    setAudio("");

    if (!voicePrompt) {
      return setIsGenerating(false);
    }

    try {
        const response = await fetch("/api/generate-podcast", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            voiceType,
            voicePrompt,
            }),
        });
    
        if (!response.ok) {
            throw new Error("Failed to generate podcast");
        }
    
        const data = await response.json();
    
        setAudio(data.audioUrl);
        setAudioStorageId(data.audioStorageId);
        setAudioDuration(data.audioDuration);
        setVoicePrompt("");
        setIsGenerating(false);
    }
    catch (error) {
      console.error("Error generating podcast:", error);
      setIsGenerating(false);
      
    }
  };

  return {
    isGenerating,
    generatePodcast,
  };
};

const GeneratePodcast = (props: GeneratePodcastProps) => {
  const { isGenerating, generatePodcast } = useGeneratePodcast(props);
  return (
    <div>
      <div className="flex flex-col gap-2.5">
        <Label className="text-16 font-bold text-white-1">
          AI Prompt to Generate Podcast
        </Label>
        <Textarea
          className="input-class font-light focus-visible:ring-offset-orange-1"
          placeholder="Provide a prompt for the AI to generate a podcast episode."
          rows={5}
          value={props.voicePrompt}
          onChange={(event) => props.setVoicePrompt(event.target.value)}
        />
      </div>

      <div className="mt-5 w-full max-w-[200px]">
        <Button
          type="submit"
          className="text-16 bg-orange-1 font-extrabold text-white-1 hover:bg-orange-2"
        >
          {isGenerating ? (
            <>
              Submitting...
              <Loader size={20} className="animate-spin ml-2" />
            </>
          ) : (
            "Generate"
          )}
        </Button>
      </div>

      {props.audio && (
        <audio
          controls
          src={props.audio}
          className="mt-5"
          onLoadedMetadata={(e) =>
            props.setAudioDuration(e.currentTarget.duration)
          }
        />
      )}
    </div>
  );
};

export default GeneratePodcast;
