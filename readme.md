# Tapahtumakalenteri

Taitaja2027, laji 206 – webkehityksen karsinta. Responsiivinen tapahtumasovellus, jonka tapahtumat luetaan JSON-tiedostosta JavaScriptillä.

## Teknologiat

HTML, CSS, JavaScript, Node.js, Express, EJS, dotenv, Docker

## Käynnistys

```bash
npm install
cp .env.example .env   # Windows: copy .env.example .env
npm start
```

Avaa http://localhost:3000. Vaihtoehtoisesti `docker compose up -d --build`.

## Valmiit ominaisuudet

- Etusivu, kortit, tilastot ja alatunniste wireframen mukaan
- Responsiivisuus ja hampurilaisvalikko
- Haku, kategoriasuodatus ja lajittelu (nimi A–Ö / Ö–A, osallistujat nousevasti / laskevasti) toimivat yhdessä
- Tilastot päivittyvät näkyvien tapahtumien mukaan
- Yksityiskohtasivu `tapahtuma.html?id=3` ja paluulinkki
- Suosikit tallennetaan evästeeseen ja säilyvät uudelleenlatauksen jälkeen

## Keskeneräiset tai puuttuvat ominaisuudet ja tunnetut viat

- Kun yksityiskohtasivun id on virheellinen tai puuttuu, virheilmoituksen alle jää näkyviin tyhjä tapahtumakortti. Syy: CSS-sääntö `.detail-card { display: grid }` ohittaa `hidden`-attribuutin
- Ei-numeerinen id (esim. `?id=abc`) näyttää ilmoituksen "Tapahtumaa ei valittu", vaikka oikea ilmoitus olisi virheellinen tunniste
- Alatunnisteen Tietosuojaseloste- ja Käyttöehdot-linkeille ei ole sisältösivuja (`href="#"`)
- Yhteystiedot-linkki vie alatunnisteeseen, jossa ei ole yhteystietoja
- Hyvin kapealla näytöllä (320 px) mobiilikortit aiheuttavat vähäisen vaakavierityksen
- Yksityiskohtasivun tietolista (`dl`) sisältää `div`- ja `img`-elementtejä tavalla, joka ei ole kelvollista HTML:ää
- Annettuja ikoneja `arrow-down.svg` ja `close.svg` ei käytetä
- Kuvat ovat isoja PNG-tiedostoja (n. 2 Mt / kuva), eikä niitä ole pienennetty
- `tapahtumat.json`-tiedoston kuvapolut (`images/tapahtuma1.jpg` jne.) eivät vastaa kuvatiedostoja (`images/Kuva1.png` jne.), joten kuvat eivät näy
- Yksityiskohtasivu ei näytä aineiston kenttää `tarkemmat tiedot`, koska koodi lukee kenttiä `kuvaus`, `paivamaara` ja `kesto`, joita aineistossa ei ole

## Tekoälyn käyttö

- **Työkalu:** Claude (Anthropic)
- **Missä:** koko toteutus (palvelin, sivupohjat, CSS, JavaScript, Docker, aineiston lisäkentät, README)
- **Tarkoitus:** koodin tuottaminen, refaktorointi, tarkistaminen ja testaus
- Tekoälyn tuottamat tai olennaisesti muokkaamat koodiosiot on merkitty lähdekoodiin kommenteilla `AI-KÄYTTÖ ALKAA` / `AI-KÄYTTÖ PÄÄTTYY`
