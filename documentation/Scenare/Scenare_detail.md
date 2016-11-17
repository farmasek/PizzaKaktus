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

## UC2	S2	Objednání pizzy z nabídky s editací
### Preconditions: Spuštěná aplikace, přihlášený uživatel, zobrazená nabídka pizz
### Basic flow:
| Krok | Actor | Akce |
|:---:|:---|:---|
| 1 | Aplikace | Zobrazený list pizz s tlačítkem přidání do košíku, tlačítkem pro editaci. |
| 2 | Uživatel | Uživatel klikne na tlačítko editace u dané pizzy. |
| 3 | Aplikace | Zobrazí se formulář pro úpravu ingrediencí vybrané pizzy. |
| 4 | Uživatel | Uživatel provede úpravy. |
| 5 | Uživatel | Po navolení ingrediencí uživatel přidá pizzu do košíku. |
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

## UC7	S2	Smazání uživatele
### Preconditions: Spuštěná aplikace, přihlášený majitel, zobrazená stránka pro správu uživatelů
### Basic flow:
| Krok | Actor | Akce |
|:---:|:---|:---|
| 1 | Aplikace | Na stránce je seznam všech uživatelů. |
| 2 | Majitel | Majitel zvolí uživatele, kterého chce smazat a potvrdí. |
| 3 | Aplikace | Na stránce se aktualizuje seznam uživatelů. |
| 4 | Aplikace | Na stránce se zobrazí potvrzení smazání uživatele. |

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
