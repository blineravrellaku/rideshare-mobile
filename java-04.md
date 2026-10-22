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

Testi duhet të kryhet duke hapur SQL Editor të Neon, duke ndryshuar orën e një udhëtimi dhe duke rifreskuar listën e aplikacionit. Nëse ndryshimi shfaqet në listë dhe në faqen e detajeve pa ndryshuar kodin, kjo konfirmon që aplikacioni lexon të dhënat nga databaza.

### Rezultati real

Lidhja reale me Neon funksionoi dhe databaza ktheu tri udhëtime. Ora e udhëtimit me ID 2 u ndryshua përkohësisht në `08:25`; ndryshimi u shfaq si në listë, ashtu edhe në faqen e detajeve. Pastaj ora u rikthye në `08:15`. Nuk u ndryshua kodi gjatë kësaj prove.

## 5. Prova 2 — Lista bosh nuk është gabim lidhjeje

### Hapat e testit

Testi duhet të kryhet duke ndryshuar përkohësisht query-n e leximit të udhëtimeve në mënyrë që të kthejë zero rreshta, duke e rifreskuar faqen dhe duke kontrolluar mesazhin e statusit. Pastaj query-ja duhet të rikthehet në versionin origjinal.

### Rezultati real

Query-ja `WHERE false` ktheu zero rreshta dhe faqja shfaqi “Nuk ka udhëtime për momentin.”. Query-ja origjinale u rikthye, u rindërtua aplikacioni dhe tri udhëtimet u shfaqën përsëri.

## 6. Prova 3 — Lidhja mungon dhe pastaj rikthehet

### Hapat e testit

Testi duhet të kryhet duke riemërtuar përkohësisht `DATABASE_URL` në `.env.local`, duke nisur aplikacionin dhe duke kontrolluar mesazhin e gabimit. Pastaj emri i variablit duhet të rikthehet dhe aplikacioni duhet të funksionojë sërish.

### Rezultati real

Ky test nuk u krye, sepse `.env.local` ka një lidhje aktive me Neon. Kodi kontrollon në server nëse mungon `DATABASE_URL` dhe faqet shfaqin mesazhin “Nuk u lidhëm me databazën. Provo përsëri.” kur leximi dështon. Mos e publiko skedarin `.env.local`.

## 7. Përfundimi

Java 4 është zbatuar në kod: lista dhe faqet e udhëtimeve lexojnë nga Neon, skema krijon tri udhëtime, dhe kërkesa mbetet vetëm simulim. Lidhja me Neon dhe provat e ndryshimit të orës dhe listës bosh u verifikuan lokalisht. Prova e mungesës së `DATABASE_URL`, konfigurimi i Vercel dhe dorëzimi në GitHub mbeten për t’u kryer.

Build-i dhe lint-i kaluan. `DATABASE_URL` është lokal, i përjashtuar nga Git dhe nuk u publikua.
