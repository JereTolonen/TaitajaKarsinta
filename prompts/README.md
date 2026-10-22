<div align="center">

# TAITAJA2027 | LAJI 206

### Webkehityksen karsinta

## 🔷 TAPAHTUMASOVELLUS – VARSINAINEN TEHTÄVÄ

</div>

<table>
<tr>
<td width="50%"><strong>⏱️ TYÖSKENTELYAIKA</strong><br>22.10. klo 13.00–15.00</td>
<td width="50%"><strong>📤 PALAUTUS</strong><br>GitHubiin viimeistään klo 15.00</td>
</tr>
<tr>
<td><strong>📁 REPOSITORIO</strong><br>Käytä ennen klo 13.00 luomaasi repoa.</td>
<td><strong>✅ ARVIOINTI</strong><br>Repositorion sisältö ja commit-historia klo 15.00.</td>
</tr>
</table>

> [!IMPORTANT]
> **TEHTÄVÄNANTO: TOTEUTA TAPAHTUMASOVELLUS**  
> Toteuta responsiivinen tapahtumasovellus annettujen wireframe-kuvien mukaisesti. Sovelluksen etusivulla käyttäjä selaa, hakee, suodattaa ja lajittelee tapahtumia. Tapahtumakortista avataan erillinen tapahtuman yksityiskohtasivu. Käyttäjä voi myös merkitä tapahtumia suosikeiksi. Saat tapahtumatiedot, kuvat, ikonit, faviconit ja tekoälyn käyttöohjeen valmiina.

---

## Tapahtumasovelluksen tavoite

Rakenna toimiva ja viimeistelty verkkosovellus, joka muodostaa tapahtumat valmiista JSON-aineistosta. Toteuta sekä tapahtumalista että tapahtuman yksityiskohtasivu työpöytä- ja mobiilinäkymiin.

Tehtävä on tarkoituksella laaja, joten etene **toimiva kokonaisuus edellä**.

## Lähtömateriaalit

- neljä wireframe-kuvaa: etusivu ja tapahtumasivu työpöytä- ja mobiilinäkymissä
- valmis `tapahtumat.json`-tiedosto
- tapahtumissa käytettävät kuvat
- käyttöliittymän ikonit ja faviconit

> Kaikki tapahtumatiedot luetaan valmiista JSON-tiedostosta. **Tietokantaa ei käytetä.**

---

## Toteutettavat osat

<table>
<tr>
<td width="52" align="center"><h2>1</h2></td>
<td><strong>Etusivu</strong><br><br>
Toteuta wireframen mukainen etusivu.<br>
• Logo, navigaatio ja hero-osio<br>
• Haku, kategoriasuodatin ja lajittelu<br>
• Tapahtumakortit, tilastot ja alatunniste
</td>
</tr>
<tr>
<td align="center"><h2>2</h2></td>
<td><strong>Responsiivisuus</strong><br><br>
Sivuston tulee toimia työpöydällä ja mobiilissa.<br>
• Työpöydällä usean sarakkeen ruudukko<br>
• Mobiilissa tapahtumat allekkain ja hampurilaisvalikko<br>
• Kaikki elementit mukautuvat näytön kokoon
</td>
</tr>
<tr>
<td align="center"><h2>3</h2></td>
<td><strong>Tapahtumien näyttäminen</strong><br><br>
Lue tapahtumat valmiista JSON-tiedostosta JavaScriptillä.<br>
• Muodosta kortit aineistosta, älä kirjoita tapahtumia käsin HTML:ään<br>
• Näytä vähintään kuva, nimi, kategoria, paikkakunta ja osallistujamäärä
</td>
</tr>
<tr>
<td align="center"><h2>4</h2></td>
<td><strong>Yksityiskohtasivu</strong><br><br>
Avaa valittu tapahtuma omalle sivulleen.<br>
• Valitse tapahtuma URL-parametrilla, esimerkiksi <code>tapahtuma.html?id=3</code><br>
• Näytä aineistossa olevat tarkemmat tiedot<br>
• Lisää paluulinkki tapahtumalistaan
</td>
</tr>
<tr>
<td align="center"><h2>5</h2></td>
<td><strong>Haku ja suodatus</strong><br><br>
Rajaa tapahtumia käyttäjän valintojen perusteella.<br>
• Haku nimen perusteella päivittyy kirjoitettaessa<br>
• Kategoriat muodostetaan aineistosta<br>
• Haku ja suodatus toimivat yhdessä
</td>
</tr>
<tr>
<td align="center"><h2>6</h2></td>
<td><strong>Lajittelu</strong><br><br>
Järjestä näkyvät tapahtumat.<br>
• Nimi A–Ö tai Ö–A<br>
• Osallistujamäärä nousevasti tai laskevasti<br>
• Toimii myös haun ja suodatuksen jälkeen
</td>
</tr>
<tr>
<td align="center"><h2>7</h2></td>
<td><strong>Tilastot</strong><br><br>
Näytä ajantasaiset yhteenvetotiedot.<br>
• Näkyvien tapahtumien määrä<br>
• Näkyvien tapahtumien osallistujien kokonaismäärä<br>
• Päivittyvät haun ja suodatuksen jälkeen
</td>
</tr>
<tr>
<td align="center"><h2>8</h2></td>
<td><strong>Suosikit</strong><br><br>
Merkitse tapahtuma suosikiksi.<br>
• Suosikin voi lisätä ja poistaa<br>
• Tallenna tunnisteet evästeeseen<br>
• Valinta säilyy sivun lataamisen jälkeen<br>
• Erillistä suosikkisivua ei tarvita
</td>
</tr>
<tr>
<td align="center"><h2>9</h2></td>
<td><strong>Viimeistely</strong><br><br>
Huolehdi kokonaisuuden laadusta.<br>
• Semanttinen HTML<br>
• Selkeä ja johdonmukainen koodi<br>
• Annettu favicon<br>
• Rakenne vastaa wireframea
</td>
</tr>
</table>

---

## GitHub ja palautus

> [!CAUTION]
> **TÄRKEÄÄ**  
> Tee committeja koko työskentelyn ajan. Viimeisen commitin ja pushin tulee olla GitHubissa viimeistään klo 15.00. Älä jätä kaikkea yhteen loppucommittiin.

### Repositorion tarkistuslista

- [ ] Kaikki projektin tiedostot ovat repositoriossa.
- [ ] Commit-viestit kuvaavat tehtyjä muutoksia.
- [ ] Commit-historia näyttää työn etenemisen.
- [ ] `salesvee` ja `MinnaPunk` pääsee repositorioon.
- [ ] Viimeinen commit on pushattu ennen klo 15.00.

### Projektin README

Kirjaa projektisi README-tiedostoon:

- [ ] lyhyt kuvaus toteutuksesta
- [ ] käytetyt teknologiat
- [ ] ohje sivuston avaamiseen
- [ ] valmiit ominaisuudet
- [ ] keskeneräiset tai puuttuvat ominaisuudet
- [ ] tekoälyn käyttö ohjeen mukaisesti

---

## Tekoälyn käyttö

> [!NOTE]
> **AI:N KÄYTTÖ ON SALLITTUA**  
> Jos tekoäly tuottaa tai olennaisesti muokkaa koodia, merkitse käyttö sekä lähdekoodiin että README-tiedostoon. Puutteellinen tai epäselvä merkitseminen voidaan huomioida arvioinnissa.

### Merkintä lähdekoodiin

Rajaa tekoälyllä tuotettu tai olennaisesti muokattu koodiosio kommenteilla. Kerro käytetty työkalu ja käyttötarkoitus.

```javascript
// AI-KÄYTTÖ ALKAA
// Työkalu: Microsoft Copilot
// Tarkoitus: lajittelufunktion rakenteen tarkistaminen
function lajitteleTapahtumat(tapahtumat) {
  return tapahtumat.sort((a, b) => a.nimi.localeCompare(b.nimi));
}
// AI-KÄYTTÖ PÄÄTTYY
```

### Merkintä README-tiedostoon

Kerro:

- mitä tekoälytyökalua käytit
- missä tehtävän osissa käytit sitä
- mihin tarkoitukseen käytit sitä
- että olennaisesti tuotetut tai muokatut koodiosiot on merkitty lähdekoodiin

Tekoälyä saa käyttää oman koodin tarkistamiseen, parantamiseen, refaktorointiin ja virheiden etsimiseen. Jos tekoäly vaikuttaa lopulliseen koodiin olennaisesti, käyttö merkitään. Tarkempi ohje on tiedostossa `ai-suomi.pdf`.

> [!WARNING]
> **VASTUU ON SINULLA**  
> Vastaat itse ratkaisun oikeellisuudesta, toimivuudesta ja ymmärrettävyydestä. Tekoälyn käyttö ei itsessään paranna tai heikennä arviointia.

---

## Arviointi

| Arvioitava osa-alue | Pisteet |
|---|---:|
| HTML-rakenne ja semanttisuus | 5 |
| CSS, käyttöliittymä ja responsiivisuus | 20 |
| JSON-aineiston käsittely | 15 |
| Tapahtuman yksityiskohtasivu | 10 |
| Hakutoiminto | 10 |
| Kategoriasuodatus | 10 |
| Lajittelu | 10 |
| Tilastot | 5 |
| Suosikkien tallentaminen | 5 |
| Koodin laatu, Git-versionhallinta ja dokumentointi | 10 |
| **Yhteensä** | **100** |

---

## Palautuksen tarkistuslista

- [ ] Sivusto toimii työpöydällä ja mobiilissa.
- [ ] Tapahtumat luetaan JSON-tiedostosta.
- [ ] Haku, suodatus, lajittelu ja tilastot toimivat.
- [ ] Yksityiskohtasivu ja suosikit toimivat.
- [ ] README on päivitetty.
- [ ] AI:n käyttö on merkitty ohjeen mukaisesti.
- [ ] Viimeinen commit ja push on tehty ennen klo 15.00.

> [!TIP]
> **MUISTA**  
> Jos et ehdi tehdä kaikkea, keskity toimivaan ja laadukkaasti viimeisteltyyn kokonaisuuteen. Kirjaa keskeneräiset ominaisuudet README-tiedostoon.

---

<div align="center">

<sub>Taitaja2027 • Laji 206 • Varsinainen tehtävä klo 13.00</sub>

</div>
