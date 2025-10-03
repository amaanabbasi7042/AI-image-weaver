import React from 'react';

interface HomeScreenProps {
  navigateTo: (screen: 'create' | 'history' | 'privacy') => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigateTo }) => {
  return (
    <div className="text-center">
      <header className="mb-12">
        <div className="inline-block bg-indigo-100 text-indigo-600 rounded-full p-4 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m12.728 0l-.707.707M15 21v-4.5A2.5 2.5 0 0012.5 14h-1A2.5 2.5 0 009 16.5V21" />
            </svg>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-800">AI Image Weaver</h1>
        <p className="text-slate-500 mt-3 text-lg">Turn your words into wonderful, high-quality images in seconds.</p>
      </header>
      <main className="max-w-xs mx-auto space-y-4">
        <button
          onClick={() => navigateTo('create')}
          className="w-full px-6 py-4 bg-indigo-600 text-white font-semibold text-lg rounded-xl shadow-md hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
        >
          Create Image
        </button>
        <button
          onClick={() => navigateTo('history')}
          className="w-full px-6 py-4 bg-slate-200 text-slate-800 font-semibold text-lg rounded-xl hover:bg-slate-300 transition-colors duration-300"
        >
          History
        </button>
        <button
          onClick={() => navigateTo('privacy')}
          className="w-full px-6 py-4 bg-slate-200 text-slate-800 font-semibold text-lg rounded-xl hover:bg-slate-300 transition-colors duration-300"
        >
          Privacy Policy
        </button>
      </main>
      <footer className="text-center mt-12 text-slate-400 text-sm">
          <p>Powered by Google Gemini. Built with React & Tailwind CSS.</p>
      </footer>
    </div>
  );
};

export default HomeScreen;
