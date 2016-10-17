## UC1	S1	Přihlásit zaměstnance/majitele
### Preconditions: Spuštěná aplikace
### Basic flow:
| Krok | Actor | Akce |
|:---:|:---|:---|
| 1 | Aplikace | Zobrazený formulář pro přihlášení - pole pro uživatelské jméno, heslo a tlačítko pro odeslání formuláře, spolu s odkazem na změnu hesla. |
| 2 | Majitel/Zaměstnanec | Uživatel zadá uživatelské jméno a heslo, potvrdí zadání údajů tlačítkem. |
| 3 | Aplikace | Formulář pro přihlášení zmizí, místo něj se zobrazí jméno uživatele a možnost odhlášení. |

### Alternative flow:
| Krok | Actor | Reakce |
|:---:|:---|:---|
| 2a | Majitel/Zaměstnanec | Vložení špatných údajů. | 
| | Aplikace | Zobrazí se hláška s upozorněním na nesprávné údaje. | 


## UC5	S1	Vložení nové ingredience
### Preconditions: Spuštěná aplikace, přihlášený uživatel
### Basic flow:
| Krok | Actor | Akce |
|:---:|:---|:---|
| 1 | Aplikace | Zobrazené menu pro správce s položkou Vložení ingredience. |
| 2 | Majitel/Zaměstnanec | Uživatel vybere možnost Vložení ingredience. |
| 3 | Aplikace | Zobrazí se stránka s formulářem pro vložení nové ingredience - název, množství v gramech, cena, spolu s tlačíkem pro odeslání formuláře. |
| 4 | Majitel/Zaměstnanec | Uživatel vyplní formulář a odešle jej kliknutím na tlačítko. |

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
| 1 | Aplikace | V menu pro správce je u položky "Správa pizz" možnost "Vložení nove pizzy do nabídky". |
| 2 | Majitel | Majitel vybere tuto možnost.|
| 3 | Aplikace | Zobrazí se stránka s formulářem pro vytvoření nové pizzy. |
| 4 | Majitel | Zadání názvu, ceny, ingrediencí a obrázku pro novou pizzu. |
| 5 | Majitel | Potvrzení nové pizzy. |

### Alternative flow:
| Krok | Actor | Reakce |
|:---:|:---|:---|
| 4a | Majitel | Vložení nevalidních údajů. | 
| | Aplikace | Zobrazí se hláška s upozorněním na nesprávné údaje. | 


## UC2	S1	Objednání pizzy z nabídky
!!! DODĚLAT!!!


## UC4	S2	Otevření a potvrzení přijaté objednávky
### Preconditions: Spuštěná aplikace, přihlášený uživatel, založená objednávka
### Basic flow:
| Krok | Actor | Akce |
|:---:|:---|:---|
| 1 | Aplikace | V menu pro správce je u položky zobrazení stavu objednávek počet založených objednávek. |
| 2 | Majitel/Zaměstnanec | Uživatel vybere položku menu pro zobrazení objednávek. |
| 3 | Aplikace | Zobrazí se stránka s výčtem posledních 20 objednávek na základě data a času. U každé objednávky je uveden stav. Stav lze změnit pomocí select boxů s možnostmi - založená, otevřená, uzavřená. Vedle je tlačítko pro potvrzení změny stavu. |
| 4 | Majitel/Zaměstnanec | Uživatel vybere možnost "otevřená" a potvrdí ji tlačítkem. |
| 5 | Aplikace | Aplikace změní stav u vybrané objednávky. |
| 6 | Aplikace | Aplikace odešle email s potvrzením přijetí objednávky. | 


## UC4	S3	Editace stavu otevřené objednávky - založená, otevřená, uzavřená
### Preconditions: Spuštěná aplikace, přihlášený uživatel
### Basic flow:
| Krok | Actor | Akce |
|:---:|:---|:---|
| 1 | Aplikace | V menu pro správce je položka pro zobrazení stavů objednávek. |
| 2 | Majitel/Zaměstnanec | Uživatel klikne na položku menu. |
| 3 | Aplikace | Zobrazí se stránka s výčtem posledních 20 objednávek na základě data a času. U každé objednávky je uveden stav. Stav lze změnit pomocí select boxů s možnostmi - založená, otevřená, uzavřená. Vedle je tlačítko pro potvrzení změny stavu. |
| 4 | Majitel/Zaměstnanec | Uživatel vybere nový stav objednávky a potvrdí uložení tlačítkem. |
| 5 | Aplikace | U vybrané objednávky se ve výpisu změní stav podle zadání uživatele. |

