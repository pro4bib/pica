# Einführung in pica-rs

pica-rs ist wie [picadata](picadata.md) ein Kommandozeilenwerkzeug zur Auswertung von PICA-Daten.

?> [Dokumentation von pica-rs](https://github.com/deutsche-nationalbibliothek/pica-rs#readme)

## Installation

Am einfachsten die Installation einer Release-Version des Programms von der Seite <https://github.com/deutsche-nationalbibliothek/pica-rs/releases>. Unter "Assets" werden dort Pakete für verschiedene Betriebsysteme bereitgestellt. Alternativ kann die letzte Entwicklungsversion aus dem git-Repository installiert werden, wie in der Dokumentation von pica-rs beschrieben.

## Bedienung

?> Siehe [pica-rs Anfänger-Tutorial](https://deutsche-nationalbibliothek.github.io/pica-rs/book/beginner-tutorial.html)

Das Kommandozeilenprogramm von pica-rs heisst `pica`. Im Gegensatz zu `picadata` wird als Standard-Syntax normalisiertes PICA (mit einem Datensatz pro Zeile) angenommen. Das Programm stellt folgende Befehle bereit:

* `pica filter` zur Auswahl von Datensätzen, die ein bestimmtes Kriterium erfüllen
* `pica select` zur Auswahl von Unterfeldwerten und Ausgabe im CSV-Format
* `pica frequency` zur Erstellung einer Häufigkeitsverteilung von Unterfeldwerten (Histogramm)
* `pica partition`, `pica sample`, `pica slice` und `pica split` zur Reduktion von Datensätzen in kleinere Mengen
* `pica cat`, `pica print`, `pica xml` und `pica json` zur Ausgabe von Datensätzen in unterschiedlichen PICA-Serialisierungen

