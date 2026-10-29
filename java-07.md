# Java 7 · Provo, korrigjo dhe shpjego RideShare-in

## Rasti im
Rasti 2 · Pa vende

## Parashikimi
Pritja ime ishte: kur zgjedh udhëtimin me ID 2, lista duhet të tregojë se ka 0 vende të lira, detajet duhet të shfaqin `Nisja 08:15` dhe `0 vende`, dhe butoni i kërkesës duhet të jetë joaktiv për të shmangur premtimin e një vendi të lirë. Kjo është e saktë sipas skenarit të provës, sepse të dhënat e udhëtimit janë të njëjta në listë dhe në detaje, dhe asnjë rezervim real nuk duhet të simulohet.

## Probleme të vëzhguara
1. Në listë, statusi për udhëtimin me 0 vende ishte i paqartë: “E mbushur”. Ky mesazh nuk shpjegonte qartë që nuk ka vende të lira dhe mund të ngatërronte përdoruesin.
2. Në mesazhin e detajit dhe te kërkesa, aplikacioni duhet të jetë i qartë se nuk ka për të bërë rezervim real; çdo simulim duhet të jetë i kuptueshëm dhe pa premtim.

## Korrigjimi i zgjedhur
Skedari: `aplikacioni/components/KartaUdhetimi.tsx`

Arsyeja: statusi i kartës është pjesa e parë që përdoruesi sheh në listë, kështu që duhet të jetë sa më i qartë. Ndryshova mesazhin e statusit për `vende === 0` në “Nuk ka vende të lira”, për të përputhur me parashikimin dhe për të shmangur konfuzionin gjatë testit.

## Prova 1 · Rrjedha nga lista te detajet
Hapat:
1. Hap aplikacionin në localhost dhe zgjidh udhëtimin me ID 2 nga lista.
2. Hap detajet e atij udhëtimi.
3. Kontrollo emrin, orën dhe numrin e vendeve.

Pritshmëria:
Përdoruesi duhet të shohë të njëjtin udhëtim në listë dhe në detajet: Ferizaj → AAB, ora 08:15 dhe 2 vende të lira.

Vëzhgimi:
Në aplikacionin real, udhëtimi i zgjedhur shfaqet me të njëjtin ID dhe vlera të njëjta. Kjo tregon që lidhja nga lista te detajet funksionon dhe nuk ka ndryshim të rastësishëm midis ekranëve.

## Prova 2 · Korrigjimi i 0 vendeve
Hapat:
1. Vëre një udhëtim me `vende = 0`.
2. Shiko kartën në listë.
3. Hap detajet dhe kontrollo butonin e kërkesës.

Pritshmëria:
Listës duhet t’i shfaqet statusi “Nuk ka vende të lira” dhe butoni në detajet duhet të jetë joaktiv.

Vëzhgimi:
Pas korrigjimit, statusi është i qartë dhe është i përputhshëm me skenarin e testimit. Kjo përmirëson qartësinë për përdoruesin dhe ndalon një premtim të gabuar për vend të lirë.

## Prova 3 · Hyrje tjetër / kufizim
Hapat:
1. Provo një ID të panjohur ose një udhëtim që nuk ekziston.
2. Shiko mesazhin që kthehet.
3. Kthehu te lista përmes lidhjes përfundimtare.

Pritshmëria:
Përdoruesi duhet të marrë një mesazh të qartë “Udhëtimi nuk u gjet” dhe një mënyrë të lehtë për t’u kthyer te lista.

Vëzhgimi:
Në projektin aktual, [aplikacioni/app/udhetimi/[id]/not-found.tsx](aplikacioni/app/udhetimi/[id]/not-found.tsx) ofron një faqe të personalizuar me mesazh të qartë dhe buton për kthim. Kjo është një trajtim i dobishëm dhe nuk ngatërron përdoruesin.

## Ndryshimi i ri
Korrigjimi i bërë: metoda e statusit në [aplikacioni/components/KartaUdhetimi.tsx](aplikacioni/components/KartaUdhetimi.tsx) është rishkruar në “Nuk ka vende të lira” për rastin `vende === 0`.

## Ndihma nga AI
Në këtë detyrë nuk kam përdorur AI për të shkruar logjikën ose për të bërë ndryshimin final. Kam verifikuar me vëzhgim të projektit, kontrollin e skedarëve dhe testimin e rrjedhës në aplikacion.

## Para dhe Pas
- Para: https://github.com/blineravrellaku/rideshare-mobile/commit/924e29d
- Pas: https://github.com/blineravrellaku/rideshare-mobile/commit/9d3a799

## Versionet e repo-s
- Repo: https://github.com/blineravrellaku/rideshare-mobile
- Në GitHub Desktop e ruaj versionin e korrigjimit dhe raportin e fundit pas commit-it final.
