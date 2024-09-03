const groups = {
  A: [
    {
      Team: "Kanada",
      ISOCode: "CAN",
      FIBARanking: 7,
      Wins: 0,
      Losses: 0,
      PointsScored: 0,
      PointsConceded: 0,
      Points: 0,
    },
    {
      Team: "Australija",
      ISOCode: "AUS",
      FIBARanking: 5,
      Wins: 0,
      Losses: 0,
      PointsScored: 0,
      PointsConceded: 0,
      Points: 0,
    },
    {
      Team: "Grčka",
      ISOCode: "GRE",
      FIBARanking: 14,
      Wins: 0,
      Losses: 0,
      PointsScored: 0,
      PointsConceded: 0,
      Points: 0,
    },
    {
      Team: "Španija",
      ISOCode: "ESP",
      FIBARanking: 2,
      Wins: 0,
      Losses: 0,
      PointsScored: 0,
      PointsConceded: 0,
      Points: 0,
    },
  ],
  B: [
    {
      Team: "Nemačka",
      ISOCode: "GER",
      FIBARanking: 3,
      Wins: 0,
      Losses: 0,
      PointsScored: 0,
      PointsConceded: 0,
      Points: 0,
    },
    {
      Team: "Francuska",
      ISOCode: "FRA",
      FIBARanking: 9,
      Wins: 0,
      Losses: 0,
      PointsScored: 0,
      PointsConceded: 0,
      Points: 0,
    },
    {
      Team: "Brazil",
      ISOCode: "BRA",
      FIBARanking: 12,
      Wins: 0,
      Losses: 0,
      PointsScored: 0,
      PointsConceded: 0,
      Points: 0,
    },
    {
      Team: "Japan",
      ISOCode: "JPN",
      FIBARanking: 26,
      Wins: 0,
      Losses: 0,
      PointsScored: 0,
      PointsConceded: 0,
      Points: 0,
    },
  ],
  C: [
    {
      Team: "Sjedinjene Države",
      ISOCode: "USA",
      FIBARanking: 1,
      Wins: 0,
      Losses: 0,
      PointsScored: 0,
      PointsConceded: 0,
      Points: 0,
    },
    {
      Team: "Srbija",
      ISOCode: "SRB",
      FIBARanking: 4,
      Wins: 0,
      Losses: 0,
      PointsScored: 0,
      PointsConceded: 0,
      Points: 0,
    },
    {
      Team: "Južni Sudan",
      ISOCode: "SSD",
      FIBARanking: 34,
      Wins: 0,
      Losses: 0,
      PointsScored: 0,
      PointsConceded: 0,
      Points: 0,
    },
    {
      Team: "Puerto Riko",
      ISOCode: "PRI",
      FIBARanking: 16,
      Wins: 0,
      Losses: 0,
      PointsScored: 0,
      PointsConceded: 0,
      Points: 0,
    },
  ],
};

function matchSimulation(firstTeam, secondTeam) {
  const winProbability =
    firstTeam.FIBARanking / (firstTeam.FIBARanking + secondTeam.FIBARanking);
  const teamOnePoints = Math.floor(Math.random() * 30) + 70;
  const teamTwoPoints = Math.floor(Math.random() * 30) + 70;

  let winner, loser;
  if (Math.random() < winProbability) {
    winner = firstTeam;
    loser = secondTeam;
  } else {
    winner = secondTeam;
    loser = firstTeam;
  }

  winner.Wins++;
  loser.Losses++;

  winner.PointsScored += winner === firstTeam ? teamOnePoints : teamTwoPoints;
  winner.PointsConceded += winner === firstTeam ? teamTwoPoints : teamOnePoints;

  loser.PointsScored += loser === firstTeam ? teamOnePoints : teamTwoPoints;
  loser.PointsConceded += loser === firstTeam ? teamTwoPoints : teamOnePoints;

  winner.Points += 2;
  loser.Points += 1;

  return `${firstTeam.Team} ${teamOnePoints} - ${teamTwoPoints} ${secondTeam.Team}`;
}

function groupStageSimulation(group) {
  const matchResults = [];

  for (let i = 0; i < group.length; i++) {
    for (let j = i + 1; j < group.length; j++) {
      const matchResult = matchSimulation(group[i], group[j]);
      matchResults.push(matchResult);
    }
  }

  group.sort((a, b) => {
    const pointsDiffA = a.PointsScored - a.PointsConceded;
    const pointsDiffB = b.PointsScored - b.PointsConceded;

    if (a.Points !== b.Points) return b.Points - a.Points;
    if (a.Wins !== b.Wins) return b.Wins - a.Wins;
    if (pointsDiffA !== pointsDiffB) return pointsDiffB - pointsDiffA;
    return b.PointsScored - a.PointsScored;
  });

  // Prikaz rezultata grupne faze
  console.log(
    `\nGrupa ${group === groups.A ? "A" : group === groups.B ? "B" : "C"}:`
  );
  group.forEach((team, index) => {
    console.log(
      `${index + 1}. ${team.Team} ${team.Wins} / ${team.Losses} / ${
        team.PointsScored
      } / ${team.PointsConceded} / ${team.Points} bodova`
    );
  });

  return matchResults;
}

Object.values(groups).forEach(groupStageSimulation);

function displayGroupRankings(groups) {
  console.log("\nKonačan plasman u grupama:");
  for (const groupName in groups) {
    console.log(`Grupa ${groupName}:`);
    groups[groupName].forEach((team, index) => {
      console.log(
        `${index + 1}. ${team.Team} ${team.Wins} / ${team.Losses} / ${
          team.PointsScored
        } / ${team.PointsConceded} / ${team.Points} boda`
      );
    });
  }
}

function createEliminationDraw(groups) {
  const rankings = {
    1: [],
    2: [],
    3: [],
  };

  for (const groupName in groups) {
    const group = groups[groupName];
    for (let i = 0; i < group.length; i++) {
      if (!rankings[i + 1]) {
        rankings[i + 1] = [];
      }
      rankings[i + 1].push(group[i]);
    }
  }

  const potD = rankings[1];
  const potE = rankings[2];
  const potF = rankings[3];

  console.log("\nŠeširi:");
  console.log("Šešir D:", potD.map((team) => team.Team).join(", "));
  console.log("Šešir E:", potE.map((team) => team.Team).join(", "));
  console.log("Šešir F:", potF.map((team) => team.Team).join(", "));

  const quarterFinalPairs = [
    [potD[0], potF[1]],
    [potD[1], potF[0]],
    [potE[0], potE[1]],
    [potE[2], potF[2]],
  ];

  return quarterFinalPairs;
}

displayGroupRankings(groups);

const quarterFinalPairs = createEliminationDraw(groups);

function simulateEliminationRound(pairs, roundName) {
  console.log(`\n${roundName}:`);
  const winners = [];
  const results = [];

  pairs.forEach(([team1, team2]) => {
    if (!team1 || !team2) {
      console.error(
        `Jedan od timova u ${roundName} nije definisan:`,
        team1,
        team2
      );
      return;
    }

    const team1Score = Math.floor(Math.random() * 30) + 70;
    const team2Score = Math.floor(Math.random() * 30) + 70;

    const result =
      team1Score > team2Score
        ? `${team1.Team} - ${team2.Team} (${team1Score}:${team2Score})`
        : `${team2.Team} - ${team1.Team} (${team2Score}:${team1Score})`;

    console.log(result);
    results.push(result);

    if (team1Score > team2Score) {
      winners.push(team1);
    } else {
      winners.push(team2);
    }
  });

  return { winners, results };
}

const { winners: semiFinalists, results: quarterFinalResults } =
  simulateEliminationRound(quarterFinalPairs, "Četvrtfinale");

const semiFinalPairs = [
  [semiFinalists[0], semiFinalists[1]],
  [semiFinalists[2], semiFinalists[3]],
];
const { winners: finalists, results: semiFinalResults } =
  simulateEliminationRound(semiFinalPairs, "Polufinale");

const finalMatchPair = [finalists[0], finalists[1]];

const bronzeMatchPair = semiFinalPairs
  .flat()
  .filter((team) => !finalists.includes(team));

const { winners: goldMedalWinner, results: finalMatchResult } =
  simulateEliminationRound([finalMatchPair], "Finale");

const { winners: bronzeMedalWinner, results: bronzeMatchResult } =
  simulateEliminationRound([bronzeMatchPair], "Utakmica za treće mesto");

console.log("\nMedalje:");
console.log(`1. ${goldMedalWinner[0].Team}`);
console.log(
  `2. ${
    finalMatchPair[0] === goldMedalWinner[0]
      ? finalMatchPair[1].Team
      : finalMatchPair[0].Team
  }`
);
console.log(`3. ${bronzeMedalWinner[0].Team}`);
