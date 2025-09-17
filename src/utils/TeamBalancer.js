// A simple function to shuffle an array. This adds randomness for the "Reshuffle" feature.
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const generateTeams = (players, numTeams) => {
  // 1. Shuffle players for randomness, essential for the "Reshuffle" functionality.
  const shuffledPlayers = shuffleArray([...players]);

  // 2. Sort players by skill level in descending order.
  const sortedPlayers = shuffledPlayers.sort((a, b) => b.skill - a.skill);

  // 3. Initialize the teams array with empty team objects.
  const teams = Array.from({ length: numTeams }, () => ({
    players: [],
    totalSkill: 0,
    totalStamina: 0,
  }));

  // 4. Distribute players using a serpentine (snake) draft method.
  let direction = 1; // 1 for forward, -1 for backward
  let teamIndex = 0;
  sortedPlayers.forEach(player => {
    teams[teamIndex].players.push(player);
    teams[teamIndex].totalSkill += player.skill;
    teams[teamIndex].totalStamina += player.stamina;

    teamIndex += direction;

    // Reverse direction when the end or beginning of the teams array is reached.
    if (teamIndex >= numTeams || teamIndex < 0) {
      direction *= -1;
      teamIndex += direction;
    }
  });

  // 5. Calculate final team stats and the fairness score.
  const teamStats = teams.map(team => ({
    ...team,
    avgSkill: (team.totalSkill / team.players.length).toFixed(2),
    avgStamina: (team.totalStamina / team.players.length).toFixed(2),
  }));

  // Calculate overall average skill across all players to find deviation.
  const totalAvgSkill = players.reduce((sum, p) => sum + p.skill, 0) / players.length;
  
  // Calculate the standard deviation of the team's average skills.
  const skillDeviations = teamStats.map(team => Math.pow(team.avgSkill - totalAvgSkill, 2));
  const skillStdDev = Math.sqrt(skillDeviations.reduce((sum, dev) => sum + dev, 0) / numTeams);

  // Fairness Score Formula: 100% minus a penalty for the standard deviation.
  const fairnessScore = Math.max(0, 100 - skillStdDev * 20).toFixed(2);

  return { teams: teamStats, fairnessScore };
};