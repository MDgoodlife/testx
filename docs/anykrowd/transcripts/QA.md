[27/05/2025, 15:13:46] Anthony  Hoebeeck: Had dit weekend eens een script geschreven om vouchers aan te maken met een eigen type en zo
[27/05/2025, 15:13:55] Anthony  Hoebeeck: Wel volledig via de UI
[27/05/2025, 15:15:29] Anthony  Hoebeeck: Zou eigenlijk eens hetzelfde kunnen maken voor het aanmaken van een product en toevoegen aan de catalogus (en createn van een catalogus)
[27/05/2025, 15:41:41] Michael-David: Ela gij
[27/05/2025, 15:41:42] Michael-David: haha
[27/05/2025, 15:42:33] Michael-David: Ben ff confused, is dat puur op basis van adminx toegang of heb jij api gekregen inmiddels
[27/05/2025, 15:42:43] Anthony  Hoebeeck: Adminx 😄
[27/05/2025, 15:43:03] Michael-David: browsertools - click macro ofzo puur dan?
[27/05/2025, 15:43:22] Michael-David: nice hoor alvast, moeten we meer mee doen
[27/05/2025, 15:43:37] Michael-David: ik ben alles aant api exposen inmiddels zodat third parties (wij met AI) kunnen beginnen devven
[27/05/2025, 15:43:39] Michael-David: want bottleneck
[27/05/2025, 15:46:11] Michael-David: Nice, hoe doe je dat mappen juist? wat bedoel je daarmee?
[27/05/2025, 15:46:19] Michael-David: Junior dev aant worden gij inmiddels?
[27/05/2025, 15:46:29] Michael-David: AI inspireert mij ook om te leren devven 😂
[27/05/2025, 15:46:45] Michael-David: deze nacht nog zitten klooien tot 6u aan iets
[27/05/2025, 15:47:00] Anthony  Hoebeeck: weet niet of je't kan zien deftig
[27/05/2025, 15:47:18] Anthony  Hoebeeck: Ben AI aan't gebruiken om scripts te maken en uit te breiden naar test automation :P
[27/05/2025, 15:47:32] Anthony  Hoebeeck: Dus dit is een gevolg daarvan
[27/05/2025, 15:48:03] Anthony  Hoebeeck: Er zit wel nog een bugje in't script want hij selecteert niet de juiste munt hehe, maar voor de rest werkt het
[27/05/2025, 15:48:22] Michael-David: Ja nice, je maakt op deze manier uw automated test scripts?
[27/05/2025, 15:48:26] Michael-David: Zeer interessant
[27/05/2025, 15:49:24] Anthony  Hoebeeck: Je moet basically uw pagina eerst in kaart brengen "deze knop heet zo, deze zo en deze samen doen dit" en dan in een andere pagina waar je uw test uitvoert zeg je "doe deze samen en als de uitvoering ok is = test geslaagd"
[27/05/2025, 15:50:11] Anthony  Hoebeeck: En is allemaal via browser. In een achterliggend scherm draait er dus een browser die mij inlogt, naar die pagina surft, alles aanklikt, ... done
[27/05/2025, 15:50:56] Michael-David: Uhu nice, als je mij eens wat prompts kan geven met meer info ga ik dat ook is uitzoeken voor ons want dat is eigenlijk exact wat we nodig hebben / ontbreken. Er zijn teveel test flows , te veel klein dingen
[27/05/2025, 17:02:38] Anthony  Hoebeeck: Kheb een opdracht voor u ondertussen
[27/05/2025, 17:02:54] Anthony  Hoebeeck: Ga elke pagina af en haal op elke pagina elke feature
[27/05/2025, 17:02:56] Anthony  Hoebeeck: Schrijf op
[27/05/2025, 17:03:15] Anthony  Hoebeeck: Bv op vouchers: type aanmaken, createn, downloaden
[27/05/2025, 17:04:10] Anthony  Hoebeeck: Domain | types | date 
Adminx - Vouchers | Type, create, QR | Datum van vandaag
[27/05/2025, 17:04:21] Anthony  Hoebeeck: Als ge da hebt gedaan
[27/05/2025, 17:04:23] Anthony  Hoebeeck: Van alles
[27/05/2025, 17:04:40] Anthony  Hoebeeck: Geen dan naast uw feature een cijfer van 1 tot 5
[27/05/2025, 17:04:44] Anthony  Hoebeeck: 1 - critical
[27/05/2025, 17:04:47] Anthony  Hoebeeck: 5 - meh
[27/05/2025, 17:04:52] Anthony  Hoebeeck: 3 - normaal
[27/05/2025, 17:05:59] Anthony  Hoebeeck: Bv rapportage is belangrijk maar als dat niet werkt voor een dag ist ni zo erg
[27/05/2025, 17:06:04] Anthony  Hoebeeck: Dus eerder een 3
[27/05/2025, 23:09:45] Michael-David: haha
[27/05/2025, 23:10:19] Michael-David: Kga hem hier aant werken zetten zie
[27/05/2025, 23:10:25] Michael-David: first draft of the .PRD incoming
[27/05/2025, 23:10:48] Anthony  Hoebeeck: ... testX?
[27/05/2025, 23:13:12] Michael-David: idd
[27/05/2025, 23:13:44] Anthony  Hoebeeck: gek
[27/05/2025, 23:17:44] Anthony  Hoebeeck: ugh
[27/05/2025, 23:17:53] Anthony  Hoebeeck: kga beter overstappen naar playwright
[27/05/2025, 23:17:57] Anthony  Hoebeeck: I hate it
[27/05/2025, 23:18:04] Anthony  Hoebeeck: want da's een ton extra werk effe :D
[27/05/2025, 23:18:15] Anthony  Hoebeeck: thanks asshole :((((((
[27/05/2025, 23:18:24] Anthony  Hoebeeck: (love)
[27/05/2025, 23:19:47] Michael-David: waarom??
[27/05/2025, 23:20:21] Anthony  Hoebeeck: omdat ik op mijn vast werk een test automation omgeving aan het opzetten ben (nog niet officieel aangekondigd) en dat het beter ga zijn om als ge vanaf nul begint, playwright te gebruiken
[27/05/2025, 23:20:34] Anthony  Hoebeeck: net met o3 ook eens laten onderzoeken...
[27/05/2025, 23:21:39] Michael-David: top
[27/05/2025, 23:21:47] Michael-David: o3 is beste reasoning idd samen met opus4
[27/05/2025, 23:22:28] Michael-David: https://anykrowd.notion.site/testx-project-specification-v1-2007344e93f48179aa68fe32b5341780?pvs=4
[27/05/2025, 23:22:34] Anthony  Hoebeeck: Als ge op limitaties komt met testX en ge wilt dat uit handen geven aan iemand met QA experience, denk eens aan mij he
[27/05/2025, 23:22:46] Michael-David: eerste draft
[27/05/2025, 23:22:52] Michael-David: puur technical spec
[27/05/2025, 23:23:32] Anthony  Hoebeeck: on every pull request :D
[27/05/2025, 23:23:58] Michael-David: haha , benieuwd hoeveel tokens da ga fretten allemaal
[27/05/2025, 23:24:06] Michael-David: en waar ik het ga hosten
[27/05/2025, 23:24:12] Michael-David: might need an environment on vercel ofz
[27/05/2025, 23:24:22] Michael-David: of ik host het op mikki.io
[27/05/2025, 23:24:22] Anthony  Hoebeeck: ge hebt al een openai API neem ik aan
[27/05/2025, 23:24:30] Michael-David: alles ja
[27/05/2025, 23:24:32] Anthony  Hoebeeck: mikk.io
[27/05/2025, 23:24:55] Michael-David: perplexity voor deep research
anthropic alle modellen
open ai 
gemini pro
[27/05/2025, 23:27:15] Michael-David: ziet gij iets raar in die .PRD staan?
[27/05/2025, 23:27:24] Anthony  Hoebeeck: versta er geen kut van maar khoop AI wel
[27/05/2025, 23:27:35] Anthony  Hoebeeck: ja wacht
[27/05/2025, 23:28:11] Michael-David: Ge zit zelf mee in het team 😂
[27/05/2025, 23:28:30] Michael-David: hij is u al taken aant geven
[27/05/2025, 23:28:43] Anthony  Hoebeeck: HAHAHAHAH
[27/05/2025, 23:28:50] Anthony  Hoebeeck: effe mijn fees verhogen
[27/05/2025, 23:29:26] Anthony  Hoebeeck: is dat React dat jullie op werken?
[27/05/2025, 23:30:03] Anthony  Hoebeeck: Tier 2: Extended Test Suite (Nightly)

biep biep biep
[27/05/2025, 23:30:12] Anthony  Hoebeeck: helft van uw events zijn snachts
[27/05/2025, 23:30:29] Anthony  Hoebeeck: op productie wilde die daar mss ni testen dan
[27/05/2025, 23:30:36] Anthony  Hoebeeck: if: Timeout: 60-90 minutes
[27/05/2025, 23:32:09] Anthony  Hoebeeck: hoe slim zeg allemaal
[27/05/2025, 23:32:15] Anthony  Hoebeeck: ## 

### Connectivity Scenarios
[27/05/2025, 23:32:38] Anthony  Hoebeeck: kunt mss nog custom toevoegen eventueel?
[27/05/2025, 23:32:57] Anthony  Hoebeeck: want wat is 'slow'
[27/05/2025, 23:33:11] Anthony  Hoebeeck: ge wilt slow 5G eigenlijk ahahaha
[27/05/2025, 23:33:17] Anthony  Hoebeeck: en 4G
[27/05/2025, 23:34:17] Anthony  Hoebeeck: enfin, you get the idea wat ik wil zeggen :)
[27/05/2025, 23:35:03] Anthony  Hoebeeck: Self-Healing Tests: Automatic test repair when UI changes ** is 'changes' duidelijk genoeg om te duiden dat de changes uit improvements komen en niet uit bugs?
[27/05/2025, 23:36:15] Anthony  Hoebeeck: hoe ga ge false positives behandelen
[27/05/2025, 23:36:24] Michael-David: good question
[27/05/2025, 23:36:28] Michael-David: good remark ook van die nightly
[27/05/2025, 23:36:43] Michael-David: wat is een false positive?
[27/05/2025, 23:36:49] Michael-David: en mss moet elke test 3 keer runnen
[27/05/2025, 23:36:54] Michael-David: door 3 verschillende agents
[27/05/2025, 23:37:07] Michael-David: en enkel bij 3/3 er door?
[27/05/2025, 23:39:09] Anthony  Hoebeeck: false positive en false negatives zijn condities waarbij iets goed of afgekeurd is omdat hij zich op een fout element baseert om de correctheid af te toetsen.
[27/05/2025, 23:39:30] Anthony  Hoebeeck: gij (man) pist op een zwangersschapstest en hij zegt JOEPIE ZWANGER (je hebt teelbalkanker)
[27/05/2025, 23:40:13] Michael-David: you are confusing my logs
[27/05/2025, 23:40:32] Michael-David: schrijft daar is nen echte vb
[27/05/2025, 23:40:39] Michael-David: kwil ni da AI gaat hallicuneren over teelbalkanker
[27/05/2025, 23:41:12] Anthony  Hoebeeck: kmoet effe nadenken, maar bij een fuzzywuzzy wordt er een match % gekoppeld; dus ge zou kunnen zeggen 'als onze drie agents geen 100% score afgeven, stuur naar real persoon voor monitoring"
[27/05/2025, 23:41:33] Michael-David: idd
[27/05/2025, 23:41:37] Michael-David: dat is wat ik ook in gedachten had
[27/05/2025, 23:42:14] Michael-David: en de mogelijkheid om elke test opnieuw te kunnen runnen natuurlijk
[27/05/2025, 23:42:28] Michael-David: want uiteindelijk moet er wel een 100/100 komen op alle tests om een release go te hebben
[27/05/2025, 23:42:42] Anthony  Hoebeeck: uw gevaar zit hem niet in de test, die ga doen wat ze doen; uw gevaar zit hem in de self healing en self writing
[27/05/2025, 23:43:20] Michael-David: Best ook dus een check alvorens ze te laten selfhealen / self writen
[27/05/2025, 23:43:33] Michael-David: indien dit nodig is voor een test , moet de agent hier een /spec van maken
[27/05/2025, 23:43:37] Michael-David: die we dan ook opnieuw goedkeuren
[27/05/2025, 23:43:42] Michael-David: en laten ontwikkelen (of niet)
[27/05/2025, 23:43:52] Michael-David: zodat een script zijn eigen niet kan kapot maken?
[27/05/2025, 23:43:57] Anthony  Hoebeeck: ok dit is een goede dat ik ook al heb gehad
[27/05/2025, 23:43:58] Anthony  Hoebeeck: Example: False Positive in a Broken Link Checker

Scenario:
You're running an automated tool to check if your website has any broken links (links that lead to pages that don't exist anymore).

    Tool: An automated link checker plugin in WordPress or an online broken-link checker tool.

    Purpose: To make sure every link you click actually takes you to a working page.

The False Positive:

‎Read more
[27/05/2025, 23:44:22] Anthony  Hoebeeck: absoluut, met verklaring en impact en uitleg en bronnen of zo
[27/05/2025, 23:44:33] Michael-David: idd
[27/05/2025, 23:44:41] Michael-David: klinkt goed
[27/05/2025, 23:44:55] Anthony  Hoebeeck: uhm misschien afsplitsen en nieuwe maken en ook laten meerunnen?
[27/05/2025, 23:45:10] Michael-David: de oude test dus altijd laten staan en een nieuwe test schrijven
[27/05/2025, 23:45:15] Michael-David: en dan kan de human beslissen welke test moet blijven
[27/05/2025, 23:45:29] Michael-David: zelfde <test-name> gebruiken dus in filename maar duidelijk ander version number
[27/05/2025, 23:45:31] Anthony  Hoebeeck: soort van branchen zeker?
[27/05/2025, 23:45:45] Michael-David: i guess, ik neem aan dat alle tests ook een repo gaan krijgen op github
[27/05/2025, 23:45:58] Michael-David: dus gaat sowieso iets met versioning / branching moeten zijn
[27/05/2025, 23:46:04] Michael-David: AI will figure it out
[27/05/2025, 23:46:16] Anthony  Hoebeeck: alleen blijft uw test wel runnen naast de nieuwe
[27/05/2025, 23:46:36] Michael-David: somehow moet die idd flagged worden zodat er kan gekozen worden
[27/05/2025, 23:46:49] Michael-David: not mvp maar at some point komt er ook een notion dashboard aan gekoppeld
[27/05/2025, 23:47:06] Michael-David: die overzicht geeft - en met actionbuttons naar webhook triggers op een api ofzo die bepaalde dingen kunnen ingang schieten
[27/05/2025, 23:47:51] Michael-David: TBD - focus on the core first, getting actual tests done and correct logging / reporting
[27/05/2025, 23:48:12] Michael-David: clientx first denk ik
[27/05/2025, 23:48:28] Michael-David: en van daaruit verder uitwerken