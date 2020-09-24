# Einführung in die Verarbeitung von PICA-Daten

Dieses Handbuch bietet eine Einführung in die Verarbeitung von Daten in, aus und zwischen **PICA-Formaten**.

*Jakob Voß (Verbundzentrale des GBV), 2020- ([siehe Änderungshistorie](https://github.com/pro4bib/pica/commits/master)*)

## Vorwort

> During a relatively long period of research, an advanced format was developed for the storage of bibliographic information; the PICA format. — Look Costers (1979)

Das PICA-Format ist seit mehr als 40 Jahren im Einsatz und konnte bisher nicht durch modernere Techniken wie relationale Datenbanksysteme oder Wissensgraphen ersetzt werden. PICA ist einerseits zentral für die Datenhaltung in den meisten Bibliotheken in Deutschland, andererseits wird das Format nicht außerhalb des Bibliothekswesens benutzt. Um sich mit der Verarbeitung von PICA-Daten vertraut zu machen, ist daher Dokumentation notwendig, wozu das vorliegende Handbuch beitragen soll. Schwerpunkt ist die Verarbeitung von PICA-Daten mit frei zugänglichen Werkzeugen.

## Inhalt

- [Grundlagen](grundlagen.md)
  - Geschichtlicher Hintergrund
  - Arten von Datenformaten
- [PICA-Formate](formate.md)
  - Aufbau des PICA-Formats
  - Serialisierungen
  - Abfragesprache
  - Anwendungsprofile und Schemas
- [Darstellung](darstellung.md)
  - Anzeige von PICA-Daten mit Syntaxhervorhebung
  - Hilfe zur einzelnen PICA-Feldern
- [Verarbeitung](verarbeitung.md)
  - Konvertierung
  - Auswertung
  - Werkzeuge
- [Schnittstellen](schnittstellen.md)
  - Zugriff auf PICA-Daten (OPAC, WinIBW, SRU, unAPI...)
- [Ausblick](ausblick.md)
  - Verwandte Formate (MARC, RDF, JSON...)
  - Zukünftige Alternativen (BIBFRAME, Folio...)

## Screencasts

Als Begleitmaterial gibt es folgende Screencasts:

* *PICA-Formate entschlüsseln mit Avram und PicaEditor* <https://doi.org/10.5446/48737> (2020-09-18, 13:46 Minuten)

## Literatur

- Becker et. al (1992): *Das PICA-System. Bericht über die im Auftrag des Niedersächsischen Ministeriums für Wissenschaft und Kunst durchgeführte Funktionsprüfung (Stand Mitte 1990).* In: Bibliothek Forschung und Praxis, Band 16, Heft 3. <https://doi.org/10.1515/bfup.1992.16.3.307>
- Costers (1979): *The PICA Catalogue System.* In: Proceedings of the IATUL Conferences. Paper 26. <https://docs.lib.purdue.edu/iatul/1979/papers/26>
- Eversberg (1999): *Was sind und was sollen Bibliothekarische Datenformate* [urn:nbn:de:gbv:084-1103231323](https://nbn-resolving.org/urn:nbn:de:gbv:084-11032313237)
- Klute (2018): *ETL-Prozesse für bibliothekarische Metadaten: Die Migration lokaler Katalogisate im GBV.* <https://doi.org/10.15771/MA_2018_3>
- Schneiders (1997): *Nederlandse bibliotheekgeschiedenis: van librije tot virtuele bibliotheek*. NBLC Uitg.
- Tennant (2002): *MARC Must Die.* In: Library Journal.
- Voß (2009): *Verarbeitung von PICA+ Daten mit PICA::Record*. <https://www.gbv.de/Verbundzentrale/Publikationen/2009/pdf/pdf_3940.pdf>
