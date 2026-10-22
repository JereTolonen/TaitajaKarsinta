# Tapahtumakalenteri

Taitaja2027, laji 206 – webkehityksen karsinta.

Responsiivinen tapahtumasovellus, jossa käyttäjä voi selata, hakea, suodattaa ja lajitella tapahtumia, avata tapahtuman omalle yksityiskohtasivulleen ja merkitä tapahtumia suosikeiksi. Tapahtumat luetaan JSON-tiedostosta (`public/data/tapahtumat.json`) selaimen JavaScriptillä. Tietokantaa ei käytetä.

## Teknologiat

- Node.js ja Express (palvelin, reitit)
- EJS (sivupohjat; ylätunniste, navigaatio ja alatunniste yhteisinä osina `views/partials`)
- HTML, CSS (ei CSS-kirjastoja) ja JavaScript (fetch, DOM, evästeet)
- dotenv (ympäristömuuttujat `.env`-tiedostosta)
- Docker ja Docker Compose

## Sivuston avaaminen

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
public/icons, images    Annetut ikonit, favicon ja kuvat
```

## Valmiit ominaisuudet

- Etusivu wireframen mukaan: logo, navigaatio, hero, haku, kategoriasuodatin, lajittelu, kortit, tilastot ja alatunniste
- Responsiivisuus: työpöydällä kolmen sarakkeen ruudukko (tabletilla kaksi), mobiilissa kortit allekkain ja hampurilaisvalikko
- Kortit muodostetaan JSON-aineistosta: kuva, nimi, kategoria, paikkakunta ja osallistujamäärä
- Yksityiskohtasivu `tapahtuma.html?id=3`: kuvaus, päivämäärä, kesto, paikkakunta, osallistujat ja paluulinkki. Virheellinen tai puuttuva id näyttää ilmoituksen
- Haku nimen perusteella päivittyy kirjoitettaessa
- Kategoriat muodostetaan aineistosta, ja haku ja suodatus toimivat yhdessä
- Lajittelu: nimi A–Ö / Ö–A, osallistujat nousevasti / laskevasti. Toimii haun ja suodatuksen jälkeen
- Tilastot: näkyvien tapahtumien määrä ja osallistujien yhteismäärä, päivittyvät valintojen mukaan
- Suosikit: lisäys ja poisto sydänpainikkeesta etusivulla ja yksityiskohtasivulla. Id:t tallennetaan evästeeseen `suosikit` (voimassa vuoden). Navigaation Suosikit-linkki näyttää vain suosikit
- Annettu favicon, semanttinen HTML (header, nav, main, section, article, footer, dl), saavutettavat nimet painikkeille
- Oma 404-/virhesivu, jonka otsikko ja teksti muodostetaan virheestä

## Keskeneräiset tai puuttuvat ominaisuudet

- Alatunnisteen Tietosuojaseloste- ja Käyttöehdot-linkeille ei ole sisältösivuja
- Yhteystiedot-linkki vie alatunnisteeseen, erillistä yhteystietosivua ei ole
- Kuvat ovat isoja PNG-tiedostoja (n. 2 Mt / kuva). Niitä ei ole pienennetty, mutta ne ladataan laiskasti (`loading="lazy"`)

## Muutokset annettuun aineistoon

- `tapahtumat.json` on kopioitu kansioon `public/data/`
- Tehtävänanto ja wireframet (`prompts/`) on jätetty pois repositoriosta `.gitignore`-tiedostolla
- Kuvapolut on korjattu vastaamaan annettuja kuvatiedostoja (`images/Kuva1.png` jne.)
- Jokaiselle tapahtumalle on lisätty kentät `kuvaus`, `paivamaara` ja `kesto`, koska yksityiskohtasivun wireframe näyttää ne. Tapahtuman 3 tiedot ovat wireframesta, muut ovat keksittyjä esimerkkitietoja
- Kesto-ikoni `public/icons/clock.svg` on lisätty annettujen ikonien tyyliin

## Tekoälyn käyttö

- **Työkalu:** Claude (Anthropic), malli Claude Opus 5.5
- **Missä:** koko toteutuksessa. Tekoäly tuotti Express-pohjan, EJS-sivut ja -osat, CSS-tyylit, JavaScript-toiminnot (korttien muodostus, haku, suodatus, lajittelu, tilastot, suosikit, yksityiskohtasivu, valikko), Docker- ja Compose-määritykset, `.env`-tuen, aineiston lisäkentät sekä tämän README:n
- **Tarkoitus:** sovelluksen toteuttaminen tehtävänannon ja wireframejen mukaan
- Tekoälyn tuottamat koodiosiot on merkitty lähdekoodiin kommenteilla `AI-KÄYTTÖ ALKAA` / `AI-KÄYTTÖ PÄÄTTYY` (EJS-tiedostoissa `<%# ... %>`, Docker- ja asetustiedostoissa `#`). JSON-tiedostoon ei voi kirjoittaa kommentteja, joten sen muutokset on kuvattu yllä
- Commit-viesteissä on merkintä `Co-Authored-By: Claude`
