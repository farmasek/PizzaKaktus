## UC1	S1	Přihlásit zaměstnance/majitele
### Preconditions: Spuštěná aplikace
### Basic flow:
| Krok | Actor | Akce |
|:---:|:---|:---|
| 1 | Aplikace | Zobrazená hlavní strana, na ní formulář pro přihlášení. |
| 2 | Majitel/Zaměstnanec | Uživatel zadá uživatelské jméno a heslo, potvrdí zadání údajů. |
| 3 | Aplikace | Proběhne přihlášení uživatele. |
| 4 | Aplikace | Zobrazí se stránka se seznamem objednávek. |

### Alternative flow:
| Krok | Actor | Reakce |
|:---:|:---|:---|
| 2a | Majitel/Zaměstnanec | Uživatel zadá údaje v nesprávném formátu. | 
| | Aplikace | Pole zůstanou vyplněná podle zadání uživatele. | 
| | Aplikace | U chybně zadaných polí se zobrazí hláška s upozorněním. | 

## UC1	S2	Odhlásit zaměstnance/majitele
### Preconditions: Spuštěná aplikace, přihlášený uživatel
### Basic flow:
| Krok | Actor | Akce |
|:---:|:---|:---|
| 1 | Aplikace | V uživatelském panelu je zobrazena možnost odhlášení . |
| 2 | Majitel/Zaměstnanec | Uživatel zvolí odhlášení. |
| 3 | Aplikace | Aplikace ověří, že si je uživatel jistý. |
| 4 | Majitel/Zaměstnanec | Uživatel potvrdí odhlášení. |
| 5 | Aplikace | Proběhne odhlášení uživatele. |
| 6 | Aplikace | Proběhne přesměrování na hlavní stranu. |
| 7 | Aplikace | V uživatelském panelu je možnost přihlášení. |

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
| 6 | Uživatel | Vyplní údaje a potvrdí objednávku. |
| 7 | Aplikace | Aplikace uloží novou objednávku. |
| 8 | Aplikace | Zobrazí se stránka s potvrzenou objednávkou. |
| 9 | Aplikace | Aplikace pošle uživateli informační email. |

### Alternative flow:
| Krok | Actor | Reakce |
|:---:|:---|:---| 
| 5a | Uživatel | Vložení emailové adresy, na kterou již proběhla objednávka | 
| | Aplikace | Doplnění formuláře daty z poslední provedené objednávky | 
| | Uživatel | Upraví, nebo potvrdí doplněné údaje | 
| 5b  | Uživatel | Vložení nevalidních údajů. | 
| | Aplikace | Zobrazí se hláška s upozorněním na nevalidní údaje. | 

## UC2	S2	Objednání pizzy z nabídky s editací
### Preconditions: Spuštěná aplikace, přihlášený uživatel, zobrazená nabídka pizz
### Basic flow:
| Krok | Actor | Akce |
|:---:|:---|:---|
| 1 | Aplikace | Zobrazený list pizz s tlačítkem přidání do košíku. |
| 2 | Uživatel | Uživatel klikne na tlačítko přidat do košíku. |
| 3 | Aplikace | Pizza se přidá do košíku. |
| 4 | Uživatel | Uživatel přejde do košíku. |
| 5 | Uživatel | Uživatel klikne na tlačítko editovat vybranou pizzu. |
| 6 | Aplikace | Zobrazí se formulář pro úpravu ingrediencí vybrané pizzy.  |
| 7 | Uživatel | Uživatel provede úpravy. |
| 8 | Uživatel | Po navolení ingrediencí uživatel potvrdi změny v upravené pizze. |
| 8 | Aplikace | Zobrazí se stránka s košíkem uživatele a formulářem pro vyplnění údajů. |
| 9 | Uživatel | Vyplní údaje a potvrdí objednávku. |
| 10 | Aplikace | Aplikace uloží novou objednávku. |
| 11 | Aplikace | Zobrazí se stránka s potvrzenou objednávkou. |
| 12 | Aplikace | Aplikace pošle uživateli informační email. |

### Alternative flow:
| Krok | Actor | Reakce |
|:---:|:---|:---| 
| 8a | Uživatel | Vložení emailové adresy, na kterou již proběhla objednávka. | 
| | Aplikace | Doplnění formuláře daty z poslední provedené objednávky. | 
| | Uživatel | Upraví, nebo potvrdí doplněné údaje. | 
| 8b  | Uživatel | Vložení nevalidních údajů. | 
| | Aplikace | Zobrazí se hláška s upozorněním na nevalidní údaje. | 

## UC2	S3	Objednání vlastní složené pizzy
### Preconditions: Spuštěná aplikace, přihlášený uživatel, zobrazená nabídka pizz
### Basic flow:
| Krok | Actor | Akce |
|:---:|:---|:---|
| 1 | Aplikace | Na stránce je možnost vytvoření vlastní pizzy. |
| 2 | Uživatel | Uživatel klikne na tuto položku. |
| 3 | Aplikace | Zobrazí se stránka s formulářem pro navolení vlastní pizzy. |
| 4 | Uživatel | Uživatel vytvoří pizzu. |
| 5 | Uživatel | Po navolení ingrediencí uživatel klikne na tlačítko pro přidání do košíku. |
| 6 | Aplikace | Pizza se přidá do košíku. |
| 7 | Uživatel | Uživatel přejde do košíku. |
| 8 | Aplikace | Zobrazí se stránka s košíkem uživatele a formulářem pro vyplnění údajů. |
| 9 | Uživatel | Vyplní údaje a potvrdí objednávku. |
| 10 | Aplikace | Aplikace uloží novou objednávku. |
| 11 | Aplikace | Zobrazí se stránka s potvrzenou objednávkou. |
| 12 | Aplikace | Aplikace pošle uživateli informační email. |

### Alternative flow:
| Krok | Actor | Reakce |
|:---:|:---|:---| 
| 8a | Uživatel | Vložení emailové adresy, na kterou již proběhla objednávka. | 
| | Aplikace | Doplnění formuláře daty z poslední provedené objednávky. | 
| | Uživatel | Upraví, nebo potvrdí doplněné údaje. | 
| 8b  | Uživatel | Vložení nevalidních údajů. | 
| | Aplikace | Zobrazí se hláška s upozorněním na nevalidní údaje. | 

## UC3	S1	Vložení nové pizzy do nabídky
### Preconditions: Spuštěná aplikace, přihlášený uživatel
### Basic flow:
| Krok | Actor | Akce |
|:---:|:---|:---|
| 1 | Aplikace | V menu pro majitele je u položky "Správa pizz" možnost "Vložení nové pizzy do nabídky". |
| 2 | Majitel | Majitel vybere tuto možnost.|
| 3 | Aplikace | Zobrazí se stránka s formulářem pro vytvoření nové pizzy. |
| 4 | Majitel | Majitel zadá název, kategorii a ingredience pro novou pizzu a potvrdí. |
| 5 | Aplikace | Uloží se nová pizza. |
| 6 | Aplikace | Zobrazí se seznam všech pizz. |

### Alternative flow:
| Krok | Actor | Reakce |
|:---:|:---|:---|
| 4a | Majitel | Vložení nevalidních údajů. | 
| | Aplikace | Zobrazí se hláška s upozorněním na nesprávné údaje. | 

## UC3	S2	Editace vytvořené pizzy, deaktivace
### Preconditions: Spuštěná aplikace, přihlášený majitel
### Basic flow:
| Krok | Actor | Akce |
|:---:|:---|:---|
| 1 | Aplikace | V menu pro majitele je položka "Správa pizz". |
| 2 | Majitel | Majitel vybere tuto možnost.|
| 3 | Aplikace | Zobrazí se stránka se seznamem pizz a formulářem pro vytvoření nové. |
| 4 | Majitel | Majitel u vybrané pizzy zvolí možnost editace. |
| 5 | Aplikace | Aplikace našte pizzu do formuláře. |
| 6 | Majitel | Majitel upraví položky načtené pizzy a potvrdí změny. |
| 7 | Aplikace | Uloží se změny provedené majitelem. |
| 8 | Aplikace | Aktualizuje se seznam všech pizz. |

### Alternative flow:
| Krok | Actor | Reakce |
|:---:|:---|:---|
| 4a | Majitel | Vložení nevalidních údajů. | 
| | Aplikace | Zobrazí se hláška s upozorněním na nesprávné údaje. | 

| Krok | Actor | Reakce |
|:---:|:---|:---|
| 4a | Majitel | Majitel u vybrané pizzy zvolí možnost deaktivace. |
| | Aplikace | Aplikace ověří, že si je majitel jistý deaktivací pizzy. |
| | Majitel | Majitel potvrdí deaktivaci pizzy. |
| | Aplikace | Aplikace deaktivuje pizzu. |
| | Aplikace | Aplikace u pizzy v seznamu aktualizuje její stav. |

## UC3	S3	Vložení nové pizzy do nabídky založené na existující pizze
### Preconditions: Spuštěná aplikace, přihlášený majitel
### Basic flow:
| Krok | Actor | Akce |
|:---:|:---|:---|
| 1 | Aplikace | V menu pro majitele je u položky "Správa pizz" možnost "Vložení nové pizzy do nabídky". |
| 2 | Majitel | Majitel vybere tuto možnost.|
| 3 | Aplikace | Zobrazí se stránka s formulářem pro vytvoření nové pizzy. |
| 4 | Majitel | Majitel zvolí pizzu, ze které bude vytvářet novou pizzu. |
| 5 | Aplikace | Do polí se načtou informace vybrané pizzy. |
| 6 | Majitel | Majitel upraví údaje a potvrdí uložení. |
| 7 | Aplikace | Uloží se nová pizza. |
| 8 | Aplikace | Zobrazí se stránka se seznamem všech pizz. |

### Alternative flow:
| Krok | Actor | Reakce |
|:---:|:---|:---|
| 4a | Majitel | Vložení nevalidních údajů. | 
| | Aplikace | Zobrazí se hláška s upozorněním na nesprávné údaje. | 

## UC4	S1	Zobrazení historie objednávek, řazení dle: datum, zákazník, pizza
### Preconditions: Spuštěná aplikace, přihlášený majitel
### Basic flow:
| Krok | Actor | Akce |
|:---:|:---|:---|
| 1 | Aplikace | V menu pro majitele je možnost Historie objednávek. |
| 2 | Majitel | Majitel vybere položku Historie objednávek. |
| 3 | Aplikace | Zobrazí se stránka se seznamem všech objednávek. |

### Alternative flow:
| Krok | Actor | Reakce |
|:---:|:---|:---|
| 4a | Majitel | Majitel vybere řazení objednávek. | 
|  | Aplikace | Výpis objednávek se seřadí podle kritéria vybraného majitelem. | 
| 4b | Majitel | Majitel nastaví filtrování objednávek. | 
|  | Aplikace | Výpis objednávek vyfiltruje podle kritéria vybraného majitelem. |

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

## UC4	S3	Storno objednávky
### Preconditions: Spuštěná aplikace, přihlášený majitel, zobrazená stránka s objednávkami
### Basic flow:
| Krok | Actor | Akce |
|:---:|:---|:---|
| 1 | Aplikace | Na stránce je seznam založených a otevřených objednávek, u založených je možnost storna. |
| 2 | Majitel | Majitel vybere storno u vybrané objednávky. |
| 3 | Aplikace | Aplikace ověří, že si je uživatel jistý. |
| 4 | Majitel | Majitel potvrdí storno objednávky. |
| 5 | Aplikace | Aplikace provede storno objednávky. |
| 6 | Aplikace | Aplikace zobrazí potvrzení o provedeném stornu objednávky. |
| 7 | Aplikace | Aplikace aktualizuje stav objednávky na stránce. |

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

## UC5	S2	Editace ingredience
### Preconditions: Spuštěná aplikace, přihlášený majitel, zobrazená stránka s ingrediencemi
### Basic flow:
| Krok | Actor | Akce |
|:---:|:---|:---|
| 1 | Aplikace | Zobrazený seznam ingrediencí a u každé možnost editovat ji. |
| 2 | Majitel | Uživatel vybere možnost Editace ingredience. |
| 3 | Aplikace | Zobrazí se stránka s formulářem pro editaci ingredience. |
| 4 | Majitel | Majitel provede změny a potvrdí. |
| 5 | Aplikace | Zobrazí se seznam všech ingrediencí. |

### Alternative flow:
| Krok | Actor | Reakce |
|:---:|:---|:---|
| 4a | Majitel | Vložení nevalidních údajů. | 
| | Aplikace | Zobrazí se hláška s upozorněním na nesprávné údaje. | 

## UC6	S1	Zobrazení prodejnosti pizz za období
### Preconditions: Spuštěná aplikace, přihlášený majitel
### Basic flow:
| Krok | Actor | Akce |
|:---:|:---|:---|
| 1 | Aplikace | V menu majitele je položka "Statistiky". |
| 2 | Majitel | Majitel vybere položku "Statistiky". |
| 3 | Aplikace | Zobrazí se stránka s přehledem objednávek za poslední měsíc. |

### Alternative flow:
| Krok | Actor | Reakce |
|:---:|:---|:---|
| 4a | Majitel | Majitel zadá rozsah obodbí, za které chce zobrazit přehled prodejnosti pizz. | 
| | Aplikace | Aplikace aktualizuje přehled na základě kritérií. | 

## UC6	S2	Zobrazení prodejnosti pizz podle druhu, + řazení
### Preconditions: Spuštěná aplikace, přihlášený majitel, zobrazená stránka se statistikami
### Basic flow:
| Krok | Actor | Akce |
|:---:|:---|:---|
| 1 | Aplikace | V menu majitele je položka "Statistiky". |
| 2 | Majitel | Majitel vybere položku "Statistiky". |
| 3 | Aplikace | Zobrazí se stránka s přehledem objednávek za poslední měsíc. |
| 4 | Majitel | Majitel zvolí přehled dle druhu pizzy. |
| 5 | Aplikace | Aplikace zobrazí přehled dle druhu pizzy. |
| 6 | Majitel | Majitel vybere atribut, podle kterého chce statistiku seřadit. |
| 7 | Aplikace | Aplikace zobrazí přehled seřazený dle vybraného atributu. |

## UC7	S1	Vložení nového uživatele
### Preconditions: Spuštěná aplikace, přihlášený majitel, zobrazená stránka pro správu uživatelů
### Basic flow:
| Krok | Actor | Akce |
|:---:|:---|:---|
| 1 | Aplikace | Na stránce je seznam všech uživatelů a formulář pro vložení nového uživatele. |
| 2 | Majitel | Majitel vyplní formulář a odešle jej. |
| 3 | Aplikace | Na stránce se na chvíli zobrazí potvzrení o vložení nového uživatele. |
| 4 | Aplikace | Na stránce se aktualizuje seznam uživatelů a vyprázdní formulář. |
### Alternative flow:
| Krok | Actor | Reakce |
|:---:|:---|:---| 
| 2b  | Majitel | Majitel vloží a odešle nevalidní údaje. | 
| | Aplikace | U špatně vyplněných polí se zobrazí upozornění na nevalidní údaje. | 

## UC7	S2	Smazání uživatele
### Preconditions: Spuštěná aplikace, přihlášený majitel, zobrazená stránka pro správu uživatelů
### Basic flow:
| Krok | Actor | Akce |
|:---:|:---|:---|
| 1 | Aplikace | Na stránce je seznam všech uživatelů. |
| 2 | Majitel | Majitel zvolí uživatele, kterého chce smazat a potvrdí. |
| 3 | Aplikace | Na stránce se aktualizuje seznam uživatelů. |
| 4 | Aplikace | Na stránce se zobrazí potvrzení smazání uživatele. |

## UC7	S3	Změna hesla
### Preconditions: Spuštěná aplikace, přihlášený uživatel
### Basic flow:
| Krok | Actor | Akce |
|:---:|:---|:---|
| 1 | Aplikace | V uživatelském panelu je zobrazena možnost Změna hesla . |
| 2 | Uživatel | Uživatel zvolí změnu hesla. |
| 3 | Aplikace | Proběhne přesměrování uživatele na stránku s formulářem pro změnu hesla. |
| 4 | Uživatel | Uživatel zadá požadované údaje (staré heslo, 2x nové heslo). |
| 5 | Aplikace | Aplikace změní heslo uživatele. |
| 6 | Aplikace | Aplikace zobrazí potvrzení o změně hesla. |
