# Java 11 · Njoftimet brenda aplikacionit

## Sjellja e ndërtuar
- Kur kërkesa kalon nga `ne_pritje` në `pranuar` ose `refuzuar`, trigger-i i databazës ruan njoftim në të njëjtin transaksion.
- Çdo kërkesë ka maksimumi një njoftim; kufizimi unik dhe trigger-i idempotent parandalojnë dublikatat.
- Udhëtari sheh njoftimet e veta në faqen kryesore. Çdo njoftim lidhet me udhëtimin/kërkesën përkatëse.
- Kur udhëtari hap faqen e kërkesës, serveri e shënon njoftimin për atë kërkesë si të lexuar.
- Push notifications nuk u shtuan; njoftimet brenda aplikacionit funksionojnë pa mbështetje për Push ose leje shfletuesi.

## Përgatitja
Ekzekuto `aplikacioni/schema-java11.sql` në të njëjtën databazë Neon pas `schema-java05.sql` dhe `schema-java08.sql`. Përgatit udhëtimin fiktiv dhe dy llogaritë GitHub testuese sipas udhëzimeve në [raportin e Javës 10](./java-10.md). Për provën reale duhen dy sesione OAuth: një si shofer dhe një si udhëtar.

## Provat

### Prova 1 — Pranim dhe refuzim
**Hapat:** Si udhëtar, dërgo kërkesë. Si shofer, pranoje; pastaj përsërite me një kërkesë tjetër dhe refuzoje.

**Pritshmëria:** Udhëtari merr njoftimin me përgjigjen përkatëse dhe udhëtimin e saktë.

**Çfarë ndodhi realisht:** Kodi krijon njoftim për kalimin në `pranuar` ose `refuzuar` dhe filtron njoftimet sipas udhëtarit të sesionit. Testi me dy llogari reale dhe Neon nuk u krye këtu.

### Prova 2 — Hapja dhe leximi
**Hapat:** Kliko njoftimin nga faqja kryesore.

**Pritshmëria:** Hapet faqja e kërkesës së lidhur dhe njoftimi ndryshon nga “E palexuar” në “E lexuar”.

**Çfarë ndodhi realisht:** Lidhja përdor ID-në e udhëtimit të lidhur me kërkesën; faqja e kërkesës e shënon njoftimin si të lexuar vetëm për udhëtarin e kyçur. Sjellja është verifikuar në kod, jo me sesion OAuth live.

### Prova 3 — Përsëritje dhe lidhja e saktë
**Hapat:** Provo të përpunosh përsëri të njëjtën kërkesë dhe krahaso dy njoftime për udhëtime të ndryshme.

**Pritshmëria:** Përgjigjja e përsëritur nuk krijon njoftim dublikatë; secili njoftim hap vetëm kërkesën/udhëtimin e vet.

**Çfarë ndodhi realisht:** Trigger-i reagon vetëm kur statusi ndryshon nga `ne_pritje` në status përfundimtar; `UNIQUE (kerkese_id)` ndalon dublikatat. Çelësi i njoftimit lidhet me kërkesën, ndërsa URL-ja hap udhëtimin përkatës. Testi me koleg nuk u krye.

### Mbështetja pa Push
**Pritshmëria:** Njoftimet në aplikacion të punojnë edhe kur Push nuk mbështetet ose nuk jepet leje.

**Çfarë ndodhi realisht:** Nuk ka kod Push ose kërkesë lejeje; lista lexohet nga serveri dhe paraqitet në faqen kryesore.

## Skedarët kryesorë
- `aplikacioni/schema-java11.sql` — ruajtja, lidhja dhe deduplikimi i njoftimeve.
- `aplikacioni/lib/njoftimet.ts` — leximi i njoftimeve të udhëtarit dhe shënimi si të lexuara.
- `aplikacioni/components/Njoftimet.tsx` — lista dhe lidhja te kërkesa përkatëse.
- `aplikacioni/app/page.tsx` — paraqitja e njoftimeve.
- `aplikacioni/app/udhetimi/[id]/kerkesa/page.tsx` — shënimi si e lexuar kur hapet kërkesa.

## Verifikimi
`npm run lint` kaloi. `npm run build` kaloi në riprovim; Next.js 16.4.2 shfaqi paralajmërim për version të prekur nga dobësi e njohur. Provat live me koleg, OAuth dhe Neon mbeten për t’u kryer pasi të ekzekutohet migrimi.
