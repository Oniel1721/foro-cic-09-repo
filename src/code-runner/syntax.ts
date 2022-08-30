import { Syntax, Keyword, Operator } from './types'

export const syntax: Syntax = {
    keywords: [
        Keyword.Else,
        Keyword.If,
        Keyword.True,
        Keyword.False,
        Keyword.Loop,
    ],
    operators: [
        Operator.And,
        Operator.Or,
        Operator.Div,
        Operator.Equal,
        Operator.Mayor,
        Operator.Minor,
        Operator.Mod,
        Operator.Mul,
        Operator.Not,
        Operator.Or,
        Operator.Sub,
        Operator.Sum,
    ],
    whitespaces: [
        " ",
        "\t",
        "\n"
    ],
    digitRegex: /[0-9]/i,
    startIdentifierRegex: /[a-zA-Z_$]/i,
    punctuations: [
        ",",
        "(",
        ")",
        "{",
        "}"
    ],
    point: '.',
    comment: '#',
    string: "'"
}

export const Priority: {
    [key in string]: number
} = {
    "=": 1,
    "|": 2,
    "&": 3,
    "<": 7, ">": 7, "<=": 7, ">=": 7, "==": 7, "!=": 7,
    "+": 10, "-": 10,
    "*": 20, "/": 20, "%": 20,
};

export const isWhitespace = (char: any):boolean=>{
    return syntax.whitespaces.includes(char)
}

export const isDigit = (char: any):boolean=>{
    return syntax.digitRegex.test(char)
}

export const isIdentifierStart = (char: any): boolean=>{
    return syntax.startIdentifierRegex.test(char)
}

export const isIdentifier = (char: any):boolean=>{
    return isIdentifierStart(char) || isDigit(char)
}

export const isKeyword = (char: any): boolean=>{
    return syntax.keywords.includes(char)
}

export const isPunctuation = (char: any): boolean=>{
    return syntax.punctuations.includes(char)
}

export const isOperator = (char: any): boolean=>{
    return syntax.operators.includes(char)
}

export const isPoint = (char: string): boolean=>{
    return char === syntax.point
}

export const isComment = (char: string): boolean=>{
    return char === syntax.comment
}

export const isString = (char: string): boolean=>{
    return char === syntax.string
}