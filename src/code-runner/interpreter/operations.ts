import { TypesSupported } from "./Context";
import { BinaryOperators } from '../ast-parser/types';

type Addable = string | number

const number = (value: any): number | null=>{
    if(typeof value !== 'number'){
        return null
    }
    return value
}

export const truthy = (value: any):boolean=>{
    if(typeof value === 'boolean') return value
    if(typeof value === 'number') return value !== 0
    if(typeof value === 'string') return true
    if(value == null) return false
    return true
}

const addable = (value: any): Addable | null=>{
    if(typeof value !== 'number' && typeof value !== 'string' ){
        return null
    }
    return value
}

const bothAddable = (left:any, right:any):boolean=>{
    return addable(left) !== null && addable(right) !== null
}

const bothNumber = (left:any, right:any):boolean=>{
    return number(left) !== null && number(right) !== null
}

const equal = (left: TypesSupported, right: TypesSupported):boolean => left === right

const notEqual = (left: TypesSupported, right: TypesSupported):boolean => left !== right

const and = (left: TypesSupported, right: TypesSupported):boolean => truthy(left) && truthy(right)

const or = (left: TypesSupported | null, right: TypesSupported | null):boolean => truthy(left) || truthy(right)

const less = (left: TypesSupported, right: TypesSupported):boolean | null => {
    if(!bothAddable(left, right)) return null
    return (left as number) < (right as number)
} 

const lessOrEqual = (left: TypesSupported, right: TypesSupported):boolean | null => {
    if(!bothAddable(left, right)) return null

    return or(less(left, right), equal(left, right))
} 

const greather = (left: TypesSupported, right: TypesSupported):boolean | null => {
    if(!bothAddable(left, right)) return null

    return (left as number) > (right as number)
} 

const greatherOrEqual = (left: TypesSupported, right: TypesSupported):boolean | null => {
    if(!bothAddable(left, right)) return null

    return or(greather(left, right), equal(left, right))
} 

const residue = (left: TypesSupported, right: TypesSupported):number | null => {
    if(!bothNumber(left, right)) return null
    return (left as number) % (right as number)
} 

const add = (left: TypesSupported, right: TypesSupported):Addable | null => {
    if(!bothAddable(left, right)) return null
    return (left as number) + (right as number)
}

const difference = (left: TypesSupported, right: TypesSupported):Addable | null => {
    if(!bothNumber(left, right)) return null
    return (left as number) - (right as number)
}

const product = (left: TypesSupported, right: TypesSupported):Addable | null => {
    if(!bothNumber(left, right)) return null
    return (left as number) * (right as number)
}

const pow = (left: TypesSupported, right: TypesSupported):Addable | null => {
    if(!bothNumber(left, right)) return null
    return Math.pow((left as number), (right as number))
}

const divide = (left: TypesSupported, right: TypesSupported):Addable | null => {
    if(!bothNumber(left, right)) return null
    return (left as number) / (right as number)
}


type Operations = {
    [key in BinaryOperators]: (left: TypesSupported, right: TypesSupported) => TypesSupported | null;
};

export const operations: Operations = {
    '==': equal,
    '!=': notEqual,
    '&': and,
    '|': or,
    '<': less,
    '<=': lessOrEqual,
    '>': greather,
    '>=': greatherOrEqual,
    '%': residue,
    '+': add,
    '-': difference,
    '*': product,
    '**': pow,
    '/': divide
}