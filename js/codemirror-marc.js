// MARC/PICA mode for CodeMirror

(function(CodeMirror) {

CodeMirror.defineMode("marc", function() {

 // hard-coded parser with improved fallback after errors

 const TOKEN = {
    tag: 'variable-2',
    occurrence: 'variable-2',
    subfield: 'comment',
    code: 'keyword',
    indicators: 'variable-2',
    //value: 'number',
    length: 'comment',
    prefix: 'comment',
  }

  const separator = { '$': /[^$]/, '‡': /[^‡]/, 'ǂ': /[^ǂ]/ }

  const startState = () => {
    return {
      next: 'tag',
      format: undefined,
      code: undefined 
    }
  }

  return {
    startState,
    token(stream, state) {

      if (stream.sol()) {
        Object.assign(state, startState())
        state.format = undefined
        if (stream.eat('=')) {
          state.format = 'marc'
          return TOKEN.prefix
        }
      }

      if (state.next === 'tag') {
        state.next = 'field'

        if (state.format !== 'marc' && stream.match(/[0-2][0-9]{2}[A-Z@]/)) {
          state.format = 'pica'
          return TOKEN.tag
        }

        if (stream.match(/Leader|LDR|[0-9]{3}/)) {
          state.format = 'marc'
          return TOKEN.tag
        }
      }

      if (state.next === 'field') {
        stream.eatSpace()
        state.next = 'subfield'

        // occurrence or field length
        if (stream.match(/\/[^‡ǂ$\t ]*/)) {
          if (state.format === 'marc') {
            state.next = 'fixed-field'
            if (stream.current().match(/^\/\d+-\d+$/)) {
              return TOKEN.length
            }
          } else if (state.format === 'pica' && stream.current().match(/^\/\d{2,3}$/)) {             
            return TOKEN.occurrence
          }
          return 'error'
        }

        if (state.format === 'marc') { 

          // indicators
          if (stream.match(/[0-9A-Za-z#\\_ ]{1,2}/)) { 

            // no subfields following, more likely a fixed field
            if (stream.match(/^[^‡$]+$/)) {
              return TOKEN.value                
            }            
            return TOKEN.indicators
          } 

          if (stream.match(/[^‡ǂ\$]+$/)) {
            return TOKEN.value
          }
        }
      } 

      if (state.next === 'fixed-field') {
        stream.skipToEnd()
        return TOKEN.value
      }

      if (state.next === 'subfield') {
        if (state.code) {
          if (stream.eat(state.code)) {
            state.next = 'code'
            return TOKEN.subfield
          }
        } else {
          stream.eatSpace()
          var code = stream.peek()
          if (code === '‡' || code === '$') {
            stream.next()    
            state.code = code
            state.next = 'code'
            return TOKEN.subfield
          }
        }

        stream.eatWhile(state.code ? separator[state.code] : /[^‡$]/)
        return 'error'
      }

      if (state.next === 'code') {
        state.next = 'subfield-value'
        if (stream.next().match(/[a-zA-Z0-9]/)) {
          return TOKEN.code
        } else {
          return 'error'
        }
      }

      if (state.next === 'subfield-value') {
        state.next = 'subfield'

        while (stream.skipTo(state.code)) {
          if ( stream.match(state.code+state.code) ) {
            stream.next()
            stream.next()
          } else {
            break
          }
        }

        if (stream.peek() !== state.code) {
          stream.skipToEnd()
        }
        
        return TOKEN.value
      }

      stream.skipToEnd()
      return 'error'
    }
  }
})
})(CodeMirror);
