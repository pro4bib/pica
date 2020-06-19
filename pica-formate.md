# PICA-Formate

!> Hier bisher nur Notizen!

## Grundsätzlicher Aufbau

Die PICA-Katalogdaten wurde nicht wie heute üblich in einem Datenbankmanagementsystem (DBMS) sondern in dem eigens entwickelten Datenbankformat **PICA+** verwaltet.

* Zur Ein- und Ausgabe wird PICA+ in das bzw. aus dem PICA3-Format (früher: PICA2) übersetzt.

Selbst Mitarbeiter*innen der meisten Bibliotheken bekommen daher das PICA+ Format selten zu Gesicht.

Im Gegensatz zu PICA+ ist Pica3 jedoch kein formal standardisiertes Format

PicaPlus, "diagnostisches Format"

* Struktur aus Feldern und Unterfeldern
* Drei Ebenen sowie PPN
* Eher eine Datenstrukturierungssprache, da Semantik Anwendungsspezifisch


Das PICA-Format unterscheidet drei Ebenen für bibliographische Daten (Level 0), Lokaldaten (Level 1) und Exemplardaten (Level 2).

Das Datenmodell von PICA+ lässt sich daher auf zwei Arten angeben:

~~~mermaid
classDiagram

Datensatz *-- "0..n" Titel
Titel *-- "0..n" Exemplar

Datensatz o-- "1..n" Feld : Level 0
Titel o-- "1..n" Feld : Level 1
Exemplar o-- "1..n" Feld : Level 2

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

...

## Abfragesprachen

PICA Path Expressions, CQL...

## Anwendungsprofile

Katalogisierungsrichtlinien...

## Schemasprache

...

## Verwandte Datenformate

...
