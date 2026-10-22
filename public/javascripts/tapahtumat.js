// AI-KÄYTTÖ ALKAA
// Työkalu: Claude (Anthropic)
// Tarkoitus: tapahtumien lukeminen JSON-tiedostosta, korttien muodostaminen,
// haku, kategoriasuodatus, lajittelu, tilastot ja suosikit
var tapahtumat = [];

// Suosikit-näkymä avataan osoitteella /?suosikit=1
var vainSuosikit = new URLSearchParams(location.search).has('suosikit');

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

  var suosikkiNappi = kortti.querySelector('.fav-btn');
  paivitaSuosikkiNappi(suosikkiNappi, onSuosikki(tapahtuma.id), tapahtuma.nimi);
  suosikkiNappi.addEventListener('click', function () {
    var suosikki = vaihdaSuosikki(tapahtuma.id);
    paivitaSuosikkiNappi(suosikkiNappi, suosikki, tapahtuma.nimi);
    if (vainSuosikit) paivitaLista();
  });

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
    var suosikkiOsuu = !vainSuosikit || onSuosikki(tapahtuma.id);
    return nimiOsuu && kategoriaOsuu && suosikkiOsuu;
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

  var viesti = '';
  if (naytettavat.length === 0) {
    viesti = vainSuosikit && lueSuosikit().length === 0
      ? 'Et ole vielä lisännyt suosikkeja. Lisää tapahtuma suosikiksi sydänpainikkeesta.'
      : 'Hakuehtoja vastaavia tapahtumia ei löytynyt.';
  } else if (vainSuosikit) {
    viesti = 'Näytetään vain suosikit.';
  }
  naytaTila(viesti);
  paivitaTilastot(naytettavat);
}

// Merkitse Suosikit aktiiviseksi navigaatiossa suosikkinäkymässä
if (vainSuosikit) {
  document.querySelectorAll('.nav-list a').forEach(function (a) {
    var aktiivinen = a.dataset.nav === 'suosikit';
    a.classList.toggle('is-active', aktiivinen);
    if (aktiivinen) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
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
