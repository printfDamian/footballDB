function simulateMatch(club1, club2) {
    var ratingDifference = club1.rating - club2.rating;

    // Determine the score based on the rating difference
    var score1 = Math.max(0, Math.round(ratingDifference / 10));
    var score2 = Math.max(0, Math.round(-ratingDifference / 10));

    // Update clubs' statistics
    club1.golos_marcados += score1;
    club1.golos_sofridos += score2;
    club2.golos_marcados += score2;
    club2.golos_sofridos += score1;

    if (score1 > score2) {
        club1.vitorias += 1;
        club2.derrotas += 1;
        club1.pontos += 3;
    } else if (score2 > score1) {
        club2.vitorias += 1;
        club1.derrotas += 1;
        club2.pontos += 3;
    } else {
        club1.empates += 1;
        club2.empates += 1;
        club1.pontos += 1;
        club2.pontos += 1;
    }
}
/* 
Rating1 = 0,4
Rating2 = 0,7
Prob1 = 0,36
Prob2 = 0,64
*/

// Logic to simulate the macthes

var teams = [
    {name: 'Manchester City', rating: 100, vitorias: 0, derrotas: 0, empates: 0, golos_marcados: 0, golos_sofridos: 0, pontos: 0},
    {name: 'Liverpool', rating: 96.2, vitorias: 0, derrotas: 0, empates: 0, golos_marcados: 0, golos_sofridos: 0, pontos: 0},
    // Add the rest of the teams here
];

for (var i = 0; i < teams.length; i++) {
    for (var j = 0; j < teams.length; j++) {
        if (i != j) {
            simulateMatch(teams[i], teams[j]);
        }
    }
}