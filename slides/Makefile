default: pica-entschluesseln.html

.SUFFIXES: .md .html

.md.html:
	pandoc -t revealjs $< --standalone \
		-V revealjs-url=https://unpkg.com/reveal.js@3.9.2/ \
		-V theme=simple --css reveal-gbv.css > $@

