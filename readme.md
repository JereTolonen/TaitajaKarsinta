# Tapahtumakalenteri

Taitaja2027, laji 206 – webkehityksen karsinta.

## Kuvaus

Responsiivinen tapahtumasovellus, jossa käyttäjä voi selata, hakea, suodattaa ja lajitella tapahtumia. Tapahtuman voi avata omalle yksityiskohtasivulleen ja merkitä suosikiksi. Tapahtumat luetaan JSON-tiedostosta (`public/data/tapahtumat.json`) selaimen JavaScriptillä (`fetch`), ja kortit sekä yksityiskohtasivu muodostetaan aineistosta. Tietokantaa ei käytetä.

## Teknologiat

- HTML, CSS (ei CSS-kirjastoja) ja JavaScript (fetch, DOM, evästeet)
- Node.js ja Express (sivujen tarjoilu ja reitit)
- EJS (sivupohjat; ylätunniste, navigaatio ja alatunniste yhteisinä osina kansiossa `views/partials`)
- dotenv (ympäristömuuttujat `.env`-tiedostosta)
- Docker ja Docker Compose (valinnainen käynnistystapa)

## Sivuston avaaminen

Sivusto tarvitsee Node.js-palvelimen, koska sivut (`/` ja `/tapahtuma.html`) ovat Express-reittejä. HTML-tiedostoja ei voi avata suoraan tuplaklikkaamalla.

### Node.js

```bash
npm install
cp .env.example .env   # Windows: copy .env.example .env
npm start
```

Avaa selaimessa http://localhost:3000. Terminaaliin tulostuu `Server is running on http://localhost:3000`.

### Docker

```bash
docker compose up -d --build
```

Portti ja `NODE_ENV` luetaan `.env`-tiedostosta (oletuksena 3000 ja production).

## Rakenne

```
app.js                  Express-sovellus ja virheenkäsittely
bin/www                 Palvelimen käynnistys
routes/index.js         Etusivu (/) ja yksityiskohtasivu (/tapahtuma.html?id=)
routes/users.js         Express-pohjan esimerkkireitti /users, ei käytössä sivuilla
views/                  EJS-sivut (index, tapahtuma, error) ja partials
public/data/            tapahtumat.json
public/javascripts/     main.js (valikko), tapahtumat.js (lista), tapahtuma.js (yksityiskohdat), suosikit.js (evästeet)
public/stylesheets/     style.css
public/icons, images    Ikonit, favicon ja tapahtumakuvat
prompts/                Annettu tehtävämateriaali (tehtävänanto, wireframet, alkuperäinen tapahtumat.json)
```

## Valmiit ominaisuudet

Alla olevat ominaisuudet on testattu selaimessa (Chromium, leveydet 375, 800 ja 1200 px).

- Etusivu wireframen mukaan: logo, navigaatio, hero, haku, kategoriasuodatin, lajittelu, kortit, tilastot ja alatunniste
- Responsiivisuus: työpöydällä kolmen sarakkeen ruudukko (tabletilla kaksi), mobiilissa kortit allekkain ja hampurilaisvalikko (avautuu, sulkeutuu linkistä ja Esc-näppäimellä)
- Kortit muodostetaan JSON-aineistosta: kuva, nimi, kategoria, paikkakunta ja osallistujamäärä. Koko kortti on klikattava
- Haku nimen perusteella päivittyy kirjoitettaessa, eikä kirjainkoolla ole väliä
- Kategoriat muodostetaan aineistosta, ja haku ja suodatus toimivat yhdessä
- Lajittelu: nimi A–Ö / Ö–A sekä osallistujat nousevasti / laskevasti. Lajittelu kohdistuu haun ja suodatuksen tuloksiin
- Tilastot: näkyvien tapahtumien määrä ja niiden osallistujien yhteismäärä päivittyvät jokaisen haun, suodatuksen ja lajittelun jälkeen
- Yksityiskohtasivu `tapahtuma.html?id=3`: kuva, nimi, kategoria, paikkakunta, osallistujat, kuvaus, päivämäärä, kesto ja paluulinkki. Puuttuva tai tuntematon id näyttää ilmoituksen
- Suosikit: lisäys ja poisto sydänpainikkeesta etusivulla ja yksityiskohtasivulla. Id:t tallennetaan evästeeseen `suosikit` (voimassa vuoden), ja valinnat palautuvat sivun uudelleenlatauksen jälkeen. Navigaation Suosikit-linkki näyttää vain suosikit
- Annettu favicon, semanttiset elementit (header, nav, main, section, article, footer) ja saavutettavat nimet painikkeille
- Oma 404-/virhesivu

## Keskeneräiset tai puuttuvat ominaisuudet ja tunnetut viat

- Kun yksityiskohtasivun id on virheellinen tai puuttuu, virheilmoituksen alle jää näkyviin tyhjä tapahtumakortti. Syy: CSS-sääntö `.detail-card { display: grid }` ohittaa `hidden`-attribuutin
- Ei-numeerinen id (esim. `?id=abc`) näyttää ilmoituksen "Tapahtumaa ei valittu", vaikka oikea ilmoitus olisi virheellinen tunniste
- Alatunnisteen Tietosuojaseloste- ja Käyttöehdot-linkeille ei ole sisältösivuja (`href="#"`)
- Yhteystiedot-linkki vie alatunnisteeseen, jossa ei ole yhteystietoja
- Hyvin kapealla näytöllä (320 px) mobiilikortit aiheuttavat vähäisen vaakavierityksen
- Yksityiskohtasivun tietolista (`dl`) sisältää `div`- ja `img`-elementtejä tavalla, joka ei ole kelvollista HTML:ää
- Annettuja ikoneja `arrow-down.svg` ja `close.svg` ei käytetä
- Kuvat ovat isoja PNG-tiedostoja (n. 2 Mt / kuva). Niitä ei ole pienennetty, mutta etusivulla ne ladataan laiskasti (`loading="lazy"`)

## Muutokset annettuun aineistoon

- `tapahtumat.json` on kopioitu kansioon `public/data/`. Alkuperäinen on kansiossa `prompts/`
- Kuvapolut on korjattu vastaamaan annettuja kuvatiedostoja (`images/tapahtuma1.jpg` → `images/Kuva1.png` jne.)
- Jokaiselle tapahtumalle on lisätty kentät `kuvaus`, `paivamaara` ja `kesto`, koska yksityiskohtasivun wireframe näyttää ne. **Vain tapahtuman 3 tiedot ovat peräisin annetusta materiaalista (wireframesta). Tapahtumien 1, 2, 4, 5 ja 6 kuvaus, päivämäärä ja kesto ovat tekoälyn keksimiä esimerkkitietoja, eivät annettua aineistoa**
- Kesto-ikoni `public/icons/clock.svg` ei kuulu annettuihin ikoneihin, vaan se on tehty itse annettujen ikonien tyyliin
- Tyyliohjeet `prompts/general.md` ja `prompts/inspiration.md` on jätetty pois repositoriosta `.gitignore`-tiedostolla

## Tekoälyn käyttö

- **Työkalu:** Claude (Anthropic), malli Claude Opus 5.5
- **Missä:** koko toteutuksessa. Tekoäly tuotti ja refaktoroi Express-pohjan, EJS-sivut ja -osat, CSS-tyylit, JavaScript-toiminnot (korttien muodostus, haku, suodatus, lajittelu, tilastot, suosikit, yksityiskohtasivu, valikko), Docker- ja Compose-määritykset, `.env`-tuen, aineiston lisäkentät sekä tämän README:n. Tekoälyä käytettiin myös toteutuksen tarkistamiseen hyväksymiskriteerejä vasten ja virheiden etsimiseen
- **Tarkoitus:** sovelluksen toteuttaminen tehtävänannon ja wireframejen mukaan, koodin refaktorointi sekä toteutuksen tarkistaminen ja testaaminen
- Tekoälyn tuottamat tai olennaisesti muokkaamat koodiosiot on merkitty lähdekoodiin kommenteilla `AI-KÄYTTÖ ALKAA` / `AI-KÄYTTÖ PÄÄTTYY`, ja merkinnässä kerrotaan työkalu ja tarkoitus (EJS-tiedostoissa `<%# ... %>`, CSS:ssä `/* ... */`, Docker- ja asetustiedostoissa `#`). JSON-tiedostoon ei voi kirjoittaa kommentteja, joten sen muutokset on kuvattu kohdassa "Muutokset annettuun aineistoon"
- Commit-viesteissä on merkintä `Co-Authored-By: Claude`
