import React, { useState, useEffect } from 'react';

// Define positions for different games. You can easily add more sports here.
const gamePositions = {
  'Basketball': ['Point Guard', 'Shooting Guard', 'Small Forward', 'Power Forward', 'Center'],
  'Football': ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'],
  'Volleyball': ['Setter', 'Libero', 'Middle Blocker', 'Outside Hitter', 'Opposite Hitter'],
  'Cricket': ['Batsman', 'Bowler', 'All-rounder', 'Wicketkeeper'],
};

// Shared style for form elements
const inputStyle = "w-full bg-slate-900 border border-slate-600 rounded-md p-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-50";

const AddPlayers = ({ settings, onPlayersComplete, onBack }) => {
  const totalPlayersNeeded = settings.numTeams * settings.playersPerTeam;
  const [players, setPlayers] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const [skillLevel, setSkillLevel] = useState(5);
  const [position, setPosition] = useState('Any');
  const [stamina, setStamina] = useState(2);

  // Get the list of positions for the currently selected game from settings
  // It defaults to an empty array if the game has no specific positions defined
  const availablePositions = ['Any', ...(gamePositions[settings.sportType] || [])];

  // Effect to reset the position if the user goes back and changes the game
  useEffect(() => {
    setPosition('Any');
  }, [settings.sportType]);


  const handleAddPlayer = (e) => {
    e.preventDefault();
    if (playerName && players.length < totalPlayersNeeded) {
      setPlayers([...players, { name: playerName, skill: parseInt(skillLevel), stamina: parseInt(stamina), position }]);
      setPlayerName('');
      setSkillLevel(5);
      setPosition('Any'); // Reset position to 'Any' for the next player
    }
  };

  const isAddPlayerDisabled = players.length >= totalPlayersNeeded;

  return (
    <>
      <h1 className="text-3xl font-bold text-cyan-400 mb-6">Add Players</h1>
      
      <form onSubmit={handleAddPlayer} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-6 text-left">
        <div className="md:col-span-2">
          <label className="block mb-2 text-sm font-semibold text-slate-400">Player Name</label>
          <input type="text" placeholder="e.g., Alex" value={playerName} onChange={(e) => setPlayerName(e.target.value)} disabled={isAddPlayerDisabled} className={inputStyle} />
        </div>
        <div>
            <label className="block mb-2 text-sm font-semibold text-slate-400">Skill Level ({skillLevel})</label>
            <input type="range" min="1" max="10" value={skillLevel} onChange={(e) => setSkillLevel(e.target.value)} disabled={isAddPlayerDisabled} className="w-full accent-cyan-400" />
        </div>
        <div>
            <label className="block mb-2 text-sm font-semibold text-slate-400">Stamina</label>
            <select value={stamina} onChange={(e) => setStamina(e.target.value)} disabled={isAddPlayerDisabled} className={inputStyle}>
                <option value={1}>Low</option>
                <option value={2}>Medium</option>
                <option value={3}>High</option>
            </select>
        </div>
        <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-semibold text-slate-400">Position</label>
            <select value={position} onChange={(e) => setPosition(e.target.value)} disabled={isAddPlayerDisabled} className={inputStyle}>
              {/* Dynamically generate the position options based on the selected game */}
              {availablePositions.map((pos) => (
                <option key={pos} value={pos}>{pos}</option>
              ))}
            </select>
        </div>
        <button type="submit" disabled={isAddPlayerDisabled} className="md:col-span-2 mt-2 bg-green-500 text-slate-900 font-bold py-3 rounded-lg hover:bg-green-600 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed">Add Player</button>
      </form>
      
      <div className="border border-slate-700 rounded-lg p-4 mb-6 text-left">
        <h3 className="font-bold mb-2">Player List ({players.length} / {totalPlayersNeeded})</h3>
        {players.length === 0 ? (
          <p className="text-slate-400 text-center py-4">No players added yet.</p>
        ) : (
          <ul className="max-h-32 overflow-y-auto pr-2">{players.map((p, i) => <li key={i} className="bg-slate-700 p-2 rounded mb-2">{p.name} (Skill: {p.skill})</li>)}</ul>
        )}
      </div>

      <div className="flex justify-center gap-4">
        <button className="bg-slate-600 text-slate-200 font-bold py-3 px-8 rounded-lg hover:bg-slate-700 transition-colors" onClick={onBack}>Back</button>
        <button className="bg-cyan-400 text-slate-900 font-bold py-3 px-8 rounded-lg hover:bg-cyan-500 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed" onClick={() => onPlayersComplete(players)} disabled={players.length !== totalPlayersNeeded}>
          Generate Teams
        </button>
      </div>
    </>
  );
};

export default AddPlayers;