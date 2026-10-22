// AI-KÄYTTÖ ALKAA
// Työkalu: Claude (Anthropic)
// Tarkoitus: hampurilaisvalikon avaaminen ja sulkeminen mobiilinäkymässä
document.addEventListener('DOMContentLoaded', function () {
  var nappi = document.querySelector('.menu-toggle');
  var valikko = document.querySelector('.main-nav');
  if (!nappi || !valikko) return;

  function asetaAuki(auki) {
    nappi.setAttribute('aria-expanded', String(auki));
    nappi.setAttribute('aria-label', auki ? 'Sulje valikko' : 'Avaa valikko');
    valikko.classList.toggle('is-open', auki);
  }

  nappi.addEventListener('click', function () {
    asetaAuki(nappi.getAttribute('aria-expanded') !== 'true');
  });

  // Sulje valikko, kun linkkiä painetaan tai Esc-näppäintä painetaan
  valikko.addEventListener('click', function (e) {
    if (e.target.closest('a')) asetaAuki(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nappi.getAttribute('aria-expanded') === 'true') {
      asetaAuki(false);
      nappi.focus();
    }
  });
});
// AI-KÄYTTÖ PÄÄTTYY
