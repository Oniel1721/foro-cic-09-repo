import { FunctionAST } from '../ast-parser/types';

export type TypesSupported = number | string | boolean | Function | FunctionAST

export class Context {
    map: Map<string, TypesSupported> = new Map()

    parent?: Context
    constructor(parent?:Context){
        if(parent){
            this.parent = parent
        }
    }

    
    get(id: string): TypesSupported | undefined {
        const value = this.map.get(id) ?? this.parent?.get(id)
        return value
    }

    set(id: string, value: TypesSupported){
        let currentContext:Context | undefined = this
        while(currentContext && !currentContext.map.has(id)){
            currentContext = currentContext.parent
        }
        if(!currentContext) this.map.set(id, value)
        else currentContext.map.set(id, value)
    }

    lazySet(id: string, value: TypesSupported){
        this.map.set(id, value)
    }
}