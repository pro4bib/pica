# Einführung in die Verarbeitung von PICA-Daten

Dieses Skript bietet eine kurze Einführung in die Verarbeitung von Daten im und aus dem **PICA-Format**.

## Motivation

Das PICA-Format ist seit mehr als 30 Jahren im Einsatz und konnte bisher nicht durch modernere Techniken wie relationale Datenbanksysteme oder Wissensgraphen ersetzt werden. Da PICA einerseits zentral für die Datenhaltung in der Mehrzahl von deutschen Bibliotheken ist, andererseits aber nicht außerhalb des Bibliothekswesens benutzt wird, ist Dokumentation notwendig um sich mit der Verarbeitung von PICA-Daten vertraut zu machen. Das vorliegende Skript soll dazu beitragen. Schwerpunkt ist die Verarbeitung von PICA-Daten unabhängig von den PICA-Systemen wie CBS, LBS und WinIBW.

## Inhalt

1. [Grundlagen](01_grundlagen.md)
   - Geschichtlicher Hintergrund
   - Aufbau des PICA-Formats
   - Arten von Datenformaten
2. Format-Details
   - Serialisierungen
   - Verwandte Datenformate
   - Konvertierung
   - Katalogisierungsrichtlinien
3. Auswertung
   - PICA Path
   - Catmandu
   - ...
4. Schnittstellen
   - Zugriff auf PICA-Daten (OPAC, WinIBW, SRU, unAPI...)
5. Alternativen
   - MARC, RDF, JSON...

## Literatur

* Becker et. al (1992): *Das PICA-System. Bericht über die im Auftrag des Niedersächsischen Ministeriums für Wissenschaft und Kunst durchgeführte Funktionsprüfung (Stand Mitte 1990).* In: Bibliothek Forschung und Praxis, Band 16, Heft 3. <https://doi.org/10.1515/bfup.1992.16.3.307>
* Eversberg (1999): *Was sind und was sollen Bibliothekarische Datenformate* <http://www.allegro-c.de/formate/formate.htm>
* Klute (2018): *ETL-Prozesse für bibliothekarische Metadaten: Die Migration lokaler Katalogisate im GBV.* <https://doi.org/10.15771/MA_2018_3>

## Über dieses Skript

### Veröffentlichung

Der Quelltext dieses Skript wird in Markdown-Syntax geschrieben und in einem git-Repository verwaltet. Kommentare, Korrekturen und Änderungen können [direkt bei GitHub](https://github.com/pro4bib/pica) angemeldet werden.

Die jeweils aktuelle HTML-Version steht unter <https://pro4bib.github.io/pica/> zur Verfügung. Eine Druckversion ist angedacht.

### Danksagung

Die Technische Infrastruktur für die Bereitstellung dieses Skripts wurde von [Felix Lohmeier](https://felixlohmeier.de/) abgeschaut, der übrigens auch weitere interessante Einführungen in Themen der Datenverarbeitung für Bibliotheks- und Kultureinrichtungen anbietet.

### Lizenz

Dieses Werk ist lizenziert unter einer [Creative Commons Namensnennung 4.0 International Lizenz](http://creativecommons.org/licenses/by/4.0/)

[![Creative Commons Lizenzvertrag](https://i.creativecommons.org/l/by/4.0/88x31.png)](http://creativecommons.org/licenses/by/4.0/)
