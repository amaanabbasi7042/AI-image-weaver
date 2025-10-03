
import React from 'react';

interface AspectRatioSelectorProps {
  aspectRatio: string;
  setAspectRatio: (ratio: string) => void;
  isLoading: boolean;
}

const ratios = [
  { value: '1:1', label: 'Square' },
  { value: '16:9', label: 'Landscape' },
  { value: '9:16', label: 'Portrait' },
  { value: '4:3', label: 'Standard' },
  { value: '3:4', label: 'Tall' },
];

const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({ aspectRatio, setAspectRatio, isLoading }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">Aspect Ratio</label>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {ratios.map((ratio) => (
          <button
            key={ratio.value}
            onClick={() => setAspectRatio(ratio.value)}
            disabled={isLoading}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50
              ${
                aspectRatio === ratio.value
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }
            `}
            aria-pressed={aspectRatio === ratio.value}
          >
            <div className="flex flex-col items-center pointer-events-none">
              <span>{ratio.label}</span>
              <span className="text-xs opacity-75">{ratio.value}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AspectRatioSelector;
