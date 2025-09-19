import React, { useState } from 'react';

// Shared style for form elements
const inputStyle = "w-full bg-slate-900 border border-slate-600 rounded-md p-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-400";

const MatchSetup = ({ onSetupComplete }) => {
  const [sportType, setSportType] = useState('Basketball');
  const [numTeams, setNumTeams] = useState(2);
  const [playersPerTeam, setPlayersPerTeam] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSetupComplete({ sportType, numTeams, playersPerTeam });
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-cyan-400 mb-6">Create a New Match</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
        <div>
          <label className="block mb-2 text-sm font-semibold text-slate-400">Sport Type</label>
          <select className={inputStyle} value={sportType} onChange={(e) => setSportType(e.target.value)}>
            <option>Basketball</option>
            <option>Football</option>
            <option>Volleyball</option>
            <option>Cricket</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-semibold text-slate-400">Number of Teams</label>
          <input className={inputStyle} type="number" min="2" value={numTeams} onChange={(e) => setNumTeams(parseInt(e.target.value))} />
        </div>
        <div>
          <label className="block mb-2 text-sm font-semibold text-slate-400">Players per Team</label>
          <input className={inputStyle} type="number" min="1" value={playersPerTeam} onChange={(e) => setPlayersPerTeam(parseInt(e.target.value))} />
        </div>
        <button type="submit" className="mt-4 bg-cyan-400 text-slate-900 font-bold py-3 px-8 rounded-lg hover:bg-cyan-500 transition-colors">
          Next: Add Players
        </button>
      </form>
    </>
  );
};

export default MatchSetup;