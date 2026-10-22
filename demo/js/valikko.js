// AI-KÄYTTÖ ALKAA
// Työkalu: Claude (Anthropic)
// Tarkoitus: hampurilaisvalikon avaaminen ja sulkeminen mobiilinäkymässä
var valikkoNappi = document.querySelector('.menu-toggle');
var valikko = document.querySelector('.main-nav');

function asetaValikkoAuki(auki) {
  valikkoNappi.setAttribute('aria-expanded', String(auki));
  valikkoNappi.setAttribute('aria-label', auki ? 'Sulje valikko' : 'Avaa valikko');
  valikko.classList.toggle('is-open', auki);
}

valikkoNappi.addEventListener('click', function () {
  asetaValikkoAuki(valikkoNappi.getAttribute('aria-expanded') !== 'true');
});

// Sulje valikko, kun linkkiä painetaan
valikko.addEventListener('click', function (e) {
  if (e.target.closest('a')) asetaValikkoAuki(false);
});

// Sulje valikko Esc-näppäimellä
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && valikkoNappi.getAttribute('aria-expanded') === 'true') {
    asetaValikkoAuki(false);
    valikkoNappi.focus();
  }
});
// AI-KÄYTTÖ PÄÄTTYY
