// server.js
const express = require('express');
const path = require('path'); // Import the 'path' module
const dbConnection = require('./connect'); // Import the 'connect' module
const app = express();
const port = 1234; // Choose any available port

app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views', path.join(__dirname, 'views')); // Set the views directory

// Serve static files (including index.html)
app.use(express.static(path.join(__dirname, 'public'))); // Assuming your HTML file is in a folder named 'public'

app.get('/data', (req, res) => {
    dbConnection.query('SELECT * FROM Ligas', (err, results) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send(err);
      }
      res.send(results);
    });
});

app.get('/', (req, res) => {
    dbConnection.query('SELECT * FROM Ligas', (err, results) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send(err);
      }
      res.render('index', { ligas: results });
    });
});
app.get('/clubs', function(req, res) {
  var leagueId = req.query.id; // Get the league ID from the query parameter

  // Execute your SQL query
  dbConnection.query('SELECT clubes.nome, clubes.rating, clubes.pontos, clubes.vitorias, clubes.derrotas, clubes.empates, clubes.golos_marcados, clubes.golos_sofridos, Ligas.nome AS liga_nome FROM clubes JOIN Ligas ON clubes.id_liga = Ligas.id WHERE clubes.id_liga = ? ORDER BY clubes.pontos DESC', [leagueId], function(error, results) {
      if (error) {
          // Handle error
      } else {
          // Render the clubs page and pass the clubs and league info to the template
          res.render('clubs', { clubs: results, league: results[0], leagueId: leagueId });
      }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});