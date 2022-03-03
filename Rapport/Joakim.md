
# Grupprojekt - frontend app

Ni ska jobba i par och det vanliga gäller när det kommer till jämt committande. Ni kan dela upp arbetet eller parkoda hur ni vill. **Båda måsta ha egna commits där ni gör web-api anrop.**

Användaren ska kunna trigga fler web-api anrop än de som sker i början för att bygga upp hemsidan första gången. Sidan ska inte behöva laddas om och man ska heller inte behöva navigera till en ny sida. Det viktiga är att ni använder fetch + DOM manipulering för att hålla sidan uppdaterad.

Ni måste båda koda var sitt sådant här moment för att fylla **kursmål 6**.

Den ena kan göra en [Collapse](https://getbootstrap.com/docs/5.1/components/collapse/) eller [Modal](https://getbootstrap.com/docs/5.0/components/modal/) som visar mer info om ett item när man klickar på `read more`/`read comments`.

Den andra kan göra en [Pagination](https://getbootstrap.com/docs/5.1/components/pagination/) eller [Navigation](https://getbootstrap.com/docs/5.0/components/navs-tabs/#vertical) där man bara ser en viss mängd items åt gången och användaren kan bläddra fram och tillbaka.

Det är ok att komma på något annat att göra med, men det måste innefatta användarevent som leder till web-api anrop.

### Pokemon webbshop

Denna hemsida bygger på [PokéAPI](https://pokeapi.co/), all info om pokemon hämtas härifrån. Tanken är att skapa en webbshop där man kan browsa pokemon via en pagination. Nedan är ett par wireframe exempel:

## Allmänt

### G krav

Program:
- web-api:n används för att fylla ut hemsidan. Ingen hårdkodad data
- events används för trigga ytterligare web-api anrop vid behov

Rapport:
- ta upp ett exempel där du använder `fetch` och gå igenom tidsförloppet. Vad händer från att du kallar på metoden till att du får ut ett JS objekt som svar?
- reflektera över, och analysera de lösningar du gjort i projektet

## Deadlines

- Deadline #1 
  - Rapport lämnas in senast Söndag 06/03-22 kl 23.55 i PingPong.
  - Grupprojekt lämnas in senast Fredag 04/03-22 kl 23.55 i PingPong.
- Deadline #2
  - Rapport lämnas in senast Söndag 20/03-22 kl 23.55 i PingPong.
  - Grupprojekt lämnas in senast Fredag 18/03-22 kl 23.55 i PingPong.

### Inlämning

