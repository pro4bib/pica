# Einleitung {.unnumbered}

> During a relatively long period of research, an advanced format was developed for the storage of bibliographic information; the PICA format. — Look Costers -@costers_pica_1979

Das PICA-Format ist seit mehr als 40 Jahren im Einsatz und konnte bisher nicht durch modernere Techniken wie relationale Datenbanksysteme oder Wissensgraphen ersetzt werden. PICA ist einerseits zentral für die Datenhaltung in den meisten Bibliotheken in Deutschland, andererseits wird das Format nicht außerhalb des Bibliothekswesens benutzt. Um sich mit der Verarbeitung von PICA-Daten vertraut zu machen, ist daher Dokumentation notwendig, wozu das vorliegende Handbuch beitragen soll. Schwerpunkt ist die Verarbeitung von PICA-Daten mit frei zugänglichen Werkzeugen.

## Übersicht {.numbered}

Das Handbuch ist in drei Teile gegliedert:

1. Unter **Theorie & Grundlagen** werden zunächst der [historische Hintergrund](hintergrund.qmd#sec-history) des PICA-Format und der Kontext des [Datenbanksystem CBS](hintergrund.qmd#sec-cbs) dargestellt. Es folgen allgemeine [Grundlagen zu Datenformaten](datenformate.qmd) und eine Erkläuterung der einzelnen [PICA-Formate](pica-formate.qmd).

2. Der **Praxis-Teil** zeigt wie mit verschiedenen Methoden und Werkzeuge PICA-Daten [angezeigt](darstellung.qmd), [verarbeitet](verarbeitung.qmd) und [geändert](bearbeitung.qmd) werden können. Außerdem werden [Schnittstellen](schnittstellen.qmd) zu Zugriff auf PICA-Datenbanken vorgestellt.

3. Unter **Werkzeuge** werden die verschiedenen Programme zum Umgang mit PICA-Daten genauer vorgestellt (@tbl-werkzeuge).

Zusätzlich gibt es ein [Literaturverzeichnis](literatur.md) mit weiteren Quellen und Informationen [über dieses Handbuch](CONTRIBUTING.md).

Programm | Einsatz | Programmiersprache | Code-Repositories
:--------|:--------|:-------------------|:-----------------
[picadata](picadata.qmd) | Kommandozeile und Bibliothek | Perl | <https://github.com/gbv/PICA-Data>
[Catmandu](catmandu.qmd) | Kommandozeile und Bibliothek | Perl | <https://github.com/LibreCat>
[pica-rs](pica-rs.qmd) | Kommandozeile und Bibliothek | Rust | <https://github.com/deutsche-nationalbibliothek/pica-rs>
[Metafacture](metafacture.qmd) | Kommandozeile und Bibliothek | Java | <https://github.com/metafacture>
[qa-catalogue](qa-catalogue.qmd) | Webanwendung | Java & PHP | <https://github.com/pkiraly/qa-catalogue> und <https://github.com/pkiraly/qa-catalogue-web>
[WinIBW](winibw.qmd) | Benutzeroberfläche (Windows) | ? | closed source

: Übersicht von Werkzeugen für PICA-Daten {#tbl-werkzeuge .table}


