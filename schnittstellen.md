# Schnittstellen

Für den lesenden Zugriff auf PICA-Daten gibt es [unAPI](#unapi) für einzelne Datensätze und [SRU](#sru) zur Abfrage von Suchergebnissen. Darüber hinaus können PICA-Daten manuell über die [OPAC-Oberfläche](#opac) und mit [WinIBW](#winibw) heruntergeladen werden. Über die [Avram-API](#avram-api) können Informationen zu Anwendungsprofilen abgerufen werden.

## unAPI

Die unAPI-Schnittstelle ermöglicht den Abruf einzelner PICA-Datensätze mittels ihrer PPN. Zusätzlich muss ein Datenbankkürzel angegeben werden und in welchem Format der Datensatz zurückgeliefert werden soll.

?> [unAPI im K10plus-Wiki](https://wiki.k10plus.de/display/K10PLUS/UnAPI)

?> [unAPI im GBV-Verbundwiki](https://verbundwiki.gbv.de/display/VZG/unAPI)

Eine Liste aller unterstützen Formaten wird bei Aufruf der unAPI-URL (<https://unapi.k10plus.de/>) zurückgeliefert. Die PICA-basierten Serialisierungen sind:

`format=`   |Serialisierung
------------|--------------
`pp`        |[PICA Plain](https://format.gbv.de/pica/plain)
`picajson`  |[PICA/JSON](https://format.gbv.de/pica/json)
`picaxml`   |[PICA/XML](https://format.gbv.de/pica/json)
`normpp`    |[Normalisiertes PICA](https://format.gbv.de/pica/normalized)
`extpp`     |[Binäres PICA](https://format.gbv.de/pica/binary)

Alle weiteren Formate (`marcxml`, `mods36`...) werden durch Konvertierung aus PICA erzeugt.

### Beispiel auf der Kommandozeile

Der Datensatz mit der [PPN 161165839X](https://opac.k10plus.de/DB=2.299/PPNSET?PPN=161165839X) aus dem K10plus-Verbundkatalog (`opac-de-627`) lässt sich im PICA Plain Format (`pp`) unter der URL <http://unapi.k10plus.de/?id=opac-de-627:ppn:161165839X&format=pp> abrufen. Auf der Unix-Kommandozeile ist dies beispielsweise mit `curl` möglich so dass und anschließend mit [`picadata`](verarbeitung?id=picadata) weiterverarbeitet werden:

~~~bash
curl 'http://unapi.k10plus.de/?id=opac-de-627:ppn:161165839X&format=pp' | picadata '028A|028C'
~~~

~~~pica
028A $9079339735$VTpv1$7gnd/118540475$3161149200$wpiz$AGoldman$DEmma$E1869$M1940
028C $9549565094$VTpv3$7gnd/133610519$3299969355$wpiz$APetersen$DTina$E1973$BBearb.
028C $9634784293$VTpv4$7gnd/142220213$3329568302$wpiz$ABreitinger$DMarlen$BÜbers.
~~~

Für wiederkehrende Abrufe mit unterschiedlicher PPN lohnt es sich ein Shell-Skript anzulegen, das dann beispielsweise als `./kxp 161165839X` aufgerufen werden kann:

~~~bash
cat <<EOF > kxp
#!/bin/bash
kxp() { curl -s "http://unapi.k10plus.de/?format=pp&id=opac-de-627:ppn:$1"; echo; echo; }
if [ -z "$1" ]; then while read -r ppn; do kxp "$ppn"; done
else for ppn in "$@"; do kxp "$ppn"; done; fi
EOF
chmod +x kxp
~~~

### Beispiel im Browser

In die folgende [CodeMirror-Instanz](darstellung?id=codemirror) können PICA-Datenätze per unAPI aus dem K10plus-Katalog geladen werden:

<div>
<textarea id="pica-editor"></textarea>
<label for="ppn">PPN:</label> <input type="text" id="ppn" value="161165839X" />
<button id="loadViaPPN">Datensatz aus K10Plus laden</button>
</div>

<script>
var editor = document.getElementById('pica-editor')
editor = CodeMirror.fromTextArea(editor, { lineNumbers: true });
document.getElementById('loadViaPPN').addEventListener("click", function () {
  var ppn = document.getElementById("ppn").value
  var url = "//unapi.k10plus.de/?format=pp&id=opac-de-627:ppn:" + ppn
  fetch(url).then(function(res) {
    res.text().then(function(pica) {
      editor.setValue(pica)
    })
  })
})
</script>

Die Web-Komponente [PicaEditor](verarbeitung?id=picaeditor) unterstützt ebenfalls den Zugriff auf Katalogdaten per unAPI.

## SRU

Die SRU-Schnittstelle dient der Abfrage von Datensätzen aus PICA-Katalogen mittels Suchanfragen. Die Suche erfolgt wie bei der klassischen [OPAC-Oberfläche](#opac) über einen Suchindex mit Suchschlüsseln. Jeder Suchschlüssel hat eine interne Nummer ("IKT") und ein Kürzel aus drei Buchstaben. So ist beispielsweise die ISBN in IKT 7 mit dem Suchschlüssel `ISB` indexiert. Für OPAC-Suchanfragen in diesem Index gibt es jeweils entsprechende Suchanfragen an den SRU-Endpunkt des Katalogs:

* [https://opac.k10plus.de/DB=2.299/CMD?ACT=SRCHA&**IKT=7&TRM=9783894018108**](https://opac.k10plus.de/DB=2.299/CMD?ACT=SRCHA&IKT=7&TRM=9783894018108)
* [http://sru.k10plus.de/opac-de-627?version=1.1&operation=searchRetrieve&query=**pica.isb=9783894018108**&maximumRecords=10&recordSchema=picaxml](http://sru.k10plus.de/opac-de-627?version=1.1&operation=searchRetrieve&query=pica.isb=9783894018108&maximumRecords=10&recordSchema=picaxml)

Eine Liste aller Suchschlüssel einer Datenbank ist über die Basis-URL des SRU-Endpunktes (z.B. <http://sru.k10plus.de/opac-de-627>) abrufbar und kann folgendermaßen in eine übersichtliche Form gebracht werden:

~~~bash
curl http://sru.k10plus.de/opac-de-627 | catmandu convert XML --path //index to XML | egrep -o '\[[^<]+'
~~~

In den Katalogisierungsrichtlinien finden sich auch Angaben dazu, welche PICA-(Unter)felder in welchem Suchindex indexiert werden. Die Beziehung zwischen PICA-Feldern und Suchindex ist allerdings komplexer, da die Daten bei der Indexierung aggregiert, gefiltert und verändert werden können.

?> [Weitere Informationen zu SRU im K10plus-Wiki](https://wiki.k10plus.de/display/K10PLUS/SRU)

?> [SRU im GBV-Verbundwiki](https://verbundwiki.gbv.de/display/VZG/SRU)

?> [SRU bei der DNB](http://www.dnb.de/sru)

?> [SRU bei der Zeitschriftendatenbank](https://www.zeitschriftendatenbank.de/services/schnittstellen/sru/)

?> [Wikipedia-Artikel zu SRU](https://de.wikipedia.org/wiki/Search/Retrieve_via_URL)

### Beispiel: K10plus-Abfragen

Zum Testen einer SRU-Anfrage an die K10plus-Datenbank kann mit Catmandu (und der [im Catmandu-Kapitel](verarbeitung?id=catmandu) angegebenen [Konfiguration](catmandu.yaml ':ignore')) ein einzelner Datensatz per PPN abgerufen werden:

~~~bash
catmandu convert kxp --query "pica.ppn=161165839X" to pp
~~~

Der Titel ist in Feld `045H` mit der Klasse `335.83092` ("Anarchisten") der Dewey Dezimalklassifikation (DDC) erschlossen:

~~~bash
$ catmandu convert kxp --query "pica.ppn=161165839X" to pp | picadata 045H\$a
335.83092
~~~

Die DDC ist im Suchindex mit dem Schlüssel `ddc` erfasst. Wie viele so erfassten Publikationen über Anarchisten gibt es im im K10plus? Hier mehrere Möglichkeiten der Auswertung. Die letzte Variante ruft nur die Anzahl der Datensätze ab:

~~~bash
catmandu convert kxp --query "pica.ddc=335.83092" to Count
catmandu convert kxp --query "pica.ddc=335.83092" to pp | picadata --count
catmandu convert kxp --query "pica.ddc=335.83092" --parser meta --limit 0 --fix 'retain(numberOfRecords)'
~~~

Mehrere Suchschlüssel können mit `and` oder `or` verknüpft werden. Hier eine Liste der Titel von Publikationen zu Anarchisten die im Jahr 2014 oder 2015 erschienen sind:

~~~bash
catmandu convert kxp --query "pica.ddc=335.83092 and (pica.jah=2014 or pica.jah=2015)" to pp | picadata 021A
~~~

Für komplexere Aufgaben empfiehlt es sich das Ergebnis der SRU-Anfrage nur einmal abzufragen und in eine Datei zu schreiben und anschließend mit verschiedenen Werkzeuge zu analysieren:

~~~bash
catmandu convert kxp --query pica.ddc=335.83092 to pp > ana.pica
picadata 021A ana.pica      # Titelfelder
picadata '011@$a' ana.pica  # Jahreszahlen
catmandu convert pp --fix 'pica_map(011@$a,jahr); remove_field(record)' to CSV
~~~

Die Abfrage von Titeln die mit einem Normdatensatz verknüpft sind ist etwas komlizierter. Zunächst muss die PPN des Normdatensatzes ermittelt werden, beispielsweise auf Grundlage der GND-ID `2085624-6`.

~~~bash
$ catmandu convert kxpnorm --query "pica.nid=2085624-6" to JSON | jq -r .[]._id
100221165
~~~

Mit der PPN lässt sich anschließend eine CQL-Query wie `pica.1049=100221165 and pica.1045=rel-tt and pica.1001=b` bilden und zur Abfrage von Titeldatensätzen verwenden:

~~~
catmandu convert kxpnorm --query "pica.1049=100221165 and pica.1045=rel-tt and pica.1001=b" to pp | picadata -p '003@,021A'
~~~

### Beispiel: GND-Abfrage

Die PICA-Datenbank der Gemeinsamen Normdatei (GND) ist als [Online-GND](https://swb.bsz-bw.de/DB=2.104/) (OGND) per SRU abfragbar. Mit Kenntnis des [GND-Format](https://format.gbv.de/pica/gnd) und der Suchschlüssel lassen sich gezielt GND-Datensätze im Internformat abrufen.

Der Suchschlüssel `KSK` enthält beispielsweise die vollständige Vorzungsbenennung eines Geografikums oder einer Organisation. Die Suche nach "Frankfurt am Main" liefert einen Treffer, die Suche nach "Frankfurt" keine Treffer:

~~~bash
catmandu convert ognd --query 'pica.ksk="Frankfurt am Main"' to Count
catmandu convert ognd --query 'pica.ksk=Frankfurt' to Count
~~~

Im Suchschlüssel `KOR` werden Suchbegriffe auch als einzelne Worte erfasst. Zu Frankfurt gibt es mehr als 15.000 Treffer (mit dem Parameter `--total` lässt sich die Ergebnismenge bei Bedarf beschränken, um nur testweise die erste Datensätze abzurufen). Durch Eingrenzung des Normdatentyps auf Gebietskörperschaften und Verwaltungseinheiten (`gik`) lässt sich die Treffermenge auf etwa 350 verringern, die Abfrage dauert dennoch einige Sekunden:

~~~bash
catmandu convert ognd --query 'pica.kor=Frankfurt and pica.9001=gik' to pp > frankfurts.pica
picadata --count frankfurts.pica
~~~

Die so heruntergeladene Treffermenge lässt sich nun mit der Catmandu-Konvertierungssprache "Fix" weiter bearbeiten. [Hier ein Beispielskript](gnd.fix ':ignore'):

[](gnd.fix ':include :type=code fix')

Das Fix-Skript abgespeichert in der Datei `gnd.fix`, lässt sich folgendermaßen anwenden, um die Namen zu extrahieren:

~~~fix
catmandu convert pp --fix gnd.fix to YAML < frankfurts.pica
~~~

## OPAC

In der Standard-Katalogansicht eines PICA-Katalogs (OPAC) lässt sich der PICA-Datensatz eines ausgewählten Titels über einen versteckten Link direkt unter dem Icon der Publikationsform aufrufen (siehe Screenshot). Alternativ kann die lässt Feldansicht auch durch den URL-Bestandteil `/PSR=PP` (nur Titelebene) bzw. `/PRS=PP%7F` (alle Ebenen) aktiviert werden. Der Datensatz in PICA Plain Serialisierung kann anschließend per Copy & Paste beispielsweise in eine Datei kopiert werden.

![Versteckter Link im OPAC](img/opac-hidden-link.png)

*Versteckter Link zum PICA-Datensatz (roter Pfeil)*

Unter dem PICA-Datensatz wird in der Feldansicht auch die **Indexierung** des Datensatz angezeigt (siehe [Erklärungen zu SRU](#sru)).

## WinIBW

WinIBW ist zwar nicht frei verfügbar aber das in Bibliotheken am weitesten verbreitete Programm zur Verarbeitung von PICA-Daten. Nicht zuletzt werden PICA-Daten bei der Katalogisierung in der Regel mittels WinIBW in PICA-Datenbanken eingetragen.

?> [Download von Datensätzen in WinIBW](https://wiki.k10plus.de/pages/viewpage.action?pageId=64225417)

## Avram-API

Neben den oben genannten Möglichkeiten zum Zugriff auf PICA-Daten gibt es mit der **Avram-API** eine Schnittstelle zum Zugriff auf Schema-Informationen ([Avram Schemas](formate?id=avram-schemas)). Abrufbar sind Informationen zu PICA-Feldern und Unterfeldern ausgehend von Feldnummern in PICA+ und Pica3 (Abfrage-Parameter `field` bzw. `pica3`) oder alle Felder eines Anwendungsprofils (Abfrage-Parameter `profile`).

Die Avram-API für den K10Plus-Katalog steht unter <https://format.k10plus.de/avram.pl> zur Verfügung und ist dort dokumentiert. So lässt sich beispielsweise mit der URL <https://format.k10plus.de/avram.pl?pica3=4000&profile=k10plus> abrufen, wie das Pica3-Feld `4000` im K10Plus-Format definiert ist:

Ein Beispiel für die Verwendung der Schnittstelle liefert die Web-Komponente [PicaEditor](verarbeitung?id=picaeditor).
