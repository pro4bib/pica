# Verarbeitung von PICA-Daten

Dieses Kapitel gibt eine Übersicht von Werkzeugen zur Verarbeitung von PICA-Daten, beschränkt auf frei zugängliche Open Source Anwendungen. Im Wesentlichen sind dies die Kommandozeileprogramme [picadata] und [Catmandu] mit den ihnen zugrunde liegenden Perl-Programmbibliotheken sowie die Web-Komponente [PicaEditor].

[picadata]: #picadata
[Catmandu]: #catmandu
[PicaEditor]: #picaeditor

## picadata

Das Kommandozeilenprogramm `picadata` ermöglicht die Konvertierung zwischen verschiedenen [PICA-Serialisierungen](formate?id=serialisierungen), einfache Analyseund Auswertung von PICA-Daten sowie die [Validierung gegen Avram-Schemas](formate?id=avram-schemas).

?> [Dokumentation von picadata auf metacpan](https://metacpan.org/pod/picadata)

### Installation

Das Tool ist Teil der Perl-Programmbibliothek [PICA::Data](https://metacpan.org/release/PICA-Data) und wird mit dieser installiert. Unter Debian-basierten Linux-Distributionen (u.A. Ubuntu) geht dies so:

~~~bash
sudo apt-get install libxml-libxml-perl cpanminus
sudo cpanm PICA::Data
~~~

Das Programm setzt vorhandene PICA-Daten voraus (siehe [Kapitel Schnittstellen](schnittstellen) zum Zugriff auf PICA-Daten). Zum Ausprobieren können PICA-Daten in [PICA Plain Syntax](https://format.gbv.de/pica/plain) auch mit einem Texteditor erstellt werden. Laden Sie die Datei [`example.pica`](example.pica ':ignore') mit folgendem Inhalt herunter:

[](example.pica ':include :type=code plain')

### Syntax-Konvertierung

Im einfachsten Anwendungsfall liest `picadata` PICA+ Datensätze in PICA Plain und gibt sie mit [Syntax-Hervorhebung](darstellung?id=syntaxhervorherbung) wieder aus. Hier drei Aufruf-Möglichkeiten:

~~~bash
picadata example.pica
cat example.pica | picadata
picadata <example.pica
~~~

In der ersten Variante wird die PICA-Syntax anhand der Dateiendung erkannt. Ansonsten kann mit der Option `-f` das [Serialisierungsformat](formate?id=serialisierungen) festgelegt werden, beispielsweise `-f bin` für [binäres PICA](https://format.gbv.de/pica/binary). Mit der Option `-t` kann die Serialisierung der Ausgabe festgelegt werden. Standardmäßig sind Serialisierung für Ein- und Ausgabe gleich.

~~~bash
picadata example.pica -t xml >example.xml   # PICA Plain nach PICA/XML
picadata example.xml -t json                # PICA/XML nach PICA/JSON
~~~

### Auswahl von Daten

Bei größeren Datenmengen macht es Sinn sich erstmal einige Beispiele anzuschauen. Mit der Option `-n` werden nur eine begrenzte Zahl von Datensatzen verarbeitet, z.B. die ersten 10:

~~~bash
picadata -n 10 example.pica
picadata -10 example.pica     # Equivalente Abkürzung der Option
~~~

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

### Datenanalyse

Die Option `--count` erzeugt eine Einfache Statistik mit der Anzahl gelesener Datensätze und Felder. Standardmäßig wird die Ausgabe der Datensätze unterdrückt, außer mit `-t` ist explizit eine Syntax festgelegt.

Eine ausführlichere Analyse ist mit der Option `--build` möglich, die aus vorhandenen PICA-Daten ein [Avram-Schema](formate?id=avram-schemas) erstellt. Hier die Kurzversion mit der Option `-B`:

~~~bash
picadata -B example.pica
~~~

[](example-schema.json ':include :type=code json')

### Hilfe und Validierung

!> Dieser Abschnitt muss erst noch geschrieben werden

## Catmandu

**Catmandu** ist ein digitaler Werkzeugkasten für die Verarbeitung von Metadaten. Im Gegensatz zu ähnlichen ETL-Tools unterstützt Catmandu gängige Datenformate und Schnittstellen von Bibliothekssoftware, darunter auch PICA. Die PICA-Unterstützung in Catmandu basiert auf [picadata] und geht darüber hinaus, vor allem was Möglichkeiten des Zugriffs auf [Schnittstellen](schnittstellen) und der Konvertierung zwischen PICA und anderen Formaten betrifft.

?> [Catmandu-Einführung](https://metacpan.org/pod/Catmandu::Introduction) (in Englisch)

### Installation

Für Debian-basierte Betriebsysteme kann Catmandu mit Unterstützung von PICA und SRU folgendermaßen installiert werden:

~~~bash
sudo apt-get install libcatmandu-perl libcatmandu-sru-perl cpanminus
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

### PICA in Catmandu

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

### Fix-Skripte

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

Umgekehrt lassen sich mit Catmandu auch PICA-Daten erzeugen oder verändern. Hier ein Beispiel zur Änderung des Unterfeld `021A$a`:

~~~bash
catmandu convert pp to pp --fix 'set_field(titel,"Ein gutes Buch");pica_set(titel,021A$a)' < example.pica
~~~

~~~pica
003@ $012345X
021A $aEin gutes Buch$hzum Lesen
045B/02 $aSpo 1025$aBID 200
~~~

### Schnittstellen

Seine Stärken spielt Catmandu bei der Unterstützung einer Vielzahl von Schnittstellen und Datenbanksystemen aus um Daten aus verschiedenen Quellen aus- und in andere Systeme einzuspielen. Hier ein kurzes Beispiel mit der [SRU-Schnittstelle](schnittstellen?id=SRU) des K10Plus-Katalog. Folgender Aufruf beantwortet die Frage welche Datensätze mit einer bestimmtender DDC-Sachgruppe der Deutschen Nationalbibliothek aber nicht mit der Basisklassifikatione erschlossen sind:

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

## PicaEditor

**PicaEditor** ist eine Komponente für Webanwendungen mit der PICA-Daten im Browser analysiert und bearbeitet werden können. Die Komponente basiert auf [CodeMirror](darstellung?id=codemirror) und dem JavaScript-Framework [Vue3](http://v3.vuejs.org/).

Der zentralen Teil des Editors dient der Anzeige und Bearbeitung von PICA+ Daten. Syntaxfehler und Fehler bei der Validierung gegen ein [Avram Schema](formate?id=avram-schemas) werden dabei hervorgehoben und mit dem Tabular kann schnell zwischen (Unter)feldern des Datensatz gewechselt werden. Unter dem Bearbeitungsfeld werden (sofern vorhanden) Schema-Informationen zum jeweils ausgewählten Feld angezeigt. Über dem Bearbeitungsfeld stehen die PPN und ein Link in den Katalog, aus dem Datensätze per PPN geladen werden können. Eine Möglichkeit zum Speichern in den Katalog besteht allerdings nicht.

<div id="pica-editor" style="text-align:left">
  <pica-editor :databases="databases"
               :unapi="'https://unapi.k10plus.de/'"
               :avram="'https://format.k10plus.de/avram.pl?profile=k10plus'"><pre>
003@ $0355973081
010@ $ager
011@ $a2001
019@ $aXA-DE$XXX
021A $a@Zehn Jahre Pica in Niedersachsen und Deutschland$dSkizzen eines Erfolgs aus Anlass der 5. Verbundkonferenz des Gemeinsamen Bibliotheksverbundes der Länder Bremen, Hamburg, Mecklenburg-Vorpommern, Niedersachsen, Sachsen-Anhalt, Schleswig-Holstein und Thüringen, vom 11.-12. September, 2001 in Göttingen$h[Redaktion, Elmar Mittler]
029A $a@Gemeinsamer Bibliotheksverbund der Länder Bremen, Hamburg, Mecklenburg-Vorpommern, Niedersachsen, Sachsen-Anhalt, Schleswig-Holstein und Thüringen$bVerbundkonferenz$xGöttingen, Germany)
029F $a@Niedersächsische Staats- und Universitätsbibliothek Göttingen
033A $pGöttingen$nNiedersächsische Staats- und Universitätsbibliothek
034D $a181 p
034I $a21 cm
034M $aill
044A $aPICA Project$aCongresses
045A $aZ699.4.P23
045V $a10$a24,2
</pre></pica-editor>
</div>

<script>
Vue.createApp({
  components: { PicaEditor },
  data() {
    return {
      databases: [{
       title: { de: "K10Plus" },
       picabase: "https://opac.k10plus.de/",
       dbkey: "opac-de-627"
      }]
    }
  }
}).mount("#pica-editor")
</script>

?> Technische Details zur Installation und Konfiguration findet sich [in der PicaEditor-Dokumentation](https://www.npmjs.com/package/pica-editor).
