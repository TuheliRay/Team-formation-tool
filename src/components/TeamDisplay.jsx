import { useState, useEffect } from 'react';
const TeamDisplay = ({ players, numTeams, onBack }) => {
  const [balancedTeams, setBalancedTeams] = useState([]);
  const [fairnessScore, setFairnessScore] = useState(0);

  useEffect(() => {
    const { teams, fairnessScore } = generateTeams(players, numTeams);
    setBalancedTeams(teams);
    setFairnessScore(fairnessScore);
  }, [players, numTeams]);
  
  const handleReshuffle = () => {
    const { teams, fairnessScore } = generateTeams(players, numTeams);
    setBalancedTeams(teams);
    setFairnessScore(fairnessScore);
  };

  return (
    <>
      <div>
        <h2 className="text-lg font-semibold text-slate-300">Fairness Score:</h2>
        <p className="text-5xl font-bold text-green-400 my-2">{fairnessScore}%</p>
        <p className="text-sm text-slate-400 mb-8">A higher score indicates better team balance.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-8 text-left">
        {balancedTeams.map((team, index) => (
          <div key={index} className="bg-slate-700 rounded-lg p-5 flex-1">
            <h3 className="text-2xl font-bold text-cyan-400 text-center mb-4">Team {String.fromCharCode(65 + index)}</h3>
            <div className="flex justify-between text-slate-400 text-sm mb-4 border-b border-slate-600 pb-2">
              <span>Avg. Skill: <strong className="text-slate-200">{team.avgSkill}</strong></span>
              <span>Avg. Stamina: <strong className="text-slate-200">{team.avgStamina}</strong></span>
            </div>
            <ul className="space-y-2">
              {team.players.map((player, pIndex) => (
                <li key={pIndex} className="bg-slate-800 p-3 rounded-md flex justify-between items-center">
                  <span className="font-semibold">{player.name}</span>
                  <span className="bg-slate-900 text-xs text-slate-400 font-semibold px-2 py-1 rounded-full">{player.position}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center gap-4">
         <button className="bg-slate-600 text-slate-200 font-bold py-3 px-8 rounded-lg hover:bg-slate-700 transition-colors" onClick={onBack}>Back</button>
         <button className="bg-cyan-400 text-slate-900 font-bold py-3 px-8 rounded-lg hover:bg-cyan-500 transition-colors" onClick={handleReshuffle}>Reshuffle Teams</button>
      </div>
    </>
  );
};

export default TeamDisplay;