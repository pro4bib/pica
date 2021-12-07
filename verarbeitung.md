# Verarbeitung von PICA-Daten

Dieses Kapitel gibt eine allgemeine Übersicht von frei zugänglichen Werkzeugen zur Verarbeitung von PICA-Daten. Im Wesentlichen sind dies:

* Das Kommandozeilenprogramm [picadata](picadata.md)
* Das Datenverarbeitungs-Werkzeug [Catmandu](catmandu.md)
* Das Kommandozeilenprogramm [pica-rs](pica-rs.md)

Das mit Catmandu vergleichbare Werkzeug [Metafacture](http://metafacture.org) unterstützt neben anderen Formaten auch das Lesen und Schreiben von PICA-Daten (siehe [Java-Quellcode](https://github.com/metafacture/metafacture-core/tree/master/metafacture-biblio/src/main/java/org/metafacture/biblio/pica)). Darüber hinaus gibt es die Web-Komponente [PicaEditor](#picaeditor) und mehrere [Programmbibliotheken](#programmbibliotheken) zur Entwicklung eigener Werkzeuge und Anwendungen.

[picadata]: picadata.md
[Catmandu]: catmandu.md
[pica-rs]: pica-rs.md

## PicaEditor

**PicaEditor** ist eine Komponente für Webanwendungen mit der PICA-Daten im Browser analysiert und bearbeitet werden können. Die Komponente basiert auf [CodeMirror](darstellung?id=codemirror) und dem JavaScript-Framework [Vue3](http://v3.vuejs.org/).

Der zentrale Teil des Editors dient der Anzeige und Bearbeitung von PICA+ Daten. Syntaxfehler und Fehler bei der Validierung gegen ein [Avram Schema](formate?id=avram-schemas) werden dabei hervorgehoben und mit dem Tabular kann schnell zwischen (Unter)feldern des Datensatzes gewechselt werden. Unter dem Bearbeitungsfeld werden (sofern vorhanden) Schema-Informationen zum jeweils ausgewählten Feld angezeigt. Über dem Bearbeitungsfeld stehen die PPN und ein Link in den Katalog, aus dem Datensätze per PPN geladen werden können. Eine Möglichkeit zum Speichern in den Katalog besteht allerdings nicht.

<div id="pica-editor" style="text-align:left">
  <pica-editor :databases="databases"
               :unapi="'https://unapi.k10plus.de/'"
               :avram="'https://format.k10plus.de/avram.pl?profile=k10plus'"><pre>
003@ $0355973081
010@ $ager
011@ $a2001
019@ $aXA-DE$XXX
021A $a@Zehn Jahre Pica in Niedersachsen und Deutschland$dSkizzen eines Erfolgs aus Anlass der 5. Verbundkonferenz des Gemeinsamen Bibliotheksverbundes der Länder Bremen, Hamburg, Mecklenburg-Vorpommern, Niedersachsen, Sachsen-Anhalt, Schleswig-Holstein und Thüringen, vom 11.-12. September, 2001 in Göttingen$h[Redaktion, Elmar Mittler]
029A $a@Gemeinsamer Bibliotheksverbund der Länder Bremen, Hamburg, Mecklenburg-Vorpommern, Niedersachsen, Sachsen-Anhalt, Schleswig-Holstein und Thüringen$bVerbundkonferenz$xGöttingen, Germany)
029F $a@Niedersächsische Staats- und Universitätsbibliothek Göttingen
033A $pGöttingen$nNiedersächsische Staats- und Universitätsbibliothek
034D $a181 p
034I $a21 cm
034M $aill
044A $aPICA Project$aCongresses
045A $aZ699.4.P23
045V $a10$a24,2
</pre></pica-editor>
</div>

<script>
Vue.createApp({
  components: { PicaEditor },
  data() {
    return {
      databases: [{
       title: { de: "K10Plus" },
       picabase: "https://opac.k10plus.de/",
       dbkey: "opac-de-627"
      }]
    }
  }
}).mount("#pica-editor")
</script>

?> Technische Details zur Installation und Konfiguration findet sich [in der PicaEditor-Dokumentation](https://www.npmjs.com/package/pica-editor).

## Programmbibliotheken

Bei komplexeren Aufgaben stoßen die vorhandenen Werkzeuge mitunter an ihre Grenzen, so dass eigene Programme entwickelt werden müssen. Für einige Programmiersprachen gibt es Softwarebibliotheken, die die Arbeit mit PICA-Daten vereinfachen und verlässlicher machen. Bislang gibt es:

* Die **Perl**-Programmbibliotheken [PICA::Data](https://github.com/gbv/PICA-Data), auf der sowohl [picadata] als auch die PICA-Funktionen von [Catmandu] basiert (ein ältere, inzwischen nicht mehr weiterentwickelte Version der Bibliothek ist [PICA::Record](https://github.com/gbv/PICA-Record)).
* Das Node-Modul [pica-data](https://www.npmjs.com/package/pica-data) stellt **JavaScript**-Funktionen zur Verarbeitung von PICA+ als PICA Plain und PICA JSON bereit.
* [luapica](http://gbv.github.io/luapica/) ist eine Programmbibliothek zur PICA-Verarbeitung in **Lua**.
* [pica_parse](https://github.com/FID-Judaica/pica_parse.py) ist eine **Python**-Bibliothek für PICA+ Daten.
