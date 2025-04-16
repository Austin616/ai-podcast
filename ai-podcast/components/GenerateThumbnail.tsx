import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "./ui/textarea";
import { GenerateThumbnailProps } from "@/types";
import { Loader } from "lucide-react";
import { Input } from "./ui/input";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { useAction, useMutation } from "convex/react";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { api } from "@/convex/_generated/api";
import { v4 as uuidv4 } from "uuid";

const GenerateThumbnail = ({
  setImage,
  setImageStorageId,
  image,
  imagePrompt,
  setImagePrompt,
}: GenerateThumbnailProps) => {
  const [isAiThumbnail, setIsAiThumbnail] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const imageRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const handleGenerateThumbnail = useAction(api.openai.generateThumbnailAction);

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);

  const { startUpload } = useUploadFiles(generateUploadUrl);
  const getImageUrl = useMutation(api.podcasts.getUrl);

  const handleImage = async (blob: Blob, fileName: string) => {
    setIsImageLoading(true);
    setImage("");

    try {
      const file = new File([blob], fileName, { type: "image/png" });

      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId;

      setImageStorageId(storageId);
      const imageUrl = await getImageUrl({ storageId });
      setImage(imageUrl!);
      setIsImageLoading(false);
      toast({ title: "Podcast generated successfully!" });
    } catch (error) {
      console.error("Error handling image:", error);
      toast({ title: "Error handling image", variant: "destructive" });
    }
  };
  const generateImage = async () => {
    try {
      const response = await handleGenerateThumbnail({
        prompt: imagePrompt,
      });
      const blob = new Blob([response], { type: "image/png" });
      handleImage(blob, `thumbnail-${uuidv4()}.png`);
    } catch (error) {
      console.log("Error generating image:", error);
      toast({ title: "Error generating image", variant: "destructive" });
    }
  };
  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    try {
      const files = event.target.files;
      if (!files) return;
      const file = files[0];
      const blob = await file
        .arrayBuffer()
        .then((buffer) => new Blob([buffer]));

      handleImage(blob, file.name);
    } catch (error) {
      console.log("Error uploading image:", error);
      toast({ title: "Error uploading image", variant: "destructive" });
    }
  };

  return (
    <>
      <div className="generate_thumbnail">
        <Button
          type="button"
          variant="plain"
          className={cn("", { "bg-black-6": isAiThumbnail })}
          onClick={() => setIsAiThumbnail(true)}
        >
          Use AI to generate a thumbnail
        </Button>

        <Button
          type="button"
          variant="plain"
          className={cn("", { "bg-black-6": !isAiThumbnail })}
          onClick={() => setIsAiThumbnail(false)}
        >
          Upload Custom Image
        </Button>
      </div>
      {isAiThumbnail ? (
        <div className="flex flex-col gap-5">
          <div className="mt-5 flex flex-col gap-2.5">
            <Label className="text-16 font-bold text-white-1">
              AI Prompt to Generate Thumbnail
            </Label>
            <Textarea
              className="input-class font-light focus-visible:ring-offset-orange-1"
              placeholder="Provide a text prompt for the AI to generate a thumbnail image."
              rows={5}
              value={imagePrompt}
              onChange={(event) => setImagePrompt(event.target.value)}
            />
          </div>

          <div className="mt-5 w-full max-w-[200px]">
            <Button
              type="submit"
              className="text-16 bg-orange-1 font-extrabold text-white-1 hover:bg-orange-2"
              onClick={generateImage}
            >
              {isImageLoading ? (
                <>
                  Submitting...
                  <Loader size={20} className="animate-spin ml-2" />
                </>
              ) : (
                "Generate"
              )}
            </Button>
          </div>
        </div>
      ) : (
        <div className="image_div" onClick={() => imageRef.current?.click()}>
          <Input
            type="file"
            className="hidden"
            ref={imageRef}
            onChange={(event) => uploadImage(event)}
          />

          {!isImageLoading ? (
            <Image
              src="/icons/upload-image.svg"
              alt="upload"
              height={40}
              width={40}
            />
          ) : (
            <div className="text-white-1 font-medium text-16 flex-center">
              Uploading
              <Loader size={20} className="animate-spin ml-2" />
            </div>
          )}

          <div className="flex flex-col items-center gap-1">
            <h2 className="text-orange-1 font-bold text-12">
              Click to upload an image
            </h2>
            <p className="text-12 font-normal text-gray-1">
              PNG, JPG, or GIF (max. 1080x1080px)
            </p>
          </div>
        </div>
      )}
      {image && (
        <div className="flex-center w-full">
          <Image
            src={image}
            alt="thumbnail"
            width={200}
            height={200}
            className="mt-5"
          />
        </div>
      )}
    </>
  );
};

export default GenerateThumbnail;
