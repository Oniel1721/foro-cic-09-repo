import { Priority } from '../syntax'
import { Token } from '../tokenizer/types'
import type { AST, BooleanAST, CallAST, TypeAndValueAST, IdentifierAST, IfAST, ProgramAST, ScopeAST, WhileAST, FunctionAST } from './types'
import { throwError } from '../error';


let i = 0
const getId = ()=>{
    return `ast-${i++}`
}

class Parser {
    tokens: Token[] = []
    index: number = 0
    program: AST[] = []

    constructor(tokens: Token[]){
        this.init(tokens)
    }

    init(tokens: Token[]){
        this.tokens = tokens
        this.program = []
        this.index = 0
    }

    addExpression(ast: AST){
        this.program.push(ast)
    }
    
    parseAll(): ProgramAST{
        while(!this.isEnd){
            const expression = this.parseExpression()
            this.addExpression(expression)
        }
        return {
            id: getId(),
            program: this.program,
            type: 'program'
        }
    }

    parseStep(): ProgramAST{
        const expression = this.parseExpression()
        this.addExpression(expression)
        return {
            id: getId(),
            program: this.program,
            type: 'program'
        }
    }

    error(message: string){
        throwError(message, this.token ?? this.getRelative(-1))
    }

    getRelative(ratio: number):Token{
        let index = this.index + ratio
        if(index < 0) index = 0
        if(index >= this.tokens.length) index = this.tokens.length-1
        return this.tokens[index]
    }

    get token(): Token{
        return this.tokens[this.index]
    }

    get next(){
        return this.tokens[this.index++]
    }

    get isEnd(){
        return this.index >= this.tokens.length || !this.token
    }

    isSomeType(type: 'punctuation' | 'keyword' | 'operator', char?: string):Token | undefined {
        const token = this.token
        if(!token) return;
        if(token.type !== type) return;
        if(!(!char || token.value === char)) return;
        return token
    }

    skipPunctuantion(char: string){
        if(this.isSomeType('punctuation', char)) this.next
        else this.error(`Expecting punctuation: "${char}"`)
    }

    skipKeyword(char: string){
        if(this.isSomeType('keyword', char)) this.next
        else this.error(`Expecting keyword: "${char}"`)
    }

    skipOperator(char: string){
        if(this.isSomeType('operator', char)) this.next
        else this.error(`Expecting operator: "${char}"`)
    }

    unespected(){
        this.error("Unexpected token: ")
    }

    parseWhile():WhileAST {
        this.skipKeyword('while')
        const condition = this.parseExpression()
        const then = this.parseExpression()
        const whileAST:WhileAST = {
            type: 'while',
            condition,
            then,
            token: this.getRelative(-1),
            id: getId()
        }
        if(this.isSomeType('keyword', 'else')){
            this.next;
            whileAST.else = this.parseExpression()
        }
        return whileAST
    }

    parseIf():IfAST{
        this.skipKeyword('if')
        const condition = this.parseExpression()
        const then = this.parseExpression()
        const ifAST:IfAST = {
            type: 'if',
            condition,
            then,
            token: this.getRelative(-1),
            id: getId()
        }
        if(this.isSomeType('keyword', 'else')){
            this.next;
            ifAST.else = this.parseExpression()
        }
        return ifAST
    }

    delemited(start: string, stop: string, parser: ()=>AST):AST[]{
        const expressions:AST[] = []
        this.skipPunctuantion(start);
        while(!this.isEnd){
            if(this.isSomeType('punctuation', stop)) break;
            const expression = parser()
            expression.id = expression.id || getId()
            expressions.push(expression)
        }
        this.skipPunctuantion(stop)
        return expressions
    }

    parseScope():ScopeAST{
        const body:AST[] = this.delemited("{", "}", ()=> this.parseExpression())
        return {
            type: 'scope',
            body,
            id: getId()
        }
    }

    parseBoolean():BooleanAST{
        return {
            type: 'boolean',
            value: this.next.value === "true",
            token: this.getRelative(-1),
            id: getId()
        }
    }
   
    isArrowFunction():boolean{
        let offset = 1, error = false, conclusion = null;
        let isIdentifier = false
        while(!this.isEnd && !error && conclusion === null){
            const token = this.getRelative(offset)
            if(!isIdentifier){
                if(token.type !== 'identifier' && token.value !== ')') return false
                isIdentifier = true
            }
            else{
                if(token.type !== 'punctuation' || (token.value !== ',' && token.value !== ')')) return false
                isIdentifier = false
            }
            if(token.value === ')'){
                const nextToken = this.getRelative(offset+1)
                if(nextToken.type !== 'operator' || nextToken.value !== '=>') return false
                else return true
            }
            offset++
        }
        return false
    }

    parseIdentifier():IdentifierAST{
        const name = this.next
        if(name.type !== 'identifier') {
            return throwError('Expecting argument name', name) as any;
        }
        return {
            token: name,
            type: name.type,
            value: name.value,
            id: getId()
        }  
    }

    parseArrowFunction():FunctionAST {
        const args = this.getParams('(', ')', ',', ()=> this.parseIdentifier()) as IdentifierAST[]
        const token = this.token
        this.skipOperator('=>')
        
        const body = this.parseExpression()
        return {
            type: 'function',
            args,
            scope: body,
            token,
            id: getId()
        }
    }

    parseToken(): AST{
        // todo functions creation 
        if(this.isSomeType('punctuation', '(')){
            const isArrowFunction = this.isArrowFunction()
            if(!isArrowFunction){
                this.next
                const expression = this.parseExpression()
                this.skipPunctuantion(')')
                return expression
            }
            return this.parseArrowFunction()
        }
        if(this.isSomeType('punctuation', '{')) return this.parseScope()
        if(this.isSomeType('keyword', 'while')) return this.parseWhile()
        if(this.isSomeType('keyword', 'if')) return this.parseIf()
        if(this.isSomeType('keyword', 'true')) return this.parseBoolean();
        if(this.isSomeType('keyword', 'false')) return this.parseBoolean();
        const token = this.next
        if(token.type === 'identifier' || token.type === 'number' || token.type === 'string'){
            return {
                type: token.type,
                value: token.value,
                token: this.getRelative(-1),
                id: getId()
            } as TypeAndValueAST
        }
        this.unespected();
        throw 'asdf'
    }
    called = 0

    maybeBinary(left: AST, myPriority:number = 0):AST {
        const token = this.isSomeType('operator')
        if(!token) return left

        const hisPriority = Priority[token.value]
        if(hisPriority < myPriority) return left
        
        this.next
        const expression = this.parseToken()
        const right = this.maybeCall(()=>this.maybeBinary(expression, hisPriority))
        const newLeft:any = {
            type: token.value === '='?'assign': 'binary',
            operator: token.value,
            left,
            right,
            token,
            id: getId()
        }

        return this.maybeBinary(newLeft, myPriority)
    }

    getParams(start: string, stop: string, separator: string,parser: ()=>AST):AST[]{
        const expresions:AST[] = []
        let first = true
        this.skipPunctuantion(start);
        while(!this.isEnd){
            if(this.isSomeType('punctuation', stop)) break;
            if(first) first = false;
            else this.skipPunctuantion(separator);
            if(this.isSomeType('punctuation', stop)) break;
            expresions.push(parser())
        }
        this.skipPunctuantion(stop)
        return expresions
    }

    parseCall(identifier: IdentifierAST):CallAST{
        const params = this.getParams("(", ")", ",", ()=> this.parseExpression())
        return {
            type: 'call',
            function: identifier,
            params,
            token: this.getRelative(-1),
            id: getId()
        }
    }

    maybeCall(cb: ()=>AST):AST{
        const expression:any = cb()
        return this.isSomeType('punctuation', '(')?this.parseCall(expression):expression
    }


    parseExpression():any{
        const expression = this.parseToken()
        const parsedExpression = this.maybeCall(()=>{
            const maybeBinaryExpression = this.maybeBinary(expression)
            return maybeBinaryExpression
        })
        return parsedExpression
    }
}

export const parse = (tokens: Token[])=>{
    const parser = new Parser(tokens)
    return parser
}