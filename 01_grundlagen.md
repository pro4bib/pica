# Grundlagen

Das **PICA-Format** ist das interne Datenbankformat der Katalogsysteme CBS (Zentrale Bibliothekssystem) und LBS (Lokales Bibliotheksystem). Dieses Kapitel gibt eine kurze Einführung in [Datenformate im Allgemeinen](#datenformate) und das [PICA-Format im Speziellen](#pica-format) im Speziellen.

## Hintergrund

Das PICA-Format geht auf eine 1969 begonnene Kooperation der Königlichen Bibliothek Den Haag und niederländischen Universitätsbibliotheken zur gemeinsamen Computergestützen Katalogisierung zurück (PICA = Project for Integrated Catalogue Automation). Die erste zentrale Katalogdatenbank (CBS) wurde 1978 auf einer [PDP 11] in Betrieb genommen. Einen historischen Einblick gibt der [Bericht zum PICA-System], auf dessen Grundlage CBS und LBS in den 1990ern in Deutschland eingeführt wurden. In den 2000er Jahren ging die Entwicklung der PICA-Systeme von der PICA-Stiftung an [OCLC PICA] bzw. OCLC über.

Das PICA-Format ist an das noch ältere MARC-Format (1966) angelehnt. Viele Eigenheiten beider Formate lassen sich durch die damaligen Anforderungen erklären: es musste sehr auf geringen Speicherbedarf und effiziente Verarbeitung geachtet werden, die Daten wurden nicht wie heute üblich in einem Datenbankmanagementsystem (DBMS) verwaltet sondern direkt verarbeitet und nicht zuletzt lag der Einsatzzweck dieser Formate nicht in der Erstellung eines elektronischen Retrievalsystems sondern in der Erstellung von Katalogkarten! Aus diesem Grund gibt es schon seit den den frühen 2000ern Stimmen, die Formate durch modernere Alternativen zu ersetzen. Angesichts des Aufwands, bestehende Bibliothekssysteme anpassen oder ersetzen zu müssen, ist ein baldiges Ende jedoch noch nicht abzusehen.

[PDP 11]: https://de.wikipedia.org/wiki/PDP-11
[Bericht zum PICA-System]: https://doi.org/10.1515/bfup.1992.16.3.307
[OCLC PICA]: https://de.wikipedia.org/wiki/OCLC_PICA

~~~
3101 Karl@Gabriel
3102 Paul Ludwig@Sauer
4000 @Sinnfragen sozialer Arbeit : Erfahrungen und Entwürfe /Hrsg. von $3101, $3102 und Willi Vieth
~~~
*Beispiel für einen PICA2-Datensatz (aus Becker et al. 1992)*

## Datenformate

Das PICA-Format ist ein Datenformat, doch was ist überhaupt ein Datenformat? Ein Datenformat ist eine Konvention zur Strukturierung digitaler Objekte (Datensätze). So legen beispielsweise CSV-Formate die Struktur einer Tabelle aus Zeilen und Spalten fest. Letzendlich dienen alle Datenformate dazu, Daten in Bestandteile zu zerlegen, denen Bedeutung zugewiesen werden kann. Bei CSV besteht die Bedeutung von einzelnen Datenelementen beispielsweise aus "Zeile", "Spalte", "Trennzeichen" und "Zelle". Datenformat deren Elemente solche eher abstrakten Bedeutungen haben, werden auch [Strukturierungsformate] genannt. Davon zu unterscheiden sind [Anwendungsformate], [Kodierungen] und [Datenmodelle].

[Strukturierungsformate]: #strukturierungsformate
[Anwendungsformate]: #anwendungsformate
[Kodierungen]: #kodierungen
[Datenmodelle]: #datenmodelle

### Strukturierungsformate

**(Daten)strukturierungsformate** oder **-sprachen** ermöglichen es Daten in abstrakte Einheiten zu unterteilen und miteinander in Beziehung zu setzen. Dabei lassen sich einige allgemeine Ordnungsprinzipien festmachen, die je nach Strukturierungsformat mehr oder weniger gut unterstützt werden.

| Ordnungsprinzip | Beispiele für Strukturierungsformate |
| --------------- | ------------------------------------- |
| Liste | Zeichenkette, Unicode, Bytes |
| Tabelle | CSV |
| Felder | PICA, MARC, INI |
| Hierachie/Dokument | JSON, XML |
| Graph/Netzwerk | RDF |

Auch das PICA-Format ist ein Datenstrukturierungsformat. Das heißt konkrete Bedeutungen wie "Vorname" und "Erscheinungsjahr" kennt das PICA-Format in seiner allgemeinen Form nicht!

### Anwendungsformate

In der Praxis interessieren uns an Daten weniger abstrakte Strukturen als konkrete Inhalte und Bedeutungen (Semantik). Die Elemente von **Anwendungsformaten** beziehen sich meist auf Objekte und Eigenschaften wie zum Beispiel Personen, Namen, Publikationen und Ereignisse. Da Bedeutung immer vom Kontext abhängt gibt es keine universellen Anwendungsformate sondern viele verschiedenen Formate für unterschiedliche Anwendungsfälle. Für Bibliotheken sind vor allem bibliographische Datenformate und Normdatenformate von relevant; für beide fälle gibt es Anwendungsformate auf Basis des PICA-Format.

Da die Anwendung nicht Teil der Daten ist: weichen Theorie und Praxis hier voneinander

Oft weichen Formate durch Interpretationen voneinander ab.

* Was der Standard sagt
* Wie der Standard interpretiert wird
* Was ein technisches System daraus macht

!> ...Hier auch: Anwendungsprofile


### Schema- und Abfrageformate

Eine besondere Klasse von Anwendungsformaten bezieht sich mit der Bedeutung ihrer Elemente nicht auf normale Phänomene sondern wiederum auf Datenformate und ihre Strukturen. Im weitesten Sinne können auch Programmiersprachen zu dieser Klasse gezählt werden.

!> ...

### Kodierungen

Letzendlich müssen alle Daten als Folge von Bits bzw. Bytes ausgedrückt werden. Eine **Kodierung**, **Serialisierung** oder **Syntax** legt fest, wie Datensätze eines Datenformates oder -Modells durch Elemente eines anderen Datenformates ausgedrückt werden können. Meist werden [Anwendungsformate] in [Strukturierungsformaten](#strukturierungsformat) kodiert, die sich wiederum über mehrere Ebenen auf Bytes zurückführen lassen. Direkt in Bytes kodierte Datenformate werden auch **Binärformate** genannt.

Während Computer nur mit Kodierungen arbeiten, interessiert Menschen eigentlich nur was mit Kodierungen ausgedrückt wird. In der Praxis wird deshalb nicht immer genau zwischen einem Datenformat und seiner Kodierung unterschieden. So liegt beispielsweise XML in der Regel in XML-Syntax vor, also wird beides als XML bezeichnet. Bei der Verarbeitung von Daten ist jedoch genau darauf zu achten, auch welcher Kodierungsebene jeweils angesetzt wird.

```mermaid
graph LR
  PICA -- PICA/XML --> XML -- XML-Syntax --> Unicode -- UTF-8 --> Bytes
```

?> Weitere [Kodierungen in der GBV-Formatdatenbank](https://format.gbv.de/code)

### Datenmodelle

!> ...

### Weitere Arten von Datenformaten

Datenformate lassen sich auch nach anderen Kriterien unterteilen, unter Anderem:

* **Prorietäre Formate** und **Offene Formate**
* **Internformate** und **Austauschformate**
* **Metadatenformate** und **Dokumentformate**

## PICA-Format

!> ...

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

?> Weitere Informationen zu [PICA in der GBV-Formatdatenbank](https://format.gbv.de/pica)


