import React, { useState, useCallback } from 'react';
import PromptInput from './PromptInput';
import ImageDisplay from './ImageDisplay';
import AspectRatioSelector from './AspectRatioSelector';
import { generateImage as generateImageFromApi } from '../services/geminiService';
import { saveToHistory } from '../services/historyService';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';

interface CreateScreenProps {
  navigateTo: (screen: 'home') => void;
  openModal: (imageData: string, prompt: string) => void;
}

const CreateScreen: React.FC<CreateScreenProps> = ({ navigateTo, openModal }) => {
  const [prompt, setPrompt] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<string>('1:1');

  const handleGenerateImage = useCallback(async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const imageBytes = await generateImageFromApi(prompt, aspectRatio);
      setGeneratedImage(imageBytes);
      saveToHistory({ imageData: imageBytes, prompt, aspectRatio });
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
        if (errorMessage.includes('Rpc failed due to xhr error')) {
             setError('Could not connect to the AI service. This might be due to a network issue or an API key problem. Please verify your setup and try again.');
        } else {
             setError(errorMessage);
        }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [prompt, aspectRatio]);

  return (
    <div className="w-full max-w-2xl mx-auto">
        <header className="relative flex items-center justify-center mb-6">
            <button onClick={() => navigateTo('home')} className="absolute left-0 p-2 rounded-full hover:bg-slate-100 transition-colors" aria-label="Back to Home">
                <ArrowLeftIcon />
            </button>
            <h1 className="text-2xl font-bold text-slate-800">Create Image</h1>
        </header>

      <main className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 space-y-6">
        <ImageDisplay
          imageData={generatedImage}
          isLoading={isLoading}
          error={error}
          prompt={prompt}
          aspectRatio={aspectRatio}
          onImageClick={(imageData) => openModal(imageData, prompt)}
        />
        <AspectRatioSelector
          aspectRatio={aspectRatio}
          setAspectRatio={setAspectRatio}
          isLoading={isLoading}
        />
        <PromptInput
          prompt={prompt}
          setPrompt={setPrompt}
          onSubmit={handleGenerateImage}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
};

export default CreateScreen;