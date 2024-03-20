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
    dbConnection.query('SELECT * FROM leagues', (err, results) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send(err);
      }
      res.send(results);
    });
});

app.get('/', (req, res) => {
    dbConnection.query('SELECT * FROM leagues', (err, results) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send(err);
      }
      res.render('index', { leagues: results });
    });
});

app.get('/teams', function(req, res) {
  var leagueId = req.query.id; // Get the league ID from the query parameter

  // Execute your SQL query
  dbConnection.query('SELECT * FROM teams WHERE league_id = ?', [leagueId], function(error, results) {
      if (error) {
          console.error(error.message);
          return res.status(500).send(error);
      } else {
          // Render the teams page and pass the teams info to the template
          res.render('teams', { teams: results, leagueId: leagueId });
      }
  });
});

app.get('/players', function(req, res) {
  var teamId = req.query.id; // Get the team ID from the query parameter

  // Execute your SQL query
  dbConnection.query('SELECT * FROM players WHERE club_team_id = ?', [teamId], function(error, results) {
      if (error) {
          console.error(error.message);
          return res.status(500).send(error);
      } else {
          // Render the players page and pass the players info to the template
          res.render('players', { players: results, teamId: teamId });
      }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});