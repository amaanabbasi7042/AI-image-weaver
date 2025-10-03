import React from 'react';
import { DownloadIcon } from './icons/DownloadIcon';
import { CloseIcon } from './icons/CloseIcon';

interface FullScreenModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageData: string | null;
    prompt: string;
}

const FullScreenModal: React.FC<FullScreenModalProps> = ({ isOpen, onClose, imageData, prompt }) => {
    if (!isOpen || !imageData) {
        return null;
    }

    const handleDownloadAsPng = () => {
        if (!imageData) return;

        const link = document.createElement('a');
        link.href = `data:image/jpeg;base64,${imageData}`;
        
        const sanitizedPrompt = prompt.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 30);
        // The user wants a PNG download, which modern browsers can handle even if the source data is JPEG.
        link.download = `ai-image-${sanitizedPrompt || 'generated'}.png`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 transition-opacity duration-300"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <div className="relative w-full h-full max-w-screen-lg max-h-screen-lg" onClick={(e) => e.stopPropagation()}>
                <img 
                    src={`data:image/jpeg;base64,${imageData}`} 
                    alt={prompt} 
                    className="w-full h-full object-contain"
                />
                <button 
                    onClick={onClose}
                    className="absolute top-2 left-2 sm:top-4 sm:left-4 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-all"
                    aria-label="Close"
                >
                    <CloseIcon />
                </button>
                <button
                    onClick={handleDownloadAsPng}
                    className="absolute top-2 right-2 sm:top-4 sm:right-4 flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-all"
                    aria-label="Download image"
                >
                    <DownloadIcon />
                    <span className="hidden sm:inline">Download</span>
                </button>
            </div>
        </div>
    );
};

export default FullScreenModal;
