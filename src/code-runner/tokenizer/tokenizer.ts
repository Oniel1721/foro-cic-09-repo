import { splitLines } from './spliter'
import { Line, Token } from './types';
import { throwError } from '../error'
import { isDigit, isIdentifier, isIdentifierStart, isKeyword, isOperator, isPoint, isPunctuation, isWhitespace, isComment, isString } from '../syntax';

let i = 0
const getId = ()=>{
    return `token-${i++}`
}

class Tokenizer {
    lines: Line[] = []
    lineIndex: number = 0
    column: number = 0
    tokens: Token[] = []

    constructor(code: string){
        this.init(code)
    }

    init(code: string){
        this.column = 0
        this.lineIndex = 0
        this.tokens = []
        this.lines = splitLines(code)
        i = 0
    }

    tokenizeAll():Token[]{
        while(!this.isEnd){
            const token = this.analizeLine()
            if(!token) continue;
            this.addToken(token)
        }    
        return this.tokens
    }

    tokenizeStep():Token[]{
        if(this.isEnd) return this.tokens;
        const token = this.analizeLine()
        if(!token) return this.tokenizeStep();
        this.addToken(token)
        return this.tokens  
    }

    addToken(token: Token){
        this.tokens.push(token)
    }

    analizeLine(): Token | void {
        this.readWhile(isWhitespace)
        if(this.isEnd) return;
        const char = this.char
        if(!char.length){
            this.next
            return;
        }
        if(isComment(char)){
            return this.skipComment()
        }
        if(isString(char)){
            return this.readString()
        }
        if(isDigit(char)){
            return this.readNumber()
        } 
        
        if(isIdentifierStart(char)){
            return this.readIdentifier()
        }
        if(isPunctuation(char)){
            return this.readPunctuation()
        }
        if(isOperator(char)){
            return this.readOperator()
        }
        this.error(`Cannot handle character: ${char}`)
    }

    readWhile(cb: (char: string)=>boolean){
        let string = ''
        while(!this.isEnd && cb(this.char)){
            string += this.next
        }
        return string
    }

    get line (){
        return this.lines[this.lineIndex]
    }

    get nextLine (){
        return this.lines[this.lineIndex++]
    }

    error(message: string){
        throwError(message, {
            column: this.column,
            line: this.line,
            type: 'point',
            value: '.',
            id: getId()
        })
    }

    get char(){
        return this.line.content.charAt(this.column)
    }

    get next(){
        const char = this.char
        if(this.column >= this.line.columns){
            this.nextLine
            this.column = 0
        }
        else this.column++
        return char
    }

    get isEnd(){
        return !this.line || this.lineIndex + 1 >= this.lines.length && this.column >= this.line.columns
    }

    skipComment(){
        this.lineIndex++
    }

    readString(): Token{
        const end = this.char
        let escaped = false, value = "";
        this.next
        while(!this.isEnd){
            const char = this.next
            if(escaped){
                value += char;
                escaped = false;
            }
            else if(char === '\\'){
                escaped = true;
            }
            else if(char === end){
                break;
            }
            else{
                value += char;
            }
        }
        return {
            type: 'string',
            value, 
            line: this.line,
            column: this.column,
            id: getId()
        }
    }

    readNumber():Token{
        let hasDot = false
        const value = this.readWhile((char)=>{
            if(isPoint(char)){
                if(hasDot){
                    return false                    
                }
                hasDot = true
                return true;
            }
            return isDigit(char)
        })
        return {
            type: 'number',
            value: parseFloat(value),
            line: this.line,
            column: this.column,
            id: getId()
        }
    }
    
    readIdentifier():Token{
        const value = this.readWhile(isIdentifier)
        return {
            type: isKeyword(value)?'keyword': 'identifier',
            value, 
            line: this.line ,
            column: this.column,
            id: getId()
        }
    }

    readPunctuation(): Token{
        return {
            type: 'punctuation',
            value: this.next, 
            line: this.line ,
            column: this.column,
            id: getId()
        }
    }

    readOperator():Token{
        return {
            type: 'operator',
            value: this.readWhile(isOperator), 
            line: this.line ,
            column: this.column,
            id: getId()
        }
    } 
}

export const tokenize = (code: string)=>{
    const tokenizer = new Tokenizer(code)
    return tokenizer
}