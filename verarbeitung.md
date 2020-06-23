# Verarbeitung von PICA-Daten

!> Dieses Kapitel kommt noch!

## Catmandu

**Catmandu** ist ein digitaler Werkzeugkasten für die Verarbeitung von Metadaten. Im Gegensatz zu ähnlichen ETL-Tools unterstützt Catmandu gängige Datenformate und Schnittstellen von Bibliothekssoftware, darunter auch PICA.

Für Debian-basierte Betriebsysteme kann Catmandu für PICA und SRU folgendermaßen installiert werden:

~~~bash
sudo apt-get install libcatmandu-perl libcatmandu-sru-perl cpanm
sudo cpanm Catmandu::PICA PICA::Data
~~~

...

## PICA::Data

...
