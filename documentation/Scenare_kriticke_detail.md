## UC1	S1	Přihlásit zaměstnance/majitele
### Preconditions: Spuštěná aplikace
### Basic flow:
| Krok | Actor | Akce |
|:---:|:---|:---|
| 1 | Aplikace | Zobrazená hlavní strana, na ní formulář pro přihlášení - pole pro uživatelské jméno, heslo a tlačítko pro odeslání formuláře, spolu s odkazem na změnu hesla. |
| 2 | Majitel/Zaměstnanec | Uživatel zadá uživatelské jméno a heslo, potvrdí zadání údajů. |
| 4 | Aplikace | Zobrazí se stránka se seznamem objednávek. |

### Alternative flow:
| Krok | Actor | Reakce |
|:---:|:---|:---|
| 2a | Majitel/Zaměstnanec | Vložení špatných údajů. | 
| | Aplikace | Zobrazení hlášky s upozorněním na nesprávné údaje. | 


## UC5	S1	Vložení nové ingredience
### Preconditions: Spuštěná aplikace, přihlášený uživatel
### Basic flow:
| Krok | Actor | Akce |
|:---:|:---|:---|
| 1 | Aplikace | Zobrazené menu pro majitele s položkou Vložení ingredience. |
| 2 | Majitel | Uživatel vybere možnost Vložení ingredience. |
| 3 | Aplikace | Zobrazí se stránka s formulářem pro vložení nové ingredience - název, množství, cena, spolu s tlačíkem pro odeslání formuláře. |
| 4 | Majitel | Uživatel vyplní formulář a odešle jej. |
| 5 | Aplikace | Uloží se nová ingredience. |
| 6 | Aplikace | Zobrazí se seznam všech ingrediencí. |

### Alternative flow:
| Krok | Actor | Reakce |
|:---:|:---|:---|
| 2a | Majitel/Zaměstnanec | Uživatel zadá údaje v nesprávném formátu. | 
| | Aplikace | Pole zůstanou vyplněná podle zadání uživatele. | 
| | Aplikace | U chybně zadaných polí se zobrazí hláška s upozorněním. | 

## UC3	S1	Vložení nové pizzy do nabídky
### Preconditions: Spuštěná aplikace, přihlášený uživatel
### Basic flow:
| Krok | Actor | Akce |
|:---:|:---|:---|
| 1 | Aplikace | V menu pro majitele je u položky "Správa pizz" možnost "Vložení nové pizzy do nabídky". |
| 2 | Majitel | Majitel vybere tuto možnost.|
| 3 | Aplikace | Zobrazí se stránka s formulářem pro vytvoření nové pizzy. |
| 4 | Majitel | Majitel zadá název, cenu, ingredience a obrázek pro novou pizzu a potvrdí. |
| 5 | Aplikace | Uloží se nová pizza. |
| 6 | Aplikace | Zobrazí se seznam všech pizz. |

### Alternative flow:
| Krok | Actor | Reakce |
|:---:|:---|:---|
| 4a | Majitel | Vložení nevalidních údajů. | 
| | Aplikace | Zobrazí se hláška s upozorněním na nesprávné údaje. | 


## UC2	S1	Objednání pizzy z nabídky
### Preconditions: Spuštěná aplikace, přihlášený uživatel, zobrazená nabídka
### Basic flow:
| Krok | Actor | Akce |
|:---:|:---|:---|
| 1 | Aplikace | Zobrazený list pizz s tlačítkem přidání do košíku a zobrazením ikony košíku. |
| 2 | Uživatel | Uživatel přidá pizzy do košíku kliknutím na tlačítko. |
| 3 | Aplikace | Pizza se přidá do košíku. |
| 4 | Uživatel | Uživatel přejde do košíku. |
| 5 | Aplikace | Zobrazí se stránka s košíkem uživatele a formulářem pro vyplnění údajů. |
| 6 | Uživatel | Vyplní údaje a potvrdí ojednávku |
| 7 | Aplikace | Zobrazí se stránka s potvrzenou objednávkou a pošle se uživateli informační email |

### Alternative flow:
| Krok | Actor | Reakce |
|:---:|:---|:---| 
| 5a | Uživatel | Vložení emailové adresy, na kterou již proběhla objednávka | 
| | Aplikace | Doplnění formuláře daty z poslední provedené objednávky | 
| | Uživatel | Upraví, nebo potvrdí doplněné údaje | 
| 5b  | Uživatel | Vložení nevalidních údajů. | 
| | Aplikace | Zobrazí se hláška s upozorněním na nesprávné údaje. | 


## UC4	S2	Editace stavu otevřené objednávky - založená, otevřená, uzavřená
### Preconditions: Spuštěná aplikace, přihlášený uživatel
### Basic flow:
| Krok | Actor | Akce |
|:---:|:---|:---|
| 1 | Aplikace | V menu pro majitele/zaměstnance je položka pro zobrazení stavů objednávek. |
| 2 | Majitel/Zaměstnanec | Uživatel klikne na položku menu. |
| 3 | Aplikace | Zobrazí se stránka s výčtem založených a otevřených objednávek. U každé objednávky je uveden stav. Stav lze změnit na základě aktuálního stavu - ze založené na otevřenou nebo z otevřené na uzavřenou. Na stránce je tlačítko pro potvrzení změn. |
| 4 | Majitel/Zaměstnanec | Uživatel provede změny a potvrdí uložení. |
| 5 | Aplikace | V výpisu objednávek se změní stavy podle zadání uživatele. |
| 6 | Aplikace | Do logu se přidají zápisy o změnách - kdo, kdy a co změnil. |
