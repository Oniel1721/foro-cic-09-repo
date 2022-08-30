import * as monaco from 'monaco-editor'
// import DefaultWorker from 'monaco-editor/esm/vs/language/typescript?worker'
import { tokenize, parse, interpretate } from './code-runner'
import { ProgramAST } from './code-runner/ast-parser/types';
import { Output } from './code-runner/interpreter/types';
import { Token } from './code-runner/tokenizer/types';
import { renderTokens, renderAst, displayer } from './utils';

const getCode = ():string=>{
    return localStorage.getItem('visualizer_code') ?? ''
}

const setCode = (value: string)=>{
    localStorage.setItem('visualizer_code', value)
}

const $editor:HTMLElement = document.querySelector('#monaco-editor')!
const $display: HTMLDivElement = document.querySelector('#display')!
const $runBtn: HTMLButtonElement = document.querySelector('.run')!
let code: string = '';
let lastCode: string = '';
let tokens: Token[] = [];
let ast: ProgramAST = { id: 'ast-1', program: [], type: 'program' };
let output: Output[] = [];
let display = displayer(output)

window.MonacoEnvironment = {
    getWorkerUrl: ()=>{
        return ''
    },
}

const vsCode = monaco.editor.create($editor, {
    theme: 'vs-dark',
    fontSize: 20, 
    value: getCode() 
})

const transformCode = ()=>{
    lastCode = code
    code = vsCode.getValue()
    setCode(code)
    tokens = tokenize(code).tokenizeAll()
    ast = parse(tokens).parseAll()
    output = interpretate(ast).run()
    renderTokens(tokens)
    renderAst(ast)
    display = displayer(output)
}

$editor?.addEventListener('keyup', ()=>{
    transformCode()
})

$runBtn.addEventListener('click', ()=>{
    display.run() 
})

window.onload = transformCode

window.onerror = (e)=>{
    const error = e as string
    if(!error.includes('Local error')) return;
    const $p = document.createElement('p')
    $p.classList.add('error-display')
    $p.innerText = `${error}`
    $display.innerHTML = ''
    $display.appendChild($p)
}
