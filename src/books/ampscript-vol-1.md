---
# ─── Identity ─────────────────────────────────────────────────────────────
series: AMPscript
seriesOrder: 2
volume: 1
fullTitle: AMPscript for Salesforce Marketing Cloud
platform: Salesforce Marketing Cloud
level: Beginners to Intermediate
tagline: Learn AMPscript for Salesforce Marketing Cloud from Scratch.

# ─── Status: available | coming-soon | out-of-print ───────────────────────
status: available
asin: B0BVNWG96V
cover: /assets/img/ampscript-vol1-cover.webp
coverWide: /assets/img/ampscript-vol1-cover-wide.webp
coverOg: /assets/img/ampscript-vol1-cover.png

features:
  - Theory
  - Examples
  - Use Cases
  - Practice
  - Challenges
  - and much more!

# ─── Downloads (files live in src/downloads/ampscript-vol-1/) ─────────────
downloads:
  - part: Part I
    files:
      - { label: contacts.csv, href: /downloads/ampscript-vol-1/contacts.csv }
    steps:
      - Go to Salesforce Marketing Cloud, navigate to the contact Data Extension we created earlier and click IMPORT to start the data import. Follow the instructions on screen to finalise the import.
  - part: Part II
    files:
      - { label: products.csv, href: /downloads/ampscript-vol-1/products.csv }
    steps:
      - Go to Salesforce Marketing Cloud, navigate to the products Data Extension we created earlier and click IMPORT to start the data import. Follow the instructions on screen to finalise the import.
  - part: Part III
    files:
      - { label: films.csv, href: /downloads/ampscript-vol-1/films.csv }
      - { label: contacts.csv, href: /downloads/ampscript-vol-1/contacts.csv }
    steps:
      - Go to Salesforce Marketing Cloud, navigate to the films Data Extension we created earlier and click IMPORT to start the data import. Follow the instructions on screen to finalise the import*.
      - Repeat for the contacts data extension.
    note: "* During the import, use Date Format: English (United States)."

# ─── Killer Challenge (help & solution page: /ampscript-vol-1/help/) ──────
killerChallenge:
  story: As a Developer, I would like to…
  brief:
    - build a cloud page that compiles and renders an accurate summary of tickets reservations with a breakdown by contact and by film. The page should also display a total of tickets booked.
    - The page myst show real time data and cannot relay on automations or SQL queries.
  approach:
    - We returned the list of all reservations where tickets = 1, ordered by customer ID then film ID.
    - We retrieved the relevant attributes, add a few lookups to get the user friendly output (contact’s name instead of ID, film title and subtitle instead of ID).
    - We rendered all rows in an HTML table, added headers, rendered all rows using a loop.
    - We appended a new row to the same table, to return the total number of individual tickets booked (not the number of rows in the Data Extension…)
    - Finally, we implemented some logic that checks, for each row, If the next record contains the same contact ID and film ID. If so, we increment the number of tickets and keep on looping, otherwise we display the name of the client, name of the film and total number of tickets booked.
    - Oh, and we added a few checks on first and last row, as well, just to avoid annoying errors…
  solution: /downloads/ampscript-vol-1/AMPscript_Vol1_KillerChallenge.txt

# ─── Bonus Challenges (comment thread page: /ampscript-vol-1/bonus-challenges/)
bonusChallenges: true
---

## About AMPscript

AMPscript is a scripting language that has been developed with one goal in mind: hyperpersonalization.

If you are just starting with Salesforce Marketing Cloud, learning AMPscript will change your life (or at least make your job much easier).

### About the author

<div class="author-box" lang="fr">

**Francois Romain**

Francois Romain est un écrivain Français installé au Royaume Unis depuis 2010. Né le 20 mai 1974 près de Paris, il suivra en parallèle des etudes scientifiques et sa passion pour le théâtre et l’écriture. Après trois romans publiés chez 131 Editions, il change de style – et de nom – pour se frotter à l’auto-fiction avec ‘Presque Vrai’, un roman incisif et décapant qui signe son retour sur la scène littéraire.

</div>
