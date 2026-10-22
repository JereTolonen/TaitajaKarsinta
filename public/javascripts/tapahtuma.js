// AI-KÄYTTÖ ALKAA
// Työkalu: Claude (Anthropic)
// Tarkoitus: yksittäisen tapahtuman tietojen näyttäminen URL-parametrin ?id= perusteella sekä koodin refaktorointi
var tila = document.getElementById('tapahtuman-tila');
var sisalto = document.getElementById('tapahtuma');

function asetaTeksti(id, teksti) {
  document.getElementById(id).textContent = teksti;
}

function naytaVirhe(viesti) {
  tila.textContent = viesti;
  tila.hidden = false;
  sisalto.hidden = true;
}

function naytaTapahtuma(tapahtuma) {
  var kuva = document.getElementById('tapahtuma-kuva');
  var nappi = sisalto.querySelector('.fav-btn');

  kuva.src = '/' + tapahtuma.kuva;
  kuva.alt = tapahtuma.nimi;
  document.title = tapahtuma.nimi + ' – Tapahtumakalenteri';

  asetaTeksti('tapahtuma-nimi', tapahtuma.nimi);
  asetaTeksti('tapahtuma-kategoria', tapahtuma.kategoria);
  asetaTeksti('tapahtuma-paikkakunta', tapahtuma.paikkakunta);
  asetaTeksti('tapahtuma-osallistujat-teksti', tapahtuma.osallistujat + ' osallistujaa');
  asetaTeksti('tapahtuma-tiedot', tapahtuma.tarkemmat_tiedot || '');
  asetaTeksti('tapahtuma-paikkakunta-tieto', tapahtuma.paikkakunta);
  asetaTeksti('tapahtuma-osallistujat', tapahtuma.osallistujat);

  paivitaSuosikkiNappi(nappi, onSuosikki(tapahtuma.id), tapahtuma.nimi);
  nappi.addEventListener('click', function () {
    paivitaSuosikkiNappi(nappi, vaihdaSuosikki(tapahtuma.id), tapahtuma.nimi);
  });

  tila.hidden = true;
  sisalto.hidden = false;
}

var idTeksti = new URLSearchParams(location.search).get('id');

if (idTeksti === null || idTeksti.trim() === '') {
  naytaVirhe('Tapahtumaa ei valittu. Palaa tapahtumalistaan ja valitse tapahtuma.');
} else if (!/^\d+$/.test(idTeksti.trim())) {
  naytaVirhe('Virheellinen tapahtuman tunniste "' + idTeksti + '". Palaa tapahtumalistaan ja valitse tapahtuma.');
} else {
  var id = Number(idTeksti);
  fetch('/data/tapahtumat.json')
    .then(function (vastaus) {
      if (!vastaus.ok) throw new Error('HTTP ' + vastaus.status);
      return vastaus.json();
    })
    .then(function (data) {
      var tapahtuma = data.find(function (t) { return t.id === id; });
      if (tapahtuma) {
        naytaTapahtuma(tapahtuma);
      } else {
        naytaVirhe('Tapahtumaa tunnisteella ' + id + ' ei löytynyt.');
      }
    })
    .catch(function () {
      naytaVirhe('Tapahtuman lataaminen epäonnistui. Yritä myöhemmin uudelleen.');
    });
}
// AI-KÄYTTÖ PÄÄTTYY
