# RideShare — Java 5 · Hyrja dhe lejet

## Çfarë ndërtova

GitHub verifikon identitetin dhe sesioni ruan ID-në e verifikuar. Roli (`udhetar` ose `shofer`) ruhet në tabelën `profilet` në Neon; përdoruesi nuk mund ta zgjedhë nga formulari. Pronësia ruhet te `udhetimet.shofer_id` dhe kontrollohet nga serveri në çdo ndryshim.

## Provat që bëra

### Prova 1: Hyrja, rifreskimi dhe dalja

Paneli u hap pa hyrje dhe shfaqi udhëzimin për konfigurimin e OAuth. Hyrja, rifreskimi i sesionit dhe dalja reale nuk mund të provohen ende: OAuth App personal nuk është konfiguruar (mungojnë `GITHUB_ID` dhe `GITHUB_SECRET`). Callback-u lokal duhet të jetë `http://localhost:3000/api/auth/callback/github`; pas vendosjes së kredencialeve në `.env.local`, rinis serverin dhe kryej provën me GitHub.

### Prova 2: Shoferi ndryshon udhëtimin e vet

Paneli, veprimi në server dhe kontrolli i pronësisë janë zbatuar. Ndryshimi real i ID 2 nuk është provuar, sepse duhet hyrë me OAuth dhe caktuar ID-ja jote GitHub si shofer/pronar në Neon. Pasi të kryhen këto hapa, ndryshoje orën në `08:25`, kontrollo panelin, listën, detajet dhe SQL Editor, pastaj riktheje në `08:15` dhe regjistro rezultatin.

### Prova 3: Veprimi pa leje refuzohet

Në Neon provova kushtin e pronësisë për ID 1 me një identitet që nuk është pronar: query-ja nuk ktheu rreshta dhe ora mbeti `08:00`. Formularin e aplikacionit duke ndryshuar ID-në nga `2` në `1` nuk e provova ende, sepse kërkon hyrje me OAuth dhe caktimin e pronarit. Kontrolli i serverit përdor njëkohësisht rolin dhe pronarin nga Neon; ID-ja e dërguar nga formulari nuk mjafton për autorizim.

## Ku gjendet puna

Repository: https://github.com/blineravrellaku/rideshare-mobile

- `aplikacioni/schema-java05.sql` — profili, roli dhe pronari i udhëtimit
- `aplikacioni/lib/auth.ts`, `aplikacioni/lib/lejet.ts` — sesioni dhe kontrolli i lejeve
- `aplikacioni/app/api/auth/[...nextauth]/route.ts` — OAuth callback
- `aplikacioni/app/panel/` dhe `aplikacioni/components/Hyrja.tsx` — hyrja dhe paneli
- `aplikacioni/app/page.tsx` — lidhja për te paneli

OAuth App për Vercel nuk është konfiguruar; aplikacioni i javës synon fillimisht `http://localhost:3000`.

Për provën interaktive, krijo një OAuth App personale me homepage `http://localhost:3000` dhe callback `http://localhost:3000/api/auth/callback/github`. Vendos Client ID dhe Secret vetëm në `aplikacioni/.env.local`, pastaj hyr te `/panel`. Pasi paneli të tregojë ID-në numerike të GitHub-it, cakto rolin/pronarin në Neon:

```sql
UPDATE profilet SET roli = 'shofer' WHERE github_id = 'ID_JOTE_GITHUB';
UPDATE udhetimet SET shofer_id = 'ID_JOTE_GITHUB' WHERE id = '2';
```

## Çfarë mbetet për përmirësim

Kërkesa për vend mbetet simulim. Hapi tjetër do të ishte ruajtja reale e rezervimit me autorizim dhe konfirmim nga shoferi.

## Ndihma nga AI

Përdora AI për të zbatuar kodin e hyrjes, sesionit, kontrollit të rolit/pronarit dhe për të përgatitur testet. Build-i dhe lint-i u ekzekutuan; provat që kërkojnë GitHub OAuth dhe veprimin real të përdoruesit janë shënuar qartë si të paprovuara.
