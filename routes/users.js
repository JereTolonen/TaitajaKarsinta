// AI-KÄYTTÖ ALKAA
// Työkalu: Claude (Anthropic)
// Tarkoitus: Express-pohjan esimerkkireitti /users (ei käytössä sovelluksen sivuilla) sekä sen refaktorointi
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
// AI-KÄYTTÖ PÄÄTTYY
