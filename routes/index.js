// AI-KÄYTTÖ ALKAA
// Työkalu: Claude (Anthropic)
// Tarkoitus: sivujen reitit (etusivu ja tapahtuman yksityiskohtasivu)
var express = require('express');
var router = express.Router();

/* Etusivu: tapahtumalista */
router.get('/', function(req, res) {
  res.render('index', { title: 'Tapahtumakalenteri', active: 'tapahtumat' });
});

module.exports = router;
// AI-KÄYTTÖ PÄÄTTYY
