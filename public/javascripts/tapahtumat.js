// AI-KÄYTTÖ ALKAA
// Työkalu: Claude (Anthropic)
// Tarkoitus: tapahtumien lukeminen JSON-tiedostosta, korttien muodostaminen,
// haku, kategoriasuodatus, lajittelu ja tilastot
var tapahtumat = [];

var lista = document.getElementById('tapahtumalista');
var pohja = document.getElementById('korttipohja');
var hakukentta = document.getElementById('haku');
var kategoriavalinta = document.getElementById('kategoria');
var lajitteluvalinta = document.getElementById('lajittelu');
var listanTila = document.getElementById('listan-tila');
var tilastoMaara = document.getElementById('tilasto-maara');
var tilastoOsallistujat = document.getElementById('tilasto-osallistujat');

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

// Täyttää kategoriavalikon aineistossa olevilla kategorioilla
function taytaKategoriat() {
  var kategoriat = [];
  tapahtumat.forEach(function (tapahtuma) {
    if (kategoriat.indexOf(tapahtuma.kategoria) === -1) {
      kategoriat.push(tapahtuma.kategoria);
    }
  });
  kategoriat.sort(function (a, b) { return a.localeCompare(b, 'fi'); });

  kategoriat.forEach(function (kategoria) {
    var vaihtoehto = document.createElement('option');
    vaihtoehto.value = kategoria;
    vaihtoehto.textContent = kategoria;
    kategoriavalinta.appendChild(vaihtoehto);
  });
}

// Haku ja kategoriasuodatus yhdessä
function suodata(lahde) {
  var hakusana = hakukentta.value.trim().toLocaleLowerCase('fi');
  var kategoria = kategoriavalinta.value;

  return lahde.filter(function (tapahtuma) {
    var nimiOsuu = tapahtuma.nimi.toLocaleLowerCase('fi').indexOf(hakusana) !== -1;
    var kategoriaOsuu = kategoria === '' || tapahtuma.kategoria === kategoria;
    return nimiOsuu && kategoriaOsuu;
  });
}

// Lajittelu kopiolle, jotta alkuperäinen järjestys säilyy
function lajittele(lahde) {
  var jarjestys = lajitteluvalinta.value;
  return lahde.slice().sort(function (a, b) {
    switch (jarjestys) {
      case 'nimi-desc':
        return b.nimi.localeCompare(a.nimi, 'fi');
      case 'osallistujat-asc':
        return a.osallistujat - b.osallistujat;
      case 'osallistujat-desc':
        return b.osallistujat - a.osallistujat;
      default:
        return a.nimi.localeCompare(b.nimi, 'fi');
    }
  });
}

function paivitaTilastot(naytettavat) {
  var osallistujat = naytettavat.reduce(function (summa, tapahtuma) {
    return summa + tapahtuma.osallistujat;
  }, 0);
  tilastoMaara.textContent = naytettavat.length;
  tilastoOsallistujat.textContent = osallistujat;
}

function naytaTila(viesti) {
  listanTila.textContent = viesti;
  listanTila.hidden = !viesti;
}

// Päivittää listan ja tilastot nykyisten valintojen mukaan
function paivitaLista() {
  var naytettavat = lajittele(suodata(tapahtumat));

  lista.replaceChildren();
  naytettavat.forEach(function (tapahtuma) {
    lista.appendChild(luoKortti(tapahtuma));
  });

  naytaTila(naytettavat.length === 0 ? 'Hakuehtoja vastaavia tapahtumia ei löytynyt.' : '');
  paivitaTilastot(naytettavat);
}

hakukentta.addEventListener('input', paivitaLista);
kategoriavalinta.addEventListener('change', paivitaLista);
lajitteluvalinta.addEventListener('change', paivitaLista);
document.getElementById('hakulomake').addEventListener('submit', function (e) {
  e.preventDefault();
});

fetch('/data/tapahtumat.json')
  .then(function (vastaus) {
    if (!vastaus.ok) throw new Error('HTTP ' + vastaus.status);
    return vastaus.json();
  })
  .then(function (data) {
    tapahtumat = data;
    taytaKategoriat();
    paivitaLista();
  })
  .catch(function () {
    naytaTila('Tapahtumien lataaminen epäonnistui. Yritä myöhemmin uudelleen.');
  });
// AI-KÄYTTÖ PÄÄTTYY
