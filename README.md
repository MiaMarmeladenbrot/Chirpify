## Links

Planung: https://www.figma.com/board/Z3iDrZIOm4Lu9aweWK8CGW/Chirpify?node-id=0-1&t=1slW9dzNiFZaW1rv-0
<br/>
Git: https://github.com/MiaMarmeladenbrot/Chirpify
<br/>
Design: https://www.figma.com/design/fqOftvDrv7gknxi7i66WVx/Twitter-Clone?node-id=4-1224&t=Et7WDTOAYCrKVKqH-0

## Backend ToDos

- Endpunkt für like/dislike comment schreiben?
- Kommentare kommentieren?
- editTweet: soll man retweetTweetId hinterher bearbeiten können? -> nein!
- Update Access Token back to 10 min
- refreshToken implementieren
- Multer für Tweet-Bild -> Tweet-Model anpassen
- Endpunkt für random Vorschläge, damit der User überhaupt zu Beginn die Möglichkeit hat, Leuten zu folgen, etc.? bzw Trending Feed implementieren?
- Suchfunktion nach Usern und Themen? Oder im Frontend umsetzen?

## Frontend ToDos

- Profile-Image im Header aktualisieren, wenn neu hochgeladen?
- error handling login
- Multer für Tweet-Bild ergänzen
- evtl. UserPage in versch. Komponenten auslagern
- AuthRequired mit refresh anpassen?
- counter für comments und retweets einbauen, um neben den Icons die Zahlen anzuzeigen - im Backend?
- follow/unfollow a user
- like comment
- allgemeines styling von button aus verifyEmail in die index übertragen mit classname .btn-blue?
- fetches in try/catch?
- Position von addTweet-Button anpassen bei größerem Bildschirm
- taggedUsers über filter-Funktion ans Backend
- Suche nach Usern (@) und Themen (#)?
