# Einführung in Catmandu

**Catmandu** ist ein digitaler Werkzeugkasten für die Verarbeitung von Metadaten. Im Gegensatz zu ähnlichen ETL-Tools unterstützt Catmandu gängige Datenformate und Schnittstellen von Bibliothekssoftware, darunter auch PICA. Die PICA-Unterstützung in Catmandu basiert auf [picadata] und geht darüber hinaus, vor allem was Möglichkeiten des Zugriffs auf [Schnittstellen](schnittstellen) und der Konvertierung zwischen PICA und anderen Formaten betrifft.

?> [Catmandu-Einführung](https://metacpan.org/pod/Catmandu::Introduction) (in Englisch)

## Installation

Für Debian-basierte Betriebsysteme kann Catmandu mit Unterstützung von PICA und SRU folgendermaßen installiert werden:

~~~bash
sudo apt-get install libcatmandu-perl libcatmandu-sru-perl cpanminus
sudo cpanm Catmandu::PICA
~~~

## Konfiguration

In der Konfigurationsdatei `catmandu.yaml` lassen sich häufig benötigte Einstellungen angeben, so dass sie nicht bei jedem Aufruf von catmandu mit angegeben werden müssen. Für die Verarbeitung von PICA-Daten, insbesondere aus dem K10plus-Katalog empfiehlt sich [folgende YAML-Datei](catmandu.yaml ':ignore'), die in den folgenden Beispielen vorausgesetzt wird:

[](catmandu.yaml ':include :type=code yaml')

Die folgenden beiden Kommandos zur Konvertierung von PICA/XML nach PICA Plain sind damit gleich; die Konfiguration ermöglicht eine kürzere Schreibweise:

~~~bash
catmandu convert PICA --type XML to PICA --type plain example.pica
catmandu convert picaxml to pp example.pica
~~~

## PICA in Catmandu

Intern werden PICA-Daten in Catmandu als ein Datensätze mit je zwei Feldern verarbeitet:

* `_id` enthält die PPN (falls vorhanden, ansonsten `null`)
* `_record` enthält die PICA-Daten in [PICA/JSON](https://format.gbv.de/pica/json)-Struktur

Hier der Beispieldatensatz so wie er von Catmandu gelesen wird (da in der Regel mehrere Datensätze verarbeitet werden, ist die JSON-Ausgabe standardmäßig ein Array aller Datensätze). Vorausgesetzt wird wieder die Beispieldatei [`example.pica`](example.pica ':ignore'):

~~~bash
catmandu convert pp to JSON < example.pica
~~~

~~~json
[{"record":[["003@","","0","12345X"],["021A","","a","Ein Buch","h","zum Lesen"],["045B","02","a","Spo 1025","a","BID 200"]],"_id":"12345X"}]
~~~

Funktionen zur Verarbeitung von PICA in Catmandu werden erst durch das Paket [Catmandu-PICA](https://metacpan.org/release/Catmandu-PICA) bereitgestellt (siehe [Installation](#installation-1)):

* Lesen und Schreiben verschiedener [PICA-Serialisierungen](formate?id=serialisierungen)
* Auswerten und Verändern der Inhalte von PICA-Datensätzen
* Abruf von PICA-Daten über [SRU-Schnittstellen](schnittstellen?id=sru)
* Validierung von PICA-Daten mit [Avram-Schemas](formate?id=avram-schemas)

## Fix-Skripte

Eine Besonderheit von Catmandu sind die so genannten **Fix-Skripe** zur Auswertung und Veränderung von Daten. Hier ein Beispiel zur Konvertierung von PICA in eine CSV-Tabelle:

~~~bash
catmandu convert pp to CSV --fix 'pica_map(021A$ah,titel,join:" ") remove_field(record)' < example.pica
~~~

~~~csv
_id,titel
12345X,Ein Buch zum Lesen
~~~

Dieses Fix-Skript besteht aus zwei Befehlen (bei längeren Fix-Skripten empfiehlt sich das Auslagern in eine eigene Datei):

* `pica_map(021A$ah,titel,join:" ")` fügt ein neues Feld `titel` mit dem Inhalt der Unterfelder `$a` und `$h` des PICA-Feld `021A` hinzu, wobei mehrere Inhalte durch Leerzeichen verbunden werden. Der Zugriff auf die Unterfelder erfolgt mittels [PICA Path Expression](formate?id=abfragesprache).
* `remove_field(record)` entfernt den PICA-Datensatz, so dass nur noch `_id` und `titel` übrig bleiben.

Umgekehrt lassen sich mit Catmandu auch PICA-Daten erzeugen oder verändern. Hier ein Beispiel zur Änderung des Unterfelds `021A$a`:

~~~bash
catmandu convert pp to pp --fix 'set_field(titel,"Ein gutes Buch");pica_set(titel,021A$a)' < example.pica
~~~

~~~pica
003@ $012345X
021A $aEin gutes Buch$hzum Lesen
045B/02 $aSpo 1025$aBID 200
~~~

Weitere Beispiele für Fix-Skripte gibt es [im Abschnitt zur PICA-Bearbeitung](bearbeitung).

## Schnittstellen

Seine Stärken spielt Catmandu bei der Unterstützung einer Vielzahl von Schnittstellen und Datenbanksystemen aus um Daten aus verschiedenen Quellen aus- und in andere Systeme einzuspielen. Hier ein kurzes Beispiel mit der [SRU-Schnittstelle](schnittstellen?id=SRU) des K10Plus-Katalogs. Folgender Aufruf beantwortet die Frage welche Datensätze mit einer bestimmtender DDC-Sachgruppe der Deutschen Nationalbibliothek aber nicht mit der Basisklassifikation erschlossen sind:

~~~bash
catmandu convert kxp --query pica.sgd=590 --fix 'reject pica_match(045Q) remove_field(record)' to CSV --header 0
~~~

Im einzelnen besteht der Aufruf aus:

1. Abfrage aller Titel mit Sachgruppe 590 (Zoologie) im K10Plus\
  `catmandu convert kxp --query pica.sgd=590`

2. Herausfiltern von Datensätzen mit vorhandener Basisklassifikation (Feld `045Q`) und Reduzierung der verbleibenden Datensätze auf die PPN in Feld `_id`\
  `--fix 'reject pica_match(045Q) remove_field(record)`

3. Ausgabe der PPNs als CSV ohne Header (also nur je eine PPN pro Zeile):\
  `to CSV --header 0`

Weitere Beispiele für die PICA-Datenverarbeitung mit Catmandu gibt es [im Abschnitt zur SRU-Schnittstelle](schnittstellen?id=SRU). Eine vollständige Einführung in Catmandu würde jedoch den Umfang dieses Handbuchs übersteigen.


