// AI-KÄYTTÖ ALKAA
// Työkalu: Claude (Anthropic)
// Tarkoitus: tapahtumien lukeminen JSON-tiedostosta ja korttien muodostaminen
var tapahtumat = [];

var lista = document.getElementById('tapahtumalista');
var pohja = document.getElementById('korttipohja');

// Muodostaa yhden tapahtumakortin HTML-pohjasta
function luoKortti(tapahtuma) {
  var kortti = pohja.content.cloneNode(true);
  var kuva = kortti.querySelector('.card-image');
  var linkki = kortti.querySelector('.card-link');

  kuva.src = '/' + tapahtuma.kuva;
  kuva.alt = tapahtuma.nimi;
  kortti.querySelector('.card-title').textContent = tapahtuma.nimi;
  kortti.querySelector('.card-category').textContent = tapahtuma.kategoria;
  kortti.querySelector('.card-city').textContent = tapahtuma.paikkakunta;
  kortti.querySelector('.card-people').textContent = tapahtuma.osallistujat + ' osallistujaa';
  linkki.href = '/tapahtuma.html?id=' + tapahtuma.id;
  linkki.setAttribute('aria-label', 'Lisätietoja: ' + tapahtuma.nimi);

  return kortti;
}

function naytaTapahtumat(naytettavat) {
  lista.replaceChildren();
  naytettavat.forEach(function (tapahtuma) {
    lista.appendChild(luoKortti(tapahtuma));
  });
}

fetch('/data/tapahtumat.json')
  .then(function (vastaus) {
    if (!vastaus.ok) throw new Error('HTTP ' + vastaus.status);
    return vastaus.json();
  })
  .then(function (data) {
    tapahtumat = data;
    naytaTapahtumat(tapahtumat);
  })
  .catch(function () {
    var tila = document.getElementById('listan-tila');
    tila.textContent = 'Tapahtumien lataaminen epäonnistui. Yritä myöhemmin uudelleen.';
    tila.hidden = false;
  });
// AI-KÄYTTÖ PÄÄTTYY
