import { ProgramAST, AST, AssignAST, CallAST, BinaryAST, IfAST, FunctionAST, WhileAST } from '../ast-parser/types';
import { Context, TypesSupported } from './context';
import { operations, truthy } from './operations';
import { Token } from '../tokenizer/types';
import { Output } from './types'
import { throwError } from '../error'


const binaryErrorMessage = 'Cannot evaluate'

const binaryError = (left: any, operator: string,right: any, token: Token)=>{
    if(typeof left === 'string') left = `"${left}"`
    if(typeof right === 'string') right = `"${right}"`
    return throwError(`${binaryErrorMessage} ${left} ${operator} ${right}`, token)
}

class Interpreter {
    ast!: ProgramAST
    global!: Context
    index: number = 0
    output: Output[] = []

    constructor(ast: ProgramAST){
        this.init(ast)
    }

    get isEnd (){
        return this.index >= this.ast.program.length
    }

    get expression (){
        return this.ast.program[this.index++]
    }

    init(ast: ProgramAST){
        this.output = []
        this.index = 0
        this.ast = ast
        this.global = new Context()
        this.global.set("__credits__", `
            Agradecimientos a:
            Cincinnatus Institute of Craftmanship por el espacio
            & Anabel Hernández por ayudarme con la presentación 
            (Quedo muy bonita).
        `)
        this.global.set("print", (args: any[])=>{
            const parsedArgs = args.map(( arg )=>{
                if(typeof arg === 'function' || typeof arg === 'object'){
                    return 'Function'
                }
                return arg
            })
            this.output.push({ id: 'none', type: 'print', value: parsedArgs.join(' | ') })
            return false
        })
    }

    interpretate(expression: AST){
        this.evaluate(expression, this.global);
        this.index++
    }
    
    run(){
        this.ast.program.forEach((expression)=>{
            this.interpretate(expression)
        })
        return this.output
    }

    runStep(){
        if(this.isEnd) return this.output
        const expression = this.expression
        this.interpretate(expression)
        return this.output
    }

    binary(ast: BinaryAST, context: Context): TypesSupported {
        const { operator, token } = ast
        let left = this.evaluate(ast.left, context)
        let right = this.evaluate(ast.right, context)
        const auxiliar: TypesSupported | null = operations[operator](left, right)
        if(auxiliar === null) {
            return binaryError(left, operator, right, token)
        }
        return auxiliar
    }

    call(ast: CallAST, context: Context): TypesSupported {
        const funct = this.evaluate(ast.function, context)
        const params: TypesSupported[] = ast.params.map((a)=>this.evaluate(a, context))
        if(typeof funct !== 'function' && (typeof funct !== 'object' && funct !== null)){
            return throwError(`${ast.function.value} is not a function`, ast.token) as TypesSupported
        }
        if(typeof funct === 'function') return funct(params)
        const functionAst = funct as FunctionAST
        if(functionAst.args.length > params.length) {
            return throwError(`${ast.function.value} its require ${functionAst.args.length} parameters to works`, ast.token)
        }
        const newContext = new Context(context)
        functionAst.args.forEach((arg, i)=>{
            newContext.lazySet(arg.value, params[i])
        })
        return this.evaluate(functionAst.scope, newContext)
    }

    assign(ast: AssignAST, context: Context):TypesSupported{
        const identifier = ast.left.value
        let value = this.evaluate(ast.right, context)
        context.set(identifier, value)
        return context.get(identifier)!
    }

    if(ast: IfAST, context: Context):TypesSupported{
        const condition = truthy(this.evaluate(ast.condition, context))
        if(condition){
            return this.evaluate(ast.then, context)
        }
        else if(ast.else){
            return this.evaluate(ast.else, context)
        }
        return false
    }

    while(ast: WhileAST, context: Context):TypesSupported{
        let condition = truthy(this.evaluate(ast.condition, context))
        if(condition){
            this.evaluate(ast.then, context)
            return this.evaluate(ast, context)
        }
        else if(ast.else){
            return this.evaluate(ast.else, context)
        }
        return false
    }

    evaluateExpression(ast: AST, context: Context):TypesSupported{
        switch(ast.type){
            case 'assign':
                return this.assign(ast, context)
            case 'range':
            case 'string':
            case 'number':
            case 'boolean':
                return ast.value
            case 'function':
                return ast
            case 'identifier':  
                const identifierValue = context.get(ast.value)
                if(typeof identifierValue === 'undefined'){
                    return throwError(`${ast.value} is not defined`, ast.token)
                }
                return identifierValue
            case 'call':
                return this.call(ast, context)
            case 'binary':
                return this.binary(ast, context)
            case 'if':
                return this.if(ast, context)
            case 'while':
                return this.while(ast, context)
            case 'scope':
                const newContext = new Context(context)
                const values = ast.body.map((expression)=>{
                    const value = this.evaluate(expression, newContext)
                    return value
                })
                return values.at(-1)!
            default:
                return false
        }
    }

    afterEvaluate(ast: AST, value: TypesSupported){
        if(typeof value === 'function' || typeof value === 'object') return value
        if(['call', 'identifier', 'binary'].includes(ast.type)){
            this.output.push({ id: ast.id, value, type: typeof value })
        }
        return value
    }
    
    evaluate(ast: AST, context: Context):TypesSupported{
       const output = this.evaluateExpression(ast, context)
       return this.afterEvaluate(ast, output)
    }
}

export const interpretate = (ast: ProgramAST)=>{
    const interpreter = new Interpreter(ast)
    return interpreter
}
