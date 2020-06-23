(function (Prism) {
  Prism.languages.marc = {
    'inserted': /^[+].*$/gm,
    'deleted': /^-.*$/gm,
    'keyword': /^\s*([012][0-9]{2}[A-Z@](\/[0-9]{2,3})?)/gm,
    'property': /[$][^$]/gm,
  }
  Prism.languages.pica = Prism.languages.marc
}(Prism))
