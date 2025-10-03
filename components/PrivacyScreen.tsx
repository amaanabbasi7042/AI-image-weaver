import React from 'react';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';

interface PrivacyScreenProps {
  navigateTo: (screen: 'home') => void;
}

const PrivacyScreen: React.FC<PrivacyScreenProps> = ({ navigateTo }) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <header className="relative flex items-center justify-center mb-6">
        <button onClick={() => navigateTo('home')} className="absolute left-0 p-2 rounded-full hover:bg-slate-100 transition-colors" aria-label="Back to Home">
          <ArrowLeftIcon />
        </button>
        <h1 className="text-2xl font-bold text-slate-800">Privacy Policy</h1>
      </header>
      <main className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 space-y-6 text-slate-600">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-800">Our Policy</h2>
          <p>This application is designed with your privacy in mind. Here’s how we handle your data:</p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li><strong>Prompts:</strong> Your text prompts are sent to Google's Gemini API to generate images. Google's privacy policy applies to this data. We do not store your prompts on our servers.</li>
            <li><strong>Generated Images:</strong> The images you create are not stored on any server. They are generated on-the-fly and exist only within your browser session until you save them.</li>
            <li><strong>Local History:</strong> To provide a "History" feature, a record of your generated images, prompts, and settings is stored locally on your device using your browser's built-in storage (localStorage). This data never leaves your computer. You can clear your browser's site data to remove this history at any time.</li>
            <li><strong>Analytics:</strong> We do not collect any personal data or usage analytics.</li>
          </ul>
        </div>
        <footer className="text-center pt-6 border-t border-slate-200 text-slate-500 text-sm">
          <p>Powered by Google Gemini. Built with React & Tailwind CSS.</p>
        </footer>
      </main>
    </div>
  );
};

export default PrivacyScreen;