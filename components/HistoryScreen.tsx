import React, { useState, useEffect } from 'react';
import { getHistory, HistoryItem } from '../services/historyService';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { ImageIcon } from './icons/ImageIcon';

interface HistoryScreenProps {
  navigateTo: (screen: 'home') => void;
  openModal: (imageData: string, prompt: string) => void;
}

const HistoryScreen: React.FC<HistoryScreenProps> = ({ navigateTo, openModal }) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const aspectRatioClasses: { [key: string]: string } = {
    '1:1': 'aspect-square',
    '16:9': 'aspect-[16/9]',
    '9:16': 'aspect-[9/16]',
    '4:3': 'aspect-[4/3]',
    '3:4': 'aspect-[3/4]',
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <header className="relative flex items-center justify-center mb-6">
        <button onClick={() => navigateTo('home')} className="absolute left-0 p-2 rounded-full hover:bg-slate-100 transition-colors" aria-label="Back to Home">
          <ArrowLeftIcon />
        </button>
        <h1 className="text-2xl font-bold text-slate-800">History</h1>
      </header>
      <main className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        {history.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {history.map((item) => (
              <div
                key={item.id}
                className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md"
                onClick={() => openModal(item.imageData, item.prompt)}
              >
                <img
                  src={`data:image/jpeg;base64,${item.imageData}`}
                  alt={item.prompt}
                  className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ${aspectRatioClasses[item.aspectRatio] || 'aspect-square'}`}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <p className="absolute bottom-2 left-2 right-2 text-white text-xs font-medium p-1 truncate" title={item.prompt}>
                  {item.prompt}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-slate-500">
            <div className="inline-block bg-slate-100 rounded-full p-4 mb-4">
                <ImageIcon />
            </div>
            <h2 className="text-xl font-semibold">No History Yet</h2>
            <p>Start creating images, and they will appear here!</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default HistoryScreen;