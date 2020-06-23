# PICA-Formate

Beim PICA-Format handelt es sich genaugenommen um eine Reihe aufeinander aufbauende Strukturierungsformate, Kodierungen und Anwendungsprofile. Im Zweifelsfall ist in diesem Skript das **PICA+** Format gemeint, auf dem alle anderen PICA-Formate aufbauen:

* Zunächst werden der [grundsätzliche Aufbau](#grundsätzlicher-aufbau) und mögliche [PICA-Serialisierungen](#serialisierungen) vorgestellt.

* Zum Zugriff auf einzelne Elemente von PICA-Datensätze gibt es die [Abfragesprache PICA Path Expressions](#abfragesprache) und zum Vergleich von Datensätzen ein [Änderungsformat](#Änderungsformat).

* Konkrete Anwendungsformate von PICA werden als [Anwendungsprofilen](#anwendungsprofilen) durch semi-formale Katalogisierungsrichtlinien oder mittels formaler [Avram-Schemas](#avram-schemas) festgelegt.

## Grundsätzlicher Aufbau

!> Hier bisher nur Notizen!

Die PICA-basierten Bibliotheksysteme verwalten ihre Daten in PICA+ ("PicaPlus").

 PICA-Daten werden nicht direkt in einem Datenbankmanagementsystem (DBMS) sondern in dem eigens entwickelten Datenbankformat **PICA+** ("PicaPlus") verwaltet.

* Zur Ein- und Ausgabe wird PICA+ in das bzw. aus dem PICA3-Format übersetzt (auch: "diagnostisches Format")

Selbst Mitarbeiter*innen der meisten Bibliotheken bekommen daher das PICA+ Format selten zu Gesicht.

Im Gegensatz zu PICA+ ist Pica3 jedoch kein formal standardisiertes Format

* Struktur aus Feldern und Unterfeldern
* Drei Ebenen sowie PPN, ILN und EPN
* Eher eine Datenstrukturierungssprache, da Semantik Anwendungsspezifisch


Das PICA-Format unterscheidet drei Ebenen für bibliographische Daten (Level 0), Lokaldaten (Level 1) und Exemplardaten (Level 2). 

Das Datenmodell von PICA+ lässt sich daher auf zwei Arten angeben:

~~~mermaid
classDiagram

Datensatz *-- "0..n" Lokalsatz
Lokalsatz *-- "0..n" Exemplarsatz

Datensatz o-- "1..n" Feld : Level 0
Lokalsatz o-- "1..n" Feld : Level 1
Exemplarsatz o-- "1..n" Feld : Level 2

class Datensatz {
  PPN
}

class Lokalsatz {
  ILN
}

class Exemplarsatz {
  EPN
}

Feld *-- "1..n" Unterfeld

class Feld {
  Nummer: [0-9][0-9][0-9][A-Z@]
  Occurrence: 0...999
}

class Unterfeld {
  Code: [a-zA-Z0-9]
  Inhalt: String
}
~~~

*Datenmodell von PICA+*

?> ⮕  Weitere Informationen zu [PICA in der GBV-Formatdatenbank](https://format.gbv.de/pica)

## Serialisierungen

Zur Speicherung und Übertragung können PICA-Daten in verschiedener Form [kodiert bzw. serialisiert](grundlagen?id=kodierungen) werden. Alle PICA-Kodierungen lassen sich verlustfrei ineinander umwandeln, so dass jeweils die für eine Anwendung am einfachsten zu verarbeitende Serialisierung genutzt werden kann. Bei den [Schnittstellen] unAPI, SRU und OAI-PMH kann mit der Anfrage unter PICA-Kodierungen ausgewählt werden.

[Schnittstellen]: schnittstellen

Neben den Binärformaten **Binäres PICA** und **Normalisiertes PICA**, die direkt in CBS- und LBS-Software verwendet werden, gibt es: 

* **PICA Plain**, die lesbare Darstellung von PICA+
* **PICA/JSON**, eine kompakte Kodierung in JSON
* **PICA/XML**, eine Kodierung in XML (primäre XML-Kodierung im GBV)
* **PPXML**, eine alternative Kodierung in XML (primäre XML-Kodierung der Deutschen Nationalbibliothek)

PICA Plain ist den internen Binärformaten am nächsten: Datensätze und Felder werden durch Zeilenumbrüche (Bytecode `0A`) getrennt und Unterfelder mit einem Dollar-Zeichen (`$`) eingeleitet. Dollar-Zeichen in Werten lassen sich durch Doppelung (`$$`) kodieren. Das Format ist über einen "versteckten Link" direkt [aus dem OPAC verfügbar](schnittstellen?id=OPAC). Statt dem Dollarzeichen verwendet WinIBW zur Kennzeichnung von Unterfeldern den kleinen Buchstaben F mit Haken (ƒ). PICA/JSON hat den Vorteil dass Felder und Unterfelder bereits maschinenlesbar getrennt sind und dass praktisch alle Programmiersprachen mit JSON umgehen können. Die XML-Serialisierungen sind für XML-basierte Anwendungen und Schnittstellen relevant. PPXML weist die Besonderheit auf, dass Titel-, Lokal- und Exemplarebene bereits im Format getrennt sind. Nachfolgend der gleiche Datensatz in allen vier Serialisierungen:

~~~pica
003@ $012345X
021A $aEin Buch$hzum Lesen
~~~

*Beispiel für PICA Plain*

~~~json
[
  [ "003@", null, "0", "12345X" ],
  [ "021A", null, "a", "Ein Buch", "h", "zum Lesen" ]
]
~~~

*Beispiel für PICA/JSON*

~~~xml
<record xmlns="info:srw/schema/5/picaXML-v1.0">
  <datafield tag="003@">
    <subfield code="0">12345X</subfield>
  </datafield>
  <datafield tag="021A">
    <subfield code="a">Ein Buch</subfield>
    <subfield code="h">zum Lesen</subfield>
  </datafield>
</record>
~~~

*Beispiel für PICA/XML*

~~~xml
<record xmlns="http://www.oclcpica.org/xmlns/ppxml-1.0">
  <global opacflag="" status="">
    <tag id="003@" occ="">
      <subf id="0">12345X</ppxml:subf>
    </tag>
    <tag id="021A" occ="">
      <subf id="a">Ein Buch</ppxml:subf>
      <subf id="h">zum Lesen</ppxml:subf>
    </tag>
  </global>
</record>
~~~

*Beispiel für PPXML*

?> ⮕  Weitere Informationen zu [PICA-Serialisierungen in der GBV-Formatdatenbank](https://format.gbv.de/pica)

## Abfragesprache

**PICA Path Expressions** ist eine Abfragesprache um in formaler Syntax auf Elemente eines PICA-Datensatz zu verweisen. Eine offizielle Spezifikation existiert noch nicht. Eine Abfrage besteht aus folgenden Teilen:

!> Hier fehlen noch die Übersetzung und vor allem Beispiele

* A tag, consisting of three digits, the first `0` to `2`, followed by a digit or `@`. The character `.` can be used as wildcard.
* An optional occurrence, given by two or three digits (or . as wildcard) in brackets, e.g. `[12]`, `[0.]` or `[102]`.
* An optional list of subfields. Allowed subfield codes include `_A-Za-z0-9`. The list of subfields is preceded by `$`
* An optional position, preceded by `/`. Both single characters (e.g. `/0` for the first), and character ranges (such as `2-4`, `-3`, `2-`...) are supported.

Die Syntax der Abfragesprache ist eine Teilmenge von [MARCspec](http://marcspec.github.io/MARCspec/marc-spec.html), einer umfrangreicheren Sprache zur Referenzierung von Teilen aus MARC-Datensätzen.

Neben PICA Path Expressions ist die Contextual Query Language (CQL) zur Abfrage von Datensätzen mittels [SRU](schnittstellen?id=sru) relevant. Mit CQL wird allerdings nicht direkt auf das PICA-Format sondern auf einen Suchindex verwiesen.

## Änderungsformat

Ab CBS-Version 8 beherrscht die zentrale PICA-Datenbank Datensatz-Versionen. Änderungen an Datensätzen lassen sich durch Vergleich von Versionen im **title-revision format** anzeigen. Das Format entspricht im Wesentlichen der PICA Plain [Serialisierung](#serialisierungen) mit dem Unterschied dass einzelne Felder durch vorangestelltes `+` oder `-` als hinzugefügt oder entfernt markiert werden.

~~~pica
- 021A $aEin Buch$hzum Lesen
+ 021A $aEin gutes Buch$hzum Lesen
~~~

## Anwendungsprofile

Welche PICA-Felder in einer Datenbank welche Bedeutung haben, wird durch **Katalogisierungsrichtlinien** festgelegt.

...


## Avram-Schemas

Avram ist eine [Schemasprache](grundlagen?id=abfrage-und-schemaformate) für feldbasierte Formate wie MARC, PICA, MAB und allegro. Ein Avram-Schema legt fest welche PICA-Felder und -Unterfelder in einem Datensatz vorkommen können oder müssen, ob sie wiederholbar sind etc.

?> ⮕  [Avram-Spezifikation in der GBV-Formatdatenbank](http://format.gbv.de/schema/avram/specification)

~~~json
{
  "fields": {
    "004A": {
      "tag": "004A",
      "pica3": "2000",
      "label": "ISBN",
      "url": "https://swbtools.bsz-bw.de/cgi-bin/k10plushelp.pl?cmd=kat&val=2000&katalog=Standard",
      "repeatable": true,
      "modified": "2019-12-18 09:53:31",
      "subfields": {
        "0": {
          "code": "0",
          "pica3": "",
          "label": "ISBN",
          "repeatable": false,
          "modified": "2019-11-28 14:27:12",
          "position": 1
        },
        "f": {
          "code": "f",
          "pica3": "$f",
          "label": "Kommentar zur ISBN, Einbandart, Lieferbedingungen und/oder Preis",
          "repeatable": false,
          "modified": "2019-12-17 15:03:31",
          "position": 2
        }
      }
    }
  }
}
~~~

*Beispiel für ein Avram-Schema mit Definition des K10plus-Feldes für die ISBN*

