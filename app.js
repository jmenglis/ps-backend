// Require or dependencies
// =======================
var express    = require('express'),
    bodyParser = require('body-parser');

// Controllers
// =======================
var responses = require('./controllers/responses');

// Config Settings
// =======================
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set Route for Controller
// ========================
app.use('/', responses);

// Launch the Server
// ========================
app.listen(3000, function() {
  console.log('The application is listening on Port 3000!');
});
