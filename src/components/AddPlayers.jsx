import React, { useState, useEffect } from 'react';

const gamePositions = {
  'Basketball': ['Point Guard', 'Shooting Guard', 'Small Forward', 'Power Forward', 'Center'],
  'Football': ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'],
  'Volleyball': ['Setter', 'Libero', 'Middle Blocker', 'Outside Hitter', 'Opposite Hitter'],
  'Cricket': ['Batsman', 'Bowler', 'All-rounder', 'Wicketkeeper'],
};

const inputStyle = "w-full bg-slate-900 border border-slate-600 rounded-md p-2 md:p-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-50 text-sm md:text-base";

const AddPlayers = ({ settings, onPlayersComplete, onBack }) => {
  const totalPlayersNeeded = settings.numTeams * settings.playersPerTeam;
  const [players, setPlayers] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const [skillLevel, setSkillLevel] = useState(5);
  const [position, setPosition] = useState('Any');
  const [stamina, setStamina] = useState(2);

  const sportPositions = gamePositions[settings.sportType] || [];
  const requiresPosition = sportPositions.length > 0;

  const availablePositions = requiresPosition ? sportPositions : ['Any', ...sportPositions];

  useEffect(() => {
    setPosition(requiresPosition ? '' : 'Any');
  }, [settings.sportType]); 

  const handleAddPlayer = (e) => {
    e.preventDefault();
    if (!playerName || players.length >= totalPlayersNeeded) return;
    if (requiresPosition && !position) return; 

    setPlayers([...players, { 
      name: playerName, 
      skill: parseInt(skillLevel), 
      stamina: parseInt(stamina), 
      position: position || 'Any' 
    }]);
    setPlayerName('');
    setSkillLevel(5);
    setPosition(requiresPosition ? '' : 'Any'); 
  };

  const isAddPlayerDisabled = players.length >= totalPlayersNeeded || !playerName.trim() || (requiresPosition && !position);

  return (
    <div className="px-3 md:px-0">
      <h1 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-4 md:mb-6">Add Players</h1>
      
      <form onSubmit={handleAddPlayer} className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-x-6 md:gap-y-4 mb-4 md:mb-6 text-left">
        <div className="md:col-span-2">
          <label className="block mb-1 md:mb-2 text-sm font-semibold text-slate-400">Player Name</label>
          <input 
            type="text" 
            placeholder="e.g., Alex" 
            value={playerName} 
            onChange={(e) => setPlayerName(e.target.value)} 
            disabled={players.length >= totalPlayersNeeded} 
            className={inputStyle} 
          />
        </div>
        <div>
            <label className="block mb-1 md:mb-2 text-sm font-semibold text-slate-400">Skill Level ({skillLevel})</label>
            <input 
              type="range" 
              min="1" 
              max="10" 
              value={skillLevel} 
              onChange={(e) => setSkillLevel(Number(e.target.value))} 
              disabled={players.length >= totalPlayersNeeded} 
              className="w-full accent-cyan-400 h-2 md:h-1" 
            />
        </div>
        <div>
            <label className="block mb-1 md:mb-2 text-sm font-semibold text-slate-400">Stamina</label>
            <select 
              value={stamina} 
              onChange={(e) => setStamina(Number(e.target.value))} 
              disabled={players.length >= totalPlayersNeeded} 
              className={inputStyle}
            >
                <option value={1}>Low</option>
                <option value={2}>Medium</option>
                <option value={3}>High</option>
            </select>
        </div>
        <div className="md:col-span-2">
            <label className="block mb-1 md:mb-2 text-sm font-semibold text-slate-400">
              Position {requiresPosition ? <span className="text-xs text-slate-400">(required)</span> : <span className="text-xs text-slate-400">(optional)</span>}
            </label>
            <select 
              value={position} 
              onChange={(e) => setPosition(e.target.value)} 
              disabled={players.length >= totalPlayersNeeded} 
              className={inputStyle}
            >
              {requiresPosition ? (
                <>
                  <option value="">-- Select position --</option>
                  {sportPositions.map((pos) => (
                    <option key={pos} value={pos}>{pos}</option>
                  ))}
                </>
              ) : (
                availablePositions.map((pos) => (
                  <option key={pos} value={pos}>{pos}</option>
                ))
              )}
            </select>
        </div>
        <button 
          type="submit" 
          disabled={isAddPlayerDisabled} 
          className="md:col-span-2 mt-1 md:mt-2 bg-green-500 text-slate-900 font-bold py-2 md:py-3 rounded-lg hover:bg-green-600 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed text-sm md:text-base"
        >
          Add Player
        </button>
      </form>
      
      <div className="border border-slate-700 rounded-lg p-3 md:p-4 mb-4 md:mb-6 text-left">
        <h3 className="font-bold mb-2 text-sm md:text-base">Player List ({players.length} / {totalPlayersNeeded})</h3>
        {players.length === 0 ? (
          <p className="text-slate-400 text-center py-3 md:py-4 text-sm md:text-base">No players added yet.</p>
        ) : (
          <ul className="max-h-40 md:max-h-32 overflow-y-auto pr-2 text-xs md:text-sm">
            {players.map((p, i) => (
              <li key={i} className="bg-slate-700 p-2 rounded mb-2">
                <span className="font-semibold text-cyan-300">{p.name}</span> | 
                Skill: {p.skill} | 
                Stamina: {p.stamina === 1 ? 'Low' : p.stamina === 2 ? 'Medium' : 'High'} | 
                Position: {p.position}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
        <button 
          className="bg-slate-600 text-slate-200 font-bold py-2 md:py-3 px-4 md:px-8 rounded-lg hover:bg-slate-700 transition-colors text-sm md:text-base" 
          onClick={onBack}
        >
          Back
        </button>
        <button 
          className="bg-cyan-400 text-slate-900 font-bold py-2 md:py-3 px-4 md:px-8 rounded-lg hover:bg-cyan-500 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed text-sm md:text-base" 
          onClick={() => onPlayersComplete(players)} 
          disabled={players.length !== totalPlayersNeeded}
        >
          Generate Teams
        </button>
      </div>
    </div>
  );
};

export default AddPlayers;