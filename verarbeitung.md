# Verarbeitung von PICA-Daten

Dieses Kapitel gibt eine Übersicht von Werkzeugen zur Verarbeitung von PICA-Daten, beschränkt auf frei zugängliche Open Source Anwendungen. Im Wesentlichen sind dies die Kommandozeileprogramme [picadata] und [Catmandu] mit den ihnen zugrunde liegenden Perl-Programmbibliotheken.

[picadata]: #picadata
[Catmandu]: #catmandu

## picadata

Das Kommandozeilenprogramm `picadata` ermöglicht die Konvertierung zwischen verschiedenen [PICA-Serialisierungen](formate?id=serialisierungen), einfache Analyseund Auswertung von PICA-Daten sowie die [Validierung gegen Avram-Schemas](formate?id=avram-schemas).

?> [Dokumentation von picadata auf metacpan](https://metacpan.org/pod/picadata)

### Installation

Das Tool ist Teil der Perl-Programmbibliothek [PICA::Data](https://metacpan.org/release/PICA-Data) und wird mit dieser installiert. Unter Debian-basierten Linux-Distributionen (u.A. Ubuntu) geht dies so:

~~~bash
sudo apt-get install libxml-libxml-perl cpanminus
sudo cpanm PICA::Data
~~~

### Benutzung

Das Programm setzt vorhandene PICA-Daten voraus (siehe [Kapitel Schnittstellen](schnittstellen) zum Zugriff auf PICA-Daten). Zum Ausprobieren können PICA-Daten in [PICA Plain Serialisierung](https://format.gbv.de/pica/plain) auch mit einem Texteditor erstellt werden. Laden Sie die Datei [`example.pica`](example.pica ':ignore') mit folgendem Inhalt herunter:

[](example.pica ':include :type=code plain')

#### Konvertierung zwischen PICA-Serialisierungen

Im einfachsten Anwendungsfall liest `picadata` eine Datei in PICA Plain und gibt ihren Inhalt mit [Syntax-Hervorhebung](darstellung?id=syntaxhervorherbung) wieder aus. Hier drei Aufruf-Möglichkeiten:

~~~bash
picadata example.pica
cat example.pica | picadata
picadata <example.pica
~~~

In der ersten Variante wird die PICA-Serialisierung anhand der Dateiendung erkannt. Ansonsten kann mit der Option `-f` das [Serialisierungsformat](formate?id=serialisierungen) festgelegt werden, beispielsweise `-f bin` für [binäres PICA](https://format.gbv.de/pica/binary). Mit der Option `-t` kann die Serialisierung der Ausgabe festgelegt werden. Standardmäßig sind Serialisierung für Ein- und Ausgabe gleich.

~~~bash
picadata example.pica -t xml >example.xml   # PICA Plain nach PICA/XML
picadata example.xml -t json                # PICA/XML nach PICA/JSON
~~~

#### Auswahl von Daten

Oft interessieren nur bestimmte Felder bzw. deren Inhalte. Mit der Option `-p` lassen sich Datensätze auf Felder eingrenzen. Zur Auswahl der Felder bzw. Unterfelder dient die [Abfragesprache PICA Path Expression](formate?id=abfragesprache):

~~~bash
picadata -p '003@' example.pica        # Nur Feld 003@
picadata -p '00..' example.pica        # Alle Felder die mit 00 beginnen
picadata -p '003@|021A' example.pica   # Mehrere Felder
~~~

Zur Abkürzung kann der Optionsschalter `-p` auch weggelassen werden wenn die Feldauswahl am Anfang steht. So lassen sich beispielsweise Datensätze auf K10plus-Felder zur klassifikatorischen Sacherschließung eingegrenzen:

~~~bash
picadata '003@|021A' <example-pica
~~~

Wenn die Liste der Felder länger ist, empfiehlt es sich sie in eine Datei zu schreiben und diese zur referenzieren:

~~~bash
picadata `<fields` example.pica
~~~

<!-- TODO: Auswahl von Unterfeld-Werten -->

Für komplexere Auswahl-Routinen (z.B. mit Wenn-Dann-Bedingungen) sollte ein mächtigeres Werkzeug zur PICA-Datenverarbeitung wie zum Beispiel [Catmandu] verwendet werden.

## Catmandu

**Catmandu** ist ein digitaler Werkzeugkasten für die Verarbeitung von Metadaten. Im Gegensatz zu ähnlichen ETL-Tools unterstützt Catmandu gängige Datenformate und Schnittstellen von Bibliothekssoftware, darunter auch PICA. Die PICA-Unterstützung in Catmandu basiert auf [picadata] und geht darüber hinaus, vor allem was Möglichkeiten des Zugriffs auf [Schnittstellen](schnittstellen) und der Konvertierung zwischen PICA und anderen Formaten betrifft.

?> [Catmandu-Einführung](https://metacpan.org/pod/Catmandu::Introduction) (in Englisch)

### Installation

Für Debian-basierte Betriebsysteme kann Catmandu mit Unterstützung von PICA und SRU folgendermaßen installiert werden:

~~~bash
sudo apt-get install libcatmandu-perl libcatmandu-sru-perl cpanm
sudo cpanm Catmandu::PICA
~~~

### Konfiguration

In der Konfigurationsdatei `catmandu.yaml` lassen sich häufig benötigte Einstellungen angeben, so dass sie nicht bei jedem Aufruf von catmandu mit angegeben werden müssen. Für die Verarbeitung von PICA-Daten, insbesondere aus dem K10plus-Katalog empfiehlt sich [folgende YAML-Datei](catmandu.yaml ':ignore'), die in den folgenden Beispielen vorausgesetzt wird:

[](catmandu.yaml ':include :type=code yaml')

Die folgenden beiden Kommandos zur Konvertierung von PICA/XML nach PICA Plain sind damit gleich; die Konfiguration ermöglicht eine kürzere Schreibweise:

~~~bash
catmandu convert PICA --type XML to PICA --type plain example.pica
catmandu convert picaxml to pp example.pica
~~~

?> Weitere Beispiele für die PICA-Datenverarbeitung mit Catmandu [im Abschnitt zur SRU-Schnittstelle](schnittstellen?id=SRU)
