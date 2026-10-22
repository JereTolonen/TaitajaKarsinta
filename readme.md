# Tapahtumakalenteri

Webkehityksen karsinta. Responsiivinen tapahtumasovellus, jonka tapahtumat luetaan JSON-tiedostosta JavaScriptillä.

Projektissa on kaksi versiota:

- **Demo (`demo/`)** – staattinen HTML/CSS/JS-versio, ei vaadi palvelinohjelmistoa. Nopea arvioitava versio: https://jeretolonen.github.io/TaitajaKarsinta/demo
- **Express-versio** – sama sovellus Node.js/Express-palvelimella.

## Teknologiat

- Demo: HTML, CSS, JavaScript
- Express-versio: JS, Node.js, Express, EJS, dotenv, Docker

## Käynnistys

### Demo

Verkossa: https://jeretolonen.github.io/TaitajaKarsinta/demo

Paikallisesti: avaa `demo/index.html` paikallisen palvelimen kautta, esim. VS Coden Live Server tai:

```bash
npx serve demo
```

Suoraan tiedostona (`file://`) avattuna selain estää JSON-tiedoston lataamisen.

### Express-versio

```bash
npm install
cp .env.example .env   # Windows: copy .env.example .env
npm start
```

Avaa http://localhost:3000. Vaihtoehtoisesti `docker compose up -d --build`.

## Valmiit ominaisuudet

Testattu demossa selaimessa (leveydet 320, 375, 800 ja 1200 px).

- Etusivu, kortit, tilastot ja alatunniste wireframen mukaan
- Responsiivisuus ja hampurilaisvalikko
- Kortit muodostetaan JSON-aineistosta
- Haku päivittyy kirjoitettaessa, kategoriat muodostetaan aineistosta ja lajittelu (nimi A–Ö / Ö–A, osallistujat nousevasti / laskevasti) toimii haun ja suodatuksen tuloksiin
- Tilastot lasketaan näkyvistä tapahtumista ja päivittyvät jokaisen muutoksen jälkeen
- Yksityiskohtasivu `tapahtuma.html?id=3`, tarkemmat tiedot aineistosta ja paluulinkki. Puuttuva, virheellinen tai tuntematon tunniste näyttää ilmoituksen
- Suosikit tallennetaan evästeeseen ja säilyvät uudelleenlatauksen jälkeen. Suosikit-linkki näyttää vain suosikit

## Keskeneräiset tai puuttuvat ominaisuudet ja tunnetut viat

Molemmat versiot lukevat samaa `tapahtumat.json`-tiedostoa, ja kuvien polut (`images/tapahtuma1.avif` jne.) vastaavat aineistoa.

### Molemmat versiot

- Aineistossa ei ole päivämäärää eikä kestoa, joten yksityiskohtasivulla näytetään aineiston kentät: kuva, nimi, kategoria, paikkakunta, osallistujat ja `tarkemmat_tiedot`
- Yhteystiedot-linkki vie alatunnisteeseen, jossa ei ole yhteystietoja
- Annettu `close.svg` on sisällöltään sama kuin `arrow-down.svg`, joten sitä ei käytetä. `clock.svg` ei ole käytössä, koska kestotietoa ei ole

### Demo

- Alatunnisteen Tietosuojaseloste ja Käyttöehdot eivät ole linkkejä, koska niille ei ole sisältöä

### Express-versio

- Alatunnisteen Tietosuojaseloste- ja Käyttöehdot-linkit ovat tyhjiä (`href="#"`)
- Hyvin kapealla näytöllä (320 px) etusivu aiheuttaa vähäisen vaakavierityksen

## Tekoälyn käyttö

- **Työkalu:** Claude (Anthropic)
- **Missä:** koko toteutus (demo, palvelin, sivupohjat, CSS, JavaScript, Docker, README)
- **Tarkoitus:** koodin tuottaminen, refaktorointi, tarkistaminen ja testaus
- Tekoälyn tuottamat tai olennaisesti muokkaamat koodiosiot on merkitty lähdekoodiin kommenteilla `AI-KÄYTTÖ ALKAA` / `AI-KÄYTTÖ PÄÄTTYY`
