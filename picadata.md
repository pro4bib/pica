# Einführung in picadata

Das Kommandozeilenprogramm `picadata` ermöglicht die Konvertierung zwischen verschiedenen [PICA-Serialisierungen](formate?id=serialisierungen), einfache Analyse und Auswertung von PICA-Daten sowie die [Validierung gegen Avram-Schemas](formate?id=avram-schemas).

?> [Dokumentation von picadata auf metacpan](https://metacpan.org/pod/picadata)

## Installation

Das Tool ist Teil der Perl-Programmbibliothek [PICA::Data](https://metacpan.org/release/PICA-Data) und wird mit dieser installiert. Unter Debian-basierten Linux-Distributionen (u.A. Ubuntu) geht dies so:

~~~bash
sudo apt-get install libxml-libxml-perl cpanminus
sudo cpanm PICA::Data
~~~

Das Programm setzt vorhandene PICA-Daten voraus (siehe [Kapitel Schnittstellen](schnittstellen) zum Zugriff auf PICA-Daten). Zum Ausprobieren können PICA-Daten in [PICA Plain Syntax](https://format.gbv.de/pica/plain) auch mit einem Texteditor erstellt werden. Laden Sie die Datei [`example.pica`](example.pica ':ignore') mit folgendem Inhalt herunter:

[](example.pica ':include :type=code plain')

## Konvertierung

Im einfachsten Anwendungsfall liest `picadata` PICA+ Datensätze in PICA Plain und gibt sie mit [Syntax-Hervorhebung](darstellung?id=syntaxhervorherbung) wieder aus. Hier drei Aufruf-Möglichkeiten:

~~~bash
picadata example.pica
cat example.pica | picadata
picadata < example.pica
~~~

In der ersten Variante wird die PICA-Syntax anhand der Dateiendung erkannt. Ansonsten kann mit der Option `-f`/`--from` das [Serialisierungsformat](formate?id=serialisierungen) festgelegt werden, beispielsweise `-f bin` für [binäres PICA](https://format.gbv.de/pica/binary). Mit der Option `-t`/`--to` kann die Serialisierung der Ausgabe festgelegt werden. Standardmäßig sind Serialisierung für Ein- und Ausgabe gleich.

~~~bash
picadata example.pica                        # PICA Plain nach PICA Plain
picadata example.pica -t xml > example.xml   # PICA Plain nach PICA/XML
picadata example.xml                         # PICA/XML nach PICA/XML
picadata example.xml -t json                 # PICA/XML nach PICA/JSON
~~~

Folgende Serialisierungsformate werden unterstützt:

| Format                | Name oder Dateiendungen   |
|-----------------------|---------------------------|
| [PICA Plain]          | `plain`, `pp` (Standard)  | 
| [Binäres PICA]        | `binary`, `bin`, `dat`, `extpp`, `ext` |
| [Normalisiertes PICA] | `plus`, `norm`, `normpp` |
| [PICA-Importformat]   | `import` |
| [PICA/JSON]           | `json`, `ndjson`  |
| [PICA/XML]            | `xml` |
| [PPXML]               | `ppxml` | 

[PICA Plain]: https://format.gbv.de/pica/plain
[Binäres PICA]: https://format.gbv.de/pica/binary
[PICA-Importformat]: https://format.gbv.de/pica/import
[Normalisiertes PICA]: https://format.gbv.de/pica/normalized
[PICA/JSON]: https://format.gbv.de/pica/json
[PICA/XML]: https://format.gbv.de/pica/xml
[PPXML]: https://format.gbv.de/pica/ppxml

Für PICA Plain und PICA/JSON werden vorhandene [Annotationen](formate?id=Änderungsformat) standardmäßig mit ausgegeben. Die Option `-A` unterdrückt die Ausgabe von Annotationen. Umgekehrt stellt die Option `-a`/`--annotate` sicher dass alle Felder annotiert sind, indem ggf. ein Leerzeichen als Standard-Annotation ergänzt wird.

In der Regel sind PICA-Felder in einem Datensatz geordnet. Die Option `-o` sortiert Datensätze neu und zwar getrennt für die bibliographische Ebene und innerhalb der einzelnen Lokal- und Exemplardatensätze.

## Auswahl von Daten

Bei größeren Datenmengen macht es Sinn sich erstmal einige Beispiele anzuschauen. Mit der Option `-n`/`--number` werden nur eine begrenzte Zahl von Datensätzen verarbeitet, z.B. die ersten 10:

~~~bash
picadata -n 10 example.pica
picadata -10 example.pica     # Equivalente Abkürzung der Option
~~~

Oft interessieren nur bestimmte Felder bzw. deren Inhalte. Mit der Option `-p`/`--path` lassen sich Datensätze auf Felder eingrenzen. Zur Auswahl der Felder bzw. Unterfelder dient die [Abfragesprache PICA Path Expression](formate?id=abfragesprache):

~~~bash
picadata -p '003@' example.pica        # Nur Feld 003@
picadata -p '00..' example.pica        # Alle Felder die mit 00 beginnen
picadata -p '003@|021A' example.pica   # Mehrere Felder
~~~

Zur Abkürzung kann der Optionsschalter `-p` auch weggelassen werden wenn die Feldauswahl am Anfang steht. So lassen sich beispielsweise Datensätze auf K10plus-Felder zur klassifikatorischen Sacherschließung eingegrenzen:

~~~bash
picadata '003@|021A' <example.pica
~~~

Wenn die Liste der Felder länger ist, empfiehlt es sich sie in eine Datei zu schreiben und diese zur referenzieren:

~~~bash
picadata $(<fields) example.pica
~~~

Statt ganze PICA-Felder können mit PICA-Path Expressions auch Unterfelder referenziert werden. Die Werte der gefundenen Unterfelder werden zeilenweise ausgegeben. Hier einige Beispiele:

~~~bash
$ picadata '003@$0' example.pica
12345X
$ picadata '021A$a' example.pica
Ein Buch
$ picadata '021A$ah' example.pica
Ein Buch
Zum Lesen
~~~

Für komplexere Auswahl- und Konvertierungs-Routinen (zum Beispiel mit Wenn-Dann-Regeln und Zusammenführung von Feldern) sollte ein mächtigeres Werkzeug zur PICA-Datenverarbeitung wie [Catmandu] oder eine andere Programmiersprache verwendet werden.

## Datenanalyse

Die Option `-c`/`--count` erzeugt eine Einfache Statistik mit der Anzahl gelesener Datensätze und Felder. Standardmäßig wird die Ausgabe der Datensätze unterdrückt, außer mit `-t`/`--to` ist explizit eine Syntax festgelegt.

~~~bash
picadata -c example.pica
~~~

Das Ausgabeformat `fields` (oder kurz `f`) listet alle vorkommenden Felder auf. Entsprechend gibt es das Ausgabeformat `subfields` (kurz `sf`). 

~~~bash
picadata f example.pica 
~~~
~~~
003@
021A
045B/02
~~~

Bei Angabe eines Schemas per Dateiname oder URL wird (falls vorhanden) das Feld bzw. Unterfeld dokumentiert:

~~~bash
picadata fields example.pica -s https://format.k10plus.de/avram.pl?profile=k10plus
~~~
~~~
003@ o Pica-Produktionsnummer
021A o Haupttitel, Titelzusatz, Verantwortlichkeitsangabe
045B/02 * Systematik fÃ¼r Bibliotheken (SfB)
~~~

Das Zeichen nach der Feldnummer gibt an, ob das entsprechende Feld optional und wiederholbar oder nicht wiederholbar (`*` oder `o`) bzw. notwendig (`+` oder `.`) ist.

Eine ausführlichere Analyse ist mit der Option `-b`/`--build` möglich, die aus vorhandenen PICA-Daten ein [Avram-Schema](formate?id=avram-schemas) erstellt. Option `-B` reduziert das Schema zur Besseren Lesbarkeit um redundante Bestandteile.

~~~bash
picadata -B example.pica
~~~

[](example-schema.json ':include :type=code json')

## Validierung

Bei Angabe eines [Avram-Schema](formate?id=avram-schemas) per Datei oder URL mit Option `-s`/`--schema` werden Eingabedaten gegen das Schema validiert. Unbekannte Felder und Unterfelder werden dabei ignoriert, außer bei Angabe der zusätzlichen Option `-u`/`--unknown`. Das Ergebnis der Validierung kann auf verschiedene Weise angezeigt werden:

* Standarmäßig werden nur Fehlermeldungen ausgegeben. Ist der Datensatz korrekt, erfolgt also keine Ausgabe.

* Mit der Option `-a`/`--annotate` wird das Ergebnis der Validierung als Feld-Annotation ausgegeben. Die Markierung von fehlerhaften Feldern ist `!` und von unbekannten Feldern `?`.

Wurde ein Fehler erkannt, so ist der Statuscode des Programms 1, so dass Shell-Programmierung verwendet werden kann:

~~~bash
picadata -s schema.json example.pica && echo "OK"
~~~

Hier ein vollständiges Beispiel zur Abfrage und Validierung eines Teilbestandes des K10plus (Titel zum Thema Brückenbau an der TU Braunschweig):

~~~bash
curl https://format.k10plus.de/avram.pl?profile=k10plus-title > k10plus-title.json
catmandu convert kxp --base http://sru.k10plus.de/opac-de-84 --query pica.bkl=56.23 to pp > brueckenbau.pp
picadata validate -s k10plus-title.json brueckenbau.pp
~~~

!> Die Validierung umfasst momentan nur die bibliographische Ebene und keine Occurrence-Bereiche ([Siehe Issue](https://github.com/gbv/PICA-Data/issues/35))!


