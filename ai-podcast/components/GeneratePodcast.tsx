import React, { useState } from "react";
import { GeneratePodcastProps } from "@/types";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { v4 as uuidv4 } from "uuid";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { generateUploadUrl } from "@/convex/files";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


// Hook moved below to keep everything clean
const useGeneratePodcast = ({
  setAudioStorageId,
  setAudio,
  voiceType,
  voicePrompt,
  setVoicePrompt,
  setAudioDuration,
  scriptLength,
}: GeneratePodcastProps & { scriptLength: "short" | "medium" | "long" }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl);

  const getPodcastAudio = useAction(api.openai.generateAudioAction);
  const getAudioUrl = useMutation(api.podcasts.getUrl);

  const generatePodcast = async () => {
    setIsGenerating(true);
    setAudio("");

    if (!voicePrompt) {
      toast({ title: "Please provide a voice" });
      setIsGenerating(false);
      return;
    }

    try {
      const response = await getPodcastAudio({
        voice: voiceType,
        input: voicePrompt,
        length: scriptLength,
      });

      const blob = new Blob([response], { type: "/audio/mpeg" });
      const fileName = `podcast-${uuidv4()}.mp3`;
      const file = new File([blob], fileName, { type: "audio/mpeg" });

      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId;

      setAudioStorageId(storageId);
      const audioUrl = await getAudioUrl({ storageId });
      setAudio(audioUrl!);
      toast({ title: "Podcast generated successfully!" });
    } catch (error) {
      console.error("Error generating podcast:", error);
      toast({ title: "Error generating podcast", variant: "destructive" });
    }

    setIsGenerating(false);
  };

  return {
    isGenerating,
    generatePodcast,
  };
};

const GeneratePodcast = (props: GeneratePodcastProps) => {
  const [scriptLength, setScriptLength] = useState<"short" | "medium" | "long">("medium");
  const { isGenerating, generatePodcast } = useGeneratePodcast({
    ...props,
    scriptLength,
  });

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

      <div className="mt-4">
        <Label className="text-16 font-bold text-white-1">Select Length</Label>
        <Select
          value={scriptLength}
          onValueChange={(value) => setScriptLength(value as "short" | "medium" | "long")}
        >
          <SelectTrigger className="bg-black-1 border-none focus:ring-2 focus:ring-orange-1 text-16 w-full text-gray-1 font-bold">
            <SelectValue placeholder="Select Length" />
          </SelectTrigger>
          <SelectContent className="bg-black-1 text-gray-1 font-bold">
            <SelectItem value="short">
              Short (1-2 minutes)
            </SelectItem>
            <SelectItem value="medium">
              Medium (3-5 minutes)
            </SelectItem>

            <SelectItem value="long">
              Long (6-10 minutes)
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-5 w-full max-w-[200px]">
        <Button
          type="submit"
          className="text-16 bg-orange-1 font-extrabold text-white-1 hover:bg-orange-2"
          onClick={generatePodcast}
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
