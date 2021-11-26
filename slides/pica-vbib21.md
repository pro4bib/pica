---
title: Werkzeuge und Einblicke in das Datenformat PICA+
subtitle: "#vBIB21"
date: 2021-12-02
author:
- Jakob Voß
---

# PICA+?

## Was ist PICA+?

- Internes Datenformat der Bibliotheksysteme CBS und LBS von OCLC/PICA
- Entwickelt Ende der 1970er, angelehnt an MARC
- Zentrales Format in GBV, SWB (via K10plus), DNB (ZDB, GND...) u.A.

## Einsatz
 
~~~svgbob
                      .----.
       Import -----> | CBS  | ----> Export
               .--->  '----'
              / Pica3
 Katalogisierung: WinIBW

~~~

## PICA-Datensatz

![](../img/pica-syntax-light.png)

::: notes

Hier nun ein fiktives Beispiel für einen ganz einfachen PICA-Datensatz.

...TODO...

:::

## PICA-Formate

![](../img/format-beispiel-k10plus.png)

K10plus-PICA ≠ ZDB-PICA ≠ GND-PICA...

::: notes

PICA+ ist zunächst nur eine Datenstruktur mit der beliebige Inhalte in Feldern und Unterfeldern gruppiert werden können.

Die Bedeutung der einzelnen Felder ist nicht immer gleich sondern hängt davon ab, welches konkrete PICA-Datenformat verwendet wird. Hier ein Auszug des K10plus-Format mit den Feldern aus dem Beispiel.

Eine Ausnahme ist das Systemfeld 003@, das immer die so genannte PPN enthält, die pro Datenbank eindeutige ID des Datensatz.

Die verschiedenen PICA-Formate können nicht nur unterschiedlich definiert sein, sie sind zudem Änderungen unterworfen wenn neue Felder und Unterfelder eingeführt oder alte Felder abgelöst werden.

Ein konkretes Format legt also fest, welche Felder es mit welchen Unterfeldern geben darf, wie die Felder heißen und ob Felder wiederholbar sind.

Diese Information über ein Format ist wichtig um PICA-Daten auszuwerten und wie ich später zeigen werde kann sie auch zur Überprüfung von Datensätzen verwendet werden.

Das jeweilige Format lässt sich nochmal unterteilen in das Datenformat im engeren Sinne, das angibt welche Felder es gibt, und in die Katalogisierungsregeln, die angeben wie die Felder mit Inhalt gefüllt werden sollen.

:::

## Beispiel aus dem K10plus

<https://opac.k10plus.de/DB=2.299/CMD?ACT=SRCHA&IKT=12&TRM=017651735&HILN=888>

::: notes

Hier ein vollständiges Beispiel eines PICA-Datensatz im K10plus. Der Datensatz enthält einen Titel der in zwei Bibliotheken mit je einem Exemplar nachgewiesen ist.

Die Datensicht in PICA+ verbirgt sich hier hinter einem versteckten Link unter dem Icon.

Wie hier zu sehen ist
Neben den Feldern

Die Struktur aus Feldern, Unterfeldern und Ebenen.
Erste Ziffer der Feldnummer: Ebene (0=Titel, 1=Bibliothek, 2=Exemplar)

:::


<!-- ## {data-background-image=""} -->


::: notes

:::

# Werkzeuge

::: notes

Kommandozeilen-Werkzeuge

:::

## picadata

- Daten aus dem Katalog (copy & paste)
- picadata
    - PICA-Serialisierungen (XML, Binär, JSON...)
    - Befehle: count, levels
    - Befehl: explain
    - Daten herauziehen mit PICA Path expression
    - `picadata 04.. beispiel.pica`

~~~
curl 'https://format.k10plus.de/avram.pl?profile=k10plus-title' > k10plus-title.json
picadata fields minimal.pp -s k10plus-title.json
~~~~

## Catmandu

- Catmandu
    - Daten von API abrufen
    - Fix-Skript (zwischen PICA und andere Formate konvertieren)

catmandu convert SRU --query ''

Welche anderen Titel mit der gleichen DDC "Computereinsatz für Katalogisierung in Bibliotheken"

    catmandu convert kxp --query "pica.ddc=025.30285" to pp > result.pica

Aus welchen Jahren stammen die Titel:

    picadata 011@\$a result.pica | sort | uniq -c

=> vor allem Ende der 1980er, Anfang der 1990er

Welche Titel sind ebenfalls mit PPN `181564734` (PICA) verlinkt?

    catmandu convert kxp --query "pica.1049=181564734 and pica.1045=rel-tt and pica.1001=b" to pp > pica.pp
    picadata count pica.pp
    catmandu convert pp --fix 'pica_map(011@$a,jahr)pica_map(021A$a,titel)' to TSV --fields jahr,titel < pica.pp

## pica-rs

- pica-rs

# Fortgeschrittene Techniken

## Validierung mit Avram-Schemas

- Validierung gegen Avram-Schemas

## Änderungsformat

- Änderungen verfolgen und durchführen mit PICA Patch Format

# Ausblick

* Digitales Handbuch *Einführung in die Verarbeitung von PICA-Daten*
  <https://pro4bib.github.io/pica/>

* Übersicht verschiedener PICA-Format und Serialisierungen:
  <http://format.gbv.de/pica>

* Vortrag *Werkzeuge zur Analyse von Bibliotheksdaten* 
  eingereicht zum Bibliothekar*innentag 2022

