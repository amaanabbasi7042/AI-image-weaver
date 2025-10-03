
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateImage = async (prompt: string, aspectRatio: string): Promise<string> => {
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        // While the user requested PNG download, the API prefers generating JPEG.
        // We will handle the download format on the client side. The base64 data is format-agnostic.
        outputMimeType: 'image/jpeg',
        aspectRatio: aspectRatio,
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const image = response.generatedImages[0];
      if (image.image && image.image.imageBytes) {
        return image.image.imageBytes;
      }
    }
    
    throw new Error('No image was generated. The response may have been blocked.');
  } catch (error) {
    console.error('Error generating image with Gemini API:', error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate image: ${error.message}`);
    }
    throw new Error('An unknown error occurred while generating the image.');
  }
};
