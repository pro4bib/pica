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

Das Werkzeug [Catmandu](catmandu) ermöglicht neben der Abfrage und Auswertung
von PICA-Daten auch die Erstellung von PICA-Patch-Datensätzen um Änderungen
festzustellen ("diff") oder ausführen ("patch"). Die Eintragung dieser Änderungen
in zentrale PICA-Datenbanken ist allerdings nur durch Verbundzentralen möglich.

Um mit Catmandu Änderungen zu erzeugen sind Bearbeitungen am PICA-Datensatz mit
`do pica_diff() ... end` zu umschließen. So können beispielsweise die
Sacherschließungsfelder `045B/00-99`, falls vorhanden, aus dem Datensatz der Datei
[`example.pica`](example.pica ':ignore') entfernt werden:

~~~
$ catmandu convert pp --fix 'do pica_diff() pica_remove(045./*) end' to pp < example.pica
  003@ $012345X
- 045B/02 $aSpo 1025$aBID 200
~~~

Folgende Fix-Kommandos können derzeit (Catmandu::PICA Version 1.12) zum Ändern
verwendet werden; weitere Kommandos [sind geplant](https://github.com/gbv/Catmandu-PICA/issues/82):

- `pica_remove()`
- `pica_keep()`
- `pica_tag()`
- `pica_occurrence()`

Hier einige weitere Beispiele von [Fix-Skripten](catmandu?id=fix-skripte) zur Änderung
von Datensätzen mit Catmandu:

~~~
# Entferne Felder der Basisklassifikation (BK) mit invalider Notation

# Nur Titeldatensatz betrachten
pica_keep(0.../*)

do pica_diff()
  do pica_each(045Q/01)
    unless pica_match($9) # Wenn keine BK-Normdaten-Verknüpfung vorhanden
      unless pica_match($a,"\d\d\.\d\d")
        pica_remove(045Q/01)
      end
    end
  end
end
~~~

~~~
# Entferne die Occurrence von allen `028C` Feldern,
# außer wenn das Feld per `$9` mit einem Normdatensatz verknüpft ist

do pica_diff()
  do pica_each(028C/*)
    unless pica_match($9)
      pica_occurrence(0)
    end
  end
end
~~~

