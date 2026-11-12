# RideShare — Java 8 · Kërkesë reale dhe përgjigje nga shoferi

## Qëllimi
Java 8 zëvendëson ekranin demonstrues të kërkesës me rrjedhë të ruajtur në Neon. Udhëtari hyn me GitHub dhe dërgon një kërkesë; shoferi i caktuar e pranon ose e refuzon nga paneli. Pranimi ul numrin e vendeve vetëm një herë dhe vetëm nëse ka ende vende të lira.

## Çfarë u shtua
- `aplikacioni/schema-java08.sql` krijon tabelën `kerkesat` me unikësi për një udhëtar për udhëtim dhe funksionet e databazës për krijim, pranim e refuzim.
- `aplikacioni/lib/kerkesat.ts` zbaton leximin dhe veprimet duke përdorur identitetin nga sesioni, jo nga formulari.
- `aplikacioni/app/udhetimi/[id]/kerkesa/` ruan kërkesën dhe paraqet statusin real.
- `aplikacioni/app/panel/kerkesat/` u jep shoferëve vetëm kërkesat për udhëtimet që u përkasin.
- Paneli i shoferit ka lidhje te lista e kërkesave.

## Rregullat e sigurisë dhe të dhënave
- Të gjitha veprimet server-side marrin profilin nga sesioni dhe kontrollojnë rolin/pronësinë në databazë.
- Udhëtari nuk mund të kërkojë vend në udhëtimin e vet dhe nuk mund të dërgojë kërkesë të dytë për të njëjtin udhëtim.
- Kërkesa në pritje nuk e zë vendin; vetëm pranimi e ul kapacitetin. Funksioni i databazës bllokon rreshtat përkatës gjatë pranimit që dy kërkesa paralele të mos zënë të njëjtin vend.
- Nëse shoferi nuk ka vende kur provon pranimin, kërkesa mbetet në pritje dhe shfaqet mesazh i qartë.

## Konfigurimi i databazës
Pas skemës së Javës 5, ekzekuto një herë të gjithë `aplikacioni/schema-java08.sql` në SQL Editor të Neon. Aplikacioni përdor tabelën `profilet` dhe kolonën `udhetimet.shofer_id` të krijuara më herët. Pa këtë migrim, veprimet e reja do të raportojnë gabim të databazës.

## Provat
1. Hyr si udhëtar, dërgo kërkesë për udhëtimin me vende dhe rifresko faqen; statusi duhet të mbetet në pritje.
2. Dërgo përsëri kërkesën për të njëjtin udhëtim; databaza nuk duhet të krijojë dublikatë.
3. Hyr si shofer i caktuar, prano kërkesën dhe verifiko që vendet ulen me një; provo edhe refuzimin në një kërkesë tjetër.
4. Provo hyrjen te `/panel/kerkesat` me udhëtar ose shofer tjetër; veprimi duhet të refuzohet dhe asnjë vend nuk duhet të ndryshojë.
5. Kur vendet të jenë zero, pranimi duhet të dështojë pa ndryshuar statusin e kërkesës.

Build-i/lint-i verifikojnë kodin në këtë mjedis. Provat që kërkojnë OAuth dhe Neon duhet të kryhen pasi të ekzekutohet migrimi; ato nuk pretendohen si të kryera lokalisht.
