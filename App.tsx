import React, { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import CreateScreen from './components/CreateScreen';
import HistoryScreen from './components/HistoryScreen';
import PrivacyScreen from './components/PrivacyScreen';
import FullScreenModal from './components/FullScreenModal';

type Screen = 'home' | 'create' | 'history' | 'privacy';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [modalPrompt, setModalPrompt] = useState<string>('');

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const openModal = (imageData: string, prompt: string) => {
    setModalImage(imageData);
    setModalPrompt(prompt);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
    setModalPrompt('');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'create':
        return <CreateScreen navigateTo={navigateTo} openModal={openModal} />;
      case 'history':
        return <HistoryScreen navigateTo={navigateTo} openModal={openModal} />;
      case 'privacy':
        return <PrivacyScreen navigateTo={navigateTo} />;
      case 'home':
      default:
        return <HomeScreen navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      {renderScreen()}
      <FullScreenModal
        isOpen={isModalOpen}
        onClose={closeModal}
        imageData={modalImage}
        prompt={modalPrompt}
      />
    </div>
  );
};

export default App;