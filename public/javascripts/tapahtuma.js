// AI-KÄYTTÖ ALKAA
// Työkalu: Claude (Anthropic)
// Tarkoitus: yksittäisen tapahtuman tietojen näyttäminen URL-parametrin ?id= perusteella
var tila = document.getElementById('tapahtuman-tila');
var sisalto = document.getElementById('tapahtuma');

function asetaTeksti(id, teksti) {
  document.getElementById(id).textContent = teksti;
}

// Muuntaa ISO-päivämäärän (2026-09-12) suomalaiseen muotoon (12.9.2026)
function muotoilePaivamaara(iso) {
  var osat = iso.split('-');
  return Number(osat[2]) + '.' + Number(osat[1]) + '.' + osat[0];
}

function naytaVirhe(viesti) {
  tila.textContent = viesti;
  tila.hidden = false;
  sisalto.hidden = true;
}

function naytaTapahtuma(tapahtuma) {
  var kuva = document.getElementById('tapahtuma-kuva');
  kuva.src = '/' + tapahtuma.kuva;
  kuva.alt = tapahtuma.nimi;

  document.title = tapahtuma.nimi + ' – Tapahtumakalenteri';
  asetaTeksti('tapahtuma-nimi', tapahtuma.nimi);
  asetaTeksti('tapahtuma-kategoria', tapahtuma.kategoria);
  asetaTeksti('tapahtuma-paikkakunta', tapahtuma.paikkakunta);
  asetaTeksti('tapahtuma-paikkakunta2', tapahtuma.paikkakunta);
  asetaTeksti('tapahtuma-osallistujat-teksti', tapahtuma.osallistujat + ' osallistujaa');
  asetaTeksti('tapahtuma-osallistujat', tapahtuma.osallistujat);
  asetaTeksti('tapahtuma-kuvaus', tapahtuma.kuvaus || '');
  asetaTeksti('tapahtuma-kesto', tapahtuma.kesto || '–');

  var paiva = document.getElementById('tapahtuma-paivamaara');
  if (tapahtuma.paivamaara) {
    paiva.dateTime = tapahtuma.paivamaara;
    paiva.textContent = muotoilePaivamaara(tapahtuma.paivamaara);
  } else {
    paiva.textContent = '–';
  }

  var nappi = sisalto.querySelector('.fav-btn');
  paivitaSuosikkiNappi(nappi, onSuosikki(tapahtuma.id), tapahtuma.nimi);
  nappi.addEventListener('click', function () {
    paivitaSuosikkiNappi(nappi, vaihdaSuosikki(tapahtuma.id), tapahtuma.nimi);
  });

  sisalto.hidden = false;
}

var id = Number(new URLSearchParams(location.search).get('id'));

if (!id) {
  naytaVirhe('Tapahtumaa ei valittu. Palaa tapahtumalistaan ja valitse tapahtuma.');
} else {
  fetch('/data/tapahtumat.json')
    .then(function (vastaus) {
      if (!vastaus.ok) throw new Error('HTTP ' + vastaus.status);
      return vastaus.json();
    })
    .then(function (tapahtumat) {
      var tapahtuma = tapahtumat.find(function (t) { return t.id === id; });
      if (tapahtuma) {
        naytaTapahtuma(tapahtuma);
      } else {
        naytaVirhe('Tapahtumaa ei löytynyt. Se on voitu poistaa tai osoite on virheellinen.');
      }
    })
    .catch(function () {
      naytaVirhe('Tapahtuman lataaminen epäonnistui. Yritä myöhemmin uudelleen.');
    });
}
// AI-KÄYTTÖ PÄÄTTYY
