## Links

Planung: https://www.figma.com/board/Z3iDrZIOm4Lu9aweWK8CGW/Chirpify?node-id=0-1&t=1slW9dzNiFZaW1rv-0
Git: https://github.com/MiaMarmeladenbrot/Chirpify
Design: https://www.figma.com/design/fqOftvDrv7gknxi7i66WVx/Twitter-Clone?node-id=4-1224&t=Et7WDTOAYCrKVKqH-0

## Backend ToDos

- showFeed -> retweetedTweetId populaten?
- addTweet: falls retweet, dessen Infos populaten?
- editTweet: soll man retweetTweetId hinterher bearbeiten können? -> nein!
- Update Access Token back to 10 min
- refreshToken implementieren
- Multer für Profilbild und Tweet-Bild -> Tweet-Model
- Endpunkt für random Vorschläge, damit der User überhaupt zu Beginn die Möglichkeit hat, Leuten zu folgen, etc.?
- Suchfunktion nach Usern und Themen? Oder im Frontend umsetzen?

## Fragen an Ahmed

- was macht wann mehr Sinn: Ids in params oder body?

## Frontend ToDos

- Position von addTweet-Button anpassen bei größerem Bildschirm
- retweeted Tweet auf addTweetPage darstellen, falls es ein retweet ist
- CommentFetch
- LikeFetch/DislikeFetch
- taggedUsers über filter-Funktion ans Backend
- alles auf UserPage
- Suche nach Usern (@) und Themen (#)?
- AuthRequired mit refresh anpassen
