Michael-David
  6:53 PM
:pray: I think i'm on to something here...
6:53
Its running - been running for a while - will take more time. But I think I got everything working :eyes:
6:54
CleanShot 2025-05-27 at 18.53.58.png
 
CleanShot 2025-05-27 at 18.53.58.png


6:55
Might need some finetuning and offcourse your check / approval - maar dit is een agent structuur die aant draaien is om technische documentatie te schrijven


Stijn Debakker
  7:10 PM
Oo, nice!
7:10
en wat zijn we met technische documentatie? :smile:


Michael-David
  7:12 PM
Onboarding pakketje voor nieuwe dev
hopelijk added value voor AI beter te kunnen gebruiken , niet alleen voor de devs maar ook voor mezelf om mss die testing scripts etc te kunnen ontwikkelen
documentation is key voor iets met ai te kunnen doen nog maar dus heb documentatie nodig


Stijn Debakker
  7:13 PM
Hmm ok, zullen zien wat er uit komt :slightly_smiling_face: Not sure what to expect :sweat_smile:


Michael-David
  7:14 PM
still running maar heb paar voorbeelden al
7:14
https://www.notion.so/anykrowd/anyKrowd-Platform-Architecture-2007344e93f48057b64ff54dc9bc9239?pvs=4

anyKrowd Platform Architecture
Chapter 1: anyKrowd Platform Architecture
Created by Michael-DavidCreated by Michael-David | Today at 7:02 PM | Added by Notion
7:14
https://www.notion.so/anykrowd/Clientx-Application-Core-2007344e93f4801bbb07fe3b1144a5fd?pvs=4

Clientx Application Core
Chapter 2: Clientx Application Core
Created by Michael-DavidCreated by Michael-David | Today at 7:02 PM | Added by Notion
7:15
https://www.notion.so/anykrowd/Staffx-Application-Core-2007344e93f4801c9389c19a2ac0b782?pvs=4

Staffx Application Core
Chapter 3: Staffx Application Core
Created by Michael-DavidCreated by Michael-David | Today at 7:02 PM | Added by Notion
7:15
Wat zegt dat?


Stijn Debakker
  7:19 PM
denk dat de algemene info nuttiger is dan het technische
maarja, er was een tijdperk dat we comments bij alles schreven, tot de moment kwam dat er goeie devs waren. Toen werden die allemaal weggehaald en weinig tot nooit meer gebruikt. Cuz you are supposed to be able to -read- what it does :grimacing:
En anders ben je ofwel geen top dev, ofwel is't echt slecht gemaakt (aka overcomplicated, spaghetti, ...)
Maar, 't is ook niet oninteressant. Iemand nieuw kan daar mss wel nut bij hebben


Michael-David
  7:20 PM
klopt dit?
CleanShot 2025-05-27 at 19.20.27@2x.png
 
CleanShot 2025-05-27 at 19.20.27@2x.png
7:20
Or is it jibberish?


Stijn Debakker
  7:21 PM
goh, het klopt, alleen is de vraag, wat ben je er mee
7:21
de code snippets zijn useless, een echt voorbeeld van de code zou beter zijn
7:23
de uitleg klopt, maar is te basic denk ik
dit zou interessant kunnen zijn als het dieper gaat
Bvb: QR & RFID zijn beide rfid_tags in de database, afhankelijk van wat er aangeduid wordt
een self linking rfid is een self linking rfid omdat er is_guest_wallet = 1 bij de rfid staat in de db,
7:23
zo al van die dingen, struikelen devs zich over in't begin
7:23
hoe ze een api call doen met een event id er in, als ze dat niet gewoon 'kennen' of if it doesn't make sense, dan hoeven ze niet te beginnen :stuck_out_tongue:


Michael-David
  7:23 PM
Ok, ik denk dat als we dat eens kunnen oplijsten - dat ik daar wel iets uit kan halen
7:24
want dit project is een orchestration van meerdere agents waardoor de output echt wel beter zou moeten zijn dan een oneshot


Stijn Debakker
  7:24 PM
maja zo'n technische documentatie schrijf je voor je public api's etc


Michael-David
  7:24 PM
tis nog aant runnen , ik paste alles in notion, en als we dan eens kunnen oplijsten wat eigenlijk echt nuttig is om te highlighten, kan ik extra laten genereren


Stijn Debakker
  7:24 PM
weinig voor interne code denk ik
7:24
zullen zien


Michael-David
  7:24 PM
wel als je AI wilt enablen he


Stijn Debakker
  7:25 PM
als je AI uitleg moet geven over je code, dan heb je een issue :stuck_out_tongue:


Michael-David
  7:25 PM
heb je al eens gekeken naar Claude Code in-terminal hoe gecontroleerd je daarmee kan werken , op basis van de documentatie
7:25
als uw project volledig gedocumenteerd is kan je met claude code gecontroleerd .PRD's omvormen in Git Issues en dan agents die laten afwerken en een PR maken


Stijn Debakker
  7:26 PM
yeah, of zoals de hype het voordoet
7:26
make a lot of bugs
7:26
:smile:
7:26
heb Devin ff runnen gehad als test
it works if you want to change a color of a button
7:26
veel verder dan dat, it will screw your codebase up
7:26
same met de nieuwe van openai


Michael-David
  7:27 PM
codex is idd alleen geschikt voor kleinere dingen heel contained
7:27
ik volg een paar devs die echt werken met AI en daar is de consensus dat je het gecontroleerd moet kunnen doen
7:27
en dat terminal tools daar het best voor zijn
7:27
aider / claude code
7:27
omdat je daar rulesets kan bouwen. wat mogen ze wel / niet en context primen
7:28
dus devin / codex idd is niet the way to go
7:28
maar heel gecontroleerd uw eigen rules/scripts/agents opzetten in iets gelijk claude code daar geloof ik echt wel in omdat je dan de controle houd en vooral planned & reviewed
7:28
ik zie het wrs te rooskleurig
7:29
maar i think we should try at some point , als het geen effort van de devs kost en ik iets kan opzetten van documentatie wil ik wel eens proberen .


Stijn Debakker
  7:29 PM
het issue is niet het proberen


Michael-David
  7:29 PM
alle just my 2 cents, kben er is ingedoken omdat ik die apis aant testen was en daar wat dieper wil ik duiken


Stijn Debakker
  7:30 PM
het issue is, dat we dit NOOIT gaan gebruiken, niets in die aard, zolang we geen 100% tested codebase hebben
7:30
Al Vincent zijn grote bugs
7:30
waren AI generated
7:30
"oops, ik heb dat per ongeluk gecommit"
7:30
ja nee, je hebt dat niet aangepast, je AI did that, and it broke shit
7:30
en het slipt door de mazen van het net
7:31
zeker met software als de onze, kan je dat enkel als je testing er is
7:31
Zou ik durven AI op issues zetten? Yeah
7:31
maar niet zolang we erna geen auitomated test kunnen runnen
7:31
Laat je AI een issue oplossen, derna runnen de tests automatisch en dan weet je dat alles werkt and it didn't break anything
7:31
validate the feature and bam!
7:31
dan heb je 100% een valid point
7:32
maar vandaag is ons issue, dat 1-2% van onze codebase tested is (edited) 
7:32
which is .... welja, niets :stuck_out_tongue:
7:32
wat we vandaag ECHT nodig hebben, is automated browser testing
7:32
dat is echt stap 1
7:32
zodat we zeker zijn dat alles werkt
7:32
als we dat hebben, kunnen we effectief AI ook inschakelen voor issues
7:33
vind je niets in die aard die je kan helpen om die tests te generaten?
7:33
als je lokaal zoiets in elkaar geflanst krijgt, dan kunnen we dat wel deployen zodat het na elke commit / PR ofzo draait
7:34
alez, puur browser testing dan, zodat we de user flows kunnen afchecken


Michael-David
  7:39 PM
I get it


Stijn Debakker
  7:41 PM
but i would be VERY grateful als je daar een oplossing voor zou vinden :pleading_face:
7:41
imagine dat we bij elke PR een zekerheid hebben dat alles werkt
stability would be through the roof
would be insane


Michael-David
  7:43 PM
idd dat punt moeten we bereiken
7:43
ik zal wat vragen oplijsten - kunnen we daar samen is doorgaan later?
7:44
will try help where i can


Stijn Debakker
  7:47 PM
zeker


Michael-David
  7:52 PM
Hebben wij iets van testing vandaag ingebouwd in onze code?


Stijn Debakker
  7:52 PM
in backend zit er wat unit testing
vooral op de api's (of de responses juist outputten) en hier en daar wat functies
7:53
unit testing is goed, maar dat moet de dev ook onderhouden
daar hebben wij (lame excuse, but true) weinig tijd voor
AI is daar nog niet zo goed in voor Laravel, wel voor python etc
komt probably wel, maar is omdat laravel veel magical shit doet die een model niet makkelijk kan vinden
7:54
maar daar we staffx + clientx + adminx + centralx + printx hebben, zou de magic pill puur browser testing zijn
dan kan "iedereen" daar scenarios voor schrivjen
7:54
ik heb er al zien passeren die met AI models gewoon natural language scenarios schrijven to test
7:55
"Go to xxxxx, enter email x, password x and clikc login. Go to your wallet and topup 20 euro's. Enter demo card xxxx"
7:55
enzv


Michael-David
  7:55 PM
Ok ik ga wat dingen uitproberen en ik kom er nog op terug.
Zowel bestaande software als iets zelf in elkaar proberen flansen.
Keep you posted
:heart:
1
:pray:
1



Stijn Debakker
  7:57 PM
Want als we dat kunnen geranderen, kunnen we mooie flows met agents opzetten die effectief (toch de kleinere at least) issues kunnen oplossen
We weten zeker they didn't break anything
We hoeven enkel feature validation en code review te doen
Maar biggest advantage, je kan dat in theorie op 1000 issues laten runnen. Dus tenminste alle kleine brol zou er snel door geraken (en possibly ook grote features op termijn i suppose)


Michael-David
  8:01 PM
Kvraag me wel af
Stel je maakt een issue, en een agent fixed dat, kan die ook 'raden' wat de browser testing dan moet zijn daarvan om het te testen?
8:01
Want als die feature nog niet bestaat, kan je er geen scenario voor maken om te testen
8:02
dus dan zou in de 'build rules' van de agent moeten zitten, dat hij op basis van wat hij net gemaakt heeft
8:02
ook een browser testing schrijft
8:02
of zie ik da verkeerd
8:04
of; wat als AI een aparte branch krijgt kunnen we het dan ook niet testen op een andere omgeving?


Stijn Debakker
  8:04 PM
ik denk dat je daar dan weer rare dingen kan hebben
volgens mij is dat het manuele moment
agent fixed een issue -> tests runnen dat niets breekt (kan zijn dat er 1 item breekt doordat hij daar net iets heeft aangepast)
dan autodeploy naar onze feature release op dev en iemand checkt of het doet wat het moet doen (puur feature nakijken)
en dan moet de browser testing voor de feature al dan niet ook opgezet worden (mss met behulp ook van de ai)


Michael-David
  8:05 PM
ok ben mee
8:05
onze core tests zijn een validatie dat er niets core gebroken is
8:06
en dat is een 'eerste check' dat de code mss wel ok is
8:06
en dan kijken we het manueel na - testen op aparte omgeving mss - en dan if 'ok' merge jij het verder


Stijn Debakker
  8:08 PM
yep
initieel zou dat een huge improvement zijn, en ook een eerste stap om agents mee te laten helpen aan issues werken
8:09
derna zien we hoe ver we dat kunnen trekken, misschien kunnen we nog delen automatiseren
zo lang die testing ons kan verzekeren dat alle core flows werken -> we happy


Michael-David
  8:14 PM
Wat zegt dit
8:14
My recommendation for anyKrowd
Start with Playwright Test as the backbone.
Why? Modern, multi-browser, fast, integrates neatly into GitHub/GitLab CI pipelines, and its recorder means you (even as a non-developer) can capture flows while ChatGPT writes the asserts. It scales far better than Cypress and has less flakiness than Dusk.
Layer BrowserStack Automate on top once suites stabilise.
Gives instant coverage on Safari/Firefox/real devices and AI self-healing without you hosting infrastructure. Start on the free credits, then pay only for PR runs. 
Keep Laravel Dusk around for server-side-heavy scenarios (e.g., impersonating users, seeding specific DB states) where PHP helpers are handy. It lives in the same repo and costs nothing.
Pilot a no-code AI tool (testRigor or Reflect) for the business team to author a handful of happy-path flows in plain English. If adoption is high, you can merge their generated tests back into Playwright via exported code, or run them in parallel. 
8:15
Playwright worth digging into denk je?
8:15
https://playwright.dev/

playwright.devplaywright.dev
Fast and reliable end-to-end testing for modern web apps | Playwright
Cross-browser end-to-end testing for modern web apps (78 kB)
https://playwright.dev/

8:15
Its open source
8:18
en dit kan ook interessant zijn
https://github.com/AgentDeskAI/browser-tools-mcp
8:18
combo van beiden mss?
8:19
als ik daarmee scenarios kan maken / tonen - die de agent kan uitlezen - kan die dat denk ik ook opslaan en runnen als een test (edited) 


Stijn Debakker
  8:21 PM
playwright is de meest gebruikte en beste there is
als je een AI kan laten helpen om de scenarios te schrijven, perfect!


Michael-David
  8:21 PM
ok top
8:21
ik bijt er mij in vast
8:21
als je het eens bent dat dit echt value kan opleveren
8:21
als je nog tips / advice hebt how to approach of waar zeker op letten, drop it here


Stijn Debakker
  8:22 PM
gegarandeerd
hier hadden we destijds rainforest voor, maar dat was way too expensive voor de grootte van onze testcases


Michael-David
  8:22 PM
ik feed ons chatgesprek aan mijn ai-tutor :rolling_on_the_floor_laughing:


Stijn Debakker
  8:23 PM
dunno if you remember, maar we hebben zelf eens iemand aangenomen om specifiek dit te gaan doen
8:23
(toen wel nog zonder ai)
8:23
maar die kon dan weer niet mee met de changes


Michael-David
  8:23 PM
Hmm i remember vaguely maar niet meer wie
8:23
maar das een valid point om rekening mee te houden
8:24
hoe wil je de output volgen van die tests?
8:24
is dat in een terminal cli interface
8:24
of een .html ergens
8:24
of een notion database die updates toont?
8:24
hoe zie je dat


Stijn Debakker
  8:24 PM
yeah, gaan we in the end op github actions runnen, dus idealiter zijn dat errors die uitspuwen in cli
8:24
als er geen errors zijn, passeert dat gewoon
8:25
zijn er wel errors, gaat github een deploy stoppen
8:25
tot we ze oplossen


Michael-David
  8:25 PM
dus , je runt een test en ziet dan de errors in cli log ?


Stijn Debakker
  8:25 PM
yep, idealiter spuwt die een error meteen uit naar de cli, zodat de runners geen hele testsuite moeten overlopen als er in de eerste lijn al een fout ontdekt is bvb
8:25
(want kost geld als die runnen ofc)
8:26
is naar mijn weten wel ook de default behaviour van playwright btw


Michael-David
  8:29 PM
Ok, ik ga werken aan een .PRD om dit te bouwen
8:29
laat je iets weten als ik feedback nodig heb daarop :muscle:
8:29
ik heb niets van anykrowd code of koppeling nodig he
8:29
ik kan dit als een third party gewoon bouwen puur op browser
8:30
ik heb daarvoor geen toegang nodig tot of koppeling met iets van anykrowd codestack?


Stijn Debakker
  8:30 PM
nope, in theorie kan die perfect inloggen met credentials van jou op een .dev tenant (maak mss aparte user aan ervoor)
8:32
dat is het gehele idee, als dit volledig vrij van de code staat, kunnen we dat ook onderhouden zonder dev input
het gaat de drempel naar testing gigantisch verlagen
initieel zal dat probably dan jij zijn
maar je kan het dan ook leren aan Jacobo bijvoorbeeld, etc
8:32
en mss op termijn zelf een AI vanaf de notion taak bvb
8:32
dat die al een testing suggestion doet
8:32
but first things first :smile:
8:33
maar om op je vorige vraag te antwoorden, ja, dit is een huge value
imagine dat al die rare staffx flows, offline mode, ecocup limitations, ... allemaal getest zijn by default door onze testing suite


Michael-David
  8:33 PM
Ik ben er paar dagen geleden in geslaagd om een Notion Agent te maken - die code uitvoert via Claude Code op basis van een tasklist in Notion, en terug afvinkt wat hij gedaan heeft + buildlog schrijft
8:33
dus dat is idd een next step
8:33
maar first things first ofc


Stijn Debakker
  8:34 PM
wel, voor playwright zou je probably wel claude code kunnen gebruiken
8:34
to help you write them


Michael-David
  8:34 PM
ofc
8:34
dat hoop ik
8:34
kmoet ook wel snappen what im doing dus wil het ook echt begrijpen


Stijn Debakker
  8:35 PM
mooi, das goed! :slightly_smiling_face:
docs are your friend :smile:
8:35
but i think you'll loveit
8:35
al je al die tests automatisch voor je ogen ziet gebeuren, overal op klikken, ...


Michael-David
  8:36 PM
de standaard flows zie ik idd direct gebeuren
8:36
maar bvb je zegt daar iets
8:36
offline / caching
8:36
hoe kan playwright dat testen?
8:36
zijn dat bepaalde calls die in de backend gemaakt worden?
8:36
'send to cache' of zo van die dingen
8:36
die hij dan moet oppikken / testen ; wanneer een conditie veranderd?
maar specifiek dan 'offline' hoe kan dat automatisch test script iets testen 'offline' ? kan die dat nabootsen?


Stijn Debakker
  8:36 PM
hmm das al advanced
playwright gebruikt echter chrome devtools, dus 9/10 kan je die dingen inderdaad wel gaan scripten
8:37
'k zou daar niet mee beginnen, maar, valid eigenlijk
8:37
Playwright provides APIs to monitor and modify browser network traffic, both HTTP and HTTPS. Any requests that a page does, including XHRs and fetch requests, can be tracked, modified and handled.
MDN Web DocsMDN Web Docs
XMLHttpRequest - Web APIs | MDN
XMLHttpRequest (XHR) objects are used to interact with servers. You can retrieve data from a URL without having to do a full page refresh. This enables a Web page to update just part of a page without disrupting what the user is doing. (24 kB)
https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest

MDN Web DocsMDN Web Docs
Fetch API - Web APIs | MDN
The Fetch API provides an interface for fetching resources (including across the network). It is a more powerful and flexible replacement for XMLHttpRequest. (24 kB)
https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

8:37
omg


Michael-David
  8:37 PM
Aha!


Stijn Debakker
  8:38 PM
CleanShot 2025-05-27 at 22.37.57@2x.png
 
CleanShot 2025-05-27 at 22.37.57@2x.png
8:38
deze :
https://playwright.dev/docs/test-use-options
playwright.devplaywright.dev
Test use options | Playwright
Introduction (78 kB)
https://playwright.dev/docs/test-use-options



Michael-David
  8:38 PM
Nice
8:38
what about crapcon
8:38
:rolling_on_the_floor_laughing:


Stijn Debakker
  8:38 PM
kan zelf video's recorden!
CleanShot 2025-05-27 at 22.38.16@2x.png
 
CleanShot 2025-05-27 at 22.38.16@2x.png
8:38
en dan naar notion duwen? :smile:


Michael-David
  8:38 PM
zelf een crapcon scriptje schrijven die dat  nabootst?
8:38
kan


Stijn Debakker
  8:38 PM
crapcon kunnen we oplossen
8:39
je kan een proxy gebruiken
ik zal op hetzner een proxy opzetten die limited is aan 10kb/s bvb
8:39
als playwright dan die proxy gebruikt voor de crapcon tests, he will be on crapcon
8:39
dus yep, ook dat is mogelijk
8:39
oh god, this will be nice
8:39
:smile:


Michael-David
  8:39 PM
ok great
8:39
willen we alle tests ook afzonderlijk kunnen runnen
8:40
en dan 1 'master test script' die alles runned
8:40
of is dat laatste voldoende?
8:40
en hoe bouw ik die files best op?
per scenario een aparte file?
of scenarios bundelen per soort in 1 feature file?


Stijn Debakker
  8:41 PM
afzonderlijk kunnen runnen: ik denk dat het sowieso kan, en misschien willen we dat ook wel eens doen voor iets specifiek te testen, but in general it will be all
8:41
het leuke is, het kan parallel ook gaan testen (edited) 
8:41
CleanShot 2025-05-27 at 22.41.38@2x.png
 
CleanShot 2025-05-27 at 22.41.38@2x.png
8:41
je kan eigenlijk gaan bepalen wat er na wat moet en wat er gelijktijdig kan etc
8:42
zo vlieg je daar door
8:43
files: jou keuze, zie maar wat het meest maintainable is, ook voor de AI
ik zou zeggen ergens per chapter?
bbv clientx - wallet
en dan daarin :
see currencies
topup
wallet history shows correct topup transaction
...


Michael-David
  8:44 PM
Ik zou deze folder structure volgen
CleanShot 2025-05-27 at 20.43.58@2x.png
 
CleanShot 2025-05-27 at 20.43.58@2x.png
8:44
Elke 'feature' is dus een test scenario dan
8:45
voor de rest wel met algemene files werken


Stijn Debakker
  8:45 PM
good for me!