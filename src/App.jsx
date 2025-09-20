import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import MatchSetup from './components/MatchSetup';
import AddPlayers from './components/AddPlayers';
import TeamDisplay from './components/TeamDisplay';

function App() {
  const [step, setStep] = useState('welcome'); // 'welcome', 'setup', 'addPlayers', 'display'
  const [matchSettings, setMatchSettings] = useState(null);
  const [players, setPlayers] = useState([]);

  const handleStart = () => setStep('setup');

  const handleSetupComplete = (settings) => {
    setMatchSettings(settings);
    setStep('addPlayers');
  };

  const handlePlayersComplete = (playerList) => {
    setPlayers(playerList);
    setStep('display');
  };

  const handleBack = () => {
    if (step === 'display') setStep('addPlayers');
    if (step === 'addPlayers') setStep('setup');
    if (step === 'setup') setStep('welcome');
  };

  const renderStep = () => {
    switch (step) {
      case 'setup':
        return <MatchSetup onSetupComplete={handleSetupComplete} />;
      case 'addPlayers':
        return (
          <AddPlayers
            settings={matchSettings}
            onPlayersComplete={handlePlayersComplete}
            onBack={handleBack}
          />
        );
      case 'display':
        return (
          <TeamDisplay
            players={players}
            numTeams={matchSettings.numTeams}
            onBack={handleBack}
          />
        );
      case 'welcome':
      default:
        return <WelcomeScreen onStart={handleStart} />;
    }
  };

  return (
    <div className="bg-slate-900 text-slate-200 min-h-screen flex items-center justify-center p-4 max-sm:pb-15">
      <div className="bg-slate-800 p-8 rounded-xl shadow-lg w-full max-w-3xl text-center mt-0 max-sm:-mt-4">
        {renderStep()}
      </div>
    </div>
  );
}

export default App;