# Grundlagen

Das **PICA-Format** ist das interne Datenbankformat der Katalogsysteme CBS (zentrale Bibliothekssystem) und LBS (lokales Bibliotheksystem). Dieses Kapitel gibt eine kurze Einführung in das Format.

## Motivation

Das PICA-Format ist seit mehr als 30 Jahren im Einsatz und konnte bisher nicht durch modernere Techniken wie relationale Datenbanksysteme oder Wissensgraphen ersetzt werden. Da PICA einerseits zentral für die Datenhaltung in der Mehrzahl von deutschen Bibliotheken ist, andererseits aber nicht außerhalb des Bibliothekswesens benutzt wird, ist Dokumentation notwendig um sich mit der Verarbeitung von PICA-Daten vertraut zu machen. Das vorliegende Skript soll dazu beitragen.

## Hintergrund

Das PICA-Format geht auf eine 1969 begonnene Kooperation der Königlichen Bibliothek Den Haag und niederländischen Universitätsbibliotheken zur gemeinsamen Computergestützen Katalogisierung zurück (PICA = Project for Integrated Catalogue Automation). Die erste zentrale Katalogdatenbank (CBS) wurde 1978 auf einer [PDP 11] in Betrieb genommen. Einen historischen Einblick gibt der [Bericht zum PICA-System] aus dem Jahr 1990, auf dessen Grundlage CBS und LBS in Deutschland eingeführt wurden. Die PICA-Katalogdaten wurde nicht wie heute üblich in einem Datenbankmanagementsystem (DBMS) sondern in dem eigens entwickelten Datenbankformat **PICA+** verwaltet. Das Format ist an das noch ältere MARC-Format (1966) angelehnt. In den 2000er Jahren ging die Entwicklung der PICA-Systeme von der PICA-Stiftung an [OCLC PICA] bzw. OCLC über.

[PDP 11]: https://de.wikipedia.org/wiki/PDP-11
[Bericht zum PICA-System]: https://doi.org/10.1515/bfup.1992.16.3.307
[OCLC PICA]: https://de.wikipedia.org/wiki/OCLC_PICA

~~~
3101 Karl@Gabriel
3102 Paul Ludwig@Sauer
4000 @Sinnfragen sozialer Arbeit : Erfahrungen und Entwürfe /Hrsg. von $3101, $3102 und Willi Vieth
~~~
*Beispiel für einen PICA2-Datensatz (aus Becker et al. 1992)*

## PICA-Format

* Zur Ein- und Ausgabe wird PICA+ in das bzw. aus dem PICA3-Format (früher: PICA2) übersetzt.
* Struktur aus Feldern und Unterfeldern
* Drei Ebenen sowie PPN
* Eher eine Datenstrukturierungssprache, da Semantik Anwendungsspezifisch

Weitere Informationen:

* [PICA in der GBV-Formatdatenbank](https://format.gbv.de/pica)

