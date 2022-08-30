import type { Token } from '../code-runner/tokenizer/types'

const $viewer:HTMLDivElement = document.querySelector('#token-viewer')!
let lastLine = 1
let scopeLevel = 0
export const renderTokens = (tokens: Token[])=>{
    $viewer.innerHTML = ''
    tokens.forEach(({ line, id, type, value })=>{
        const $code = document.createElement('code')
        $code.setAttribute('data-token-type', type)
        $code.classList.add('token')
        $code.classList.add(`token-${type}`)
        $code.id = id
        $code.innerText = type === 'string'?`'${value}'`:`${value}`
        if(type === 'punctuation' && value === '{'){
            scopeLevel++
         }
        if(type === 'punctuation' && value === '}'){
            scopeLevel--
        }
        let isNewLine = false
        if(lastLine !== line.count){
            lastLine = line.count
            isNewLine = true
        }
        if(isNewLine){
            const $ident = document.createElement('code')
            $ident.style.marginLeft = `${scopeLevel*32}px`
            $viewer.appendChild(document.createElement('br'))
            $viewer.appendChild($ident)
        }
        $viewer.appendChild($code)
    })
}


