preview:
	quarto preview

default:
	quarto render --to html

references.bib:
	curl -s 'https://api.zotero.org/groups/5801244/items?format=biblatex&limit=100' > $@

#metadata: metadata.yml
#	./metadata.pl

