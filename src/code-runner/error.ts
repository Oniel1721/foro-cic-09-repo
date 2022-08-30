import { Token } from './tokenizer/types';
export const throwError = (message: string, token: Token)=>{
    let pointer = ''
    for(let i = 0; i <= token.column; i++){
        pointer+= ' '
    }
    pointer+='^'
    const result = `Local error: ${message}\n${token.line.count}  ${token.line.content}\n${token.line.count+1} ${pointer}`
    throw result
}