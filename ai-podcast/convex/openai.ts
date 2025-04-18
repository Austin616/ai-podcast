import { action } from "./_generated/server";
import { v } from "convex/values";
import fs from "fs";
import path from "path";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const generateAudioAction = action({
  args: {
    input: v.string(),
    voice: v.string(),
    length: v.union(v.literal("short"), v.literal("medium"), v.literal("long")),
  },
  handler: async (_, { voice, input, length }) => {
    const tokenMap = {
      short: 175,
      medium: 800,
      long: 1200,
    };
    const maxTokens = tokenMap[length];

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a podcast scriptwriter. Create an engaging podcast script based on the user's topic.",
        },
        {
          role: "user",
          content: input,
        },
      ],
      temperature: 0.8,
      max_tokens: maxTokens,
    });

    const generatedScript = completion.choices[0].message.content;
    if (!generatedScript) throw new Error("Failed to generate podcast script");

    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice,
      input: generatedScript,
    });

    const buffer = await mp3.arrayBuffer();
    return buffer;
  },
});

export const generateThumbnailAction = action({
    args: { prompt: v.string() },
    handler: async (_, { prompt }) => {
      const response = await openai.images.generate({
        model: 'dall-e-3',
        prompt,
        size: '1024x1024',
        quality: 'standard',
        n: 1, // Generate one image
      })
  
      const url = response.data[0].url;
  
      if(!url) {
        throw new Error('Error generating thumbnail');
      }
  
      const imageResponse = await fetch(url);
      const buffer = await imageResponse.arrayBuffer();
      return buffer;
    }
  })