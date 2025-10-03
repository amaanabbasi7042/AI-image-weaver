import React from 'react';
import { ImageIcon } from './icons/ImageIcon';
import { AlertIcon } from './icons/AlertIcon';

interface ImageDisplayProps {
  imageData: string | null;
  isLoading: boolean;
  error: string | null;
  prompt: string;
  aspectRatio: string;
  onImageClick: (imageData: string) => void;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageData, isLoading, error, prompt, aspectRatio, onImageClick }) => {
  const aspectRatioClasses: { [key: string]: string } = {
    '1:1': 'aspect-square',
    '16:9': 'aspect-[16/9]',
    '9:16': 'aspect-[9/16]',
    '4:3': 'aspect-[4/3]',
    '3:4': 'aspect-[3/4]',
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full gap-4 text-slate-500">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-400"></div>
          <p className="font-medium">Generating your masterpiece...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full gap-4 text-red-500 bg-red-50 p-4 rounded-lg">
          <AlertIcon />
          <p className="font-semibold">Oops! Something went wrong.</p>
          <p className="text-sm text-center">{error}</p>
        </div>
      );
    }

    if (imageData) {
      return (
        <div className="w-full h-full group relative cursor-pointer" onClick={() => onImageClick(imageData)}>
          <img
            src={`data:image/jpeg;base64,${imageData}`}
            alt={prompt}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center rounded-lg">
             <div className="flex items-center gap-2 px-5 py-3 bg-white text-slate-800 font-semibold rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transform group-hover:scale-100 scale-90 transition-all duration-300 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>View Fullscreen</span>
             </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-slate-400">
        <ImageIcon />
        <p className="font-medium">Your generated image will appear here</p>
      </div>
    );
  };

  return (
    <div className={`w-full ${aspectRatioClasses[aspectRatio] || 'aspect-square'} bg-slate-100 rounded-lg flex items-center justify-center p-2 relative overflow-hidden transition-all duration-300`}>
      {renderContent()}
    </div>
  );
};

export default ImageDisplay;
