# RideShare — Java 4

## 1. Qëllimi i javës

Në Javën 4, qëllimi ishte lidhja e aplikacionit RideShare me një bazë të dhënash PostgreSQL në Neon, në mënyrë që lista e udhëtimeve dhe faqet e detajeve të lexojnë të dhëna jo më nga një skedar statik, por nga databaza. Kjo ndihmon për t’u afruar me modelin real të aplikacioneve web në prodhim, ku serveri i aplikacionit lexon të dhënat nga një bazë e pavarur dhe të siguruar.

## 2. Puna e bërë

Përditësimi i projektit u bë pa krijuar një projekt të ri. U vazhdua përdorimi i projektit ekzistues të Next.js me App Router, ndërsa u shtuan dependency-t e nevojshme për lidhjen me Neon dhe një skemë SQL bazë në aplikacionin e vet.

U krijuan komponenti i lidhjes me databazën, skedari SQL i tabelës dhe përditësimet e faqeve për të lexuar udhëtime nga Neon. Gjatë zhvillimit u ruajt parimit që databaza nuk shkon në telefon dhe se `DATABASE_URL` duhet të mbetet në server; ajo nuk duhet të publikohet në GitHub.

## 3. Struktura e projektit

Një versioni i aktualizuar i projektit mbante strukturën e mëposhtme:

- `aplikacioni/lib/db.ts` — lidhja private me Neon
- `aplikacioni/lib/udhetimet.ts` — funksionet e leximit të të dhënave nga databaza
- `aplikacioni/app/page.tsx` — lista e udhëtimeve
- `aplikacioni/app/udhetimi/[id]/page.tsx` — detajet e një udhëtimi
- `aplikacioni/app/udhetimi/[id]/kerkesa/page.tsx` — simulimi i kërkesës
- `aplikacioni/schema.sql` — SQL për krijimin e tabelës dhe rreshtave fillestarë
- `aplikacioni/.env.local` — variabli lokal i lidhjes, jo në GitHub

## 4. Prova 1 — Ndryshimi ruhet në databazë

### Hapat e testit

Në Neon SQL Editor ndryshova orën e udhëtimit me ID 2 në `08:25`:

```sql
UPDATE udhetimet SET ora = '08:25' WHERE id = '2';
```

Rifreskova listën dhe faqen `/udhetimi/2`, pastaj e ktheva orën në `08:15`:

```sql
UPDATE udhetimet SET ora = '08:15' WHERE id = '2';
```

### Rezultati real

Lidhja reale me Neon funksionoi dhe databaza ktheu tri udhëtime. Ora e udhëtimit me ID 2 u ndryshua përkohësisht në `08:25`; ndryshimi u shfaq si në listë, ashtu edhe në faqen e detajeve. Pastaj ora u rikthye në `08:15`. Nuk u ndryshua kodi gjatë kësaj prove.

## 5. Prova 2 — Lista bosh nuk është gabim lidhjeje

### Hapat e testit

Te funksioni `lexoUdhetimet` ndryshova përkohësisht query-n në `FROM udhetimet WHERE false ORDER BY id` dhe rifreskova faqen kryesore. Më pas e hoqa `WHERE false`, rindërtova aplikacionin dhe kontrollova që udhëtimet u shfaqën përsëri.

### Rezultati real

Query-ja `WHERE false` ktheu zero rreshta dhe faqja shfaqi “Nuk ka udhëtime për momentin.”. Query-ja origjinale u rikthye, u rindërtua aplikacioni dhe tri udhëtimet u shfaqën përsëri.

## 6. Prova 3 — Lidhja mungon dhe pastaj rikthehet

### Hapat e testit

Hoqa përkohësisht `.env.local` nga vendndodhja e aplikacionit, nisa serverin pa `DATABASE_URL`-in lokal, rifreskova listën dhe faqen e detajeve, pastaj kontrollova edhe `/api/db-test`. Pas provës, e riktheva `.env.local` dhe testova përsëri lidhjen me Neon.

### Rezultati real

E hoqa përkohësisht `.env.local` nga vendndodhja ku ngarkohet aplikacioni, kështu `DATABASE_URL` mungonte gjatë nisjes. Lista dhe detajet shfaqën “Nuk u lidhëm me databazën. Provo përsëri.”, ndërsa `/api/db-test` ktheu statusin 500. Pastaj e riktheva `.env.local` dhe verifikova që lidhja me Neon punonte sërish.

## 7. Përfundimi

Java 4 është zbatuar në kod: lista dhe faqet e udhëtimeve lexojnë nga Neon, skema krijon tri udhëtime, dhe kërkesa mbetet vetëm simulim. Lidhja me Neon dhe të tria provat u verifikuan lokalisht. Konfigurimi i Vercel duhet verifikuar veçmas nëse aplikacioni publikohet atje.

Build-i dhe lint-i kaluan. `DATABASE_URL` është lokal, i përjashtuar nga Git dhe nuk u publikua.
