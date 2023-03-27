# PICA-Daten erstellen und ändern

Die **Änderung von PICA-Daten** beschränkt sich in der Regel auf Bibliotheken und Verbundzentralen, die gemeinsam PICA-Datenbanken wie den K10plus betreiben. Dazu
gibt es folgende, nicht frei zugängliche Werkzeuge:

- der Katalogisierungsclient **WinIBW** (Windows)

- das vereinfachte Webformular **WebCat** (Webanwendung),
  beispielsweise zur Anlage und Bearbeitung von Datensätze der GND

- **Interne Skripte** der Datenbanksoftware CBS (Linux)

Speziell zur Sacherschließung gibt es darüber hinaus Webanwendungen, deren Ergebnisse
indirekt zu Änderungen an PICA-Daten führen können:

- den **Digitalen Assistent** (DA-3)
- das Mapping-Werkzeug **[Cocoda](https://coli-conc.gbv.de/cocoda/)**

Um unabhängig von einzelnen Werkzeugen Änderungen an PICA-Datensätzen auszudrücken, wurde an der VZG das [PICA-Patch-Format](formate?id=Änderungsformat) entwickelt.

### Änderungen mit Catmandu

Das Werkzeug [Catmandu](#catmandu) ermöglicht neben der Abfrage und Auswertung
von PICA-Daten auch die Erstellung von PICA-Patch-Datensätzen um Änderungen
festzustellen ("diff") oder ausführen ("patch"). Die Eintragung dieser Änderungen
in zentrale PICA-Datenbanken ist allerdings nur durch Verbundzentralen möglich.

Hier einige Beispiele von [Fix-Skripten](catmandu?id=fix-skripte) zur Änderung
von Datensätzen mit Catmandu:

Entferne die Occurrence von allen `028C` Feldern, außer wenn diese per `$9` mit
einem Normdatensatz verknüpft sind:

~~~
do pica_diff()
  do pica_each(028C/*)
    unless pica_match($9)
      pica_occurrence(0)
    end
  end
end
~~~

