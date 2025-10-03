
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt, onSubmit, isLoading }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (!isLoading) {
        onSubmit();
      }
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start gap-4">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="e.g., A majestic lion wearing a crown, studio lighting, hyperrealistic..."
        className="w-full h-24 sm:h-auto sm:min-h-[48px] p-3 text-slate-700 bg-slate-100 rounded-lg border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow resize-none"
        rows={2}
        disabled={isLoading}
      />
      <button
        onClick={onSubmit}
        disabled={isLoading}
        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100"
      >
        <SparklesIcon />
        <span>{isLoading ? 'Generating...' : 'Generate'}</span>
      </button>
    </div>
  );
};

export default PromptInput;
