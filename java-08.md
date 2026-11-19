# RideShare — Java 8 · Leja e vendndodhjes dhe vendtakimi

## Sjellja e shtuar
- Hapja e faqes nuk kërkon leje për vendndodhjen. Kërkesa nis vetëm pasi shtypet “Përdor vendndodhjen time”.
- Nëse leja refuzohet ose vendndodhja nuk merret, udhëtari mund ta shkruajë vendtakimin vetë.
- Pasi të ketë zgjedhur vendndodhjen ose të ketë shkruar vendtakimin, udhëtari mund të përdorë butonin “Simulo përfundimin e pritjes”.
- Ky është demonstrim vetëm në shfletues: koordinatat dhe vendtakimi manual nuk ruhen ose dërgohen. Ndërfaqja nuk shfaq koordinata apo sekrete.

## Provat

### Prova 1
**Hapat:** Hapa faqen dhe kontrollova nëse shfletuesi kërkoi leje. Pastaj shtypa “Përdor vendndodhjen time” dhe provova përgjigjen e pranimit të lejes.

**Pritshmëria:** Hapja e faqes nuk duhet të kërkojë leje; kërkesa duhet të nisë vetëm pas klikimit dhe pranimi të japë konfirmim pa shfaqur koordinatat.

**Çfarë pashë realisht:** Në faqen e nisjes u shfaq “Vendndodhja nuk kërkohet pa shtypur butonin.” Testi në shfletues regjistroi zero thirrje të API-së para klikimit. Pas klikimit provova përgjigjen e lejuar të API-së dhe pashë “Leja u pranua. Koordinatat nuk shfaqen dhe nuk dërgohen.” Përgjigjja e lejuar u simulua në test; nuk u pretendua se u pa dritarja origjinale e lejes së sistemit.

### Prova 2
**Hapat:** Simulova refuzimin e lejes, shkrova “Hyrja kryesore e AAB-së” te vendtakimi manual dhe shtypa “Simulo përfundimin e pritjes”.

**Pritshmëria:** Refuzimi duhet të ofrojë vendtakimin manual; pas plotësimit të tij, simulimi duhet të përfundojë dhe të konfirmohet.

**Çfarë pashë realisht:** U shfaq “Leja u refuzua. Shkruaj vendtakimin manualisht për të vazhduar.” Pas plotësimit të fushës, simulimi u përfundua dhe u shfaq “Simulimi përfundoi; asnjë vendndodhje nuk u publikua.” Refuzimi dhe simulimi u provuan në aplikacion me përgjigje të simuluar të API-së së shfletuesit; pritje reale nuk u krye.

### Prova 3
**Hapat:** Kontrollova mesazhet pas pranimit dhe pas përfundimit të simulimit; kontrollova gjithashtu që komponenti nuk bën kërkesë serveri për koordinatat ose vendtakimin.

**Pritshmëria:** Dëshmitë dhe ndërfaqja nuk duhet të publikojnë koordinata reale, vendndodhje personale apo sekrete.

**Çfarë pashë realisht:** Ndërfaqja shfaqi vetëm statusin e lejes dhe konfirmimin e simulimit; nuk shfaqi koordinata. Përbërësi përdor gjendje lokale dhe nuk dërgon vendndodhje te serveri. Në dokument nuk kam vendosur koordinata reale ose kredenciale.

### Prova me një hyrje të re
**Hyrja që provova:** Hapa faqen pa klikuar butonin e vendndodhjes, pastaj testova lejimin dhe refuzimin pas klikimit.

**Parashikimi im para klikimit:** Shfletuesi nuk do të kërkojë vendndodhjen vetëm nga hapja e faqes; klikimi do ta kërkojë dhe refuzimi do të lejojë vendtakim manual.

**Çfarë pashë realisht:** Para klikimit nuk pati thirrje të API-së. Pas klikimit, përgjigjja e simuluar e lejimit dha mesazhin e konfirmimit pa koordinata; përgjigjja e simuluar e refuzimit shfaqi fushën manuale dhe lejoi përfundimin e simulimit.

**Skedari dhe funksioni që e shpjegojnë:** [Vendtakimi.tsx](./aplikacioni/components/Vendtakimi.tsx) — `kerkoVendndodhjen()` thirret nga butoni, trajton pranimin/refuzimin dhe nuk përdor vlerat e koordinatave; fusha manuale dhe butoni i simulimit mbahen në gjendje lokale. [page.tsx](./aplikacioni/app/page.tsx) e vendos përbërësin në faqen kryesore.

**Çfarë kuptova ose korrigjova:** Dokumenti i mëparshëm përshkruante kërkesat e udhëtimit në Neon, por nuk dokumentonte provat e lejes së vendndodhjes që kërkonte kontrolli. Shtova rrjedhën manuale dhe simulimin, dhe shënova qartë se pranimi/refuzimi u simulua në test, jo përmes dritares origjinale të lejes.

## Verifikimi teknik
`npm run lint` dhe `npm run build` kaluan. Faqja u hap lokalisht dhe të dyja rrjedhat (pranim dhe refuzim me vendtakim manual) u kontrolluan në browser me përgjigje të simuluara të API-së së vendndodhjes.

## Funksionaliteti ekzistues i kërkesave të udhëtimit
Java 8 përfshin gjithashtu kërkesat reale në Neon: udhëtari dërgon kërkesë pasi hyn me GitHub; shoferi i caktuar e pranon ose refuzon nga paneli. Vetëm pranimi ul numrin e vendeve dhe veprimi kontrollon që ka ende vende të lira. Skema dhe veprimet janë te `aplikacioni/schema-java08.sql` dhe `aplikacioni/lib/kerkesat.ts`; kjo pjesë kërkon migrimin në Neon dhe OAuth të konfiguruar. Provat që varen nga këto shërbime nuk u kryen në këtë kontroll lokal.
