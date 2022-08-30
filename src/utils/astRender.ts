import type { Output } from '../code-runner/interpreter/types'
import type { ProgramAST, AST, AssignAST, BinaryAST, CallAST, FunctionAST, IfAST, ScopeAST, TypeAndValueAST, WhileAST } from '../code-runner/ast-parser/types'
import { TypesSupported } from '../code-runner'

const $viewer:HTMLDivElement = document.querySelector('#ast-viewer')!
const $display: HTMLDivElement = document.querySelector('#display')!
let $program:HTMLElement = document.createElement('code')
let isNewLine = false
let scopeLevel = 0



function renderTypeAndValueAST({ type, value }: TypeAndValueAST){
  const $fragment = document.createDocumentFragment()
  $fragment.textContent = type === 'string'?`'${value}'`:`${value}`
  return $fragment
}
  
  function renderCallAST({ function: func, params }: CallAST){
    const $fragment = document.createDocumentFragment()
    const $name = renderTypeAndValueAST(func)
    const $params = document.createElement('code')
    $params.classList.add('ast')
    $params.setAttribute('data-ast-type', 'params')
    $params.innerHTML = '('
    $params.appendChild(renderParams(params))
    $params.innerHTML += ')'
    $fragment.appendChild($name)
    $fragment.appendChild($params)
    return $fragment
  }

  function renderParams(params: AST[]){
    const $fragment = document.createDocumentFragment()
    params.forEach((ast, i)=>{
      const $content = renderEveryAst(ast)
      if($content){
        $fragment.appendChild($content)
      }
      if(i !== params.length - 1)$fragment.appendChild(document.createTextNode(' , '))
    })
    return $fragment
  }
  
  function renderBinaryAST({ left, operator, right }: BinaryAST | AssignAST){
    const $fragment = document.createElement('span')
    const $left = document.createElement('span')
    const $right = document.createElement('span')

    $left.id = left.id
    $right.id = right.id
    // $fragment.classList.add('ast')

    $left.appendChild(renderTypeAndValueAST(left))
    $fragment.appendChild($left)
    $fragment.innerHTML += ` ${operator} `
    
    const $rightFragment = renderEveryAst(right)
    if($rightFragment){
      $right.appendChild($rightFragment)
    }
    $fragment.appendChild($right)
    return $fragment
  }
  
  function renderScopeAST({ body }: ScopeAST){
    const $fragment = document.createElement('span')
    // $fragment.classList.add('ast')
    
    const $br1 = document.createElement('br')
    const $br2 = document.createElement('br')

    $fragment.innerHTML = '{'
    $fragment.appendChild($br1)

    scopeLevel++
    isNewLine = true

    const $body = renderArrayAst(body, true)
    $fragment.appendChild($body)

    scopeLevel--

    $fragment.appendChild($br2)
    $fragment.innerHTML += '}'
    return $fragment
  }
  
  function renderFunctionAST({ args, scope }: FunctionAST){
    const $fragment = document.createElement('span')
    const $args = document.createElement('span')
    
    // $fragment.classList.add('ast')
    // $args.classList.add('ast')

    const $body = document.createElement('code')

    $body.setAttribute('data-ast-type', 'body')
    $body.classList.add('ast')

    $args.innerHTML = '('

    const $argsContent = renderParams(args)
    $args.appendChild($argsContent)    

    $args.innerHTML += ')'

    $fragment.appendChild($args)

    $fragment.innerHTML += ' => '

    const $bodyContent = renderScopeAST(scope)
    if($bodyContent){
      $body.appendChild($bodyContent)
    }

    $fragment.appendChild($body)
    return $fragment
  }
  
  function renderIfAndWhileAST({ type, condition, then, else: otherwise }: IfAST | WhileAST){
    const $fragment = document.createElement('span')
    // $fragment.classList.add('ast')
    const $condition = document.createElement('code')

    $condition.innerHTML = '('
    const $conditionContent = renderEveryAst(condition)
    if($conditionContent){
      $condition.appendChild($conditionContent)
    }
    $condition.innerHTML += ')'

    const $then = renderScopeAST(then)

    $fragment.innerHTML = type
    $fragment.appendChild($condition)
    $fragment.appendChild($then)

    if(!otherwise) return $fragment
    const $else = document.createElement('code')
    $else.setAttribute('data-ast-type', 'else')
    $else.classList.add('ast')
    $else.innerHTML = 'else'
    const $elseScope = renderScopeAST(otherwise)
    $else.appendChild($elseScope)

    $fragment.appendChild($else)

    return $fragment
  }

const renderType = {
    'string': renderTypeAndValueAST,
    'number': renderTypeAndValueAST,
    'boolean': renderTypeAndValueAST,
    'identifier': renderTypeAndValueAST,
    'call': renderCallAST,
    'binary': renderBinaryAST,
    'assign': renderBinaryAST,
    'scope': renderScopeAST,
    'function': renderFunctionAST,
    'if': renderIfAndWhileAST,
    'while': renderIfAndWhileAST,
    'range': ()=>null,
    'program': ()=>null
  }

function renderEveryAst(ast: AST):HTMLElement | undefined{
    if(!('token' in ast)) return;
    const $code = document.createElement('code')
    $code.setAttribute('data-color', `--ast-${ast.type}-color`)
    $code.setAttribute('data-ast-type', ast.type)
    $code.setAttribute('data-token-id', ast.token.id)
    $code.classList.add('ast')
    $code.classList.add(`ast-${ast.type}`)
    $code.id = ast.id
    $code.style.marginLeft = isNewLine?`${scopeLevel*32}px`:''
    isNewLine = false
    const toAppend = renderType[ast.type](ast as any)
    if(toAppend){
      $code.appendChild(toAppend)
    }
    return $code
}

function renderArrayAst(array: AST[], br=false){
    const $fragment = document.createDocumentFragment()
    array.forEach((ast)=>{
      const $content = renderEveryAst(ast)
      if($content){
        if(scopeLevel && !$content.style.marginLeft){
          $content.style.marginLeft = `${scopeLevel*32}px`
        }
        $fragment.appendChild($content)
      }
      if(br) $fragment.appendChild(document.createElement('br'))
    })
    return $fragment
}

const recursiveSetZIndex = (ast: Element, base: number = 10)=>{
  const children = Array.from(ast.children).reverse()
  if(!children.length) return;
  children[0].classList.contains('ast')
  children.forEach((code:any, index)=>{
    if(!code.className.includes('ast')) return;
    code.style.zIndex = index + base
    recursiveSetZIndex(code, base+10)
  })
}

const setZIndex = ()=>{
  const elements = Array.from(document.querySelectorAll('.ast')).reverse() as HTMLElement[]
  elements.forEach((element, i)=>{
    element.style.zIndex = `${i + 15}`
  })
  // const programAST = document.querySelector('code.ast-program')
  // if(!programAST) return;
  // recursiveSetZIndex(programAST)
  // const 
}


export const renderAst = (ast: ProgramAST)=>{
    $program = document.createElement('code')
    $program.setAttribute('data-ast-type', ast.type)
    $program.id = ast.id
    $program.classList.add('ast')
    $program.classList.add('ast-program')
    $viewer.innerHTML = ''
    $viewer.appendChild($program)
    const $fragment = renderArrayAst(ast.program, true)
    $program.appendChild($fragment)
    setZIndex()
}

class OutputRenderer {
  output: Output[] = []
  index: number = 0
  restorables: HTMLElement[]
  triggers: Map<number, string> = new Map()
  progress = document.getElementById('progress-bar')! as HTMLProgressElement
  constructor(output: Output[]){
    this.output = output
    this.index = 0
    $display.innerHTML = ''
    this.restorables = []
    document.querySelectorAll('.ast-function, .ast-while').forEach(el=>{
      this.restorables.push(el.cloneNode(true) as HTMLElement)
    })
    this.triggers = new Map()
  }

  runPrint(value: TypesSupported){
    const $p = document.createElement('p')
    $p.classList.add('output-display')
    $p.innerText = `${value}`
    $display.appendChild($p)
  }

  domUpdate(replace: HTMLElement, newElement: HTMLElement){
    replace.classList.add('updating')
    newElement.classList.add('updated')
    replace.onanimationend = ()=>{
      replace.replaceWith(newElement)
    }
    newElement.onanimationend = ()=>{
      newElement.classList.remove('updated')
    }
  }

  replace(id: string, toRestore: HTMLElement){
    const element: HTMLElement = document.querySelector(`code#${id}`)!
    this.domUpdate(element, toRestore.cloneNode(true) as HTMLElement)
  }

  restore(elementId: string):boolean{
    let found = false, index = -1
    for(let i = 0; i < this.restorables.length && !found; i++){
      const node = this.restorables[i]
      found = !!node.querySelector(`#${elementId}`)
      index = i
    }
    if(!found) return true
    const trigger = this.triggers.get(index)
    if(!trigger){
      this.triggers.set(index, elementId)
      return true
    }
    if(trigger !== elementId) return true
    const toRestore = this.restorables[index]
    this.replace(toRestore.id, toRestore)
    this.index--
    this.triggers.delete(index)
    return false
  }

  run(){
    const output = this.output[this.index]
    const progress = (this.index / this.output.length)
    this.progress.value = progress
    if(!output) return;
    this.index++
    const { id, type, value } = output
    if(type === 'print') return this.runPrint(value)
    const canContinue = this.restore(id)
    const element = document.getElementById(id)
    if(!canContinue || !element) return;
    const newElement = element.cloneNode(true) as HTMLElement
    newElement.setAttribute('data-color', `--ast-${type}-color`)
    newElement.setAttribute('data-ast-type', type)
    newElement.innerHTML = type === 'string'?` '${value}' `:` ${value} `
    this.domUpdate(element, newElement)
  }

}

export const displayer = (output: Output[])=>{
  return new OutputRenderer(output)
}