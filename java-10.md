# Java 10 · Kërkesë, pranim dhe rilidhje

## Çfarë u zbatua
- Kërkesa ruhet nga veprimi ekzistues i serverit në Neon; statusi i saj lexohet përsëri nga databaza në çdo rifreskim.
- Ekrani i udhëtarit dhe lista e shoferit rifreskojnë Server Components çdo 5 sekonda. Faqet janë dinamike, ndaj statusi lexohet përsëri nga databaza.
- Nëse shfletuesi humb lidhjen, ekrani tregon se gjendja mund të jetë e vjetër. Kur rikthehet lidhja, ekrani rilexon menjëherë; rifreskimi periodik vazhdon si mbulim shtesë.
- Rifreskimi ndalet kur komponenti hiqet dhe dëgjuesit e lidhjes pastrohen. Nuk ruhen fjalëkalime ose sekrete në kod/raport.

## Përgatitja e udhëtimit dhe llogarive testuese
Për provën reale duhen dy llogari GitHub testuese të kontrolluara nga studenti, një për shoferin dhe një për udhëtarin. Nuk u krijuan llogari të jashtme dhe nuk u përdorën kredenciale. Hyr një herë me secilën llogari që profili të krijohet automatikisht; pastaj:

1. Gjej ID-të numerike të dy profileve në Neon (`profilet.github_id`) dhe zëvendëso placeholder-at në `aplikacioni/seed-java10-demo.sql`.
2. Ekzekuto skriptin në të njëjtën databazë pas `schema-java05.sql` dhe `schema-java08.sql`. Skripti cakton rolet dhe krijon/ri-rregullon udhëtimin fiktiv `java10-test-demo` (Prishtinë → AAB, 16:30, Biblioteka Kombëtare, 2 vende). Ai ndalet me gabim të qartë nëse llogaritë nuk janë krijuar ose ID-të nuk janë zëvendësuar.
3. Hape udhëtimin si udhëtar në një shfletues/profil dhe `/panel/kerkesat` si shofer në një shfletues/profil tjetër. Mos shkëmbe fjalëkalime; secili përdor OAuth-in e vet.

Pas provave, fshije vetëm udhëtimin fiktiv dhe kërkesat e tij (`DELETE FROM kerkesat WHERE udhetim_id = 'java10-test-demo';` pastaj `DELETE FROM udhetimet WHERE id = 'java10-test-demo';`). Rikthe rolin e llogarisë së shoferit test në `udhetar` nëse do të përdoret përsëri si udhëtar.

## Provat

### Rasti 1 — Dërgimi dhe ruajtja e kërkesës
**Hapat:** Si udhëtar, hap `/udhetimi/java10-test-demo/kerkesa`, dërgo kërkesën dhe rifresko faqen.

**Pritshmëria:** Kërkesa ruhet vetëm një herë, shfaqet në pritje dhe statusi i njëjtë lexohet pas rifreskimit.

**Rezultati këtu:** Rrjedha e ruajtjes dhe leximit ekziston në `kerkoVend()`/`lexoKerkesenTime()`. Prova me dy llogaritë dhe Neon nuk u krye në këtë mjedis, prandaj nuk pretendohet si e verifikuar live.

### Rasti 2 — Pranimi dhe përditësimi në ekranin tjetër
**Hapat:** Mbaji të hapur dy ekranet. Si shofer, prano kërkesën; vëzhgo ekranin e udhëtarit dhe listën e shoferit për të paktën pesë sekonda.

**Pritshmëria:** Shoferi e sheh kërkesën të largohet nga lista në pritje; ekrani i udhëtarit e tregon pranimin brenda një cikli rifreskimi. Databaza ul vendet vetëm një herë.

**Rezultati këtu:** `RifreskimiKerkesave` thërret `router.refresh()` çdo 5 sekonda në të dy ekranet; faqet rilexojnë statusin nga databaza. Pranimi dhe sinkronizimi ndërmjet dy llogarive presin provën live me llogaritë testuese.

### Rasti 3 — Shkëputja dhe rilidhja
**Hapat:** Me kërkesën në pritje, shkëpute përkohësisht rrjetin në ekranin e udhëtarit. Pranoje nga ekrani i shoferit, pastaj rilidhe rrjetin te udhëtari.

**Pritshmëria:** Gjatë shkëputjes shfaqet paralajmërimi se gjendja mund të jetë e vjetër. Me rikthimin e rrjetit, faqja rilexon menjëherë dhe tregon statusin e ri; nëse sinjali i lidhjes humbet, cikli pesësekondësh e kap ndryshimin.

**Rezultati këtu:** Kodit i janë shtuar dëgjuesit `offline`/`online`, rifreskimi i menjëhershëm pas `online` dhe rifreskimi periodik. Shkëputja fizike dhe ndryshimi live në databazë nuk u provuan pa dy sesione OAuth.

## Skedarët kryesorë
- `aplikacioni/components/RifreskimiKerkesave.tsx` — intervali 5-sekondësh, gjendja e lidhjes dhe rifreskimi pas rilidhjes.
- `aplikacioni/app/udhetimi/[id]/kerkesa/page.tsx` — statusi i udhëtarit.
- `aplikacioni/app/panel/kerkesat/page.tsx` — kërkesat në pritje të shoferit.
- `aplikacioni/lib/kerkesat.ts` dhe `aplikacioni/schema-java08.sql` — ruajtja dhe pranimi atomik në Neon.
- `aplikacioni/seed-java10-demo.sql` — konfigurimi i udhëtimit dhe roleve të llogarive testuese.

## Verifikimi
`npm run lint` kaloi. `npm run build` kompajloi dhe kaloi TypeScript-in; thirrja e parë u ndal për të shfaqur paralajmërimin e sigurisë së Next.js, pastaj e njëjta komandë kaloi në riprovim me të njëjtin paralajmërim. Testet me dy llogari, Neon dhe rilidhje fizike duhet të kryhen pasi të jenë hyrë llogaritë testuese dhe të jetë ekzekutuar skripti i seed-it. Formulari i jashtëm i Javës 10 nuk është dorëzuar nga ky dokument.
