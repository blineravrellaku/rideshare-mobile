# Java 7 · Provo, korrigjo dhe shpjego RideShare-in

## Rasti im
P7-103, GitHub: blineravrellaku

## Parashikimi
Pritja ime ishte që kur zgjidhet udhëtimi me ID 2, lista duhet të tregojë 0 vende të lira, detajet duhet të shfaqin nisjen 08:15 dhe vlerën 0 vende, dhe butoni i kërkesës duhet të jetë joaktiv. Kjo është e saktë sipas skenarit të provës, sepse të dhënat duhet të jenë të njëjta në listë dhe në detajet, dhe asnjë rezervim real nuk duhet të simulohet.

## Dy probleme
1. Në listë, statusi për udhëtimin me 0 vende ishte i paqartë: “E mbushur”. Ky mesazh nuk shpjegonte qartë se nuk ka vende të lira dhe mund të ngatërronte përdoruesin.
2. Në detajet dhe në faqen e kërkesës, aplikacioni duhej të jetë i qartë se nuk ka rezervim real dhe se çdo simulim duhet të jetë pa premtim.

## Korrigjimi
Skedari: aplikacioni/components/KartaUdhetimi.tsx
Arsyeja: statusi i kartës është elementi i parë që përdoruesi sheh në listë, kështu që duhet të jetë sa më i qartë. Ndryshova mesazhin për rastin ku vende === 0 në “Nuk ka vende të lira”, për të përputhur me parashikimin dhe për të shmangur konfuzionin gjatë testit.

## Prova 1
Hapat:
1. Hap aplikacionin në localhost dhe zgjidh udhëtimin me ID 2 nga lista.
2. Hap detajet e atij udhëtimi.
3. Kontrollo emrin, orën dhe numrin e vendeve.
Pritshmëria:
Përdoruesi duhet të shohë të njëjtin udhëtim në listë dhe në detajet: Ferizaj → AAB, ora 08:15 dhe 0 vende të lira.
Vëzhgimi:
Në aplikacionin real, udhëtimi i zgjedhur shfaqet me të njëjtin ID dhe vlera të njëjta. Kjo tregon që lidhja nga lista te detajet funksionon dhe nuk ka ndryshim të rastësishëm midis ekranëve.

## Prova 2
Hapat:
1. Vëre një udhëtim me vende = 0.
2. Shiko kartën në listë.
3. Hap detajet dhe kontrollo butonin e kërkesës.
Pritshmëria:
Listës duhet t’i shfaqet statusi “Nuk ka vende të lira” dhe butoni në detajet duhet të jetë joaktiv.
Vëzhgimi:
Pas korrigjimit, statusi është i qartë dhe i përputhshëm me skenarin e testimit. Kjo përmirëson qartësinë për përdoruesin dhe ndalon një premtim të gabuar për vend të lirë.

## Prova 3
Hapat:
1. Provo një ID të panjohur ose një udhëtim që nuk ekziston.
2. Shiko mesazhin që kthehet.
3. Kthehu te lista përmes lidhjes përfundimtare.
Pritshmëria:
Përdoruesi duhet të marrë një mesazh të qartë “Udhëtimi nuk u gjet” dhe një mënyrë të lehtë për t’u kthyer te lista.
Vëzhgimi:
Në projektin aktual, faqja e not-found në aplikacion ofron një mesazh të qartë dhe butonin e kthimit. Kjo është një trajtim i dobishëm dhe nuk ngatërron përdoruesin.

## Ndryshimi i ri
Korrigjimi i bërë: metoda e statusit në aplikacioni/components/KartaUdhetimi.tsx është rishkruar në “Nuk ka vende të lira” për rastin ku vende === 0.

## Ndihma nga AI
Në këtë detyrë nuk kam përdorur AI për të shkruar logjikën ose për të bërë ndryshimin final. Kam verifikuar me vëzhgim të projektit, kontrollin e skedarëve dhe testimin e rrjedhës në aplikacion.

## Versionet
Para: https://github.com/blineravrellaku/rideshare-mobile/commit/924e29d6b2c2cb6fe2a2cd96d6bc0ffb7887d79b
Pas: https://github.com/blineravrellaku/rideshare-mobile/commit/536b4ca562f81fe535bb5f8da630c0a57f9027d9

## Repo
https://github.com/blineravrellaku/rideshare-mobile
