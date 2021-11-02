# Über dieses Handbuch

Der Quelltext dieses Handbuchs wird in Markdown-Syntax geschrieben und in einem git-Repository verwaltet. Kommentare, Korrekturen und Änderungen können [direkt bei GitHub](https://github.com/pro4bib/pica) angemeldet werden.

Die jeweils aktuelle HTML-Version steht unter <https://pro4bib.github.io/pica/> zur Verfügung. Eine Druckversion [ist angedacht](https://github.com/pro4bib/pica/issues/1).

Das Verzeichnis `slides` enthält begleitende Vortragsfolien.

## Technische Details

Um das Handbuch lokal nach HTML zu übersetzen wird [docsify](https://docsify.js.org/) benötigt:

~~~bash
git clone git@github.com:pro4bib/pica.git && cd pica
npm i
npm run serve
~~~

Der Markdown-Quelltext lässt sich mit [markdownlint](https://www.npmjs.com/package/markdownlint) auf ein einheitliches Format überprüfen:

~~~bash
npm run lint
~~~

Zur Erstellung der HTML-Version der Vortragsfolien in `slides` muss Pandoc installiert sein, dann reicht dort ein Aufruf von `make`.

## Danksagung

Die Technische Infrastruktur für die Bereitstellung dieses Handbuchs wurde von [Felix Lohmeier](https://felixlohmeier.de/) abgeschaut, der übrigens auch weitere interessante Einführungen in Themen der Datenverarbeitung für Bibliotheks- und Kultureinrichtungen anbietet. Die Implementierungen zur [Verarbeitung von PICA-Daten](verarbeitung) basieren zu wesentlichen Teilen auf der Arbeit von Carsten Klee und Johann Rolschewski. Weitere Beiträge und hilfreiche Hinweise zu diesem Handbuch stammen von Cornelius Amzar, Nico Wagner, Sabrina Gaab und Anne Schuchardt.

## Lizenz

Dieses Werk ist lizenziert unter einer [Creative Commons Namensnennung 4.0 International Lizenz](http://creativecommons.org/licenses/by/4.0/)

[![Creative Commons Lizenzvertrag](https://i.creativecommons.org/l/by/4.0/88x31.png)](http://creativecommons.org/licenses/by/4.0/)
