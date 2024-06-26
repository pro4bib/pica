# PICA-Formate

Beim PICA-Format handelt es sich genaugenommen um eine Reihe aufeinander aufbauende Strukturierungsformate, Kodierungen und Anwendungsprofile. Im Zweifelsfall ist in diesem Handbuch das **PICA+** Format gemeint, auf dem alle anderen PICA-Formate aufbauen.

* Zunächst werden der [grundsätzliche Aufbau](#grundsätzlicher-aufbau) von PICA+ und [Pica3](#pica3) sowie mögliche [PICA-Serialisierungen](#serialisierungen) vorgestellt.

* Zum Zugriff auf einzelne Elemente von PICA-Datensätzen gibt es die [Abfragesprache PICA Path Expressions](#abfragesprache) und zum Vergleich von Datensätzen ein [Änderungsformat](#Änderungsformat).

* Konkrete Anwendungsformate von PICA werden als [Anwendungsprofile](#anwendungsprofile) durch semi-formale Katalogisierungsrichtlinien oder mittels formaler [Avram-Schemas](#avram-schemas) festgelegt.

## Grundsätzlicher Aufbau

Das interne Datenformat der CBS- und LBS-Software ist **PICA+** (auch "PicaPlus"). Ein PICA-Datensatz besteht aus einer Liste von **Feldern** (auch "Kategorien"), die jeweils eine Liste von **Unterfeldern** enthalten. Unterfelder werden durch einen alphanumerischen **Unterfeld-Code** identifiziert (`A-Z`, `a-z`, `0-9`) während Feldnummern mindestens aus drei Ziffern und einem Zeichen (`A-Z` oder `@`) bestehen. Die erste Ziffer des Feldes ist 0, 1 oder 2 und gibt die **Ebene** des Feldes an. Zusätzlich können Felder eine numerische **Occurrence** von 00 bis 99 haben. Felder deren erste Ziffer 2 ist haben immer eine Occurrence und als zusätzliche Werte sind 100 bis 999 möglich. Sowohl Felder als auch Unterfelder sind wiederholbar und die Reihenfolge von Unterfeldern und Feldern ist relevant!

Das PICA-Format ist an das noch ältere MARC-Format angelehnt (weitere verwandte Formate sind [MAB] und [allegro]). Als [Datenstrukturierungssprachen](grundlagen?id=strukturierungsformate) lässt sich PICA+ unter den auch außerhalb des Bibliothekswesens relevanten Formaten am ehesten mit dem ebenfalls feldbasierten [INI-Format](http://format.gbv.de/ini) vergleichen. Zur Illustration ein Beispiel: folgender Datensatz enthält zweimal das Feld `012A` mit jeweils unterschiedlichen Unterfeldern.

~~~pica
012A $xHallo$yWelt
012A $yWelt$xHallo
~~~

~~~ini
[012A]
x = Hallo
y = Welt

[012A]
y = Welt
x = Hallo
~~~

*Fiktiver PICA-Datensatz in PICA Plain und als INI-Datei*

Das PICA-Format unterscheidet **drei Ebenen** für bibliographische Daten (Level 0, auch Titel-Ebene oder Titeldatensatz), Lokaldaten (Level 1) und Exemplardaten (Level 2). Dem Titeldatensatz können mehrere Lokaldatensätze untergeordnet sein, welchen wiederum einzelne Exemplardatensätze untergeordnet sind. Die Felder auf Ebene 2 haben immer eine Occurrence, die pro Exemplardatensatz gleich ist. Für die hierarchische Gruppierung eines PICA-Datensatzes in Teildatensätze ist die Reihenfolge der Felder relevant. Abgesehen davon lassen sich die Felder eines Datensatzes (abgesehen von wiederholten Feldern gleicher Feldnummer und Occurrence) automatisch sortieren.

!> PICA-Unterfelder bilden keine einfache [Zuordnungstabelle](https://de.wikipedia.org/wiki/Zuordnungstabelle_(Datenstruktur)) sondern haben eine in der Regel relevante Reihenfolge.

Innerhalb einer PICA-Datenbank ist jeder Datensatz durch seine eindeutige PICA-Produktionsnummer (**PPN**) identifiziert, die auf Ebene 0 in Feld `003@`, Unterfeld `0` steht. Exemplardatensätze enthalten in Feld `203@`, Unterfeldnummer `0` die ebenfalls eindeutige Exemplarproduktionsnummer (**EPN**, auch Exemplar-Identifikationsnummer). Lokaldatensätze haben keine eigenen Identifier sondern sind über Kategorie `101@`, Unterfeld `a` mit der Internal Library Number (**ILN**) einzelnen Bibliotheken zugeordnet. Pro PICA-Datensatz darf jede ILN nur einmal vorkommen. Die Inhalte einer PICA-Datenbank sind durch die Identifier PPN, ILN und Occurrence (auf Ebene 2) hierarchisch gegliedert:

| |in Datenbank|im Datensatz|im Lokaldatensatz|
|--|---|---|--|
|Datensatz-ID|PPN|
|Lokaldatensatz-ID| --- |ILN|
|Exemplardatensatz-ID|EPN| --- |Occurrence|

Die Identifizierung eines Exemplardatensatzes ist also zum einen durch seine EPN möglich und zum anderen durch seine Kombination von PPN, ILN und Exemplar-Occurrence.

Das gesamte Datenmodell von PICA+ kann folgendermaßen angegeben werden:

![PICA-Datenmodell](img/datenmodell.svg)

*Datenmodell von PICA+*

?> Weitere Informationen zu [PICA in der GBV-Formatdatenbank](https://format.gbv.de/pica)

[MAB]: http://format.gbv.de/mab
[allegro]: http://format.gbv.de/allegro

## Pica3

In PICA-Bibliotheksystemen treten PICA-Formate meist als Paar auf:

* PICA+ als internes Datenbankformat zur Speicherung und Indexierung
* Pica3 als diagnostisches Format zur Bearbeitung von Datensätzen bei der Katalogisierung

Pica3 ist im Gegensatz zu PICA+ kein formal standardisiertes Strukturierungsformat sondern Bestandteil der jeweiligen Katalogisierungsregeln. Im Rahmen eines [Anwendungsprofils](#anwendungsprofile) lassen sich beide Formate verlustfrei ineinander umwandeln. Ähnlich wie PICA+ besteht ein Pica3-Datensatz aus Feldern ("Kategorien") und Unterfeldern. Die Feldnummern sind rein numerisch und werden je nach Anwendungsprofil mit drei oder vier Ziffern angegeben. Die Unterfeld-Struktur von Pica3 hängt vom jeweiligen Feld ab. Zur Kennzeichnung von Unterfeldern sind je nach Feld verschiedene Sonderzeichen ("Steuerzeichen") und Zeichenfolgen festgelegt. Häufig kommt es allerdings vor, dass als Sonderzeichen für ein Unterfeld in Pica3 das Dollarzeichen und der entsprechende Unterfeld-Code aus PICA+ verwendet wird, so dass Pica3 und PICA+ (in PICA Plain [Serialisierung](#serialisierungen)) an dieser Stelle übereinstimmen.

### Beispiel {docsify-ignore}

Im K10plus-Katalogisierungsformat entspricht die Pica3-Kategorie [1131](https://swbtools.bsz-bw.de/cgi-bin/k10plushelp.pl?cmd=kat&val=1131&katalog=Standard) dem PICA+-Feld `013D` und enthält die "Art des Inhalts" einer Publikation. Die Angabe erfolgt durch Verweis ("Verknüpfung") auf einen entsprechenden Datensatz in der Gemeinsamen Normdatei (GND). Bei Konferenzschriften können zusätzlich Angaben über Zeit und Ort gemacht werden. Hier ein Beispiel für das Feld einer fiktiven Konferenzschrift in Pica3 und in PICA+

~~~pica3
1131 !826484824!Konferenzschrift ; ID: gnd/1071861417$y2020$zEntenhausen
~~~

~~~pica
013D $9826484824$8Konferenzschrift$y2020$zEntenhausen
~~~

Hier einige der Unterfelder im Vergleich:

| Pica3 | PICA+ | Unterfeld | Besonderheit |
|-------|-------|-----------|--------------|
| *ohne* | `$a`  | Angabe zum Inhalt (Text) | Inhalt steht in Pica3 ohne Steuerzeichen am Anfang |
| `!...!` | `$9` | PPN des verknüpften GND-Datensatz |
| --- | `$8` | Expansion | Inhalt wird automatisch vom Bibliotheksystem aus der Verknüpfung erzeugt |
| `$y` | `$y` | Chronologische Unterteilung |
| `$z` | `$z` | Geografische Unterteilung |

Bei der formalen Beschreibung von Katalogisierungsregeln mittels [Avram] können Pica3-Feldnummern und Unterfeld-Kennzeichen mit angegeben werden. Hier ein (unvollständiges) Schema mit den Feldern aus dem Beispiel:

[Avram]: #avram-schemas

~~~json
{
  "013D": {
    "pica3": "1131",
    "subfields": {
      "a": { "pica3": "" },
      "9": { "pica3": "!...!" },
      "y": { "pica3": "$y" },
      "z": { "pica3": "$z" }
    }
}
~~~

## Serialisierungen

Zur Speicherung und Übertragung können PICA-Daten in verschiedener Form [kodiert bzw. serialisiert](grundlagen?id=kodierungen) werden. Alle PICA-Kodierungen lassen sich verlustfrei ineinander umwandeln, so dass jeweils die für eine Anwendung am einfachsten zu verarbeitende Serialisierung genutzt werden kann. Bei den [Schnittstellen] unAPI, SRU und OAI-PMH kann mit der Anfrage unter PICA-Kodierungen ausgewählt werden.

[Schnittstellen]: schnittstellen

Neben den Binärformaten **[Binäres PICA](https://format.gbv.de/pica/binary)**, **[Normalisiertes PICA](https://format.gbv.de/pica/normalized)** und dem [PICA-Importformat](https://format.gbv.de/pica/import), die direkt in CBS- und LBS-Software verwendet werden, gibt es:

* **[PICA Plain](https://format.gbv.de/pica/plain)** Syntax, die lesbare Darstellung von PICA+
* **[PICA/JSON](https://format.gbv.de/pica/json)** Syntax, eine kompakte Kodierung in JSON
* **[PICA/XML](https://format.gbv.de/pica/xml)** Syntax, eine Kodierung in XML (primäre XML-Kodierung im GBV)
* **[PPXML](https://format.gbv.de/pica/ppxml)** Syntax, eine alternative Kodierung in XML (primäre XML-Kodierung der Deutschen Nationalbibliothek)

PICA Plain ist den internen Binärformaten am nächsten: Datensätze und Felder werden durch Zeilenumbrüche (Bytecode `0A`) getrennt und Unterfelder mit einem Dollar-Zeichen (`$`) eingeleitet. Dollar-Zeichen in Werten lassen sich durch Doppelung (`$$`) kodieren. Das Format ist über einen "versteckten Link" direkt [aus dem OPAC verfügbar](schnittstellen?id=OPAC). Statt dem Dollarzeichen verwendet WinIBW zur Kennzeichnung von Unterfeldern den kleinen Buchstaben F mit Haken (ƒ). PICA/JSON hat den Vorteil dass Felder und Unterfelder bereits maschinenlesbar getrennt sind und dass praktisch alle Programmiersprachen mit JSON umgangen werden können. Die XML-Serialisierungen sind für XML-basierte Anwendungen und Schnittstellen relevant. PPXML weist die Besonderheit auf, dass Titel-, Lokal- und Exemplarebene bereits im Format getrennt sind. Nachfolgend der gleiche Beispieldatensatz in allen sieben Serialisierungen (bei den Binärformaten steht zur besseren Lesbarkeit `[XX]` für ein Byte mit dem hexadezimalen Bytecode `XX`):

#### PICA Plain

~~~pica
003@ $012345X
021A $aEin Buch$hzum Lesen
045B/02 $aSpo 1025$aBID 200
~~~

### Normalisiertes PICA

~~~
003@ [1F]012345X[1E]021A [1F]aEin Buch[1F]hzum Lesen[1E]045B/02 [1F]aSpo 1025[1F]aBID 200[1E]
~~~

### Binäres PICA

~~~
003@ [1F]012345X[1E]021A [1F]aEin Buch[1F]hzum Lesen[1E]045B/02 [1F]aSpo 1025[1F]aBID 200[1E][1D]
~~~

_Nach dem Datensatz folgt kein Zeilenumbruch!_

### PICA-Importformat

~~~
[1D]
[1E]003@ [1F]012345X
[1E]021A [1F]aEin Buch[1F]hzum Lesen
[1E]045B/02 [1F]aSpo 1025[1F]aBID 200
~~~

#### PICA/JSON

~~~json
[
  [ "003@", null, "0", "12345X" ],
  [ "021A", null, "a", "Ein Buch", "h", "zum Lesen" ],
  [ "045B", "02", "a", "Spo 1025", "a", "BID 200" ]
]
~~~

#### PICA/XML

~~~xml
<record xmlns="info:srw/schema/5/picaXML-v1.0">
  <datafield tag="003@">
    <subfield code="0">12345X</subfield>
  </datafield>
  <datafield tag="021A">
    <subfield code="a">Ein Buch</subfield>
    <subfield code="h">zum Lesen</subfield>
  </datafield>
  <datafield tag="045B" occurrence="02">
    <subfield code="a">Spo 1025</subfield>
    <subfield code="a">BID 200</subfield>
  </datafield>
</record>
~~~

#### PPXML

~~~xml
<record xmlns="http://www.oclcpica.org/xmlns/ppxml-1.0">
  <global opacflag="" status="">
    <tag id="003@" occ="">
      <subf id="0">12345X</subf>
    </tag>
    <tag id="021A" occ="">
      <subf id="a">Ein Buch</subf>
      <subf id="h">zum Lesen</subf>
    </tag>
    <tag id="045B" occ="2">
      <subf id="a">Spo 1025</subf>
      <subf id="a">BID 200</subf>
    </tag>
  </global>
</record>
~~~

?> Weitere Informationen zu [PICA-Serialisierungen in der GBV-Formatdatenbank](https://format.gbv.de/pica)

?> Zur [Konvertierung zwischen PICA-Serialisierungen mit `picadata`](verarbeitung?id=konvertierung-zwischen-pica-serialisierungen)

## Abfragesprache

**PICA Path Expressions** ist eine Abfragesprache um in formaler Syntax auf Elemente eines PICA-Datensatz zu verweisen. Eine offizielle Spezifikation existiert noch nicht. Eine Abfrage besteht aus folgenden Teilen:

* Eine Feldnummer bestehend aus drei Ziffern (die erste `0`, `1` oder `2`), gefolgt von einem Großbuchstaben oder `@`. An jeder der vier Stellen der Feldnummer kann auch ein Punkt `.` als Platzhalter verwenden werden. Beispiele: `003@`, `1..A`, `2...`

* Optional eine Occurrence bestehend aus zwei oder drei Ziffern. Zur Angabe mehrerer Occurrences ist auch hier der Punkt als Platzhalter erlaubt, alternativ kann ein Bereich angegeben werden (zum Beispiel `00-12`). Je nach Anwendung wird die Occurrence in eckigen Klammern (zum Beispiel `[12]`, `[0.]`, `[102]`) oder nach einem Slash (zum Beispiel `/12`, `/0.`, `/102`) geschrieben.

* Optional eine Liste von Unterfeld-Codes (`A-Z`, `a-z`, `0-9`). Die Liste wird mit einem Dollar-Zeichen (`$`) eingeleitet. Beispiele: `$0`, `$axy`.

Die Syntax der Abfragesprache ist eine Teilmenge von [MARCspec](http://marcspec.github.io/MARCspec/marc-spec.html), einer umfrangreicheren Sprache zur Referenzierung von Teilen aus MARC-Datensätzen.

Neben PICA Path Expressions ist die Contextual Query Language (CQL) zur Abfrage von Datensätzen mittels [SRU](schnittstellen?id=sru) relevant. CQL referenziert allerdings nicht Elemente des PICA-Formats sondern basiert auf Feldern eines Suchindex, der aus unterschiedlichen Inhalten aufgebaut sein kann.

## Änderungsformat

Ab CBS-Version 8 beherrscht die zentrale PICA-Datenbank Datensatz-Versionen. Änderungen an Datensätzen lassen sich durch Vergleich von Versionen im **title-revision format** anzeigen. Das Format entspricht im Wesentlichen der PICA Plain [Serialisierung](#serialisierungen) mit dem Unterschied dass einzelne Felder durch vorangestelltes `+` oder `-` als hinzugefügt oder entfernt markiert werden. Eine Verallgemeinerung ist das **Annotated PICA** Format. Dabei wird jedem Feld ein **Markierungszeichen** und ein weiteres Leerzeichen vorangestellt. Um Missverständnissen vorzubeugen sind als Markierungszeichen keine Buchstaben oder Ziffern erlaubt. Das Änderungsformat **PICA Patch** ergibt sich durch Wahl der Markierungszeichen `+` und `-`. Weitere Anwendungsmöglichkeiten sind die Markierung unbekannter oder fehlerhafter Felder mit `?` oder `!`.

*Beispiel einer Änderung an Feld `021A`, Unterfeld `$a`*

~~~pica
- 021A $aEin Buch$hzum Lesen
+ 021A $aEin gutes Buch$hzum Lesen und Genießen
~~~

Als Erweiterung der PICA/JSON Serialisierung können Markierungszeichen als letztes Array-Element eines Feldes angefügt werden. Da die Anzahl der Elemente eines Feldes in PICA/JSON normalerweise gerade ist, kann das Markierungszeichen nicht mit anderen Bestandteilen der PICA-Struktur verwechselt werden.

~~~json
[
  [ "021A", null, "a", "Ein Buch", "h", "zum Lesen", "-" ],
  [ "021A", null, "a", "Ein gutes Buch", "h", "zum Lesen und Genießen", "+" ]
]
~~~

Zur Erzeugung von Änderungsdatensätzen siehe auch der Abschnitt zur [Bearbeitung von PICA-Daten](bearbeitung).

## Anwendungsprofile

Die Bedeutung einzelner PICA-Felder und Unterfeld-Strukturen ist nicht universell sondern durch die jeweiligen **Katalogisierungsregeln** einer Datenbank festgelegt. Die Katalogisierungsregeln sind Teil eines [Standard](grundlagen?id=standards-und-profile) welche Felder mit welcher Bedeutung auftreten können oder sollen. Ein Beispiel für einen solchen Standard ist die [K10plus Format-Dokumentation](https://wiki.k10plus.de/display/K10PLUS/K10plus+Format-Dokumentation) für die K10plus-Datenbank. Die Dokumentation enthält als semi-formalen Teil eine Tabelle aller PICA-Felder und Unterfelder mit Angaben über Reihenfolge, Wiederholbarkeit etc. Die Regeln sind allerdings eher als Empfehlungen zu betrachten, da nicht alle ihre Aspekte bei der Eingabe kontrolliert werden. Innerhalb einer Datenbank kann es auch vorkommen, dass unterschiedliche Datensätze verschiedenen Anwendungsprofilen entsprechen, weil bei Formatänderungen nicht automatisch alle Altdaten angepasst wurden. Für die Verarbeitung von Informationen aus PICA-Anwendungsprofilen eignen sich Avram-Schemas.

Die Regeln eines PICA-Standards können auch Angaben zu erlaubten Werten und weiterer Strukturierung *innerhalb* von Unterfeldern beinhalten. Ein Beispiel für Letzteres ist das "Nichtsortierzeichen" `@`. Das **Nichtsortierzeichen** gibt als Steuerzeichen an, dass der Inhalt des Feldes vor dem Sortierzeichen für die [Indexierung](schnittstellen?id=sru) ignoriert werden soll. Nach dem ersten Vorkommen des Nichtsortierzeichens hat das Zeichen keine besondere Bedeutung mehr, es kann also auch als normales Zeichen vorkommen.

## Avram-Schemas

Avram ist eine [Schemasprache](grundlagen?id=abfrage-und-schemaformate) für feldbasierte Formate wie MARC, PICA, MAB und allegro. Ein Avram-Schema legt beispielsweise fest welche PICA-Felder und -Unterfelder in einem Datensatz vorkommen können oder müssen und welche Felder und Unterfelder wiederholbar sind. Avram-Schemas für PICA-Daten können verwendet werden um Informationen zur Definition von Feldern anzuzeigen und um PICA-Daten gegen das Schema zu validieren. Ein Beispiel für die Verwendung von Avram-Schemas ist der [PicaEditor](verarbeitung?id=picaeditor). Für verschiedene im GBV verwendeten PICA-Formate werden Avram-Schemas per [Avram-API](schnittstellen?id=avram-api) bereitgestellt.

?> [Avram-Spezifikation in der GBV-Formatdatenbank](http://format.gbv.de/schema/avram/specification)

[](avram004A.json ':include :type=code json')

*Beispiel für ein Avram-Schema mit Definition des K10plus-Feldes für die ISBN*

## Zusammenfassung

Das PICA-Format in seiner allgemeinen Form PICA+ ist Datenstrukturierungssprache bestehend aus Feldern und Unterfeldern. Beide sind wiederholbar und die Reihenfolgen ist mitunter relevant. Jeder Datensatz lässt sich darüber hinaus hierarchisch in Teildatensätze dreier Ebenen aufteilen. Je nach Ebene gibt es die Identifikatoren PPN, ILN und EPN. Die Bedeutung der weiteren Felder hängt von den jeweiligen Katalogisierungsregeln ab, die sich in Avram-Schemas als Anwendungsprofile formalisieren lassen. Für die Katalogisierung wird zwischen PICA+ und Pica3 konvertiert. Zur Speicherung und zum Austausch von PICA-Daten gibt es verschiedene Serialisierungen (PICA Plain, PICA/XML, PICA/JSON...) und für den Zugriff auf einzelne Elemente die Abfragesprache PICA Path Expressions. Mit dem PICA-Änderungsformat lassen sich Unterschiede zwischen PICA-Datensätzen angeben.
