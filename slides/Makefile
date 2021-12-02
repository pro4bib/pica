default: pica-vbib21.html pica-entschluesseln.html

.SUFFIXES: .md .html

# requires pandoc 2.16

.md.html:
	pandoc -t revealjs $< --standalone \
		-V revealjs-url=https://unpkg.com/reveal.js@4.0/ \
		-F ./pandoc-svgbob \
		--slide-level=2 \
		-V theme=simple --css reveal-gbv.css > $@

