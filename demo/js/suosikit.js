// AI-KÄYTTÖ ALKAA
// Työkalu: Claude (Anthropic)
// Tarkoitus: suosikkien tunnisteiden tallentaminen evästeeseen ja suosikkipainikkeen tila
var SUOSIKKI_EVASTE = 'suosikit';
var EVASTEEN_IKA = 60 * 60 * 24 * 365; // vuosi sekunteina

// Palauttaa suosikkien id:t taulukkona, esim. [1, 4]
function lueSuosikit() {
  var evasteet = document.cookie ? document.cookie.split('; ') : [];
  for (var i = 0; i < evasteet.length; i++) {
    var osat = evasteet[i].split('=');
    if (osat[0] === SUOSIKKI_EVASTE && osat[1]) {
      return decodeURIComponent(osat[1])
        .split(',')
        .map(Number)
        .filter(function (id) { return id > 0; });
    }
  }
  return [];
}

function tallennaSuosikit(idt) {
  document.cookie = SUOSIKKI_EVASTE + '=' + encodeURIComponent(idt.join(',')) +
    '; max-age=' + EVASTEEN_IKA + '; path=/; SameSite=Lax';
}

function onSuosikki(id) {
  return lueSuosikit().indexOf(id) !== -1;
}

// Lisää tai poistaa suosikin ja palauttaa uuden tilan
function vaihdaSuosikki(id) {
  var idt = lueSuosikit();
  var kohta = idt.indexOf(id);
  if (kohta === -1) {
    idt.push(id);
  } else {
    idt.splice(kohta, 1);
  }
  tallennaSuosikit(idt);
  return kohta === -1;
}

// Päivittää sydänpainikkeen kuvan ja saavutettavat tekstit
function paivitaSuosikkiNappi(nappi, suosikki, nimi) {
  var kuva = nappi.querySelector('img');
  var teksti = nappi.querySelector('.fav-text');
  nappi.setAttribute('aria-pressed', String(suosikki));
  nappi.setAttribute('aria-label', (suosikki ? 'Poista suosikeista: ' : 'Lisää suosikiksi: ') + nimi);
  kuva.src = suosikki ? 'icons/heart-filled.svg' : 'icons/heart-outline.svg';
  if (teksti) teksti.textContent = suosikki ? 'Suosikeissa' : 'Lisää suosikiksi';
}
// AI-KÄYTTÖ PÄÄTTYY
