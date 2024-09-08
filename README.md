# Projektuppgift DT208G
## Typescript och Angular

Det här projektet är en Angular-applikation för ett fiktivt universitet med interaktiv
kursplanering. Användaren kan bläddra bland tillgängliga kurser och ämnen och lägga till dessa till ett personligt ramschema. Sidan använder olika components för att dela upp funktionaliteten.

## Funktioner
- Visa tillgängliga kurser: En lista med tillgängliga kurser hämtas från en JSON-fil och visas för användaren
- Lägg till/radera kurser i schemat: Användaren kan lägga till samt radera kurser från utbudet till sitt personliga schema som sparas via localStorage
- Datahämtning via HttpClient: Applikationen hämtar kursdata via HttpClient i en service-fil
- Modulär design: Sidan använder flera Angular-komponenter för att strukturera och underlätta återanvändning av kod

Cecilia Lindström celi2302