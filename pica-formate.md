# PICA-Formate

Beim PICA-Format handelt es sich genaugenommen um eine Reihe aufeinander aufbauende Strukturierungsformate, Kodierungen und Anwendungsprofile. Im Zweifelsfall ist in diesem Skript das **PICA+** Format gemeint, auf dem alle anderen PICA-Formate aufbauen. Im Folgenden werden zunächst der [grundsätzliche Aufbau](#grundsätzlicher-aufbau) und mögliche [PICA-Serialisierungen](#serialisierungen) vorgestellt.

...


## Grundsätzlicher Aufbau

!> Hier bisher nur Notizen!

Die PICA-Basierten Bibliotheksysteme PICA-Daten werden nicht direkt in einem Datenbankmanagementsystem (DBMS) sondern in dem eigens entwickelten Datenbankformat **PICA+** ("PicaPlus") verwaltet.

* Zur Ein- und Ausgabe wird PICA+ in das bzw. aus dem PICA3-Format (früher: PICA2) übersetzt (auch: "diagnostisches Format")

Selbst Mitarbeiter*innen der meisten Bibliotheken bekommen daher das PICA+ Format selten zu Gesicht.

Im Gegensatz zu PICA+ ist Pica3 jedoch kein formal standardisiertes Format

PicaPlus, "diagnostisches Format"

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

**PICA Path Expressions** ist eine Abfragesprache um in formaler Syntax auf Elemente eines PICA-Datensatz zu verweisen. Eine offizielle Spezifikation existiert noch nicht. Ein Ausdruck der Abfragesprache besteht aus folgenden Teilen:

!> Hier fehlen noch die Übersetzung und vor allem Beispiele

* A tag, consisting of three digits, the first `0` to `2`, followed by a digit or `@`. The character `.` can be used as wildcard.
* An optional occurrence, given by two or three digits (or . as wildcard) in brackets, e.g. `[12]`, `[0.]` or `[102]`.
* An optional list of subfields. Allowed subfield codes include `_A-Za-z0-9`.
* An optional position, preceded by `/`. Both single characters (e.g. `/0` for the first), and character ranges (such as `2-4`, `-3`, `2-`...) are supported.

Neben PICA Path Expressions ist die Contextual Query Language (CQL) zur Abfrage von Datensätzen mittels [SRU](schnittstellen?id=sru) relevant. Mit CQL wird allerdings nicht direkt auf das PICA-Format sondern auf einen Suchindex verwiesen.

## Anwendungsprofile

Katalogisierungsrichtlinien...

## Avram-Schemas

...

